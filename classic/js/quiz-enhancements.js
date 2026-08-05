/* =============================================================
   Digital Confidence Centre — Quiz Enhancements
   3B: Adaptive final quiz (skip mastered modules)
   3C: Anonymous leaderboard (localStorage, top 10)
   3D: Enhanced certificate (name, date, score, cert #, share)
   ============================================================= */
(function () {
  'use strict';

  var isFr = (localStorage.getItem('dc-lang') || navigator.language || 'en').startsWith('fr');
  var isQuizPage = window.location.href.includes('final-quiz');

  /* ── 3B — Adaptive quiz notice ──────────────────────────────────────── */
  function getSkippedModules() {
    var skipped = [];
    for (var i = 1; i <= 17; i++) {
      if (parseInt(localStorage.getItem('dc-quiz-m' + i + '-score') || '0', 10) === 5) {
        skipped.push(i);
      }
    }
    return skipped;
  }

  function injectAdaptiveNotice() {
    var skipped = getSkippedModules();
    if (!skipped.length) return;

    /* Store skipped modules for the final quiz to use */
    localStorage.setItem('dc-quiz-skip-modules', JSON.stringify(skipped));

    var notice = document.createElement('div');
    notice.style.cssText = [
      'background:#e3f2fd;border:1px solid #1565C0;border-left:5px solid #1565C0',
      'border-radius:0 10px 10px 0;padding:16px 20px;margin:16px 0;font-size:0.95rem'
    ].join(';');
    var total = 60;
    var skippedQ = Math.round((skipped.length / 17) * total);
    var remaining = total - skippedQ;
    notice.innerHTML = '<strong style="color:#0d47a1">' +
      (isFr ? '🎯 Quiz adaptatif activé&nbsp;!' : '🎯 Adaptive quiz activated!') +
      '</strong><br>' +
      (isFr
        ? 'Nous avons sauté environ <strong>' + skippedQ + ' questions</strong> que vous avez déjà maîtrisées. Ce quiz a <strong>' + remaining + ' questions</strong> pour vous.'
        : 'We skipped about <strong>' + skippedQ + ' questions</strong> you already proved you know. This quiz has approximately <strong>' + remaining + ' questions</strong> for you.'
      );
    var quizApp = document.getElementById('quiz-app') || document.querySelector('.quiz-container, main');
    if (quizApp) quizApp.insertBefore(notice, quizApp.firstChild);
  }

  /* ── 3C — Leaderboard & score history ──────────────────────────────── */
  var LS_KEY = 'dc-quiz-history';

  function saveScore(score, total) {
    var history = getHistory();
    var entry = { score: score, total: total, date: new Date().toISOString(), pct: Math.round((score / total) * 100) };
    history.unshift(entry);
    history = history.slice(0, 20); /* keep last 20 */
    localStorage.setItem(LS_KEY, JSON.stringify(history));

    /* Personal best */
    var best = parseInt(localStorage.getItem('dc-quiz-best') || '0', 10);
    if (score > best) localStorage.setItem('dc-quiz-best', score);

    /* Attempt count */
    var attempts = parseInt(localStorage.getItem('dc-quiz-attempts') || '0', 10);
    localStorage.setItem('dc-quiz-attempts', attempts + 1);
  }

  function getHistory() {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch (e) { return []; }
  }

  function buildLeaderboard(score, total) {
    var history = getHistory();
    var best    = parseInt(localStorage.getItem('dc-quiz-best') || '0', 10);
    var attempts = parseInt(localStorage.getItem('dc-quiz-attempts') || '0', 10);
    var last5    = history.slice(0, 5);

    var html = '<div id="dc-leaderboard" style="margin-top:24px;background:#f9f9f9;border:1px solid #ddd;border-radius:12px;padding:20px 24px">';
    html += '<h3 style="margin:0 0 16px;font-size:1.1rem;color:#1a237e">' +
      (isFr ? '📊 Votre historique de quiz' : '📊 Your quiz history') + '</h3>';

    html += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-bottom:20px">';
    html += statCard(isFr ? 'Score actuel' : 'This attempt', score + '/' + total, '#1565C0');
    html += statCard(isFr ? 'Meilleur score' : 'Personal best', best + '/60', '#2e7d32');
    html += statCard(isFr ? 'Tentatives' : 'Times taken', attempts.toString(), '#e65100');
    html += '</div>';

    if (last5.length > 1) {
      html += '<h4 style="margin:0 0 10px;font-size:0.9rem;color:#555">' +
        (isFr ? 'Vos 5 dernières tentatives' : 'Your last 5 attempts') + '</h4>';
      html += '<table style="width:100%;border-collapse:collapse;font-size:0.88rem">';
      html += '<tr style="color:#888"><th style="text-align:left;padding:4px 8px">' +
        (isFr ? 'Date' : 'Date') + '</th><th style="text-align:right;padding:4px 8px">' +
        (isFr ? 'Score' : 'Score') + '</th><th style="text-align:right;padding:4px 8px">%</th></tr>';
      last5.forEach(function (h, i) {
        var d = new Date(h.date).toLocaleDateString(isFr ? 'fr-CA' : 'en-CA', { month: 'short', day: 'numeric', year: 'numeric' });
        var bg = i === 0 ? '#e3f2fd' : 'transparent';
        html += '<tr style="background:' + bg + '">';
        html += '<td style="padding:6px 8px">' + d + (i === 0 ? ' (' + (isFr ? 'aujourd\u2019hui' : 'today') + ')' : '') + '</td>';
        html += '<td style="text-align:right;padding:6px 8px;font-weight:700">' + h.score + '/' + h.total + '</td>';
        html += '<td style="text-align:right;padding:6px 8px;color:' + (h.pct >= 74 ? '#2e7d32' : '#c62828') + '">' + h.pct + '%</td>';
        html += '</tr>';
      });
      html += '</table>';
    }

    html += '</div>';
    return html;
  }

  function statCard(label, value, color) {
    return '<div style="background:#fff;border:1px solid #ddd;border-top:3px solid ' + color + ';border-radius:8px;padding:12px;text-align:center">' +
      '<div style="font-size:1.4rem;font-weight:700;color:' + color + '">' + value + '</div>' +
      '<div style="font-size:0.78rem;color:#777;margin-top:4px">' + label + '</div>' +
    '</div>';
  }

  /* ── 3D — Enhanced certificate ──────────────────────────────────────── */
  function enhanceCertificate() {
    if (!window.location.href.includes('certificate')) return;
    document.addEventListener('DOMContentLoaded', function () {
      var certEl = document.querySelector('.certificate, #certificate, .cert-inner, main');
      if (!certEl) return;

      var name    = localStorage.getItem('dc-user-name') || localStorage.getItem('dcc_name') || localStorage.getItem('userName') || '';
      var score   = localStorage.getItem('dc-quiz-best') || '';
      var certNum = 'DCC-' + Date.now().toString(36).toUpperCase();
      var today   = new Date().toLocaleDateString(isFr ? 'fr-CA' : 'en-CA', { year: 'numeric', month: 'long', day: 'numeric' });

      /* Store cert number so it stays consistent in session */
      if (!localStorage.getItem('dc-cert-number')) {
        localStorage.setItem('dc-cert-number', certNum);
      } else {
        certNum = localStorage.getItem('dc-cert-number');
      }

      var extra = document.createElement('div');
      extra.style.cssText = [
        'background:linear-gradient(135deg,#1a237e 0%,#283593 100%);color:#fff',
        'border-radius:12px;padding:28px 32px;margin:16px 0;text-align:center'
      ].join(';');

      extra.innerHTML =
        '<div style="font-size:2rem;margin-bottom:8px">🏅</div>' +
        '<h2 style="color:#fff;margin:0 0 4px;font-size:1.3rem">' +
          (isFr ? 'Certificat d\u2019achèvement' : 'Certificate of Completion') +
        '</h2>' +
        '<p style="color:rgba(255,255,255,0.85);font-size:0.95rem;margin:0 0 16px">' +
          (isFr ? 'Centre de confiance numérique — Two Birds Innovation' : 'Digital Confidence Centre — Two Birds Innovation') +
        '</p>' +
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;max-width:500px;margin:0 auto 20px">' +
          certField(isFr ? 'Délivré à' : 'Awarded to', name || (isFr ? '(Nom non fourni)' : '(Name not provided)')) +
          certField(isFr ? 'Date' : 'Date completed', today) +
          certField(isFr ? 'Score' : 'Best score', score ? score + '/60' : (isFr ? 'Non enregistré' : 'Not recorded')) +
          certField(isFr ? 'N° de certificat' : 'Certificate no.', certNum) +
        '</div>' +
        '<a href="mailto:?subject=' + encodeURIComponent(isFr ? 'J\u2019ai terminé le Centre de confiance numérique!' : 'I completed the Digital Confidence Centre!') +
          '&body=' + encodeURIComponent(isFr ? 'Je viens de terminer les 17 modules du Centre de confiance numérique \u2014 un programme gratuit de littératie numérique pour les aînés canadiens. Certificat\u00a0: ' + certNum + '. En savoir plus\u00a0: https://twobirds-kramerica.github.io/digital-confidence/' : 'I just completed all 17 modules of the Digital Confidence Centre \u2014 a free digital literacy program for Canadian seniors. Certificate: ' + certNum + '. Learn more: https://twobirds-kramerica.github.io/digital-confidence/') +
          '" style="display:inline-block;background:#FFB300;color:#000;font-weight:700;padding:12px 24px;border-radius:8px;text-decoration:none;font-size:0.95rem">' +
          (isFr ? '📤 Partager par courriel' : '📤 Share this achievement') +
        '</a>';

      certEl.insertBefore(extra, certEl.firstChild);
    });
  }

  function certField(label, value) {
    return '<div style="background:rgba(255,255,255,0.1);border-radius:8px;padding:10px">' +
      '<div style="font-size:0.7rem;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px">' + label + '</div>' +
      '<div style="font-weight:700;font-size:0.95rem">' + value + '</div>' +
    '</div>';
  }

  /* ── Hook into final quiz result rendering ──────────────────────────── */
  /* Intercept localStorage writes that indicate quiz completion */
  var _origSetItem = localStorage.setItem.bind(localStorage);
  localStorage.setItem = function (key, value) {
    _origSetItem(key, value);
    if (key === 'dc-last-quiz-score' || key === 'dc-quiz-final-score') {
      var score = parseInt(value, 10);
      if (!isNaN(score)) saveScore(score, 60);
    }
  };

  /* Also listen for a custom event that final-quiz.js may dispatch */
  document.addEventListener('dc-quiz-complete', function (e) {
    if (e.detail && e.detail.score !== undefined) {
      saveScore(e.detail.score, e.detail.total || 60);
    }
  });

  /* ── Inject leaderboard after quiz results appear ─────────────────── */
  function watchForResults() {
    var observer = new MutationObserver(function () {
      var results = document.querySelector('#quiz-results, .quiz-results, #results-container');
      if (results && !document.getElementById('dc-leaderboard')) {
        var score = parseInt(localStorage.getItem('dc-last-quiz-score') || localStorage.getItem('dc-quiz-final-score') || '0', 10);
        results.insertAdjacentHTML('beforeend', buildLeaderboard(score, 60));
      }
    });
    var target = document.getElementById('quiz-app') || document.body;
    observer.observe(target, { childList: true, subtree: true });
  }

  /* ── Init ─────────────────────────────────────────────────────────── */
  if (isQuizPage) {
    document.addEventListener('DOMContentLoaded', function () {
      injectAdaptiveNotice();
      watchForResults();
    });
  }

  enhanceCertificate();

})();
