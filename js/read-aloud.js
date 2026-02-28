/* ============================================
   Digital Confidence Centre
   Read Aloud / Text-to-Speech Feature
   v2 — threshold 4+/200+, button at bottom,
        stable word highlighting with originalHTML
   ============================================ */

(function () {
  'use strict';

  var MIN_SENTENCES = 4;
  var MIN_CHARS     = 200;

  var currentUtterance = null;
  var currentElement   = null;
  var currentButton    = null;
  var isPaused = false;

  /* ── Init ─────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    if (!('speechSynthesis' in window)) return;

    // Selectors for eligible blocks
    var selectors = [
      '.story-block > p',
      '.tip-block > p',
      '.tip-box > p',
      '.warning-box > p',
      '.danger-block > p',
      '.exercise-block > p',
      '.walkthrough > p'
    ];

    document.querySelectorAll(selectors.join(', ')).forEach(function (el) {
      // Skip anything inside confidence-check sections
      if (el.closest('.confidence-check') || el.closest('.confidence-check-box')) return;

      var text = el.textContent.trim();
      var sentences = (text.match(/[.!?]+/g) || []).length;

      if (sentences >= MIN_SENTENCES || text.length >= MIN_CHARS) {
        wrapWithReadAloud(el);
      }
    });

    // Restore speed preference
    var speedSel = document.getElementById('ra-speed-select');
    if (speedSel) {
      speedSel.value = localStorage.getItem('dc-ra-speed') || '1.0';
      speedSel.addEventListener('change', function () {
        localStorage.setItem('dc-ra-speed', this.value);
      });
    }
  });

  /* ── Wrap element — button goes BELOW content ─────────── */
  function wrapWithReadAloud(element) {
    var wrapper  = document.createElement('div');
    wrapper.className = 'read-aloud-wrapper';

    element.parentNode.insertBefore(wrapper, element);
    wrapper.appendChild(element);   // content first

    var controls = document.createElement('div');
    controls.className = 'read-aloud-controls';

    var btn = document.createElement('button');
    btn.className = 'read-aloud-btn';
    btn.setAttribute('aria-label', 'Read this paragraph aloud');
    btn.innerHTML =
      '<span class="read-aloud-icon" aria-hidden="true">▶</span>' +
      '<span class="read-aloud-label">Listen to This Section</span>';

    controls.appendChild(btn);
    wrapper.appendChild(controls);  // controls after content

    btn.addEventListener('click', function () {
      handleButtonClick(element, btn);
    });
  }

  /* ── Button click handler ────────────────────────────── */
  function handleButtonClick(element, btn) {
    var synth = window.speechSynthesis;

    if (currentElement === element) {
      if (synth.speaking && !isPaused) {
        synth.pause();
        isPaused = true;
        setButtonState(btn, 'paused');
      } else if (isPaused) {
        synth.resume();
        isPaused = false;
        setButtonState(btn, 'playing');
      }
    } else {
      stopReading();
      startReading(element, btn);
    }
  }

  /* ── Start reading ────────────────────────────────────── */
  function startReading(element, btn) {
    var synth = window.speechSynthesis;

    // Save original HTML for safe highlight restoration
    if (!element.dataset.originalHtml) {
      element.dataset.originalHtml = element.innerHTML;
    }

    var text = element.textContent.trim();
    var utterance = new SpeechSynthesisUtterance(text);

    utterance.rate = parseFloat(localStorage.getItem('dc-ra-speed') || '1.0');
    utterance.lang = 'en-CA';

    // Pick a clear English voice if available
    var voices = synth.getVoices();
    var preferred = voices.find(function (v) {
      return v.lang.startsWith('en') && /female|zira|samantha/i.test(v.name);
    }) || voices.find(function (v) { return v.lang.startsWith('en'); });
    if (preferred) utterance.voice = preferred;

    utterance.onstart = function () {
      element.classList.add('being-read');
      setButtonState(btn, 'playing');
    };

    utterance.onboundary = function (event) {
      if (event.name === 'word' && typeof event.charIndex === 'number') {
        highlightWord(element, text, event.charIndex, event.charLength || 1);
      }
    };

    utterance.onend = function () {
      finishReading(element, btn);
    };

    utterance.onerror = function () {
      finishReading(element, btn);
    };

    currentUtterance = utterance;
    currentElement   = element;
    currentButton    = btn;
    isPaused = false;

    synth.speak(utterance);
  }

  function finishReading(element, btn) {
    element.classList.remove('being-read');
    clearHighlights(element);
    setButtonState(btn, 'idle');
    currentUtterance = null;
    currentElement   = null;
    currentButton    = null;
    isPaused = false;
  }

  /* ── Stop all reading ────────────────────────────────── */
  function stopReading() {
    window.speechSynthesis.cancel();
    if (currentElement) {
      currentElement.classList.remove('being-read');
      clearHighlights(currentElement);
    }
    if (currentButton) setButtonState(currentButton, 'idle');
    currentUtterance = null;
    currentElement   = null;
    currentButton    = null;
    isPaused = false;
  }

  /* ── Word highlight (stable via originalHTML) ─────────── */
  function highlightWord(element, plainText, charIndex, charLength) {
    // Restore from originalHTML first to avoid nested <mark> accumulation
    if (element.dataset.originalHtml) {
      element.innerHTML = element.dataset.originalHtml;
    }

    var before = plainText.substring(0, charIndex);
    var word   = plainText.substring(charIndex, charIndex + charLength);
    var after  = plainText.substring(charIndex + charLength);

    element.innerHTML =
      safeText(before) +
      '<mark class="word-highlight">' + safeText(word) + '</mark>' +
      safeText(after);

    // Scroll the highlighted word into view
    var mark = element.querySelector('.word-highlight');
    if (mark) {
      mark.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function clearHighlights(element) {
    if (element.dataset.originalHtml) {
      element.innerHTML = element.dataset.originalHtml;
    }
  }

  /* Use a DOM node to safely escape text */
  function safeText(str) {
    var d = document.createElement('span');
    d.textContent = str;
    return d.innerHTML;
  }

  /* ── Button state ────────────────────────────────────── */
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
      label.textContent = 'Listen to This Section';
      btn.setAttribute('aria-label', 'Read this paragraph aloud');
    }
  }

  window.addEventListener('beforeunload', function () {
    window.speechSynthesis.cancel();
  });

})();
