/* ============================================================
   STYLE IT UP — shared.js
   Include this in every HTML page:
   <script src="shared.js"></script>
   ============================================================ */

/* ── PRODUCT DATA ── */
const SIU_PRODUCTS = [
  {
    id: 1, name: 'Premium Linen Shirt', brand: 'Style It Up', cat: 'shirts',
    price: 1299, old: 1899, tag: 'New', stars: 5,
    sizes: ['S','M','L','XL','XXL'], colors: ['Beige','White','Sky Blue'],
    desc: 'Breathable 100% linen shirt perfect for summer. Relaxed fit with a classic collar. Machine washable.',
    imgs: [
      'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=700',
      'https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=700'
    ]
  },
  {
    id: 2, name: 'Classic Bomber Jacket', brand: 'Style It Up', cat: 'jackets',
    price: 3499, old: 4999, tag: 'Hot', stars: 4,
    sizes: ['S','M','L','XL'], colors: ['Olive','Black','Navy'],
    desc: 'Timeless bomber in premium polyester with ribbed cuffs. Slim fit. Zip-up front with inner chest pocket.',
    imgs: [
      'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=700',
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=700'
    ]
  },
  {
    id: 3, name: 'Slim Fit Chinos', brand: 'Style It Up', cat: 'bottoms',
    price: 1799, old: null, tag: null, stars: 5,
    sizes: ['28','30','32','34','36'], colors: ['Navy','Khaki','Olive'],
    desc: 'Tailored slim-fit chinos in stretch cotton. Smart-casual staple for day to night.',
    imgs: [
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=700',
      'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=700'
    ]
  },
  {
    id: 4, name: 'Oversized Graphic Tee', brand: 'Style It Up', cat: 'shirts',
    price: 699, old: 999, tag: 'Sale', stars: 4,
    sizes: ['S','M','L','XL','XXL'], colors: ['White','Black','Grey'],
    desc: '100% cotton oversized tee. Drop-shoulder streetwear cut. Pre-shrunk 180 GSM fabric.',
    imgs: [
      'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=700',
      'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=700'
    ]
  },
  {
    id: 5, name: 'Canvas Low-Top Sneakers', brand: 'Style It Up', cat: 'footwear',
    price: 1599, old: 2199, tag: 'Sale', stars: 4,
    sizes: ['6','7','8','9','10','11'], colors: ['White','Black','Tan'],
    desc: 'Lightweight canvas sneakers with rubber sole. Padded insole for all-day comfort.',
    imgs: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=700',
      'https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?auto=compress&cs=tinysrgb&w=700'
    ]
  },
  {
    id: 6, name: 'Denim Trucker Jacket', brand: 'Style It Up', cat: 'jackets',
    price: 2899, old: 3999, tag: 'Sale', stars: 5,
    sizes: ['S','M','L','XL'], colors: ['Light Wash','Dark Wash'],
    desc: 'Stone-washed denim jacket. Slightly oversized, chest pockets, button-up front. 100% cotton.',
    imgs: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=700',
      'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=700'
    ]
  },
  {
    id: 7, name: 'Relaxed Polo Shirt', brand: 'Style It Up', cat: 'shirts',
    price: 899, old: null, tag: null, stars: 4,
    sizes: ['S','M','L','XL','XXL'], colors: ['Navy','White','Burgundy'],
    desc: 'Piqué cotton polo with 3-button placket. Smart casual — works for office or weekends.',
    imgs: [
      'https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=700'
    ]
  },
  {
    id: 8, name: 'Tapered Cargo Pants', brand: 'Style It Up', cat: 'bottoms',
    price: 1499, old: 1999, tag: 'Sale', stars: 4,
    sizes: ['28','30','32','34','36'], colors: ['Olive','Khaki','Black'],
    desc: 'Multi-pocket cargo pants in cotton-twill. Tapered fit, adjustable hem, side zip pockets.',
    imgs: [
      'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=700',
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=700'
    ]
  },
  {
    id: 9, name: 'Street Essential Hoodie', brand: 'Style It Up', cat: 'shirts',
    price: 2199, old: null, tag: 'New', stars: 5,
    sizes: ['S','M','L','XL'], colors: ['Charcoal','Black','Cream'],
    desc: 'Heavyweight 320 GSM cotton-fleece hoodie. Kangaroo pocket, drawstring hood, ribbed cuffs.',
    imgs: [
      'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=700'
    ]
  },
  {
    id: 10, name: 'Slim Fit Dark Jeans', brand: 'Style It Up', cat: 'bottoms',
    price: 1699, old: null, tag: null, stars: 4,
    sizes: ['28','30','32','34'], colors: ['Dark Indigo','Black'],
    desc: 'Stretch denim slim-fit in dark indigo wash. Five-pocket. Slight stretch for comfort.',
    imgs: [
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=700'
    ]
  },
  {
    id: 11, name: 'Casual Oxford Shirt', brand: 'Style It Up', cat: 'shirts',
    price: 1099, old: null, tag: null, stars: 5,
    sizes: ['S','M','L','XL','XXL'], colors: ['Blue','White','Pink'],
    desc: 'Lightweight Oxford weave shirt. Button-down collar. Easy-iron 100% cotton.',
    imgs: [
      'https://images.pexels.com/photos/769733/pexels-photo-769733.jpeg?auto=compress&cs=tinysrgb&w=700'
    ]
  },
  {
    id: 12, name: 'Leather Derby Shoes', brand: 'Style It Up', cat: 'footwear',
    price: 3299, old: null, tag: null, stars: 5,
    sizes: ['6','7','8','9','10'], colors: ['Tan','Black'],
    desc: 'Full-grain leather derby with rubber sole. Handcrafted, classic brogue detailing.',
    imgs: [
      'https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?auto=compress&cs=tinysrgb&w=700',
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=700'
    ]
  }
];

/* ── HELPERS ── */
function siuFmt(n) {
  return '₹' + n.toLocaleString('en-IN');
}

function siuStars(n) {
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

function siuFallbackImg(el, id) {
  el.onerror = null;
  el.src = 'https://picsum.photos/seed/siu' + id + '/' + (el.dataset.w || '500') + '/' + (el.dataset.h || '650');
}

/* ── SESSIONSSTORAGE HELPERS ── */
function siuGetCart()     { try { return JSON.parse(sessionStorage.getItem('siu_cart'))    || []; } catch { return []; } }
function siuSaveCart(c)   { sessionStorage.setItem('siu_cart', JSON.stringify(c)); }
function siuGetWish()     { try { return JSON.parse(sessionStorage.getItem('siu_wish'))    || []; } catch { return []; } }
function siuSaveWish(w)   { sessionStorage.setItem('siu_wish', JSON.stringify(w)); }
function siuGetUser()     { try { return JSON.parse(sessionStorage.getItem('siu_user'))    || null; } catch { return null; } }
function siuSaveUser(u)   { sessionStorage.setItem('siu_user', JSON.stringify(u)); }

/* ── CART ── */
function siuCartCount() {
  return siuGetCart().reduce((a, i) => a + i.qty, 0);
}

function siuAddToCart(prod, size, qty = 1) {
  if (!size) { siuToast('Please select a size first 👆', 'err'); return false; }
  const cart = siuGetCart();
  const existing = cart.find(i => i.id === prod.id && i.size === size);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id:    prod.id,
      name:  prod.name,
      price: prod.price,
      old:   prod.old || null,
      img:   prod.imgs ? prod.imgs[0] : prod.img,
      size,
      qty
    });
  }
  siuSaveCart(cart);
  siuUpdateNavCounts();
  siuToast(prod.name + ' added to cart 🛒');
  return true;
}

function siuRemoveFromCart(id, size) {
  const cart = siuGetCart().filter(i => !(i.id === id && i.size === size));
  siuSaveCart(cart);
  siuUpdateNavCounts();
}

function siuChangeCartQty(id, size, delta) {
  const cart = siuGetCart();
  const item = cart.find(i => i.id === id && i.size === size);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  siuSaveCart(cart);
  siuUpdateNavCounts();
}

function siuClearCart() {
  siuSaveCart([]);
  siuUpdateNavCounts();
}

function siuCartTotal() {
  return siuGetCart().reduce((a, i) => a + (i.price * i.qty), 0);
}

/* ── WISHLIST ── */
function siuToggleWish(prod) {
  const wish = siuGetWish();
  const idx  = wish.findIndex(w => w.id === prod.id);
  if (idx > -1) {
    wish.splice(idx, 1);
    siuToast('Removed from wishlist');
  } else {
    wish.push(prod);
    siuToast(prod.name + ' saved to wishlist 🤍');
  }
  siuSaveWish(wish);
  siuUpdateNavCounts();
  return wish.some(w => w.id === prod.id); // returns new state
}

function siuIsWishlisted(id) {
  return siuGetWish().some(w => w.id === id);
}

/* ── NAV COUNT UPDATE ── */
function siuUpdateNavCounts() {
  const cc = document.getElementById('nav-cart-count');
  const wc = document.getElementById('nav-wish-count');
  if (cc) cc.textContent = siuCartCount();
  if (wc) wc.textContent = siuGetWish().length;
}

/* ── TOAST ── */
function siuToast(msg, type) {
  let tc = document.getElementById('toast-container');
  if (!tc) {
    tc = document.createElement('div');
    tc.id = 'toast-container';
    document.body.appendChild(tc);
  }
  const t = document.createElement('div');
  t.className = 'toast' + (type === 'err' ? ' err' : '');
  t.textContent = msg;
  tc.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 400);
  }, 3200);
}

/* ── BACK TO TOP ── */
function siuInitBackTop() {
  const btn = document.getElementById('back-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  });
}

/* ── PRODUCT CARD HTML GENERATOR ── */
// Pass a product object; returns an HTML string ready to inject
function siuProductCardHTML(p, opts = {}) {
  const inWish = siuIsWishlisted(p.id);
  const stars  = siuStars(p.stars || 4);
  const img    = p.imgs ? p.imgs[0] : p.img;
  const linkFn = opts.linkFn || (`location.href='product.html?id=${p.id}'`);

  return `
    <div class="product-card" data-id="${p.id}">
      <div class="product-img-wrap" onclick="${linkFn}">
        <img src="${img}" alt="${p.name}"
             onerror="this.onerror=null;this.src='https://picsum.photos/seed/siu${p.id}/500/650'"
             loading="lazy"/>
        ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ''}
        <button class="wish-btn ${inWish ? 'wishlisted' : ''}"
                id="wb-${p.id}"
                onclick="event.stopPropagation(); siuHandleWishBtn(${p.id})"
                title="Wishlist">
          ${inWish ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="product-info" onclick="${linkFn}">
        <div class="stars">${stars}</div>
        <div class="product-brand">${p.brand}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-footer">
          <div class="product-price">
            ${siuFmt(p.price)}
            ${p.old ? `<span class="old">${siuFmt(p.old)}</span>` : ''}
          </div>
          <button class="add-btn"
                  onclick="event.stopPropagation(); location.href='product.html?id=${p.id}'">
            + Add
          </button>
        </div>
      </div>
    </div>`;
}

/* Wishlist toggle called from card buttons */
function siuHandleWishBtn(id) {
  const prod = SIU_PRODUCTS.find(p => p.id === id);
  if (!prod) return;
  const nowWishlisted = siuToggleWish(prod);
  // Update all wish buttons for this product on the page
  document.querySelectorAll(`#wb-${id}`).forEach(btn => {
    btn.textContent = nowWishlisted ? '❤️' : '🤍';
    btn.classList.toggle('wishlisted', nowWishlisted);
  });
}

/* ── URL QUERY PARAM HELPER ── */
function siuGetParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

/* ── AUTO-INIT on DOMContentLoaded ── */
document.addEventListener('DOMContentLoaded', () => {
  siuUpdateNavCounts();
  siuInitBackTop();
});
