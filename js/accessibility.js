/* ============================================
   Accessibility Controls
   Font Size & Theme Toggle
   ============================================ */

/* Migrate old 'brenda-' localStorage keys to 'dc-' keys (one-time) */
(function migrateKeys() {
  if (localStorage.getItem('dc-migrated')) return;
  // Migrate theme and font size
  var oldFont = localStorage.getItem('brenda-font-size');
  var oldTheme = localStorage.getItem('brenda-theme');
  if (oldFont && !localStorage.getItem('dc-font-size')) {
    localStorage.setItem('dc-font-size', oldFont);
  }
  if (oldTheme && !localStorage.getItem('dc-theme')) {
    localStorage.setItem('dc-theme', oldTheme);
  }
  // Migrate progress keys
  for (var m = 1; m <= 8; m++) {
    for (var i = 1; i <= 10; i++) {
      var oldKey = 'brenda-progress-m' + m + '-' + i;
      var newKey = 'dc-progress-m' + m + '-' + i;
      var val = localStorage.getItem(oldKey);
      if (val !== null && localStorage.getItem(newKey) === null) {
        localStorage.setItem(newKey, val);
      }
    }
  }
  localStorage.setItem('dc-migrated', 'true');
})();

document.addEventListener('DOMContentLoaded', function () {
  loadPreferences();
  initFontControls();
  initThemeToggle();
  initDyslexicFont();
});

var FONT_SIZES = ['small', 'medium', 'large', 'xl'];
var FONT_LABELS = ['A', 'A', 'A', 'A'];

function loadPreferences() {
  var savedFont = localStorage.getItem('dc-font-size') || 'medium';
  var savedTheme = localStorage.getItem('dc-theme') || 'light';
  document.documentElement.setAttribute('data-font-size', savedFont);
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateFontButtons(savedFont);
  updateThemeButton(savedTheme);
  // Apply dyslexic font early (same frame as theme/font) to prevent flash
  if (localStorage.getItem('dc-dyslexic-font') === 'true') {
    document.body.classList.add('dyslexic-font');
  }
}

function initFontControls() {
  var buttons = document.querySelectorAll('.font-size-btn');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var size = btn.getAttribute('data-size');
      document.documentElement.setAttribute('data-font-size', size);
      localStorage.setItem('dc-font-size', size);
      updateFontButtons(size);
    });
  });
}

function updateFontButtons(activeSize) {
  var buttons = document.querySelectorAll('.font-size-btn');
  buttons.forEach(function (btn) {
    var size = btn.getAttribute('data-size');
    if (size === activeSize) {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    }
  });
}

function initThemeToggle() {
  var btns = document.querySelectorAll('.theme-toggle-btn');
  btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('dc-theme', next);
      updateThemeButton(next);
    });
  });
}

function updateThemeButton(theme) {
  var btns = document.querySelectorAll('.theme-toggle-btn');
  btns.forEach(function (btn) {
    btn.textContent = theme === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF13';
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  });
}

/* ---- Dyslexic Font Toggle ---- */
function initDyslexicFont() {
  var toggle = document.getElementById('dyslexic-font-toggle');
  if (!toggle) return;

  // Sync toggle visual state (body class already applied in loadPreferences)
  toggle.checked = (localStorage.getItem('dc-dyslexic-font') === 'true');

  toggle.addEventListener('change', function() {
    var isOn = this.checked;
    document.body.classList.toggle('dyslexic-font', isOn);
    // Store as explicit string so === 'true' check works reliably on all browsers
    localStorage.setItem('dc-dyslexic-font', isOn ? 'true' : 'false');
  });

  // iOS Safari: also listen on the label for 'click' as a fallback
  var label = toggle.closest('label');
  if (label) {
    label.addEventListener('touchend', function(e) {
      // Let the browser handle it; this just prevents delayed 300ms ghost click
      e.preventDefault();
      toggle.checked = !toggle.checked;
      toggle.dispatchEvent(new Event('change'));
    });
  }
}
