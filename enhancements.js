/* Blood Boss Log enhancements */
(()=>{const X={accounts:[],adminAccounts:[],favorites:[],goals:[],achievements:[],activity:[],profilesById:{},tab:null};
const labels={admin:'Admin',officer:'Battle',member:'Member',viewer:'Membro'};
const E_LANG={
en:{'Meu Perfil':'My Profile','Comparar':'Compare','Metas':'Goals','Conquistas':'Achievements','Atividades':'Activity','Administração':'Administration','Contas vinculadas':'Linked Accounts','Novo vínculo':'New Link','ID do usuário':'User ID','Personagens':'Characters','separados por vírgula':'comma-separated','Vincular personagens':'Link Characters','Vínculos visíveis para o Admin':'Links Visible to Admin','Nenhum vínculo encontrado.':'No links found.','ATIVO':'ACTIVE','Gerenciar conquistas':'Manage Achievements','Crie regras claras e defina para quem a conquista será aplicada.':'Create clear rules and define who the achievement applies to.','Nova conquista':'New Achievement','Nome da conquista':'Achievement Name','Descrição':'Description','Aplicar para':'Apply To','Todos os personagens':'All Characters','Um personagem específico':'One Specific Character','Todas as contas de um usuário':'All Accounts of One User','Identificador do alvo':'Target Identifier','Métrica':'Metric','Hunt roubado':'Hunt Stolen','Hunt perdido':'Hunt Lost','Saldo':'Balance','Período':'Period','Diário':'Daily','Semanal':'Weekly','Mensal':'Monthly','Valor necessário':'Required Value','em K de Hunt':'in Hunt K','Criar conquista':'Create Achievement','Conquistas ativas':'Active Achievements','Nenhuma conquista ativa.':'No active achievements.','Gerenciar metas':'Manage Goals','Defina se a meta pertence à guilda, a um personagem ou ao conjunto de contas de um usuário.':'Define whether the goal belongs to the guild, one character, or all accounts of one user.','Nova meta':'New Goal','Nome da meta':'Goal Name','Meta para quem?':'Who Is This Goal For?','Guilda inteira':'Whole Guild','Saldo positivo':'Positive Balance','Valor da meta':'Goal Value','Criar meta':'Create Goal','Metas ativas':'Active Goals','Nenhuma meta ativa.':'No active goals.','Gestão antiga':'Previous Management','Acesse lançamentos manuais, membros, novatos, monitoramento e relatório PDF.':'Access manual entries, members, rookies, monitoring, and PDF reports.','Selecione contas usando Ctrl ou Command.':'Select accounts using Ctrl or Command.','Roubado hoje':'Stolen Today','Perdido hoje':'Lost Today','Minhas contas':'My Accounts','Nenhuma conta vinculada.':'No linked accounts.','Hoje':'Today','7 dias':'7 Days','Mês':'Month','Editar':'Edit','Apagar':'Delete','Nenhum item.':'No items.'},
es:{'Meu Perfil':'Mi Perfil','Rankings':'Clasificaciones','Comparar':'Comparar','Metas':'Metas','Conquistas':'Logros','Atividades':'Actividades','Administração':'Administración','Contas vinculadas':'Cuentas vinculadas','Novo vínculo':'Nuevo vínculo','ID do usuário':'ID del usuario','Personagens':'Personajes','separados por vírgula':'separados por comas','Vincular personagens':'Vincular personajes','Vínculos visíveis para o Admin':'Vínculos visibles para el Admin','Nenhum vínculo encontrado.':'No se encontraron vínculos.','ATIVO':'ACTIVO','Gerenciar conquistas':'Gestionar logros','Crie regras claras e defina para quem a conquista será aplicada.':'Crea reglas claras y define a quién se aplica el logro.','Nova conquista':'Nuevo logro','Nome da conquista':'Nombre del logro','Descrição':'Descripción','Aplicar para':'Aplicar a','Todos os personagens':'Todos los personajes','Um personagem específico':'Un personaje específico','Todas as contas de um usuário':'Todas las cuentas de un usuario','Identificador do alvo':'Identificador del objetivo','Métrica':'Métrica','Hunt roubado':'Hunt robado','Hunt perdido':'Hunt perdido','Saldo':'Saldo','Período':'Período','Diário':'Diario','Semanal':'Semanal','Mensal':'Mensual','Valor necessário':'Valor necesario','em K de Hunt':'en K de Hunt','Criar conquista':'Crear logro','Conquistas ativas':'Logros activos','Nenhuma conquista ativa.':'No hay logros activos.','Gerenciar metas':'Gestionar metas','Defina se a meta pertence à guilda, a um personagem ou ao conjunto de contas de um usuário.':'Define si la meta pertenece al gremio, a un personaje o a todas las cuentas de un usuario.','Nova meta':'Nueva meta','Nome da meta':'Nombre de la meta','Meta para quem?':'¿Para quién es la meta?','Guilda inteira':'Todo el gremio','Saldo positivo':'Saldo positivo','Valor da meta':'Valor de la meta','Criar meta':'Crear meta','Metas ativas':'Metas activas','Nenhuma meta ativa.':'No hay metas activas.','Gestão antiga':'Gestión anterior','Acesse lançamentos manuais, membros, novatos, monitoramento e relatório PDF.':'Accede a registros manuales, miembros, novatos, monitoreo e informes PDF.','Selecione contas usando Ctrl ou Command.':'Selecciona cuentas usando Ctrl o Command.','Roubado hoje':'Robado hoy','Perdido hoje':'Perdido hoy','Minhas contas':'Mis cuentas','Nenhuma conta vinculada.':'No hay cuentas vinculadas.','Hoje':'Hoy','7 dias':'7 días','Mês':'Mes','Editar':'Editar','Apagar':'Eliminar','Nenhum item.':'No hay elementos.'},
'zh-CN':{'Meu Perfil':'我的资料','Rankings':'排行榜','Comparar':'比较','Metas':'目标','Conquistas':'成就','Atividades':'动态','Administração':'管理','Contas vinculadas':'已关联账号','Novo vínculo':'新建关联','ID do usuário':'用户 ID','Personagens':'角色','separados por vírgula':'用逗号分隔','Vincular personagens':'关联角色','Vínculos visíveis para o Admin':'管理员可见的关联','Nenhum vínculo encontrado.':'未找到关联。','ATIVO':'启用','Gerenciar conquistas':'管理成就','Crie regras claras e defina para quem a conquista será aplicada.':'创建清晰规则并定义成就适用对象。','Nova conquista':'新成就','Nome da conquista':'成就名称','Descrição':'说明','Aplicar para':'适用于','Todos os personagens':'所有角色','Um personagem específico':'指定角色','Todas as contas de um usuário':'某用户的全部账号','Identificador do alvo':'目标标识','Métrica':'指标','Hunt roubado':'抢夺 Hunt','Hunt perdido':'失去 Hunt','Saldo':'余额','Período':'周期','Diário':'每日','Semanal':'每周','Mensal':'每月','Valor necessário':'所需数值','em K de Hunt':'Hunt K','Criar conquista':'创建成就','Conquistas ativas':'启用的成就','Nenhuma conquista ativa.':'没有启用的成就。','Gerenciar metas':'管理目标','Defina se a meta pertence à guilda, a um personagem ou ao conjunto de contas de um usuário.':'定义目标属于公会、指定角色或某用户的全部账号。','Nova meta':'新目标','Nome da meta':'目标名称','Meta para quem?':'目标适用于谁？','Guilda inteira':'整个公会','Saldo positivo':'正余额','Valor da meta':'目标数值','Criar meta':'创建目标','Metas ativas':'启用的目标','Nenhuma meta ativa.':'没有启用的目标。','Gestão antiga':'旧版管理','Acesse lançamentos manuais, membros, novatos, monitoramento e relatório PDF.':'访问手动记录、成员、新手、监控和 PDF 报告。','Selecione contas usando Ctrl ou Command.':'使用 Ctrl 或 Command 选择账号。','Roubado hoje':'今日抢夺','Perdido hoje':'今日失去','Minhas contas':'我的账号','Nenhuma conta vinculada.':'没有关联账号。','Hoje':'今天','7 dias':'7 天','Mês':'本月','Editar':'编辑','Apagar':'删除','Nenhum item.':'没有项目。'},
vi:{'Meu Perfil':'Hồ sơ của tôi','Rankings':'Xếp hạng','Comparar':'So sánh','Metas':'Mục tiêu','Conquistas':'Thành tích','Atividades':'Hoạt động','Administração':'Quản trị','Contas vinculadas':'Tài khoản đã liên kết','Novo vínculo':'Liên kết mới','ID do usuário':'ID người dùng','Personagens':'Nhân vật','separados por vírgula':'ngăn cách bằng dấu phẩy','Vincular personagens':'Liên kết nhân vật','Vínculos visíveis para o Admin':'Liên kết Admin có thể xem','Nenhum vínculo encontrado.':'Không tìm thấy liên kết.','ATIVO':'ĐANG HOẠT ĐỘNG','Gerenciar conquistas':'Quản lý thành tích','Crie regras claras e defina para quem a conquista será aplicada.':'Tạo quy tắc rõ ràng và xác định đối tượng áp dụng.','Nova conquista':'Thành tích mới','Nome da conquista':'Tên thành tích','Descrição':'Mô tả','Aplicar para':'Áp dụng cho','Todos os personagens':'Tất cả nhân vật','Um personagem específico':'Một nhân vật cụ thể','Todas as contas de um usuário':'Tất cả tài khoản của một người dùng','Identificador do alvo':'Mã đối tượng','Métrica':'Chỉ số','Hunt roubado':'Hunt đã cướp','Hunt perdido':'Hunt đã mất','Saldo':'Số dư','Período':'Thời gian','Diário':'Hàng ngày','Semanal':'Hàng tuần','Mensal':'Hàng tháng','Valor necessário':'Giá trị yêu cầu','em K de Hunt':'theo K Hunt','Criar conquista':'Tạo thành tích','Conquistas ativas':'Thành tích đang hoạt động','Nenhuma conquista ativa.':'Không có thành tích đang hoạt động.','Gerenciar metas':'Quản lý mục tiêu','Defina se a meta pertence à guilda, a um personagem ou ao conjunto de contas de um usuário.':'Xác định mục tiêu thuộc guild, một nhân vật hoặc toàn bộ tài khoản của người dùng.','Nova meta':'Mục tiêu mới','Nome da meta':'Tên mục tiêu','Meta para quem?':'Mục tiêu dành cho ai?','Guilda inteira':'Toàn bộ guild','Saldo positivo':'Số dư dương','Valor da meta':'Giá trị mục tiêu','Criar meta':'Tạo mục tiêu','Metas ativas':'Mục tiêu đang hoạt động','Nenhuma meta ativa.':'Không có mục tiêu đang hoạt động.','Gestão antiga':'Quản lý trước đây','Acesse lançamentos manuais, membros, novatos, monitoramento e relatório PDF.':'Truy cập nhập thủ công, thành viên, tân binh, giám sát và báo cáo PDF.','Selecione contas usando Ctrl ou Command.':'Chọn tài khoản bằng Ctrl hoặc Command.','Roubado hoje':'Đã cướp hôm nay','Perdido hoje':'Đã mất hôm nay','Minhas contas':'Tài khoản của tôi','Nenhuma conta vinculada.':'Không có tài khoản liên kết.','Hoje':'Hôm nay','7 dias':'7 ngày','Mês':'Tháng','Editar':'Sửa','Apagar':'Xóa','Nenhum item.':'Không có mục nào.'}}
const enhLang=()=>S.lang==='pt-BR'?null:(E_LANG[S.lang]||E_LANG.en);
function translateEnhancements(root=document){const map=enhLang();if(!map)return;const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(n=>{const raw=n.nodeValue,trim=raw.trim();if(map[trim])n.nodeValue=raw.replace(trim,map[trim])});root.querySelectorAll&&root.querySelectorAll('input[placeholder],textarea[placeholder]').forEach(el=>{if(map[el.placeholder])el.placeholder=map[el.placeholder]})}
const enhancementObserver=new MutationObserver(m=>m.forEach(x=>x.addedNodes.forEach(n=>{if(n.nodeType===1)translateEnhancements(n)})));
enhancementObserver.observe(document.documentElement,{childList:true,subtree:true});
const ep=(pt,en,es,zh,vi)=>S.lang==='pt-BR'?pt:S.lang==='es'?es:S.lang==='zh-CN'?zh:S.lang==='vi'?vi:en;window.roleLabel=r=>labels[String(r||'').toLowerCase()]||String(r||'');
const isAdmin=()=>S.profile&&String(S.profile.role).toLowerCase()==='admin';const own=n=>X.accounts.some(a=>a.active&&a.nickname.toLowerCase()===String(n).toLowerCase());const fav=n=>X.favorites.some(f=>f.nickname.toLowerCase()===String(n).toLowerCase());
async function extLoad(){
  if(!S.profile)return;
  const ownAccountsQuery=sb.from('player_accounts').select('*').eq('user_id',S.profile.id).order('is_primary',{ascending:false});
  const adminAccountsQuery=isAdmin()?sb.from('player_accounts').select('*').order('created_at',{ascending:false}):Promise.resolve({data:[],error:null});
  const profilesQuery=isAdmin()?sb.from('profiles').select('id,email,display_name'):Promise.resolve({data:[],error:null});
  const queries=[ownAccountsQuery,adminAccountsQuery,profilesQuery,sb.from('favorites').select('*'),sb.from('goals').select('*').eq('active',true).order('sort_order'),sb.from('achievements').select('*').eq('active',true).order('sort_order'),sb.from('public_activity').select('*').order('created_at',{ascending:false}).limit(30)];
  const rs=await Promise.all(queries);
  const failed=rs.find(r=>r&&r.error);if(failed)throw failed.error;
  let profileRows;
  [X.accounts,X.adminAccounts,profileRows,X.favorites,X.goals,X.achievements,X.activity]=rs.map(x=>x.data||[]);
  X.profilesById=Object.fromEntries(profileRows.map(p=>[p.id,p]));
}
const oldAccept=accept;accept=async session=>{const ok=await oldAccept(session);if(ok){$('#urole').textContent=roleLabel(S.profile.role);try{await extLoad()}catch(e){console.warn(e)}nav();render();addAdminTools()}return ok};
const oldLoad=load;load=async()=>{await oldLoad();try{await extLoad()}catch(e){console.warn(e)}if(['myProfile','rankings','compare','goals','achievements','activity'].includes(S.tab))render()};
const oldNav=nav;nav=()=>{oldNav();const n=$('#nav');if(!n||!S.profile)return;const extras=[['myProfile','Meu Perfil'],['rankings','Rankings'],['compare','Comparar'],['goals','Metas'],['achievements','Conquistas'],['activity','Atividades']];const hunt=[...n.querySelectorAll('[data-t]')].find(x=>x.dataset.t==='hunt');extras.forEach(([id,label])=>{if(n.querySelector(`[data-t="${id}"]`))return;const b=document.createElement('button');b.className='tab'+(S.tab===id?' active':'');b.dataset.t=id;b.textContent=label;b.onclick=()=>{S.tab=id;nav();render()};n.insertBefore(b,hunt||null)})};
function num(v){return parseFloat(String(v||0).replace('k','').replace('-',''))||0}function cards(items){return `<div class="grid">${items.map(x=>`<article class="card"><b>${esc(x[0])}</b><div class="timer ${x[2]||''}">${esc(x[1])}</div></article>`).join('')}</div>`}
function profileView(){const mine=S.scores.filter(x=>own(x.player)),b=mine.reduce((a,x)=>a+num(x.blue),0),r=mine.reduce((a,x)=>a+num(x.red),0);return title()+cards([['Contas vinculadas',String(X.accounts.filter(x=>x.active).length)],['Roubado hoje',b.toFixed(1)+'k','blue'],['Perdido hoje',r.toFixed(1)+'k','red'],['Saldo',(b-r).toFixed(1)+'k']])+`<h2>Minhas contas</h2><div class="combat">${mine.map(x=>`<div class="row"><span class="player">${esc(x.player)} <span class="rookie-badge">EU</span></span><span class="stats"><b class="blue">${esc(x.blue)}</b><b class="red">${esc(x.red)}</b></span></div>`).join('')||'<p>Nenhuma conta vinculada.</p>'}</div>`}
function rankingsView(){const rows=[...S.scores].sort((a,b)=>num(b.blue)-num(a.blue));return title()+`<div class="filters"><button class="filter-btn active">Hoje</button><button class="filter-btn">7 dias</button><button class="filter-btn">Mês</button></div><div class="combat">${rows.map((x,i)=>`<div class="row"><span class="rank">${i+1}º</span><span class="player">${esc(x.player)}${own(x.player)?' <span class="rookie-badge">EU</span>':''}</span><span class="stats"><b class="blue">${esc(x.blue)}</b><b class="red">${esc(x.red)}</b></span></div>`).join('')}</div>`}
function compareView(selected=[]){
  const chosen=new Set(selected);
  return title()+`<p class="sub">Selecione contas usando Ctrl ou Command.</p><select id="cmp" multiple style="width:100%;min-height:180px;background:#111;color:#fff;border:1px solid #333;padding:10px">${S.scores.map(x=>`<option value="${esc(x.player)}" ${chosen.has(x.player)?'selected':''}>${esc(x.player)}</option>`).join('')}</select><button id="cmpBtn" class="btn blue" style="margin-top:10px">Comparar</button><div id="cmpOut"></div>`
}
function compareResults(names){
  return '<div class="combat" style="margin-top:15px">'+S.scores.filter(x=>names.includes(x.player)).map(x=>`<div class="row"><span class="player">${esc(x.player)}</span><span class="stats"><b class="blue">${esc(x.blue)}</b><b class="red">${esc(x.red)}</b></span></div>`).join('')+'</div>'
}
function simpleList(items,renderItem){return title()+`<div class="combat">${items.map(renderItem).join('')||'<p>Nenhum item.</p>'}</div>`}
async function editAchievement(id){
  if(!isAdmin())return;
  const item=X.achievements.find(x=>x.id===id);if(!item)return;
  const title=prompt(ep('Nome da conquista:','Achievement name:','Nombre del logro:','成就名称：','Tên thành tích:'),item.title);if(title===null)return;
  const description=prompt(ep('Descrição:','Description:','Descripción:','说明：','Mô tả:'),item.description||'');if(description===null)return;
  const value=prompt(ep('Valor necessário em K:','Required value in K:','Valor necesario en K:','所需 K 值：','Giá trị K yêu cầu:'),item.threshold_k);if(value===null)return;
  const parsed=Number(String(value).replace(',','.'));if(!title.trim()||!Number.isFinite(parsed)||parsed<0)return alert(ep('Informe um nome e um valor válido.','Enter a valid name and value.','Ingresa un nombre y valor válidos.','请输入有效名称和数值。','Nhập tên và giá trị hợp lệ.'));
  const {data:userData}=await sb.auth.getUser();
  const {error}=await sb.from('achievements').update({title:title.trim(),description:description.trim(),threshold_k:parsed,updated_by:userData.user.id}).eq('id',id);
  if(error)return alert(error.message);await extLoad();render();
}
async function deleteAchievement(id){
  if(!isAdmin()||!confirm(ep('Apagar esta conquista? Esta ação ficará registrada nas Atividades.','Delete this achievement? This action will be recorded in Activity.','¿Eliminar este logro? La acción quedará registrada en Actividades.','删除此成就？此操作将记录在动态中。','Xóa thành tích này? Hành động sẽ được ghi trong Hoạt động.')))return;
  const {error}=await sb.from('achievements').delete().eq('id',id);if(error)return alert(error.message);await extLoad();render();
}
async function editActivity(id){
  if(!isAdmin())return;
  const item=X.activity.find(x=>String(x.id)===String(id));if(!item)return;
  const action=prompt(ep('Ação exibida:','Displayed action:','Acción mostrada:','显示的操作：','Hành động hiển thị:'),item.action);if(action===null)return;
  const name=prompt(ep('Nome do item:','Item name:','Nombre del elemento:','项目名称：','Tên mục:'),item.entity_name);if(name===null)return;
  if(!action.trim()||!name.trim())return alert('Preencha a ação e o nome do item.');
  const {error}=await sb.from('public_activity').update({action:action.trim(),entity_name:name.trim()}).eq('id',id);if(error)return alert(error.message);await extLoad();render();
}
async function deleteActivity(id){
  if(!isAdmin()||!confirm(ep('Apagar esta atividade da exibição pública?','Delete this activity from the public feed?','¿Eliminar esta actividad del registro público?','从公开动态中删除此记录？','Xóa hoạt động này khỏi danh sách công khai?')))return;
  const {error}=await sb.from('public_activity').delete().eq('id',id);if(error)return alert(error.message);await extLoad();render();
}
function bindPublicAdminActions(){
  if(!isAdmin())return;
  document.querySelectorAll('[data-edit-ach]').forEach(b=>b.onclick=()=>editAchievement(b.dataset.editAch));
  document.querySelectorAll('[data-del-ach]').forEach(b=>b.onclick=()=>deleteAchievement(b.dataset.delAch));
  document.querySelectorAll('[data-edit-act]').forEach(b=>b.onclick=()=>editActivity(b.dataset.editAct));
  document.querySelectorAll('[data-del-act]').forEach(b=>b.onclick=()=>deleteActivity(b.dataset.delAct));
}
const oldRender=render;render=()=>{if(S.tab==='myProfile'){$('#main').innerHTML=profileView();return}if(S.tab==='rankings'){$('#main').innerHTML=rankingsView();return}if(S.tab==='compare'){
  const oldSelect=$('#cmp');
  const selected=oldSelect?[...oldSelect.selectedOptions].map(o=>o.value):(S.compareSelected||[]);
  const hadFocus=document.activeElement===oldSelect;
  const oldScroll=window.scrollY;
  S.compareSelected=selected;
  $('#main').innerHTML=compareView(selected);
  const select=$('#cmp');
  select.onchange=()=>{S.compareSelected=[...select.selectedOptions].map(o=>o.value)};
  if(S.compareHasResult&&S.compareSelected.length)$('#cmpOut').innerHTML=compareResults(S.compareSelected);
  $('#cmpBtn').onclick=()=>{
    S.compareSelected=[...select.selectedOptions].map(o=>o.value);
    S.compareHasResult=true;
    $('#cmpOut').innerHTML=compareResults(S.compareSelected);
    translateEnhancements($('#main'));
  };
  requestAnimationFrame(()=>{
    window.scrollTo(0,oldScroll);
    if(hadFocus)select.focus({preventScroll:true});
    translateEnhancements($('#main'));
  });
  return
}if(S.tab==='goals'){$('#main').innerHTML=simpleList(X.goals,g=>`<div class="row"><span class="player">🎯 ${esc(g.title)}<small class="sub"> ${esc(g.description||'')}</small></span><b class="blue">${esc(g.target_k)}k</b></div>`);return}if(S.tab==='achievements'){$('#main').innerHTML=simpleList(X.achievements,a=>`<div class="row"><span class="rank">${esc(a.icon||'🏆')}</span><span class="player">${esc(a.title)}<small class="sub"> ${esc(a.description||'')}</small></span><b>${esc(a.threshold_k)}k</b>${isAdmin()?`<span class="adm-inline-actions"><button class="btn" data-edit-ach="${esc(a.id)}">Editar</button><button class="btn" data-del-ach="${esc(a.id)}">Apagar</button></span>`:''}</div>`);bindPublicAdminActions();return}if(S.tab==='activity'){$('#main').innerHTML=simpleList(X.activity,a=>`<div class="row"><span class="player">${esc(a.actor_name)} <span class="role">${esc(a.actor_role)}</span> ${esc(a.action)} ${esc(a.entity_name)}</span><small>${new Date(a.created_at).toLocaleString(S.lang)}</small>${isAdmin()?`<span class="adm-inline-actions"><button class="btn" data-edit-act="${esc(a.id)}">Editar</button><button class="btn" data-del-act="${esc(a.id)}">Apagar</button></span>`:''}</div>`);bindPublicAdminActions();return}oldRender();decorate()};
function decorate(){document.querySelectorAll('.row .player,.online-item span:nth-child(2)').forEach(el=>{const n=el.firstChild&&el.firstChild.textContent.trim();if(n&&own(n)&&!el.querySelector('.my-badge')){const b=document.createElement('span');b.className='rookie-badge my-badge';b.textContent='EU';el.appendChild(b)}if(n&&fav(n)&&!el.textContent.includes('★'))el.insertAdjacentText('afterbegin','★ ')})}
function addAdminTools(){
  if(!isAdmin()||$('#extAdmin'))return;
  const d=$('#admin');
  if(!d)return;
  d.classList.add('admin-modern-dialog');
  if(!$('#adminModernStyles')){
    const style=document.createElement('style');
    style.id='adminModernStyles';
    style.textContent=`
      .admin-modern-dialog{width:min(1080px,96vw);padding:0;border:1px solid #3a2020;background:#080808;overflow:hidden}
      .admin-modern-dialog>.dh{padding:20px 24px;background:linear-gradient(135deg,#240606,#0b0b0b);border-bottom:1px solid #3c1818;position:sticky;top:0;z-index:5}
      .admin-modern-dialog>.group:not(#extAdmin){display:none}
      #extAdmin{border:0;margin:0;padding:0;background:#080808}
      .adm-shell{display:grid;grid-template-columns:230px 1fr;min-height:650px}
      .adm-sidebar{padding:18px;background:#0d0d0d;border-right:1px solid #262626}
      .adm-sidebar-label{font-size:.72rem;color:#777;text-transform:uppercase;letter-spacing:.12em;margin:4px 8px 12px}
      .adm-nav{display:flex;flex-direction:column;gap:7px}
      .adm-nav button{display:flex;align-items:center;gap:10px;width:100%;padding:12px;border:1px solid transparent;border-radius:9px;background:transparent;color:#aaa;text-align:left;font-weight:800;cursor:pointer}
      .adm-nav button:hover{background:#171717;color:#fff}.adm-nav button.active{background:#3a0909;border-color:#7b1717;color:#fff}
      .adm-main{padding:26px;overflow:auto;max-height:72vh}.adm-panel{display:none}.adm-panel.active{display:block}
      .adm-head{margin-bottom:20px}.adm-head h3{font:italic 2rem Teko;color:#fff;margin:0}.adm-head p{margin:3px 0 0;color:#888;font-size:.86rem}
      .adm-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.adm-grid.one{grid-template-columns:1fr}
      .adm-card{background:#111;border:1px solid #292929;border-radius:12px;padding:18px}.adm-card h4{margin:0 0 14px;color:#fff;font-size:1rem}
      .adm-field{margin-bottom:14px}.adm-field label{display:flex;justify-content:space-between;color:#bbb;font-size:.8rem;margin-bottom:6px}.adm-field small{color:#666}
      .adm-field input,.adm-field select,.adm-field textarea{width:100%;padding:12px;background:#070707;border:1px solid #353535;border-radius:8px;color:#fff;outline:none}
      .adm-field input:focus,.adm-field select:focus,.adm-field textarea:focus{border-color:#d00000;box-shadow:0 0 0 3px #d0000022}
      .adm-field textarea{min-height:90px;resize:vertical}.adm-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}
      .adm-primary{border:0;background:linear-gradient(135deg,#e00000,#9c0000);color:#fff;padding:12px 18px;border-radius:8px;font-weight:900;cursor:pointer}
      .adm-secondary{border:1px solid #3a3a3a;background:#181818;color:#fff;padding:12px 18px;border-radius:8px;font-weight:800;cursor:pointer}
      .adm-help{padding:12px 14px;background:#0b1820;border:1px solid #16405a;border-radius:8px;color:#9ddcff;font-size:.82rem;line-height:1.45}
      .adm-list{display:flex;flex-direction:column;gap:8px}.adm-list-item{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px;background:#0b0b0b;border:1px solid #262626;border-radius:8px}
      .adm-empty{color:#777;padding:18px;text-align:center;border:1px dashed #333;border-radius:8px}.adm-target-fields.hidden{display:none}.adm-inline-actions{display:flex;gap:7px;margin-left:10px}.adm-inline-actions .btn{padding:7px 10px;font-size:.72rem}.adm-inline-actions [data-del-ach],.adm-inline-actions [data-del-act]{border-color:#761818;color:#ffb0b0}
      @media(max-width:760px){.adm-shell{grid-template-columns:1fr}.adm-sidebar{border-right:0;border-bottom:1px solid #262626}.adm-nav{flex-direction:row;overflow-x:auto}.adm-nav button{min-width:max-content}.adm-main{padding:18px;max-height:none}.adm-grid{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }
  const box=document.createElement('div');
  box.id='extAdmin';box.className='group';
  box.innerHTML=`<div class="adm-shell">
    <aside class="adm-sidebar"><div class="adm-sidebar-label">Administração</div><div class="adm-nav">
      <button class="active" data-ap="accounts">👤 Contas vinculadas</button>
      <button data-ap="achievements">🏆 Conquistas</button>
      <button data-ap="goals">🎯 Metas</button>
      <button data-ap="battleTheme">⚔️ Tema Battle</button>  
      <button data-ap="birthday">🎉 Evento de Aniversário</button>  
      <button data-ap="legacy">⚙️ Gestão antiga</button>
    </div></aside>
    <section class="adm-main">
      <div class="adm-panel active" data-panel="accounts"><div class="adm-head"><h3>Contas vinculadas</h3><p>Relacione os personagens do jogo ao perfil de acesso correto.</p></div>
        <div class="adm-grid"><div class="adm-card"><h4>Novo vínculo</h4>
          <div class="adm-field"><label>ID do usuário <small>Supabase profiles</small></label><input id="paUser" placeholder="Ex.: acd279f8-..."></div>
          <div class="adm-field"><label>Personagens <small>separados por vírgula</small></label><textarea id="paNicks" placeholder="Conta1, Conta2, Conta3"></textarea></div>
          <div class="adm-help">O ID correto está em Supabase → Table Editor → public.profiles, na mesma linha do e-mail do usuário.</div>
          <div class="adm-actions"><button id="paSave" class="adm-primary">Vincular personagens</button></div>
        </div><div class="adm-card"><h4>Vínculos visíveis para o Admin</h4><div id="paList" class="adm-list"></div></div></div>
      </div>
      <div class="adm-panel" data-panel="achievements"><div class="adm-head"><h3>Gerenciar conquistas</h3><p>Crie regras claras e defina para quem a conquista será aplicada.</p></div>
        <div class="adm-grid"><div class="adm-card"><h4>Nova conquista</h4>
          <div class="adm-field"><label>Nome da conquista</label><input id="acTitle" placeholder="Ex.: Primeiros 10k roubados"></div>
          <div class="adm-field"><label>Descrição</label><textarea id="acDescription" placeholder="Explique a regra para os membros"></textarea></div>
          <div class="adm-field"><label>Aplicar para</label><select id="acTarget"><option value="all_players">Todos os personagens</option><option value="player">Um personagem específico</option><option value="user">Todas as contas de um usuário</option></select></div>
          <div id="acTargetFields" class="adm-target-fields hidden"><div class="adm-field"><label>Identificador do alvo</label><input id="acTargetValue" placeholder="Nickname ou UUID do usuário"></div></div>
          <div class="adm-grid"><div class="adm-field"><label>Métrica</label><select id="acMetric"><option value="stolen">Hunt roubado</option><option value="lost">Hunt perdido</option><option value="balance">Saldo</option></select></div><div class="adm-field"><label>Período</label><select id="acPeriod"><option value="daily">Diário</option><option value="weekly">Semanal</option><option value="monthly" selected>Mensal</option></select></div></div>
          <div class="adm-field"><label>Valor necessário <small>em K de Hunt</small></label><input id="acValue" type="number" min="0" step="0.1" placeholder="10"></div>
          <div class="adm-actions"><button id="acSave" class="adm-primary">Criar conquista</button></div>
        </div><div class="adm-card"><h4>Conquistas ativas</h4><div id="acList" class="adm-list"></div></div></div>
      </div>
      <div class="adm-panel" data-panel="goals"><div class="adm-head"><h3>Gerenciar metas</h3><p>Defina se a meta pertence à guilda, a um personagem ou ao conjunto de contas de um usuário.</p></div>
        <div class="adm-grid"><div class="adm-card"><h4>Nova meta</h4>
          <div class="adm-field"><label>Nome da meta</label><input id="goTitle" placeholder="Ex.: Meta mensal da guilda"></div>
          <div class="adm-field"><label>Descrição</label><textarea id="goDescription" placeholder="Descreva o objetivo"></textarea></div>
          <div class="adm-field"><label>Meta para quem?</label><select id="goTarget"><option value="guild">Guilda inteira</option><option value="player">Um personagem específico</option><option value="user">Todas as contas de um usuário</option></select></div>
          <div id="goTargetFields" class="adm-target-fields hidden"><div class="adm-field"><label>Identificador do alvo</label><input id="goTargetValue" placeholder="Nickname ou UUID do usuário"></div></div>
          <div class="adm-grid"><div class="adm-field"><label>Métrica</label><select id="goMetric"><option value="stolen">Hunt roubado</option><option value="lost">Hunt perdido</option><option value="balance">Saldo positivo</option></select></div><div class="adm-field"><label>Período</label><select id="goPeriod"><option value="daily">Diário</option><option value="weekly">Semanal</option><option value="monthly" selected>Mensal</option></select></div></div>
          <div class="adm-field"><label>Valor da meta <small>em K de Hunt</small></label><input id="goValue" type="number" min="0.1" step="0.1" placeholder="500"></div>
          <div class="adm-actions"><button id="goSave" class="adm-primary">Criar meta</button></div>
        </div><div class="adm-card"><h4>Metas ativas</h4><div id="goList" class="adm-list"></div></div></div>
      </div>
      <div class="adm-panel" data-panel="battleTheme"><div class="adm-head"><h3>Tema Battle</h3><p>Escolha como o visual de guerra deve funcionar no site.</p></div><div class="adm-card"><h4>Modo de exibição</h4><div class="adm-field"><label>Configuração atual</label><select id="battleThemeMode"><option value="auto">Automático nos dias 5, 15 e 25</option><option value="on">Ativado</option><option value="off">Desativado</option></select></div><div class="adm-help">Automático ativa o tema nos dias 5, 15 e 25. Ativado aplica agora para todos. Desativado mantém o visual normal.</div><div class="adm-actions"><button id="battleThemeSave" class="adm-primary">Salvar configuração</button></div><div id="battleThemeStatus" class="auto-status" style="margin-top:14px">Carregando configuração...</div></div></div>  
      <div class="adm-panel" data-panel="birthday"><div class="adm-head"><h3>Evento de Aniversário</h3><p>Controle a exibição da aba do evento.</p></div><div class="adm-card"><div class="adm-field"><label>Exibir aba Aniversário</label><select id="birthdayToggle"><option value="false">Desativado</option><option value="true">Ativado</option></select></div><div class="adm-actions"><button id="birthdaySave" class="adm-primary">Salvar configuração</button></div></div></div>  
      <div class="adm-panel" data-panel="legacy"><div class="adm-head"><h3>Gestão antiga</h3><p>Acesse lançamentos manuais, membros, novatos, monitoramento e relatório PDF.</p></div><div id="legacyHost"></div></div>
    </section></div>`;
  const legacy=[...d.querySelectorAll(':scope > .group')].filter(x=>x.id!=='extAdmin');
  d.appendChild(box);const legacyHost=box.querySelector('#legacyHost');legacy.forEach(x=>{x.style.display='block';legacyHost.appendChild(x)});
  box.querySelectorAll('[data-ap]').forEach(btn=>btn.onclick=()=>{box.querySelectorAll('[data-ap]').forEach(x=>x.classList.toggle('active',x===btn));box.querySelectorAll('.adm-panel').forEach(x=>x.classList.toggle('active',x.dataset.panel===btn.dataset.ap))});
  const loadBirthdayAdmin=async()=>{const {data}=await sb.from('birthday_event_settings').select('enabled').eq('id',true).single();if(data&&$('#birthdayToggle'))$('#birthdayToggle').value=String(!!data.enabled)};loadBirthdayAdmin();if($('#birthdaySave'))$('#birthdaySave').onclick=async()=>{const {data:u}=await sb.auth.getUser(),enabled=$('#birthdayToggle').value==='true';const {error}=await sb.from('birthday_event_settings').update({enabled,updated_at:new Date().toISOString(),updated_by:u.user.id}).eq('id',true);if(error)return alert(error.message);S.birthdayEnabled=enabled;nav();if(!enabled&&S.tab==='birthday'){S.tab='overview';render()}alert('Configuração salva')};
  const loadBattleThemeAdmin=async()=>{const status=$('#battleThemeStatus'),{data,error}=await sb.from('battle_theme_settings').select('mode').eq('id',true).single();if(error){if(status){status.textContent=error.message;status.className='auto-status err'}return}if($('#battleThemeMode'))$('#battleThemeMode').value=data.mode||'auto';if(status){status.textContent='Modo atual: '+(data.mode==='auto'?'Automático':data.mode==='on'?'Ativado':'Desativado');status.className='auto-status ok'}};loadBattleThemeAdmin();if($('#battleThemeSave'))$('#battleThemeSave').onclick=async()=>{const btn=$('#battleThemeSave'),mode=$('#battleThemeMode').value,status=$('#battleThemeStatus');btn.disabled=true;try{const {data:u}=await sb.auth.getUser(),{error}=await sb.from('battle_theme_settings').update({mode,updated_at:new Date().toISOString(),updated_by:u.user.id}).eq('id',true);if(error)throw error;if(window.BloodBattleTheme)await window.BloodBattleTheme.reload();if(status){status.textContent='Configuração salva: '+(mode==='auto'?'Automático':mode==='on'?'Ativado':'Desativado');status.className='auto-status ok'}alert('Tema Battle atualizado')}catch(err){if(status){status.textContent=err.message;status.className='auto-status err'}alert(err.message)}finally{btn.disabled=false}};
  const targetToggle=(selectId,fieldsId)=>{$(selectId).onchange=e=>$(fieldsId).classList.toggle('hidden',['guild','all_players'].includes(e.target.value))};
  targetToggle('#acTarget','#acTargetFields');targetToggle('#goTarget','#goTargetFields');
  const refreshLists=()=>{const accountList=$('#paList'),acList=$('#acList'),goList=$('#goList');if(accountList)accountList.innerHTML=X.adminAccounts.length?X.adminAccounts.map(a=>{const owner=X.profilesById[a.user_id]||{};return `<div class="adm-list-item"><span><b>${esc(a.nickname)}</b><small class="sub"> ${esc(owner.display_name||owner.email||a.user_id)}</small><small class="sub" style="display:block">${esc(a.user_id)}</small></span><span class="tag">${a.active?'ATIVO':'INATIVO'}</span></div>`}).join(''):'<div class="adm-empty">Nenhum vínculo encontrado.</div>';if(acList)acList.innerHTML=X.achievements.length?X.achievements.map(a=>`<div class="adm-list-item"><span><b>${esc(a.title)}</b><small class="sub"> ${esc(a.period)} · ${esc(a.metric)}</small></span><b>${esc(a.threshold_k)}k</b></div>`).join(''):'<div class="adm-empty">Nenhuma conquista ativa.</div>';if(goList)goList.innerHTML=X.goals.length?X.goals.map(g=>`<div class="adm-list-item"><span><b>${esc(g.title)}</b><small class="sub"> ${esc(g.period)}</small></span><b>${esc(g.target_k)}k</b></div>`).join(''):'<div class="adm-empty">Nenhuma meta ativa.</div>'};
  refreshLists();
  $('#paSave').onclick=async()=>{const uid=$('#paUser').value.trim(),nicks=$('#paNicks').value.split(',').map(x=>x.trim()).filter(Boolean);if(!uid||!nicks.length)return alert('Informe o ID do usuário e pelo menos um nick.');const {data:userData}=await sb.auth.getUser(),actor=userData.user.id;let errorMessage='';for(const nick of nicks){const {data:existing,error:findError}=await sb.from('player_accounts').select('id,nickname').ilike('nickname',nick).limit(1);if(findError){errorMessage=findError.message;break}if(existing&&existing.length){const {error}=await sb.from('player_accounts').update({user_id:uid,nickname:nick,active:true,updated_by:actor}).eq('id',existing[0].id);if(error){errorMessage=error.message;break}}else{const {error}=await sb.from('player_accounts').insert({user_id:uid,nickname:nick,created_by:actor,updated_by:actor});if(error){errorMessage=error.message;break}}}alert(errorMessage||'Contas vinculadas');if(!errorMessage){$('#paNicks').value='';await extLoad();refreshLists()}};
  $('#acSave').onclick=async()=>{const {data}=await sb.auth.getUser(),payload={title:$('#acTitle').value.trim(),description:$('#acDescription').value.trim(),metric:$('#acMetric').value,period:$('#acPeriod').value,threshold_k:+$('#acValue').value,created_by:data.user.id,updated_by:data.user.id};if(!payload.title||!payload.threshold_k)return alert('Informe o nome e o valor da conquista.');const {error}=await sb.from('achievements').insert(payload);alert(error?error.message:'Conquista criada');if(!error){await extLoad();refreshLists()}};
  $('#goSave').onclick=async()=>{const {data}=await sb.auth.getUser(),payload={title:$('#goTitle').value.trim(),description:$('#goDescription').value.trim(),period:$('#goPeriod').value,target_k:+$('#goValue').value,created_by:data.user.id,updated_by:data.user.id};if(!payload.title||!payload.target_k)return alert('Informe o nome e o valor da meta.');const {error}=await sb.from('goals').insert(payload);alert(error?error.message:'Meta criada');if(!error){await extLoad();refreshLists()}};
}
function ensureAdminTools(){
  if(!isAdmin())return;
  const dialog=$('#admin');if(!dialog)return;
  if(!$('#extAdmin'))addAdminTools();
  if($('#extAdmin'))translateEnhancements($('#extAdmin'));
}
const originalAdminOpen=$('#admOpen')&&$('#admOpen').onclick;
if($('#admOpen'))$('#admOpen').onclick=()=>{ensureAdminTools();if(originalAdminOpen)originalAdminOpen();else $('#admin').showModal()};
setTimeout(ensureAdminTools,400);
setInterval(()=>{if(S.profile){extLoad().catch(()=>{});ensureAdminTools()}},30000);
setInterval(()=>translateEnhancements(document),800);
$('#siteLanguage')&&$('#siteLanguage').addEventListener('change',()=>setTimeout(()=>translateEnhancements(document),50));
})();
