/* ============================================================
   Digital Confidence Centre — GitHub Issues Feedback System
   Beta feedback → GitHub Issues with email notifications.

   TOKEN SECURITY NOTE:
   Use a fine-grained Personal Access Token (PAT) with ONLY
   "Issues: write" permission on this specific repository.
   The token is visible in source code — this is acceptable
   for a public beta where the worst-case is spam issues.
   NEVER use a token with repo-wide write or delete access.
   ============================================================ */

var DC_GITHUB = {
  token: '',  /* <-- Paste your fine-grained PAT here after generating */
  owner: 'twobirds-kramerica',
  repo:  'digital-confidence'
};

/* ---- 100 common senior names (sorted) ---- */
var BETA_TESTER_NAMES = [
  'Agnes','Alexander','Alice','Amy','Andrew','Angela','Ann','Anna','Anthony',
  'Barbara','Benjamin','Betty','Brandon','Brenda','Brian','Carol','Catherine',
  'Charles','Cheryl','Christine','Cynthia','Daniel','David','Dennis','Diana',
  'Diane','Donald','Donna','Dorothy','Douglas','Edward','Elizabeth','Emily',
  'Eric','Evelyn','Frances','Frank','Gary','George','Gloria','Gregory','Helen',
  'Jack','Jacob','James','Janet','Jason','Jean','Jeffrey','Jennifer','Jerry',
  'Jessica','Jonathan','Joseph','Joshua','Joyce','Judith','Julie','Justin',
  'Karen','Kathleen','Kenneth','Kevin','Kimberly','Larry','Laura','Linda',
  'Lisa','Margaret','Maria','Mark','Mary','Matthew','Michael','Michelle',
  'Nancy','Nicholas','Patricia','Patrick','Paul','Raymond','Rebecca','Richard',
  'Robert','Ronald','Ruth','Ryan','Samuel','Sandra','Sarah','Scott','Sharon',
  'Shirley','Stephanie','Stephen','Steven','Susan','Teresa','Thomas','Timothy',
  'Tyler','Virginia','William'
];

/* ---- Feedback types (grandma-proof labels) ---- */
var DC_FEEDBACK_TYPES = [
  { value: 'Bug Report/Issue',              icon: '🐛', help: 'Something isn\'t working right'  },
  { value: 'Suggestion for this area',      icon: '💡', help: 'An idea to make this better'     },
  { value: 'Something confusing',           icon: '❓', help: 'I don\'t understand this part'   },
  { value: 'Something good',               icon: '⭐', help: 'I like this!'                     },
  { value: 'Other Feedback',               icon: '💬', help: 'Something else'                   }
];

/* ---- Category options for global idea FAB ---- */
var DC_IDEA_CATEGORIES = [
  'Passwords & Security','App Store & Downloads','Email',
  'Online Banking','Photos & Camera','Video Calls (FaceTime/Zoom)',
  'Website Navigation','New Section/Topic Request','Other'
];

/* ================================================================
   INJECT FEEDBACK UI INTO EVERY PAGE
   ================================================================ */
document.addEventListener('DOMContentLoaded', function () {
  injectFeedbackStyles();
  injectUnifiedFeedbackBtn();
  injectFeedbackModal();
  initFeedbackDatalist();
});

/* ---- Inject CSS (avoids needing main.css update for this system) ---- */
function injectFeedbackStyles() {
  /* Styles are added to main.css by the build — nothing needed here */
}

/* ---- Unified "Ideas and Feedback" button (bottom-right) ---- */
function injectUnifiedFeedbackBtn() {
  var btn = document.createElement('button');
  btn.id        = 'dc-unified-feedback-btn';
  btn.className = 'dc-unified-feedback-btn';
  btn.setAttribute('aria-label', 'Share ideas or feedback');
  btn.title     = 'Share your ideas and feedback';
  btn.innerHTML = '<span class="dc-fab-icon">💬</span><span class="dc-fab-label">Ideas &amp; Feedback</span>';
  btn.addEventListener('click', function () { openFeedbackModal('unified'); });
  document.body.appendChild(btn);
}

/* ---- Full feedback modal ---- */
function injectFeedbackModal() {
  var typeOptions = DC_FEEDBACK_TYPES.map(function (t, i) {
    return [
      '<label class="dc-type-option">',
        '<input type="radio" name="dc-feedback-type" value="' + t.value + '"' + (i === 0 ? ' required' : '') + '>',
        '<span class="dc-type-label">',
          '<span class="dc-type-icon">' + t.icon + '</span>',
          '<span class="dc-type-text">' + t.value + '</span>',
          '<span class="dc-type-help">' + t.help + '</span>',
        '</span>',
      '</label>'
    ].join('');
  }).join('');

  var catOptions = '<option value="">Select a category\u2026</option>' +
    DC_IDEA_CATEGORIES.map(function (c) {
      return '<option value="' + c + '">' + c + '</option>';
    }).join('');

  var html = [
    '<div id="dc-feedback-modal" class="dc-feedback-modal" role="dialog" aria-modal="true" aria-label="Feedback" style="display:none;">',
      '<div class="dc-modal-backdrop" id="dc-modal-backdrop"></div>',
      '<div class="dc-modal-content" role="document">',

        /* Close button — sticky so it's always visible */
        '<button class="dc-modal-close" id="dc-modal-close" aria-label="Close feedback">',
          '<span aria-hidden="true">&times;</span>',
        '</button>',

        /* Header */
        '<div id="dc-modal-form-area">',
        '<h2 class="dc-modal-title" id="dc-modal-title">Help Us Improve! 🚀</h2>',
        '<p class="dc-modal-subtitle" id="dc-modal-subtitle"></p>',

        /* Global idea category (hidden in page mode) */
        '<div class="dc-feedback-field" id="dc-category-field" style="display:none;">',
          '<label class="dc-feedback-label" for="dc-idea-category">What area is this idea about?</label>',
          '<select id="dc-idea-category" class="dc-feedback-select">' + catOptions + '</select>',
        '</div>',

        /* Name */
        '<div class="dc-feedback-field">',
          '<label class="dc-feedback-label" for="dc-feedback-name">',
            'Your Name <span class="dc-optional">(Optional — helps us follow up)</span>',
          '</label>',
          '<input type="text" id="dc-feedback-name" class="dc-feedback-input"',
            ' placeholder="Start typing your name\u2026" list="dc-beta-names" autocomplete="off">',
          '<datalist id="dc-beta-names"></datalist>',
          '<p class="dc-field-help">Can\'t find your name? Just type it in!</p>',
        '</div>',

        /* Feedback type */
        '<div class="dc-feedback-field">',
          '<p class="dc-feedback-label">Type of feedback:</p>',
          '<div class="dc-feedback-types" id="dc-feedback-types">' + typeOptions + '</div>',
        '</div>',

        /* Language */
        '<div class="dc-feedback-field">',
          '<label class="dc-feedback-label" for="dc-feedback-lang">Language of your feedback:</label>',
          '<select id="dc-feedback-lang" class="dc-feedback-select">',
            '<option value="English" selected>English</option>',
            '<option value="Fran\u00e7ais (French)">Fran\u00e7ais (French)</option>',
            '<option value="Other / Autre">Other / Autre</option>',
          '</select>',
        '</div>',

        /* Message */
        '<div class="dc-feedback-field">',
          '<label class="dc-feedback-label" for="dc-feedback-text">Your feedback:</label>',
          '<textarea id="dc-feedback-text" class="dc-feedback-textarea" rows="5"',
            ' placeholder="Tell us what you noticed\u2026" required></textarea>',
        '</div>',

        /* Actions */
        '<div class="dc-feedback-actions">',
          '<button id="dc-submit-btn" class="dc-btn-submit">Send Feedback</button>',
          '<button id="dc-cancel-btn" class="dc-btn-cancel">Cancel</button>',
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
  document.getElementById('dc-cancel-btn').addEventListener('click', closeFeedbackModal);
  document.getElementById('dc-submit-btn').addEventListener('click', handleFeedbackSubmit);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var modal = document.getElementById('dc-feedback-modal');
      if (modal && modal.style.display !== 'none') closeFeedbackModal();
    }
  });
}

/* ---- Populate datalist with sorted names ---- */
function initFeedbackDatalist() {
  var dl = document.getElementById('dc-beta-names');
  if (!dl) return;
  BETA_TESTER_NAMES.forEach(function (name) {
    var opt = document.createElement('option');
    opt.value = name;
    dl.appendChild(opt);
  });
}

/* ---- Open modal ---- */
function openFeedbackModal(mode) {
  var modal    = document.getElementById('dc-feedback-modal');
  var title    = document.getElementById('dc-modal-title');
  var subtitle = document.getElementById('dc-modal-subtitle');
  var catField = document.getElementById('dc-category-field');
  var formArea = document.getElementById('dc-modal-form-area');
  var success  = document.getElementById('dc-feedback-success');
  var error    = document.getElementById('dc-feedback-error');

  /* Reset state */
  formArea.style.display = 'block';
  success.style.display  = 'none';
  error.style.display    = 'none';
  document.querySelectorAll('input[name="dc-feedback-type"]').forEach(function (r) { r.checked = false; });
  var ta = document.getElementById('dc-feedback-text');
  if (ta) ta.value = '';

  modal.dataset.mode = mode || 'page';

  if (mode === 'unified' || mode === 'global') {
    title.textContent       = 'Ideas & Feedback 💬';
    subtitle.textContent    = 'Share an idea or tell us about this page: ' + (document.title || window.location.pathname.split('/').pop());
    catField.style.display  = 'block';
  } else {
    title.textContent       = 'Ideas & Feedback 💬';
    subtitle.textContent    = 'About this page: ' + (document.title || window.location.pathname.split('/').pop());
    catField.style.display  = 'none';
  }

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  setTimeout(function () {
    var nameInput = document.getElementById('dc-feedback-name');
    if (nameInput) nameInput.focus();
  }, 100);
}

function closeFeedbackModal() {
  var modal = document.getElementById('dc-feedback-modal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

/* ---- Submit handler ---- */
function handleFeedbackSubmit() {
  var nameEl    = document.getElementById('dc-feedback-name');
  var textEl    = document.getElementById('dc-feedback-text');
  var typeEl    = document.querySelector('input[name="dc-feedback-type"]:checked');
  var catEl     = document.getElementById('dc-idea-category');
  var langEl    = document.getElementById('dc-feedback-lang');
  var modal     = document.getElementById('dc-feedback-modal');
  var mode      = modal ? modal.dataset.mode : 'page';

  var name     = (nameEl && nameEl.value.trim()) ? nameEl.value.trim() : 'Anonymous';
  var text     = textEl ? textEl.value.trim() : '';
  var type     = typeEl ? typeEl.value : 'Other Feedback';
  var category = (mode === 'global' && catEl && catEl.value) ? catEl.value : '';
  var language = (langEl && langEl.value) ? langEl.value : 'English';

  if (!text) {
    alert('Please share your feedback before submitting.');
    textEl && textEl.focus();
    return;
  }

  var submitBtn = document.getElementById('dc-submit-btn');
  if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending\u2026'; }

  createGitHubIssue(name, type, text, category, mode, language);
}

/* ================================================================
   GITHUB ISSUES API
   ================================================================ */
function createGitHubIssue(userName, feedbackType, feedbackText, category, mode, language) {
  var lang     = language || 'English';
  var page     = window.location.pathname.split('/').pop() || 'index.html';
  var langTag  = lang !== 'English' ? ' | ' + lang : '';
  var titleStr = 'Feedback from ' + userName + ' | ' + feedbackType + (category ? ' | ' + category : '') + langTag;

  var bodyLines = [
    '**Submitted by:** ' + userName,
    '**Type:** ' + feedbackType,
    (category ? '**Category:** ' + category : ''),
    '**Language:** ' + lang,
    '**Page:** ' + page,
    '**Full URL:** ' + window.location.href,
    '**Timestamp:** ' + new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' }),
    '',
    '---',
    '',
    '**Feedback:**',
    '',
    feedbackText,
    '',
    '---',
    '',
    '_Device: ' + window.innerWidth + 'x' + window.innerHeight + ' · ' + navigator.userAgent.slice(0, 80) + '_'
  ].filter(function (l) { return l !== '' || true; }).join('\n');

  var slug = feedbackType.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  var labels = ['beta-feedback', slug];
  if (lang !== 'English') labels.push('lang-' + lang.split(' ')[0].toLowerCase());

  var backup = {
    name: userName, type: feedbackType, text: feedbackText,
    category: category, page: page, timestamp: new Date().toISOString(),
    issueNumber: 'PENDING'
  };

  if (!DC_GITHUB.token) {
    /* No token configured — save to localStorage only */
    backup.issueNumber = 'LOCAL';
    saveFeedbackBackup(backup);
    showFeedbackSuccess('LOCAL');
    return;
  }

  fetch('https://api.github.com/repos/' + DC_GITHUB.owner + '/' + DC_GITHUB.repo + '/issues', {
    method: 'POST',
    headers: {
      'Authorization': 'token ' + DC_GITHUB.token,
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.v3+json'
    },
    body: JSON.stringify({ title: titleStr, body: bodyLines, labels: labels })
  })
  .then(function (res) { return res.json().then(function (d) { return { ok: res.ok, data: d }; }); })
  .then(function (result) {
    if (result.ok) {
      backup.issueNumber = result.data.number;
      saveFeedbackBackup(backup);
      showFeedbackSuccess(result.data.number);
    } else {
      throw new Error(result.data.message || 'API error');
    }
  })
  .catch(function (err) {
    console.warn('Feedback GitHub error:', err);
    saveFeedbackBackup(backup);
    showFeedbackError();
  });
}

function saveFeedbackBackup(entry) {
  try {
    var all = JSON.parse(localStorage.getItem('dc-feedback-backup') || '[]');
    all.push(entry);
    localStorage.setItem('dc-feedback-backup', JSON.stringify(all));
  } catch (e) { /* storage full or unavailable */ }
}

function showFeedbackSuccess(issueNumber) {
  var formArea = document.getElementById('dc-modal-form-area');
  var success  = document.getElementById('dc-feedback-success');
  var refEl    = document.getElementById('dc-reference-num');
  if (formArea) formArea.style.display = 'none';
  if (refEl) refEl.textContent = issueNumber !== 'LOCAL' ? 'Reference #' + issueNumber : 'Saved locally';
  if (success) success.style.display = 'block';
  setTimeout(function () { closeFeedbackModal(); }, 5000);
}

function showFeedbackError() {
  var formArea = document.getElementById('dc-modal-form-area');
  var error    = document.getElementById('dc-feedback-error');
  var submitBtn = document.getElementById('dc-submit-btn');
  if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send Feedback'; }
  if (formArea) formArea.style.display = 'none';
  if (error) error.style.display = 'block';
}
