const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

const themeButton = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const themeText = document.querySelector('.theme-text');
const savedTheme = localStorage.getItem('iammel-theme');
const preferredDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('iammel-theme', theme);

  if (!themeButton) return;

  const isDark = theme === 'dark';
  themeButton.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  themeButton.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  if (themeIcon) themeIcon.textContent = isDark ? '☀' : '☾';
  if (themeText) themeText.textContent = isDark ? 'Light' : 'Dark';
}

applyTheme(savedTheme || (preferredDark ? 'dark' : 'light'));

if (themeButton) {
  themeButton.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

const year = document.getElementById('year');
if (year) {
  year.textContent = new Date().getFullYear();
}

const cartButtons = document.querySelectorAll('.add-to-cart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
let basket = [];

function renderCart() {
  if (!cartItems || !cartTotal) return;

  if (basket.length === 0) {
    cartItems.textContent = 'Your basket is empty.';
    cartTotal.textContent = '0';
    return;
  }

  cartItems.innerHTML = basket.map(item => `
    <div class="cart-item">
      <span>${item.name}</span>
      <strong>£${item.price}</strong>
    </div>
  `).join('');

  const total = basket.reduce((sum, item) => sum + Number(item.price), 0);
  cartTotal.textContent = total.toFixed(2);
}

cartButtons.forEach(button => {
  button.addEventListener('click', () => {
    basket.push({
      name: button.dataset.name,
      price: button.dataset.price
    });
    renderCart();
  });
});
