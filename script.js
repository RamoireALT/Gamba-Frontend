document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('open-auth-popup'); // fix ID here
    const popup = document.getElementById('auth-popup');
    const closeBtn = document.getElementById('close-popup');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const tabLabel = document.getElementById('tab-label');
  
    // Show popup on login button click
    loginBtn.addEventListener('click', () => {
      popup.classList.remove('hidden');
      setActiveTab('login'); // default tab
    });
  
    // Close popup on close button click
    closeBtn.addEventListener('click', () => {
      popup.classList.add('hidden');
    });
  
    // Close popup when clicking outside the popup-box
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.classList.add('hidden');
      }
    });
  
    // Switch tabs
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tab = button.dataset.tab;
        setActiveTab(tab);
      });
    });
  
    // Update tab content and label
    function setActiveTab(tabName) {
      tabButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
      });
  
      tabContents.forEach(content => {
        content.classList.toggle('active', content.id === tabName);
      });
  
      if (tabLabel) {
        if (tabName === 'login') tabLabel.textContent = 'Login';
        else if (tabName === 'register') tabLabel.textContent = 'Register';
        else if (tabName === 'reset') tabLabel.textContent = 'Forgot Password';
      }
    }
  
    // Optional: Form submit handlers
    document.getElementById('login-form')?.addEventListener('submit', e => {
      e.preventDefault();
      alert('Logging in...');
    });
  
    document.getElementById('register-form')?.addEventListener('submit', e => {
      e.preventDefault();
      alert('Registering...');
    });
  
    document.getElementById('discord-login-btn')?.addEventListener('click', () => {
      window.location.href = 'http://localhost:3000/api/auth/discord';
    });
  });
  
