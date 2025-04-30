
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
  localStorage.setItem('name', nameField.value.split('@')[0]);
  document.getElementById('auth').classList.add('hidden');
  document.getElementById('chat').classList.remove('hidden');
}

function sendMessage() {
  const input = document.getElementById('messageInput');
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, 'user');
  input.value = '';
  setTimeout(() => { botReply(text); }, 800);
}

function addMessage(text, sender) {
  const chat = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = sender === 'user' ? 'text-right p-2 bg-blue-100 rounded self-end max-w-xs' : 'text-right p-2 bg-green-100 rounded self-start max-w-xs';
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function clearChat() {
  document.getElementById('chatMessages').innerHTML = '';
}

function toggleDarkMode() {
  document.body.classList.toggle('bg-gray-900');
  document.body.classList.toggle('text-white');
  document.querySelectorAll('div, input, select, button').forEach(el => {
    el.classList.toggle('bg-gray-800');
    el.classList.toggle('text-white');
    el.classList.toggle('border-gray-600');
  });

  const loginButton = document.getElementById('loginTab');
  const registerButton = document.getElementById('registerTab');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  loginButton.classList.toggle('bg-blue-500');
  loginButton.classList.toggle('bg-gray-800');
  registerButton.classList.toggle('bg-gray-300');
  registerButton.classList.toggle('bg-gray-800');
  loginForm.classList.toggle('bg-white');
  registerForm.classList.toggle('bg-white');
}

function editProfile() {
  document.getElementById('chat').classList.add('hidden');
  document.getElementById('editProfile').classList.remove('hidden');
  document.getElementById('editName').value = localStorage.getItem('name') || '';
  document.getElementById('editGender').value = localStorage.getItem('gender') || 'בחר מגדר';
  document.getElementById('editExperience').value = localStorage.getItem('experience') || '';
  document.getElementById('editRole').value = localStorage.getItem('role') || 'בחר תפקיד';
  document.getElementById('editFramework').value = localStorage.getItem('framework') || 'בחר מסגרת';
}

function saveProfile() {
  localStorage.setItem('name', document.getElementById('editName').value);
  localStorage.setItem('gender', document.getElementById('editGender').value);
  localStorage.setItem('experience', document.getElementById('editExperience').value);
  localStorage.setItem('role', document.getElementById('editRole').value);
  localStorage.setItem('framework', document.getElementById('editFramework').value);

  document.getElementById('editProfile').classList.add('hidden');
  document.getElementById('chat').classList.remove('hidden');
}

function logout() {
  document.getElementById('chat').classList.add('hidden');
  document.getElementById('auth').classList.remove('hidden');
}

function botReply(userText) {
  const name = localStorage.getItem('name') || 'חבר';
  let reply = '';

  if (userText.includes('עייף') || userText.includes('אין כוח') || userText.includes('קשה')) {
    reply = `${name}, נשמע שאת/ה עובר/ת תקופה לא פשוטה. תזכור/י לקחת נשימה. חני פה לכל דבר.`;
  } else if (userText.includes('שמחה') || userText.includes('הצלחתי') || userText.includes('מרוצה')) {
    reply = `וואו, ${name}! כל הכבוד! איזה כיף לשמוע! 🌟 זה כיף לדעת שאתה מרוצה מההתקדמות!`;
  } else if (userText.includes('עזרה') || userText.includes('איך') || userText.includes('מה עושים')) {
    reply = `${name}, אני כאן להקשיב ולעזור. רוצה לספר קצת יותר? אני כאן כדי לסייע לך!`;
  } else if (userText.includes('?')) {
    reply = `שאלה מעולה, ${name}! אני איתך לכל שאלה.`;
  } else {
    reply = `תודה ששיתפת, ${name}. אני כאן בשבילך תמיד.`;
  }

  addMessage(reply, 'bot');
}
