// Force default light mode on initial load
window.addEventListener('DOMContentLoaded', () => {
  // Remove dark class and reset storage
  document.documentElement.classList.remove('dark');
  localStorage.setItem('theme', 'light');
  const btn = document.getElementById('themeToggleBtn');
  if (btn) btn.innerText = '🌙 מצב לילה';
});

// Splash and auth initialization
window.onload = () => {
  setTimeout(() => {
    document.getElementById('splash').classList.add('hidden');
    document.getElementById('auth').classList.remove('hidden');
  }, 2000);
};

function showLogin() {
  document.getElementById('loginForm').classList.remove('hidden');
  document.getElementById('registerForm').classList.add('hidden');
}

function showRegister() {
  document.getElementById('loginForm').classList.add('hidden');
  document.getElementById('registerForm').classList.remove('hidden');
}

function goToChat() {
  const nameField = document.getElementById('name') || document.getElementById('loginEmail');
  localStorage.setItem('name', nameField.value.split('@')[0] || 'משתמש');
  document.getElementById('auth').classList.add('hidden');
  document.getElementById('chat').classList.remove('hidden');
}

function clearChat() {
  document.getElementById('chatMessages').innerHTML = '';
}

function toggleDarkMode() {
  const btn = document.getElementById('themeToggleBtn');
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    btn.innerText = '🌙 מצב לילה';
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    btn.innerText = '☀️ מצב יום';
  }
}

// Bot and other functions ...
