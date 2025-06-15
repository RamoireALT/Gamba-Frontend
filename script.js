// --- Section switching logic ---
const sections = {
  home: document.getElementById("home-section"),
  store: document.getElementById("store-section"),
  gambling: document.getElementById("gambling-section"),
};

const showSection = (key) => {
  Object.values(sections).forEach((sec) => sec.classList.add("hidden"));
  sections[key].classList.remove("hidden");
};

document.getElementById("store-link").addEventListener("click", (e) => {
  e.preventDefault();
  showSection("store");
});

document.getElementById("gambling-link").addEventListener("click", (e) => {
  e.preventDefault();
  showSection("gambling");
});

document.getElementById("logo-click").addEventListener("click", () => {
  showSection("home");
});

// Default to home section
showSection("home");

// --- User system and auth popup logic ---

const authPopup = document.getElementById("auth-popup");
const openAuthBtn = document.getElementById("open-auth-popup");
const closePopupBtn = document.getElementById("close-popup");
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
const tabLabel = document.getElementById("tab-label");

let currentUser = null; // Will hold logged-in user info

// Level XP thresholds cache (calculate once)
const levelXpThresholds = [];
function buildLevelXp() {
  let xp = 2500;
  levelXpThresholds[1] = 2500;
  // Levels 2-4 increase by 25%
  for (let lvl = 2; lvl <= 4; lvl++) {
    xp = Math.floor(xp * 1.25);
    levelXpThresholds[lvl] = xp;
  }
  // Levels 5-19 same 25%
  for (let lvl = 5; lvl <= 19; lvl++) {
    xp = Math.floor(xp * 1.25);
    levelXpThresholds[lvl] = xp;
  }
  // Levels 20-49 increase by 10%
  for (let lvl = 20; lvl <= 49; lvl++) {
    xp = Math.floor(xp * 1.10);
    levelXpThresholds[lvl] = xp;
  }
  // Levels 50-100 increase by 5%
  for (let lvl = 50; lvl <= 100; lvl++) {
    xp = Math.floor(xp * 1.05);
    levelXpThresholds[lvl] = xp;
  }
}
buildLevelXp();

// Get user level from XP
function getLevelFromXp(xp) {
  for (let lvl = 1; lvl <= 100; lvl++) {
    if (xp < levelXpThresholds[lvl]) {
      return lvl - 1 > 0 ? lvl - 1 : 1;
    }
  }
  return 100; // max level
}

// Get cashback % from level
function getCashbackPercent(level) {
  if (level >= 100) return 0.007; // 0.7%
  if (level >= 50) return 0.005; // 0.5%
  if (level >= 40) return 0.0045;
  if (level >= 30) return 0.004;
  if (level >= 20) return 0.0035;
  if (level >= 15) return 0.003;
  if (level >= 10) return 0.0025;
  return 0;
}

// Show user profile button with info or login button
function updateAuthButton() {
  if (!currentUser) {
    openAuthBtn.textContent = "Login";
    openAuthBtn.classList.remove("profile-btn");
    openAuthBtn.onclick = () => openAuthPopup();
  } else {
    openAuthBtn.textContent = `${currentUser.username} | Lv.${currentUser.level} | €${currentUser.balance.toFixed(2)}`;
    openAuthBtn.classList.add("profile-btn");
    openAuthBtn.onclick = () => openProfilePopup();
  }
}

// Open auth popup
function openAuthPopup() {
  authPopup.classList.remove("hidden");
  showTab("login");
}

// Close auth popup
function closeAuthPopup() {
  authPopup.classList.add("hidden");
}

// Tab switch logic
tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    showTab(btn.dataset.tab);
  });
});

function showTab(tab) {
  tabContents.forEach((content) => {
    content.classList.toggle("active", content.id === tab);
  });
  tabButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tab);
  });
  tabLabel.textContent = tab.charAt(0).toUpperCase() + tab.slice(1);
}

// Close popup button
closePopupBtn.addEventListener("click", closeAuthPopup);
authPopup.querySelector(".popup-overlay").addEventListener("click", closeAuthPopup);

// Handle login form submit
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const usernameOrEmail = e.target[0].value.trim();
  const password = e.target[1].value;

  try {
    const res = await fetch("https://Gamba-Backend.onrender.com/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ usernameOrEmail, password }),
    });
    const data = await res.json();
    if (res.ok) {
      currentUser = data.user;
      closeAuthPopup();
      updateAuthButton();
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    alert("Error connecting to server");
  }
});

// Handle register form submit
document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = e.target[0].value.trim();
  const email = e.target[1].value.trim();
  const password = e.target[2].value;
  const confirmPassword = e.target[3].value;

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const res = await fetch("https://Gamba-Backend.onrender.com/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Registration successful! You can now log in.");
      showTab("login");
    } else {
      alert(data.message || "Registration failed");
    }
  } catch (err) {
    alert("Error connecting to server");
  }
});

// Handle reset password form submit
document.getElementById("reset-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!currentUser) {
    alert("You must be logged in to reset your password.");
    return;
  }
  const currentPassword = e.target[0].value;
  const newPassword = e.target[1].value;
  const confirmNewPassword = e.target[2].value;

  if (newPassword !== confirmNewPassword) {
    alert("New passwords do not match");
    return;
  }

  try {
    const res = await fetch("https://Gamba-Backend.onrender.com/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Password reset successful.");
      closeAuthPopup();
    } else {
      alert(data.message || "Password reset failed");
    }
  } catch (err) {
    alert("Error connecting to server");
  }
});

// Periodically fetch current user info to update profile and cashback
async function fetchCurrentUser() {
  try {
    const res = await fetch("https://Gamba-Backend.onrender.com/api/user", {
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      if (data.user) {
        currentUser = data.user;
        currentUser.level = getLevelFromXp(currentUser.xp);
        updateAuthButton();
      } else {
        currentUser = null;
        updateAuthButton();
      }
    } else {
      currentUser = null;
      updateAuthButton();
    }
  } catch {
    // silent fail
  }
}

// Initial user fetch and repeat every 5 seconds
fetchCurrentUser();
setInterval(fetchCurrentUser, 5000);