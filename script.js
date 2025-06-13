const userSection = document.getElementById("user-section");

function createProfileElement(user) {
  userSection.innerHTML = `
    <div id="profile">
      <img src="https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png" alt="Avatar" />
      <span>${user.username}#${user.discriminator}</span>
      <button id="logout-btn">Logout</button>
    </div>
  `;

  document.getElementById("logout-btn").onclick = () => {
    fetch("https://gamba-backend.onrender.com/auth/logout", {
      credentials: "include"
    }).then(() => window.location.reload());
  };
}

document.getElementById("login-btn")?.addEventListener("click", () => {
  window.location.href = "https://gamba-backend.onrender.com/auth/discord";
});

fetch("https://gamba-backend.onrender.com/api/user", {
  credentials: "include"
})
  .then(res => res.json())
  .then(user => {
    if (user && user.username) {
      createProfileElement(user);
    }
  })
  .catch(console.error);
