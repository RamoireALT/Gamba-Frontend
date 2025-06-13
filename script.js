const profileContainer = document.getElementById('profile-container');
const openBtn = document.getElementById('open-login');
const modal = document.getElementById('login-modal');
const closeBtn = document.getElementById('close-modal');
const discordBtn = document.getElementById('discord-login');

openBtn.onclick = () => modal.style.display = 'flex';
closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; }
discordBtn.onclick = () => window.location.reload() || window.location.href = 'https://gamba-backend.onrender.com/auth/discord';


function createLoginButton() {
  const btn = document.createElement('button');
  btn.id = 'login-btn';
  btn.innerHTML = `<img src="discord.png" alt="Discord logo" /> Login with Discord`;
  btn.onclick = () => {
    window.location.href = 'https://gamba-backend.onrender.com/auth/discord';
  };
  profileContainer.innerHTML = '';
  profileContainer.appendChild(btn);
}

function createProfileButton(user) {
  // user = { username, avatar, id }
  profileContainer.innerHTML = '';

  const btn = document.createElement('button');
  btn.id = 'profile-btn';
  const avatarUrl = user.avatar
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=64`
    : 'default-avatar.png'; // fallback avatar if needed

  btn.innerHTML = `<img src="${avatarUrl}" alt="Avatar" /> ${user.username}`;

  const dropdown = document.createElement('div');
  dropdown.id = 'profile-dropdown';

  const profileOption = document.createElement('button');
  profileOption.textContent = 'Profile';
  profileOption.onclick = () => {
    alert('Profile page not implemented yet!');
  };

  const logoutOption = document.createElement('button');
  logoutOption.textContent = 'Logout';
  logoutOption.onclick = async () => {
    await fetch('https://gamba-backend.onrender.com/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    window.location.reload();
  };

  dropdown.appendChild(profileOption);
  dropdown.appendChild(logoutOption);

  profileContainer.appendChild(btn);
  profileContainer.appendChild(dropdown);

  // Toggle dropdown
  btn.addEventListener('click', () => {
    dropdown.classList.toggle('show');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!profileContainer.contains(e.target)) {
      dropdown.classList.remove('show');
    }
  });
}

async function checkLogin() {
  try {
    const res = await fetch('https://gamba-backend.onrender.com/api/user', {
      credentials: 'include',
    });
    if (res.ok) {
      const user = await res.json();
      createProfileButton(user);
    } else {
      createLoginButton();
    }
  } catch (err) {
    console.error('Error checking login:', err);
    createLoginButton();
  }
}

window.onload = () => {
  checkLogin();
};

document.getElementById("open-login").addEventListener("click", () => {
  document.getElementById("login-modal").style.display = "block";
});

document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("login-modal").style.display = "none";
});

// Close modal on outside click
window.onclick = function (event) {
  const modal = document.getElementById("login-modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Discord login
document.getElementById("discord-login").addEventListener("click", () => {
  window.location.href = "https://gamba-backend.onrender.com/auth/discord";
});
