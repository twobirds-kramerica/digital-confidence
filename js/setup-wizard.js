/* ============================================
   Digital Confidence Centre
   Setup Wizard & Device Content Filtering
   Sprint 7: Privacy consent modal + email capture
   ============================================ */

/* ---------- Wizard State ---------- */
var wizardStep = 0;
var wizardSelections = {
  city: '',
  phone: [],
  tablet: [],
  computer: [],
  reading: ''  /* 'standard' or 'dyslexic' */
};

var WIZARD_STEPS = [
  { id: 'city',    title: 'Where do you live?',         type: 'city'    },
  { id: 'privacy', title: 'A Quick Note About Your Privacy', type: 'privacy' },
  { id: 'phone',   title: 'What phone do you use?',     type: 'device'  },
  { id: 'tablet',  title: 'What tablet do you use?',    type: 'device'  },
  { id: 'computer','title': 'What computer do you use?', type: 'device'  },
  { id: 'reading', title: 'How would you like text to look?', type: 'reading' },
  { id: 'email',   title: 'Stay Connected (Optional)',  type: 'email'   }
];

var DEVICE_OPTIONS = {
  phone: [
    { value: 'iphone',       label: 'iPhone',           icon: '' },
    { value: 'android-phone',label: 'Android Phone',    icon: '' },
    { value: 'none',         label: "I don't have one", icon: '' }
  ],
  tablet: [
    { value: 'ipad',          label: 'iPad',             icon: '' },
    { value: 'android-tablet',label: 'Android Tablet',   icon: '' },
    { value: 'none',          label: "I don't have one", icon: '' }
  ],
  computer: [
    { value: 'windows',   label: 'Windows',    icon: '' },
    { value: 'mac',       label: 'Mac',        icon: '' },
    { value: 'chromebook',label: 'Chromebook', icon: '' },
    { value: 'none',      label: "I don't have one", icon: '' }
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

  /* Current settings banner */
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

  /* Progress dots — skip privacy and email steps in dot count */
  var visibleSteps = WIZARD_STEPS.filter(function (s) {
    return s.type !== 'privacy' && s.type !== 'email';
  });
  var dots = document.createElement('div');
  dots.className = 'wizard-progress';
  dots.setAttribute('aria-label', 'Wizard progress');
  for (var i = 0; i < visibleSteps.length; i++) {
    var dot = document.createElement('div');
    dot.className = 'wizard-dot';
    dot.setAttribute('aria-hidden', 'true');
    dots.appendChild(dot);
  }
  wizard.appendChild(dots);

  /* Step container */
  var stepContainer = document.createElement('div');
  stepContainer.id = 'wizard-step-container';
  wizard.appendChild(stepContainer);

  /* Navigation */
  var nav = document.createElement('div');
  nav.className = 'wizard-nav';
  nav.id = 'wizard-nav';
  nav.innerHTML =
    '<button class="btn btn-secondary wizard-back" aria-label="Go back">Back</button>' +
    '<button class="btn btn-primary wizard-next" aria-label="Continue">Next</button>';
  wizard.appendChild(nav);

  overlay.appendChild(wizard);
  document.body.appendChild(overlay);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) dcCloseWizard();
  });

  overlay.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') dcCloseWizard();
    if (e.key === 'Tab') {
      var focusable = wizard.querySelectorAll('button, input, select, [tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  });

  wizard.querySelector('.wizard-back').addEventListener('click', function () {
    if (wizardStep > 0) { wizardStep--; renderWizard(); }
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
      wizardSelections.phone    = parsed.phone    || [];
      wizardSelections.tablet   = parsed.tablet   || [];
      wizardSelections.computer = parsed.computer || [];
    } catch (e) { /* ignore */ }
  }
  var savedDyslexic = localStorage.getItem('dc-dyslexic-font');
  wizardSelections.reading = savedDyslexic === 'true' ? 'dyslexic' : 'standard';
}

/* ---------- Render Current Step ---------- */
function renderWizard() {
  var container = document.getElementById('wizard-step-container');
  if (!container) return;
  var step = WIZARD_STEPS[wizardStep];

  /* Update progress dots (skip privacy/email steps from dot index) */
  var visibleSteps = WIZARD_STEPS.filter(function (s) {
    return s.type !== 'privacy' && s.type !== 'email';
  });
  var visibleIndex = visibleSteps.findIndex
    ? visibleSteps.findIndex(function (s) { return s.id === step.id; })
    : -1;
  /* Fallback for IE */
  if (visibleIndex === -1) {
    for (var di = 0; di < visibleSteps.length; di++) {
      if (visibleSteps[di].id === step.id) { visibleIndex = di; break; }
    }
  }
  var dots = document.querySelectorAll('.wizard-dot');
  dots.forEach(function (dot, i) {
    dot.className = 'wizard-dot';
    if (visibleIndex > i) dot.classList.add('completed');
    if (visibleIndex === i) dot.classList.add('active');
  });

  /* Update nav buttons */
  var backBtn = document.querySelector('.wizard-back');
  var nextBtn = document.querySelector('.wizard-next');
  var navEl   = document.getElementById('wizard-nav');

  if (backBtn) backBtn.style.visibility = wizardStep === 0 ? 'hidden' : 'visible';
  if (nextBtn) nextBtn.textContent = wizardStep === WIZARD_STEPS.length - 1 ? 'Finish' : 'Next';

  /* Hide default nav on privacy and email steps (they have their own buttons) */
  if (navEl) {
    navEl.style.display = (step.type === 'privacy' || step.type === 'email') ? 'none' : '';
  }

  var html = '';

  /* ── City step ── */
  if (step.type === 'city') {
    html += '<h2>Let Us Personalise Your Experience</h2>';
    html += '<p>We would like to show you local resources &#8212; such as libraries, senior centres, and Apple Stores &#8212; that are closest to you. Your choice is stored only on this device and is never sent anywhere.</p>';
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

  /* ── Privacy consent step ── */
  } else if (step.type === 'privacy') {
    var alreadyConsented = localStorage.getItem('privacyConsentGiven');
    if (alreadyConsented !== null) {
      /* Already answered — skip this step automatically */
      wizardStep++;
      renderWizard();
      return;
    }
    html += '<h2>A Quick Note About Your Privacy</h2>';
    html += '<p style="margin-bottom:16px;">We want to be completely open with you about how this site works.</p>';
    html += '<div class="tip-box" style="margin-bottom:16px;text-align:left;">';
    html += '<strong>What we collect (with your permission):</strong><br>';
    html += '&#x2022; Your city &#8212; so we can show you local resources<br>';
    html += '&#x2022; Your device types &#8212; so we show you the right instructions<br>';
    html += '&#x2022; How you use the site &#8212; which lessons you visit and complete<br>';
    html += '&#x2022; Any feedback you choose to share with us</div>';
    html += '<div class="tip-box" style="margin-bottom:16px;text-align:left;">';
    html += '<strong>Why we collect it:</strong><br>';
    html += 'This helps us improve the programme for other seniors across Ontario. We may share anonymised, grouped insights (never your personal details) with organisations that support seniors &#8212; like libraries, community centres, and government programmes.</div>';
    html += '<div style="background:#FFF3E0;border-left:4px solid #FF9800;padding:12px 16px;border-radius:6px;margin-bottom:20px;font-size:0.95rem;">';
    html += '<strong>What we never do:</strong><br>';
    html += '&#x2022; We never sell your personal information<br>';
    html += '&#x2022; We never share your name or contact details<br>';
    html += '&#x2022; You can reset everything at any time using the Settings button</div>';
    html += '<p><strong>Your choice:</strong></p>';
    html += '<div style="display:flex;flex-direction:column;gap:12px;margin-top:12px;">';
    html += '<button class="btn btn-primary" id="privacy-accept-btn">Yes, I\'m happy with this</button>';
    html += '<button class="btn btn-secondary" id="privacy-decline-btn">No thank you &#8212; continue without data collection</button>';
    html += '</div>';

  /* ── Email capture step ── */
  } else if (step.type === 'email') {
    var alreadyCaptured = localStorage.getItem('emailCaptureDate');
    if (alreadyCaptured) {
      /* Already answered — save and close */
      saveWizard();
      return;
    }
    html += '<h2>Stay Connected (Optional)</h2>';
    html += '<p>Would you like us to let you know when we add new lessons or safety tips? We send very occasional emails &#8212; never spam, never ads. You can unsubscribe any time.</p>';
    html += '<div style="margin:20px 0;">';
    html += '<label for="email-input" style="display:block;font-weight:600;margin-bottom:8px;">Email address:</label>';
    html += '<input type="email" id="email-input" placeholder="your@email.com" ';
    html += 'style="font-size:1.1rem;padding:10px 14px;border:2px solid #ddd;border-radius:8px;width:100%;box-sizing:border-box;">';
    html += '</div>';
    html += '<div style="display:flex;flex-direction:column;gap:12px;">';
    html += '<button class="btn btn-primary" id="email-signup-btn">Sign Me Up</button>';
    html += '<button class="btn btn-secondary" id="email-skip-btn">No Thanks, Continue</button>';
    html += '</div>';
    html += '<p style="font-size:0.85rem;color:#777;margin-top:12px;">Your email is used only for programme updates. We never share it.</p>';

  /* ── Reading preference step ── */
  } else if (step.type === 'reading') {
    var isDyslexic = wizardSelections.reading === 'dyslexic';
    html += '<h3>' + step.title + '</h3>';
    html += '<p class="step-explanation">Some people find a special font easier to read. Choose whichever feels more comfortable &#8212; you can change it at any time in the sidebar.</p>';
    html += '<div class="wizard-options reading-options" role="group" aria-label="Font style preference">';
    html += '<button class="wizard-option reading-option' + (!isDyslexic ? ' selected' : '') +
      '" data-reading="standard" type="button" aria-pressed="' + (!isDyslexic) + '">';
    html += '<div class="reading-sample">The quick brown fox<br>jumps over the lazy dog.</div>';
    html += '<strong>Standard Font</strong></button>';
    html += '<button class="wizard-option reading-option' + (isDyslexic ? ' selected' : '') +
      '" data-reading="dyslexic" type="button" aria-pressed="' + isDyslexic + '">';
    html += '<div class="reading-sample dyslexic-preview">The quick brown fox<br>jumps over the lazy dog.</div>';
    html += '<strong>Dyslexia-Friendly Font</strong>';
    html += '<small style="display:block;margin-top:4px;font-size:0.82rem;color:#555;">Easier for many people to read</small>';
    html += '</button></div>';

  /* ── Device steps ── */
  } else {
    var category = step.id;
    var options  = DEVICE_OPTIONS[category];
    var current  = wizardSelections[category];
    html += '<h3>' + step.title + '</h3>';
    html += '<p class="step-explanation">Pick all that apply. This helps us show you the right instructions.</p>';
    html += '<div class="wizard-options" role="group" aria-label="' + step.title + '">';
    options.forEach(function (opt) {
      var isSelected = current.indexOf(opt.value) !== -1;
      var isNone = opt.value === 'none';
      var cls = 'wizard-option';
      if (isSelected && isNone) cls += ' selected-none';
      else if (isSelected) cls += ' selected';
      html += '<button class="' + cls + '" data-value="' + opt.value +
        '" data-category="' + category + '" type="button" aria-pressed="' + isSelected + '">';
      html += opt.label + '</button>';
    });
    html += '</div>';
  }

  container.innerHTML = html;

  /* ── Bind: city select ── */
  var citySelect = document.getElementById('wizard-city');
  if (citySelect) {
    citySelect.addEventListener('change', function () {
      wizardSelections.city = citySelect.value;
    });
  }

  /* ── Bind: geo button ── */
  var geoBtn = document.getElementById('wizard-geo');
  if (geoBtn) {
    geoBtn.addEventListener('click', function () {
      geoBtn.textContent = 'Locating\u2026';
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

  /* ── Bind: privacy buttons ── */
  var acceptBtn = document.getElementById('privacy-accept-btn');
  if (acceptBtn) {
    acceptBtn.addEventListener('click', function () {
      acceptPrivacy();
    });
  }
  var declineBtn = document.getElementById('privacy-decline-btn');
  if (declineBtn) {
    declineBtn.addEventListener('click', function () {
      declinePrivacy();
    });
  }

  /* ── Bind: email buttons ── */
  var emailSignupBtn = document.getElementById('email-signup-btn');
  if (emailSignupBtn) {
    emailSignupBtn.addEventListener('click', function () {
      captureEmail();
    });
  }
  var emailSkipBtn = document.getElementById('email-skip-btn');
  if (emailSkipBtn) {
    emailSkipBtn.addEventListener('click', function () {
      localStorage.setItem('emailCaptureDate', new Date().toISOString());
      saveWizard();
    });
  }

  /* ── Bind: device option buttons ── */
  var optBtns = container.querySelectorAll('.wizard-option:not(.reading-option)');
  optBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      toggleDeviceOption(btn.getAttribute('data-category'), btn.getAttribute('data-value'));
      renderWizard();
    });
  });

  /* ── Bind: reading option buttons ── */
  var readingBtns = container.querySelectorAll('.reading-option');
  readingBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      wizardSelections.reading = btn.getAttribute('data-reading');
      document.body.classList.toggle('dyslexic-font', wizardSelections.reading === 'dyslexic');
      renderWizard();
    });
  });
}

/* ---------- Privacy Consent Handlers ---------- */
function acceptPrivacy() {
  localStorage.setItem('privacyConsentGiven', 'true');
  localStorage.setItem('privacyConsentDate', new Date().toISOString());
  wizardStep++;
  renderWizard();
}

function declinePrivacy() {
  localStorage.setItem('privacyConsentGiven', 'false');
  localStorage.setItem('privacyConsentDate', new Date().toISOString());
  wizardStep++;
  renderWizard();
}

/* ---------- Email Capture ---------- */
function captureEmail() {
  var emailInput = document.getElementById('email-input');
  var email = (emailInput ? emailInput.value : '').trim();
  if (!email || !email.includes('@')) {
    if (emailInput) {
      emailInput.style.borderColor = '#e53935';
      emailInput.focus();
    }
    return;
  }

  var city = localStorage.getItem('dc-city') || '';
  var today = new Date().toISOString().slice(0, 10);
  var payload = { email: email, source: 'onboarding', city: city, date: today };

  /* Save to localStorage immediately (works offline) */
  localStorage.setItem('userEmail', email);
  localStorage.setItem('emailCaptureDate', new Date().toISOString());

  /* Show thank-you in place of email step */
  var container = document.getElementById('wizard-step-container');
  if (container) {
    container.innerHTML =
      '<div style="text-align:center;padding:20px 0;">' +
        '<div style="font-size:48px;margin-bottom:16px;">&#127881;</div>' +
        '<h3>Wonderful! We\'ll be in touch.</h3>' +
        '<p>Now let\'s finish getting you set up.</p>' +
      '</div>';
  }

  /* Email saved to localStorage only — onboarding is a welcome flow,
     not a feedback capture. Feedback goes through the site-wide modal. */

  /* Continue to save after a brief moment */
  setTimeout(function () { saveWizard(); }, 1400);
}

/* ---------- Toggle Device Selection ---------- */
function toggleDeviceOption(category, value) {
  var arr = wizardSelections[category];
  if (value === 'none') {
    wizardSelections[category] = arr.indexOf('none') !== -1 ? [] : ['none'];
    return;
  }
  var noneIdx = arr.indexOf('none');
  if (noneIdx !== -1) arr.splice(noneIdx, 1);
  var idx = arr.indexOf(value);
  if (idx !== -1) { arr.splice(idx, 1); } else { arr.push(value); }
}

/* ---------- Suggest City from Coordinates ---------- */
function suggestCity(lat, lon) {
  var cities = {
    windsor:   { lat: 42.3149, lon: -83.0364 },
    london:    { lat: 42.9849, lon: -81.2453 },
    stthomas:  { lat: 42.7740, lon: -81.1834 },
    woodstock: { lat: 43.1306, lon: -80.7467 },
    kitchener: { lat: 43.4516, lon: -80.4925 }
  };
  var closest = null, closestDist = Infinity;
  var keys = Object.keys(cities);
  for (var i = 0; i < keys.length; i++) {
    var c = cities[keys[i]];
    var d = Math.sqrt(Math.pow(lat - c.lat, 2) + Math.pow(lon - c.lon, 2));
    if (d < closestDist) { closestDist = d; closest = keys[i]; }
  }
  return closestDist > 0.45 ? null : closest;
}

/* ---------- Save & Close ---------- */
function saveWizard() {
  localStorage.setItem('dc-city', wizardSelections.city);
  localStorage.setItem('dc-device-profile', JSON.stringify({
    phone:    wizardSelections.phone,
    tablet:   wizardSelections.tablet,
    computer: wizardSelections.computer
  }));
  if (wizardSelections.reading) {
    var dyslexicOn = wizardSelections.reading === 'dyslexic';
    localStorage.setItem('dc-dyslexic-font', dyslexicOn ? 'true' : 'false');
    document.body.classList.toggle('dyslexic-font', dyslexicOn);
    var toggle = document.getElementById('dyslexic-font-toggle');
    if (toggle) toggle.checked = dyslexicOn;
  }
  localStorage.setItem('dc-setup-complete', 'true');
  dcCloseWizard();
  applyDeviceFiltering();
  personalizeStories();
  if (typeof dcRenderResourcesPage === 'function') dcRenderResourcesPage();
  if (typeof dcRenderModuleHelp    === 'function') dcRenderModuleHelp();
  if (typeof dcUpdateIndicators    === 'function') dcUpdateIndicators();
  if (typeof dcShowWelcomeBanner   === 'function') dcShowWelcomeBanner();
}

/* ---------- Device Content Filtering ---------- */
function applyDeviceFiltering() {
  var profile = localStorage.getItem('dc-device-profile');
  var deviceElements = document.querySelectorAll('.device-content');
  if (!deviceElements.length) return;

  var oldNotice = document.querySelector('.device-filter-notice');
  if (oldNotice) oldNotice.remove();

  if (!profile) {
    deviceElements.forEach(function (el) { el.classList.remove('hidden'); });
    return;
  }

  var parsed;
  try { parsed = JSON.parse(profile); } catch (e) { return; }

  var userDevices = [], deviceNames = [];

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
        if (d === 'windows') deviceNames.push('Windows Computer');
        if (d === 'mac') deviceNames.push('Apple Computer (Mac)');
        if (d === 'chromebook') deviceNames.push('Chromebook');
      }
    });
  }

  if (userDevices.length === 0) {
    deviceElements.forEach(function (el) { el.classList.remove('hidden'); });
    return;
  }

  var anyHidden = false;
  deviceElements.forEach(function (el) {
    var elDevices = (el.getAttribute('data-devices') || '').split(',').map(function (s) { return s.trim(); });
    var match = elDevices.some(function (d) { return userDevices.indexOf(d) !== -1; });
    if (match) { el.classList.remove('hidden'); }
    else { el.classList.add('hidden'); anyHidden = true; }
  });

  /* device-filter-notice removed — device-indicator banner handles this */
}

/* ---------- Focus Trap Helper ---------- */
function trapFocus(container) {
  var focusable = container.querySelectorAll('button, input, select, [tabindex]:not([tabindex="-1"])');
  if (focusable.length > 0) focusable[0].focus();
}

/* ---------- Device Tip Banner ---------- */
function showDevicePromptIfNeeded() {
  if (!localStorage.getItem('dc-device-prompt-pending')) return;
  if (!window.location.pathname.includes('module-') &&
      !window.location.href.includes('module-')) return;

  var main = document.querySelector('.main-content');
  if (!main) return;

  var banner = document.createElement('div');
  banner.className = 'device-prompt-banner';
  banner.innerHTML =
    '<span class="device-prompt-icon">&#128161;</span>' +
    '<span class="device-prompt-text">Tip: <a href="#" onclick="dcOpenWizard();return false;">Set your devices in Settings</a> to see personalised content for your phone, tablet, or computer.</span>' +
    '<button class="device-prompt-dismiss" aria-label="Dismiss tip" ' +
    'onclick="this.parentNode.remove();localStorage.removeItem(\'dc-device-prompt-pending\');">&#x2715;</button>';

  var firstChild = main.firstElementChild;
  if (firstChild) { main.insertBefore(banner, firstChild); }
  else { main.appendChild(banner); }
}

/* ---------- Init on Page Load ---------- */
document.addEventListener('DOMContentLoaded', function () {
  var setupStatus = localStorage.getItem('dc-setup-complete');
  var splashSeen  = localStorage.getItem('dc-splash-seen');
  if (!setupStatus && splashSeen) {
    dcOpenWizard();
  }
  applyDeviceFiltering();
  showDevicePromptIfNeeded();
  personalizeStories();
  if (window.location.pathname.indexOf('module-') !== -1 ||
      window.location.href.indexOf('module-') !== -1) {
    var _profile = null;
    try { _profile = JSON.parse(localStorage.getItem('dc-device-profile') || 'null'); } catch (e) {}
    var _hasDevices = _profile && [].concat(
      _profile.phone || [], _profile.tablet || [], _profile.computer || []
    ).some(function (v) { return v && v !== 'none'; });
    if (!_hasDevices) { showDeviceIndicatorEmpty(); }
    else { showFilteredBanner(_profile); }
  }

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
      '<p class="banner-icon">&#128161;</p>' +
      '<div class="banner-text">' +
        '<strong>Get Personalised Instructions</strong>' +
        '<p>Tell us your devices to see step-by-step guidance just for you.</p>' +
      '</div>' +
      '<div class="banner-actions">' +
        '<button onclick="dcOpenWizard();this.closest(\'.personalization-banner\').remove();" class="btn-personalize">Set My Devices</button>' +
        '<button onclick="this.closest(\'.personalization-banner\').remove()" class="btn-dismiss">Maybe Later</button>' +
      '</div>' +
    '</div>';
  var h1 = main.querySelector('h1');
  if (h1 && h1.nextSibling) { main.insertBefore(banner, h1.nextSibling); }
  else { main.insertBefore(banner, main.firstElementChild); }
}

function showFilteredBanner(profile) {
  if (document.querySelector('.device-indicator')) return;
  var main = document.querySelector('.main-content');
  if (!main) return;
  var labels = {
    iphone: 'iPhone', 'android-phone': 'Android Phone', ipad: 'iPad',
    'android-tablet': 'Android Tablet', windows: 'Windows Computer',
    mac: 'Apple Computer (Mac)', chromebook: 'Chromebook'
  };
  var devices = [].concat(profile.phone || [], profile.tablet || [], profile.computer || [])
    .filter(function (v) { return v && v !== 'none'; })
    .map(function (v) { return labels[v] || v; });
  if (!devices.length) {
    showDeviceIndicatorEmpty();
    return;
  }
  /* Build natural Oxford-style list: A, B, and C */
  var displayStr;
  if (devices.length === 1) {
    displayStr = devices[0];
  } else if (devices.length === 2) {
    displayStr = devices[0] + ' and ' + devices[1];
  } else {
    displayStr = devices.slice(0, -1).join(', ') + ', and ' + devices[devices.length - 1];
  }
  var banner = document.createElement('div');
  banner.className = 'device-indicator';
  banner.innerHTML =
    '<span>&#128241; Showing content for: <strong>' + displayStr + '</strong></span>' +
    '<button class="edit-btn" onclick="dcOpenWizard()">Change</button>';
  var h1 = main.querySelector('h1');
  if (h1 && h1.nextSibling) { main.insertBefore(banner, h1.nextSibling); }
  else { main.insertBefore(banner, main.firstElementChild); }
}

function showDeviceIndicatorEmpty() {
  if (document.querySelector('.device-indicator')) return;
  var main = document.querySelector('.main-content');
  if (!main) return;
  var banner = document.createElement('div');
  banner.className = 'device-indicator device-indicator-empty';
  banner.innerHTML =
    '<span>&#128241; <a href="#" onclick="dcOpenWizard();return false;">Set up your device profile in Settings</a> for personalised content</span>';
  var h1 = main.querySelector('h1');
  if (h1 && h1.nextSibling) { main.insertBefore(banner, h1.nextSibling); }
  else { main.insertBefore(banner, main.firstElementChild); }
}

function personalizeStories() {
  var profile = null;
  try { profile = JSON.parse(localStorage.getItem('dc-device-profile') || 'null'); } catch (e) {}
  var deviceName = 'device';
  if (profile) {
    if (profile.phone && profile.phone.length && profile.phone[0] !== 'none') {
      deviceName = profile.phone[0] === 'iphone' ? 'iPhone' : 'Android phone';
    } else if (profile.tablet && profile.tablet.length && profile.tablet[0] !== 'none') {
      deviceName = profile.tablet[0] === 'ipad' ? 'iPad' : 'Android tablet';
    } else if (profile.computer && profile.computer.length && profile.computer[0] !== 'none') {
      deviceName = profile.computer[0];
    }
  }
  document.querySelectorAll('.story-block, .story-box').forEach(function (el) {
    el.innerHTML = el.innerHTML.replace(/\{\{DEVICE\}\}/g, deviceName);
  });
}
