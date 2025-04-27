
// Splash screen transition
window.onload = () => {
  setTimeout(() => {
    document.getElementById('splash').classList.add('opacity-0');
    setTimeout(() => {
      document.getElementById('splash').classList.add('hidden');
      document.getElementById('auth').classList.remove('hidden');
    }, 1000);
  }, 2000);
};

function goToChat() {
  localStorage.setItem('name', document.getElementById('name').value);
  localStorage.setItem('gender', document.getElementById('gender').value);
  localStorage.setItem('experience', document.getElementById('experience').value);
  localStorage.setItem('role', document.getElementById('role').value);
  localStorage.setItem('framework', document.getElementById('framework').value);
  
  document.getElementById('auth').classList.add('hidden');
  document.getElementById('chat').classList.remove('hidden');
}

function sendMessage() {
  const input = document.getElementById('messageInput');
  const text = input.value.trim();
  if (text === '') return;

  addMessage(text, 'user');
  input.value = '';

  setTimeout(() => {
    botReply();
  }, 1000);
}

function addMessage(text, sender) {
  const chat = document.getElementById('chatMessages');
  const bubble = document.createElement('div');
  bubble.className = sender === 'user' ? 'text-right p-2 bg-blue-100 rounded self-end max-w-xs' : 'text-right p-2 bg-green-100 rounded self-start max-w-xs animate-bounce';
  bubble.innerText = text;
  chat.appendChild(bubble);
  chat.scrollTop = chat.scrollHeight;
}

function clearChat() {
  document.getElementById('chatMessages').innerHTML = '';
}

function toggleDarkMode() {
  document.body.classList.toggle('bg-gray-900');
  document.body.classList.toggle('text-white');
  document.querySelectorAll('div, input, select').forEach(el => {
    el.classList.toggle('bg-gray-800');
    el.classList.toggle('text-white');
  });
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

function botReply() {
  const responses = [
    "אני כאן כדי לעזור, מה עובר עליך היום?",
    "נשמע מאתגר! רוצה לשתף עוד?",
    "תזכור שאתה לא לבד במסע הזה!",
    "זה טבעי להרגיש כך. אני איתך.",
    "איזו התמודדות מעולה! גאה בך!",
    "לפעמים צריך גם לעצור ולנשום. תנסה עכשיו."
  ];
  const name = localStorage.getItem('name') || '';
  let reply = responses[Math.floor(Math.random() * responses.length)];
  if (name) {
    reply = `${name}, ${reply}`;
  }
  addMessage(reply, 'bot');
}
