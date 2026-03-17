/* ============================================================
   STYLE IT UP — product.js  (Product Detail page)
   Requires: shared.js
   ============================================================ */

let activeProd = null;
let prodQty    = 1;
let selSize    = '';
let selColor   = '';

/* ── GALLERY ── */
function setMainImg(src, thumbEl) {
  const mi = document.getElementById('main-img');
  if (mi) mi.src = src;
  document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
  if (thumbEl) thumbEl.classList.add('active');
}

/* ── SIZE / COLOUR SELECTION ── */
function pickSize(s, btn) {
  selSize = s;
  document.querySelectorAll('.sz-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}
function pickColor(c, btn) {
  selColor = c;
  document.querySelectorAll('.col-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

/* ── QUANTITY ── */
function changeQty(delta) {
  prodQty = Math.max(1, prodQty + delta);
  const el = document.getElementById('qty-display');
  if (el) el.textContent = prodQty;
}

/* ── TABS ── */
function openTab(name) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === name));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'tab-' + name));
}

/* ── ADD TO CART ── */
function doAddCart() {
  if (!selSize) { siuToast('Please select a size 👆', 'err'); return; }
  siuAddToCart(activeProd, selSize, prodQty);
}

/* ── BUY NOW ── */
function doBuyNow() {
  if (!selSize) { siuToast('Please select a size 👆', 'err'); return; }
  if (siuAddToCart(activeProd, selSize, prodQty)) {
    location.href = 'cart.html';
  }
}

/* ── WISHLIST ── */
function doToggleWish() {
  if (!activeProd) return;
  const nowWishlisted = siuToggleWish(activeProd);
  const btn = document.getElementById('wish-btn');
  if (btn) {
    btn.textContent = nowWishlisted ? '❤️' : '🤍';
    btn.classList.toggle('wishlisted', nowWishlisted);
  }
}

/* ── RENDER PRODUCT ── */
function renderProduct(p) {
  activeProd = p;
  document.title = p.name + ' — Style It Up';

  // Breadcrumb
  const bcCat  = document.getElementById('bc-cat');
  const bcName = document.getElementById('bc-name');
  if (bcCat)  { bcCat.textContent = p.cat.charAt(0).toUpperCase() + p.cat.slice(1); bcCat.href = 'shop.html?cat=' + p.cat; }
  if (bcName) bcName.textContent = p.name;

  const iw   = siuIsWishlisted(p.id);
  const save = p.old ? Math.round((p.old - p.price) / p.old * 100) : 0;

  document.getElementById('product-detail').innerHTML = `
    <!-- GALLERY -->
    <div class="gallery">
      <div class="main-img">
        <img id="main-img" src="${p.imgs[0]}" alt="${p.name}"
             onerror="this.onerror=null;this.src='https://picsum.photos/seed/pd${p.id}/800/1000'"/>
      </div>
      <div class="thumb-row">
        ${p.imgs.map((img, i) => `
          <div class="thumb ${i === 0 ? 'active' : ''}"
               onclick="setMainImg('${img}', this)">
            <img src="${img}" alt="view ${i+1}"
                 onerror="this.onerror=null;this.src='https://picsum.photos/seed/th${p.id}${i}/120/150'"/>
          </div>`).join('')}
      </div>
    </div>

    <!-- INFO -->
    <div class="prod-info">
      ${p.tag ? `<span class="prod-tag">${p.tag}</span>` : ''}
      <div class="prod-brand">${p.brand}</div>
      <div class="prod-name">${p.name}</div>
      <div class="prod-rating">
        <span class="stars">${siuStars(p.stars)}</span>
        <span class="rating-count">${p.stars}.0 (${Math.floor(Math.random()*200+50)} reviews)</span>
      </div>
      <div class="prod-price">
        ${siuFmt(p.price)}
        ${p.old ? `<span class="old">${siuFmt(p.old)}</span><span class="save">Save ${save}%</span>` : ''}
      </div>
      <div class="prod-desc">${p.desc}</div>

      <div class="option-label">Select Size</div>
      <div class="size-btns">
        ${p.sizes.map(s => `<button class="sz-btn" onclick="pickSize('${s}',this)">${s}</button>`).join('')}
      </div>

      <div class="option-label">Select Colour</div>
      <div class="color-btns">
        ${p.colors.map(c => `<button class="col-btn" onclick="pickColor('${c}',this)">${c}</button>`).join('')}
      </div>

      <div class="option-label">Quantity</div>
      <div class="qty-row">
        <button class="qty-btn" onclick="changeQty(-1)">−</button>
        <span class="qty-val" id="qty-display">1</span>
        <button class="qty-btn" onclick="changeQty(1)">+</button>
      </div>

      <div class="action-row">
        <button class="btn-add-cart" onclick="doAddCart()">Add to Cart 🛒</button>
        <button class="btn-wish ${iw ? 'wishlisted' : ''}" id="wish-btn" onclick="doToggleWish()">${iw ? '❤️' : '🤍'}</button>
      </div>
      <button class="btn-buy-now" onclick="doBuyNow()">Buy Now →</button>

      <div class="product-meta">
        <div class="meta-row"><span class="meta-icon">🚚</span><div class="meta-text"><strong>Free Delivery</strong> <span>on orders above ₹999</span></div></div>
        <div class="meta-row"><span class="meta-icon">↩️</span><div class="meta-text"><strong>Easy Returns</strong> <span>7-day hassle-free returns</span></div></div>
        <div class="meta-row"><span class="meta-icon">✅</span><div class="meta-text"><strong>Genuine Product</strong> <span>100% authentic</span></div></div>
        <div class="meta-row"><span class="meta-icon">🔒</span><div class="meta-text"><strong>Secure Payment</strong> <span>UPI, Card, COD accepted</span></div></div>
      </div>

      <div class="tabs">
        <div class="tab-btns">
          <button class="tab-btn active" data-tab="details"  onclick="openTab('details')">Details</button>
          <button class="tab-btn"        data-tab="care"     onclick="openTab('care')">Care</button>
          <button class="tab-btn"        data-tab="size"     onclick="openTab('size')">Size Guide</button>
          <button class="tab-btn"        data-tab="reviews"  onclick="openTab('reviews')">Reviews</button>
        </div>
        <div class="tab-panel active" id="tab-details">
          <p>${p.desc}</p><br/>
          <ul>
            <li>Brand: ${p.brand}</li>
            <li>Category: ${p.cat.charAt(0).toUpperCase() + p.cat.slice(1)}</li>
            <li>Available Colours: ${p.colors.join(', ')}</li>
            <li>Available Sizes: ${p.sizes.join(', ')}</li>
          </ul>
        </div>
        <div class="tab-panel" id="tab-care">
          <ul>
            <li>Machine wash cold, gentle cycle</li>
            <li>Do not bleach</li>
            <li>Tumble dry low or hang dry</li>
            <li>Iron on low heat if needed</li>
            <li>Do not dry clean</li>
          </ul>
        </div>
        <div class="tab-panel" id="tab-size">
          <p style="margin-bottom:12px">Refer to the chart below for best fit:</p>
          <table class="size-table">
            <tr><th>Size</th><th>Chest (cm)</th><th>Waist (cm)</th></tr>
            <tr><td>S</td><td>86–91</td><td>71–76</td></tr>
            <tr><td>M</td><td>91–97</td><td>76–81</td></tr>
            <tr><td>L</td><td>97–102</td><td>81–86</td></tr>
            <tr><td>XL</td><td>102–107</td><td>86–91</td></tr>
            <tr><td>XXL</td><td>107–112</td><td>91–96</td></tr>
          </table>
        </div>
        <div class="tab-panel" id="tab-reviews">
          ${[
            ['Arjun S.',  '★★★★★', 'Excellent quality! The fabric is really smooth and the fit is perfect.'],
            ['Rohit M.',  '★★★★☆', 'Good product. Delivery was fast. Slight colour difference from photo but overall satisfied.'],
            ['Kiran P.',  '★★★★★', 'Superb! Exactly as described. Size guide was accurate. Highly recommend.']
          ].map(([name, stars, text]) => `
            <div class="review-item">
              <div class="review-header">
                <span class="review-name">${name}</span>
                <span class="review-stars">${stars}</span>
              </div>
              <p class="review-text">${text}</p>
            </div>`).join('')}
        </div>
      </div>
    </div>`;
}

/* ── RENDER RELATED ── */
function renderRelated(p) {
  const grid = document.getElementById('rel-grid');
  if (!grid) return;
  const related = SIU_PRODUCTS.filter(x => x.id !== p.id && x.cat === p.cat).slice(0, 4);
  grid.innerHTML = related.map(r => `
    <div class="product-card" onclick="location.href='product.html?id=${r.id}'">
      <div class="product-img-wrap">
        <img src="${r.imgs[0]}" alt="${r.name}"
             onerror="this.onerror=null;this.src='https://picsum.photos/seed/rp${r.id}/500/650'"
             loading="lazy"/>
        ${r.tag ? `<span class="product-tag">${r.tag}</span>` : ''}
      </div>
      <div class="product-info">
        <div class="product-brand">${r.brand}</div>
        <div class="product-name">${r.name}</div>
        <div class="product-footer">
          <div class="product-price">${siuFmt(r.price)}${r.old ? `<span class="old">${siuFmt(r.old)}</span>` : ''}</div>
          <button class="add-btn" onclick="event.stopPropagation();location.href='product.html?id=${r.id}'">View →</button>
        </div>
      </div>
    </div>`).join('');
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  const id = parseInt(siuGetParam('id'));
  const p  = SIU_PRODUCTS.find(x => x.id === id);
  if (!p) {
    document.getElementById('product-detail').innerHTML =
      `<div style="padding:60px;text-align:center;color:var(--mid)">
         Product not found. <a href="shop.html" style="color:var(--rust)">Back to shop →</a>
       </div>`;
    return;
  }
  renderProduct(p);
  renderRelated(p);
});
