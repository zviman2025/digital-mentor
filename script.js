// Theme initialization: default to light mode unless user preference is dark
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
  document.getElementById && document.getElementById('themeToggleBtn') && (document.getElementById('themeToggleBtn').innerText = '☀️ מצב יום');
} else {
  document.documentElement.classList.remove('dark');
}

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

function addMessage(text, sender) {
  const chat = document.getElementById('chatMessages');
  const div = document.createElement('div');
  const name = localStorage.getItem('name') || 'משתמש';
  const speaker = sender === 'user' ? name : 'חונך הדיגיטלי';
  const cls = sender === 'user'
    ? 'text-right p-2 bg-blue-100 dark:bg-blue-900 rounded self-end max-w-xs'
    : 'text-left p-2 bg-green-100 dark:bg-green-900 rounded self-start max-w-xs';
  div.className = cls;
  div.innerHTML = `<span class="font-bold">${speaker}:</span> ${text}`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById('messageInput');
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  input.value = '';
  setTimeout(() => botReply(text), 500);
}

function editProfile() {
  document.getElementById('chat').classList.add('hidden');
  document.getElementById('editProfile').classList.remove('hidden');
}

function saveProfile() {
  ['editName','editGender','editExperience','editRole','editFramework'].forEach(id => {
    const el = document.getElementById(id);
    localStorage.setItem(id.replace('edit','').toLowerCase(), el.value);
  });
  document.getElementById('editProfile').classList.add('hidden');
  document.getElementById('chat').classList.remove('hidden');
}

function logout() {
  document.getElementById('chat').classList.add('hidden');
  document.getElementById('auth').classList.remove('hidden');
}

function botReply(userText) {
  const name = localStorage.getItem('name') || 'משתמש';
  let reply = '';
  if (/\b(עייף|קשה|אין כוח)\b/.test(userText)) {
    reply = `נשמע קשה, ${name}. האם ניסית עולם ורגיעה קצרה?`;
  } else if (/\b(שמחה|הצלחתי|מרוצה)\b/.test(userText)) {
    reply = `נהדר! שמח לשמוע, ${name}. מה היה הגורם הגדול להצלחה הזו?`;
  } else if (/\b(עצה|טיפ|עזרה)\b/.test(userText)) {
    reply = `אשמח לעזור, ${name}. על מה תרצה להתמקד היום?`;
  } else if (/\b(איך|מה)\b/.test(userText)) {
    reply = `שאלה חשובה, ${name}. תן לי עוד קצת פרטים ואנסה לכוון אותך.`;
  } else if (/\b(תודה)\b/.test(userText)) {
    reply = `בכיף, ${name}. תמיד כאן לתמוך בך.`;
  } else {
    reply = `מעניין, ${name}. תוכל לפרט יותר כדי שאוכל לסייע?`;
  }
  addMessage(reply, 'bot');
}
