const loginBtn = document.getElementById("login-btn");
const userSection = document.getElementById("user-section");

// Redirect to backend for login
loginBtn.onclick = () => {
  window.location.href = "https://gamba-backend.onrender.com/auth/discord";
};

// Try to fetch user info
fetch("https://gamba-backend.onrender.com/api/user", {
  credentials: "include"
})
.then(res => res.json())
.then(user => {
  if (user && user.username) {
    userSection.innerHTML = `
      <div id="profile">
        <img src="https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png" alt="Avatar" />
        <p>${user.username}#${user.discriminator}</p>
        <button id="logout-btn">Logout</button>
      </div>
    `;

    document.getElementById("logout-btn").onclick = () => {
      fetch("https://gamba-backend.onrender.com/auth/logout", {
        credentials: "include"
      }).then(() => window.location.reload());
    };
  }
});
