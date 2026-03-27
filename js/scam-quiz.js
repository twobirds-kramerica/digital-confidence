/* ============================================
   Scam Simulator — Narrative Card Engine v2
   Confidence tracker, prev/next nav, encouragement
   ============================================ */

(function () {
  'use strict';

  /* ── Config ── */
  var TOTAL_SCENARIOS = 0; // calculated from DOM

  /* ── Global confidence state ── */
  var globalCorrect = 0;
  var globalAnswered = 0;
  var trackerEl = null;
  var trackerScoreEl = null;
  var trackerBarEl = null;

  /* ── Type detection ── */
  var TYPE_MAP = {
    'email-quiz':    { type: 'email',   emoji: '📧', label: 'Email' },
    'text-quiz':     { type: 'text',    emoji: '💬', label: 'Text Message' },
    'phone-quiz':    { type: 'phone',   emoji: '📞', label: 'Phone & Web' },
    'telecom-quiz':  { type: 'phone',   emoji: '📞', label: 'Phone Call' },
    'emotional-quiz':{ type: 'other',   emoji: '💔', label: 'Manipulation' },
    'pressure-quiz': { type: 'other',   emoji: '⚠️',  label: 'High Pressure' },
    'emerging-quiz': { type: 'other',   emoji: '🤖', label: 'Emerging Scam' },
    'identity-quiz': { type: 'other',   emoji: '🪪', label: 'Identity & Payment' },
    'courier-quiz':  { type: 'phone',   emoji: '📦', label: 'Courier & Phone' }
  };

  /* Detect type from scenario content */
  function detectType(containerId, scenarioText) {
    var lower = scenarioText.toLowerCase();
    if (/\bfrom:.*@|\bsubject:/i.test(scenarioText)) {
      return { type: 'email', emoji: '📧', label: 'Email' };
    }
    if (/flyer|letter in the mail|qr code printed|mailbox/.test(lower)) {
      return { type: 'mail', emoji: '🚪', label: 'Mail / In Person' };
    }
    if (/you receive a text|sms|text message|from: \+|http:\/\//.test(lower)) {
      return { type: 'text', emoji: '💬', label: 'Text Message' };
    }
    if (/website|browser|pop.?up|screen.*fills|blue screen/.test(lower)) {
      return { type: 'website', emoji: '🌐', label: 'Website / Browser' };
    }
    if (/phone rings|you receive a call|robocall|voicemail|caller id|press 1/.test(lower)) {
      return { type: 'phone', emoji: '📞', label: 'Phone Call' };
    }
    if (/facebook|message.*online|social media/.test(lower)) {
      return { type: 'other', emoji: '💻', label: 'Online / Social' };
    }
    // fallback to container-level
    return TYPE_MAP[containerId] || { type: 'other', emoji: '⚠️', label: 'Scam Scenario' };
  }

  /* ── Red flag extraction ── */
  function extractRedFlags(incorrectText) {
    var flags = [];
    // Match numbered patterns: (1) text (2) text etc.
    var re = /\(\d+\)\s+([^(]+?)(?=\s*\(\d+\)|$)/g;
    var m;
    while ((m = re.exec(incorrectText)) !== null) {
      var flag = m[1].replace(/[,.\s]+$/, '').trim();
      if (flag.length > 0 && flag.length < 120) {
        flags.push(flag);
      }
    }
    return flags;
  }

  /* ── Translations ── */
  var FR = {
    trackerLabel: 'Arnaque détectée',
    trackerPrefix: 'Vous avez repéré',
    trackerOf: 'sur',
    trackerSuffix: 'arnaques',
    counter: 'Scénario',
    of: 'sur',
    question: 'Que feriez-vous?',
    redFlagLabel: '🔍 Signes d\'alerte possibles',
    redFlagPrompt: 'Lisez attentivement — quelque chose semble-t-il suspect?',
    prevBtn: '← Précédent',
    nextBtn: 'Suivant →',
    correctHeading: 'Bien joué. Faites confiance à cet instinct.',
    incorrectHeading: 'Cela trompe beaucoup de gens. Voici pourquoi…',
    roundLabel: 'Résultat du tour :',
    roundPerfect: 'Score parfait! Excellentes compétences de détection.',
    roundGood: 'Bon travail! Vous avez repéré la plupart des signaux.',
    roundOk: 'Bonne tentative! La pratique améliore la vigilance.',
    retryBtn: '↺ Recommencer ce tour',
    roundScore: 'sur',
    correct: 'correctes'
  };

  var EN = {
    trackerLabel: 'Scam-Spotting Confidence',
    trackerPrefix: 'You\'ve spotted',
    trackerOf: 'of',
    trackerSuffix: 'scams correctly',
    counter: 'Scenario',
    of: 'of',
    question: 'What would you do?',
    redFlagLabel: '🔍 Look carefully before you answer',
    redFlagPrompt: 'Read carefully — does anything seem off?',
    prevBtn: '← Previous',
    nextBtn: 'Next →',
    correctHeading: 'Well done. Trust that instinct.',
    incorrectHeading: 'This one fools a lot of people. Here\'s why…',
    roundLabel: 'Round score:',
    roundPerfect: 'Perfect score! Excellent scam-spotting skills.',
    roundGood: 'Great job! You caught most of the red flags.',
    roundOk: 'Good effort! Scam spotting takes practice.',
    retryBtn: '↺ Try this round again',
    roundScore: 'of',
    correct: 'correct'
  };

  function lang() {
    try {
      var stored = document.documentElement.getAttribute('data-lang') ||
                   localStorage.getItem('dc-lang') ||
                   navigator.language || 'en';
      return stored.toLowerCase().startsWith('fr') ? FR : EN;
    } catch (e) { return EN; }
  }

  /* ── Build global confidence tracker ── */
  function buildTracker(insertBefore) {
    var t = lang();
    var div = document.createElement('div');
    div.className = 'ss-tracker';
    div.setAttribute('aria-live', 'polite');
    div.setAttribute('aria-label', t.trackerLabel);
    div.innerHTML =
      '<div class="ss-tracker-icon">🎯</div>' +
      '<div class="ss-tracker-text">' +
        '<p class="ss-tracker-label">' + t.trackerLabel + '</p>' +
        '<p class="ss-tracker-score" id="ss-tracker-score">' +
          t.trackerPrefix + ' 0 ' + t.trackerOf + ' 0 ' + t.trackerSuffix +
        '</p>' +
        '<div class="ss-tracker-bar-wrap"><div class="ss-tracker-bar" id="ss-tracker-bar"></div></div>' +
      '</div>';
    insertBefore.parentNode.insertBefore(div, insertBefore);
    trackerEl = div;
    trackerScoreEl = document.getElementById('ss-tracker-score');
    trackerBarEl = document.getElementById('ss-tracker-bar');
  }

  function updateTracker() {
    if (!trackerScoreEl) return;
    var t = lang();
    trackerScoreEl.textContent =
      t.trackerPrefix + ' ' + globalCorrect + ' ' + t.trackerOf + ' ' +
      globalAnswered + ' ' + t.trackerSuffix;
    var pct = TOTAL_SCENARIOS > 0 ? (globalCorrect / TOTAL_SCENARIOS) * 100 : 0;
    if (trackerBarEl) trackerBarEl.style.width = pct.toFixed(1) + '%';
  }

  /* ── Parse a single .quiz-question element into a data object ── */
  function parseQuestion(qEl, containerId) {
    var h4 = qEl.querySelector('h4');
    var storyEl = qEl.querySelector('.scam-example');
    var feedbackEl = qEl.querySelector('.quiz-feedback');
    var options = qEl.querySelectorAll('.quiz-option');

    var storyHTML = storyEl ? storyEl.innerHTML : '';
    var correctAnswer = qEl.getAttribute('data-correct') || 'a';
    var correctText = feedbackEl ? feedbackEl.getAttribute('data-correct-text') || '' : '';
    var incorrectText = feedbackEl ? feedbackEl.getAttribute('data-incorrect-text') || '' : '';
    var titleText = h4 ? h4.textContent : '';

    // Detect type from story content
    var typeInfo = detectType(containerId, storyHTML + ' ' + titleText);

    // Build options array
    var optArr = [];
    options.forEach(function (o) {
      optArr.push({
        answer: o.getAttribute('data-answer'),
        text: o.textContent.trim()
      });
    });

    return {
      title: titleText,
      storyHTML: storyHTML,
      correctAnswer: correctAnswer,
      correctText: correctText,
      incorrectText: incorrectText,
      options: optArr,
      typeInfo: typeInfo,
      redFlags: extractRedFlags(incorrectText)
    };
  }

  /* ── Build card HTML for a single question ── */
  function buildCard(qData, index, total, scenarioOffset) {
    var t = lang();
    var scenarioNum = scenarioOffset + index + 1;

    var optionsHTML = '';
    var letters = ['A', 'B', 'C', 'D'];
    qData.options.forEach(function (opt, i) {
      optionsHTML +=
        '<button class="ss-option-btn" data-answer="' + esc(opt.answer) + '" ' +
          'aria-label="Option ' + letters[i] + ': ' + esc(opt.text) + '">' +
          '<span class="ss-option-letter">' + letters[i] + '</span>' +
          '<span>' + esc(opt.text) + '</span>' +
        '</button>';
    });

    var redFlagHTML = '';
    if (qData.redFlags.length > 0) {
      var badges = qData.redFlags.map(function (f) {
        return '<span class="ss-red-flag-badge">' + esc(f) + '</span>';
      }).join('');
      redFlagHTML =
        '<div class="ss-redflag-teaser">' +
          '<div class="ss-redflag-teaser-label">' + t.redFlagLabel + '</div>' +
          '<div class="ss-red-flags">' + badges + '</div>' +
        '</div>';
    } else {
      redFlagHTML =
        '<div class="ss-redflag-teaser">' +
          '<div class="ss-redflag-teaser-label">' + t.redFlagLabel + '</div>' +
          '<p class="ss-redflag-prompt">' + t.redFlagPrompt + '</p>' +
        '</div>';
    }

    return (
      '<div class="ss-card-header">' +
        '<span class="ss-type-badge" data-type="' + esc(qData.typeInfo.type) + '">' +
          qData.typeInfo.emoji + ' ' + esc(qData.typeInfo.label) +
        '</span>' +
        '<span class="ss-counter">' + t.counter + ' ' + scenarioNum + ' ' + t.of + ' ' + TOTAL_SCENARIOS + '</span>' +
      '</div>' +
      '<h3 class="ss-scenario-title">' + esc(qData.title) + '</h3>' +
      '<div class="ss-story">' + qData.storyHTML + '</div>' +
      redFlagHTML +
      '<p class="ss-question-label">' + t.question + '</p>' +
      '<div class="ss-options">' + optionsHTML + '</div>' +
      '<div class="ss-feedback" role="alert"></div>'
    );
  }

  /* ── Escape HTML entities ── */
  function esc(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ── Dot nav ── */
  function buildDots(count) {
    var html = '';
    for (var i = 0; i < count; i++) {
      html += '<span class="ss-dot"></span>';
    }
    return html;
  }

  /* ── Wire up a single quiz container ── */
  function initContainer(container, scenarioOffset) {
    var containerId = container.id || 'quiz';
    var questions = container.querySelectorAll('.quiz-question');
    if (questions.length === 0) return 0;

    var qDataArr = [];
    questions.forEach(function (qEl) {
      qDataArr.push(parseQuestion(qEl, containerId));
    });

    var currentIndex = 0;
    var answered = new Array(qDataArr.length).fill(false);
    var results = new Array(qDataArr.length).fill(null); // true/false
    var containerCorrect = 0;

    // Build outer structure
    var cardWrap = document.createElement('div');
    cardWrap.className = 'ss-card-wrap';

    var card = document.createElement('div');
    card.className = 'ss-card';

    var nav = document.createElement('div');
    nav.className = 'ss-nav';

    var prevBtn = document.createElement('button');
    prevBtn.className = 'ss-nav-btn ss-nav-prev';
    prevBtn.textContent = lang().prevBtn;
    prevBtn.disabled = true;

    var nextBtn = document.createElement('button');
    nextBtn.className = 'ss-nav-btn ss-nav-next';
    nextBtn.textContent = lang().nextBtn;
    nextBtn.disabled = qDataArr.length <= 1;

    var dotsWrap = document.createElement('div');
    dotsWrap.className = 'ss-nav-dots';
    dotsWrap.innerHTML = buildDots(qDataArr.length);

    nav.appendChild(prevBtn);
    nav.appendChild(dotsWrap);
    nav.appendChild(nextBtn);

    var scoreBanner = document.createElement('div');
    scoreBanner.className = 'ss-round-score';

    cardWrap.appendChild(card);
    cardWrap.appendChild(nav);
    cardWrap.appendChild(scoreBanner);

    // Replace container contents
    container.innerHTML = '';
    container.appendChild(cardWrap);
    container.classList.add('ss-initialized');

    function getDots() {
      return dotsWrap.querySelectorAll('.ss-dot');
    }

    function updateDots() {
      var dots = getDots();
      dots.forEach(function (dot, i) {
        dot.className = 'ss-dot';
        if (i === currentIndex) {
          dot.classList.add('current');
        } else if (answered[i]) {
          dot.classList.add(results[i] ? 'answered-correct' : 'answered-incorrect');
        }
      });
    }

    function renderQuestion(idx) {
      var qData = qDataArr[idx];
      card.innerHTML = buildCard(qData, idx, qDataArr.length, scenarioOffset);

      updateDots();
      prevBtn.disabled = (idx === 0);
      nextBtn.disabled = (idx >= qDataArr.length - 1);

      // If already answered, restore state
      if (answered[idx]) {
        restoreAnswered(idx);
        return;
      }

      // Wire option buttons
      var optBtns = card.querySelectorAll('.ss-option-btn');
      optBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (answered[idx]) return;
          answered[idx] = true;

          var selected = btn.getAttribute('data-answer');
          var isCorrect = (selected === qData.correctAnswer);
          results[idx] = isCorrect;

          if (isCorrect) {
            containerCorrect++;
            globalCorrect++;
          }
          globalAnswered++;
          updateTracker();

          // Disable all, highlight correct, mark selected
          optBtns.forEach(function (ob) {
            ob.disabled = true;
            if (ob.getAttribute('data-answer') === qData.correctAnswer) {
              ob.classList.add(isCorrect ? 'ss-correct' : 'ss-highlighted');
            }
          });

          if (!isCorrect) {
            btn.classList.add('ss-incorrect');
          } else {
            btn.classList.add('ss-correct');
          }

          showFeedback(idx, isCorrect);
          updateDots();

          // Auto-enable next if not last
          if (idx < qDataArr.length - 1) {
            nextBtn.disabled = false;
          }

          // Show round score if all answered
          var allDone = answered.every(function (a) { return a; });
          if (allDone) {
            showRoundScore();
          }
        });
      });
    }

    function restoreAnswered(idx) {
      var qData = qDataArr[idx];
      var optBtns = card.querySelectorAll('.ss-option-btn');
      var isCorrect = results[idx];

      optBtns.forEach(function (ob) {
        ob.disabled = true;
        if (ob.getAttribute('data-answer') === qData.correctAnswer) {
          ob.classList.add(isCorrect ? 'ss-correct' : 'ss-highlighted');
        }
      });

      var selectedAnswer = isCorrect ? qData.correctAnswer : null;
      optBtns.forEach(function (ob) {
        var ans = ob.getAttribute('data-answer');
        if (!isCorrect && ans !== qData.correctAnswer) {
          // We don't know exactly which was wrong, mark all non-correct as potentially wrong
          // But check if this would be the incorrect one – check options length
          // Safe: just mark non-correct ones as inactive
        }
      });

      showFeedback(idx, isCorrect);
      updateDots();
    }

    function showFeedback(idx, isCorrect) {
      var qData = qDataArr[idx];
      var t = lang();
      var fbEl = card.querySelector('.ss-feedback');
      if (!fbEl) return;

      var heading = isCorrect ? t.correctHeading : t.incorrectHeading;
      var bodyText = isCorrect ? qData.correctText : qData.incorrectText;

      var redFlagsHTML = '';
      if (!isCorrect && qData.redFlags.length > 0) {
        var badges = qData.redFlags.map(function (f) {
          return '<span class="ss-red-flag-badge">' + esc(f) + '</span>';
        }).join('');
        redFlagsHTML = '<div class="ss-red-flags">' + badges + '</div>';
      }

      fbEl.innerHTML =
        '<div class="ss-feedback-heading">' +
          (isCorrect ? '✅ ' : '💡 ') + esc(heading) +
        '</div>' +
        '<p>' + esc(bodyText) + '</p>' +
        redFlagsHTML;

      fbEl.className = 'ss-feedback show ' + (isCorrect ? 'correct' : 'incorrect');
    }

    function showRoundScore() {
      var t = lang();
      var total = qDataArr.length;
      var msg;
      if (containerCorrect === total) {
        msg = t.roundPerfect;
      } else if (containerCorrect >= Math.ceil(total * 0.7)) {
        msg = t.roundGood;
      } else {
        msg = t.roundOk;
      }

      scoreBanner.innerHTML =
        '<div class="ss-round-score-num">' +
          t.roundLabel + ' ' + containerCorrect + ' ' + t.roundScore + ' ' + total + ' ' + t.correct +
        '</div>' +
        '<div class="ss-round-score-msg">' + msg + '</div>' +
        '<button class="ss-retry-btn">' + t.retryBtn + '</button>';

      scoreBanner.classList.add('show');

      scoreBanner.querySelector('.ss-retry-btn').addEventListener('click', function () {
        answered = new Array(qDataArr.length).fill(false);
        results = new Array(qDataArr.length).fill(null);
        globalCorrect -= containerCorrect;
        globalAnswered -= qDataArr.length;
        containerCorrect = 0;
        scoreBanner.classList.remove('show');
        scoreBanner.innerHTML = '';
        updateTracker();
        currentIndex = 0;
        renderQuestion(0);
      });
    }

    // Navigation
    prevBtn.addEventListener('click', function () {
      if (currentIndex > 0) {
        currentIndex--;
        renderQuestion(currentIndex);
        prevBtn.disabled = (currentIndex === 0);
        nextBtn.disabled = false;
      }
    });

    nextBtn.addEventListener('click', function () {
      if (currentIndex < qDataArr.length - 1) {
        currentIndex++;
        renderQuestion(currentIndex);
        prevBtn.disabled = false;
        nextBtn.disabled = (currentIndex >= qDataArr.length - 1) && !answered[currentIndex];
      }
    });

    renderQuestion(0);
    return qDataArr.length;
  }

  /* ── Main init ── */
  document.addEventListener('DOMContentLoaded', function () {
    var containers = document.querySelectorAll('.quiz-container');
    if (containers.length === 0) return;

    // Count total scenarios first
    containers.forEach(function (c) {
      TOTAL_SCENARIOS += c.querySelectorAll('.quiz-question').length;
    });

    // Build tracker before first container
    buildTracker(containers[0]);
    updateTracker();

    // Init each container
    var offset = 0;
    containers.forEach(function (container) {
      var count = initContainer(container, offset);
      offset += count;
    });
  });

})();
