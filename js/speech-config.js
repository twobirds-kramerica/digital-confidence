/* ============================================================
   Digital Confidence Centre — Speech Configuration & TTS
   Provides voice selection, speed controls, and read-aloud
   buttons for all long-form content sections.
   ============================================================ */

var VOICE_CONFIG = {
  primaryVoice: null,
  secondaryVoice: null,
  defaultRate: 0.85,
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

  var saved = parseFloat(localStorage.getItem('dc-speech-speed') || '0.85');
  VOICE_CONFIG.defaultRate = saved;
  updateSpeedButtons(saved);
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

/* ---- Core TTS ---- */
function dcReadAloud(element, button) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();

  var text = element.textContent.trim();
  if (!text) return;

  var utterance = new SpeechSynthesisUtterance(text);
  utterance.voice  = getVoiceForContent(element);
  utterance.rate   = VOICE_CONFIG.defaultRate;
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
    element.classList.remove('being-read');
    dcClearHighlight(element);
  };

  window.speechSynthesis.speak(utterance);
}

function dcToggleReadAloud(element, button) {
  if (!window.speechSynthesis) return;
  if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
    window.speechSynthesis.pause();
    var icon  = button.querySelector('.read-aloud-icon');
    var label = button.querySelector('.read-aloud-label');
    if (icon)  icon.textContent  = '▶️';
    if (label) label.textContent = 'Resume';
  } else if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
    var icon2  = button.querySelector('.read-aloud-icon');
    var label2 = button.querySelector('.read-aloud-label');
    if (icon2)  icon2.textContent  = '⏸️';
    if (label2) label2.textContent = 'Pause';
  } else {
    dcReadAloud(element, button);
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

/* ---- Button factory ---- */
var DC_TTS_MIN_SENTENCES = 4;
var DC_TTS_MIN_CHARS     = 200;

function dcAddReadAloudButton(element) {
  if (element.querySelector('.read-aloud-btn')) return;
  if (element.closest('.confidence-check, .confidence-check-box, .quiz-container, .quiz-question, .read-aloud-controls')) return;

  var controls = document.createElement('div');
  controls.className = 'read-aloud-controls';
  controls.innerHTML =
    '<button class="read-aloud-btn" aria-label="Listen to this section">' +
      '<span class="read-aloud-icon">\u25B6\uFE0F</span>' +
      '<span class="read-aloud-label">Listen</span>' +
    '</button>';

  element.appendChild(controls);

  controls.querySelector('.read-aloud-btn').addEventListener('click', function() {
    dcToggleReadAloud(element, this);
  });
}

function dcShouldAddButton(el) {
  var text = el.textContent.trim();
  var sentences = (text.match(/[.!?]+/g) || []).length;
  return sentences >= DC_TTS_MIN_SENTENCES || text.length >= DC_TTS_MIN_CHARS;
}

/* ---- Speed button state ---- */
function updateSpeedButtons(speed) {
  document.querySelectorAll('.speed-btn').forEach(function(btn) {
    var s = parseFloat(btn.getAttribute('data-speed'));
    btn.classList.toggle('active', Math.abs(s - speed) < 0.01);
  });
}

/* ---- DOMContentLoaded init ---- */
document.addEventListener('DOMContentLoaded', function() {
  /* Speed buttons */
  document.querySelectorAll('.speed-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var speed = parseFloat(btn.getAttribute('data-speed'));
      VOICE_CONFIG.defaultRate = speed;
      localStorage.setItem('dc-speech-speed', speed);
      updateSpeedButtons(speed);
    });
  });

  var savedSpeed = parseFloat(localStorage.getItem('dc-speech-speed') || '0.85');
  VOICE_CONFIG.defaultRate = savedSpeed;
  updateSpeedButtons(savedSpeed);

  /* Story blocks: ONE Listen button for the whole block */
  document.querySelectorAll('.story-block').forEach(function(block) {
    block.querySelectorAll('.read-aloud-controls').forEach(function(c) { c.remove(); });
    dcAddReadAloudButton(block);
  });

  /* Long paragraphs and tip blocks outside of excluded containers */
  document.querySelectorAll('p, .tip-block, .tip-box, .warning-box').forEach(function(el) {
    if (el.closest('.story-block, .confidence-check, .confidence-check-box, .quiz-container, .quiz-question, .read-aloud-controls, .visual-example-card, .video-section')) return;
    /* Skip p elements inside tip/warning containers — the container itself gets the button */
    if (el.matches('p') && el.closest('.tip-block, .tip-box, .warning-box')) return;
    if (dcShouldAddButton(el)) {
      dcAddReadAloudButton(el);
    }
  });
});
