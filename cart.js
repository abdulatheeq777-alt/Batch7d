/* ============================================================
   STYLE IT UP — cart.js  (Cart page)
   Requires: shared.js
   ============================================================ */

let cartDiscount = 0;

const COUPON_CODES = { STYLE10: 10, SALE20: 20, FIRST15: 15 };

/* ── TOTALS ── */
function calcTotals() {
  const cart = siuGetCart();
  const sub  = cart.reduce((a, i) => a + (i.price * i.qty), 0);
  const ship = sub >= 999 ? 0 : 99;
  const disc = Math.round(sub * cartDiscount / 100);
  return { sub, ship, disc, total: sub + ship - disc };
}

/* ── COUPON ── */
function applyCoupon() {
  const input = document.getElementById('coupon-code');
  if (!input) return;
  const code = input.value.trim().toUpperCase();
  if (COUPON_CODES[code]) {
    cartDiscount = COUPON_CODES[code];
    siuToast('Coupon applied! ' + cartDiscount + '% off 🎉');
    renderCart();
  } else {
    siuToast('Invalid coupon code', 'err');
  }
}

/* ── MOVE TO WISHLIST ── */
function moveToWish(id, size) {
  const item = siuGetCart().find(i => i.id === id);
  if (item) {
    const wish = siuGetWish();
    if (!wish.some(w => w.id === id)) {
      wish.push(item);
      siuSaveWish(wish);
    }
  }
  siuRemoveFromCart(id, size);
  siuToast('Moved to wishlist 🤍');
  renderCart();
}

/* ── RENDER CART ── */
function renderCart() {
  siuUpdateNavCounts();
  const cart  = siuGetCart();
  const cs    = document.getElementById('cart-section');
  const os    = document.getElementById('order-summary');
  const { sub, ship, disc, total } = calcTotals();

  if (!cart.length) {
    cs.innerHTML = `
      <div class="empty-cart">
        <span class="icon">🛒</span>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <a href="shop.html" class="btn-primary">Start Shopping →</a>
      </div>`;
    if (os) os.innerHTML = '';
    return;
  }

  cs.innerHTML = `
    <div class="cart-header-row">
      <div class="col-product">Product</div>
      <div class="col-price">Price</div>
      <div class="col-qty">Quantity</div>
      <div class="col-total">Total</div>
    </div>
    ${cart.map(i => `
      <div class="cart-item">
        <div class="ci-img">
          <img src="${i.img}" alt="${i.name}"
               onerror="this.onerror=null;this.src='https://picsum.photos/seed/ci${i.id}/200/250'"/>
        </div>
        <div class="ci-details">
          <div class="ci-brand">Style It Up</div>
          <a class="ci-name" href="product.html?id=${i.id}">${i.name}</a>
          <div class="ci-meta">Size: ${i.size}</div>
          <div class="ci-actions">
            <button class="ci-action-btn" onclick="cartRemove(${i.id},'${i.size}')">🗑 Remove</button>
            <span style="color:rgba(0,0,0,.15)">|</span>
            <button class="ci-action-btn" onclick="moveToWish(${i.id},'${i.size}')">🤍 Save for later</button>
          </div>
        </div>
        <div class="ci-price-col">
          ${siuFmt(i.price)}
          ${i.old ? `<span class="old">${siuFmt(i.old)}</span>` : ''}
        </div>
        <div class="ci-qty-col">
          <div class="qty-ctrl">
            <button onclick="cartChangeQty(${i.id},'${i.size}',-1)">−</button>
            <span>${i.qty}</span>
            <button onclick="cartChangeQty(${i.id},'${i.size}',1)">+</button>
          </div>
        </div>
        <div class="ci-total-col">${siuFmt(i.price * i.qty)}</div>
      </div>`).join('')}
    <div class="coupon-row">
      <input class="coupon-input" id="coupon-code" placeholder="Coupon code (try STYLE10, SALE20, FIRST15)"/>
      <button class="coupon-btn" onclick="applyCoupon()">Apply</button>
    </div>
    ${cartDiscount ? `<div class="coupon-success">✓ ${cartDiscount}% discount applied</div>` : ''}`;

  if (os) {
    os.innerHTML = `
      <div class="os-title">Order Summary</div>
      <div class="os-row"><span>Subtotal (${cart.reduce((a,i)=>a+i.qty,0)} items)</span><strong>${siuFmt(sub)}</strong></div>
      <div class="os-row"><span>Shipping</span><strong style="color:${ship===0?'#4caf50':'inherit'}">${ship===0 ? 'FREE' : siuFmt(ship)}</strong></div>
      ${disc ? `<div class="os-row"><span>Discount (${cartDiscount}%)</span><strong style="color:#4caf50">-${siuFmt(disc)}</strong></div>` : ''}
      <div class="os-divider"></div>
      <div class="os-total">
        <span class="os-total-lbl">Total</span>
        <span class="os-total-val">${siuFmt(total)}</span>
      </div>
      <button class="checkout-btn" onclick="showCheckout()">Proceed to Checkout →</button>
      <a href="shop.html" class="continue-shopping">← Continue Shopping</a>
      <div class="os-badges">
        <span class="os-badge">🔒 Secure checkout</span>
        <span class="os-badge">↩️ Easy returns</span>
        <span class="os-badge">🚚 Fast delivery</span>
      </div>
      <div class="payment-icons">
        <span class="payment-icon">UPI</span>
        <span class="payment-icon">VISA</span>
        <span class="payment-icon">MC</span>
        <span class="payment-icon">COD</span>
      </div>`;
  }
}

function cartRemove(id, size) {
  siuRemoveFromCart(id, size);
  siuToast('Item removed');
  renderCart();
}

function cartChangeQty(id, size, delta) {
  siuChangeCartQty(id, size, delta);
  renderCart();
}

/* ── SHOW CHECKOUT ── */
function showCheckout() {
  const user = siuGetUser();
  const { total } = calcTotals();
  const cs = document.getElementById('cart-section');

  cs.innerHTML = `
    <div class="checkout-wrap">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:28px">
        <button class="co-back-btn" onclick="renderCart()">← Back to Cart</button>
        <span class="co-title">Checkout</span>
      </div>
      <h3 style="font-family:'Playfair Display',serif;font-size:1.1rem;margin-bottom:16px;color:var(--black)">Delivery Information</h3>
      <div class="form-row">
        <div class="form-group"><label>First Name</label><input id="co-fn" placeholder="Rahul" value="${user?.firstName||''}"/></div>
        <div class="form-group"><label>Last Name</label><input id="co-ln" placeholder="Sharma" value="${user?.lastName||''}"/></div>
      </div>
      <div class="form-group"><label>Email</label><input type="email" id="co-em" placeholder="rahul@email.com" value="${user?.email||''}"/></div>
      <div class="form-group"><label>Phone</label><input type="tel" id="co-ph" placeholder="+91 98765 43210"/></div>
      <div class="form-group"><label>Full Address</label><input id="co-ad" placeholder="Flat 12B, Raj Residency, MG Road"/></div>
      <div class="form-row">
        <div class="form-group"><label>City</label><input id="co-ci" placeholder="Hyderabad"/></div>
        <div class="form-group"><label>Pincode</label><input id="co-pi" placeholder="500034"/></div>
      </div>
      <div class="form-group"><label>State</label>
        <select id="co-st">
          <option>Telangana</option><option>Andhra Pradesh</option>
          <option>Maharashtra</option><option>Karnataka</option>
          <option>Tamil Nadu</option><option>Delhi</option><option>Other</option>
        </select>
      </div>
      <h3 style="font-family:'Playfair Display',serif;font-size:1.1rem;margin:24px 0 16px;color:var(--black)">Payment Method</h3>
      <div class="payment-option selected" onclick="selectPayment(this)">
        <input type="radio" name="pay" checked/>
        <div><div class="payment-label">📱 UPI (GPay / PhonePe)</div><div class="payment-sub">Instant, no extra charges</div></div>
      </div>
      <div class="payment-option" onclick="selectPayment(this)">
        <input type="radio" name="pay"/>
        <div><div class="payment-label">💳 Credit / Debit Card</div><div class="payment-sub">Visa, Mastercard, RuPay</div></div>
      </div>
      <div class="payment-option" onclick="selectPayment(this)">
        <input type="radio" name="pay"/>
        <div><div class="payment-label">🏦 Net Banking</div><div class="payment-sub">All major banks</div></div>
      </div>
      <div class="payment-option" onclick="selectPayment(this)">
        <input type="radio" name="pay"/>
        <div><div class="payment-label">📦 Cash on Delivery</div><div class="payment-sub">+₹40 COD fee</div></div>
      </div>
      <button class="place-order-btn" onclick="placeOrder()">
        Place Order — ${siuFmt(total)} →
      </button>
    </div>`;
}

function selectPayment(el) {
  document.querySelectorAll('.payment-option').forEach(o => {
    o.classList.remove('selected');
    o.querySelector('input').checked = false;
  });
  el.classList.add('selected');
  el.querySelector('input').checked = true;
}

/* ── PLACE ORDER ── */
function placeOrder() {
  const required = [
    ['co-fn', 'first name'], ['co-ln', 'last name'],
    ['co-em', 'email'],      ['co-ph', 'phone'],
    ['co-ad', 'address'],    ['co-ci', 'city'],   ['co-pi', 'pincode']
  ];
  for (const [id, label] of required) {
    if (!document.getElementById(id)?.value.trim()) {
      siuToast('Please enter your ' + label, 'err');
      return;
    }
  }
  const orderId = 'SIU' + Date.now().toString().slice(-8);
  document.getElementById('cart-section').innerHTML = `
    <div class="order-success">
      <div class="tick">🎉</div>
      <h2>Order Placed!</h2>
      <div class="order-id">Order #${orderId}</div>
      <p>Thank you for shopping with Style It Up!<br/>
         Your order will arrive in <strong>3–5 business days</strong>.<br/>
         A confirmation has been sent to your email.</p>
      <a href="shop.html" class="btn-primary" style="margin-right:12px">Continue Shopping</a>
      <a href="account.html" class="btn-ghost" style="color:var(--black);border-color:rgba(0,0,0,.2)">My Account</a>
    </div>`;
  document.getElementById('order-summary').innerHTML = '';
  siuClearCart();
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', renderCart);
