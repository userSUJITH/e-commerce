/* ================= API ================= */

const API = "https://dummyjson.com/products?limit=100";
const API_SINGLE = "https://dummyjson.com/products/";
let allProducts = [];

/* ================= DOM LOADED ================= */

document.addEventListener("DOMContentLoaded", () => {

  protectPage();
  showNavbarUser();
  fetchProducts();
  updateCartCount();
  renderCart();

  const search = document.getElementById("search");
  if (search) {
    search.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();
      const filtered = allProducts.filter(p =>
        p.title.toLowerCase().includes(value)
      );
      displayProducts(filtered);
    });
  }

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      alert("Logged out successfully");
      window.location.href = "login.html";
    });
  }

});

/* ================= PAGE PROTECTION ================= */

function protectPage() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    window.location.href = "login.html";
  }
}

/* ================= NAVBAR USER ================= */

function showNavbarUser() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const userDisplay = document.getElementById("navbar-user");

  if (user && userDisplay) {
    userDisplay.innerText = "Hi, " + user.name;
  }
}

/* ================= FETCH PRODUCTS ================= */

function fetchProducts() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      allProducts = data.products;
      displayProducts(allProducts);
    });
}

/* ================= DISPLAY PRODUCTS ================= */

function displayProducts(products) {

  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = products.map(product => `
    <div class="card" onclick="goToDetails(${product.id})">
      <img src="${product.thumbnail}">
      <h4>${product.title.substring(0, 40)}...</h4>
      <p>₹ ${product.price}</p>
      <p>⭐ ${product.rating}</p>
      <button onclick="event.stopPropagation(); addToCart(${product.id})">
        Add to Cart
      </button>
    </div>
  `).join("");
}

/* ================= GO TO DETAILS ================= */

function goToDetails(id) {
  window.location.href = `product-details.html?id=${id}`;
}

/* ================= USER CART ================= */

function getCartKey() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  return "cart_" + user.mail;
}

function addToCart(id) {

  const cartKey = getCartKey();
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    const product = allProducts.find(p => p.id === id);
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));
  updateCartCount();
  alert("Added to cart 🛒");
}

/* ================= UPDATE CART COUNT ================= */

function updateCartCount() {

  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) return;

  const cartKey = getCartKey();
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const count = document.getElementById("cart-count");
  if (count) count.innerText = cart.length;
}

/* ================= RENDER CART ================= */

function renderCart() {

  const container = document.getElementById("cart-container");
  const totalElement = document.getElementById("grand-total");

  if (!container || !totalElement) return;

  const cartKey = getCartKey();
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  if (cart.length === 0) {
    container.innerHTML = "<h2>Your cart is empty 😢</h2>";
    totalElement.innerText = "0";
    return;
  }

  let total = 0;

  container.innerHTML = cart.map(item => {

    total += item.price * item.quantity;

    return `
      <div class="cart-item">
        <img src="${item.thumbnail}">
        <h4>${item.title}</h4>
        <p>₹ ${item.price}</p>

        <div>
          <button onclick="changeQuantity(${item.id}, -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="changeQuantity(${item.id}, 1)">+</button>
        </div>

        <button onclick="removeItem(${item.id})">Remove</button>
      </div>
    `;
  }).join("");

  totalElement.innerText = total.toFixed(2);
}

/* ================= CHANGE QUANTITY ================= */

function changeQuantity(id, change) {

  const cartKey = getCartKey();
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const item = cart.find(p => p.id === id);

  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter(p => p.id !== id);
    }
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

/* ================= REMOVE ITEM ================= */

function removeItem(id) {

  const cartKey = getCartKey();
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  cart = cart.filter(item => item.id !== id);

  localStorage.setItem(cartKey, JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

/* ================= CHECKOUT ================= */

function checkout() {
  window.location.href = "/pages/payment.html";
}

/* ================= FAKE PAYMENT SUCCESS ================= */

function placeOrder() {
  const cartKey = getCartKey();
  localStorage.removeItem(cartKey);
  alert("Order placed successfully 🎉");
  window.location.href = "index.html";
}

function displayProducts(products) {

  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = products.map(product => `
    <div class="card" onclick="goToDetails(${product.id})">
      <img src="${product.thumbnail}">
      <h4>${product.title.substring(0, 40)}...</h4>
      <p>₹ ${product.price}</p>
      <p>⭐ ${product.rating}</p>
      <button onclick="event.stopPropagation(); addToCart(${product.id})">
        Add to Cart
      </button>
    </div>
  `).join("");
}
function displayProducts(products) {

  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = products.map(product => `
    <div class="card" onclick="goToDetails(${product.id})">
      <img src="${product.thumbnail}">
      <h4>${product.title.substring(0, 40)}...</h4>
      <p>₹ ${product.price}</p>
      <p>⭐ ${product.rating}</p>
      <button onclick="event.stopPropagation(); addToCart(${product.id})">
        Add to Cart
      </button>
    </div>
  `).join("");
}