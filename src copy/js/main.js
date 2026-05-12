const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
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
