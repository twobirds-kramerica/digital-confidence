/* ============================================================================
   DCC v2 — Wizard controller (S-DCC-V2 Phase 4)
   ----------------------------------------------------------------------------
   Pure vanilla JS. No dependencies. Works offline via inline fallback.

   Responsibilities:
     - Parse ?module= + ?lang= URL params (defaults: module-1, en)
     - Fetch data/<moduleId>/<lang>.json; fall back to inline <script type=
       "application/json" id="wizard-fallback-*"> blocks if fetch fails
     - Render screens by type: orientation, content, summary
     - Back / Continue navigation with hash routing (#step-N) + browser
       back/forward support
     - Progress text "Step X of N"
     - Module-map dialog with jump-to-step
     - Help dialog (content inlined in HTML; wizard.js just opens/closes)
     - Language toggle (EN <-> FR) preserves current step + module
     - localStorage persistence: current step per moduleId, chosen language
     - Summary screen: certificate-name input + button (calls certificate.js
       which defines window.dccCertificate.generate(moduleTitle, name))
   ============================================================================ */

(function () {
  'use strict';

  var DEFAULT_MODULE = 'module-1';
  var DEFAULT_LANG = 'en';
  var LS_LANG = 'dcc-language';
  var LS_PROGRESS = function (mid) { return 'dcc-progress-' + mid; };

  /** State. */
  var state = {
    moduleId: DEFAULT_MODULE,
    language: DEFAULT_LANG,
    data: null,      // loaded module JSON
    currentStep: 0,  // 0-based
  };

  /** DOM refs. Populated in init(). */
  var dom = {};

  // ---------- URL / storage ----------

  function parseQuery() {
    var qs = window.location.search.replace(/^\?/, '');
    var out = {};
    qs.split('&').forEach(function (pair) {
      if (!pair) return;
      var kv = pair.split('=');
      out[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || '');
    });
    return out;
  }

  function parseStepFromHash() {
    var m = /^#step-(\d+)$/.exec(window.location.hash || '');
    if (!m || !state.data) return 0;
    var n = parseInt(m[1], 10) - 1;
    if (isNaN(n) || n < 0 || n >= state.data.screens.length) return 0;
    return n;
  }

  function storageGet(key, fallback) {
    try { return window.localStorage.getItem(key) || fallback; }
    catch (e) { return fallback; }
  }

  function storageSet(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* ignore */ }
  }

  // ---------- Data loading ----------

  function loadFallback(moduleId, lang) {
    var id = 'wizard-fallback-' + moduleId + '-' + lang;
    var el = document.getElementById(id);
    if (!el) return null;
    try { return JSON.parse(el.textContent); }
    catch (e) { return null; }
  }

  function loadModule(moduleId, lang, done) {
    var url = 'data/' + moduleId + '/' + lang + '.json';
    var fetched = false;
    try {
      if (typeof window.fetch === 'function' && window.location.protocol !== 'file:') {
        window.fetch(url, { credentials: 'same-origin' })
          .then(function (resp) {
            if (!resp.ok) throw new Error('HTTP ' + resp.status);
            return resp.json();
          })
          .then(function (json) { fetched = true; done(json, null); })
          .catch(function (err) {
            if (fetched) return;
            var fb = loadFallback(moduleId, lang);
            if (fb) done(fb, 'fetch failed, used inline fallback');
            else done(null, 'fetch failed: ' + err.message + ' (no fallback)');
          });
        return;
      }
    } catch (e) { /* fall through */ }
    var fb = loadFallback(moduleId, lang);
    if (fb) done(fb, 'fetch unavailable, used inline fallback');
    else done(null, 'fetch unavailable; no fallback available');
  }

  // ---------- Rendering ----------

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'class') node.className = attrs[k];
        else if (k === 'text') node.textContent = attrs[k];
        else if (k === 'html') node.innerHTML = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    if (children) {
      children.forEach(function (c) {
        if (c) node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
      });
    }
    return node;
  }

  function renderOrientation(screen) {
    var nodes = [];
    nodes.push(el('h1', { text: screen.heading, tabindex: '-1' }));
    if (screen.reassurance) {
      nodes.push(el('p', { class: 'wizard-reassurance', text: screen.reassurance }));
    }
    if (screen.goal) {
      nodes.push(el('p', { class: 'wizard-goal', text: screen.goal }));
    }
    if (screen.timeEstimate) {
      nodes.push(el('p', { class: 'wizard-time-estimate', text: screen.timeEstimate }));
    }
    return nodes;
  }

  function renderContent(screen) {
    var nodes = [];
    nodes.push(el('h1', { text: screen.heading, tabindex: '-1' }));
    (screen.body || []).forEach(function (p) {
      nodes.push(el('p', { text: p }));
    });
    if (screen.tellMeMore) {
      var summaryText = state.language === 'fr' ? 'En savoir plus' : 'Tell me more';
      var details = el('details', null, [
        el('summary', { text: summaryText }),
        el('p', { text: screen.tellMeMore }),
      ]);
      nodes.push(details);
    }
    return nodes;
  }

  function renderSummary(screen) {
    var nodes = [];
    nodes.push(el('h1', { text: screen.heading, tabindex: '-1' }));
    if (screen.takeaways && screen.takeaways.length) {
      var ul = el('ul', { class: 'wizard-summary-takeaways' });
      screen.takeaways.forEach(function (t) {
        ul.appendChild(el('li', { text: t }));
      });
      nodes.push(ul);
    }
    if (screen.confidence) {
      nodes.push(el('p', { class: 'wizard-summary-confidence', text: screen.confidence }));
    }
    var certLabelText = state.language === 'fr'
      ? 'Entrez votre nom pour votre certificat (optionnel)'
      : 'Enter your name for your certificate (optional)';
    var certBtnText = state.language === 'fr' ? 'Télécharger mon certificat' : 'Download my certificate';
    var certLabel = el('label', { class: 'wizard-cert-label' }, [
      document.createTextNode(certLabelText),
      el('input', {
        type: 'text',
        class: 'wizard-cert-input',
        'data-wizard-cert-input': '',
        placeholder: state.language === 'fr' ? 'Votre nom' : 'Your name',
        autocomplete: 'name',
      }),
    ]);
    var certBtn = el('button', {
      type: 'button',
      class: 'wizard-btn wizard-btn-primary',
      'data-wizard-cert-btn': '',
      text: certBtnText,
    });
    nodes.push(certLabel);
    nodes.push(certBtn);
    return nodes;
  }

  function renderScreen() {
    if (!state.data) return;
    var screen = state.data.screens[state.currentStep];
    if (!screen) return;

    // Clear body
    while (dom.body.firstChild) dom.body.removeChild(dom.body.firstChild);

    var rendered;
    if (screen.type === 'orientation') rendered = renderOrientation(screen);
    else if (screen.type === 'summary') rendered = renderSummary(screen);
    else rendered = renderContent(screen);

    rendered.forEach(function (n) { dom.body.appendChild(n); });

    // Progress
    dom.progress.textContent = (state.language === 'fr' ? 'Étape ' : 'Step ')
      + (state.currentStep + 1)
      + (state.language === 'fr' ? ' de ' : ' of ')
      + state.data.screens.length;

    // Footer buttons
    var isFirst = state.currentStep === 0;
    var isLast = state.currentStep === state.data.screens.length - 1;

    if (isFirst && screen.type === 'orientation') {
      dom.back.hidden = true;
      dom.footer.setAttribute('data-align', 'end');
    } else {
      dom.back.hidden = false;
      dom.back.textContent = state.language === 'fr' ? 'Retour' : 'Go back';
      dom.footer.removeAttribute('data-align');
    }

    if (isLast && screen.type === 'summary') {
      // Summary has its own certificate button; hide Continue
      dom.next.hidden = true;
    } else if (isFirst && screen.type === 'orientation') {
      dom.next.hidden = false;
      dom.next.textContent = state.language === 'fr' ? 'Commencer' : 'Start';
    } else if (isLast) {
      dom.next.hidden = false;
      dom.next.textContent = state.language === 'fr' ? 'Terminé' : 'Finish';
    } else {
      dom.next.hidden = false;
      dom.next.textContent = state.language === 'fr' ? 'Continuer' : 'Continue';
    }

    // Language toggle label shows the OTHER language (what you switch to)
    dom.langBtn.textContent = state.language === 'fr' ? 'EN' : 'FR';
    dom.langBtn.setAttribute('aria-label',
      state.language === 'fr' ? 'Switch to English' : 'Passer au français');

    // Move focus to heading
    var h1 = dom.body.querySelector('h1');
    if (h1) {
      try { h1.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
    }

    // Update map highlighting if open
    renderMap();

    // Persist progress + language
    storageSet(LS_PROGRESS(state.moduleId), String(state.currentStep));
    storageSet(LS_LANG, state.language);
  }

  function renderMap() {
    if (!state.data) return;
    dom.mapList.innerHTML = '';
    state.data.screens.forEach(function (s, i) {
      var li = el('li', { class: 'wizard-map-item' });
      var btn = el('button', {
        type: 'button',
        class: 'wizard-map-link',
        'data-wizard-step-jump': String(i),
      }, [
        el('span', { class: 'wizard-map-number', text: String(i + 1) }),
        el('span', { class: 'wizard-map-label', text: s.heading || '(step ' + (i + 1) + ')' }),
      ]);
      if (i === state.currentStep) btn.setAttribute('aria-current', 'step');
      li.appendChild(btn);
      dom.mapList.appendChild(li);
    });
  }

  // ---------- Navigation ----------

  function goTo(i) {
    if (!state.data) return;
    if (i < 0 || i >= state.data.screens.length) return;
    state.currentStep = i;
    var newHash = '#step-' + (i + 1);
    if (window.location.hash !== newHash) {
      try { window.history.pushState({ step: i }, '', newHash); }
      catch (e) { window.location.hash = newHash; }
    }
    renderScreen();
  }

  function next() { goTo(state.currentStep + 1); }
  function back() { goTo(state.currentStep - 1); }

  // ---------- Dialogs ----------

  function openDialog(dialog) {
    if (!dialog) return;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  }

  function closeDialog(dialog) {
    if (!dialog) return;
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  }

  // ---------- Init ----------

  function init() {
    // Parse params
    var q = parseQuery();
    state.moduleId = q.module || DEFAULT_MODULE;
    state.language = q.lang || storageGet(LS_LANG, DEFAULT_LANG);
    if (state.language !== 'en' && state.language !== 'fr') state.language = DEFAULT_LANG;

    // DOM refs
    dom.body = document.querySelector('[data-wizard-body]');
    dom.footer = document.querySelector('[data-wizard-footer]');
    dom.back = document.querySelector('[data-wizard-back]');
    dom.next = document.querySelector('[data-wizard-next]');
    dom.progress = document.querySelector('[data-wizard-progress]');
    dom.mapBtn = document.querySelector('[data-wizard-map]');
    dom.helpBtn = document.querySelector('[data-wizard-help]');
    dom.langBtn = document.querySelector('[data-wizard-lang]');
    dom.mapDialog = document.querySelector('[data-wizard-mapdialog]');
    dom.mapList = document.querySelector('[data-wizard-map-list]');
    dom.mapClose = document.querySelector('[data-wizard-mapdialog-close]');
    dom.helpDialog = document.querySelector('[data-wizard-helpdialog]');
    dom.helpClose = document.querySelector('[data-wizard-helpdialog-close]');

    // Load module
    loadModule(state.moduleId, state.language, function (data, note) {
      if (!data) {
        // Critical failure — show error, keep app usable
        dom.body.innerHTML = '';
        dom.body.appendChild(el('h1', { text: 'Could not load this module' }));
        dom.body.appendChild(el('p', { text: 'Please return to the module menu and try again.' }));
        if (note) dom.body.appendChild(el('p', { class: 'wizard-time-estimate', text: note }));
        dom.back.hidden = true;
        dom.next.hidden = true;
        return;
      }
      state.data = data;
      // Restore progress
      var savedStep = parseInt(storageGet(LS_PROGRESS(state.moduleId), '0'), 10);
      var hashStep = parseStepFromHash();
      state.currentStep = hashStep || (isNaN(savedStep) ? 0 : savedStep);
      if (state.currentStep < 0 || state.currentStep >= state.data.screens.length) state.currentStep = 0;
      renderScreen();
    });

    // Wire buttons
    dom.back.addEventListener('click', back);
    dom.next.addEventListener('click', next);

    dom.mapBtn.addEventListener('click', function () {
      renderMap();
      openDialog(dom.mapDialog);
    });
    if (dom.mapClose) dom.mapClose.addEventListener('click', function () { closeDialog(dom.mapDialog); });
    if (dom.mapDialog) dom.mapDialog.addEventListener('click', function (e) {
      if (e.target === dom.mapDialog) closeDialog(dom.mapDialog);
    });
    if (dom.mapList) dom.mapList.addEventListener('click', function (e) {
      var t = e.target.closest('[data-wizard-step-jump]');
      if (!t) return;
      var idx = parseInt(t.getAttribute('data-wizard-step-jump'), 10);
      if (!isNaN(idx)) {
        goTo(idx);
        closeDialog(dom.mapDialog);
      }
    });

    dom.helpBtn.addEventListener('click', function () { openDialog(dom.helpDialog); });
    if (dom.helpClose) dom.helpClose.addEventListener('click', function () { closeDialog(dom.helpDialog); });
    if (dom.helpDialog) dom.helpDialog.addEventListener('click', function (e) {
      if (e.target === dom.helpDialog) closeDialog(dom.helpDialog);
    });

    // Language toggle: switches, reloads module in target language, preserves step
    dom.langBtn.addEventListener('click', function () {
      var newLang = state.language === 'en' ? 'fr' : 'en';
      var savedStep = state.currentStep;
      loadModule(state.moduleId, newLang, function (data, note) {
        if (!data) {
          // Fallback: keep current language, alert via footer state
          alert(state.language === 'fr'
            ? 'Traduction anglaise indisponible pour ce module.'
            : 'French translation not available for this module yet.');
          return;
        }
        state.language = newLang;
        state.data = data;
        // Clamp step to new length
        if (savedStep >= state.data.screens.length) savedStep = state.data.screens.length - 1;
        state.currentStep = savedStep;
        // Update <html lang=...>
        document.documentElement.setAttribute('lang', newLang === 'fr' ? 'fr-CA' : 'en-CA');
        renderScreen();
      });
    });

    // Certificate button (delegated because summary screen is dynamic)
    dom.body.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-wizard-cert-btn]');
      if (!btn) return;
      var input = dom.body.querySelector('[data-wizard-cert-input]');
      var name = input ? (input.value || '').trim() : '';
      if (window.dccCertificate && typeof window.dccCertificate.generate === 'function') {
        window.dccCertificate.generate({
          moduleTitle: state.data.title,
          learnerName: name,
          language: state.language,
        });
      } else {
        alert(state.language === 'fr'
          ? 'La génération du certificat est indisponible.'
          : 'Certificate generation is unavailable.');
      }
    });

    // Browser back/forward
    window.addEventListener('popstate', function () {
      var hashStep = parseStepFromHash();
      state.currentStep = hashStep;
      renderScreen();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
