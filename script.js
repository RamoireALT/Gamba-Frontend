document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('auth-popup');
  const closeBtn = document.getElementById('close-popup');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  const tabLabel = document.getElementById('tab-label');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const resetForm = document.getElementById('reset-form');
  const discordLoginBtn = document.getElementById('discord-login-btn');
  const openAuthPopup = document.getElementById('open-auth-popup');

  const API_BASE = 'https://gamba-backend.onrender.com/api';

  function setActiveTab(tabName) {
    tabButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    tabContents.forEach(content => {
      content.classList.toggle('active', content.id === tabName);
    });
    tabLabel.textContent = tabName.charAt(0).toUpperCase() + tabName.slice(1);
  }

  openAuthPopup.addEventListener('click', () => {
    popup.classList.remove('hidden');
    setActiveTab('login');
  });

  closeBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
  });

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      setActiveTab(button.dataset.tab);
    });
  });

  // Login
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      usernameOrEmail: loginForm.elements[0].value,
      password: loginForm.elements[1].value
    };

    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    if (res.ok) {
      popup.classList.add('hidden');
      updateUI(result.user);
    } else {
      alert(result.message || 'Login failed');
    }
  });

  // Register
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      username: registerForm.elements[0].value,
      email: registerForm.elements[1].value,
      password: registerForm.elements[2].value,
      confirmPassword: registerForm.elements[3].value
    };

    if (data.password !== data.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    if (res.ok) {
      popup.classList.add('hidden');
      updateUI(result.user);
    } else {
      alert(result.message || 'Registration failed');
    }
  });

  // Reset Password
  resetForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      currentPassword: resetForm.elements[0].value,
      newPassword: resetForm.elements[1].value,
      confirmPassword: resetForm.elements[2].value
    };

    if (data.newPassword !== data.confirmPassword) {
      alert("New passwords don't match");
      return;
    }

    const res = await fetch(`${API_BASE}/reset-password`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    if (res.ok) {
      alert("Password reset successfully");
      popup.classList.add('hidden');
    } else {
      alert(result.message || 'Reset failed');
    }
  });

  // Discord Login
  discordLoginBtn.addEventListener('click', () => {
    window.location.href = `${API_BASE}/auth/discord`;
  });

  // Logout
  document.body.addEventListener('click', async (e) => {
    if (e.target.id === 'logout-btn') {
      await fetch(`${API_BASE}/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      updateUI(null);
    }
  });

  // Session check
  async function checkSession() {
    const res = await fetch(`${API_BASE}/session`, {
      credentials: 'include'
    });
    if (res.ok) {
      const result = await res.json();
      updateUI(result.user);
    }
  }

  function updateUI(user) {
    const loginBtn = document.getElementById('open-auth-popup');
    const header = document.querySelector('.header');

    if (user) {
      loginBtn.remove();
      const profile = document.createElement('div');
      profile.className = 'profile';
      profile.innerHTML = `
        <span>Logged in as <strong>${user.username}</strong></span>
        <button id="logout-btn" class="login-btn">Logout</button>
      `;
      header.appendChild(profile);
    } else {
      // fallback if needed
    }
  }

  const homeSection = document.getElementById('home-section');
  const storeSection = document.getElementById('store-section');
  const gamblingSection = document.getElementById('gambling-section');

  document.getElementById('store-link').addEventListener('click', (e) => {
    e.preventDefault();
    homeSection.classList.add('hidden');
    gamblingSection.classList.add('hidden');
    storeSection.classList.remove('hidden');
  });

  document.getElementById('gambling-link').addEventListener('click', (e) => {
    e.preventDefault();
    homeSection.classList.add('hidden');
    storeSection.classList.add('hidden');
    gamblingSection.classList.remove('hidden');
  });

  checkSession();
});