let cart = [];
const cartItemsContainer = document.getElementById('cart-items');
const cartSubtotalElement = document.getElementById('cart-subtotal');
const cartSidebar = document.getElementById('cart-sidebar');
const overlay = document.getElementById('overlay');
const cartBtn = document.getElementById('cart-btn');

function addToCart(name, price, image) {
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name: name, price: price, image: image, quantity: 1 });
  }
  console.log('Carrito actualizado:', cart);
  renderCart();
  updateCartTotal();
}

function renderCart() {
  cartItemsContainer.innerHTML = '';
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Tu carrito está vacío</p>';
    document.querySelector('.cart-sidebar__empty').style.display = 'block';
    document.querySelector('.cart-sidebar__footer').style.display = 'none';
  } else {
    document.querySelector('.cart-sidebar__empty').style.display = 'none';
    document.querySelector('.cart-sidebar__footer').style.display = 'block';
    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="item-image">
        <div class="item-details">
          <span class="item-name">${item.name}</span>
          <span class="item-price">$${(item.price * item.quantity).toFixed(2)}</span>
          <div class="item-quantity">
            <button class="quantity-btn minus" data-name="${item.name}">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn plus" data-name="${item.name}">+</button>
          </div>
        </div>
      `;
      cartItemsContainer.appendChild(cartItem);
    });
    addQuantityButtonListeners();
  }
}

function updateCartTotal() {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartSubtotalElement.textContent = `$${total.toFixed(2)}`;
}

function handleQuantityChange(productName, change) {
  const item = cart.find(item => item.name === productName);
  if (item) {
    item.quantity += change;
    if (item.quantity < 1) {
      cart = cart.filter(i => i.name !== productName);
    }
    renderCart();
    updateCartTotal();
  }
}

function addQuantityButtonListeners() {
  const quantityButtons = document.querySelectorAll('.quantity-btn');
  quantityButtons.forEach(button => {
    button.addEventListener('click', function () {
      const name = this.dataset.name;
      const change = this.classList.contains('plus') ? 1 : -1;
      handleQuantityChange(name, change);
    });
  });
}