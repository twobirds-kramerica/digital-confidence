/* ============================================================
   Digital Confidence Centre — Exit Safely Button
   Injects an "Exit Safely" link into the header (top-bar)
   instead of floating over page content. Useful if someone
   is being watched or wants to leave quickly.
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

  /* Inject into top-bar (mobile header) — replaces empty trailing span */
  var topBar = document.querySelector('.top-bar');
  if (topBar) {
    var trailing = topBar.querySelector('span:last-child');
    if (trailing) {
      topBar.replaceChild(btn, trailing);
    } else {
      topBar.appendChild(btn);
    }
    return;
  }

  /* Fallback: inject into sidebar nav before the settings divider */
  var divider = document.querySelector('.settings-divider');
  if (divider) {
    divider.parentNode.insertBefore(btn, divider);
  }
});
