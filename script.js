const loginBtn = document.getElementById("loginBtn");

// Try to fetch user info
async function getUser() {
  try {
    const res = await fetch('https://gamba-backend.onrender.com/me', {
      credentials: 'include'
    });
    if (res.ok) {
      const user = await res.json();
      updateProfile(user);
    } else {
      console.log("Not logged in.");
    }
  } catch (err) {
    console.error("Login fetch error:", err);
  }
}

// Show user info in button
function updateProfile(user) {
  loginBtn.innerHTML = `
    <img src="${user.avatar}" class="discord-icon" />
    <span>${user.username}</span>
  `;
}

// Go to backend login
loginBtn.addEventListener("click", () => {
  window.location.href = "https://gamba-backend.onrender.com/auth/discord";
});

getUser();
