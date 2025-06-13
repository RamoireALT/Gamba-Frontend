document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('open-auth-popup');
    const popup = document.getElementById('auth-popup');
    const closeBtn = document.getElementById('close-popup');
    const overlay = document.querySelector('.popup-overlay');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const tabLabel = document.getElementById('tab-label');
  
    // Show popup on login button click
    loginBtn.addEventListener('click', () => {
      popup.classList.remove('hidden');
      setActiveTab('login'); // default tab on open
    });
  
    // Close popup on close button click
    closeBtn.addEventListener('click', () => {
      popup.classList.add('hidden');
    });
  
    // Close popup if clicking outside popup-box (on overlay)
    overlay.addEventListener('click', () => {
      popup.classList.add('hidden');
    });
  
    // Switch tabs
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tab = button.dataset.tab;
        setActiveTab(tab);
      });
    });
  
    // Tab switch logic with label update
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
        else if (tabName === 'reset') tabLabel.textContent = 'Reset Password';
      }
    }
  
    // Optional: handle form submissions
    document.getElementById('login-form')?.addEventListener('submit', e => {
      e.preventDefault();
      alert('Login submitted!');
      popup.classList.add('hidden');
    });
  
    document.getElementById('register-form')?.addEventListener('submit', e => {
      e.preventDefault();
      alert('Register submitted!');
      popup.classList.add('hidden');
    });
  
    document.getElementById('reset-form')?.addEventListener('submit', e => {
      e.preventDefault();
      alert('Password reset submitted!');
      popup.classList.add('hidden');
    });
  });
  
