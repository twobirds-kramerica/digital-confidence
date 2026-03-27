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
  for (var m = 1; m <= 15; m++) {
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
  initScrollProgress();
  initBreadcrumb();
  initTopBarHome();
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
function setDyslexicFont(isOn) {
  document.body.classList.toggle('dyslexic-font', isOn);
  localStorage.setItem('dc-dyslexic-font', isOn ? 'true' : 'false');
  // Sync sidebar checkbox
  var checkbox = document.getElementById('dyslexic-font-toggle');
  if (checkbox) checkbox.checked = isOn;
  // Sync header bar button
  var barBtn = document.querySelector('.dyslexic-font-btn');
  if (barBtn) {
    barBtn.classList.toggle('active', isOn);
    barBtn.setAttribute('aria-pressed', isOn ? 'true' : 'false');
  }
}

function initDyslexicFont() {
  var isOn = localStorage.getItem('dc-dyslexic-font') === 'true';

  // Inject 👓 button into the accessibility-bar (header)
  var bar = document.querySelector('.accessibility-bar');
  if (bar && !bar.querySelector('.dyslexic-font-btn')) {
    var barBtn = document.createElement('button');
    barBtn.className = 'a11y-btn dyslexic-font-btn';
    barBtn.setAttribute('aria-label', 'Toggle dyslexic-friendly font (OpenDyslexic)');
    barBtn.setAttribute('aria-pressed', isOn ? 'true' : 'false');
    barBtn.setAttribute('title', 'Switch to OpenDyslexic font');
    barBtn.textContent = '👓';
    if (isOn) barBtn.classList.add('active');
    var themeBtn = bar.querySelector('.theme-toggle-btn');
    if (themeBtn) bar.insertBefore(barBtn, themeBtn);
    else bar.appendChild(barBtn);
    barBtn.addEventListener('click', function() {
      setDyslexicFont(!document.body.classList.contains('dyslexic-font'));
    });
  }

  // Wire sidebar checkbox
  var toggle = document.getElementById('dyslexic-font-toggle');
  if (!toggle) return;
  toggle.checked = isOn;
  toggle.addEventListener('change', function() {
    setDyslexicFont(this.checked);
  });
  // iOS Safari touchend fallback
  var label = toggle.closest('label');
  if (label) {
    label.addEventListener('touchend', function(e) {
      e.preventDefault();
      toggle.checked = !toggle.checked;
      toggle.dispatchEvent(new Event('change'));
    });
  }
}

/* ---- Scroll Progress Indicator ---- */
function initScrollProgress() {
  var bar = document.createElement('div');
  bar.id = 'dc-scroll-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);

  window.addEventListener('scroll', function() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.height = pct + '%';
  }, { passive: true });
}

/* ---- Home Button in Top Bar ---- */
function initTopBarHome() {
  var topBar = document.querySelector('.top-bar');
  if (!topBar) return;
  if (document.getElementById('dc-home-btn')) return; // already injected

  /* Build correct relative path back to index.html */
  var path = window.location.pathname;
  var dccMatch = path.match(/digital-confidence\/(.*)/);
  var homeHref = 'index.html';
  if (dccMatch && dccMatch[1]) {
    var depth = (dccMatch[1].match(/\//g) || []).length;
    homeHref = depth > 0 ? '../'.repeat(depth) + 'index.html' : 'index.html';
  }

  var link = document.createElement('a');
  link.id        = 'dc-home-btn';
  link.href      = homeHref;
  link.className = 'top-bar-home';
  link.setAttribute('aria-label', 'Return to homepage');
  link.innerHTML = '<span aria-hidden="true">🏠</span><span class="top-bar-home-label">Home</span>';

  /* Replace the empty trailing span, or append */
  var trailing = topBar.querySelector('span:last-child:not(.site-title)');
  if (trailing && !trailing.textContent.trim()) {
    topBar.replaceChild(link, trailing);
  } else {
    topBar.appendChild(link);
  }
}

/* ---- Breadcrumb on Module Pages ---- */
function initBreadcrumb() {
  var path = window.location.pathname;
  var match = path.match(/module-(\d+)\.html/);
  if (!match) return;

  var h1 = document.querySelector('.main-content h1, main h1');
  if (!h1) return;

  var moduleName = h1.textContent.trim();
  var nav = document.createElement('nav');
  nav.className = 'breadcrumb-nav';
  nav.setAttribute('aria-label', 'Breadcrumb');
  nav.innerHTML =
    '<ol class="breadcrumb">' +
      '<li><a href="index.html">Home</a></li>' +
      '<li aria-current="page">' + moduleName + '</li>' +
    '</ol>';

  h1.parentNode.insertBefore(nav, h1);
}
