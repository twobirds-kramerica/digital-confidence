/* ============================================================
   Digital Confidence Centre — Exit Safely Button
   Injects a persistent "Exit Safely" button that takes users
   to Google immediately. Useful if someone is being watched
   or wants to leave quickly without their browsing tracked.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('dc-exit-safely-btn')) return;

  var btn = document.createElement('a');
  btn.id        = 'dc-exit-safely-btn';
  btn.href      = 'https://www.google.ca';
  btn.setAttribute('aria-label', 'Exit to Google safely');
  btn.setAttribute('title', 'Click to leave this page and go to Google');
  btn.innerHTML =
    '<span class="dc-exit-icon" aria-hidden="true">🚪</span>' +
    '<span class="dc-exit-label">Exit Safely</span>';

  btn.addEventListener('click', function (e) {
    /* Replace history so Back button doesn't return to DCC */
    try { history.replaceState(null, '', 'https://www.google.ca'); } catch (err) {}
    window.location.replace('https://www.google.ca');
    e.preventDefault();
  });

  document.body.appendChild(btn);
});
