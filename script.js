// הצגת Splash Screen ואז מעבר למסך התחברות
window.onload = () => {
  setTimeout(() => {
    document.getElementById('splash').classList.add('opacity-0');
    setTimeout(() => {
      document.getElementById('splash').classList.add('hidden');
      document.getElementById('auth').classList.remove('hidden');
      document.body.classList.remove('bg-blue-500');
      document.body.classList.add('bg-gray-100');
    }, 1000);
  }, 2000); // 2 שניות הצגת הספלש
};

function goToChat() {
  // כרגע מדמה מעבר למסך הבא
  alert('ברוך הבא! (כאן נעבור למסך הצ\'אט)');
}

function goToChat() {
  document.getElementById('auth').classList.add('hidden');
  document.getElementById('chat').classList.remove('hidden');
}

// פונקציית שליחת הודעה
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

// הוספת הודעה למסך
function addMessage(text, sender) {
  const chat = document.getElementById('chatMessages');
  const bubble = document.createElement('div');
  bubble.className = sender === 'user' 
    ? 'text-right p-2 bg-blue-100 rounded self-end max-w-xs'
    : 'text-right p-2 bg-green-100 rounded self-start max-w-xs animate-bounce';
  bubble.innerText = text;
  chat.appendChild(bubble);
  chat.scrollTop = chat.scrollHeight;
}

// ניקוי צ'אט
function clearChat() {
  document.getElementById('chatMessages').innerHTML = '';
}

// מצב לילה
function toggleDarkMode() {
  document.body.classList.toggle('bg-gray-900');
  document.body.classList.toggle('text-white');
}

// עריכת פרטים (בשלב זה סתם התראה)
function editProfile() {
  alert('כאן ייפתח מסך עריכת פרטים!');
}

// יציאה
function logout() {
  document.getElementById('chat').classList.add('hidden');
  document.getElementById('auth').classList.remove('hidden');
}

// מענה אוטומטי מהחונך
function botReply() {
  const responses = [
    "אני כאן כדי לעזור, מה עובר עליך היום?",
    "נשמע מאתגר! רוצה לשתף עוד?",
    "תזכור שאתה לא לבד במסע הזה!",
    "זה טבעי להרגיש כך. אני איתך.",
    "איזו התמודדות מעולה! גאה בך!",
    "לפעמים צריך גם לעצור ולנשום. תנסה עכשיו."
  ];
  const randomIndex = Math.floor(Math.random() * responses.length);
  addMessage(responses[randomIndex], 'bot');
}

function editProfile() {
  document.getElementById('chat').classList.add('hidden');
  document.getElementById('editProfile').classList.remove('hidden');

  // טעינת נתונים קיימים אם יש
  document.getElementById('editName').value = localStorage.getItem('name') || '';
  document.getElementById('editGender').value = localStorage.getItem('gender') || 'בחר מגדר';
  document.getElementById('editExperience').value = localStorage.getItem('experience') || '';
  document.getElementById('editRole').value = localStorage.getItem('role') || 'בחר תפקיד';
  document.getElementById('editFramework').value = localStorage.getItem('framework') || 'בחר מסגרת';
}

function saveProfile() {
  // שמירת הפרטים
  localStorage.setItem('name', document.getElementById('editName').value);
  localStorage.setItem('gender', document.getElementById('editGender').value);
  localStorage.setItem('experience', document.getElementById('editExperience').value);
  localStorage.setItem('role', document.getElementById('editRole').value);
  localStorage.setItem('framework', document.getElementById('editFramework').value);

  // חזרה לצ'אט
  document.getElementById('editProfile').classList.add('hidden');
  document.getElementById('chat').classList.remove('hidden');
}
