/* ============================================================
   STYLE IT UP — contact.js  (Contact page)
   Requires: shared.js
   ============================================================ */

const FAQS = [
  ['How long does delivery take?',
   'Standard delivery takes 3–5 business days across India. Express delivery (1–2 days) is available for select pin codes at a small additional charge.'],
  ['What is your return policy?',
   'We offer a 7-day hassle-free return policy. Items must be unused, unwashed, and in original packaging with all tags intact. Initiate from your account dashboard.'],
  ['How do I track my order?',
   'Once your order ships, you\'ll receive a tracking link via email and SMS. You can also log into your account and check "My Orders".'],
  ['Can I exchange for a different size?',
   'Yes! Size exchanges are free. Initiate within 7 days of delivery. We\'ll arrange reverse pickup and redeliver the correct size.'],
  ['Do you offer Cash on Delivery?',
   'Yes, COD is available for most pin codes. A ₹40 COD handling fee applies. Pay via UPI or card for free delivery on orders above ₹999.'],
  ['Are your products authentic?',
   '100%. Every product is sourced directly from verified manufacturers and brand partners. We never sell counterfeit merchandise.'],
  ['Can I modify or cancel my order?',
   'You can cancel or modify within 2 hours of placing. After that it may already be packed — contact support as quickly as possible.'],
  ['Do you ship internationally?',
   'Currently we ship within India only. International shipping is on our roadmap — subscribe to our newsletter to stay updated!'],
];

/* ── RENDER FAQ ── */
function renderFAQ() {
  const grid = document.getElementById('faq-grid');
  if (!grid) return;
  grid.innerHTML = FAQS.map((f, i) => `
    <div class="faq-item" id="faq-${i}">
      <div class="faq-q" onclick="toggleFaq(${i})">${f[0]}<span class="faq-arrow">▼</span></div>
      <div class="faq-a">${f[1]}</div>
    </div>`).join('');
}

/* ── TOGGLE FAQ ── */
function toggleFaq(i) {
  const el     = document.getElementById('faq-' + i);
  const isOpen = el.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
  if (!isOpen) el.classList.add('open');
}

/* ── SUBMIT CONTACT FORM ── */
function submitContactForm() {
  const fn  = document.getElementById('cf-fn')?.value.trim();
  const em  = document.getElementById('cf-em')?.value.trim();
  const sub = document.getElementById('cf-sub')?.value;
  const msg = document.getElementById('cf-msg')?.value.trim();

  if (!fn)               { siuToast('Please enter your name', 'err');  return; }
  if (!em || !em.includes('@')) { siuToast('Please enter a valid email', 'err'); return; }
  if (!sub)              { siuToast('Please select a subject', 'err'); return; }
  if (!msg)              { siuToast('Please write a message', 'err');  return; }

  // Clear form
  ['cf-fn','cf-ln','cf-em','cf-ph','cf-oid','cf-msg'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const subEl = document.getElementById('cf-sub');
  if (subEl) subEl.value = '';

  const success = document.getElementById('form-success');
  if (success) success.style.display = 'block';

  siuToast('Message sent! We\'ll get back to you within 24 hours 📧');
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  renderFAQ();
  siuUpdateNavCounts();
});
