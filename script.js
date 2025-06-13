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
    console.error("Not logged in.");
  }
});

async function getCurrentUser() {
  try {
    const res = await fetch('https://gamba-backend.onrender.com/api/me', {
      credentials: 'include' // Important to send session cookie!
    });
    if (res.ok) {
      const user = await res.json();
      // Update UI with user info
      console.log('Logged in user:', user);
      // Show profile pic, name, etc.
    } else {
      // Not logged in
      console.log('User not logged in');
    }
  } catch (error) {
    console.error('Error fetching user:', error);
  }
}

window.onload = () => {
  getCurrentUser();
};

fetch('https://gamba-backend.onrender.com/api/user', {
  credentials: 'include' // send session cookies
})
.then(res => res.json())
.then(user => {
  if (user && user.username) {
    const profileBtn = document.getElementById('login-btn');
    profileBtn.innerHTML = `
      <img src="https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png" alt="Avatar" style="width:24px; height:24px; border-radius:50%; vertical-align:middle; margin-right:5px;">
      ${user.username}
    `;
  }
})
.catch(err => {
  console.log('Not logged in yet.');
});
