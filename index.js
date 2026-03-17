/* ============================================================
   STYLE IT UP — index.js  (Homepage only)
   Requires: shared.js loaded before this file
   Usage: <script src="shared.js"></script>
          <script src="index.js"></script>
   ============================================================ */

/* ── TRENDING DATA (homepage extras) ── */
const TRENDING_ITEMS = [
  {
    id: 9,  name: 'Street Essential Hoodie', price: 2199,
    img: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=700'
  },
  {
    id: 10, name: 'Slim Fit Dark Jeans', price: 1699,
    img: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=500'
  },
  {
    id: 11, name: 'Casual Oxford Shirt', price: 1099,
    img: 'https://images.pexels.com/photos/769733/pexels-photo-769733.jpeg?auto=compress&cs=tinysrgb&w=500'
  },
  {
    id: 12, name: 'Leather Derby Shoes', price: 3299,
    img: 'https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?auto=compress&cs=tinysrgb&w=500'
  },
  {
    id: 4,  name: 'Oversized Graphic Tee', price: 699,
    img: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=500'
  },
];

/* ── RENDER FEATURED PRODUCTS ── */
function renderFeaturedProducts(list) {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  grid.innerHTML = list.map(p => siuProductCardHTML(p)).join('');
}

/* ── FILTER FEATURED PRODUCTS ── */
function filterProducts(cat, btnEl) {
  // Update active filter button
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  // Update active nav link
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

  const filtered = cat === 'all'
    ? SIU_PRODUCTS
    : cat === 'sale'
      ? SIU_PRODUCTS.filter(p => p.tag === 'Sale')
      : SIU_PRODUCTS.filter(p => p.cat === cat);

  renderFeaturedProducts(filtered);
}

/* ── RENDER TRENDING GRID ── */
function renderTrending() {
  const grid = document.getElementById('trending-grid');
  if (!grid) return;
  grid.innerHTML = TRENDING_ITEMS.map(p => `
    <div class="trend-card" onclick="location.href='product.html?id=${p.id}'">
      <img src="${p.img}" alt="${p.name}"
           onerror="this.onerror=null;this.src='https://picsum.photos/seed/tr${p.id}/700/600'"
           loading="lazy"/>
      <button class="trend-add"
              onclick="event.stopPropagation(); location.href='product.html?id=${p.id}'">
        + Add to Cart
      </button>
      <div class="trend-info">
        <div><div class="trend-name">${p.name}</div></div>
        <div class="trend-price">${siuFmt(p.price)}</div>
      </div>
    </div>`).join('');
}

/* ── NEWSLETTER SUBSCRIBE ── */
function subscribeNewsletter() {
  const input = document.getElementById('nl-email');
  if (!input) return;
  const email = input.value.trim();
  if (!email || !email.includes('@')) {
    siuToast('Enter a valid email address 📧', 'err');
    return;
  }
  input.value = '';
  siuToast("You're subscribed! Welcome to the club 🎉");
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedProducts(SIU_PRODUCTS);
  renderTrending();
});
