/* ============================================
   Digital Confidence Centre — Exercise Engine
   Supports: password-strength, drag-sort, scam-detective
   Version: 1.0.0
   ============================================ */
(function (global) {
  'use strict';

  /* ── Utility: shuffle array (Fisher-Yates) ── */
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  /* ── Utility: announce to screen readers via aria-live ── */
  function announce(msg) {
    var el = document.getElementById('dc-sr-announce');
    if (!el) {
      el = document.createElement('div');
      el.id = 'dc-sr-announce';
      el.setAttribute('aria-live', 'polite');
      el.setAttribute('aria-atomic', 'true');
      el.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;';
      document.body.appendChild(el);
    }
    el.textContent = '';
    // Brief timeout ensures screen readers re-announce identical messages
    setTimeout(function () { el.textContent = msg; }, 50);
  }

  /* ════════════════════════════════════════════
     PASSWORD STRENGTH MODULE
     Evaluates password against 5 criteria.
     Returns { score:0-5, label, color, pct }
     ════════════════════════════════════════════ */
  function evaluatePassword(pw) {
    var criteria = {
      length:  pw.length >= 8,
      upper:   /[A-Z]/.test(pw),
      lower:   /[a-z]/.test(pw),
      number:  /[0-9]/.test(pw),
      special: /[^A-Za-z0-9]/.test(pw)
    };
    var score = Object.values(criteria).filter(Boolean).length;
    var labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    var colors = ['#E53935', '#E53935', '#FB8C00', '#FDD835', '#43A047', '#1B5E20'];
    return {
      score:    score,
      pct:      Math.round((score / 5) * 100),
      label:    labels[score],
      color:    colors[score],
      criteria: criteria
    };
  }

  /* ════════════════════════════════════════════
     DRAG-AND-DROP MODULE
     initDragSort(containerSelector, onComplete)

     Expects this HTML structure inside container:
       .drag-source  — parent holding draggable items
       .drop-zone[data-zone] — one per category
       .draggable-item[data-correct-zone] — each item

     onComplete(results) — array of
       { item: Element, zone: string, correct: bool }
     ════════════════════════════════════════════ */
  function initDragSort(containerSelector, onComplete) {
    var container = document.querySelector(containerSelector);
    if (!container) return;

    var items = Array.from(container.querySelectorAll('.draggable-item'));
    var zones = Array.from(container.querySelectorAll('.drop-zone'));
    var dragTarget = null;          // currently dragged element
    var touchClone  = null;         // visual clone for touch
    var touchOffsetX = 0;
    var touchOffsetY = 0;

    /* ── Set draggable attribute ── */
    items.forEach(function (item) {
      item.setAttribute('draggable', 'true');
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'option');
      item.setAttribute('aria-grabbed', 'false');

      /* ── Mouse / keyboard drag ── */
      item.addEventListener('dragstart', function (e) {
        dragTarget = item;
        item.classList.add('dragging');
        item.setAttribute('aria-grabbed', 'true');
        if (e.dataTransfer) {
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('text/plain', '');
        }
      });
      item.addEventListener('dragend', function () {
        item.classList.remove('dragging');
        item.setAttribute('aria-grabbed', 'false');
        dragTarget = null;
      });

      /* ── Touch: start ── */
      item.addEventListener('touchstart', function (e) {
        dragTarget = item;
        var touch = e.touches[0];
        var rect  = item.getBoundingClientRect();
        touchOffsetX = touch.clientX - rect.left;
        touchOffsetY = touch.clientY - rect.top;

        // Create floating clone
        touchClone = item.cloneNode(true);
        touchClone.style.cssText = [
          'position:fixed',
          'pointer-events:none',
          'opacity:0.75',
          'z-index:9999',
          'width:' + rect.width + 'px',
          'left:' + (touch.clientX - touchOffsetX) + 'px',
          'top:'  + (touch.clientY - touchOffsetY) + 'px',
          'margin:0'
        ].join(';');
        document.body.appendChild(touchClone);
        item.classList.add('dragging');
        e.preventDefault();
      }, { passive: false });

      /* ── Touch: move ── */
      item.addEventListener('touchmove', function (e) {
        if (!touchClone) return;
        var touch = e.touches[0];
        touchClone.style.left = (touch.clientX - touchOffsetX) + 'px';
        touchClone.style.top  = (touch.clientY - touchOffsetY) + 'px';

        // Highlight the zone under the finger
        zones.forEach(function (z) { z.classList.remove('drag-over'); });
        var el = document.elementFromPoint(touch.clientX, touch.clientY);
        var zone = el ? el.closest('.drop-zone') : null;
        if (zone) zone.classList.add('drag-over');
        e.preventDefault();
      }, { passive: false });

      /* ── Touch: end ── */
      item.addEventListener('touchend', function (e) {
        if (touchClone) { touchClone.remove(); touchClone = null; }
        item.classList.remove('dragging');
        zones.forEach(function (z) { z.classList.remove('drag-over'); });

        var touch = e.changedTouches[0];
        var el = document.elementFromPoint(touch.clientX, touch.clientY);
        var zone = el ? el.closest('.drop-zone') : null;
        if (zone && dragTarget) {
          zone.appendChild(dragTarget);
          announce(dragTarget.textContent.trim() + ' moved to ' + (zone.querySelector('.drop-zone-label') || zone).textContent.trim());
        }
        dragTarget = null;
        checkAllPlaced(onComplete, items, zones, container);
      }, { passive: false });

      /* ── Keyboard support ── */
      item.addEventListener('keydown', function (e) {
        if (e.key === ' ' || e.key === 'Enter') {
          // Select item
          items.forEach(function (i) { i.setAttribute('aria-grabbed', 'false'); });
          dragTarget = item;
          item.setAttribute('aria-grabbed', 'true');
          announce('Selected: ' + item.textContent.trim() + '. Use Tab to move to a drop zone and press Enter to drop.');
          e.preventDefault();
        }
      });
    });

    /* ── Drop zone events ── */
    zones.forEach(function (zone) {
      zone.setAttribute('role', 'listbox');
      zone.setAttribute('aria-dropeffect', 'move');

      zone.addEventListener('dragover', function (e) {
        e.preventDefault();
        zone.classList.add('drag-over');
      });
      zone.addEventListener('dragleave', function () {
        zone.classList.remove('drag-over');
      });
      zone.addEventListener('drop', function (e) {
        e.preventDefault();
        zone.classList.remove('drag-over');
        if (dragTarget) {
          zone.appendChild(dragTarget);
          var label = zone.querySelector('.drop-zone-label');
          announce(dragTarget.textContent.trim() + ' placed in ' + (label ? label.textContent : zone.dataset.zone || 'zone'));
          checkAllPlaced(onComplete, items, zones, container);
        }
      });
      zone.addEventListener('keydown', function (e) {
        if ((e.key === ' ' || e.key === 'Enter') && dragTarget) {
          zone.appendChild(dragTarget);
          dragTarget.setAttribute('aria-grabbed', 'false');
          var label = zone.querySelector('.drop-zone-label');
          announce(dragTarget.textContent.trim() + ' placed in ' + (label ? label.textContent : zone.dataset.zone || 'zone'));
          dragTarget = null;
          checkAllPlaced(onComplete, items, zones, container);
          e.preventDefault();
        }
      });
    });
  }

  /* Check if all draggable items have been placed in a zone */
  function checkAllPlaced(onComplete, items, zones, container) {
    var source = container.querySelector('.drag-source');
    var remaining = source ? source.querySelectorAll('.draggable-item').length : 0;
    if (remaining > 0) return; // still items in source tray

    var results = [];
    items.forEach(function (item) {
      var parentZone = item.closest('.drop-zone');
      var zoneName   = parentZone ? (parentZone.dataset.zone || '') : '';
      var correct    = zoneName === (item.dataset.correctZone || '');
      item.classList.add(correct ? 'correct' : 'incorrect');
      results.push({ item: item, zone: zoneName, correct: correct });
    });

    if (typeof onComplete === 'function') onComplete(results);
  }

  /* ════════════════════════════════════════════
     SCAM DETECTIVE MODULE
     initScamDetective(scenarios, containerSelector, onComplete)

     Each scenario object:
     {
       type: 'text'|'email'|'phone',
       from: '...',        // email sender or phone number (optional)
       subject: '...',     // for email type (optional)
       body: '...',        // message content
       answer: 'scam'|'safe',
       explanation: '...'  // shown after answer
     }

     onComplete(results) — array of
       { scenario, userAnswer, correct }
     ════════════════════════════════════════════ */
  function initScamDetective(scenarios, containerSelector, onComplete) {
    var container = document.querySelector(containerSelector);
    if (!container || !scenarios || !scenarios.length) return;

    var index    = 0;
    var results  = [];
    var timerID  = null;
    var timeLeft = 0;
    var answered = false;

    function render() {
      answered = false;
      var s = scenarios[index];
      var timerSeconds = s.timer || 20;

      container.innerHTML = [
        '<p class="progress-indicator">Question ' + (index + 1) + ' of ' + scenarios.length + '</p>',
        '<div class="timer-display" id="dc-timer">' + timerSeconds + 's</div>',
        '<div class="scenario-card ' + (s.type === 'email' ? 'email-style' : '') + '">',
          s.type === 'email' && s.from    ? '<p class="scenario-from">From: ' + escHtml(s.from) + '</p>' : '',
          s.type === 'email' && s.subject ? '<p class="scenario-subject">Subject: ' + escHtml(s.subject) + '</p>' : '',
          s.type === 'text'               ? '<p class="scenario-from">Text Message' + (s.from ? ' from ' + escHtml(s.from) : '') + '</p>' : '',
          s.type === 'phone'              ? '<p class="scenario-from">Phone Call Script</p>' : '',
          '<p>' + escHtml(s.body) + '</p>',
        '</div>',
        '<div class="decision-btns">',
          '<button class="btn-scam" id="dc-btn-scam" aria-label="Mark as scam">🚨 This is a Scam</button>',
          '<button class="btn-safe" id="dc-btn-safe" aria-label="Mark as safe">✅ Looks Safe</button>',
        '</div>',
        '<div id="dc-explanation" style="display:none;" role="alert"></div>'
      ].join('');

      startTimer(timerSeconds, s);

      document.getElementById('dc-btn-scam').addEventListener('click', function () { handleAnswer('scam', s); });
      document.getElementById('dc-btn-safe').addEventListener('click', function () { handleAnswer('safe', s); });
    }

    function startTimer(seconds, s) {
      timeLeft = seconds;
      var display = document.getElementById('dc-timer');
      if (!display) return;
      clearInterval(timerID);
      timerID = setInterval(function () {
        timeLeft--;
        if (!display) { clearInterval(timerID); return; }
        display.textContent = timeLeft + 's';
        if (timeLeft <= 5) display.classList.add('urgent');
        if (timeLeft <= 0) {
          clearInterval(timerID);
          if (!answered) handleAnswer('timeout', s);
        }
      }, 1000);
    }

    function handleAnswer(userAnswer, s) {
      if (answered) return;
      answered = true;
      clearInterval(timerID);

      var correct = (userAnswer === s.answer);
      var timedOut = (userAnswer === 'timeout');
      results.push({ scenario: s, userAnswer: userAnswer, correct: correct && !timedOut });

      // Disable buttons
      var btnScam = document.getElementById('dc-btn-scam');
      var btnSafe = document.getElementById('dc-btn-safe');
      if (btnScam) btnScam.disabled = true;
      if (btnSafe) btnSafe.disabled = true;

      // Show explanation
      var expl = document.getElementById('dc-explanation');
      if (expl) {
        var outcome = timedOut ? 'Time ran out!' : correct ? 'Correct!' : 'Not quite.';
        var colour  = correct && !timedOut ? '#E8F5E9' : '#FFEBEE';
        var border  = correct && !timedOut ? '#4CAF50' : '#E53935';
        expl.style.cssText = 'display:block;background:' + colour + ';border-left:4px solid ' + border + ';padding:1rem;border-radius:8px;margin-top:1rem;';
        expl.innerHTML = '<strong>' + outcome + '</strong> ' + escHtml(s.explanation);
        announce(outcome + ' ' + s.explanation);
      }

      // Next button
      var nextBtn = document.createElement('button');
      nextBtn.className = 'btn btn-primary retry-btn';
      nextBtn.style.marginTop = '1rem';
      nextBtn.textContent = index < scenarios.length - 1 ? 'Next Question →' : 'See My Results →';
      nextBtn.addEventListener('click', function () {
        index++;
        if (index < scenarios.length) {
          render();
        } else {
          if (typeof onComplete === 'function') onComplete(results);
        }
      });
      if (expl) expl.appendChild(nextBtn);
    }

    render();
  }

  /* ════════════════════════════════════════════
     RESULTS RENDERER
     renderResults(results, feedbackSelector)

     results: array from initScamDetective or initDragSort
     Each entry must have { correct: bool }
     Optionally: { scenario.body, scenario.explanation,
                   item (Element), zone }
     ════════════════════════════════════════════ */
  function renderResults(results, feedbackSelector) {
    var container = document.querySelector(feedbackSelector);
    if (!container) return;

    var total   = results.length;
    var correct = results.filter(function (r) { return r.correct; }).length;
    var pct     = total > 0 ? Math.round((correct / total) * 100) : 0;

    var grade, message;
    if (pct >= 90)      { grade = 'Excellent!';   message = 'You have a great eye for scams and digital safety.'; }
    else if (pct >= 70) { grade = 'Well done!';   message = 'You spotted most of the risks. Review the ones you missed.'; }
    else if (pct >= 50) { grade = 'Good effort!'; message = 'Some tricky ones in there. Review the explanations and try again.'; }
    else                { grade = 'Keep practising!'; message = 'These scams are designed to be convincing. Review each one carefully.'; }

    var detailsHtml = results.map(function (r, i) {
      var label   = '';
      var explain = '';
      if (r.scenario) {
        label   = r.scenario.body ? r.scenario.body.substring(0, 80) + '…' : 'Question ' + (i + 1);
        explain = r.scenario.explanation || '';
      } else if (r.item) {
        label = r.item.textContent ? r.item.textContent.trim() : 'Item ' + (i + 1);
      } else {
        label = 'Question ' + (i + 1);
      }
      var cls    = r.correct ? 'correct' : 'incorrect';
      var icon   = r.correct ? '✓' : '✗';
      var detail = explain ? ' <em>' + escHtml(explain) + '</em>' : '';
      return '<div class="feedback-item ' + cls + '"><strong>' + icon + ' ' + escHtml(label) + '</strong>' + detail + '</div>';
    }).join('');

    container.innerHTML = [
      '<div class="score-display" aria-label="Score: ' + correct + ' out of ' + total + '">' + correct + ' / ' + total + '</div>',
      '<p style="font-size:1.2rem;font-weight:700;">' + grade + '</p>',
      '<p>' + message + '</p>',
      '<div class="feedback-details">' + detailsHtml + '</div>',
      '<button class="btn btn-primary retry-btn" id="dc-retry-btn">Try Again</button>'
    ].join('');

    container.style.display = 'block';
    container.setAttribute('tabindex', '-1');
    container.focus();
    announce(grade + ' You scored ' + correct + ' out of ' + total + '.');

    document.getElementById('dc-retry-btn').addEventListener('click', function () {
      window.location.reload();
    });
  }

  /* ── HTML escape helper ── */
  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ── Export ── */
  global.DC_EXERCISES = {
    evaluatePassword:  evaluatePassword,
    initDragSort:      initDragSort,
    initScamDetective: initScamDetective,
    renderResults:     renderResults,
    shuffle:           shuffle,
    announce:          announce
  };

})(window);
