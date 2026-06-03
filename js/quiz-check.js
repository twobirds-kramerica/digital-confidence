/**
 * DCC Knowledge Check — pre/post quiz framework
 * Stores results in localStorage. No personal data.
 * Powers outcome reporting for grant compliance (AI for All, NHSP).
 *
 * Usage: include this script on any module page.
 * The module must have data-module-id attribute on <body> or call
 * DCC_QUIZ.init({ moduleId, questions, beforeContainerId, afterContainerId })
 */
(function() {
  'use strict';

  var STORAGE_KEY = 'dcc_quiz_results';

  // ── Load / save ─────────────────────────────────────────────────
  function loadResults() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
    catch(e) { return {}; }
  }
  function saveResults(all) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(all)); }
    catch(e) {}
  }
  function getModuleResults(moduleId) {
    return loadResults()[moduleId] || {};
  }
  function saveModuleResults(moduleId, data) {
    var all = loadResults();
    all[moduleId] = Object.assign(all[moduleId] || {}, data);
    saveResults(all);
  }

  // ── Score ────────────────────────────────────────────────────────
  function scoreAnswers(questions, answers) {
    var correct = 0;
    questions.forEach(function(q, i) {
      if (answers[i] !== undefined && answers[i] === q.correct) correct++;
    });
    return correct;
  }

  // ── Render quiz ──────────────────────────────────────────────────
  function renderQuiz(opts) {
    // opts: { containerId, phase, moduleId, questions, onComplete }
    var container = document.getElementById(opts.containerId);
    if (!container) return;

    var prefix = opts.moduleId + '_' + opts.phase;
    var heading = opts.phase === 'before'
      ? 'Quick Check — Before We Start'
      : 'Quick Check — What Did You Learn?';
    var subtext = opts.phase === 'before'
      ? 'No right or wrong — just see where you are starting from. 5 questions.'
      : 'Same questions. Let\'s see what changed. 5 questions.';

    var html = '<div class="dcc-quiz" id="dcc-quiz-' + opts.phase + '" data-phase="' + opts.phase + '">'
      + '<div class="dcc-quiz-header">'
      + '<h3 class="dcc-quiz-title">' + heading + '</h3>'
      + '<p class="dcc-quiz-sub">' + subtext + '</p>'
      + '</div>'
      + '<form class="dcc-quiz-form" id="dcc-quiz-form-' + opts.phase + '">';

    // Record start time on before-quiz render
    if (opts.phase === 'before') {
      var existing = getModuleResults(opts.moduleId);
      if (!existing.startTime) saveModuleResults(opts.moduleId, { startTime: new Date().toISOString() });
    }

    opts.questions.forEach(function(q, i) {
      var qId = prefix + '_q' + i;
      // Use phase-specific wording if provided, else fallback to default
      var questionText = (opts.phase === 'after' && q.text_after) ? q.text_after : q.text;
      html += '<div class="dcc-quiz-question" role="group" aria-labelledby="ql-' + qId + '">'
        + '<p class="dcc-quiz-qtext" id="ql-' + qId + '"><span class="dcc-quiz-qnum">' + (i+1) + '</span> ' + questionText + '</p>'
        + '<div class="dcc-quiz-options">';
      q.options.forEach(function(opt, oi) {
        var optId = qId + '_o' + oi;
        html += '<label class="dcc-quiz-opt" for="' + optId + '">'
          + '<input type="radio" id="' + optId + '" name="' + qId + '" value="' + oi + '">'
          + '<span class="dcc-quiz-opt-text">' + opt + '</span>'
          + '</label>';
      });
      html += '</div></div>';
    });

    // Confidence slider
    var confId = prefix + '_conf';
    html += '<div class="dcc-quiz-confidence">'
      + '<label class="dcc-quiz-conf-label" for="' + confId + '">'
      + (opts.phase === 'before'
          ? 'How confident are you with technology right now?'
          : 'How confident do you feel about using AI tools after this module?')
      + '</label>'
      + '<div class="dcc-quiz-conf-row">'
      + '<span class="dcc-conf-min">Not confident</span>'
      + '<input type="range" id="' + confId + '" class="dcc-conf-slider" min="1" max="5" value="3" step="1" aria-label="Confidence level 1 to 5">'
      + '<span class="dcc-conf-max">Very confident</span>'
      + '</div>'
      + '<div class="dcc-conf-value" id="' + confId + '_display" aria-live="polite">3 / 5</div>'
      + '</div>';

    // Surprise field (optional, after quiz only)
    if (opts.phase === 'after') {
      html += '<div class="dcc-quiz-surprise">'
        + '<label class="dcc-quiz-surprise-label" for="' + prefix + '_surprise">What surprised you? (optional)</label>'
        + '<textarea id="' + prefix + '_surprise" class="dcc-quiz-surprise-input" rows="2" placeholder="Any answer, feeling, or reaction you want to note…" maxlength="500"></textarea>'
        + '</div>';
    }

    html += '<button type="submit" class="dcc-quiz-submit btn-primary">Submit answers →</button>'
      + '<div class="dcc-quiz-result hidden" id="dcc-quiz-result-' + opts.phase + '" role="alert" aria-live="polite"></div>'
      + '</form>'
      + '</div>';

    container.innerHTML = html;

    // Wire confidence slider display
    var slider = document.getElementById(confId);
    var display = document.getElementById(confId + '_display');
    if (slider && display) {
      slider.addEventListener('input', function() {
        display.textContent = slider.value + ' / 5';
      });
    }

    // Wire form submit
    var form = document.getElementById('dcc-quiz-form-' + opts.phase);
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        var answers = {};
        var allAnswered = true;
        opts.questions.forEach(function(q, i) {
          var qId = prefix + '_q' + i;
          var selected = form.querySelector('input[name="' + qId + '"]:checked');
          if (selected) { answers[i] = parseInt(selected.value, 10); }
          else { allAnswered = false; }
        });
        if (!allAnswered) {
          var resultEl = document.getElementById('dcc-quiz-result-' + opts.phase);
          if (resultEl) { resultEl.classList.remove('hidden'); resultEl.textContent = 'Please answer all 5 questions before submitting.'; resultEl.style.color = 'var(--color-red, #c0392b)'; }
          return;
        }
        var score = scoreAnswers(opts.questions, answers);
        var conf = slider ? parseInt(slider.value, 10) : 3;
        var surprise = opts.phase === 'after' ? (document.getElementById(prefix + '_surprise')?.value || '') : '';
        var timestamp = new Date().toISOString();
        var record = { answers: answers, score: score, confidence: conf, timestamp: timestamp };
        if (opts.phase === 'after') { record.endTime = timestamp; }
        if (surprise) record.surprise = surprise;

        // Save to localStorage
        var saveData = {};
        saveData[opts.phase] = record;
        saveModuleResults(opts.moduleId, saveData);

        // Calculate delta if both phases exist
        var allResults = getModuleResults(opts.moduleId);
        var resultEl = document.getElementById('dcc-quiz-result-' + opts.phase);

        if (opts.phase === 'before') {
          showBeforeResult(resultEl, score, conf, opts.questions.length);
        } else {
          var beforeScore = allResults.before ? allResults.before.score : null;
          var beforeConf  = allResults.before ? allResults.before.confidence : null;
          showAfterResult(resultEl, score, conf, beforeScore, beforeConf, opts.questions.length);
        }

        // Hide the form, show result
        form.style.display = 'none';
        resultEl.classList.remove('hidden');

        if (opts.onComplete) opts.onComplete(record);
      });
    }
  }

  function showBeforeResult(el, score, conf, total) {
    el.style.color = '';
    el.innerHTML = '<div class="dcc-quiz-done">'
      + '<span class="dcc-quiz-done-icon" aria-hidden="true">✅</span>'
      + '<p><strong>Recorded — ' + score + ' of ' + total + ' correct</strong></p>'
      + '<p style="font-size:0.9em;color:var(--color-text-light,#7A6E62)">This is your starting point. Complete the module, then take the quick check at the end to see how much you\'ve learned.</p>'
      + '</div>';
  }

  function showAfterResult(el, score, conf, beforeScore, beforeConf, total) {
    el.style.color = '';
    var deltaScore = (beforeScore !== null) ? (score - beforeScore) : null;
    var deltaConf  = (beforeConf  !== null) ? (conf - beforeConf)   : null;
    var message = score >= 4 ? 'Excellent — you\'ve got this!'
      : score >= 3 ? 'Good progress — review the sections that tripped you up.'
      : 'Keep going — try reviewing the module again at your own pace.';
    var deltaHtml = '';
    if (deltaScore !== null) {
      var sign = deltaScore >= 0 ? '+' : '';
      deltaHtml = '<p class="dcc-quiz-delta">Knowledge gain: <strong>' + sign + deltaScore + ' point' + (Math.abs(deltaScore) !== 1 ? 's' : '') + '</strong>';
      if (deltaConf !== null) {
        var csign = deltaConf >= 0 ? '+' : '';
        deltaHtml += ' &nbsp;|&nbsp; Confidence: <strong>' + csign + deltaConf + '</strong>';
      }
      deltaHtml += '</p>';
    }
    el.innerHTML = '<div class="dcc-quiz-done">'
      + '<span class="dcc-quiz-done-icon" aria-hidden="true">🎉</span>'
      + '<p><strong>' + score + ' of ' + total + ' correct.</strong> ' + message + '</p>'
      + deltaHtml
      + '<p style="font-size:0.85em;color:var(--color-text-light,#7A6E62);margin-top:0.5rem">Your result is saved in this browser. <a href="../resources/beta-feedback.html" style="color:var(--color-primary,#2A7B6F)">Submit your feedback →</a></p>'
      + '</div>';
  }

  // ── Admin: export all module data as CSV row ─────────────────────
  function getExportRow(moduleId, moduleLabel) {
    var r = getModuleResults(moduleId);
    var before = r.before || {};
    var after  = r.after  || {};
    var deltaScore = (before.score !== undefined && after.score !== undefined)
      ? (after.score - before.score) : '';
    var deltaConf  = (before.confidence !== undefined && after.confidence !== undefined)
      ? (after.confidence - before.confidence) : '';
    return [
      moduleLabel,
      before.timestamp ? before.timestamp.slice(0, 10) : '',
      typeof before.score  === 'number' ? before.score  : '',
      typeof after.score   === 'number' ? after.score   : '',
      deltaScore,
      typeof before.confidence === 'number' ? before.confidence : '',
      typeof after.confidence  === 'number' ? after.confidence  : '',
      deltaConf,
      after.surprise ? '"' + after.surprise.replace(/"/g, '""') + '"' : ''
    ].join(',');
  }

  function exportAllCSV() {
    var all = loadResults();
    var header = 'Module,Date,Before Score,After Score,Delta Score,Before Confidence,After Confidence,Delta Confidence,Surprise';
    var rows = Object.keys(all).map(function(id) { return getExportRow(id, id); });
    return header + '\n' + rows.join('\n');
  }

  // ── Public API ───────────────────────────────────────────────────
  window.DCC_QUIZ = {
    init: function(opts) {
      // opts: { moduleId, questions, beforeContainerId, afterContainerId }
      if (opts.beforeContainerId) {
        renderQuiz({ containerId: opts.beforeContainerId, phase: 'before', moduleId: opts.moduleId, questions: opts.questions });
      }
      if (opts.afterContainerId) {
        renderQuiz({ containerId: opts.afterContainerId, phase: 'after', moduleId: opts.moduleId, questions: opts.questions });
      }
    },
    getModuleResults: getModuleResults,
    exportAllCSV: exportAllCSV,
    getExportRow: getExportRow
  };
})();
