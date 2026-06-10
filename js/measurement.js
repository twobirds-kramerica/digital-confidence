/* =============================================================
   Digital Confidence Centre — Pre/Post Measurement System
   Exposes window.DCC_QUIZ.init(options)

   options: {
     moduleId         — unique key (e.g. 'module-ai-literacy')
     questions        — array of { text, text_after, options[], correct }
     beforeContainerId
     afterContainerId
   }

   localStorage key: dcc-msr-{moduleId}
   Stored: { beforeScore, afterScore, confidenceBefore, confidenceAfter,
             surprise, beforeDone, afterDone, beforeSkipped,
             beforeAt, afterAt }
   ============================================================= */
(function () {
  'use strict';

  var KEY_PREFIX = 'dcc-msr-';

  function load(id) {
    try { return JSON.parse(localStorage.getItem(KEY_PREFIX + id) || '{}'); }
    catch (e) { return {}; }
  }

  function save(id, state) {
    try { localStorage.setItem(KEY_PREFIX + id, JSON.stringify(state)); }
    catch (e) {}
  }

  /* ── Before-quiz ─────────────────────────────────────────── */
  function renderBefore(el, questions, moduleId, state) {
    if (state.beforeDone) {
      if (!state.beforeSkipped) {
        el.innerHTML = '<div class="dcc-msr-done">&#10003; Pre-check recorded &#8212; complete the module to see your results.</div>';
      }
      return;
    }

    var html = '<div class="dcc-msr-card" role="form" aria-label="Knowledge check before the module">'
      + '<div class="dcc-msr-header">'
      + '<span class="dcc-msr-badge">&#128203; Before You Start</span>'
      + '<h2 class="dcc-msr-title">Quick Knowledge Check</h2>'
      + '<p class="dcc-msr-desc">No marks, no pressure &#8212; your answers help measure what you learn.</p>'
      + '</div>';

    questions.forEach(function (q, i) {
      html += '<div class="dcc-msr-question">'
        + '<p class="dcc-msr-qtext"><strong>' + (i + 1) + '.</strong> ' + q.text + '</p>'
        + '<div class="dcc-msr-options" role="radiogroup" aria-label="Question ' + (i + 1) + '">';
      q.options.forEach(function (opt, j) {
        var id = 'dcc-msr-b-' + i + '-' + j;
        html += '<label class="dcc-msr-option" for="' + id + '">'
          + '<input type="radio" name="dcc-msr-b-q' + i + '" id="' + id + '" value="' + j + '">'
          + '<span>' + opt + '</span>'
          + '</label>';
      });
      html += '</div></div>';
    });

    html += '<div class="dcc-msr-confidence">'
      + '<label for="dcc-msr-conf-b" class="dcc-msr-conf-label">How confident are you about this topic <em>right now</em>?</label>'
      + '<div class="dcc-msr-conf-row">'
      + '<span class="dcc-msr-conf-lo">Not at all</span>'
      + '<input type="range" id="dcc-msr-conf-b" min="1" max="5" value="3" class="dcc-msr-slider" aria-valuemin="1" aria-valuemax="5" aria-valuenow="3">'
      + '<span class="dcc-msr-conf-hi">Very confident</span>'
      + '</div>'
      + '<p class="dcc-msr-conf-val" aria-live="polite">Your selection: <strong id="dcc-msr-conf-b-val">3 / 5</strong></p>'
      + '</div>'

      + '<div class="dcc-msr-actions">'
      + '<button class="dcc-msr-btn dcc-msr-btn-primary" id="dcc-msr-sub-b" type="button">Submit &amp; Start Module &#8595;</button>'
      + '<button class="dcc-msr-btn dcc-msr-btn-skip" id="dcc-msr-skip-b" type="button">Skip this check</button>'
      + '</div>'
      + '</div>';

    el.innerHTML = html;

    var slider = el.querySelector('#dcc-msr-conf-b');
    var valEl  = el.querySelector('#dcc-msr-conf-b-val');
    slider.addEventListener('input', function () {
      valEl.textContent = slider.value + ' / 5';
      slider.setAttribute('aria-valuenow', slider.value);
    });

    el.querySelector('#dcc-msr-sub-b').addEventListener('click', function () {
      var score = 0;
      var ok = true;
      questions.forEach(function (q, i) {
        var sel = el.querySelector('input[name="dcc-msr-b-q' + i + '"]:checked');
        if (!sel) { ok = false; return; }
        if (parseInt(sel.value, 10) === q.correct) score++;
      });
      if (!ok) { showWarn(el, 'Please answer all 5 questions before submitting.'); return; }
      var st = load(moduleId);
      st.beforeScore = score; st.confidenceBefore = parseInt(slider.value, 10);
      st.beforeDone = true; st.beforeAt = Date.now();
      save(moduleId, st);
      el.innerHTML = '<div class="dcc-msr-done">&#10003; Recorded! Baseline score: <strong>' + score + '/5</strong>. Finish the module to see your results.</div>';
    });

    el.querySelector('#dcc-msr-skip-b').addEventListener('click', function () {
      var st = load(moduleId);
      st.beforeDone = true; st.beforeSkipped = true;
      save(moduleId, st);
      el.innerHTML = '';
    });
  }

  /* ── After-quiz ──────────────────────────────────────────── */
  function renderAfter(el, questions, moduleId, state) {
    if (state.afterDone) {
      el.innerHTML = buildResultHTML(state);
      return;
    }

    var html = '<div class="dcc-msr-card dcc-msr-after-card" role="form" aria-label="Knowledge check after the module">'
      + '<div class="dcc-msr-header">'
      + '<span class="dcc-msr-badge dcc-msr-badge-after">&#127919; Module Complete!</span>'
      + '<h2 class="dcc-msr-title">Final Knowledge Check</h2>'
      + '<p class="dcc-msr-desc">Same questions as before &#8212; see what you\'ve learned.</p>'
      + '</div>';

    questions.forEach(function (q, i) {
      html += '<div class="dcc-msr-question">'
        + '<p class="dcc-msr-qtext"><strong>' + (i + 1) + '.</strong> ' + (q.text_after || q.text) + '</p>'
        + '<div class="dcc-msr-options" role="radiogroup" aria-label="Question ' + (i + 1) + '">';
      q.options.forEach(function (opt, j) {
        var id = 'dcc-msr-a-' + i + '-' + j;
        html += '<label class="dcc-msr-option" for="' + id + '">'
          + '<input type="radio" name="dcc-msr-a-q' + i + '" id="' + id + '" value="' + j + '">'
          + '<span>' + opt + '</span>'
          + '</label>';
      });
      html += '</div></div>';
    });

    html += '<div class="dcc-msr-confidence">'
      + '<label for="dcc-msr-conf-a" class="dcc-msr-conf-label">How confident do you feel about this topic <em>now</em>?</label>'
      + '<div class="dcc-msr-conf-row">'
      + '<span class="dcc-msr-conf-lo">Not at all</span>'
      + '<input type="range" id="dcc-msr-conf-a" min="1" max="5" value="3" class="dcc-msr-slider" aria-valuemin="1" aria-valuemax="5" aria-valuenow="3">'
      + '<span class="dcc-msr-conf-hi">Very confident</span>'
      + '</div>'
      + '<p class="dcc-msr-conf-val" aria-live="polite">Your selection: <strong id="dcc-msr-conf-a-val">3 / 5</strong></p>'
      + '</div>'

      + '<div class="dcc-msr-surprise">'
      + '<label for="dcc-msr-surprise" class="dcc-msr-conf-label">What surprised you most in this module? <span class="dcc-msr-optional">(optional)</span></label>'
      + '<textarea id="dcc-msr-surprise" class="dcc-msr-textarea" rows="3" placeholder="Type anything that stood out&#8230;"></textarea>'
      + '</div>'

      + '<div class="dcc-msr-actions">'
      + '<button class="dcc-msr-btn dcc-msr-btn-primary" id="dcc-msr-sub-a" type="button">See My Results</button>'
      + '</div>'
      + '</div>';

    el.innerHTML = html;

    var slider = el.querySelector('#dcc-msr-conf-a');
    var valEl  = el.querySelector('#dcc-msr-conf-a-val');
    slider.addEventListener('input', function () {
      valEl.textContent = slider.value + ' / 5';
      slider.setAttribute('aria-valuenow', slider.value);
    });

    el.querySelector('#dcc-msr-sub-a').addEventListener('click', function () {
      var score = 0;
      var ok = true;
      questions.forEach(function (q, i) {
        var sel = el.querySelector('input[name="dcc-msr-a-q' + i + '"]:checked');
        if (!sel) { ok = false; return; }
        if (parseInt(sel.value, 10) === q.correct) score++;
      });
      if (!ok) { showWarn(el, 'Please answer all 5 questions before submitting.'); return; }
      var conf = parseInt(slider.value, 10);
      var surprise = (el.querySelector('#dcc-msr-surprise') || {}).value || '';
      var st = load(moduleId);
      st.afterScore = score; st.confidenceAfter = conf;
      st.surprise = surprise.trim(); st.afterDone = true; st.afterAt = Date.now();
      save(moduleId, st);
      el.innerHTML = buildResultHTML(st);
    });
  }

  /* ── Result card ─────────────────────────────────────────── */
  function buildResultHTML(st) {
    var bs = typeof st.beforeScore === 'number' ? st.beforeScore : null;
    var as = typeof st.afterScore === 'number'  ? st.afterScore  : null;
    var delta = (bs !== null && as !== null) ? (as - bs) : null;
    var deltaStr = delta !== null ? (delta >= 0 ? '+' + delta : String(delta)) : null;

    var html = '<div class="dcc-msr-result-card">'
      + '<div class="dcc-msr-result-hdr">&#127881; Well done &#8212; module complete!</div>';

    if (bs !== null && as !== null) {
      var deltaClass = delta > 0 ? 'dcc-msr-delta-pos' : delta < 0 ? 'dcc-msr-delta-neg' : 'dcc-msr-delta-zero';
      html += '<div class="dcc-msr-scores">'
        + '<div class="dcc-msr-score-box"><span class="dcc-msr-score-lbl">Before</span><span class="dcc-msr-score-num">' + bs + '/5</span></div>'
        + '<div class="dcc-msr-score-arrow" aria-hidden="true">&#8594;</div>'
        + '<div class="dcc-msr-score-box"><span class="dcc-msr-score-lbl">After</span><span class="dcc-msr-score-num dcc-msr-score-after">' + as + '/5</span></div>'
        + (deltaStr ? '<div class="dcc-msr-score-box ' + deltaClass + '"><span class="dcc-msr-score-lbl">Change</span><span class="dcc-msr-score-num">' + deltaStr + '</span></div>' : '')
        + '</div>';
    } else if (as !== null) {
      html += '<p class="dcc-msr-score-solo">Your score: <strong>' + as + '/5</strong></p>';
    }

    if (typeof st.confidenceBefore === 'number' && typeof st.confidenceAfter === 'number') {
      var cDelta = st.confidenceAfter - st.confidenceBefore;
      if (cDelta !== 0) {
        var cStr = cDelta > 0
          ? 'up ' + cDelta + ' point' + (cDelta > 1 ? 's' : '')
          : 'down ' + Math.abs(cDelta) + ' point' + (Math.abs(cDelta) > 1 ? 's' : '');
        html += '<p class="dcc-msr-conf-change">Confidence: ' + cStr
          + ' (' + st.confidenceBefore + '/5 &#8594; ' + st.confidenceAfter + '/5)</p>';
      }
    }

    html += '</div>';
    return html;
  }

  /* ── Helpers ─────────────────────────────────────────────── */
  function showWarn(el, msg) {
    var w = el.querySelector('.dcc-msr-warn');
    if (!w) {
      w = document.createElement('p');
      w.className = 'dcc-msr-warn';
      w.setAttribute('role', 'alert');
      var actions = el.querySelector('.dcc-msr-actions');
      if (actions) actions.parentNode.insertBefore(w, actions);
      else el.appendChild(w);
    }
    w.textContent = msg;
  }

  /* ── Public API ──────────────────────────────────────────── */
  window.DCC_QUIZ = {
    init: function (opts) {
      var mid  = opts.moduleId;
      var qs   = opts.questions;
      var bEl  = opts.beforeContainerId ? document.getElementById(opts.beforeContainerId) : null;
      var aEl  = opts.afterContainerId  ? document.getElementById(opts.afterContainerId)  : null;
      if (!mid || !qs || !qs.length) return;
      var st = load(mid);
      if (bEl) renderBefore(bEl, qs, mid, st);
      if (aEl) renderAfter(aEl,  qs, mid, st);
    }
  };
})();
