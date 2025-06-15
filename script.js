const API_URL = 'https://Gamba-Backend.onrender.com/api';

// Elements
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const registerBtn = document.getElementById('registerBtn');
const profileSection = document.getElementById('profileSection');
const profileNameEl = document.getElementById('profileName');
const profileBalanceEl = document.getElementById('profileBalance');
const profileLevelEl = document.getElementById('profileLevel');
const profileXpEl = document.getElementById('profileXP');
const profileCashbackEl = document.getElementById('profileCashback');
const redeemCashbackBtn = document.getElementById('redeemCashbackBtn');

let currentUser = null;

// Helpers
function formatEuros(value) {
  return value.toFixed(2) + ' €';
}

async function checkSession() {
  const res = await fetch(`${API_URL}/session`, { credentials: 'include' });
  const data = await res.json();
  if (data.loggedIn) {
    currentUser = data.user;
    showProfile();
    loadProfile();
    setInterval(loadProfile, 5000);
  } else {
    currentUser = null;
    showLogin();
  }
}

function showLogin() {
  profileSection.style.display = 'none';
  loginBtn.style.display = 'inline-block';
  registerBtn.style.display = 'inline-block';
  logoutBtn.style.display = 'none';
}

function showProfile() {
  profileSection.style.display = 'block';
  loginBtn.style.display = 'none';
  registerBtn.style.display = 'none';
  logoutBtn.style.display = 'inline-block';
}

async function loadProfile() {
  if (!currentUser) return;
  const res = await fetch(`${API_URL}/profile`, { credentials: 'include' });
  if (!res.ok) {
    console.error('Failed to load profile');
    return;
  }
  const user = await res.json();

  profileNameEl.textContent = user.username;
  profileBalanceEl.textContent = formatEuros(user.balance);
  profileLevelEl.textContent = user.level;
  profileXpEl.textContent = user.xp;
  profileCashbackEl.textContent = formatEuros(user.cashbackAmount);

  // Show redeem button if cashback >= 5€
  if (user.cashbackAmount >= 5) {
    redeemCashbackBtn.style.display = 'inline-block';
  } else {
    redeemCashbackBtn.style.display = 'none';
  }
}

// Login function
async function login(username, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  });
  if (res.ok) {
    currentUser = username;
    showProfile();
    loadProfile();
    setInterval(loadProfile, 5000);
  } else {
    alert('Login failed');
  }
}

// Register function
async function register(username, password) {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  });
  if (res.ok) {
    currentUser = username;
    showProfile();
    loadProfile();
    setInterval(loadProfile, 5000);
  } else {
    alert('Registration failed');
  }
}

// Logout function
async function logout() {
  await fetch(`${API_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  currentUser = null;
  showLogin();
}

// Redeem cashback
async function redeemCashback() {
  const res = await fetch(`${API_URL}/redeem-cashback`, {
    method: 'POST',
    credentials: 'include',
  });
  if (res.ok) {
    alert('Cashback redeemed!');
    loadProfile();
  } else {
    const data = await res.json();
    alert('Redeem failed: ' + (data.error || 'Unknown error'));
  }
}

// Call this whenever a bet is placed with the bet amount in euros
async function placeBet(amount) {
  if (!currentUser) {
    alert('You must be logged in to place bets');
    return;
  }
  const res = await fetch(`${API_URL}/bet`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ amount }),
  });
  if (res.ok) {
    const data = await res.json();
    console.log(`Bet registered. XP: ${data.xp}, Level: ${data.level}`);
    loadProfile();
  } else {
    alert('Bet failed');
  }
}

// Example bindings (replace these with your actual UI logic)
loginBtn.onclick = () => {
  const username = prompt('Username:');
  const password = prompt('Password:');
  login(username, password);
};

registerBtn.onclick = () => {
  const username = prompt('Choose username:');
  const password = prompt('Choose password:');
  register(username, password);
};

logoutBtn.onclick = () => {
  logout();
};

redeemCashbackBtn.onclick = () => {
  redeemCashback();
};

// Start app
checkSession();