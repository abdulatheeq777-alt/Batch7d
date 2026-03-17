/* ============================================================
   STYLE IT UP — wishlist.js
   Requires: shared.js
   ============================================================ */

function renderWishlist() {
  siuUpdateNavCounts();
  const wish = siuGetWish();
  const grid = document.getElementById('wish-grid');
  if (!grid) return;

  if (!wish.length) {
    grid.innerHTML = `
      <div class="empty-wish">
        <span class="icon">🤍</span>
        <h2>Your wishlist is empty</h2>
        <p>Save items you love and come back to them later.</p>
        <a href="shop.html" class="btn-primary">Browse Products →</a>
      </div>`;
    return;
  }

  grid.innerHTML = wish.map(p => `
    <div class="product-card" style="position:relative">
      <div class="product-img-wrap" onclick="location.href='product.html?id=${p.id}'">
        <img src="${p.img || (p.imgs && p.imgs[0])}" alt="${p.name}"
             onerror="this.onerror=null;this.src='https://picsum.photos/seed/wi${p.id}/500/650'"
             loading="lazy"/>
        ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ''}
        <button class="remove-wish" onclick="event.stopPropagation();removeFromWishlist(${p.id})" title="Remove">✕</button>
      </div>
      <div class="product-info" onclick="location.href='product.html?id=${p.id}'">
        <div class="stars">${siuStars(p.stars || 4)}</div>
        <div class="product-brand">${p.brand || 'Style It Up'}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-footer">
          <div class="product-price">
            ${siuFmt(p.price)}
            ${p.old ? `<span class="old">${siuFmt(p.old)}</span>` : ''}
          </div>
          <button class="add-btn"
                  onclick="event.stopPropagation();location.href='product.html?id=${p.id}'">
            View →
          </button>
        </div>
      </div>
    </div>`).join('');
}

function removeFromWishlist(id) {
  const wish = siuGetWish().filter(w => w.id !== id);
  siuSaveWish(wish);
  siuToast('Removed from wishlist');
  renderWishlist();
}

document.addEventListener('DOMContentLoaded', renderWishlist);
