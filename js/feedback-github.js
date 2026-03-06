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
  token: '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',
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

/* ---- Category options ---- */
var DC_IDEA_CATEGORIES = [
  'Passwords & Security','App Store & Downloads','Email',
  'Online Banking','Photos & Camera','Video Calls (FaceTime/Zoom)',
  'Website Navigation','New Section/Topic Request','Other'
];

/* ---- Page-to-category auto-populate map ---- */
var DC_PAGE_CATEGORIES = {
  'module-1.html':  'Module 1: Getting Started',
  'module-2.html':  'Module 2: Escape Hatch',
  'module-3.html':  'Module 3: Passwords',
  'module-4.html':  'Module 4: App Store Safety',
  'module-5.html':  'Module 5: Email Basics',
  'module-6.html':  'Module 6: Online Banking',
  'module-7.html':  'Module 7: Photos & Memories',
  'module-8.html':  'Module 8: Stay Connected',
  'module-9.html':  'Module 9: Video Calls',
  'module-10.html': 'Module 10: Scam Simulator',
  'module-11.html': 'Module 11: Final Quiz',
  'resources.html': 'Resources Page',
  'index.html':     'Home Page'
};

/* ================================================================
   INJECT FEEDBACK UI INTO EVERY PAGE
   ================================================================ */
document.addEventListener('DOMContentLoaded', function () {
  injectFeedbackStyles();
  injectUnifiedFeedbackBtn();
  injectFeedbackModal();
  initFeedbackDatalist();
  initAutoAdvance();
});

/* ---- Inject CSS for new UX elements ---- */
function injectFeedbackStyles() {
  var style = document.createElement('style');
  style.textContent = [
    '.dc-attachment-field{margin-top:32px;padding-top:24px;border-top:1px solid #E1E8ED;opacity:0.7;}',
    '.dc-label-small{font-size:13px;color:#78909C;display:block;margin-bottom:4px;font-weight:600;}',
    '.dc-field-help-small{font-size:12px;color:#B0BEC5;margin:0 0 8px;}',
    '.dc-file-input{font-size:13px;padding:8px;border:1px dashed #CFD8DC;border-radius:6px;background:#F5F7FA;width:100%;box-sizing:border-box;}',
    '.dc-file-reqs{font-size:11px;color:#90A4AE;margin:4px 0 0;}',
    '.dc-feedback-actions{display:flex;justify-content:space-between;align-items:center;margin-top:32px;padding-top:24px;border-top:2px solid #E1E8ED;gap:12px;}'
  ].join('\n');
  document.head.appendChild(style);
}

/* ---- Unified "Ideas and Feedback" FAB button (bottom-right) ---- */
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

        '<button class="dc-modal-close" id="dc-modal-close" aria-label="Close feedback">',
          '<span aria-hidden="true">&times;</span>',
        '</button>',

        '<div id="dc-modal-form-area">',
        '<h2 class="dc-modal-title" id="dc-modal-title">Ideas &amp; Feedback 💬</h2>',
        '<p class="dc-modal-subtitle" id="dc-modal-subtitle"></p>',

        /* 1. Feedback type */
        '<div class="dc-feedback-field">',
          '<p class="dc-feedback-label">Type of feedback:</p>',
          '<div class="dc-feedback-types" id="dc-feedback-types">' + typeOptions + '</div>',
        '</div>',

        /* 2. Category (always visible, auto-populated from page) */
        '<div class="dc-feedback-field" id="dc-category-field">',
          '<label class="dc-feedback-label" for="dc-idea-category">What is this idea/feedback about?</label>',
          '<select id="dc-idea-category" class="dc-feedback-select">' + catOptions + '</select>',
        '</div>',

        /* 3. Feedback text */
        '<div class="dc-feedback-field">',
          '<label class="dc-feedback-label" for="dc-feedback-text">Your feedback:</label>',
          '<textarea id="dc-feedback-text" class="dc-feedback-textarea" rows="5"',
            ' placeholder="Tell us what you noticed\u2026" required></textarea>',
        '</div>',

        /* 4. Name (optional, moved to bottom) */
        '<div class="dc-feedback-field">',
          '<label class="dc-feedback-label" for="dc-feedback-name">',
            'Your Name <span class="dc-optional">(Optional \u2014 helps us follow up)</span>',
          '</label>',
          '<input type="text" id="dc-feedback-name" class="dc-feedback-input"',
            ' placeholder="Start typing your name\u2026" list="dc-beta-names" autocomplete="off">',
          '<datalist id="dc-beta-names"></datalist>',
          '<p class="dc-field-help">Can\'t find your name? Just type it in!</p>',
        '</div>',

        /* 5. Language */
        '<div class="dc-feedback-field">',
          '<label class="dc-feedback-label" for="dc-feedback-lang">Language of your feedback:</label>',
          '<select id="dc-feedback-lang" class="dc-feedback-select">',
            '<option value="English" selected>English</option>',
            '<option value="Fran\u00e7ais (French)">Fran\u00e7ais (French)</option>',
            '<option value="Other / Autre">Other / Autre</option>',
          '</select>',
        '</div>',

        /* 6. Screenshot (optional, visually de-emphasized) */
        '<div class="dc-feedback-field dc-attachment-field">',
          '<label for="dc-feedback-screenshot" class="dc-label-small">Screenshot (optional)</label>',
          '<p class="dc-field-help-small">Only if it helps explain your feedback</p>',
          '<input type="file" id="dc-feedback-screenshot" class="dc-file-input"',
            ' accept="image/png,image/jpeg,image/webp">',
          '<p class="dc-file-reqs">PNG, JPG, or WebP only &bull; Max 2MB</p>',
        '</div>',

        /* 7. Buttons: Cancel left, Send right */
        '<div class="dc-feedback-actions">',
          '<button id="dc-cancel-btn" class="dc-btn-cancel">Cancel</button>',
          '<button id="dc-submit-btn" class="dc-btn-submit">Send Feedback</button>',
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

  /* Screenshot file validation */
  document.getElementById('dc-feedback-screenshot').addEventListener('change', function (e) {
    var file = e.target.files[0];
    if (!file) return;
    if (file.size > 2097152) {
      alert('Screenshot must be under 2MB. Please resize and try again.');
      e.target.value = '';
      return;
    }
    var allowed = ['image/png', 'image/jpeg', 'image/webp'];
    if (allowed.indexOf(file.type) === -1) {
      alert('Only PNG, JPG, or WebP images allowed.');
      e.target.value = '';
    }
  });

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

/* ---- Auto-advance: scroll to next field when current field is filled ---- */
function initAutoAdvance() {
  /* Type radio → scroll category into view and focus it */
  document.querySelectorAll('input[name="dc-feedback-type"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      var next = document.getElementById('dc-idea-category');
      if (next) {
        next.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(function () { next.focus(); }, 300);
      }
    });
  });

  /* Category select → scroll textarea into view and focus it */
  var catSel = document.getElementById('dc-idea-category');
  if (catSel) {
    catSel.addEventListener('change', function () {
      if (this.value) {
        var next = document.getElementById('dc-feedback-text');
        if (next) {
          next.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(function () { next.focus(); }, 300);
        }
      }
    });
  }

  /* Textarea blur → scroll name field into view (no focus steal) */
  var ta = document.getElementById('dc-feedback-text');
  if (ta) {
    ta.addEventListener('blur', function () {
      if (this.value.trim()) {
        var next = document.getElementById('dc-feedback-name');
        if (next) next.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }
}

/* ---- Open modal ---- */
function openFeedbackModal(mode) {
  var modal      = document.getElementById('dc-feedback-modal');
  var title      = document.getElementById('dc-modal-title');
  var subtitle   = document.getElementById('dc-modal-subtitle');
  var formArea   = document.getElementById('dc-modal-form-area');
  var success    = document.getElementById('dc-feedback-success');
  var error      = document.getElementById('dc-feedback-error');
  var catEl      = document.getElementById('dc-idea-category');
  var screenshot = document.getElementById('dc-feedback-screenshot');

  /* Reset state */
  formArea.style.display = 'block';
  success.style.display  = 'none';
  error.style.display    = 'none';
  document.querySelectorAll('input[name="dc-feedback-type"]').forEach(function (r) { r.checked = false; });
  var ta = document.getElementById('dc-feedback-text');
  if (ta) ta.value = '';
  if (screenshot) screenshot.value = '';

  modal.dataset.mode = mode || 'page';

  title.textContent    = 'Ideas & Feedback 💬';
  subtitle.textContent = 'About this page: ' + (document.title || window.location.pathname.split('/').pop());

  /* Auto-populate category from current page */
  if (catEl) {
    var page         = window.location.pathname.split('/').pop() || 'index.html';
    var autoCategory = DC_PAGE_CATEGORIES[page];
    if (autoCategory) {
      /* Add option dynamically if not already in the list */
      if (!catEl.querySelector('option[value="' + autoCategory + '"]')) {
        var opt         = document.createElement('option');
        opt.value       = autoCategory;
        opt.textContent = autoCategory;
        catEl.insertBefore(opt, catEl.options[1] || null);
      }
      catEl.value = autoCategory;
    } else {
      catEl.value = '';
    }
  }

  modal.style.display          = 'flex';
  document.body.style.overflow = 'hidden';

  /* Focus first radio button (feedback type is now first field) */
  setTimeout(function () {
    var firstRadio = document.querySelector('input[name="dc-feedback-type"]');
    if (firstRadio) firstRadio.focus();
  }, 100);
}

function closeFeedbackModal() {
  var modal = document.getElementById('dc-feedback-modal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

/* ---- Submit handler ---- */
function handleFeedbackSubmit() {
  var nameEl       = document.getElementById('dc-feedback-name');
  var textEl       = document.getElementById('dc-feedback-text');
  var typeEl       = document.querySelector('input[name="dc-feedback-type"]:checked');
  var catEl        = document.getElementById('dc-idea-category');
  var langEl       = document.getElementById('dc-feedback-lang');
  var screenshotEl = document.getElementById('dc-feedback-screenshot');

  var name     = (nameEl && nameEl.value.trim()) ? nameEl.value.trim() : 'Anonymous';
  var text     = textEl ? textEl.value.trim() : '';
  var type     = typeEl ? typeEl.value : 'Other Feedback';
  var category = (catEl && catEl.value) ? catEl.value : '';
  var language = (langEl && langEl.value) ? langEl.value : 'English';

  if (!text) {
    alert('Please share your feedback before submitting.');
    textEl && textEl.focus();
    return;
  }

  var submitBtn = document.getElementById('dc-submit-btn');
  if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending\u2026'; }

  /* Capture screenshot metadata if a file was selected */
  var screenshotMeta = null;
  var screenshotFile = screenshotEl && screenshotEl.files[0];
  if (screenshotFile) {
    screenshotMeta = {
      name: screenshotFile.name,
      size: Math.round(screenshotFile.size / 1024) + ' KB',
      type: screenshotFile.type
    };
  }

  createGitHubIssue(name, type, text, category, 'page', language, screenshotMeta);
}

/* ================================================================
   GITHUB ISSUES API
   ================================================================ */
function createGitHubIssue(userName, feedbackType, feedbackText, category, mode, language, screenshotMeta) {
  console.log('═══ FEEDBACK SUBMISSION DEBUG ═══');
  console.log('Timestamp:', new Date().toISOString());
  console.log('User:', userName);
  console.log('Type:', feedbackType);
  console.log('Text length:', feedbackText ? feedbackText.length : 0);
  console.log('Token present:', !!DC_GITHUB.token);
  console.log('Token prefix:', DC_GITHUB.token ? DC_GITHUB.token.substring(0, 7) + '...' : 'MISSING');
  console.log('Repo:', DC_GITHUB.owner + '/' + DC_GITHUB.repo);

  var lang     = language || 'English';
  var page     = window.location.pathname.split('/').pop() || 'index.html';
  var langTag  = lang !== 'English' ? ' | ' + lang : '';
  var titleStr = 'Feedback from ' + userName + ' | ' + feedbackType + (category ? ' | ' + category : '') + langTag;

  var bodyParts = [
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
    ''
  ];

  if (screenshotMeta) {
    bodyParts.push('---');
    bodyParts.push('');
    bodyParts.push('**Screenshot attached by user:** ' + screenshotMeta.name + ' (' + screenshotMeta.size + ', ' + screenshotMeta.type + ')');
    bodyParts.push('_Ask the user to share it directly if needed — auto-upload is not supported._');
    bodyParts.push('');
  }

  bodyParts.push('---');
  bodyParts.push('');
  bodyParts.push('_Device: ' + window.innerWidth + 'x' + window.innerHeight + ' \u00b7 ' + navigator.userAgent.slice(0, 80) + '_');

  var bodyLines = bodyParts.join('\n');

  var slug   = feedbackType.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  var labels = ['beta-feedback', slug];
  if (lang !== 'English') labels.push('lang-' + lang.split(' ')[0].toLowerCase());

  var backup = {
    name: userName, type: feedbackType, text: feedbackText,
    category: category, page: page, timestamp: new Date().toISOString(),
    issueNumber: 'PENDING'
  };

  if (!DC_GITHUB.token) {
    backup.issueNumber = 'LOCAL';
    saveFeedbackBackup(backup);
    showFeedbackSuccess('LOCAL');
    return;
  }

  console.log('Making GitHub API request...');
  console.log('URL:', 'https://api.github.com/repos/' + DC_GITHUB.owner + '/' + DC_GITHUB.repo + '/issues');

  fetch('https://api.github.com/repos/' + DC_GITHUB.owner + '/' + DC_GITHUB.repo + '/issues', {
    method: 'POST',
    headers: {
      'Authorization': 'token ' + DC_GITHUB.token,
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.v3+json'
    },
    body: JSON.stringify({ title: titleStr, body: bodyLines, labels: labels })
  })
  .then(function (res) {
    console.log('Response status:', res.status);
    console.log('Response ok:', res.ok);
    return res.json().then(function (d) { return { ok: res.ok, status: res.status, data: d }; });
  })
  .then(function (result) {
    if (result.ok) {
      console.log('SUCCESS - Issue created:', result.data.number);
      console.log('Issue URL:', result.data.html_url);
      console.log('═══ END DEBUG ═══');
      backup.issueNumber = result.data.number;
      saveFeedbackBackup(backup);
      showFeedbackSuccess(result.data.number);
    } else {
      console.error('GITHUB API ERROR');
      console.error('Status:', result.status);
      console.error('Message:', result.data.message);
      console.error('Docs:', result.data.documentation_url);
      console.error('═══ END DEBUG ═══');
      throw new Error(result.data.message || 'API error ' + result.status);
    }
  })
  .catch(function (err) {
    console.error('Feedback GitHub error:', err.message || err);
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
  var formArea  = document.getElementById('dc-modal-form-area');
  var error     = document.getElementById('dc-feedback-error');
  var submitBtn = document.getElementById('dc-submit-btn');
  if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send Feedback'; }
  if (formArea) formArea.style.display = 'none';
  if (error) error.style.display = 'block';
}
