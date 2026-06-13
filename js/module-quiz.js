/* =============================================================
   Digital Confidence Centre — Module Quiz System
   5-question quiz at end of every module
   Pass score: 4/5
   Stores pass/fail per module in localStorage (dc-quiz-m[N]-passed)
   Also stores score for adaptive final quiz
   Questions loaded from /data/module-quizzes.json
   ============================================================= */
(function () {
  'use strict';

  /* ── Detect current module key from URL ─────────────────── */
  function getModKey() {
    var href = window.location.pathname;
    var file = href.split('/').pop().replace('.html', '');

    /* Named module files: module-16-travel-safety, etc. */
    var namedMap = {
      'module-2-5':                    '2.5',
      'module-16-travel-safety':       '16',
      'module-17-ai-research':         '17',
      'module-18-staying-connected':   '18',
      'module-19-digital-legacy':      '19'
    };
    if (namedMap[file]) return namedMap[file];

    /* Standard module-N pattern */
    var m = file.match(/^module-(\d+)$/);
    if (m) return m[1];

    return null;
  }

  var modKey = getModKey();
  if (!modKey) return;

  var isFr = (localStorage.getItem('dc-lang') || navigator.language || 'en')
    .toLowerCase().startsWith('fr');

  /* ── Bootstrap after DOM ready ──────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    fetch('data/module-quizzes.json')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var questions = data.modules && data.modules[modKey];
        if (!questions || questions.length === 0) return;

        /* Don't show if already passed */
        if (localStorage.getItem('dc-quiz-m' + modKey + '-passed') === 'true') {
          injectPassedBadge();
          return;
        }
        injectQuizTrigger(questions);
      })
      .catch(function () { /* silent fail — no quiz shown */ });
  });

  /* ── Passed badge ───────────────────────────────────────── */
  function injectPassedBadge() {
    var main = document.querySelector('.main-content, main, #main-content, .page-content, body');
    if (!main) return;
    var badge = document.createElement('div');
    badge.style.cssText = [
      'background:#e8f5e9;border:2px solid #2e7d32;border-radius:10px',
      'padding:16px 20px;margin:24px 0;display:flex;align-items:center;gap:12px',
      'font-size:1rem'
    ].join(';');
    badge.innerHTML = '<span style="font-size:1.5rem">✅</span>' +
      '<div><strong style="color:#1b5e20">' +
      (isFr ? 'Module terminé — Quiz réussi\u00a0!' : 'Module complete — Quiz passed!') +
      '</strong><br><span style="color:#555;font-size:0.9rem">' +
      (isFr ? 'Vous avez réussi le quiz de ce module.' : 'You demonstrated understanding of this module.') +
      '</span></div>';
    var footer = main.querySelector('footer, .site-footer');
    if (footer) main.insertBefore(badge, footer);
    else main.appendChild(badge);
  }

  /* ── Quiz trigger button ────────────────────────────────── */
  function injectQuizTrigger(questions) {
    var main = document.querySelector('.main-content, main, #main-content, .page-content');
    if (!main) return;

    var wrapper = document.createElement('div');
    wrapper.id = 'module-quiz-wrapper';
    wrapper.style.cssText = 'margin:32px 0;';

    var btn = document.createElement('button');
    btn.id = 'module-quiz-start';
    btn.style.cssText = [
      'background:#1565C0;color:#fff;font-size:1.05rem;font-weight:700',
      'border:none;border-radius:10px;padding:16px 28px;cursor:pointer;width:100%',
      'max-width:400px;display:block;margin:0 auto'
    ].join(';');
    btn.textContent = isFr ? '📝 Tester mes connaissances (5 questions)' : '📝 Test my understanding (5 questions)';

    var sub = document.createElement('p');
    sub.style.cssText = 'text-align:center;color:var(--color-text-light,#50505F);font-size:1rem;margin-top:8px';
    sub.textContent = isFr
      ? 'Répondez à 4 questions sur 5 pour déverrouiller « Module terminé ».'
      : 'Answer 4 out of 5 correctly to unlock "Mark as complete".';

    wrapper.appendChild(btn);
    wrapper.appendChild(sub);

    var footer = main.querySelector('footer, .site-footer');
    if (footer) main.insertBefore(wrapper, footer);
    else main.appendChild(wrapper);

    btn.addEventListener('click', function () {
      showQuiz(wrapper, questions);
    });
  }

  /* ── Quiz engine ────────────────────────────────────────── */
  function showQuiz(container, allQuestions) {
    var questions = shuffle(allQuestions.slice());
    var current = 0;
    var score = 0;

    function renderQ() {
      var q = questions[current];
      var html = '<div id="mq-box" style="background:#f9f9f9;border:1px solid #ddd;border-radius:12px;padding:24px 28px;margin:0">' +
        '<p style="font-size:0.8rem;color:#888;margin:0 0 8px">' +
          (isFr ? 'Question ' : 'Question ') + (current + 1) + ' / ' + questions.length +
        '</p>' +
        '<p style="font-weight:700;font-size:1.05rem;margin:0 0 20px;line-height:1.5">' + q.q + '</p>' +
        '<div id="mq-opts">';

      q.opts.forEach(function (opt, i) {
        html += '<button class="mq-opt" data-i="' + i + '" style="' + [
          'display:block;width:100%;text-align:left;padding:12px 16px',
          'background:#fff;border:2px solid #ddd;border-radius:8px',
          'margin-bottom:10px;cursor:pointer;font-size:0.95rem;transition:all 0.15s'
        ].join(';') + '">' + opt + '</button>';
      });

      html += '</div>' +
        '<div id="mq-explain" style="display:none;margin-top:16px;padding:12px 16px;border-radius:8px;font-size:0.92rem;line-height:1.6"></div>' +
        '</div>';

      container.innerHTML = html;

      container.querySelectorAll('.mq-opt').forEach(function (btn) {
        btn.addEventListener('mouseenter', function () { if (!btn.disabled) btn.style.borderColor = '#1565C0'; });
        btn.addEventListener('mouseleave', function () { if (!btn.disabled) btn.style.borderColor = '#ddd'; });
        btn.addEventListener('click', function () {
          var chosen = parseInt(btn.getAttribute('data-i'), 10);
          var correct = (chosen === q.ans);
          if (correct) score++;

          /* Colour correct/wrong */
          container.querySelectorAll('.mq-opt').forEach(function (b, idx) {
            b.disabled = true;
            b.style.cursor = 'default';
            if (idx === q.ans) {
              b.style.background = '#e8f5e9';
              b.style.borderColor = '#2e7d32';
            }
            if (idx === chosen && !correct) {
              b.style.background = '#ffebee';
              b.style.borderColor = '#c62828';
            }
          });

          /* Show explanation */
          var explainEl = document.getElementById('mq-explain');
          if (explainEl) {
            var explainText = (isFr && q.explain_fr) ? q.explain_fr : (q.explain || '');
            if (explainText) {
              explainEl.style.display = 'block';
              explainEl.style.background = correct ? '#e8f5e9' : '#fff8e1';
              explainEl.style.borderLeft = correct ? '4px solid #2e7d32' : '4px solid #e65100';
              explainEl.innerHTML = (correct
                ? '<strong style="color:#1b5e20">✓ ' + (isFr ? 'Correct&nbsp;!' : 'Correct!') + '</strong> '
                : '<strong style="color:#e65100">✗ ' + (isFr ? 'Pas tout à fait.' : 'Not quite.') + '</strong> ')
                + explainText;
            }
          }

          /* Advance after showing explanation */
          var delay = explainText ? 2200 : 800;
          setTimeout(function () {
            current++;
            if (current < questions.length) {
              renderQ();
            } else {
              showResult();
            }
          }, delay);
        });
      });
    }

    function showResult() {
      var passed = score >= 4;
      localStorage.setItem('dc-quiz-m' + modKey + '-score', score);
      localStorage.setItem('dc-quiz-m' + modKey + '-passed', passed ? 'true' : 'false');
      if (passed) {
        localStorage.setItem('dc-module-' + modKey + '-complete', 'true');
        /* Fire module-complete event for celebrations.js */
        try { document.dispatchEvent(new CustomEvent('dc-module-complete')); } catch (e) {}
      }

      var html = '<div style="text-align:center;background:#f9f9f9;border-radius:12px;padding:32px 24px">';
      if (passed) {
        html += '<div style="font-size:2.5rem;margin-bottom:12px">✅</div>';
        html += '<h3 style="color:#1b5e20;margin:0 0 10px">' +
          (isFr ? 'Quiz réussi\u00a0!' : 'Module quiz passed!') + '</h3>';
        html += '<p style="color:#555;margin:0 0 20px">' + score + ' / ' + questions.length + ' — ' +
          (isFr ? 'Vous avez vraiment compris ce module.' : 'You really understood this one.') + '</p>';
        html += '<button id="mq-complete-btn" style="' + ctaStyle('#2e7d32') + '">' +
          (isFr ? 'Marquer comme terminé ✅' : 'Mark as complete ✅') + '</button>';
      } else {
        html += '<div style="font-size:2.5rem;margin-bottom:12px">📖</div>';
        html += '<h3 style="color:#e65100;margin:0 0 10px">' +
          (isFr ? 'Presque\u00a0! Essayez encore.' : 'Almost there. Try again.') + '</h3>';
        html += '<p style="color:#555;margin:0 0 20px">' + score + ' / ' + questions.length + ' — ' +
          (isFr ? 'Relisez le module et réessayez — sans pression.' : 'Review the module and try again — no pressure.') + '</p>';
        html += '<button id="mq-retry" style="' + ctaStyle('#e65100') + '">' +
          (isFr ? 'Réessayer →' : 'Try again →') + '</button>';
      }
      html += '</div>';
      container.innerHTML = html;

      var completeBtn = document.getElementById('mq-complete-btn');
      if (completeBtn) {
        completeBtn.addEventListener('click', function () {
          container.innerHTML = '<p style="text-align:center;font-size:1.1rem">✅ ' +
            (isFr ? 'Module terminé\u00a0!' : 'Module complete!') + '</p>';
        });
      }

      var retryBtn = document.getElementById('mq-retry');
      if (retryBtn) {
        retryBtn.addEventListener('click', function () {
          score = 0; current = 0;
          questions = shuffle(allQuestions.slice());
          renderQ();
        });
      }
    }

    renderQ();
  }

  function ctaStyle(bg) {
    return 'background:' + bg + ';color:#fff;border:none;border-radius:8px;' +
      'padding:14px 24px;font-size:1rem;font-weight:700;cursor:pointer;width:100%;max-width:320px';
  }

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr;
  }

})();
