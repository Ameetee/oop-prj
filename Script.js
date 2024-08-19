// scripts.js

class Product {
    constructor(id, name, price) {
      this.id = id;
      this.name = name;
      this.price = price;
    }
  }
  
  class ShoppingCartItem {
    constructor(product, quantity) {
      this.product = product;
      this.quantity = quantity;
    }
  
    getTotalPrice() {
      return this.product.price * this.quantity;
    }
  }
  
  class ShoppingCart {
    constructor() {
      this.items = [];
    }
  
    addItem(product, quantity) {
      const existingItem = this.items.find(item => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push(new ShoppingCartItem(product, quantity));
      }
      this.updateCart();
    }
  
    removeItem(productId) {
      this.items = this.items.filter(item => item.product.id !== productId);
      this.updateCart();
    }
  
    getTotal() {
      return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }
  
    displayCart() {
      const cartItemsContainer = document.querySelector('.cart-items');
      cartItemsContainer.innerHTML = '';
  
      this.items.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
          <span>${item.product.name}</span>
          <span>Quantity: ${item.quantity}</span>
          <span>$${item.getTotalPrice().toFixed(2)}</span>
          <button class="remove-item" data-id="${item.product.id}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
      });
  
      document.getElementById('cart-total').textContent = this.getTotal().toFixed(2);
    }
  
    updateCart() {
      this.displayCart();
    }
  }
  
  const products = [
    new Product(1, 'Laptop', 999.99),
    new Product(2, 'Mouse', 25.50),
    new Product(3, 'Keyboard', 75.00)
  ];
  
  const cart = new ShoppingCart();
  
  const productListContainer = document.querySelector('.product-list');
  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.className = 'product';
    productElement.innerHTML = `
      <span>${product.name} - $${product.price.toFixed(2)}</span>
      <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
    `;
    productListContainer.appendChild(productElement);
  });
  
  productListContainer.addEventListener('click', event => {
    if (event.target.classList.contains('add-to-cart')) {
      const productId = parseInt(event.target.getAttribute('data-id'));
      const product = products.find(p => p.id === productId);
      cart.addItem(product, 1);
    }
  });
  
  document.querySelector('.cart-items').addEventListener('click', event => {
    if (event.target.classList.contains('remove-item')) {
      const productId = parseInt(event.target.getAttribute('data-id'));
      cart.removeItem(productId);
    }
  });
  
  document.getElementById('clear-cart').addEventListener('click', () => {
    cart.items = [];
    cart.updateCart();
  });
  