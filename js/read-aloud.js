/* ============================================================
   DCC — Page-level Read-Aloud button (S-030)
   Auto-inserts a "Read this page aloud" control after the <h1>
   of the module page. Delegates to speech-config.js for actual
   synthesis. Reads main content, skipping nav / footer / controls.
   ============================================================ */

(function () {
  'use strict';

  /* Only auto-inject on module pages. Module pages have <main id="main">
     with the first <h1> inside it. Skip if already injected. */
  function init() {
    if (!('speechSynthesis' in window)) return;

    var main = document.querySelector('main#main, main.main-content');
    if (!main) return;
    if (main.querySelector('.read-aloud-page')) return;

    var h1 = main.querySelector('h1');
    if (!h1) return;

    var wrapper = document.createElement('div');
    wrapper.className = 'read-aloud-page';

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'read-aloud-page-btn';
    btn.setAttribute('aria-label', 'Read this page aloud');
    btn.setAttribute('aria-pressed', 'false');
    btn.innerHTML =
      '<span class="read-aloud-icon" aria-hidden="true">▶️</span> ' +
      '<span class="read-aloud-label">Read this page aloud</span>';

    var hint = document.createElement('span');
    hint.className = 'read-aloud-page-hint';
    hint.textContent = 'Click once to listen. Click again to stop.';

    wrapper.appendChild(btn);
    wrapper.appendChild(hint);

    if (h1.nextSibling) {
      h1.parentNode.insertBefore(wrapper, h1.nextSibling);
    } else {
      h1.parentNode.appendChild(wrapper);
    }

    btn.addEventListener('click', function () {
      toggle(btn, main);
    });

    /* If the user navigates away, stop speech to avoid hang. */
    window.addEventListener('beforeunload', function () {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    });
  }

  /* Build a virtual element containing the readable content of the
     main region, stripping nav, footer, controls, and hidden content.
     Returns the element used by dcToggleReadAloud — we use a detached
     clone so highlight rewrites don't disturb the live DOM. */
  function buildReadable(main) {
    var clone = main.cloneNode(true);

    /* Strip things we don't want read aloud. */
    var strip = clone.querySelectorAll(
      '.read-aloud-page, .read-aloud-controls, .read-aloud-btn, ' +
      'nav, aside, footer, script, style, noscript, ' +
      '[hidden], [aria-hidden="true"], .sr-only, ' +
      '.help-button, .panic-button, .welcome-splash, ' +
      '.module-progress-dots, .check-in-banner, .kbd-help'
    );
    for (var i = 0; i < strip.length; i++) {
      if (strip[i].parentNode) strip[i].parentNode.removeChild(strip[i]);
    }

    /* Create a floating container so highlight rewrites land here,
       not in the actual page DOM. */
    var holder = document.createElement('div');
    holder.className = 'read-aloud-virtual';
    holder.style.display = 'none';
    holder.innerHTML = clone.innerHTML;
    document.body.appendChild(holder);
    return holder;
  }

  function toggle(btn, main) {
    if (!window.speechSynthesis) return;

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      resetBtn(btn);
      clearHolder();
      return;
    }

    var readable = buildReadable(main);
    var text = readable.textContent.replace(/\s+/g, ' ').trim();
    if (!text) { resetBtn(btn); clearHolder(); return; }

    var utter = new SpeechSynthesisUtterance(text);
    if (typeof VOICE_CONFIG !== 'undefined' && VOICE_CONFIG.primaryVoice) {
      utter.voice = VOICE_CONFIG.primaryVoice;
      utter.rate  = VOICE_CONFIG.defaultRate || 1.0;
      utter.pitch = VOICE_CONFIG.pitch || 1.0;
      utter.volume = VOICE_CONFIG.volume || 1.0;
    } else {
      utter.rate = parseFloat(localStorage.getItem('dc-speech-speed') || '1.0');
    }

    utter.onstart = function () {
      btn.classList.add('playing');
      btn.setAttribute('aria-pressed', 'true');
      var icon  = btn.querySelector('.read-aloud-icon');
      var label = btn.querySelector('.read-aloud-label');
      if (icon)  icon.textContent  = '⏹️';
      if (label) label.textContent = 'Stop reading';
    };

    var clearAll = function () {
      resetBtn(btn);
      clearHolder();
    };
    utter.onend = clearAll;
    utter.onerror = clearAll;

    /* Prime speech if voices haven't loaded yet. */
    if (!window.speechSynthesis.getVoices().length) {
      setTimeout(function () {
        try { window.speechSynthesis.speak(utter); } catch (e) { clearAll(); }
      }, 150);
    } else {
      window.speechSynthesis.speak(utter);
    }
  }

  function resetBtn(btn) {
    btn.classList.remove('playing');
    btn.setAttribute('aria-pressed', 'false');
    var icon  = btn.querySelector('.read-aloud-icon');
    var label = btn.querySelector('.read-aloud-label');
    if (icon)  icon.textContent  = '▶️';
    if (label) label.textContent = 'Read this page aloud';
  }

  function clearHolder() {
    var h = document.querySelector('.read-aloud-virtual');
    if (h && h.parentNode) h.parentNode.removeChild(h);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
