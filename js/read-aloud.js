/* ============================================
   Digital Confidence Centre
   Read Aloud / Text-to-Speech Feature
   Adds Listen buttons to long text blocks
   ============================================ */

(function () {
  'use strict';

  // Minimum sentences before a Listen button appears
  var MIN_SENTENCES = 2;

  var currentUtterance = null;
  var currentElement   = null;
  var currentButton    = null;
  var isPaused = false;

  /* ── Init ─────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    if (!('speechSynthesis' in window)) return; // browser doesn't support TTS

    // Target story blocks, tip blocks, confidence checks, and large paragraphs
    var selectors = [
      '.story-block > p',
      '.tip-block > p',
      '.tip-box > p',
      '.confidence-check > p',
      '.confidence-check-box > p',
      '.warning-box > p',
      '.danger-block > p'
    ];

    var blocks = document.querySelectorAll(selectors.join(', '));
    blocks.forEach(function (el) {
      var text = el.textContent.trim();
      var sentences = (text.match(/[.!?]+/g) || []).length;
      if (sentences >= MIN_SENTENCES && text.length > 80) {
        wrapWithReadAloud(el);
      }
    });

    // Restore speed preference in any speed selects on the page
    var speedSel = document.getElementById('ra-speed-select');
    if (speedSel) {
      speedSel.value = localStorage.getItem('dc-ra-speed') || '1.0';
      speedSel.addEventListener('change', function () {
        localStorage.setItem('dc-ra-speed', this.value);
      });
    }
  });

  /* ── Wrap element with read-aloud controls ────────────── */
  function wrapWithReadAloud(element) {
    var wrapper = document.createElement('div');
    wrapper.className = 'read-aloud-wrapper';

    var controls = document.createElement('div');
    controls.className = 'read-aloud-controls';

    var btn = document.createElement('button');
    btn.className = 'read-aloud-btn';
    btn.setAttribute('aria-label', 'Read this paragraph aloud');
    btn.innerHTML = '<span class="read-aloud-icon">▶</span><span class="read-aloud-label">Listen</span>';

    controls.appendChild(btn);

    // Insert wrapper before the element, move element inside
    element.parentNode.insertBefore(wrapper, element);
    wrapper.appendChild(controls);
    wrapper.appendChild(element);

    btn.addEventListener('click', function () {
      handleButtonClick(element, btn);
    });
  }

  /* ── Button click handler ────────────────────────────── */
  function handleButtonClick(element, btn) {
    var synth = window.speechSynthesis;

    if (currentElement === element && synth.speaking && !isPaused) {
      // Currently reading this element — pause it
      synth.pause();
      isPaused = true;
      setButtonState(btn, 'paused');
    } else if (currentElement === element && isPaused) {
      // Currently paused on this element — resume
      synth.resume();
      isPaused = false;
      setButtonState(btn, 'playing');
    } else {
      // Start reading this element (stop any previous)
      stopReading();
      startReading(element, btn);
    }
  }

  /* ── Start reading ────────────────────────────────────── */
  function startReading(element, btn) {
    var synth = window.speechSynthesis;
    var text = element.textContent.trim();
    var utterance = new SpeechSynthesisUtterance(text);

    var speed = parseFloat(localStorage.getItem('dc-ra-speed') || '1.0');
    utterance.rate = speed;
    utterance.lang = 'en-CA';

    // Prefer a female English voice if available
    var voices = synth.getVoices();
    var preferred = voices.find(function (v) {
      return v.lang.startsWith('en') && v.name.toLowerCase().includes('female');
    }) || voices.find(function (v) {
      return v.lang.startsWith('en');
    });
    if (preferred) utterance.voice = preferred;

    utterance.onstart = function () {
      element.classList.add('being-read');
      setButtonState(btn, 'playing');
    };

    utterance.onend = function () {
      element.classList.remove('being-read');
      clearHighlights(element);
      setButtonState(btn, 'idle');
      currentUtterance = null;
      currentElement   = null;
      currentButton    = null;
      isPaused = false;
    };

    utterance.onerror = function () {
      element.classList.remove('being-read');
      setButtonState(btn, 'idle');
      currentUtterance = null;
      currentElement   = null;
      currentButton    = null;
      isPaused = false;
    };

    // Word boundary highlighting
    utterance.onboundary = function (event) {
      if (event.name === 'word' && typeof event.charIndex === 'number') {
        highlightWord(element, text, event.charIndex, event.charLength || 1);
      }
    };

    currentUtterance = utterance;
    currentElement   = element;
    currentButton    = btn;
    isPaused = false;

    synth.speak(utterance);
  }

  /* ── Stop all reading ────────────────────────────────── */
  function stopReading() {
    window.speechSynthesis.cancel();
    if (currentElement) {
      currentElement.classList.remove('being-read');
      clearHighlights(currentElement);
    }
    if (currentButton) {
      setButtonState(currentButton, 'idle');
    }
    currentUtterance = null;
    currentElement   = null;
    currentButton    = null;
    isPaused = false;
  }

  /* ── Word highlight ────────────────────────────────────── */
  function highlightWord(element, originalText, charIndex, charLength) {
    clearHighlights(element);
    var before = originalText.substring(0, charIndex);
    var word   = originalText.substring(charIndex, charIndex + charLength);
    var after  = originalText.substring(charIndex + charLength);

    // Safely set innerHTML preserving structure
    element.innerHTML =
      escapeHTML(before) +
      '<mark class="word-highlight">' + escapeHTML(word) + '</mark>' +
      escapeHTML(after);
  }

  function clearHighlights(element) {
    var marks = element.querySelectorAll('.word-highlight');
    if (marks.length) {
      // Rebuild text content safely
      element.innerHTML = element.textContent;
    }
  }

  function escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  /* ── Button state helper ─────────────────────────────── */
  function setButtonState(btn, state) {
    var icon  = btn.querySelector('.read-aloud-icon');
    var label = btn.querySelector('.read-aloud-label');
    if (!icon || !label) return;

    if (state === 'playing') {
      icon.textContent  = '⏸';
      label.textContent = 'Pause';
      btn.setAttribute('aria-label', 'Pause reading');
    } else if (state === 'paused') {
      icon.textContent  = '▶';
      label.textContent = 'Resume';
      btn.setAttribute('aria-label', 'Resume reading');
    } else {
      icon.textContent  = '▶';
      label.textContent = 'Listen';
      btn.setAttribute('aria-label', 'Read this paragraph aloud');
    }
  }

  // Stop if user navigates away
  window.addEventListener('beforeunload', function () {
    window.speechSynthesis.cancel();
  });

})();
