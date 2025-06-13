window.addEventListener("DOMContentLoaded", () => {
  const userSection = document.getElementById("userSection");

  const user = JSON.parse(localStorage.getItem("user")); // simulate login

  if (user && user.username && user.avatar) {
    const avatarURL = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
    userSection.innerHTML = `
      <div class="profile">
        <img src="${avatarURL}" alt="Profile">
        <span>${user.username}</span>
      </div>
    `;
  } else {
    userSection.innerHTML = `
      <button class="login-button" onclick="window.location.href='https://gamba-backend.onrender.com/auth/discord'">
        <img src="discord.svg" alt="Discord Logo" />
        Login with Discord
      </button>
    `;
  }
});
