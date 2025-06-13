window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("https://gamba-backend.onrender.com/me", {
      credentials: "include"
    });
    if (res.ok) {
      const user = await res.json();
      document.getElementById("user-area").innerHTML = `
        <div class="user-info">
          <img src="https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png" class="discord-icon" />
          <span>${user.username}</span>
        </div>
      `;
    }
  } catch (err) {
    console.error("User not logged in");
  }
});
