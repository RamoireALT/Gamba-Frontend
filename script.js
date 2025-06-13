const loginBtn = document.getElementById("login-btn");
const popup = document.getElementById("popup");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const resetForm = document.getElementById("reset-form");

loginBtn.addEventListener("click", () => {
  popup.classList.remove("hidden");
  showForm("login");
});

function showForm(type) {
  loginForm.classList.add("hidden");
  registerForm.classList.add("hidden");
  resetForm.classList.add("hidden");

  if (type === "login") loginForm.classList.remove("hidden");
  if (type === "register") registerForm.classList.remove("hidden");
  if (type === "reset") resetForm.classList.remove("hidden");
}

popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.classList.add("hidden");
  }
});
