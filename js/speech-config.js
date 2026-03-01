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
  VOICE_CONFIG.defaultRate = saved;
}

if (window.speechSynthesis) {
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = initializeVoices;
  }
  initializeVoices();
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

  var text = element.textContent.trim();
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
    element.classList.add('being-read');
  };

  utterance.onend = function() {
    var icon  = button.querySelector('.read-aloud-icon');
    var label = button.querySelector('.read-aloud-label');
    if (icon)  icon.textContent  = '▶️';
    if (label) label.textContent = 'Listen';
    element.classList.remove('being-read');
    dcClearHighlight(element);
  };

  utterance.onerror = function() {
    var icon  = button.querySelector('.read-aloud-icon');
    var label = button.querySelector('.read-aloud-label');
    if (icon)  icon.textContent  = '▶️';
    if (label) label.textContent = 'Listen';
    element.classList.remove('being-read');
    dcClearHighlight(element);
  };

  window.speechSynthesis.speak(utterance);
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
  { v: '0.5',  label: '0.5x', aria: 'Half speed'   },
  { v: '0.75', label: '0.75x', aria: 'Slow speed'  },
  { v: '1',    label: '1x',   aria: 'Normal speed' },
  { v: '1.5',  label: '1.5x', aria: 'Fast speed'   },
  { v: '2',    label: '2x',   aria: 'Double speed'  }
];

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
  var text = el.textContent.trim();
  var sentences = (text.match(/[.!?]+/g) || []).length;
  return sentences >= DC_TTS_MIN_SENTENCES || text.length >= DC_TTS_MIN_CHARS;
}

/* ---- DOMContentLoaded init ---- */
document.addEventListener('DOMContentLoaded', function() {
  var savedSpeed = parseFloat(localStorage.getItem('dc-speech-speed') || '1.0');
  VOICE_CONFIG.defaultRate = savedSpeed;

  /* Story blocks: ONE Listen button (with inline speed) for the whole block */
  document.querySelectorAll('.story-block').forEach(function(block) {
    block.querySelectorAll('.read-aloud-controls').forEach(function(c) { c.remove(); });
    dcAddReadAloudButton(block);
  });

  /* Long paragraphs and tip blocks outside of excluded containers */
  document.querySelectorAll('p, .tip-block, .tip-box, .warning-box').forEach(function(el) {
    if (el.closest('.story-block, .confidence-check, .confidence-check-box, .quiz-container, .quiz-question, .read-aloud-controls, .visual-example-card, .video-section')) return;
    /* Skip p elements inside tip/warning containers — the container gets the button */
    if (el.matches('p') && el.closest('.tip-block, .tip-box, .warning-box')) return;
    if (dcShouldAddButton(el)) {
      dcAddReadAloudButton(el);
    }
  });
});
