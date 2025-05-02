// Reverted login/register to simple goToChat, Firebase auth commented out
/*
const firebaseConfig = { ... };
firebase.initializeApp(firebaseConfig);

function registerUser() { ... }
function loginUser() { ... }
*/

window.onload = () => {
  setTimeout(() => {
    document.getElementById('splash').classList.add('hidden');
    document.getElementById('auth').classList.remove('hidden');
  }, 2000);
};

function showLogin() {
  document.getElementById('loginForm').classList.remove('hidden');
  document.getElementById('registerForm').classList.add('hidden');
  updateAuthTabs();
}

function showRegister() {
  document.getElementById('loginForm').classList.add('hidden');
  document.getElementById('registerForm').classList.remove('hidden');
  updateAuthTabs();
}

function updateAuthTabs() {
  const dark = document.body.classList.contains('bg-gray-900');
  const loginTab = document.getElementById('loginTab');
  const registerTab = document.getElementById('registerTab');
  loginTab.className = dark ? 'p-2 bg-gray-800 text-white rounded' : 'p-2 bg-blue-500 text-white rounded';
  registerTab.className = dark ? 'p-2 bg-gray-800 text-white rounded' : 'p-2 bg-gray-300 text-gray-800 rounded';
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
  document.body.classList.toggle('bg-gray-900');
  document.body.classList.toggle('text-white');
  ['splash','auth','chat','editProfile'].forEach(id => {
    document.getElementById(id).classList.toggle('bg-white');
    document.getElementById(id).classList.toggle('bg-gray-900');
  });
  document.querySelectorAll('div, input, select, button').forEach(el => {
    el.classList.toggle('bg-gray-800');
    el.classList.toggle('text-white');
    el.classList.toggle('border-gray-600');
  });
  updateAuthTabs();
}

function addMessage(text, sender) {
  const chat = document.getElementById('chatMessages');
  const div = document.createElement('div');
  const name = localStorage.getItem('name') || 'משתמש';
  const speaker = sender === 'user' ? name : 'חונך הדיגיטלי';
  let cls = '';
  if (sender === 'user') {
    const isDark = document.body.classList.contains('bg-gray-900');
    cls = isDark
      ? 'text-right p-2 bg-blue-900 text-white rounded self-end max-w-xs'
      : 'text-right p-2 bg-blue-100 text-gray-900 rounded self-end max-w-xs';
  } else {
    const isDark = document.body.classList.contains('bg-gray-900');
    cls = isDark
      ? 'text-left p-2 bg-green-900 text-white rounded self-start max-w-xs'
      : 'text-left p-2 bg-green-100 text-gray-900 rounded self-start max-w-xs';
  }
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
