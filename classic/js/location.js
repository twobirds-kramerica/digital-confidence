/* ============================================
   Digital Confidence Centre — Location System
   Province detection, picker, and resource loading.
   No dependencies. L4-compatible.
   ============================================ */

var DCC_PROVINCES = [
  { code: 'ON', name: 'Ontario', name_fr: 'Ontario' },
  { code: 'QC', name: 'Quebec', name_fr: 'Québec' },
  { code: 'BC', name: 'British Columbia', name_fr: 'Colombie-Britannique' },
  { code: 'AB', name: 'Alberta', name_fr: 'Alberta' },
  { code: 'MB', name: 'Manitoba', name_fr: 'Manitoba' },
  { code: 'SK', name: 'Saskatchewan', name_fr: 'Saskatchewan' },
  { code: 'NS', name: 'Nova Scotia', name_fr: 'Nouvelle-Écosse' },
  { code: 'NB', name: 'New Brunswick', name_fr: 'Nouveau-Brunswick' },
  { code: 'NL', name: 'Newfoundland and Labrador', name_fr: 'Terre-Neuve-et-Labrador' },
  { code: 'PE', name: 'Prince Edward Island', name_fr: 'Île-du-Prince-Édouard' },
  { code: 'NT', name: 'Northwest Territories', name_fr: 'Territoires du Nord-Ouest' },
  { code: 'YT', name: 'Yukon', name_fr: 'Yukon' },
  { code: 'NU', name: 'Nunavut', name_fr: 'Nunavut' }
];

/* Map province names from geocoding to codes */
var PROVINCE_NAME_MAP = {
  'ontario': 'ON', 'quebec': 'QC', 'québec': 'QC',
  'british columbia': 'BC', 'alberta': 'AB', 'manitoba': 'MB',
  'saskatchewan': 'SK', 'nova scotia': 'NS', 'new brunswick': 'NB',
  'newfoundland and labrador': 'NL', 'newfoundland': 'NL',
  'prince edward island': 'PE', 'northwest territories': 'NT',
  'yukon': 'YT', 'nunavut': 'NU'
};

/* ---- Province Picker ---- */
function showProvincePicker() {
  if (document.getElementById('dcc-province-picker')) return;

  var isFr = (localStorage.getItem('dc-lang') || document.documentElement.getAttribute('data-lang') || 'en').startsWith('fr');

  var overlay = document.createElement('div');
  overlay.id = 'dcc-province-picker';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', isFr ? 'Choisissez votre province' : 'Choose your province');
  overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;';

  var panel = document.createElement('div');
  panel.style.cssText = 'background:#fff;border-radius:16px;padding:28px 20px;max-width:480px;width:100%;max-height:95vh;overflow-y:auto;';

  var title = document.createElement('h2');
  title.style.cssText = 'text-align:center;color:#1B3A4B;font-size:1.4rem;margin-bottom:4px;';
  title.textContent = isFr ? 'Où êtes-vous au Canada ?' : 'Where in Canada are you?';
  panel.appendChild(title);

  var sub = document.createElement('p');
  sub.style.cssText = 'text-align:center;color:#4A5568;font-size:0.95rem;margin-bottom:20px;';
  sub.textContent = isFr ? 'Nous vous montrerons des ressources locales.' : "We'll show you local resources and support.";
  panel.appendChild(sub);

  var grid = document.createElement('div');
  grid.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:8px;';

  DCC_PROVINCES.forEach(function(p) {
    var btn = document.createElement('button');
    btn.style.cssText = 'background:#F8F9FA;border:2px solid #E2E8F0;border-radius:10px;padding:12px 8px;min-height:64px;cursor:pointer;text-align:center;font-family:inherit;transition:border-color 0.2s,background 0.2s;';
    btn.setAttribute('aria-label', (isFr ? 'Sélectionner ' : 'Select ') + p.name);
    btn.innerHTML = '<div style="font-size:1.3rem;font-weight:700;color:#1B3A4B;">' + p.code + '</div><div style="font-size:0.78rem;color:#4A5568;">' + (isFr ? p.name_fr : p.name) + '</div>';

    btn.addEventListener('mouseenter', function() { btn.style.borderColor = '#2EC4B6'; btn.style.background = '#E6FAF8'; });
    btn.addEventListener('mouseleave', function() { btn.style.borderColor = '#E2E8F0'; btn.style.background = '#F8F9FA'; });
    btn.addEventListener('click', function() {
      selectProvince(p.code);
      dismissPicker();
    });
    grid.appendChild(btn);
  });

  panel.appendChild(grid);

  var skip = document.createElement('button');
  skip.style.cssText = 'display:block;margin:16px auto 0;background:none;border:none;color:#4A5568;font-size:0.88rem;cursor:pointer;padding:8px 16px;min-height:44px;text-decoration:underline;';
  skip.textContent = isFr ? 'Passer — afficher les ressources canadiennes générales' : 'Skip — show general Canadian resources';
  skip.addEventListener('click', function() {
    selectProvince('CA');
    dismissPicker();
  });
  panel.appendChild(skip);

  overlay.appendChild(panel);
  document.body.appendChild(overlay);

  /* Focus trap and ESC */
  var firstBtn = grid.querySelector('button');
  if (firstBtn) firstBtn.focus();

  overlay.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      selectProvince('CA');
      dismissPicker();
    }
  });

  /* Click backdrop to dismiss */
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      selectProvince('CA');
      dismissPicker();
    }
  });
}

function dismissPicker() {
  var picker = document.getElementById('dcc-province-picker');
  if (picker) picker.remove();
}

/* ---- Province Selection ---- */
function selectProvince(code) {
  localStorage.setItem('dcc_province', code);
  loadResources(code);
  updateLocationBar(code);

  /* Auto-switch to French for Quebec */
  if (code === 'QC' && typeof toggleLang === 'function') {
    var currentLang = localStorage.getItem('dc-lang') || 'en';
    if (currentLang !== 'fr') {
      toggleLang();
    }
  }
}

/* ---- Change Location ---- */
function changeLocation() {
  localStorage.removeItem('dcc_province');
  showProvincePicker();
}

/* ---- Load Resources ---- */
function loadResources(provinceCode) {
  var code = (provinceCode || 'federal').toLowerCase();
  var path = 'data/provinces/' + code + '.json';

  /* Try relative path from current page */
  var depth = (window.location.pathname.match(/\//g) || []).length - 1;
  var prefix = '';
  for (var i = 0; i < depth; i++) prefix += '../';
  /* If on GitHub Pages root, no prefix needed */
  if (window.location.pathname.indexOf('/digital-confidence/') !== -1) {
    var base = window.location.pathname.split('/digital-confidence/')[0] + '/digital-confidence/';
    path = base + 'data/provinces/' + code + '.json';
    prefix = ''; /* Use absolute path */
  }

  fetch(prefix + path)
    .then(function(res) {
      if (!res.ok) return fetch(prefix + 'data/provinces/federal.json').then(function(r) { return r.json(); });
      return res.json();
    })
    .then(function(data) {
      applyResources(data);
    })
    .catch(function() {
      /* Silent fail — keep whatever is on the page */
    });
}

function applyResources(data) {
  if (!data) return;

  var isFr = (localStorage.getItem('dc-lang') || 'en').startsWith('fr');

  /* Map resource keys to JSON paths */
  var mapping = {
    'telehealth_name': isFr && data.telehealth.name_fr ? data.telehealth.name_fr : data.telehealth.name,
    'telehealth_phone': data.telehealth.phone,
    'telehealth_url': data.telehealth.url,
    'consumer_protection_name': isFr && data.consumer_protection.name_fr ? data.consumer_protection.name_fr : data.consumer_protection.name,
    'consumer_protection_phone': data.consumer_protection.phone,
    'consumer_protection_url': data.consumer_protection.url,
    'anti_fraud_phone': data.anti_fraud.phone,
    'anti_fraud_url': data.anti_fraud.url,
    'scam_alerts_url': data.scam_alerts.url,
    'scam_alerts_name': isFr && data.scam_alerts.name_fr ? data.scam_alerts.name_fr : data.scam_alerts.name,
    '211_phone': data['211'].phone,
    '211_url': data['211'].url,
    '211_name': data['211'].name,
    'library_help_url': data.library_tech_help.url
  };

  /* Update all elements with data-resource attribute */
  Object.keys(mapping).forEach(function(key) {
    var els = document.querySelectorAll('[data-resource="' + key + '"]');
    els.forEach(function(el) {
      if (key.endsWith('_url') && el.tagName === 'A') {
        el.href = mapping[key];
      } else {
        el.textContent = mapping[key];
      }
    });
  });
}

/* ---- Location Bar ---- */
function updateLocationBar(code) {
  var bar = document.getElementById('dcc-location-bar');
  if (!bar) return;

  var isFr = (localStorage.getItem('dc-lang') || 'en').startsWith('fr');
  var prov = DCC_PROVINCES.find(function(p) { return p.code === code; });
  var name = code === 'CA' ? 'Canada' : (prov ? (isFr ? prov.name_fr : prov.name) : 'Canada');

  var label = bar.querySelector('.location-label');
  var link = bar.querySelector('.location-change');

  if (label) {
    label.textContent = (isFr ? 'Ressources pour : ' : 'Showing resources for: ') + name;
  }
  if (link) {
    link.textContent = isFr ? 'Modifier' : 'Change';
  }
}

/* ---- Init ---- */
function initLocation() {
  var saved = localStorage.getItem('dcc_province');
  if (saved) {
    loadResources(saved);
    updateLocationBar(saved);
  } else {
    /* First visit — default to Ontario silently; picker stays accessible via 'Set my location' */
    selectProvince('ON');
  }
}

document.addEventListener('DOMContentLoaded', initLocation);
