/* ============================================================
   STYLE IT UP — account.js  (My Account page)
   Requires: shared.js
   ============================================================ */

/* ── TAB NAVIGATION ── */
function openTab(name) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sidebar-nav-item').forEach(i => i.classList.remove('active'));

  const panel = document.getElementById('tab-' + name);
  if (panel) panel.classList.add('active');
  if (event && event.currentTarget) event.currentTarget.classList.add('active');
}

/* ── SIGN OUT ── */
function doLogout() {
  sessionStorage.removeItem('siu_user');
  location.href = 'login.html';
}

/* ── SAVE PROFILE ── */
function saveProfile() {
  const user = siuGetUser() || {};
  user.firstName = document.getElementById('pf-fn')?.value || user.firstName;
  user.lastName  = document.getElementById('pf-ln')?.value || user.lastName;
  user.email     = document.getElementById('pf-em')?.value || user.email;
  siuSaveUser(user);
  siuToast('Profile saved! ✓');
  loadUser();
}

/* ── LOAD USER DATA INTO UI ── */
function loadUser() {
  const user = siuGetUser();
  if (!user) { location.href = 'login.html'; return; }

  const initials = ((user.firstName?.[0] || '') + (user.lastName?.[0] || 'U')).toUpperCase();
  const avatarEl   = document.getElementById('avatar-initials');
  const greetEl    = document.getElementById('user-greeting');
  const emailEl    = document.getElementById('user-email-display');
  const wishStatEl = document.getElementById('wish-stat');

  if (avatarEl)   avatarEl.textContent   = initials;
  if (greetEl)    greetEl.textContent    = 'Hello, ' + user.firstName + '!';
  if (emailEl)    emailEl.textContent    = user.email;
  if (wishStatEl) wishStatEl.textContent = siuGetWish().length;

  // Pre-fill profile form
  if (document.getElementById('pf-fn')) document.getElementById('pf-fn').value = user.firstName || '';
  if (document.getElementById('pf-ln')) document.getElementById('pf-ln').value = user.lastName  || '';
  if (document.getElementById('pf-em')) document.getElementById('pf-em').value = user.email     || '';
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  loadUser();
  siuUpdateNavCounts();
});
