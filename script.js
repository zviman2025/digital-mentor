function setDarkMode(isDark) {
  if (isDark) {
    document.body.classList.add('bg-gray-900', 'text-white');
    document.body.classList.remove('bg-white', 'text-gray-900');
  } else {
    document.body.classList.remove('bg-gray-900', 'text-white');
    document.body.classList.add('bg-white', 'text-gray-900');
  }

  ['splash','auth','chat','editProfile'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (isDark) {
      el.classList.add('bg-gray-900', 'text-white');
      el.classList.remove('bg-white', 'text-gray-900');
    } else {
      el.classList.remove('bg-gray-900', 'text-white');
      el.classList.add('bg-white', 'text-gray-900');
    }
  });

  document.querySelectorAll('div, input, select, button').forEach(el => {
    if (isDark) {
      el.classList.add('bg-gray-800', 'text-white', 'border-gray-600');
      el.classList.remove('bg-white', 'text-gray-800', 'text-gray-900', 'border-gray-300');
    } else {
      el.classList.remove('bg-gray-800', 'text-white', 'border-gray-600');
      el.classList.add('bg-white', 'text-gray-900', 'border-gray-300');
    }
  });

  const nightBtn = document.getElementById('nightModeBtn');
  if (nightBtn) {
    nightBtn.innerHTML = isDark ? '☀️ מצב יום' : '🌙 מצב לילה';
  }

  localStorage.setItem('darkMode', isDark ? '1' : '0');
  updateAuthTabs();
}

function toggleDarkMode() {
  const isDark = !document.body.classList.contains('bg-gray-900');
  setDarkMode(isDark);
}

window.onload = () => {
  setTimeout(() => {
    document.getElementById('splash').classList.add('hidden');
    document.getElementById('auth').classList.remove('hidden');
    const dark = localStorage.getItem('darkMode') === '1';
    setDarkMode(dark);
  }, 2000);
};

// שאר הפונקציות נשארות ללא שינוי
function showLogin() { /* ... */ }
function showRegister() { /* ... */ }
function updateAuthTabs() { /* ... */ }
function goToChat() { /* ... */ }
function clearChat() { /* ... */ }
function addMessage() { /* ... */ }
function sendMessage() { /* ... */ }
function editProfile() { /* ... */ }
function saveProfile() { /* ... */ }
function logout() { /* ... */ }
function botReply() { /* ... */ }
