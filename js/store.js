// ============================================================
// SHARED HELPERS — cart, orders, WhatsApp & UPI links
// ============================================================

const Store = {
  // ---------- Cart (localStorage) ----------
  getCart() {
    try { return JSON.parse(localStorage.getItem('fb_cart')) || []; }
    catch { return []; }
  },
  setCart(cart) {
    localStorage.setItem('fb_cart', JSON.stringify(cart));
  },
  addToCart(product, qty = 1) {
    const cart = Store.getCart();
    const found = cart.find(i => i.id === product.id);
    if (found) found.qty += qty;
    else cart.push({ id: product.id, name: product.name, price: product.price, unit: product.unit, qty });
    Store.setCart(cart);
  },
  updateQty(id, qty) {
    let cart = Store.getCart();
    if (qty <= 0) cart = cart.filter(i => i.id !== id);
    else { const it = cart.find(i => i.id === id); if (it) it.qty = qty; }
    Store.setCart(cart);
    return cart;
  },
  clearCart() { Store.setCart([]); },
  cartCount() { return Store.getCart().reduce((s, i) => s + i.qty, 0); },
  cartTotal() { return Store.getCart().reduce((s, i) => s + i.qty * i.price, 0); },

  // ---------- Orders (localStorage) ----------
  getOrders() {
    try { return JSON.parse(localStorage.getItem('fb_orders')) || []; }
    catch { return []; }
  },
  setOrders(orders) { localStorage.setItem('fb_orders', JSON.stringify(orders)); },
  getOrder(id) { return Store.getOrders().find(o => o.id === id); },
  saveOrder(order) {
    const orders = Store.getOrders();
    const idx = orders.findIndex(o => o.id === order.id);
    if (idx >= 0) orders[idx] = order;
    else orders.unshift(order);
    Store.setOrders(orders);
  },
  nextOrderId() {
    const d = new Date();
    return 'FB' + d.getFullYear().toString().slice(2) +
      String(d.getMonth() + 1).padStart(2, '0') +
      String(d.getDate()).padStart(2, '0') +
      String(Math.floor(Math.random() * 9000) + 1000);
  },

  // ---------- Formatting ----------
  money(n) { return STORE.currency + Number(n).toLocaleString('en-IN'); },
  todayKey(d = new Date()) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  },
  isToday(dateStr) { return Store.todayKey(new Date(dateStr)) === Store.todayKey(); },
  fmtTime(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true });
  },
  fmtDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  },

  // ---------- WhatsApp ----------
  waLink(message) {
    return `https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent(message)}`;
  },
  waChatLink() { return `https://wa.me/${STORE.whatsappNumber}`; },

  // ---------- PhonePe / UPI ----------
  // Builds a UPI deep link that opens the installed UPI app (PhonePe, GPay, Paytm...)
  upiLink(amount, note) {
    const params = new URLSearchParams({
      pa: STORE.upiId,
      pn: STORE.upiName,
      am: String(amount),
      cu: 'INR',
      tn: note || 'Order at ' + STORE.name,
    });
    return 'upi://pay?' + params.toString();
  },
  phonepeLink(amount, note) {
    // PhonePe app deep link; falls back to UPI link if not installed.
    const fallback = Store.upiLink(amount, note);
    const params = new URLSearchParams({
      pa: STORE.upiId,
      pn: STORE.upiName,
      am: String(amount),
      cu: 'INR',
      tn: note || 'Order at ' + STORE.name,
    });
    return `https://www.phonepe.com/upi-pay?${params.toString()}`;
  },

  // ---------- Order status ----------
  STATUSES: ['Placed', 'Accepted', 'Preparing', 'Ready', 'Delivered'],
  statusIndex(s) { return Store.STATUSES.indexOf(s); },

  // ---------- New customers counter (unique phones today) ----------
  newCustomersToday() {
    const seen = new Set();
    Store.getOrders().forEach(o => {
      if (Store.isToday(o.createdAt) && o.phone) seen.add(String(o.phone).trim());
    });
    return seen.size;
  },

  // ---------- Generic toast ----------
  toast(msg, type = 'success') {
    let t = document.getElementById('toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'toast';
      document.body.appendChild(t);
    }
    t.className = 'toast ' + type;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._tm);
    t._tm = setTimeout(() => t.classList.remove('show'), 4000);
  },
};

// ---------- Nav / footer injection ----------
function renderShell() {
  const navLinks = [
    ['index.html', 'Home'],
    ['menu.html', 'Menu'],
    ['order.html', 'Order'],
    ['cakes.html', 'Custom Cakes'],
    ['offers.html', 'Offers'],
    ['track.html', 'Track Order'],
    ['contact.html', 'Contact'],
  ];
  const cartCount = Store.cartCount();
  const header = document.getElementById('site-header');
  if (header) {
    header.innerHTML = `
      <nav class="navbar container">
        <a href="index.html" class="brand">🍞 ${STORE.name}</a>
        <button class="nav-toggle" aria-label="Menu">☰</button>
        <ul class="nav-links">
          ${navLinks.map(([href, label]) =>
            `<li><a href="${href}" data-nav="${label}">${label}</a></li>`).join('')}
        </ul>
        <a class="cart-chip" href="order.html" aria-label="Cart">
          <span>🛒</span> <span class="cart-badge" id="cart-badge">${cartCount}</span>
        </a>
      </nav>`;

    const active = document.body.getAttribute('data-page');
    header.querySelectorAll('[data-nav]').forEach(a => {
      if (a.dataset.nav === active) a.classList.add('active');
    });
    const toggle = header.querySelector('.nav-toggle');
    const links = header.querySelector('.nav-links');
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }

  const footer = document.getElementById('site-footer');
  if (footer) {
    footer.innerHTML = `
      <div class="footer-grid container">
        <div>
          <h4>${STORE.name}</h4>
          <p>${STORE.tagline} — freshly baked every day.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="menu.html">Menu</a></li>
            <li><a href="cakes.html">Custom Cakes</a></li>
            <li><a href="track.html">Track Order</a></li>
            <li><a href="admin.html">Admin</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>📞 <a href="tel:+91${STORE.phone}">${STORE.phone}</a></li>
            <li>💬 <a href="${Store.waChatLink()}" target="_blank">WhatsApp ${STORE.whatsappDisplay}</a></li>
            <li>💳 PhonePe: ${STORE.phonepeDisplay}</li>
          </ul>
        </div>
      </div>
      <p class="copyright">© ${new Date().getFullYear()} ${STORE.name}. All rights reserved.</p>`;
  }
}
document.addEventListener('DOMContentLoaded', renderShell);
