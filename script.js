window.onload = () => {
  // מבטלים את בדיקת מצב לילה כבר בהטענה ראשונית

  setTimeout(() => {
    // מחבאים את הספלאש
    document.getElementById('splash').classList.add('hidden');
    // במקום להציג auth – פותחים ישר את הצ'אט
    document.getElementById('chat').classList.remove('hidden');
  }, 2000);
};