// Replaced botReply to use Cohere API directly

window.onload = () => {
  if (localStorage.getItem('dark') === 'true') {
    document.body.classList.add('dark-mode');
  }
  setTimeout(() => {
    document.getElementById('splash').classList.add('hidden');
    document.getElementById('auth').classList.remove('hidden');
  }, 2000);
};

function goToChat() {
  document.getElementById('auth').classList.add('hidden');
  document.getElementById('chat').classList.remove('hidden');
}

function clearChat() {
  document.getElementById('chatBox').innerHTML = '';
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('dark', document.body.classList.contains('dark-mode'));
}

function editProfile() {
  document.getElementById('chat').classList.add('hidden');
  document.getElementById('editProfile').classList.remove('hidden');
  document.getElementById('name').value = localStorage.getItem('name') || '';
  document.getElementById('ageGroup').value = localStorage.getItem('ageGroup') || '';
  document.getElementById('editFramework').value = localStorage.getItem('framework') || '';
}

function saveProfile() {
  const name = document.getElementById('name').value;
  const ageGroup = document.getElementById('ageGroup').value;
  const framework = document.getElementById('editFramework').value;
  localStorage.setItem('name', name);
  localStorage.setItem('ageGroup', ageGroup);
  localStorage.setItem('framework', framework);
  document.getElementById('editProfile').classList.add('hidden');
  document.getElementById('chat').classList.remove('hidden');
}

function addMessage(text, sender) {
  const chatBox = document.getElementById('chatBox');
  const msg = document.createElement('div');
  msg.classList.add('mb-2', sender === 'user' ? 'text-right' : 'text-left');
  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function botReply(userText) {
  const name = localStorage.getItem('name') || 'משתמש';
  addMessage('...טוען תגובה...', 'bot');
  try {
    const response = await fetch('https://api.cohere.ai/v1/generate', {
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
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }
    const data = await response.json();
    const text = data.generations[0].text.trim();
    addMessage(text, 'bot');
  } catch (err) {
    console.error(err);
    addMessage('מצטערת, הייתה שגיאה בקבלת התשובה.', 'bot');
  }
}

function sendMessage() {
  const input = document.getElementById('userInput');
  const userText = input.value.trim();
  if (!userText) return;
  addMessage(userText, 'user');
  input.value = '';
  botReply(userText);
}
