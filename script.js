
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

function botReply(userText) {
  const name = localStorage.getItem('name') || 'משתמש';

  // Patterns for specific topics
  const patterns = [
    {regex: /(?<!\p{L})(עייף|קשה|אין כוח)(?!\p{L})/u, reply: `נשמע קשה, ${name}. האם ניסית להירגע מעט או לקחת הפסקה קצרה?`},
    {regex: /(?<!\p{L})(שמחה|הצלחתי|מרוצה)(?!\p{L})/u, reply: `כל הכבוד, ${name}! מה לדעתך גרם להצלחה הזו?`},
    {regex: /(?<!\p{L})(עצוב|מדוכא|כואב)(?!\p{L})/u, reply: `אני מצטער לשמוע, ${name}. רוצה לשתף יותר במה קורה?`},
    {regex: /(?<!\p{L})(לחץ|מתוח|לחוצה)(?!\p{L})/u, reply: `הלחץ יכול להיות קשה. האם יש משהו מסוים שמייצר לך תחושת סטרס עכשיו?`},
    {regex: /(?<!\p{L})(עצה|טיפ|עזרה)(?!\p{L})/u, reply: `בשמחה, ${name}. באיזה תחום היית רוצה לקבל תמיכה היום?`},
    {regex: /(?<!\p{L})(איך|מה)(?!\p{L})/u, reply: `שאלה מעניינת, ${name}. תוכל לפרט קצת יותר כדי שאוכל לכוון אותך?`},
    {regex: /(?<!\p{L})(תודה|תודה רבה)(?!\p{L})/u, reply: `בשמחה, ${name}! תמיד כאן כשאתה צריך.`},
    {regex: /(?<!\p{L})(שלום|היי|הלו)(?!\p{L})/u, reply: `שלום, ${name}! כיצד אפשר לעזור היום?`},
    {regex: /(?<!\p{L})(להיות|להרגיש)(?!\p{L})/u, reply: `רגשות הם חלק חשוב. רוצה לספר לי איך אתה מרגיש בפרט?`},
    {regex: /(?<!\p{L})(ילדים|בנים|בנות)(?!\p{L})/u, reply: `ילדים יכולים להיות מאתגר... איך הולך עם הילדים שלך?`},
    {regex: /(?<!\p{L})(עבודה|קריירה)(?!\p{L})/u, reply: `איך הולך בעבודה? האם יש משהו שברצונך לשפר או לשתף?`},
    {regex: /(?<!\p{L})(בריאות|בריא)(?!\p{L})/u, reply: `הבריאות חשובה. האם יש משהו ספציפי שמטריד אותך בנושא הבריאות?`},
    {regex: /(?<!\p{L})(גירושין|גירשנו)(?!\p{L})/u, reply: `גירושין הם תהליך מורכב. האם תרצה לדבר על ההיבטים הרגשיים או הפרקטיים?`},
    {regex: /(?<!\p{L})(סטנדאפ|בדיחה)(?!\p{L})/u, reply: `אה, סטנדאפ! רוצה עזרה בפיתוח קטע חדש או מעטפת לקטע קיים?`},
    {regex: /(?<!\p{L})(נסיעה|טיול)(?!\p{L})/u, reply: `טיולים תמיד מרתקים. לאן אתה מתכנן לנסוע?`},
    // New patterns
    {regex: /(?<!\p{L})(כסף|משכנתא|הוצאות)(?!\p{L})/u, reply: `כסף יכול להיות נושא מורכב, ${name}. באילו היבטים היית רוצה להתמקד?`},
    {regex: /(?<!\p{L})(בדידות|בודד|בבדידות)(?!\p{L})/u, reply: `לעיתים תחושת בדידות חזקה. ${name}, האם יש מישהו שאתה חש בטוח לשתף אותו?`},
    {regex: /(?<!\p{L})(שינה|ישנוני)(?!\p{L})/u, reply: `שינה חשובה מאוד, ${name}. האם אתה מצליח לישון מספיק בלילה?`},
    {regex: /(?<!\p{L})(הצלחה|מוצלח|גאה)(?!\p{L})/u, reply: `איזה יופי לשמוע על ההצלחה שלך, ${name}! איך הרגשת כשזה קרה?`}
  ];

  // Randomized fallback replies
  const defaultReplies = [
    `מעניין, ${name}. תוכל לפרט יותר כדי שאוכל לסייע?`,
    `גם אותי זה מעניין, ${name}! תוכל להסביר קצת יותר?`,
    `אשמח לשמוע עוד על זה, ${name}. הפרט בבקשה.`,
    `מה דעתך להרחיב קצת על זה, ${name}?`
  ];

  let reply = defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
  for (const p of patterns) {
    if (p.regex.test(userText)) {
      reply = p.reply;
      break;
    }
  }
  addMessage(reply, 'bot');
}
