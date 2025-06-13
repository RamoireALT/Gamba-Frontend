const loginBtn = document.getElementById('loginBtn');
const profileDiv = document.getElementById('profile');

loginBtn.addEventListener('click', () => {
  window.location.href = 'https://gamba-backend.onrender.com/auth/discord';
});

async function fetchUser() {
  try {
    const res = await fetch('https://gamba-backend.onrender.com/me', {
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Not logged in');
    const user = await res.json();

    profileDiv.innerHTML = `
      <img src="https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png" alt="Profile" style="height: 32px; border-radius: 50%; vertical-align: middle;">
      <span style="margin-left: 0.5rem;">${user.username}</span>
    `;
  } catch (err) {
    console.log("User not logged in");
  }
}

fetchUser();
