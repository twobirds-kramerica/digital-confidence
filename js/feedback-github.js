/* ============================================================
   Digital Confidence Centre — Feedback Form
   Submissions go to Formspree (CORS-safe, no backend needed).

   SETUP: Replace YOUR_FORMSPREE_ENDPOINT below with your
   Formspree form URL. Steps:
     1. Go to https://formspree.io and create a free account
     2. Create a new form → copy the endpoint URL
     3. Replace the placeholder string below with your URL
        e.g. 'https://formspree.io/f/xpwzgkbn'
   ============================================================ */

var DC_FORMSPREE_ENDPOINT = 'https://formspree.io/f/xeerqryj';

/* ---- Feedback types ---- */
var DC_FEEDBACK_TYPES = [
  { value: 'Bug Report / Issue',     icon: '🐛', help: 'Something isn\'t working right'  },
  { value: 'Suggestion',             icon: '💡', help: 'An idea to make this better'     },
  { value: 'Something confusing',    icon: '❓', help: 'I don\'t understand this part'   },
  { value: 'Something good',         icon: '⭐', help: 'I like this!'                     },
  { value: 'Other',                  icon: '💬', help: 'Something else'                   }
];

/* ---- Module options (derived from actual page <title> tags) ---- */
var DC_MODULES = [
  'Home Page',
  'Module 1: Mastering the Escape Hatch',
  'Module 2: The Security Shield',
  'Module 3: Passwords & Biometrics',
  'Module 4: App Store Safety',
  'Module 5: Email & Messages',
  'Module 6: Banking & Transactions',
  'Module 7: Photos & Memories',
  'Module 8: Stay Connected',
  'Module 9: Understanding AI',
  'Module 10: Grocery & Food Delivery',
  'Module 11: Ride-Sharing Apps',
  'Resources Page',
  'General / Other'
];

/* ---- Page-to-module auto-select map ---- */
var DC_PAGE_MODULE = {
  'index.html':     'Home Page',
  'module-1.html':  'Module 1: Mastering the Escape Hatch',
  'module-2.html':  'Module 2: The Security Shield',
  'module-3.html':  'Module 3: Passwords & Biometrics',
  'module-4.html':  'Module 4: App Store Safety',
  'module-5.html':  'Module 5: Email & Messages',
  'module-6.html':  'Module 6: Banking & Transactions',
  'module-7.html':  'Module 7: Photos & Memories',
  'module-8.html':  'Module 8: Stay Connected',
  'module-9.html':  'Module 9: Understanding AI',
  'module-10.html': 'Module 10: Grocery & Food Delivery',
  'module-11.html': 'Module 11: Ride-Sharing Apps',
  'resources.html': 'Resources Page'
};

/* ================================================================
   INJECT FEEDBACK UI INTO EVERY PAGE
   ================================================================ */
document.addEventListener('DOMContentLoaded', function () {
  injectFeedbackStyles();
  injectUnifiedFeedbackBtn();
  injectFeedbackModal();
});

/* ---- Inject CSS overrides for this component ---- */
function injectFeedbackStyles() {
  var style = document.createElement('style');
  style.textContent = [
    /* Override the red circle close button with a clean text button */
    '.dc-modal-close{',
    '  position:sticky;top:0;float:right;',
    '  background:none;border:1px solid #CFD8DC;border-radius:6px;',
    '  color:#546E7A;font-size:14px;font-weight:600;cursor:pointer;',
    '  padding:6px 12px;margin-bottom:10px;z-index:10;flex-shrink:0;',
    '  transition:background 0.15s,color 0.15s,border-color 0.15s;',
    '  width:auto;height:auto;',
    '}',
    '.dc-modal-close:hover{background:#F5F7FA;color:#1A237E;border-color:#B0BEC5;}',
    /* Button row */
    '.dc-feedback-actions{margin-top:20px;}',
    '.dc-feedback-actions .dc-btn-submit{width:100%;}'
  ].join('\n');
  document.head.appendChild(style);
}

/* ---- "Ideas & Feedback" FAB button (bottom-right) ---- */
function injectUnifiedFeedbackBtn() {
  var btn = document.createElement('button');
  btn.id        = 'dc-unified-feedback-btn';
  btn.className = 'dc-unified-feedback-btn';
  btn.setAttribute('aria-label', 'Share ideas or feedback');
  btn.title     = 'Share your ideas and feedback';
  btn.innerHTML = '<span class="dc-fab-icon">💬</span><span class="dc-fab-label">Ideas &amp; Feedback</span>';
  btn.addEventListener('click', function () { openFeedbackModal(); });
  document.body.appendChild(btn);
}

/* ---- Full feedback modal ---- */
function injectFeedbackModal() {
  var typeOptions = DC_FEEDBACK_TYPES.map(function (t) {
    return [
      '<label class="dc-type-option">',
        '<input type="radio" name="dc-feedback-type" value="' + t.value + '">',
        '<span class="dc-type-label">',
          '<span class="dc-type-icon">' + t.icon + '</span>',
          '<span class="dc-type-text">' + t.value + '</span>',
          '<span class="dc-type-help">' + t.help + '</span>',
        '</span>',
      '</label>'
    ].join('');
  }).join('');

  var moduleOptions = DC_MODULES.map(function (m) {
    return '<option value="' + m + '">' + m + '</option>';
  }).join('');

  var html = [
    '<div id="dc-feedback-modal" class="dc-feedback-modal" role="dialog" aria-modal="true" aria-label="Feedback" style="display:none;">',
      '<div class="dc-modal-backdrop" id="dc-modal-backdrop"></div>',
      '<div class="dc-modal-content" role="document">',

        /* Clean text close button (not red circle) */
        '<button class="dc-modal-close" id="dc-modal-close" aria-label="Close feedback">\u00d7 Close</button>',

        '<div id="dc-modal-form-area">',
        '<h2 class="dc-modal-title" id="dc-modal-title">Ideas &amp; Feedback 💬</h2>',

        /* FIELD 1: Module dropdown (auto-detected, user-editable) */
        '<div class="dc-feedback-field">',
          '<label class="dc-feedback-label" for="dc-feedback-module">Which part of the site is this about?</label>',
          '<select id="dc-feedback-module" class="dc-feedback-select">',
            moduleOptions,
          '</select>',
        '</div>',

        /* FIELD 2: Feedback type */
        '<div class="dc-feedback-field">',
          '<p class="dc-feedback-label">Type of feedback:</p>',
          '<div class="dc-feedback-types" id="dc-feedback-types">' + typeOptions + '</div>',
        '</div>',

        /* FIELD 3: Feedback textarea */
        '<div class="dc-feedback-field">',
          '<label class="dc-feedback-label" for="dc-feedback-text">Your feedback:</label>',
          '<textarea id="dc-feedback-text" class="dc-feedback-textarea" rows="5"',
            ' placeholder="Tell us what you noticed\u2026" required></textarea>',
        '</div>',

        /* FIELD 4: Submit button (immediately below textarea) */
        '<div class="dc-feedback-actions">',
          '<button id="dc-submit-btn" class="dc-btn-submit">Send Feedback</button>',
        '</div>',

        /* FIELD 5: Your Name (Optional) — below submit */
        '<div class="dc-feedback-field" style="margin-top:16px;">',
          '<label class="dc-feedback-label" for="dc-feedback-name">',
            'Your Name <span class="dc-optional">(Optional)</span>',
          '</label>',
          '<input type="text" id="dc-feedback-name" class="dc-feedback-input"',
            ' placeholder="Type here\u2026" autocomplete="off">',
        '</div>',

        '</div>',

        /* Success state */
        '<div id="dc-feedback-success" class="dc-feedback-success" style="display:none;">',
          '<div class="dc-success-icon">✅</div>',
          '<h3>Thank You!</h3>',
          '<p>Your feedback has been received.</p>',
          '<p class="dc-reference-num" id="dc-reference-num"></p>',
          '<button onclick="closeFeedbackModal()" class="dc-btn-submit">Close</button>',
        '</div>',

        /* Error state */
        '<div id="dc-feedback-error" class="dc-feedback-error" style="display:none;">',
          '<div class="dc-error-icon">⚠️</div>',
          '<h3>We saved your feedback!</h3>',
          '<p>There was a connection issue, but your feedback was saved on your device. We\'ll collect it next time.</p>',
          '<button onclick="closeFeedbackModal()" class="dc-btn-submit">Close</button>',
        '</div>',

      '</div>',
    '</div>'
  ].join('');

  document.body.insertAdjacentHTML('beforeend', html);

  /* Wire up events */
  document.getElementById('dc-modal-close').addEventListener('click', closeFeedbackModal);
  document.getElementById('dc-modal-backdrop').addEventListener('click', closeFeedbackModal);
  document.getElementById('dc-submit-btn').addEventListener('click', handleFeedbackSubmit);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var modal = document.getElementById('dc-feedback-modal');
      if (modal && modal.style.display !== 'none') closeFeedbackModal();
    }
  });
}

/* ---- Open modal ---- */
function openFeedbackModal() {
  var modal    = document.getElementById('dc-feedback-modal');
  var formArea = document.getElementById('dc-modal-form-area');
  var success  = document.getElementById('dc-feedback-success');
  var error    = document.getElementById('dc-feedback-error');
  var moduleEl = document.getElementById('dc-feedback-module');

  /* Reset state */
  formArea.style.display = 'block';
  success.style.display  = 'none';
  error.style.display    = 'none';
  document.querySelectorAll('input[name="dc-feedback-type"]').forEach(function (r) { r.checked = false; });
  var ta = document.getElementById('dc-feedback-text');
  if (ta) ta.value = '';
  var nameEl = document.getElementById('dc-feedback-name');
  if (nameEl) nameEl.value = '';

  /* Auto-select module based on current page (user can still change it) */
  if (moduleEl) {
    var page       = window.location.pathname.split('/').pop() || 'index.html';
    var autoModule = DC_PAGE_MODULE[page];
    moduleEl.value = autoModule || 'General / Other';
  }

  modal.style.display          = 'flex';
  document.body.style.overflow = 'hidden';

  /* Focus the module dropdown first */
  setTimeout(function () {
    if (moduleEl) moduleEl.focus();
  }, 100);
}

function closeFeedbackModal() {
  var modal = document.getElementById('dc-feedback-modal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

/* ---- Submit handler ---- */
function handleFeedbackSubmit() {
  var nameEl   = document.getElementById('dc-feedback-name');
  var textEl   = document.getElementById('dc-feedback-text');
  var typeEl   = document.querySelector('input[name="dc-feedback-type"]:checked');
  var moduleEl = document.getElementById('dc-feedback-module');

  var name     = (nameEl && nameEl.value.trim()) ? nameEl.value.trim() : 'Anonymous';
  var text     = textEl ? textEl.value.trim() : '';
  var type     = typeEl ? typeEl.value : 'Not specified';
  var module   = (moduleEl && moduleEl.value) ? moduleEl.value : 'General / Other';
  var lang     = navigator.language || 'unknown';

  if (!text) {
    alert('Please share your feedback before submitting.');
    if (textEl) textEl.focus();
    return;
  }

  var submitBtn = document.getElementById('dc-submit-btn');
  if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending\u2026'; }

  submitToFormspree(name, type, text, module, lang);
}

/* ================================================================
   FORMSPREE SUBMISSION
   CORS-safe, works on static GitHub Pages sites.
   No backend or server required.
   ================================================================ */
function submitToFormspree(userName, feedbackType, feedbackText, module, lang) {
  console.log('═══ FEEDBACK SUBMISSION ═══');
  console.log('Endpoint configured:', DC_FORMSPREE_ENDPOINT !== 'YOUR_FORMSPREE_ENDPOINT');
  console.log('Module:', module);
  console.log('Type:', feedbackType);

  /* Guard: warn clearly if endpoint has not been configured */
  if (DC_FORMSPREE_ENDPOINT === 'YOUR_FORMSPREE_ENDPOINT') {
    console.warn('Formspree endpoint not configured — saving to localStorage only.');
    console.warn('Go to https://formspree.io, create a form, and update DC_FORMSPREE_ENDPOINT.');
    saveFeedbackBackup({ name: userName, type: feedbackType, text: feedbackText, module: module });
    showFeedbackError();
    return;
  }

  var payload = {
    name:          userName,
    feedback_type: feedbackType,
    module:        module,
    page_url:      window.location.href,
    message:       feedbackText,
    language:      lang,
    timestamp:     new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' }),
    device:        window.innerWidth + 'x' + window.innerHeight
  };

  fetch(DC_FORMSPREE_ENDPOINT, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body:    JSON.stringify(payload)
  })
  .then(function (res) {
    console.log('Response status:', res.status);
    return res.json().then(function (d) { return { ok: res.ok, data: d }; });
  })
  .then(function (result) {
    if (result.ok) {
      console.log('SUCCESS — feedback submitted via Formspree');
      console.log('═══ END ═══');
      saveFeedbackBackup(Object.assign({ submitted: true }, payload));
      showFeedbackSuccess();
    } else {
      console.error('Formspree error:', result.data);
      throw new Error(result.data.error || 'Submission failed');
    }
  })
  .catch(function (err) {
    console.error('Feedback submission error:', err.message || err);
    saveFeedbackBackup({ name: userName, type: feedbackType, text: feedbackText, module: module });
    showFeedbackError();
  });
}

function saveFeedbackBackup(entry) {
  try {
    var all = JSON.parse(localStorage.getItem('dc-feedback-backup') || '[]');
    all.push(Object.assign({ timestamp: new Date().toISOString() }, entry));
    localStorage.setItem('dc-feedback-backup', JSON.stringify(all));
  } catch (e) { /* storage full or unavailable */ }
}

function showFeedbackSuccess() {
  var formArea = document.getElementById('dc-modal-form-area');
  var success  = document.getElementById('dc-feedback-success');
  if (formArea) formArea.style.display = 'none';
  if (success)  success.style.display  = 'block';
  setTimeout(function () { closeFeedbackModal(); }, 5000);
}

function showFeedbackError() {
  var formArea  = document.getElementById('dc-modal-form-area');
  var error     = document.getElementById('dc-feedback-error');
  var submitBtn = document.getElementById('dc-submit-btn');
  if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send Feedback'; }
  if (formArea) formArea.style.display = 'none';
  if (error)    error.style.display    = 'block';
}
