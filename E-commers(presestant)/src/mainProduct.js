document.addEventListener("DOMContentLoaded", () => {

  protectPage();
  showNavbarUser();
  loadProduct();

});

/* ================= LOAD PRODUCT ================= */

function loadProduct() {

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  fetch("https://dummyjson.com/products/" + id)
    .then(res => res.json())
    .then(product => {

      const container = document.getElementById("product-details");

      container.innerHTML = `
        <div class="details-card">
          <img src="${product.thumbnail}">
          <div class="details-info">
            <h2>${product.title}</h2>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Brand:</strong> ${product.brand}</p>
            <p>${product.description}</p>
            <h3>₹ ${product.price}</h3>
            <p>⭐ ${product.rating}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
          </div>
        </div>
      `;
    });
}

/* ================= CART ================= */

function getCartKey() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  return "cart_" + user.mail;
}

function addToCart(id) {

  fetch("https://dummyjson.com/products/" + id)
    .then(res => res.json())
    .then(product => {

      const cartKey = getCartKey();
      let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

      const existing = cart.find(item => item.id === id);

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem(cartKey, JSON.stringify(cart));
      alert("Added to cart 🛒");
    });
}

/* ================= PROTECT PAGE ================= */

function protectPage() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    window.location.href = "login.html";
  }
}

/* ================= NAVBAR USER ================= */

function showNavbarUser() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const display = document.getElementById("navbar-user");
  if (user && display) {
    display.innerText = "Hi, " + user.name;
  }
}