/* ============================================
   Digital Confidence Centre
   Setup Wizard & Device Content Filtering
   ============================================ */

/* ---------- Wizard State ---------- */
var wizardStep = 0;
var wizardSelections = {
  city: '',
  phone: [],
  tablet: [],
  computer: []
};

var WIZARD_STEPS = [
  { id: 'city', title: 'Where do you live?', type: 'city' },
  { id: 'phone', title: 'What phone do you use?', type: 'device' },
  { id: 'tablet', title: 'What tablet do you use?', type: 'device' },
  { id: 'computer', title: 'What computer do you use?', type: 'device' }
];

var DEVICE_OPTIONS = {
  phone: [
    { value: 'iphone', label: 'iPhone', icon: '' },
    { value: 'android-phone', label: 'Android Phone', icon: '' },
    { value: 'none', label: "I don't have one", icon: '' }
  ],
  tablet: [
    { value: 'ipad', label: 'iPad', icon: '' },
    { value: 'android-tablet', label: 'Android Tablet', icon: '' },
    { value: 'none', label: "I don't have one", icon: '' }
  ],
  computer: [
    { value: 'windows', label: 'Windows', icon: '' },
    { value: 'mac', label: 'Mac', icon: '' },
    { value: 'chromebook', label: 'Chromebook', icon: '' },
    { value: 'none', label: "I don't have one", icon: '' }
  ]
};

/* ---------- Open / Close Wizard ---------- */
function dcOpenWizard() {
  var existing = document.querySelector('.setup-wizard-overlay');
  if (existing) {
    existing.style.display = 'flex';
    wizardStep = 0;
    loadExistingSelections();
    renderWizard();
    trapFocus(existing);
    return;
  }
  buildWizardDOM();
}

function dcCloseWizard() {
  var overlay = document.querySelector('.setup-wizard-overlay');
  if (overlay) overlay.style.display = 'none';
  // Restore focus to the trigger element if possible
  var trigger = document.querySelector('.settings-link');
  if (trigger) trigger.focus();
}

/* ---------- Build Wizard DOM ---------- */
function buildWizardDOM() {
  var overlay = document.createElement('div');
  overlay.className = 'setup-wizard-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Setup wizard');

  var wizard = document.createElement('div');
  wizard.className = 'setup-wizard';
  wizard.id = 'setup-wizard';

  // Current settings banner (only if settings already saved)
  var savedCity = localStorage.getItem('dc-city');
  var savedProfile = localStorage.getItem('dc-device-profile');
  if (savedCity || savedProfile) {
    var banner = document.createElement('div');
    banner.className = 'wizard-current-settings';
    var parts = [];
    if (savedCity && window.DC_CITIES && window.DC_CITIES[savedCity]) {
      parts.push(window.DC_CITIES[savedCity].name);
    } else if (savedCity) {
      parts.push(savedCity.charAt(0).toUpperCase() + savedCity.slice(1));
    }
    if (savedProfile) {
      try {
        var p = JSON.parse(savedProfile);
        var devLabels = {
          iphone: 'iPhone', 'android-phone': 'Android Phone',
          ipad: 'iPad', 'android-tablet': 'Android Tablet',
          windows: 'Windows', mac: 'Mac', chromebook: 'Chromebook'
        };
        var devices = [].concat(p.phone || [], p.tablet || [], p.computer || [])
          .filter(function (v) { return v && v !== 'none'; })
          .map(function (v) { return devLabels[v] || v; });
        if (devices.length) parts.push(devices.join(', '));
      } catch (e) { /* ignore */ }
    }
    if (parts.length) {
      banner.textContent = 'Currently set to: ' + parts.join(' \u2022 ');
      wizard.appendChild(banner);
    }
  }

  // Progress dots
  var dots = document.createElement('div');
  dots.className = 'wizard-progress';
  dots.setAttribute('aria-label', 'Wizard progress');
  for (var i = 0; i < WIZARD_STEPS.length; i++) {
    var dot = document.createElement('div');
    dot.className = 'wizard-dot';
    dot.setAttribute('aria-hidden', 'true');
    dots.appendChild(dot);
  }
  wizard.appendChild(dots);

  // Step container
  var stepContainer = document.createElement('div');
  stepContainer.id = 'wizard-step-container';
  wizard.appendChild(stepContainer);

  // Navigation
  var nav = document.createElement('div');
  nav.className = 'wizard-nav';
  nav.innerHTML =
    '<button class="btn btn-secondary wizard-back" aria-label="Go back">Back</button>' +
    '<button class="btn btn-primary wizard-next" aria-label="Continue">Next</button>';
  wizard.appendChild(nav);

  overlay.appendChild(wizard);
  document.body.appendChild(overlay);

  // Close on overlay click
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) dcCloseWizard();
  });

  // Close on Escape
  overlay.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') dcCloseWizard();
    // Focus trap
    if (e.key === 'Tab') {
      var focusable = wizard.querySelectorAll('button, select, [tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Nav button handlers
  wizard.querySelector('.wizard-back').addEventListener('click', function () {
    if (wizardStep > 0) {
      wizardStep--;
      renderWizard();
    }
  });

  wizard.querySelector('.wizard-next').addEventListener('click', function () {
    if (wizardStep < WIZARD_STEPS.length - 1) {
      wizardStep++;
      renderWizard();
    } else {
      saveWizard();
    }
  });

  loadExistingSelections();
  renderWizard();
  trapFocus(overlay);
}

/* ---------- Load Existing Selections ---------- */
function loadExistingSelections() {
  var savedCity = localStorage.getItem('dc-city') || '';
  var savedProfile = localStorage.getItem('dc-device-profile');
  wizardSelections.city = savedCity;
  if (savedProfile) {
    try {
      var parsed = JSON.parse(savedProfile);
      wizardSelections.phone = parsed.phone || [];
      wizardSelections.tablet = parsed.tablet || [];
      wizardSelections.computer = parsed.computer || [];
    } catch (e) { /* ignore */ }
  }
}

/* ---------- Render Current Step ---------- */
function renderWizard() {
  var container = document.getElementById('wizard-step-container');
  if (!container) return;
  var step = WIZARD_STEPS[wizardStep];

  // Update dots
  var dots = document.querySelectorAll('.wizard-dot');
  dots.forEach(function (dot, i) {
    dot.className = 'wizard-dot';
    if (i < wizardStep) dot.classList.add('completed');
    if (i === wizardStep) dot.classList.add('active');
  });

  // Update nav buttons
  var backBtn = document.querySelector('.wizard-back');
  var nextBtn = document.querySelector('.wizard-next');
  if (backBtn) backBtn.style.visibility = wizardStep === 0 ? 'hidden' : 'visible';
  if (nextBtn) nextBtn.textContent = wizardStep === WIZARD_STEPS.length - 1 ? 'Finish' : 'Next';

  var html = '';

  if (step.type === 'city') {
    html += '<h2>Let Us Personalise Your Experience</h2>';
    html += '<p>We would like to show you local resources — such as libraries, senior centres, and Apple Stores — that are closest to you. Your choice is stored only on this device and is never sent anywhere.</p>';
    html += '<h3>' + step.title + '</h3>';
    html += '<select class="wizard-select" id="wizard-city" aria-label="Select your city">';
    html += '<option value="">-- Choose your city --</option>';
    var cityKeys = Object.keys(DC_CITIES);
    cityKeys.forEach(function (key) {
      var selected = wizardSelections.city === key ? ' selected' : '';
      html += '<option value="' + key + '"' + selected + '>' + DC_CITIES[key].name + '</option>';
    });
    html += '</select>';
    if ('geolocation' in navigator) {
      html += '<button class="wizard-geo-btn" id="wizard-geo" type="button">Use my location to suggest a city</button>';
    }
  } else {
    var category = step.id;
    var options = DEVICE_OPTIONS[category];
    var current = wizardSelections[category];
    html += '<h3>' + step.title + '</h3>';
    html += '<p class="step-explanation">Pick all that apply. This helps us show you the right instructions.</p>';
    html += '<div class="wizard-options" role="group" aria-label="' + step.title + '">';
    options.forEach(function (opt) {
      var isSelected = current.indexOf(opt.value) !== -1;
      var isNone = opt.value === 'none';
      var cls = 'wizard-option';
      if (isSelected && isNone) cls += ' selected-none';
      else if (isSelected) cls += ' selected';
      html += '<button class="' + cls + '" data-value="' + opt.value + '" data-category="' + category + '" type="button" aria-pressed="' + isSelected + '">';
      html += opt.label;
      html += '</button>';
    });
    html += '</div>';
  }

  container.innerHTML = html;

  // Bind city select
  var citySelect = document.getElementById('wizard-city');
  if (citySelect) {
    citySelect.addEventListener('change', function () {
      wizardSelections.city = citySelect.value;
    });
  }

  // Bind geo button
  var geoBtn = document.getElementById('wizard-geo');
  if (geoBtn) {
    geoBtn.addEventListener('click', function () {
      geoBtn.textContent = 'Locating...';
      geoBtn.disabled = true;
      navigator.geolocation.getCurrentPosition(function (pos) {
        var lat = pos.coords.latitude;
        var lon = pos.coords.longitude;
        var suggested = suggestCity(lat, lon);
        if (suggested && citySelect) {
          citySelect.value = suggested;
          wizardSelections.city = suggested;
          geoBtn.textContent = 'Suggested: ' + DC_CITIES[suggested].name;
        } else {
          geoBtn.textContent = 'Could not determine city';
        }
      }, function () {
        geoBtn.textContent = 'Location not available';
      }, { timeout: 8000 });
    });
  }

  // Bind device option buttons
  var optBtns = container.querySelectorAll('.wizard-option');
  optBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var val = btn.getAttribute('data-value');
      var cat = btn.getAttribute('data-category');
      toggleDeviceOption(cat, val);
      renderWizard();
    });
  });
}

/* ---------- Toggle Device Selection ---------- */
function toggleDeviceOption(category, value) {
  var arr = wizardSelections[category];
  if (value === 'none') {
    // "I don't have one" clears other selections
    if (arr.indexOf('none') !== -1) {
      wizardSelections[category] = [];
    } else {
      wizardSelections[category] = ['none'];
    }
    return;
  }
  // Remove 'none' if selecting a device
  var noneIdx = arr.indexOf('none');
  if (noneIdx !== -1) arr.splice(noneIdx, 1);
  // Toggle the selection
  var idx = arr.indexOf(value);
  if (idx !== -1) {
    arr.splice(idx, 1);
  } else {
    arr.push(value);
  }
}

/* ---------- Suggest City from Coordinates ---------- */
function suggestCity(lat, lon) {
  var cities = {
    windsor: { lat: 42.3149, lon: -83.0364 },
    london: { lat: 42.9849, lon: -81.2453 },
    stthomas: { lat: 42.7740, lon: -81.1834 },
    woodstock: { lat: 43.1306, lon: -80.7467 },
    kitchener: { lat: 43.4516, lon: -80.4925 }
  };
  var closest = null;
  var closestDist = Infinity;
  var keys = Object.keys(cities);
  for (var i = 0; i < keys.length; i++) {
    var c = cities[keys[i]];
    var d = Math.sqrt(Math.pow(lat - c.lat, 2) + Math.pow(lon - c.lon, 2));
    if (d < closestDist) {
      closestDist = d;
      closest = keys[i];
    }
  }
  // Only suggest if within ~50km (roughly 0.45 degrees)
  if (closestDist > 0.45) return null;
  return closest;
}

/* ---------- Save & Close ---------- */
function saveWizard() {
  localStorage.setItem('dc-city', wizardSelections.city);
  localStorage.setItem('dc-device-profile', JSON.stringify({
    phone: wizardSelections.phone,
    tablet: wizardSelections.tablet,
    computer: wizardSelections.computer
  }));
  localStorage.setItem('dc-setup-complete', 'true');
  dcCloseWizard();
  // Refresh dynamic content
  applyDeviceFiltering();
  personalizeStories();
  if (typeof dcRenderResourcesPage === 'function') dcRenderResourcesPage();
  if (typeof dcRenderModuleHelp === 'function') dcRenderModuleHelp();
  if (typeof dcUpdateIndicators === 'function') dcUpdateIndicators();
  if (typeof dcShowWelcomeBanner === 'function') dcShowWelcomeBanner();
}

/* ---------- Device Content Filtering ---------- */
function applyDeviceFiltering() {
  var profile = localStorage.getItem('dc-device-profile');
  var deviceElements = document.querySelectorAll('.device-content');
  if (!deviceElements.length) return;

  // Remove old notice
  var oldNotice = document.querySelector('.device-filter-notice');
  if (oldNotice) oldNotice.remove();

  if (!profile) {
    // No profile — show everything
    deviceElements.forEach(function (el) {
      el.classList.remove('hidden');
    });
    return;
  }

  var parsed;
  try { parsed = JSON.parse(profile); } catch (e) { return; }

  // Build flat list of user's device tags
  var userDevices = [];
  var deviceNames = [];

  if (parsed.phone) {
    parsed.phone.forEach(function (d) {
      if (d !== 'none') {
        userDevices.push(d);
        if (d === 'iphone') deviceNames.push('iPhone');
        if (d === 'android-phone') deviceNames.push('Android Phone');
      }
    });
  }
  if (parsed.tablet) {
    parsed.tablet.forEach(function (d) {
      if (d !== 'none') {
        userDevices.push(d);
        if (d === 'ipad') deviceNames.push('iPad');
        if (d === 'android-tablet') deviceNames.push('Android Tablet');
      }
    });
  }
  if (parsed.computer) {
    parsed.computer.forEach(function (d) {
      if (d !== 'none') {
        userDevices.push(d);
        if (d === 'windows') deviceNames.push('Windows');
        if (d === 'mac') deviceNames.push('Mac');
        if (d === 'chromebook') deviceNames.push('Chromebook');
      }
    });
  }

  // If no devices selected at all, show everything
  if (userDevices.length === 0) {
    deviceElements.forEach(function (el) {
      el.classList.remove('hidden');
    });
    return;
  }

  // Filter elements
  var anyHidden = false;
  deviceElements.forEach(function (el) {
    var elDevices = (el.getAttribute('data-devices') || '').split(',').map(function (s) { return s.trim(); });
    var match = elDevices.some(function (d) { return userDevices.indexOf(d) !== -1; });
    if (match) {
      el.classList.remove('hidden');
    } else {
      el.classList.add('hidden');
      anyHidden = true;
    }
  });

  // Show notice if filtering is active
  if (anyHidden) {
    var main = document.querySelector('.main-content');
    if (main && main.firstElementChild) {
      var notice = document.createElement('div');
      notice.className = 'device-filter-notice';
      notice.innerHTML =
        '<p>Showing instructions for your ' + deviceNames.join(' and ') + '.</p>' +
        '<a href="#" onclick="dcOpenWizard(); return false;">Change devices</a>';
      // Insert after the first heading or hero element
      var firstH1 = main.querySelector('h1');
      if (firstH1 && firstH1.parentNode) {
        firstH1.parentNode.insertBefore(notice, firstH1.nextSibling);
      } else {
        main.insertBefore(notice, main.firstElementChild);
      }
    }
  }
}

/* ---------- Focus Trap Helper ---------- */
function trapFocus(container) {
  var focusable = container.querySelectorAll('button, select, [tabindex]:not([tabindex="-1"])');
  if (focusable.length > 0) focusable[0].focus();
}

/* ---------- Device Tip Banner (shown after skipping setup) ---------- */
function showDevicePromptIfNeeded() {
  if (!localStorage.getItem('dc-device-prompt-pending')) return;
  // Only show on module pages (URL contains 'module-')
  if (!window.location.pathname.includes('module-') &&
      !window.location.href.includes('module-')) return;

  var main = document.querySelector('.main-content');
  if (!main) return;

  var banner = document.createElement('div');
  banner.className = 'device-prompt-banner';
  banner.innerHTML =
    '<span class="device-prompt-icon">💡</span>' +
    '<span class="device-prompt-text">Tip: <a href="#" onclick="dcOpenWizard();return false;">Set your devices in Settings</a> to see personalised content for your phone, tablet, or computer.</span>' +
    '<button class="device-prompt-dismiss" aria-label="Dismiss tip" onclick="this.parentNode.remove();localStorage.removeItem(\'dc-device-prompt-pending\');">✕</button>';

  var firstChild = main.firstElementChild;
  if (firstChild) {
    main.insertBefore(banner, firstChild);
  } else {
    main.appendChild(banner);
  }
}

/* ---------- Init on Page Load ---------- */
document.addEventListener('DOMContentLoaded', function () {
  // Show wizard on first visit (not when skipped)
  var setupStatus = localStorage.getItem('dc-setup-complete');
  if (!setupStatus) {
    dcOpenWizard();
  }
  // Apply device filtering
  applyDeviceFiltering();
  // Show device tip banner if user skipped setup
  showDevicePromptIfNeeded();
  personalizeStories();
  // Show personalization/filtered banner on module pages
  if (window.location.pathname.indexOf("module-") !== -1 || window.location.href.indexOf("module-") !== -1) {
    var _profile = null;
    try { _profile = JSON.parse(localStorage.getItem("dc-device-profile") || "null"); } catch(e){}
    var _hasDevices = _profile && [].concat(_profile.phone||[], _profile.tablet||[], _profile.computer||[]).some(function(v){ return v && v !== "none"; });
    if (!_hasDevices) { showPersonalizationBanner(); }
    else { showFilteredBanner(_profile); }
  }

  // Bind sidebar settings link
  var settingsLink = document.querySelector('.settings-link');
  if (settingsLink) {
    settingsLink.addEventListener('click', function (e) {
      e.preventDefault();
      dcOpenWizard();
    });
  }
});

/* ---------- Personalization Banners ---------- */
function showPersonalizationBanner() {
  if (document.querySelector('.personalization-banner')) return;
  var main = document.querySelector('.main-content');
  if (!main) return;
  var banner = document.createElement('div');
  banner.className = 'personalization-banner';
  banner.innerHTML =
    '<div class="banner-content">' +
      '<p class="banner-icon">💡</p>' +
      '<div class="banner-text">' +
        '<strong>Get Personalised Instructions</strong>' +
        '<p>Tell us your devices to see step-by-step guidance just for you.</p>' +
      '</div>' +
      '<div class="banner-actions">' +
        '<button onclick="dcOpenWizard();this.closest('.personalization-banner').remove();" class="btn-personalize">Set My Devices</button>' +
        '<button onclick="this.closest('.personalization-banner').remove()" class="btn-dismiss">Maybe Later</button>' +
      '</div>' +
    '</div>';
  var h1 = main.querySelector('h1');
  if (h1 && h1.nextSibling) { main.insertBefore(banner, h1.nextSibling); }
  else { main.insertBefore(banner, main.firstElementChild); }
}

function showFilteredBanner(profile) {
  if (document.querySelector('.filtered-banner')) return;
  var main = document.querySelector('.main-content');
  if (!main) return;
  var labels = { iphone: 'iPhone', 'android-phone': 'Android Phone', ipad: 'iPad', 'android-tablet': 'Android Tablet', windows: 'Windows PC', mac: 'Mac', chromebook: 'Chromebook' };
  var devices = [].concat(profile.phone||[], profile.tablet||[], profile.computer||[]).filter(function(v){return v&&v!=='none';}).map(function(v){return labels[v]||v;});
  if (!devices.length) return;
  var banner = document.createElement('div');
  banner.className = 'filtered-banner';
  banner.innerHTML =
    '<div class="banner-content">' +
      '<p style="margin:0">📱 Showing content for: <strong>' + devices.join(', ') + '</strong></p>' +
      '<div class="banner-actions">' +
        '<button onclick="dcOpenWizard()" class="btn-edit">Edit</button>' +
      '</div>' +
    '</div>';
  var h1 = main.querySelector('h1');
  if (h1 && h1.nextSibling) { main.insertBefore(banner, h1.nextSibling); }
  else { main.insertBefore(banner, main.firstElementChild); }
}

function personalizeStories() {
  var profile = null;
  try { profile = JSON.parse(localStorage.getItem('dc-device-profile') || 'null'); } catch(e) {}
  var deviceName = 'device';
  if (profile) {
    if (profile.phone && profile.phone.length && profile.phone[0] !== 'none') deviceName = profile.phone[0] === 'iphone' ? 'iPhone' : 'Android phone';
    else if (profile.tablet && profile.tablet.length && profile.tablet[0] !== 'none') deviceName = profile.tablet[0] === 'ipad' ? 'iPad' : 'Android tablet';
    else if (profile.computer && profile.computer.length && profile.computer[0] !== 'none') deviceName = profile.computer[0];
  }
  document.querySelectorAll('.story-block, .story-box').forEach(function(el) {
    el.innerHTML = el.innerHTML.replace(/{{DEVICE}}/g, deviceName);
  });
}
