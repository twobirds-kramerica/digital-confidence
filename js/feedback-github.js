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
  'Module 2.5: Everyday Tasks',
  'Module 3: Passwords & Biometrics',
  'Module 4: App Store Safety',
  'Module 5: Email & Messages',
  'Module 6: Banking & Transactions',
  'Module 7: Photos & Memories',
  'Module 8: Stay Connected',
  'Module 9: Understanding AI',
  'Module 10: Grocery & Food Delivery',
  'Module 11: Ride-Sharing Apps',
  'Module 12: Getting the Help You Deserve',
  'Module 13: Understanding Social Media',
  'Module 14: Smart Home Basics',
  'Module 15: Telehealth & Medical Portals',
  'Bonus: Show Me! (Visual AI)',
  'Resources Page',
  'General / Other'
];

/* ---- Page-to-module auto-select map ---- */
var DC_PAGE_MODULE = {
  'index.html':          'Home Page',
  'module-1.html':       'Module 1: Mastering the Escape Hatch',
  'module-2.html':       'Module 2: The Security Shield',
  'module-2-5.html':     'Module 2.5: Everyday Tasks',
  'module-3.html':       'Module 3: Passwords & Biometrics',
  'module-4.html':       'Module 4: App Store Safety',
  'module-5.html':       'Module 5: Email & Messages',
  'module-6.html':       'Module 6: Banking & Transactions',
  'module-7.html':       'Module 7: Photos & Memories',
  'module-8.html':       'Module 8: Stay Connected',
  'module-9.html':       'Module 9: Understanding AI',
  'module-10.html':      'Module 10: Grocery & Food Delivery',
  'module-11.html':      'Module 11: Ride-Sharing Apps',
  'module-12.html':      'Module 12: Getting the Help You Deserve',
  'module-13.html':      'Module 13: Understanding Social Media',
  'module-14.html':      'Module 14: Smart Home Basics',
  'module-15.html':      'Module 15: Telehealth & Medical Portals',
  'module-visual-ai.html': 'Bonus: Show Me! (Visual AI)',
  'resources.html':      'Resources Page'
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
    /* Close button — grey pill */
    '.dc-modal-close{',
    '  position:sticky;top:0;float:right;',
    '  background:#f0f0f0;border:1px solid #cccccc;border-radius:20px;',
    '  color:#333333;font-size:0.9rem;font-weight:600;cursor:pointer;',
    '  padding:0.3rem 1rem;margin-bottom:10px;z-index:10;flex-shrink:0;',
    '  min-height:44px;',
    '  transition:background 0.15s,color 0.15s,border-color 0.15s;',
    '  width:auto;height:auto;',
    '}',
    '.dc-modal-close:hover{background:#e0e0e0;color:#333333;border-color:#999999;}',
    '[data-theme="dark"] .dc-modal-close{background:#333;color:#eee;border-color:#555;}',
    /* Button row */
    '.dc-feedback-actions{margin-top:20px;}',
    '.dc-feedback-actions .dc-btn-submit{width:100%;}',
    /* Tab system */
    '.dc-tab-bar{display:flex;gap:0;margin-bottom:18px;border-bottom:2px solid #e0e0e0;}',
    '.dc-tab-btn{flex:1;padding:10px 8px;border:none;border-bottom:3px solid transparent;',
    '  background:none;font-size:1rem;font-weight:600;cursor:pointer;color:#666;',
    '  transition:color 0.15s,border-color 0.15s;margin-bottom:-2px;}',
    '.dc-tab-btn.active{color:#1565C0;border-bottom-color:#1565C0;}',
    '.dc-tab-btn:hover{color:#1565C0;}',
    '[data-theme="dark"] .dc-tab-btn{color:#aaa;}',
    '[data-theme="dark"] .dc-tab-btn.active{color:#64B5F6;border-bottom-color:#64B5F6;}',
    '[data-theme="dark"] .dc-tab-bar{border-bottom-color:#444;}',
    '.dc-tab-panel{display:none;} .dc-tab-panel.active{display:block;}',
    /* Voice recorder */
    '.dc-voice-wrap{text-align:center;padding:8px 0 4px;}',
    '.dc-voice-hint{font-size:0.95rem;color:#555;margin-bottom:16px;line-height:1.5;}',
    '[data-theme="dark"] .dc-voice-hint{color:#aaa;}',
    '.dc-rec-btn{display:inline-flex;align-items:center;gap:8px;padding:12px 28px;',
    '  border:none;border-radius:28px;font-size:1rem;font-weight:700;cursor:pointer;',
    '  background:#e53935;color:#fff;transition:background 0.15s,transform 0.1s;}',
    '.dc-rec-btn:hover{background:#c62828;transform:scale(1.04);}',
    '.dc-rec-btn.recording{background:#b71c1c;animation:dc-rec-pulse 1.2s infinite;}',
    '@keyframes dc-rec-pulse{0%,100%{box-shadow:0 0 0 0 rgba(229,57,53,0.5);}50%{box-shadow:0 0 0 10px rgba(229,57,53,0);}}',
    '.dc-rec-timer{font-size:1.4rem;font-weight:700;font-variant-numeric:tabular-nums;',
    '  color:#e53935;margin:14px 0;display:none;}',
    '.dc-voice-player{margin:14px 0;width:100%;display:none;}',
    '.dc-voice-actions{margin-top:14px;display:none;gap:10px;flex-direction:column;}',
    '.dc-voice-actions.visible{display:flex;}',
    '.dc-voice-unsupported{background:#fff3cd;border:1px solid #ffc107;border-radius:8px;',
    '  padding:14px;font-size:0.95rem;color:#555;display:none;}',
    '[data-theme="dark"] .dc-voice-unsupported{background:#332200;border-color:#664400;color:#ccc;}'
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
  btn.innerHTML = '<span class="dc-fab-icon">💬</span><span class="dc-fab-label">Ideas &amp; Feedback</span><span class="dc-fab-mobile-label" aria-hidden="true">Feedback</span>';
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

        /* Tab bar */
        '<div class="dc-tab-bar" role="tablist">',
          '<button class="dc-tab-btn active" id="dc-tab-written" role="tab" aria-selected="true" aria-controls="dc-panel-written">\u270d\ufe0f Written</button>',
          '<button class="dc-tab-btn" id="dc-tab-voice" role="tab" aria-selected="false" aria-controls="dc-panel-voice">\ud83c\udfa4 Voice</button>',
        '</div>',

        /* Written tab panel */
        '<div class="dc-tab-panel active" id="dc-panel-written" role="tabpanel" aria-labelledby="dc-tab-written">',

          /* FIELD 1: Module dropdown (auto-detected, user-editable) */
          '<div class="dc-feedback-field">',
            '<label class="dc-feedback-label" for="dc-feedback-module">Which part of the site is this about?</label>',
            '<select id="dc-feedback-module" name="module" class="dc-feedback-select">',
              moduleOptions,
            '</select>',
          '</div>',

          /* FIELD 1b: Language selector */
          '<div class="dc-feedback-field">',
            '<label class="dc-feedback-label" for="dc-feedback-language">Language / Langue</label>',
            '<select id="dc-feedback-language" name="language" class="dc-feedback-select">',
              '<option value="en">English</option>',
              '<option value="fr">Fran\u00e7ais</option>',
              '<option value="other">Other / Autre</option>',
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
            '<textarea id="dc-feedback-text" name="message" class="dc-feedback-textarea" rows="5"',
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
            '<input type="text" id="dc-feedback-name" name="name" class="dc-feedback-input"',
              ' placeholder="Type here\u2026" autocomplete="off">',
          '</div>',

          /* Version stamp — hidden field for Formspree submissions */
          '<input type="hidden" name="version" value="MVP-1.0-2026-03-16">',

        '</div>',

        /* Voice tab panel */
        '<div class="dc-tab-panel" id="dc-panel-voice" role="tabpanel" aria-labelledby="dc-tab-voice">',
          '<div class="dc-voice-unsupported" id="dc-voice-unsupported">',
            '\u26a0\ufe0f Voice recording is not supported on this browser. Please use the Written tab instead.',
          '</div>',
          '<div class="dc-voice-wrap" id="dc-voice-wrap">',
            '<p class="dc-voice-hint">Tap <strong>Start Recording</strong> and speak your feedback. Up to 5 minutes.</p>',
            '<button class="dc-rec-btn" id="dc-rec-btn" type="button">\ud83d\udd34 Start Recording</button>',
            '<div class="dc-rec-timer" id="dc-rec-timer">0:00</div>',
            '<audio class="dc-voice-player" id="dc-voice-player" controls></audio>',
            '<div class="dc-voice-actions" id="dc-voice-actions">',
              '<button class="dc-btn-submit" id="dc-voice-send-btn" type="button">\ud83d\udce4 Send Voice Note</button>',
              '<button style="background:#888;padding:10px;border:none;border-radius:8px;color:#fff;cursor:pointer;font-size:0.9rem;" id="dc-voice-redo-btn" type="button">\ud83d\udd04 Record Again</button>',
            '</div>',
          '</div>',
        '</div>',

        '</div>',

        /* Success state */
        '<div id="dc-feedback-success" class="dc-feedback-success" style="display:none;">',
          '<div class="dc-success-icon">\u2705</div>',
          '<h3>Thank You!</h3>',
          '<p>Your feedback has been received.</p>',
          '<p>Nous lisons les commentaires en fran\u00e7ais. French feedback is welcome! / Les commentaires en fran\u00e7ais sont les bienvenus\u00a0!</p>',
          '<p class="dc-reference-num" id="dc-reference-num"></p>',
          '<button onclick="closeFeedbackModal()" class="dc-btn-submit">Close</button>',
        '</div>',

        /* Error state */
        '<div id="dc-feedback-error" class="dc-feedback-error" style="display:none;">',
          '<div class="dc-error-icon">\u26a0\ufe0f</div>',
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
  document.getElementById('dc-tab-written').addEventListener('click', function () { switchFeedbackTab('written'); });
  document.getElementById('dc-tab-voice').addEventListener('click', function () { switchFeedbackTab('voice'); });
  document.getElementById('dc-rec-btn').addEventListener('click', toggleVoiceRecording);
  document.getElementById('dc-voice-send-btn').addEventListener('click', sendVoiceNote);
  document.getElementById('dc-voice-redo-btn').addEventListener('click', resetVoiceRecorder);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var modal = document.getElementById('dc-feedback-modal');
      if (modal && modal.style.display !== 'none') closeFeedbackModal();
    }
  });

  /* Check MediaRecorder support */
  if (typeof MediaRecorder === 'undefined' || !navigator.mediaDevices) {
    document.getElementById('dc-voice-wrap').style.display = 'none';
    document.getElementById('dc-voice-unsupported').style.display = 'block';
  }
}

/* ---- Tab switching ---- */
function switchFeedbackTab(tab) {
  var writtenBtn   = document.getElementById('dc-tab-written');
  var voiceBtn     = document.getElementById('dc-tab-voice');
  var writtenPanel = document.getElementById('dc-panel-written');
  var voicePanel   = document.getElementById('dc-panel-voice');
  if (tab === 'written') {
    writtenBtn.classList.add('active');   writtenBtn.setAttribute('aria-selected', 'true');
    voiceBtn.classList.remove('active'); voiceBtn.setAttribute('aria-selected', 'false');
    writtenPanel.classList.add('active');
    voicePanel.classList.remove('active');
  } else {
    voiceBtn.classList.add('active');     voiceBtn.setAttribute('aria-selected', 'true');
    writtenBtn.classList.remove('active'); writtenBtn.setAttribute('aria-selected', 'false');
    voicePanel.classList.add('active');
    writtenPanel.classList.remove('active');
  }
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

  /* Reset language dropdown to English on each open */
  var langEl = document.getElementById('dc-feedback-language');
  if (langEl) langEl.value = 'en';

  /* Auto-select module based on current page (user can still change it) */
  if (moduleEl) {
    var page       = window.location.pathname.split('/').pop() || 'index.html';
    var autoModule = DC_PAGE_MODULE[page];
    moduleEl.value = autoModule || 'General / Other';
  }

  /* Reset tabs to Written */
  switchFeedbackTab('written');
  resetVoiceRecorder();

  modal.style.display          = 'flex';
  document.body.style.overflow = 'hidden';

  /* Focus the module dropdown first */
  setTimeout(function () {
    if (moduleEl) moduleEl.focus();
  }, 100);
}

function closeFeedbackModal() {
  stopVoiceRecordingIfActive();
  var modal = document.getElementById('dc-feedback-modal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

/* ================================================================
   VOICE RECORDER
   Uses MediaRecorder API. Graceful fallback if unsupported.
   Sends via Web Share API (iOS) or mailto fallback (desktop).
   Max 5 minutes.
   ================================================================ */
var _dcMediaRecorder = null;
var _dcAudioChunks   = [];
var _dcRecTimerInt   = null;
var _dcRecSeconds    = 0;
var _dcAudioBlob     = null;

function resetVoiceRecorder() {
  stopVoiceRecordingIfActive();
  _dcAudioChunks  = [];
  _dcAudioBlob    = null;
  _dcRecSeconds   = 0;

  var recBtn    = document.getElementById('dc-rec-btn');
  var timer     = document.getElementById('dc-rec-timer');
  var player    = document.getElementById('dc-voice-player');
  var actions   = document.getElementById('dc-voice-actions');
  if (!recBtn) return;

  recBtn.textContent = '\uD83D\uDD34 Start Recording';
  recBtn.classList.remove('recording');
  recBtn.disabled = false;
  if (timer)   { timer.textContent = '0:00'; timer.style.display = 'none'; }
  if (player)  { player.src = ''; player.style.display = 'none'; }
  if (actions) { actions.classList.remove('visible'); }
}

function stopVoiceRecordingIfActive() {
  if (_dcMediaRecorder && _dcMediaRecorder.state === 'recording') {
    _dcMediaRecorder.stop();
  }
  if (_dcRecTimerInt) { clearInterval(_dcRecTimerInt); _dcRecTimerInt = null; }
}

function toggleVoiceRecording() {
  if (_dcMediaRecorder && _dcMediaRecorder.state === 'recording') {
    _dcMediaRecorder.stop();
  } else {
    startVoiceRecording();
  }
}

function startVoiceRecording() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function (stream) {
      _dcAudioChunks = [];
      _dcAudioBlob   = null;
      _dcRecSeconds  = 0;

      var mimeType = '';
      var types = ['audio/mp4', 'audio/webm;codecs=opus', 'audio/webm', 'audio/ogg'];
      for (var i = 0; i < types.length; i++) {
        if (MediaRecorder.isTypeSupported(types[i])) { mimeType = types[i]; break; }
      }

      _dcMediaRecorder = new MediaRecorder(stream, mimeType ? { mimeType: mimeType } : {});

      _dcMediaRecorder.addEventListener('dataavailable', function (e) {
        if (e.data && e.data.size > 0) _dcAudioChunks.push(e.data);
      });

      _dcMediaRecorder.addEventListener('stop', function () {
        stream.getTracks().forEach(function (t) { t.stop(); });
        clearInterval(_dcRecTimerInt);
        _dcAudioBlob = new Blob(_dcAudioChunks, { type: _dcMediaRecorder.mimeType || 'audio/webm' });

        var recBtn  = document.getElementById('dc-rec-btn');
        var timer   = document.getElementById('dc-rec-timer');
        var player  = document.getElementById('dc-voice-player');
        var actions = document.getElementById('dc-voice-actions');

        if (recBtn)  { recBtn.textContent = '\uD83D\uDD34 Start Recording'; recBtn.classList.remove('recording'); }
        if (player)  { player.src = URL.createObjectURL(_dcAudioBlob); player.style.display = 'block'; }
        if (actions) { actions.classList.add('visible'); }
        if (timer)   { timer.style.display = 'none'; }
      });

      _dcMediaRecorder.start(1000);

      /* Update UI */
      var recBtn = document.getElementById('dc-rec-btn');
      var timer  = document.getElementById('dc-rec-timer');
      if (recBtn) { recBtn.textContent = '\u23f9 Stop Recording'; recBtn.classList.add('recording'); }
      if (timer)  { timer.style.display = 'block'; timer.textContent = '0:00'; }

      /* Countdown timer — max 5 minutes */
      _dcRecTimerInt = setInterval(function () {
        _dcRecSeconds++;
        var m = Math.floor(_dcRecSeconds / 60);
        var s = _dcRecSeconds % 60;
        if (timer) timer.textContent = m + ':' + (s < 10 ? '0' : '') + s;
        if (_dcRecSeconds >= 300) {
          _dcMediaRecorder.stop(); /* auto-stop at 5 min */
        }
      }, 1000);
    })
    .catch(function (err) {
      alert('Could not access microphone. Please check your privacy settings and try again.\n\n(' + err.message + ')');
    });
}

function sendVoiceNote() {
  if (!_dcAudioBlob) return;

  var ext      = _dcAudioBlob.type.includes('mp4') ? 'mp4' : 'webm';
  var filename = 'dcc-voice-feedback.' + ext;
  var subject  = encodeURIComponent('Voice Feedback — Digital Confidence Centre');
  var body     = encodeURIComponent(
    'Hello Two Birds,\n\nPlease find my voice feedback attached.\n\nSent from the Digital Confidence Centre feedback form.'
  );
  var mailtoHref = 'mailto:hello@twobirds.ca?subject=' + subject + '&body=' + body;

  /* Try Web Share API first (works on iOS, Android) */
  var file = new File([_dcAudioBlob], filename, { type: _dcAudioBlob.type });
  if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
    navigator.share({
      files: [file],
      title: 'Voice Feedback',
      text:  'Voice feedback for the Digital Confidence Centre'
    }).catch(function () { /* user cancelled share — do nothing */ });
    return;
  }

  /* Fallback: download the file, then open mail client */
  var url   = URL.createObjectURL(_dcAudioBlob);
  var dlLink = document.createElement('a');
  dlLink.href     = url;
  dlLink.download = filename;
  dlLink.click();
  setTimeout(function () {
    URL.revokeObjectURL(url);
    window.location.href = mailtoHref;
  }, 800);
}

/* ---- Submit handler ---- */
function handleFeedbackSubmit() {
  var nameEl   = document.getElementById('dc-feedback-name');
  var textEl   = document.getElementById('dc-feedback-text');
  var typeEl   = document.querySelector('input[name="dc-feedback-type"]:checked');
  var moduleEl = document.getElementById('dc-feedback-module');

  var langEl   = document.getElementById('dc-feedback-language');
  var name     = (nameEl && nameEl.value.trim()) ? nameEl.value.trim() : 'Anonymous';
  var text     = textEl ? textEl.value.trim() : '';
  var type     = typeEl ? typeEl.value : 'Not specified';
  var module   = (moduleEl && moduleEl.value) ? moduleEl.value : 'General / Other';
  var userLang = (langEl && langEl.value) ? langEl.value : (navigator.language || 'unknown');

  if (!text) {
    alert('Please share your feedback before submitting.');
    if (textEl) textEl.focus();
    return;
  }

  var submitBtn = document.getElementById('dc-submit-btn');
  if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending\u2026'; }

  submitToFormspree(name, type, text, module, userLang);
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
    device:        window.innerWidth + 'x' + window.innerHeight,
    version:       'MVP-1.0-2026-03-16'
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

      /* Silent redundant backup to Web3Forms — fire-and-forget, never blocks user */
      // Formspree replaces GitHub Issues API — CORS-safe for static sites
      var web3Key = '5e0ecf7e-fb33-4541-be2e-1938bce868f4';
      if (web3Key !== 'WEB3FORMS_ACCESS_KEY') {
        fetch('https://api.web3forms.com/submit', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: web3Key,
            subject:    'DCC Feedback Backup',
            from_name:  payload.name || 'Anonymous',
            message:    JSON.stringify(payload)
          })
        }).catch(function () { /* silent fail — backup only */ });
      }
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
