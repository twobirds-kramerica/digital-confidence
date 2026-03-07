/* ============================================================
   Digital Confidence Centre — Settings Panel
   Opens when user taps "My Settings" in sidebar.
   Controls: Font Size, Colour Mode, City, Devices, Reset
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  injectSettingsStyles();
  injectSettingsModal();
  wireSettingsLink();
});

/* ---- Inject CSS for settings panel ---- */
function injectSettingsStyles() {
  var style = document.createElement('style');
  style.textContent = [
    '#dc-settings-modal{',
    '  display:none;position:fixed;top:0;left:0;width:100%;height:100%;',
    '  z-index:9999;align-items:center;justify-content:center;padding:16px;',
    '  box-sizing:border-box;',
    '}',
    '#dc-settings-backdrop{',
    '  position:fixed;top:0;left:0;width:100%;height:100%;',
    '  background:rgba(0,0,0,0.75);z-index:-1;',
    '}',
    '.dc-settings-content{',
    '  position:relative;background:#fff;border-radius:14px;',
    '  padding:24px 24px 20px;max-width:520px;width:100%;',
    '  max-height:90vh;overflow-y:auto;',
    '  box-shadow:0 20px 60px rgba(0,0,0,0.45);',
    '  box-sizing:border-box;',
    '}',
    '[data-theme="dark"] .dc-settings-content{',
    '  background:#1E2D3D;color:#E8EAF0;',
    '}',
    '.dc-settings-close{',
    '  position:sticky;top:0;float:right;',
    '  background:#f0f0f0;border:1px solid #cccccc;border-radius:4px;',
    '  color:#333333;font-size:14px;font-weight:600;cursor:pointer;',
    '  padding:4px 10px;margin-bottom:10px;z-index:10;flex-shrink:0;',
    '  transition:background 0.15s,border-color 0.15s;',
    '}',
    '.dc-settings-close:hover{background:#e0e0e0;border-color:#999999;}',
    '.dc-settings-close:focus{outline:3px solid #005FCC;outline-offset:2px;}',
    '.dc-settings-title{',
    '  font-size:22px;font-weight:700;color:#1A237E;margin:0 0 20px;clear:both;',
    '}',
    '[data-theme="dark"] .dc-settings-title{color:#90CAF9;}',
    '.dc-settings-section{',
    '  margin-bottom:24px;padding-bottom:20px;',
    '  border-bottom:1px solid #e0e0e0;',
    '}',
    '[data-theme="dark"] .dc-settings-section{border-bottom-color:#37474F;}',
    '.dc-settings-section:last-child{border-bottom:none;margin-bottom:0;}',
    '.dc-settings-section-title{',
    '  font-size:15px;font-weight:700;color:#2C3E50;',
    '  margin:0 0 12px;text-transform:uppercase;letter-spacing:0.05em;',
    '}',
    '[data-theme="dark"] .dc-settings-section-title{color:#CFD8DC;}',
    /* Font size buttons */
    '.dc-settings-font-row{display:flex;gap:10px;flex-wrap:wrap;}',
    '.dc-settings-font-btn{',
    '  flex:1;min-width:60px;min-height:44px;padding:10px 8px;border-radius:8px;',
    '  border:2px solid #CFD8DC;background:#fff;cursor:pointer;',
    '  font-weight:700;transition:all 0.15s;line-height:1;',
    '}',
    '.dc-settings-font-btn.active{',
    '  background:#1565C0;color:#fff;border-color:#1565C0;',
    '}',
    '.dc-settings-font-btn:hover:not(.active){background:#F0F4FF;border-color:#1565C0;}',
    '[data-theme="dark"] .dc-settings-font-btn{background:#263238;border-color:#37474F;color:#E8EAF0;}',
    '[data-theme="dark"] .dc-settings-font-btn.active{background:#1565C0;border-color:#1565C0;color:#fff;}',
    /* Colour mode button */
    '.dc-settings-theme-btn{',
    '  padding:10px 20px;border-radius:8px;border:2px solid #CFD8DC;',
    '  background:#fff;cursor:pointer;font-size:15px;font-weight:600;',
    '  transition:all 0.15s;min-height:44px;',
    '}',
    '.dc-settings-theme-btn:hover{background:#F0F4FF;border-color:#1565C0;}',
    '[data-theme="dark"] .dc-settings-theme-btn{background:#263238;border-color:#37474F;color:#E8EAF0;}',
    /* City / Device rows */
    '.dc-settings-info-row{',
    '  display:flex;align-items:center;justify-content:space-between;',
    '  gap:12px;flex-wrap:wrap;',
    '}',
    '.dc-settings-value{',
    '  font-size:16px;font-weight:600;color:#1A237E;flex:1;',
    '}',
    '[data-theme="dark"] .dc-settings-value{color:#90CAF9;}',
    '.dc-settings-change-btn{',
    '  padding:8px 16px;border-radius:8px;border:2px solid #1565C0;',
    '  background:#fff;color:#1565C0;cursor:pointer;font-weight:600;',
    '  transition:all 0.15s;min-height:44px;white-space:nowrap;',
    '}',
    '.dc-settings-change-btn:hover{background:#1565C0;color:#fff;}',
    '[data-theme="dark"] .dc-settings-change-btn{background:#1E2D3D;color:#90CAF9;border-color:#42A5F5;}',
    '[data-theme="dark"] .dc-settings-change-btn:hover{background:#1565C0;color:#fff;}',
    /* Reset button */
    '.dc-settings-reset-btn{',
    '  width:100%;padding:12px;border-radius:8px;min-height:44px;',
    '  border:2px solid #C62828;background:#fff;color:#C62828;',
    '  cursor:pointer;font-size:15px;font-weight:700;',
    '  transition:all 0.15s;',
    '}',
    '.dc-settings-reset-btn:hover{background:#C62828;color:#fff;}',
    '[data-theme="dark"] .dc-settings-reset-btn{background:#1E2D3D;}'
  ].join('\n');
  document.head.appendChild(style);
}

/* ---- Build and inject settings modal ---- */
function injectSettingsModal() {
  var html = [
    '<div id="dc-settings-modal" role="dialog" aria-modal="true" aria-label="My Settings">',
      '<div id="dc-settings-backdrop"></div>',
      '<div class="dc-settings-content">',
        '<button class="dc-settings-close" id="dc-settings-close" aria-label="Close settings">\u00d7 Close</button>',
        '<h2 class="dc-settings-title">\u2699\uFE0F My Settings</h2>',

        /* Font Size */
        '<div class="dc-settings-section">',
          '<p class="dc-settings-section-title">Text Size</p>',
          '<div class="dc-settings-font-row">',
            '<button class="dc-settings-font-btn" data-size="small" aria-label="Small text" style="font-size:14px">A</button>',
            '<button class="dc-settings-font-btn" data-size="medium" aria-label="Medium text" style="font-size:18px">A+</button>',
            '<button class="dc-settings-font-btn" data-size="large" aria-label="Large text" style="font-size:22px">A++</button>',
            '<button class="dc-settings-font-btn" data-size="xl" aria-label="Extra large text" style="font-size:26px">A+++</button>',
          '</div>',
        '</div>',

        /* Colour Mode */
        '<div class="dc-settings-section">',
          '<p class="dc-settings-section-title">Colour Mode</p>',
          '<button class="dc-settings-theme-btn" id="dc-settings-theme-btn"></button>',
        '</div>',

        /* Your City */
        '<div class="dc-settings-section">',
          '<p class="dc-settings-section-title">Your City</p>',
          '<div class="dc-settings-info-row">',
            '<span class="dc-settings-value" id="dc-settings-city-val">Not set</span>',
            '<button class="dc-settings-change-btn" id="dc-settings-city-btn">Change City</button>',
          '</div>',
        '</div>',

        /* Your Devices */
        '<div class="dc-settings-section">',
          '<p class="dc-settings-section-title">Your Devices</p>',
          '<div class="dc-settings-info-row">',
            '<span class="dc-settings-value" id="dc-settings-devices-val">Not set</span>',
            '<button class="dc-settings-change-btn" id="dc-settings-devices-btn">Change Devices</button>',
          '</div>',
        '</div>',

        /* Reset */
        '<div class="dc-settings-section">',
          '<p class="dc-settings-section-title">Reset</p>',
          '<button class="dc-settings-reset-btn" id="dc-settings-reset-btn">',
            'Start Over \u2014 Reset All My Settings',
          '</button>',
        '</div>',

      '</div>',
    '</div>'
  ].join('');

  document.body.insertAdjacentHTML('beforeend', html);

  /* Wire up close button and backdrop */
  document.getElementById('dc-settings-close').addEventListener('click', closeSettingsModal);
  document.getElementById('dc-settings-backdrop').addEventListener('click', closeSettingsModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var modal = document.getElementById('dc-settings-modal');
      if (modal && modal.style.display !== 'none') closeSettingsModal();
    }
  });

  /* Font size buttons */
  document.querySelectorAll('.dc-settings-font-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var size = btn.getAttribute('data-size');
      document.documentElement.setAttribute('data-font-size', size);
      localStorage.setItem('dc-font-size', size);
      /* Also sync the accessibility bar buttons if they exist */
      document.querySelectorAll('.font-size-btn').forEach(function (b) {
        var pressed = b.getAttribute('data-size') === size;
        b.classList.toggle('active', pressed);
        b.setAttribute('aria-pressed', pressed ? 'true' : 'false');
      });
      updateSettingsFontButtons(size);
    });
  });

  /* Colour mode toggle */
  document.getElementById('dc-settings-theme-btn').addEventListener('click', function () {
    var current = document.documentElement.getAttribute('data-theme') || 'light';
    var next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('dc-theme', next);
    /* Sync existing theme toggle buttons */
    document.querySelectorAll('.theme-toggle-btn').forEach(function (b) {
      b.textContent = next === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF13';
      b.setAttribute('aria-label', next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
    updateSettingsThemeButton(next);
  });

  /* City change — reopen wizard */
  document.getElementById('dc-settings-city-btn').addEventListener('click', function () {
    closeSettingsModal();
    if (typeof dcOpenWizard === 'function') {
      dcOpenWizard();
    } else {
      alert('The setup wizard is not available on this page. Please return to the Home page to change your city.');
    }
  });

  /* Devices change — reopen wizard */
  document.getElementById('dc-settings-devices-btn').addEventListener('click', function () {
    closeSettingsModal();
    if (typeof dcOpenWizard === 'function') {
      dcOpenWizard();
    } else {
      alert('The setup wizard is not available on this page. Please return to the Home page to change your devices.');
    }
  });

  /* Reset everything */
  document.getElementById('dc-settings-reset-btn').addEventListener('click', function () {
    var confirmed = confirm('Are you sure? This will reset your city, devices, text size, and all your progress. You will start fresh from the beginning.');
    if (confirmed) {
      localStorage.clear();
      location.reload();
    }
  });
}

/* ---- Open / Close ---- */
function openSettingsModal() {
  var modal = document.getElementById('dc-settings-modal');
  if (!modal) return;

  /* Populate current values */
  updateSettingsFontButtons(localStorage.getItem('dc-font-size') || 'medium');
  updateSettingsThemeButton(localStorage.getItem('dc-theme') || 'light');
  updateSettingsCityDisplay();
  updateSettingsDevicesDisplay();

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  setTimeout(function () {
    var closeBtn = document.getElementById('dc-settings-close');
    if (closeBtn) closeBtn.focus();
  }, 100);
}

function closeSettingsModal() {
  var modal = document.getElementById('dc-settings-modal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
  /* Return focus to the settings link */
  var link = document.querySelector('.settings-link');
  if (link) link.focus();
}

/* ---- Update helpers ---- */
function updateSettingsFontButtons(activeSize) {
  document.querySelectorAll('.dc-settings-font-btn').forEach(function (btn) {
    btn.classList.toggle('active', btn.getAttribute('data-size') === activeSize);
  });
}

function updateSettingsThemeButton(theme) {
  var btn = document.getElementById('dc-settings-theme-btn');
  if (!btn) return;
  if (theme === 'dark') {
    btn.textContent = '\u2600\uFE0F Switch to Light Mode';
  } else {
    btn.textContent = '\uD83C\uDF13 Switch to Dark Mode';
  }
}

function updateSettingsCityDisplay() {
  var cityEl = document.getElementById('dc-settings-city-val');
  if (!cityEl) return;
  var cityKey = localStorage.getItem('dc-city');
  var cityName = 'Not set yet';
  if (cityKey) {
    /* Try DC_CITIES from city-resources.js if available */
    if (typeof DC_CITIES !== 'undefined' && DC_CITIES[cityKey]) {
      cityName = DC_CITIES[cityKey].name;
    } else {
      cityName = cityKey.charAt(0).toUpperCase() + cityKey.slice(1);
    }
  }
  cityEl.textContent = cityName;
}

function updateSettingsDevicesDisplay() {
  var devEl = document.getElementById('dc-settings-devices-val');
  if (!devEl) return;
  var profileRaw = localStorage.getItem('dc-device-profile');
  var devLabel = 'Not set yet';
  if (profileRaw) {
    try {
      var profile = JSON.parse(profileRaw);
      var labels = {
        iphone: 'iPhone', 'android-phone': 'Android Phone',
        ipad: 'iPad', 'android-tablet': 'Android Tablet',
        windows: 'Windows PC', mac: 'Mac', chromebook: 'Chromebook'
      };
      var devices = [].concat(profile.phone || [], profile.tablet || [], profile.computer || [])
        .filter(function (v) { return v && v !== 'none'; })
        .map(function (v) { return labels[v] || v; });
      devLabel = devices.length ? devices.join(', ') : 'No devices selected';
    } catch (e) {
      devLabel = 'Unknown';
    }
  }
  devEl.textContent = devLabel;
}

/* ---- Wire the settings link in the sidebar ---- */
function wireSettingsLink() {
  document.querySelectorAll('.settings-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      openSettingsModal();
    });
  });
}
