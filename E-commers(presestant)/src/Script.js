document.addEventListener("DOMContentLoaded", function () {

  /* ================= REGISTER ================= */

  const regForm = document.getElementById("reg-form");

  if (regForm) {
    regForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const mail = document.getElementById("r-mail").value.trim();
      const pswd = document.getElementById("r-pswd").value;
      const mobile = document.getElementById("r-mobile").value;
      const name = document.getElementById("r-name").value.trim();

      if (!mail || !pswd || !mobile || !name) {
        alert("Please fill all fields");
        return;
      }

      let users = JSON.parse(localStorage.getItem("users")) || [];

      const existingUser = users.find(user => user.mail === mail);

      if (existingUser) {
        alert("User already exists. Please login.");
        return;
      }

      const newUser = { mail, pswd, mobile, name };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      alert("Registration successful 🎉");
      regForm.reset();
      window.location.href = "login.html";
    });
  }

  /* ================= LOGIN ================= */

  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const mail = document.getElementById("l-mail").value.trim();
      const pswd = document.getElementById("l-pswd").value.trim();

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const validUser = users.find(user =>
        user.mail === mail && user.pswd === pswd
      );

      if (validUser) {
        localStorage.setItem("loggedInUser", JSON.stringify(validUser));
        alert("Welcome " + validUser.name);
        window.location.href = "index.html";
      } else {
        alert("Wrong credentials ❌");
      }
    });
  }

});