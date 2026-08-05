/* Blood War Mode v15 - visual isolado, sem alterar logica do site */
(()=>{
  const DAYS=[5,15,25];
  const state={mode:'auto',active:false};
  const css=`
body.battle-theme{--r:#ff2a1a;--b:#060403;--p:#15100c;--c:#1a1410;--t:#fff8e9;--m:#b9a78d;--g:#64ff8f;--bl:#53c8ff;--y:#ffc247;--bd:#4b3020;background:radial-gradient(circle at 50% -20%,#5b1208 0,#130806 33%,#050403 72%);background-attachment:fixed}
body.battle-theme header{background:linear-gradient(180deg,#160604dd,#080403f2),radial-gradient(circle at 50% 0,#8c1b0d,#130604 60%);border-bottom-color:#ff3a1e;box-shadow:0 12px 38px #000b,0 2px 0 #a26d22}
body.battle-theme header:before{content:'⚔  BLOOD WAR MODE  ⚔';display:block;color:#ffd487;font:italic 1.35rem Teko;letter-spacing:.16em;text-shadow:0 0 14px #ff3b1f;margin-bottom:5px}
body.battle-theme .status{background:linear-gradient(90deg,#140806,#0b0805,#140806);border-bottom-color:#5d3820}
body.battle-theme nav{padding:12px 16px;border:1px solid #3b2418;border-radius:10px;background:#090604c9;box-shadow:0 14px 30px #0008}
body.battle-theme .tab{background:linear-gradient(180deg,#211711,#100b08);border-color:#583822;color:#cdbb9f;box-shadow:inset 0 1px 0 #ffffff0d}
body.battle-theme .tab:hover{border-color:#b26d28;color:#fff4dc}
body.battle-theme .tab.active{background:linear-gradient(135deg,#b51c0e,#641006);border-color:#ff6a32;color:#fff7e9;box-shadow:0 0 18px #e62c1844,inset 0 1px 0 #ffb06a55}
body.battle-theme .title,body.battle-theme .birthday-titleline{border-bottom-color:#74401e;color:#ffe2a8;text-shadow:0 0 12px #ff3b1f55}
body.battle-theme .card,body.battle-theme .row,body.battle-theme .online-item,body.battle-theme .birthday-card{background:linear-gradient(135deg,#211710,#120d0a 72%);border-color:#4b3121;border-left-color:#8d2a17;box-shadow:inset 0 1px 0 #fff1d20b,0 10px 24px #0005}
body.battle-theme .card.live{border-left-color:#ff2d18;background:linear-gradient(90deg,#6d130c55,#17100c);box-shadow:0 0 20px #e82d1d33}
body.battle-theme .card.next{border-left-color:#ffc247}
body.battle-theme .tag,body.battle-theme .server-tag{background:#2b1f17;border:1px solid #5b3a24;color:#ffe0ac}
body.battle-theme .timer,body.battle-theme .event-timer{color:#fff7e7;text-shadow:0 0 10px #ff7b3540}
body.battle-theme dialog{background:#0e0906;border-color:#a72c17;box-shadow:0 30px 90px #000}
body.battle-theme footer{background:#080503;border-top-color:#5a321c}
#battleBanner{display:none;max-width:1200px;width:calc(100% - 40px);margin:0 auto 14px;padding:12px 16px;border:1px solid #98401f;border-left:5px solid #ff3b1f;border-radius:8px;background:linear-gradient(90deg,#4a110acc,#160906dd);color:#ffe4b2;box-shadow:0 0 22px #ee351b22}
body.battle-theme #battleBanner{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}#battleBanner b{font:italic 1.35rem Teko;letter-spacing:.06em}#battleBanner span{font-size:.8rem;color:#d9b88b}
#battleQuick{display:none;border-color:#b66a2a;background:#24140c;color:#ffe0ad}#battleQuick.on{box-shadow:0 0 14px #ff3b1f55}
`;
  function calendar(){return DAYS.includes(new Date().getDate())}
  function apply(){state.active=state.mode==='on'||(state.mode==='auto'&&calendar());document.body.classList.toggle('battle-theme',state.active);const b=document.querySelector('#battleQuick');if(b){b.classList.toggle('on',state.active);b.textContent='⚔ Battle: '+(state.mode==='auto'?'Automático':state.mode==='on'?'Ativado':'Desativado')}}
  async function load(){try{const {data,error}=await sb.from('battle_theme_settings').select('mode').eq('id',true).single();if(!error&&data)state.mode=data.mode||'auto'}catch(e){console.warn('Battle theme:',e)}apply()}
  async function save(mode){try{const {data:u}=await sb.auth.getUser();const {error}=await sb.from('battle_theme_settings').update({mode,updated_at:new Date().toISOString(),updated_by:u.user.id}).eq('id',true);if(error)throw error;state.mode=mode;apply();alert('Tema Battle: '+(mode==='auto'?'automático':mode==='on'?'ativado agora':'desativado'))}catch(e){alert(e.message||e)}}
  function ui(){if(!document.querySelector('#battleStyle')){const s=document.createElement('style');s.id='battleStyle';s.textContent=css;document.head.appendChild(s)}if(!document.querySelector('#battleBanner')){const n=document.createElement('div');n.id='battleBanner';n.innerHTML='<b>⚔ TEMPOS DE BATTLE ATIVO</b><span>Dias de guerra: 05, 15 e 25. Tema visual, sem alteração em cálculos ou dados.</span>';const nav=document.querySelector('#nav');nav&&nav.parentNode.insertBefore(n,nav)}const admin=S&&S.profile&&String(S.profile.role).toLowerCase()==='admin';if(admin&&!document.querySelector('#battleQuick')){const b=document.createElement('button');b.id='battleQuick';b.className='btn';b.style.display='inline-block';b.onclick=()=>{const value=prompt('Tema Battle:\nDigite auto, on ou off',state.mode);if(value&&['auto','on','off'].includes(value.toLowerCase()))save(value.toLowerCase())};const host=document.querySelector('.header-actions');host&&host.insertBefore(b,document.querySelector('#admOpen'))}apply()}
  const boot=setInterval(()=>{if(typeof sb!=='undefined'&&typeof S!=='undefined'&&S.profile){clearInterval(boot);ui();load();setInterval(apply,60000)}},250);
})();
