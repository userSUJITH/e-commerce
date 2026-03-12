document.addEventListener("DOMContentLoaded", () => {

  protectPage();
  loadOrderSummary();

  const form = document.getElementById("payment-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const cardName = document.getElementById("card-name").value.trim();
    const cardNumber = document.getElementById("card-number").value.trim();
    const expiry = document.getElementById("expiry").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

    if (!cardName || !cardNumber || !expiry || !cvv) {
      alert("Please fill all payment details");
      return;
    }

    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
      alert("Invalid card number");
      return;
    }

    if (cvv.length !== 3 || isNaN(cvv)) {
      alert("Invalid CVV");
      return;
    }

    processPayment();
  });

});

/* ================= PROTECT PAGE ================= */

function protectPage() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    window.location.href = "login.html";
  }
}

/* ================= GET USER CART ================= */

function getCartKey() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  return "cart_" + user.mail;
}

/* ================= LOAD SUMMARY ================= */

function loadOrderSummary() {

  const summary = document.getElementById("order-summary");
  const cartKey = getCartKey();
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  if (cart.length === 0) {
    summary.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let total = 0;

  summary.innerHTML = cart.map(item => {
    total += item.price * item.quantity;
    return `
      <p>${item.title.substring(0,30)} x ${item.quantity} - ₹ ${item.price * item.quantity}</p>
    `;
  }).join("");

  summary.innerHTML += `<h3>Total: ₹ ${total.toFixed(2)}</h3>`;
}

/* ================= PROCESS PAYMENT ================= */

function processPayment() {

  const cartKey = getCartKey();

  alert("Payment Successful 🎉 Order Placed!");

  localStorage.removeItem(cartKey);

  window.location.href = "index.html";
}