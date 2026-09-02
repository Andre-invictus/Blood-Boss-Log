const CACHE_MS = 5000;
let cache = { at: 0, players: [], updatedAt: '' };

function send(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

function decodeHtml(value) {
  return String(value)
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&#039;/gi, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function cleanCell(value) {
  return decodeHtml(String(value || '').replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}
function extractOnlinePlayers(html) {
  const players = [], seen = new Set();
  const rows = html.match(/<tr\b[^>]*>[\s\S]*?<\/tr>/gi) || [];
  for (const row of rows) {
    const rawCells = [...row.matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)].map(m => m[1]);
    if (rawCells.length < 4) continue;
    const cells = rawCells.map(cleanCell);
    if (cells.some(v => /personagem|character/i.test(v)) && cells.some(v => /guild/i.test(v))) continue;
    const badges = [...row.matchAll(/<span\b[^>]*class=["'][^"']*\bbadge\b[^"']*["'][^>]*>([\s\S]*?)<\/span>/gi)].map(m => cleanCell(m[1]).toUpperCase());
    if (!badges.includes('ON')) continue;
    let nickname='', guild='', huntingLevel=null;
    if (cells.length >= 6) {
      nickname=cells[1]; guild=cells[3]; huntingLevel=cells[5];
    } else {
      nickname=cells[0]; guild=cells[Math.max(1,cells.length-3)]; huntingLevel=cells[cells.length-1];
    }
    nickname=String(nickname).replace(/\bON\b/gi,'').replace(/\s+/g,' ').trim();
    guild=String(guild||'').replace(/^[-–—]+$/,'').trim();
    const match=String(huntingLevel||'').match(/\d[\d.,]*/);
    huntingLevel=match ? Number(match[0].replace(/\./g,'').replace(',','.')) : null;
    const key=nickname.toLowerCase();
    if (!nickname || seen.has(key)) continue;
    seen.add(key);players.push({nickname,guild:guild||'',huntingLevel:Number.isFinite(huntingLevel)?huntingLevel:null,online:true});
  }
  return players;
}
async function requireAdmin(req) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  const auth = req.headers.authorization || '';
  if (!supabaseUrl || !supabaseKey) throw Object.assign(new Error('Variáveis do Supabase não configuradas.'), { status: 500 });
  if (!/^Bearer\s+\S+$/i.test(auth)) throw Object.assign(new Error('Não autenticado.'), { status: 401 });
  const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, { headers: { apikey: supabaseKey, Authorization: auth } });
  if (!userResponse.ok) throw Object.assign(new Error('Sessão inválida.'), { status: 401 });
  const user = await userResponse.json();
  const profileResponse = await fetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${encodeURIComponent(user.id)}&select=role,active`, {
    headers: { apikey: supabaseKey, Authorization: auth, Accept: 'application/json' }
  });
  if (!profileResponse.ok) throw Object.assign(new Error('Não foi possível validar o perfil.'), { status: 403 });
  const profiles = await profileResponse.json();
  const profile = profiles[0];
  if (!profile || profile.active === false || !['admin', 'officer'].includes(String(profile.role).toLowerCase())) {
    throw Object.assign(new Error('Acesso permitido somente para Admin ou Battle.'), { status: 403 });
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return send(res, 405, { success: false, message: 'Método não permitido.' });
  try {
    await requireAdmin(req);
    const now = Date.now();
    if (now - cache.at < CACHE_MS && cache.updatedAt) return send(res, 200, { success: true, players: cache.players, total: cache.players.length, updatedAt: cache.updatedAt, cached: true });
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 7000);
    let response;
    try {
      response = await fetch('https://megamu.net/ranking/hunt-point/general', {
        signal: controller.signal,
        headers: { Accept: 'text/html,application/xhtml+xml', 'User-Agent': 'BloodBossLog/1.0' }
      });
    } finally { clearTimeout(timer); }
    if (!response.ok) throw new Error(`MEGAMU respondeu HTTP ${response.status}.`);
    const html = await response.text();
    const players = extractOnlinePlayers(html);
    cache = { at: now, players, updatedAt: new Date().toISOString() };
    return send(res, 200, { success: true, players, total: players.length, updatedAt: cache.updatedAt, cached: false });
  } catch (error) {
    const status = error.status || (error.name === 'AbortError' ? 504 : 502);
    return send(res, status, { success: false, message: error.name === 'AbortError' ? 'Tempo limite ao consultar o MEGAMU.' : error.message });
  }
};
