
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
  div.className = sender === 'user' ? 'text-right p-2 bg-blue-100 rounded self-end max-w-xs' : 'text-right p-2 bg-green-100 rounded self-start max-w-xs animate-bounce';
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
}

function editProfile() {
  alert('כאן נוכל להוסיף אפשרות לערוך את הפרטים בהמשך.');
}

function logout() {
  document.getElementById('chat').classList.add('hidden');
  document.getElementById('auth').classList.remove('hidden');
}

function botReply(userText) {
  const name = localStorage.getItem('name') || 'חבר';
  let reply = '';

  if (userText.includes('עייף') || userText.includes('אין כוח') || userText.includes('קשה')) {
    reply = `${name}, נשמע שאת/ה עובר/ת תקופה לא פשוטה. תזכור/י לקחת נשימה.`;
  } else if (userText.includes('שמחה') || userText.includes('הצלחתי') || userText.includes('מרוצה')) {
    reply = `וואו, ${name}! כל הכבוד! איזה כיף לשמוע! 🌟`;
  } else if (userText.includes('עזרה') || userText.includes('איך') || userText.includes('מה עושים')) {
    reply = `${name}, אני כאן להקשיב ולעזור. רוצה לספר קצת יותר?`;
  } else if (userText.includes('?')) {
    reply = `שאלה מעולה, ${name}! אני איתך.`;
  } else {
    reply = `תודה ששיתפת, ${name}. אני כאן בשבילך.`;
  }

  addMessage(reply, 'bot');
}
