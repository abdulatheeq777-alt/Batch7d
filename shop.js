/* ============================================================
   STYLE IT UP — shop.js  (Shop page only)
   Requires: shared.js loaded before this file
   ============================================================ */

let shopView = 'grid';

/* ── READ CATEGORY FROM URL ── */
function shopGetCatFromURL() {
  return siuGetParam('cat') || 'all';
}

/* ── APPLY ALL ACTIVE FILTERS & RENDER ── */
function applyFilters() {
  let list = [...SIU_PRODUCTS];

  // Search query
  const q = (document.getElementById('search-input')?.value || '').toLowerCase().trim();
  if (q) list = list.filter(p => p.name.toLowerCase().includes(q) || p.cat.includes(q));

  // Category checkboxes
  const catCBs = [...document.querySelectorAll('.filter-sidebar input[type=checkbox][data-type=cat]')]
    .filter(c => c.checked).map(c => c.value);
  if (catCBs.length) list = list.filter(p => catCBs.includes(p.cat));

  // Sale only
  if (document.getElementById('sale-only')?.checked)
    list = list.filter(p => p.tag === 'Sale');

  // Price range
  const minP = parseFloat(document.getElementById('price-min')?.value) || 0;
  const maxP = parseFloat(document.getElementById('price-max')?.value) || 999999;
  list = list.filter(p => p.price >= minP && p.price <= maxP);

  // Size checkboxes
  const sizeCBs = [...document.querySelectorAll('.filter-sidebar input[type=checkbox][data-type=size]')]
    .filter(c => c.checked).map(c => c.value);
  if (sizeCBs.length) list = list.filter(p => p.sizes.some(s => sizeCBs.includes(s)));

  // Sort
  const sort = document.getElementById('sort-select')?.value || 'default';
  if (sort === 'price-asc')  list.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
  if (sort === 'rating')     list.sort((a, b) => b.stars - a.stars);

  renderProducts(list);
  renderActiveFilterChips(catCBs, sizeCBs, q);
}

/* ── RENDER PRODUCT GRID ── */
function renderProducts(list) {
  const grid = document.getElementById('products-grid');
  const countEl = document.getElementById('results-count');
  if (!grid) return;

  if (countEl) countEl.textContent = list.length;

  if (!list.length) {
    const span = shopView === 'grid' ? 3 : 1;
    grid.innerHTML = `
      <div class="no-results" style="grid-column:span ${span}">
        <span class="icon">🔍</span>
        No products match your filters.<br/>
        <a href="shop.html" style="color:var(--tan);text-decoration:none;font-weight:600;margin-top:10px;display:inline-block">Clear all filters →</a>
      </div>`;
    return;
  }

  grid.innerHTML = list.map(p => siuProductCardHTML(p)).join('');
}

/* ── ACTIVE FILTER CHIPS ── */
function renderActiveFilterChips(cats, sizes, query) {
  const wrap = document.getElementById('active-filters');
  if (!wrap) return;
  let html = '';
  cats.forEach(c  => { html += `<span class="filter-chip" onclick="removeCatFilter('${c}')">${c} ✕</span>`; });
  sizes.forEach(s => { html += `<span class="filter-chip" onclick="removeSizeFilter('${s}')">Size: ${s} ✕</span>`; });
  if (document.getElementById('sale-only')?.checked)
    html += `<span class="filter-chip" onclick="document.getElementById('sale-only').checked=false;applyFilters()">On Sale ✕</span>`;
  if (query)
    html += `<span class="filter-chip" onclick="document.getElementById('search-input').value='';applyFilters()">"${query}" ✕</span>`;
  wrap.innerHTML = html;
}

function removeCatFilter(cat) {
  const cb = document.querySelector(`.filter-sidebar input[data-type=cat][value="${cat}"]`);
  if (cb) { cb.checked = false; applyFilters(); }
}
function removeSizeFilter(size) {
  const cb = document.querySelector(`.filter-sidebar input[data-type=size][value="${size}"]`);
  if (cb) { cb.checked = false; applyFilters(); }
}

/* ── CLEAR ALL FILTERS ── */
function clearAllFilters() {
  document.querySelectorAll('.filter-sidebar input[type=checkbox]').forEach(c => c.checked = false);
  if (document.getElementById('price-min')) document.getElementById('price-min').value = '';
  if (document.getElementById('price-max')) document.getElementById('price-max').value = '';
  if (document.getElementById('search-input')) document.getElementById('search-input').value = '';
  history.replaceState(null, '', location.pathname);
  applyFilters();
}

/* ── GRID / LIST VIEW TOGGLE ── */
function setView(v) {
  shopView = v;
  const grid = document.getElementById('products-grid');
  if (grid) grid.classList.toggle('list-view', v === 'list');
  document.getElementById('grid-btn')?.classList.toggle('active', v === 'grid');
  document.getElementById('list-btn')?.classList.toggle('active', v === 'list');
}

/* ── HIGHLIGHT ACTIVE QUICK BUTTON ── */
function highlightQuickBtn(cat) {
  document.querySelectorAll('.cat-quick-btn').forEach(btn => {
    const btnCat = btn.dataset.cat || '';
    const isActive = btnCat === cat || (cat === 'all' && btnCat === 'all');
    btn.classList.toggle('active', isActive);
  });
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  const cat = shopGetCatFromURL();

  // Pre-check category filter from URL
  if (cat && cat !== 'all') {
    // Update hero title
    const titleEl = document.getElementById('hero-title');
    const bcEl    = document.getElementById('bc-cat');
    const label   = cat.charAt(0).toUpperCase() + cat.slice(1);
    if (titleEl) titleEl.textContent = label;
    if (bcEl)    bcEl.textContent    = label;

    if (cat === 'sale') {
      const so = document.getElementById('sale-only');
      if (so) so.checked = true;
    } else {
      const cb = document.querySelector(`.filter-sidebar input[data-type=cat][value="${cat}"]`);
      if (cb) cb.checked = true;
    }
    highlightQuickBtn(cat);
  } else {
    highlightQuickBtn('all');
  }

  applyFilters();
});
