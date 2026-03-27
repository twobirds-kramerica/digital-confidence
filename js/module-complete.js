/* ============================================
   Module Completion — Celebration & Badge
   Confetti animation, print badge, French support
   ============================================ */

(function () {
  'use strict';

  function getLang() {
    try {
      var l = document.documentElement.getAttribute('data-lang') ||
              localStorage.getItem('dc-lang') || navigator.language || 'en';
      return l.toLowerCase().startsWith('fr') ? 'fr' : 'en';
    } catch (e) { return 'en'; }
  }

  var T = {
    en: {
      alreadyDone:   '✅ Module Complete!',
      markBtn:       '✓ Mark this module complete',
      completedMsg:  'Module complete! You\'ve finished ',
      printBadge:    '🖨 Print your completion badge',
      celebrate:     'Well done! Keep going — you\'re building real skills.',
      printTitle:    'Certificate of Module Completion',
      printFrom:     'Digital Confidence Centre'
    },
    fr: {
      alreadyDone:   '✅ Module terminé!',
      markBtn:       '✓ Marquer ce module comme terminé',
      completedMsg:  'Module terminé! Vous avez fini ',
      printBadge:    '🖨 Imprimer votre badge de réussite',
      celebrate:     'Bravo! Continuez — vous développez de vraies compétences.',
      printTitle:    'Attestation de réussite du module',
      printFrom:     'Centre de confiance numérique'
    }
  };

  function t(key) {
    return T[getLang()][key] || T.en[key] || '';
  }

  /* Extract module name from page title */
  function getModuleName() {
    var title = document.title || '';
    var parts = title.split('|');
    return parts[0] ? parts[0].trim() : title.trim();
  }

  /* Extract module number from button onclick */
  function getModuleNum(btn) {
    var onclick = btn.getAttribute('onclick') || '';
    var m = onclick.match(/markModuleComplete\(([^)]+)\)/);
    if (m) return m[1].trim();
    // fallback: try URL
    var url = window.location.pathname;
    var um = url.match(/module-(\d[\d-]*)/);
    return um ? um[1] : '0';
  }

  /* Storage key for this module */
  function completionKey(moduleNum) {
    return 'dc-module-' + moduleNum + '-complete';
  }

  function completionDateKey(moduleNum) {
    return 'dc-module-' + moduleNum + '-complete-date';
  }

  /* ── Confetti ── */
  function launchConfetti(container) {
    var COLOURS = ['#1565C0','#00C9A7','#FFD700','#FF6B6B','#A78BFA','#34D399'];
    var wrap = document.createElement('div');
    wrap.className = 'mc-confetti-wrap';
    wrap.setAttribute('aria-hidden', 'true');
    for (var i = 0; i < 48; i++) {
      var p = document.createElement('span');
      p.className = 'mc-confetti-piece';
      p.style.cssText =
        'left:' + (Math.random() * 100) + '%;' +
        'background:' + COLOURS[Math.floor(Math.random() * COLOURS.length)] + ';' +
        'animation-duration:' + (0.8 + Math.random() * 0.8) + 's;' +
        'animation-delay:' + (Math.random() * 0.3) + 's;' +
        'width:' + (6 + Math.random() * 8) + 'px;' +
        'height:' + (8 + Math.random() * 10) + 'px;' +
        'border-radius:' + (Math.random() > 0.5 ? '50%' : '2px') + ';';
      wrap.appendChild(p);
    }
    container.insertBefore(wrap, container.firstChild);
    setTimeout(function () {
      if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
    }, 2200);
  }

  /* ── Print badge ── */
  function printBadge(moduleName, dateStr) {
    var win = window.open('', '_blank', 'width=600,height=500');
    if (!win) return;
    var lang = getLang();
    win.document.write(
      '<!DOCTYPE html><html lang="' + lang + '"><head>' +
      '<meta charset="UTF-8"><title>' + t('printTitle') + '</title>' +
      '<style>' +
        'body{margin:0;font-family:Georgia,serif;background:#f0f4ff;display:flex;align-items:center;justify-content:center;min-height:100vh;}' +
        '.badge{width:520px;background:#fff;border:3px solid #1565C0;border-radius:16px;padding:40px;text-align:center;box-shadow:0 4px 24px rgba(0,0,0,0.12);}' +
        '.badge-header{font-size:13px;text-transform:uppercase;letter-spacing:.1em;color:#1565C0;margin-bottom:8px;}' +
        '.badge-icon{font-size:72px;margin:16px 0;}' +
        '.badge-title{font-size:15px;text-transform:uppercase;letter-spacing:.12em;color:#64748b;margin-bottom:12px;}' +
        '.badge-module{font-size:22px;font-weight:bold;color:#0F1B2D;margin:0 0 8px;}' +
        '.badge-date{font-size:14px;color:#64748b;margin-bottom:24px;}' +
        '.badge-footer{font-size:12px;color:#94a3b8;border-top:1px solid #e2e8f0;padding-top:16px;margin-top:16px;}' +
        '@media print{body{background:#fff;}.badge{box-shadow:none;border-color:#1565C0;}}' +
      '</style></head><body>' +
      '<div class="badge">' +
        '<div class="badge-header">' + t('printFrom') + '</div>' +
        '<div class="badge-icon">🎓</div>' +
        '<div class="badge-title">' + t('printTitle') + '</div>' +
        '<div class="badge-module">' + moduleName + '</div>' +
        '<div class="badge-date">' + dateStr + '</div>' +
        '<div class="badge-footer">digitalconfidencecentre.ca</div>' +
      '</div>' +
      '<script>setTimeout(function(){window.print();},400);<\/script>' +
      '</body></html>'
    );
    win.document.close();
  }

  /* ── Show completion state ── */
  function showCompletionUI(actionDiv, moduleName, moduleNum, dateStr, animate) {
    var lang = getLang();
    actionDiv.innerHTML =
      '<div class="mc-complete-banner">' +
        '<div class="mc-complete-icon">🎉</div>' +
        '<div class="mc-complete-body">' +
          '<p class="mc-complete-msg">' + t('completedMsg') + '<strong>' + moduleName + '</strong></p>' +
          '<p class="mc-complete-sub">' + t('celebrate') + '</p>' +
        '</div>' +
      '</div>' +
      '<button class="mc-print-btn" data-module="' + moduleNum + '" data-date="' + dateStr + '">' +
        t('printBadge') +
      '</button>';

    if (animate) {
      launchConfetti(actionDiv);
    }

    actionDiv.querySelector('.mc-print-btn').addEventListener('click', function () {
      printBadge(moduleName, dateStr);
    });
  }

  /* ── Main init ── */
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('.btn-mark-complete');
    if (!btn) return;

    var actionDiv = btn.closest('.module-complete-action') || btn.parentNode;
    var moduleNum = getModuleNum(btn);
    var moduleName = getModuleName();
    var key = completionKey(moduleNum);
    var dateKey = completionDateKey(moduleNum);

    /* Already complete? Show completion UI without animation */
    if (localStorage.getItem(key) === 'true') {
      var savedDate = localStorage.getItem(dateKey) || '';
      showCompletionUI(actionDiv, moduleName, moduleNum, savedDate, false);
      return;
    }

    /* Intercept the button click */
    btn.addEventListener('click', function (e) {
      var dateStr = new Date().toLocaleDateString('en-CA', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
      localStorage.setItem(key, 'true');
      localStorage.setItem(dateKey, dateStr);

      /* Call the existing progress.js function if available */
      if (typeof markModuleComplete === 'function') {
        markModuleComplete(moduleNum);
      }

      showCompletionUI(actionDiv, moduleName, moduleNum, dateStr, true);
    });
  });

})();
