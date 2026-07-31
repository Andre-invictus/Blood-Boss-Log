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

function extractOnlinePlayers(html) {
  const players = [];
  const cells = html.match(/<td\b[^>]*class=["'][^"']*\bname\b[^"']*["'][^>]*>[\s\S]*?<\/td>/gi) || [];
  for (const cell of cells) {
    const badges = [...cell.matchAll(/<span\b[^>]*class=["'][^"']*\bbadge\b[^"']*["'][^>]*>([\s\S]*?)<\/span>/gi)]
      .map(m => decodeHtml(m[1].replace(/<[^>]+>/g, '')).trim().toUpperCase());
    if (!badges.includes('ON')) continue;
    const beforeFirstSpan = cell.split(/<span\b/i)[0];
    const nickname = decodeHtml(beforeFirstSpan.replace(/^<td\b[^>]*>/i, '').replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
    if (nickname && !players.some(x => x.toLowerCase() === nickname.toLowerCase())) players.push(nickname);
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
