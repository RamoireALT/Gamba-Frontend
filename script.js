// Get DOM elements
const loginBtn = document.getElementById("login-btn");
const popup = document.getElementById("popup");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const resetForm = document.getElementById("reset-form");

// Open popup when login button is clicked
loginBtn.addEventListener("click", () => {
  popup.classList.remove("hidden");
  showForm("login"); // Always show login by default
});

// Switch between login, register, and reset password forms
function showForm(type) {
  loginForm.classList.add("hidden");
  registerForm.classList.add("hidden");
  resetForm.classList.add("hidden");

  if (type === "login") {
    loginForm.classList.remove("hidden");
  } else if (type === "register") {
    registerForm.classList.remove("hidden");
  } else if (type === "reset") {
    resetForm.classList.remove("hidden");
  }
}

// Optional: Close popup if user clicks outside the content box
popup.addEventListener("click", (event) => {
  if (event.target === popup) {
    popup.classList.add("hidden");
  }
});
