/* ============================================================
   STYLE IT UP — login.js  (Login / Register page)
   Requires: shared.js
   ============================================================ */

/* ── TAB SWITCHING ── */
function openTab(tab) {
  document.querySelectorAll('.tab-btn').forEach((btn, i) => {
    btn.classList.toggle('active', ['login', 'register'][i] === tab);
  });
  document.querySelectorAll('.form-panel').forEach((panel, i) => {
    panel.classList.toggle('active', ['panel-login', 'panel-register'][i] === 'panel-' + tab);
  });
}

/* ── SHOW MESSAGE ── */
function showMsg(id, msg, isErr) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.style.display = 'block';
  if (!isErr) setTimeout(() => el.style.display = 'none', 4000);
}

/* ── LOGIN ── */
function doLogin() {
  const email = document.getElementById('l-email')?.value.trim();
  const pass  = document.getElementById('l-pass')?.value;
  if (!email || !pass)         { showMsg('login-err', 'Please fill in all fields.', true); return; }
  if (!email.includes('@'))    { showMsg('login-err', 'Enter a valid email address.', true); return; }

  // Check registered users first
  const db   = JSON.parse(sessionStorage.getItem('siu_user_db') || '[]');
  const user = db.find(u => u.email === email && u.password === pass);

  if (user) {
    siuSaveUser({ firstName: user.firstName, lastName: user.lastName, email: user.email });
    showMsg('login-ok', 'Welcome back, ' + user.firstName + '! Redirecting…', false);
    setTimeout(() => location.href = 'account.html', 1200);
  } else if (email && pass.length >= 3) {
    // Demo login — allow any valid email + 3-char password
    const demo = { firstName: email.split('@')[0], lastName: '', email };
    siuSaveUser(demo);
    showMsg('login-ok', 'Signed in! Redirecting…', false);
    setTimeout(() => location.href = 'account.html', 1200);
  } else {
    showMsg('login-err', 'Invalid email or password.', true);
  }
}

/* ── REGISTER ── */
function doRegister() {
  const fn    = document.getElementById('r-fn')?.value.trim();
  const ln    = document.getElementById('r-ln')?.value.trim();
  const email = document.getElementById('r-email')?.value.trim();
  const phone = document.getElementById('r-phone')?.value.trim();
  const pass  = document.getElementById('r-pass')?.value;
  const pass2 = document.getElementById('r-pass2')?.value;

  if (!fn || !ln || !email || !pass) { showMsg('reg-err', 'Please fill in all required fields.', true); return; }
  if (!email.includes('@'))          { showMsg('reg-err', 'Enter a valid email address.', true); return; }
  if (pass.length < 8)               { showMsg('reg-err', 'Password must be at least 8 characters.', true); return; }
  if (pass !== pass2)                { showMsg('reg-err', 'Passwords do not match.', true); return; }

  const db = JSON.parse(sessionStorage.getItem('siu_user_db') || '[]');
  if (db.some(u => u.email === email)) { showMsg('reg-err', 'An account with this email already exists.', true); return; }

  db.push({ firstName: fn, lastName: ln, email, phone, password: pass });
  sessionStorage.setItem('siu_user_db', JSON.stringify(db));

  siuSaveUser({ firstName: fn, lastName: ln, email });
  showMsg('reg-ok', 'Account created! Welcome, ' + fn + '! Redirecting…', false);
  setTimeout(() => location.href = 'account.html', 1500);
}

/* ── SOCIAL LOGIN ── */
function socialLogin(provider) {
  siuSaveUser({ firstName: 'Style', lastName: 'User', email: 'user@styleitup.com' });
  location.href = 'account.html';
}

/* ── INIT: redirect if already logged in ── */
document.addEventListener('DOMContentLoaded', () => {
  if (siuGetUser()) location.href = 'account.html';
});
