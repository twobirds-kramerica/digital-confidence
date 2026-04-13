/* ============================================================
   Digital Confidence Centre — Speech Configuration & TTS
   Per-instance inline speed controls. Listen ↔ Pause toggle.
   ============================================================ */

var VOICE_CONFIG = {
  primaryVoice: null,
  secondaryVoice: null,
  defaultRate: 1.0,
  pitch: 1.0,
  volume: 1.0
};

function initializeVoices() {
  var voices = window.speechSynthesis.getVoices();
  if (!voices.length) return;

  var canadianVoices = voices.filter(function(v) { return v.lang.indexOf('en-CA') === 0; });
  var britishVoices  = voices.filter(function(v) { return v.lang.indexOf('en-GB') === 0; });
  var usVoices       = voices.filter(function(v) { return v.lang.indexOf('en-US') === 0; });
  var allVoices = canadianVoices.concat(britishVoices, usVoices);

  var femaleVoices = allVoices.filter(function(v) {
    var n = v.name.toLowerCase();
    return n.indexOf('female') !== -1 || n.indexOf('woman') !== -1 ||
           v.name === 'Samantha' || v.name === 'Karen' || v.name === 'Moira' ||
           v.name === 'Fiona' || v.name === 'Victoria' || v.name === 'Serena';
  });

  var maleVoices = allVoices.filter(function(v) {
    var n = v.name.toLowerCase();
    return n.indexOf('male') !== -1 || n.indexOf(' man') !== -1 ||
           v.name === 'Daniel' || v.name === 'Oliver' || v.name === 'Fred';
  });

  VOICE_CONFIG.primaryVoice   = femaleVoices[0] || allVoices[0] || null;
  VOICE_CONFIG.secondaryVoice = maleVoices[0]   || allVoices[1] || null;

  var saved = parseFloat(localStorage.getItem('dc-speech-speed') || '1.0');
  /* Migrate old speeds (1.5, 2.0) to nearest valid option */
  if (DC_VALID_SPEEDS.indexOf(saved) === -1) { saved = 1.0; }
  VOICE_CONFIG.defaultRate = saved;
}

if (window.speechSynthesis) {
  /* Warm-up: cancel any stale speech state left from a previous page.
     On some browsers (especially Chrome/iOS Safari) the first call to
     speak() silently fails if cancel() has never been called. This
     single cancel() at page-load primes the synthesis engine. */
  window.speechSynthesis.cancel();

  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = initializeVoices;
  }
  /* Call immediately AND after a short delay — some browsers (Chrome)
     return an empty voices array on the first synchronous call even
     though onvoiceschanged is supported. The 200ms retry catches that. */
  initializeVoices();
  setTimeout(initializeVoices, 200);
}

function getVoiceForContent(element) {
  if (element.classList.contains('tip-block') ||
      element.classList.contains('tip-box') ||
      element.classList.contains('warning-box')) {
    return VOICE_CONFIG.secondaryVoice || VOICE_CONFIG.primaryVoice;
  }
  return VOICE_CONFIG.primaryVoice;
}

/* ---- Core TTS (accepts explicit rate) ---- */
function dcReadAloud(element, button, rate) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();

  /* Clone and strip the read-aloud controls so button labels and
     speed options are never read aloud as part of the content. */
  var clone = element.cloneNode(true);
  var ctrl = clone.querySelector('.read-aloud-controls');
  if (ctrl) ctrl.remove();
  var text = clone.textContent.trim();
  if (!text) return;

  var utterance = new SpeechSynthesisUtterance(text);
  utterance.voice  = getVoiceForContent(element);
  utterance.rate   = rate || VOICE_CONFIG.defaultRate;
  utterance.pitch  = VOICE_CONFIG.pitch;
  utterance.volume = VOICE_CONFIG.volume;

  utterance.onboundary = function(event) {
    if (event.name === 'word') {
      dcHighlightWord(element, event.charIndex, event.charLength || 1);
    }
  };

  utterance.onstart = function() {
    var icon  = button.querySelector('.read-aloud-icon');
    var label = button.querySelector('.read-aloud-label');
    if (icon)  icon.textContent  = '⏸️';
    if (label) label.textContent = 'Pause';
    button.classList.add('playing');
    element.classList.add('being-read');
  };

  utterance.onend = function() {
    var icon  = button.querySelector('.read-aloud-icon');
    var label = button.querySelector('.read-aloud-label');
    if (icon)  icon.textContent  = '▶️';
    if (label) label.textContent = 'Listen';
    button.classList.remove('playing');
    element.classList.remove('being-read');
    dcClearHighlight(element);
  };

  utterance.onerror = function() {
    var icon  = button.querySelector('.read-aloud-icon');
    var label = button.querySelector('.read-aloud-label');
    if (icon)  icon.textContent  = '▶️';
    if (label) label.textContent = 'Listen';
    button.classList.remove('playing');
    element.classList.remove('being-read');
    dcClearHighlight(element);
  };

  /* If voices still haven't loaded, delay the first speak() by 150ms
     to allow onvoiceschanged to fire first. */
  if (!VOICE_CONFIG.primaryVoice && window.speechSynthesis.getVoices().length === 0) {
    setTimeout(function () {
      initializeVoices();
      utterance.voice = getVoiceForContent(element);
      window.speechSynthesis.speak(utterance);
    }, 150);
  } else {
    window.speechSynthesis.speak(utterance);
  }
}

/* ---- Toggle: Listen ↔ Pause only (no Resume state) ---- */
function dcToggleReadAloud(element, button, rate) {
  if (!window.speechSynthesis) return;
  if (window.speechSynthesis.speaking) {
    /* Stop completely — button returns to "Listen" */
    window.speechSynthesis.cancel();
    var icon  = button.querySelector('.read-aloud-icon');
    var label = button.querySelector('.read-aloud-label');
    if (icon)  icon.textContent  = '▶️';
    if (label) label.textContent = 'Listen';
    button.classList.remove('playing');
    element.classList.remove('being-read');
    dcClearHighlight(element);
  } else {
    dcReadAloud(element, button, rate);
  }
}

/* ---- Word highlight ---- */
function dcHighlightWord(element, charIndex, charLength) {
  if (!element.dataset.originalHtml) {
    element.dataset.originalHtml = element.innerHTML;
  }
  var plain  = element.textContent;
  var before = dcEscapeHtml(plain.substring(0, charIndex));
  var word   = dcEscapeHtml(plain.substring(charIndex, charIndex + charLength));
  var after  = dcEscapeHtml(plain.substring(charIndex + charLength));
  element.innerHTML = before + '<mark class="word-highlight">' + word + '</mark>' + after;
  var mark = element.querySelector('.word-highlight');
  if (mark) mark.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function dcClearHighlight(element) {
  if (element.dataset.originalHtml) {
    element.innerHTML = element.dataset.originalHtml;
    delete element.dataset.originalHtml;
  }
}

function dcEscapeHtml(text) {
  var d = document.createElement('div');
  d.textContent = text;
  return d.innerHTML;
}

/* ---- Inline speed button HTML builder ---- */
var DC_TTS_MIN_SENTENCES = 4;
var DC_TTS_MIN_CHARS     = 200;

var DC_SPEEDS = [
  { v: '0.5',  label: '0.5x',  aria: 'Half speed'              },
  { v: '0.75', label: '0.75x', aria: 'Slow speed'              },
  { v: '1',    label: '1x',    aria: 'Normal speed'            },
  { v: '1.15', label: '1.15x', aria: 'Slightly faster speed'   },
  { v: '1.25', label: '1.25x', aria: 'Moderately faster speed' }
];
var DC_VALID_SPEEDS = [0.5, 0.75, 1.0, 1.15, 1.25];

function dcBuildSpeedButtons(savedSpeed) {
  return DC_SPEEDS.map(function(s) {
    var active = (Math.abs(parseFloat(s.v) - savedSpeed) < 0.01) ? ' active' : '';
    return '<button class="speed-btn-inline' + active + '" data-speed="' + s.v +
           '" aria-label="' + s.aria + '">' + s.label + '</button>';
  }).join('');
}

/* ---- Button factory: Listen button + inline speed controls ---- */
function dcAddReadAloudButton(element) {
  if (element.querySelector('.read-aloud-btn')) return;
  if (element.closest('.confidence-check, .confidence-check-box, .quiz-container, .quiz-question, .read-aloud-controls')) return;

  var savedSpeed  = parseFloat(localStorage.getItem('dc-speech-speed') || '1.0');
  var currentSpeed = savedSpeed;

  var controls = document.createElement('div');
  controls.className = 'read-aloud-controls';
  controls.setAttribute('aria-hidden', 'true'); /* Excluded from screen readers and TTS text extraction */
  controls.innerHTML =
    '<div class="listen-controls-container">' +
      '<button class="read-aloud-btn" aria-label="Listen to this section">' +
        '<span class="read-aloud-icon">\u25B6\uFE0F</span>' +
        '<span class="read-aloud-label">Listen</span>' +
      '</button>' +
      '<div class="speed-controls-inline">' +
        '<span class="speed-label">Speed:</span>' +
        dcBuildSpeedButtons(savedSpeed) +
      '</div>' +
    '</div>';

  element.appendChild(controls);

  var listenBtn = controls.querySelector('.read-aloud-btn');
  var speedBtns = controls.querySelectorAll('.speed-btn-inline');

  /* Per-instance speed buttons */
  speedBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      speedBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      currentSpeed = parseFloat(btn.getAttribute('data-speed'));
      VOICE_CONFIG.defaultRate = currentSpeed;
      localStorage.setItem('dc-speech-speed', currentSpeed);

      /* Restart playback at new speed if currently playing */
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        setTimeout(function() {
          dcReadAloud(element, listenBtn, currentSpeed);
        }, 150);
      }
    });
  });

  listenBtn.addEventListener('click', function() {
    dcToggleReadAloud(element, this, currentSpeed);
  });
}

function dcShouldAddButton(el) {
  /* Exclude any injected controls text when measuring content length */
  var clone = el.cloneNode(true);
  var ctrl = clone.querySelector('.read-aloud-controls');
  if (ctrl) ctrl.remove();
  var text = clone.textContent.trim();
  var sentences = (text.match(/[.!?]+/g) || []).length;
  return sentences >= DC_TTS_MIN_SENTENCES || text.length >= DC_TTS_MIN_CHARS;
}

/* ---- DOMContentLoaded init ---- */
document.addEventListener('DOMContentLoaded', function() {
  var savedSpeed = parseFloat(localStorage.getItem('dc-speech-speed') || '1.0');
  if (DC_VALID_SPEEDS.indexOf(savedSpeed) === -1) { savedSpeed = 1.0; }
  VOICE_CONFIG.defaultRate = savedSpeed;

  /* D1: ONE "Read this page aloud" button per page, not per section.
     Reads the entire main content area. */
  var mainContent = document.querySelector('main, .module-content, article, .main-content');
  if (!mainContent) mainContent = document.body;

  /* Build the page-level read button */
  var isFr = (localStorage.getItem('dc-lang') || 'en').startsWith('fr');
  var pageBtn = document.createElement('div');
  pageBtn.className = 'read-page-controls';
  pageBtn.style.cssText = 'display:flex;align-items:center;gap:8px;flex-wrap:nowrap;padding:8px 0;margin-bottom:12px;';
  pageBtn.innerHTML =
    '<button class="read-aloud-btn read-page-btn" aria-label="' + (isFr ? 'Lire cette page à voix haute' : 'Read this page aloud') + '" style="min-height:44px;">' +
      '<span class="read-aloud-icon">\u25B6\uFE0F</span>' +
      '<span class="read-aloud-label">' + (isFr ? 'Lire cette page' : 'Read this page aloud') + '</span>' +
    '</button>' +
    '<div class="speed-controls-inline" style="flex-wrap:nowrap;overflow-x:auto;">' +
      '<span class="speed-label" style="font-size:12px;">Speed:</span>' +
      dcBuildSpeedButtons(savedSpeed) +
    '</div>';

  /* Insert after first heading or at top of main content */
  var firstH = mainContent.querySelector('h1, h2');
  if (firstH && firstH.nextSibling) {
    firstH.parentNode.insertBefore(pageBtn, firstH.nextSibling);
  } else {
    mainContent.insertBefore(pageBtn, mainContent.firstChild);
  }

  var currentSpeed = savedSpeed;
  var readBtn = pageBtn.querySelector('.read-page-btn');

  readBtn.addEventListener('click', function() {
    dcToggleReadAloud(mainContent, readBtn, currentSpeed);
  });

  pageBtn.querySelectorAll('.speed-btn-inline').forEach(function(btn) {
    btn.addEventListener('click', function() {
      pageBtn.querySelectorAll('.speed-btn-inline').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      currentSpeed = parseFloat(btn.getAttribute('data-speed'));
      VOICE_CONFIG.defaultRate = currentSpeed;
      localStorage.setItem('dc-speech-speed', currentSpeed);
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        setTimeout(function() { dcReadAloud(mainContent, readBtn, currentSpeed); }, 150);
      }
    });
  });

  /* Global stop button */
  var stopBtn = document.createElement('button');
  stopBtn.id = 'stop-reading-btn';
  stopBtn.textContent = isFr ? '\u23F9 Arrêter la lecture' : '\u23F9 Stop reading';
  stopBtn.style.cssText = 'display:none;position:fixed;bottom:80px;right:16px;z-index:9998;background:#E74C3C;color:#fff;border:none;border-radius:24px;padding:10px 18px;font-size:14px;cursor:pointer;min-height:44px;box-shadow:0 2px 8px rgba(0,0,0,0.3);';
  document.body.appendChild(stopBtn);
  stopBtn.addEventListener('click', function() {
    window.speechSynthesis.cancel();
    stopBtn.style.display = 'none';
  });

  /* Show stop button when speech starts, hide when it ends */
  var origSpeak = window.speechSynthesis.speak.bind(window.speechSynthesis);
  window.speechSynthesis.speak = function(u) {
    stopBtn.style.display = 'flex';
    var origEnd = u.onend;
    u.onend = function() { stopBtn.style.display = 'none'; if (origEnd) origEnd(); };
    var origErr = u.onerror;
    u.onerror = function() { stopBtn.style.display = 'none'; if (origErr) origErr(); };
    origSpeak(u);
  };
});
