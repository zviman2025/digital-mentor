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
    {regex: /(?<!\\p{L})(תלמידים)(?!\\p{L})/u, reply: `איך התקדמת עם התלמידים שלך היום, ${name}?`},
    {regex: /(?<!\\p{L})(תלמיד)(?!\\p{L})/u, reply: `אילו אתגרים תלמידיך חוו לאחרונה?`},
    {regex: /(?<!\\p{L})(תלמידה)(?!\\p{L})/u, reply: `האם יש תלמידה שזקוקה לתמיכה נוספת?`},
    {regex: /(?<!\\p{L})(מבחן)(?!\\p{L})/u, reply: `מה אתה לומד לקראת המבחן?`},
    {regex: /(?<!\\p{L})(מבחנים)(?!\\p{L})/u, reply: `איך אתה מתכונן למבחנים המתקרבים?`},
    {regex: /(?<!\\p{L})(שיעור)(?!\\p{L})/u, reply: `מה הנושא של השיעור הבא שלך?`},
    {regex: /(?<!\\p{L})(שיעורים)(?!\\p{L})/u, reply: `איך היית מתכנן סדר שיעורים לשבוע הבא?`},
    {regex: /(?<!\\p{L})(למידה)(?!\\p{L})/u, reply: `איזה שיטות למידה הכי עובדות עבורך?`},
    {regex: /(?<!\\p{L})(ללמוד)(?!\\p{L})/u, reply: `כיצד אתה אוהב ללמוד נושאים חדשים?`},
    {regex: /(?<!\\p{L})(בית ספר)(?!\\p{L})/u, reply: `איזו השקעה דורש בית הספר מבחינת זמן?`},
    {regex: /(?<!\\p{L})(בבית ספר)(?!\\p{L})/u, reply: `מה אתה הכי אוהב בבתי ספר?`},
    {regex: /(?<!\\p{L})(הוראה)(?!\\p{L})/u, reply: `איזה סגנון הוראה אתה מעדיף?`},
    {regex: /(?<!\\p{L})(מלמד)(?!\\p{L})/u, reply: `איזה תחום אתה מלמד?`},
    {regex: /(?<!\\p{L})(פרויקט)(?!\\p{L})/u, reply: `מה נושא הפרויקט האחרון שלך?`},
    {regex: /(?<!\\p{L})(פרויקטים)(?!\\p{L})/u, reply: `כמה פרויקטים אתה מנהל כרגע?`},
    {regex: /(?<!\\p{L})(מטלת בית)(?!\\p{L})/u, reply: `איזה מטלת בית אתגר אותך לאחרונה?`},
    {regex: /(?<!\\p{L})(משימת בית)(?!\\p{L})/u, reply: `כיצד ניתן להפוך משימות בית ליעילות יותר?`},
    {regex: /(?<!\\p{L})(הערכה)(?!\\p{L})/u, reply: `איך אתה מעריך את ההתקדמות של התלמידים?`},
    {regex: /(?<!\\p{L})(הערכת תלמידים)(?!\\p{L})/u, reply: `מה הכלים המועדפים עליך להערכה כמותית?`},
    {regex: /(?<!\\p{L})(ציונים)(?!\\p{L})/u, reply: `האם אתה מרוצה מהציונים של התלמידים?`},
    {regex: /(?<!\\p{L})(ציון)(?!\\p{L})/u, reply: `כיצד אתה מסביר לתלמידים את משמעות הציון?`},
    {regex: /(?<!\\p{L})(סילבוס)(?!\\p{L})/u, reply: `איך היית מתכנן סילבוס לשני סמסטרים?`},
    {regex: /(?<!\\p{L})(תכנית לימודים)(?!\\p{L})/u, reply: `מה המשאבים הנדרשים לתכנית לימודים זו?`},
    {regex: /(?<!\\p{L})(ניהול זמן)(?!\\p{L})/u, reply: `איך אתה מדריך תלמידים לניהול זמן?`},
    {regex: /(?<!\\p{L})(לוח זמנים)(?!\\p{L})/u, reply: `האם יש לך דוגמא ללוח זמנים לימודי?`},
    {regex: /(?<!\\p{L})(מוטיבציה)(?!\\p{L})/u, reply: `איזה גורמים משפיעים על המוטיבציה של התלמידים?`},
    {regex: /(?<!\\p{L})(השראה)(?!\\p{L})/u, reply: `מה מעורר בך השראה בתחום החינוך?`},
    {regex: /(?<!\\p{L})(קורס)(?!\\p{L})/u, reply: `מה הנושאים המרכזיים בקורס שלך?`},
    {regex: /(?<!\\p{L})(קורסים)(?!\\p{L})/u, reply: `כמה קורסים אתה מלמד בו זמנית?`},
    {regex: /(?<!\\p{L})(סדנא)(?!\\p{L})/u, reply: `איך היית בונה סדנא של יום אחד?`},
    {regex: /(?<!\\p{L})(סדנאות)(?!\\p{L})/u, reply: `איזה נושא היית בוחר לסדנא?`},
    {regex: /(?<!\\p{L})(קבוצת למידה)(?!\\p{L})/u, reply: `כיצד היית מארגן קבוצת למידה אפקטיבית?`},
    {regex: /(?<!\\p{L})(הוראה מרחוק)(?!\\p{L})/u, reply: `אילו כלים אתה משתמש בהוראה מרחוק?`},
    {regex: /(?<!\\p{L})(zoom)(?!\\p{L})/u, reply: `האם יש לך טיפים לשימוש בזום בכיתה?`},
    {regex: /(?<!\\p{L})(גיליון עבודה)(?!\\p{L})/u, reply: `איך היית יוצר גיליון עבודה מזמין?`},
    {regex: /(?<!\\p{L})(גיליונות עבודה)(?!\\p{L})/u, reply: `מה התוכן של גיליונות העבודה האחרונים שלך?`},
    {regex: /(?<!\\p{L})(שיתוף פעולה)(?!\\p{L})/u, reply: `איך אתה מעודד שיתוף פעולה בכיתה?`},
    {regex: /(?<!\\p{L})(קבוצתי)(?!\\p{L})/u, reply: `איזה פעילויות קבוצתיות אתה מציע?`},
    {regex: /(?<!\\p{L})(משוב)(?!\\p{L})/u, reply: `מה הגישה שלך למתן משוב בונה?`},
    {regex: /(?<!\\p{L})(feedback)(?!\\p{L})/u, reply: `כיצד אתה נותן feedback מדויק?`},
    {regex: /(?<!\\p{L})(מתמטיקה)(?!\\p{L})/u, reply: `כיצד אתה מלמד מושגים מתמטיים מורכבים?`},
    {regex: /(?<!\\p{L})(שפה)(?!\\p{L})/u, reply: `איך אתה בונה שיעור שפה מעניין?`},
    {regex: /(?<!\\p{L})(ספרות)(?!\\p{L})/u, reply: `איזה קטע ספרותי אהוב עליך ללמד?`},
    {regex: /(?<!\\p{L})(היסטוריה)(?!\\p{L})/u, reply: `כיצד אתה מחבר היסטוריה לחיי היום יום?`},
    {regex: /(?<!\\p{L})(גאוגרפיה)(?!\\p{L})/u, reply: `מה השיטה ללמד גאוגרפיה אינטראקטיבית?`},
    {regex: /(?<!\\p{L})(מדעים)(?!\\p{L})/u, reply: `איזה ניסוי מדעי היית מציג?`},
    {regex: /(?<!\\p{L})(ניסוי)(?!\\p{L})/u, reply: `איך אתה מתכנן ניסוי לימודי?`},
    {regex: /(?<!\\p{L})(הדרכה)(?!\\p{L})/u, reply: `מהם העקרונות המרכזיים שלך בהדרכה?`},
    {regex: /(?<!\\p{L})(מיומנויות)(?!\\p{L})/u, reply: `איך אתה מפתח מיומנויות חשיבה אצל תלמידיך?`},
  ];
  let reply = `מעניין, ${name}. תוכל לפרט יותר כדי שאוכל לסייע?`;
  for (const p of patterns) {
    if (p.regex.test(userText)) {
      reply = p.reply;
      break;
    }
  }
  addMessage(reply, 'bot');
}
