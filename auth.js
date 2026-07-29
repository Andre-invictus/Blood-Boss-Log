(() => {
  'use strict';

  const SUPABASE_URL = 'https://esysuyjparcthlfxdpks.supabase.co';
  const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_p1obVXsYWqvhfjHTnAYaCA_21ZHCSHH';
  const RESET_URL = 'https://blood-boss-log.vercel.app/reset-password.html';

  const state = { client: null, profile: null, started: false };

  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      html.auth-pending body > *:not(#supabase-auth-root) { visibility: hidden !important; }
      #supabase-auth-root { position: fixed; inset: 0; z-index: 2147483647; display: grid; place-items: center; padding: 20px; background: radial-gradient(circle at top, #260000 0, #070707 48%, #020202 100%); color: #f5f5f5; font-family: Inter, Arial, sans-serif; }
      #supabase-auth-root.is-hidden { display: none; }
      .sa-card { width: min(430px, 94vw); padding: 28px; border: 1px solid #3a1515; border-top: 3px solid #da0000; border-radius: 12px; background: #0d0d0df2; box-shadow: 0 24px 80px #000, 0 0 35px #da000025; }
      .sa-brand { text-align: center; margin-bottom: 22px; }
      .sa-brand img { height: 105px; max-width: 90%; object-fit: contain; }
      .sa-brand h1 { margin: 7px 0 0; color: #fff; font: italic 700 2rem Teko, Arial, sans-serif; }
      .sa-brand p, .sa-status { color: #9a9a9a; font-size: .88rem; }
      .sa-field { margin: 14px 0; }
      .sa-field label { display: block; margin-bottom: 5px; color: #aaa; font-size: .8rem; }
      .sa-field input { width: 100%; box-sizing: border-box; padding: 12px; border: 1px solid #333; border-radius: 6px; background: #050505; color: #fff; font: inherit; }
      .sa-button { width: 100%; padding: 12px; border: 0; border-radius: 6px; background: #da0000; color: #fff; font-weight: 800; cursor: pointer; }
      .sa-button:disabled { opacity: .55; cursor: wait; }
      .sa-link { margin-top: 13px; border: 0; background: transparent; color: #63c4ff; text-decoration: underline; cursor: pointer; }
      .sa-message { display: none; margin: 12px 0; padding: 10px; border: 1px solid #771515; border-radius: 6px; background: #2b0808; color: #ffc1c1; font-size: .84rem; }
      .sa-message.show { display: block; }
      #supabase-userbar { display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap; padding: 8px 14px; border-bottom: 1px solid #292929; background: #0a0a0a; color: #aaa; font: 600 .8rem Inter, Arial, sans-serif; }
      #supabase-userbar strong { color: #fff; }
      .sa-role { padding: 3px 8px; border: 1px solid #6d1919; border-radius: 999px; background: #2b1010; color: #ffb1b1; text-transform: uppercase; }
      .sa-logout { padding: 5px 10px; border: 1px solid #da0000; border-radius: 5px; background: #111; color: #fff; cursor: pointer; }
    `;
    document.head.appendChild(style);
  }

  function authMarkup() {
    const root = document.createElement('section');
    root.id = 'supabase-auth-root';
    root.innerHTML = `
      <div class="sa-card">
        <div class="sa-brand">
          <img src="undefined_-_Imgur.png" alt="Blood Esports">
          <h1>ACESSO RESTRITO</h1>
          <p>Entre com uma conta autorizada da guilda.</p>
        </div>
        <div id="sa-loading" class="sa-status">Verificando sessão...</div>
        <form id="sa-form" hidden>
          <div class="sa-field"><label for="sa-email">E-mail</label><input id="sa-email" type="email" autocomplete="username" required></div>
          <div class="sa-field"><label for="sa-password">Senha</label><input id="sa-password" type="password" autocomplete="current-password" minlength="8" required></div>
          <div id="sa-message" class="sa-message" role="alert"></div>
          <button id="sa-login" class="sa-button" type="submit">Entrar</button>
          <button id="sa-forgot" class="sa-link" type="button">Esqueci minha senha</button>
        </form>
      </div>`;
    document.body.prepend(root);
  }

  function message(text) {
    const el = document.getElementById('sa-message');
    el.textContent = text;
    el.classList.add('show');
  }

  function showLogin(text = '') {
    document.documentElement.classList.add('auth-pending');
    document.getElementById('supabase-auth-root').classList.remove('is-hidden');
    document.getElementById('sa-loading').hidden = true;
    document.getElementById('sa-form').hidden = false;
    if (text) message(text);
  }

  function createUserbar(profile) {
    document.getElementById('supabase-userbar')?.remove();
    const bar = document.createElement('div');
    bar.id = 'supabase-userbar';
    bar.innerHTML = `<span>Conectado como <strong></strong></span><span class="sa-role"></span><button class="sa-logout" type="button">Sair</button>`;
    bar.querySelector('strong').textContent = profile.display_name || profile.email;
    bar.querySelector('.sa-role').textContent = profile.role;
    bar.querySelector('.sa-logout').addEventListener('click', async () => {
      localStorage.removeItem('blood_admin_logged');
      await state.client.auth.signOut();
      location.reload();
    });
    const header = document.querySelector('header');
    header?.insertAdjacentElement('afterend', bar);
  }

  function applyPermissions(profile) {
    const canAdmin = ['admin', 'officer'].includes(profile.role);
    const trigger = document.querySelector('.admin-trigger');
    if (trigger) trigger.style.display = canAdmin ? '' : 'none';
    if (canAdmin) {
      localStorage.setItem('blood_admin_logged', 'true');
      const loginSection = document.getElementById('loginSection');
      const configSection = document.getElementById('configSection');
      if (loginSection) loginSection.style.display = 'none';
      if (configSection) configSection.style.display = 'block';
    } else {
      localStorage.removeItem('blood_admin_logged');
    }
  }

  async function readProfile(user) {
    const { data, error } = await state.client.from('profiles').select('id,email,display_name,role,active').eq('id', user.id).single();
    if (error) throw new Error('Perfil de acesso não encontrado.');
    if (!data.active) throw new Error('Esta conta está desativada.');
    return data;
  }

  async function acceptSession(session) {
    if (!session?.user) return false;
    try {
      state.profile = await readProfile(session.user);
      applyPermissions(state.profile);
      createUserbar(state.profile);
      document.getElementById('supabase-auth-root').classList.add('is-hidden');
      document.documentElement.classList.remove('auth-pending');
      return true;
    } catch (error) {
      await state.client.auth.signOut();
      showLogin(error.message);
      return false;
    }
  }

  async function initialize() {
    document.documentElement.classList.add('auth-pending');
    injectStyles();
    authMarkup();

    if (!window.supabase?.createClient) {
      showLogin('Não foi possível carregar o sistema de autenticação. Atualize a página.');
      return;
    }

    state.client = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    });

    const { data: { session } } = await state.client.auth.getSession();
    if (!(await acceptSession(session))) showLogin();

    document.getElementById('sa-form').addEventListener('submit', async event => {
      event.preventDefault();
      const button = document.getElementById('sa-login');
      const email = document.getElementById('sa-email').value.trim();
      const password = document.getElementById('sa-password').value;
      document.getElementById('sa-message').classList.remove('show');
      button.disabled = true;
      button.textContent = 'Entrando...';
      const { data, error } = await state.client.auth.signInWithPassword({ email, password });
      if (error) {
        message(error.message === 'Invalid login credentials' ? 'E-mail ou senha inválidos.' : error.message);
      } else {
        await acceptSession(data.session);
      }
      button.disabled = false;
      button.textContent = 'Entrar';
    });

    document.getElementById('sa-forgot').addEventListener('click', async () => {
      const email = document.getElementById('sa-email').value.trim();
      if (!email) return message('Digite o e-mail antes de solicitar a recuperação.');
      const { error } = await state.client.auth.resetPasswordForEmail(email, { redirectTo: RESET_URL });
      message(error ? error.message : 'Se a conta existir, o link de recuperação será enviado.');
    });

    state.client.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') showLogin();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize);
  else initialize();
})();
