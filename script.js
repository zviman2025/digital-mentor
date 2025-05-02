// Reverted login/register to simple goToChat, Firebase auth commented out
/*
const firebaseConfig = { ... };
firebase.initializeApp(firebaseConfig);
*/

window.onload = () => {
  // Apply theme from localStorage
  if (localStorage.getItem('dark') === 'true') {
    document.body.classList.add('dark-mode');
  }
  // Splash screen timeout
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
  const dark = document.body.classList.contains('dark-mode');
  const loginTab = document.getElementById('loginTab');
  const registerTab = document.getElementById('registerTab');
  if (dark) {
    loginTab.style.backgroundColor = '#4b5563';
    loginTab.style.color = '#f9fafb';
    registerTab.style.backgroundColor = '#4b5563';
    registerTab.style.color = '#f9fafb';
  } else {
    loginTab.style.backgroundColor = '#3b82f6';
    loginTab.style.color = '#ffffff';
    registerTab.style.backgroundColor = '#d1d5db';
    registerTab.style.color = '#1f2937';
  }
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
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('dark', document.body.classList.contains('dark-mode'));
  updateAuthTabs();
}

function addMessage(text, sender) {
  const chat = document.getElementById('chatMessages');
  const div = document.createElement('div');
  const name = localStorage.getItem('name') || 'משתמש';
  const speaker = sender === 'user' ? name : 'חונך הדיגיטלי';
  const cls = sender === 'user' ? 'text-right p-2 rounded self-end max-w-xs' : 'text-left p-2 rounded self-start max-w-xs';
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

// Replaced botReply to use Cohere API directly
async function botReply(userText) {
  const name = localStorage.getItem('name') || 'משתמש';
  addMessage('...טוען תגובה...', 'bot');
  try {
    const response = await fetch('https://api.cohere.com/v1/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer nUEmCkwkSlYkNwWinzqErl6qd9z3PFTFBJShCzXN'
      },
      body: JSON.stringify({
        model: 'xlarge',
        prompt: userText,
        max_tokens: 100,
        temperature: 0.8
      })
    });
    if (!response.ok) { throw new Error(`Status ${response.status}`); }
    const data = await response.json();
    const text = data.generations[0].text.trim();
    addMessage(text, 'bot');
  } catch (err) {
    console.error(err);
    addMessage('מצטערת, הייתה שגיאה בקבלת התשובה.', 'bot');
  }
}
