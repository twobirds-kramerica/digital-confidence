/* =============================================================
   Digital Confidence Centre — Progress Celebration Milestones
   Triggers at 25%, 50%, 75%, and 100% completion.
   Each milestone fires only once (localStorage flag).
   100% triggers CSS confetti animation + certificate link.
   ============================================================= */
(function () {
  'use strict';

  /* ── Module keys (29 numbered modules — 31 counting 2.5 and 2) ── */
  var MODULE_KEYS = [
    '1','2','2.5','3','4','5','6','7','8','9','10',
    '11','12','13','14','15','16','17','18','19',
    '20','21','22','23','24','25','26','27','28','29'
  ];
  var TOTAL = MODULE_KEYS.length; /* 31 unique numbered entries */

  /* ── Language ── */
  var isFr = (localStorage.getItem('dc-lang') || navigator.language || 'en')
    .toLowerCase().startsWith('fr');

  /* ── Count completed ── */
  function countDone() {
    var n = 0;
    MODULE_KEYS.forEach(function (key) {
      if (localStorage.getItem('dc-module-' + key + '-complete') === 'true') n++;
    });
    return n;
  }

  /* ── Milestones ── */
  var MILESTONES = [
    {
      pct: 25,
      flag: 'dcc-milestone-25',
      en: { title: "You're building real confidence!",
            body:  "You've completed {X} modules — you already know more than most. Keep going!" },
      fr: { title: 'Vous construisez une vraie confiance\u00a0!',
            body:  'Vous avez terminé {X} modules — vous en savez déjà plus que la plupart des gens. Continuez\u00a0!' },
      bg: '#e8f5e9', accent: '#2e7d32', icon: '🌱'
    },
    {
      pct: 50,
      flag: 'dcc-milestone-50',
      en: { title: "Halfway there! You've learned so much already.",
            body:  "You've completed {X} modules. That's half the programme — you're doing brilliantly!" },
      fr: { title: 'À mi-chemin\u00a0! Vous avez déjà appris tellement.',
            body:  'Vous avez terminé {X} modules. C\'est la moitié du programme — vous vous débrouillez brillamment\u00a0!' },
      bg: '#e3f2fd', accent: '#1565C0', icon: '🏅'
    },
    {
      pct: 75,
      flag: 'dcc-milestone-75',
      en: { title: "Almost done! Just a few more modules to go.",
            body:  "You've completed {X} modules — the finish line is in sight. Don't stop now!" },
      fr: { title: 'Presque terminé\u00a0! Plus que quelques modules.',
            body:  'Vous avez terminé {X} modules — la ligne d\'arrivée est en vue. N\'arrêtez pas maintenant\u00a0!' },
      bg: '#fff3e0', accent: '#e65100', icon: '🌟'
    },
    {
      pct: 100,
      flag: 'dcc-milestone-100',
      en: { title: "You've completed the Digital Confidence Centre programme!",
            body:  "You've finished all {X} modules. You are now equipped to navigate the digital world safely and confidently. Congratulations!" },
      fr: { title: 'Vous avez terminé le programme du Centre de confiance numérique\u00a0!',
            body:  'Vous avez terminé les {X} modules. Vous êtes maintenant prêt·e à naviguer le monde numérique en toute sécurité et confiance. Félicitations\u00a0!' },
      bg: '#f3e5f5', accent: '#6a1b9a', icon: '🏆',
      confetti: true,
      cta: { en: 'Get your certificate →', fr: 'Obtenir votre certificat →', href: 'final-quiz.html' }
    }
  ];

  /* ── Check which milestone just became earned ── */
  function checkMilestones(count) {
    var pct = Math.round((count / TOTAL) * 100);
    MILESTONES.forEach(function (m) {
      if (pct >= m.pct && !localStorage.getItem(m.flag)) {
        localStorage.setItem(m.flag, 'true');
        showMilestone(m, count);
      }
    });
  }

  /* ── Show milestone banner ── */
  function showMilestone(m, count) {
    var lang = isFr ? m.fr : m.en;
    var body = lang.body.replace('{X}', count);

    var banner = document.createElement('div');
    banner.className = 'dcc-milestone-banner';
    banner.setAttribute('role', 'alert');
    banner.setAttribute('aria-live', 'assertive');
    banner.style.cssText = [
      'position:fixed;bottom:24px;left:50%;transform:translateX(-50%)',
      'background:' + m.bg + ';border:2px solid ' + m.accent,
      'border-radius:16px;padding:20px 28px;max-width:480px;width:calc(100% - 48px)',
      'box-shadow:0 8px 32px rgba(0,0,0,0.18);z-index:8000',
      'animation:dcc-slide-up 0.5s ease-out both',
      'box-sizing:border-box;text-align:center'
    ].join(';');

    var ctaHtml = '';
    if (m.cta) {
      var ctaLabel = isFr ? m.cta.fr : m.cta.en;
      ctaHtml = '<a href="' + m.cta.href + '" style="' +
        'display:inline-block;margin-top:12px;padding:10px 20px;' +
        'background:' + m.accent + ';color:#fff;border-radius:8px;' +
        'text-decoration:none;font-weight:700;font-size:0.95rem' +
        '">' + ctaLabel + '</a>';
    }

    var dismissLabel = isFr ? 'Fermer' : 'Dismiss';
    banner.innerHTML =
      '<div style="font-size:2.5rem;margin-bottom:8px" aria-hidden="true">' + m.icon + '</div>' +
      '<strong style="display:block;font-size:1.1rem;color:' + m.accent + ';margin-bottom:8px;line-height:1.4">' + lang.title + '</strong>' +
      '<p style="margin:0;color:#333;font-size:0.95rem;line-height:1.6">' + body + '</p>' +
      ctaHtml +
      '<button style="' +
        'display:block;margin:14px auto 0;background:none;border:none;' +
        'color:#888;font-size:0.82rem;cursor:pointer;text-decoration:underline;padding:2px 6px' +
      '" onclick="this.closest(\'.dcc-milestone-banner\').remove()">' + dismissLabel + '</button>';

    document.body.appendChild(banner);

    /* Auto-dismiss after 12 seconds */
    setTimeout(function () {
      if (banner.parentNode) {
        banner.style.animation = 'dcc-slide-down 0.4s ease-in both';
        setTimeout(function () { if (banner.parentNode) banner.remove(); }, 400);
      }
    }, 12000);

    /* Trigger confetti if 100% */
    if (m.confetti) launchConfetti();
  }

  /* ── CSS Confetti ── */
  function launchConfetti() {
    /* Inject keyframes once */
    if (!document.getElementById('dcc-confetti-styles')) {
      var style = document.createElement('style');
      style.id = 'dcc-confetti-styles';
      style.textContent = [
        '@keyframes dcc-confetti-fall {',
        '  0%   { transform: translateY(-10px) rotate(0deg); opacity:1; }',
        '  100% { transform: translateY(100vh) rotate(720deg); opacity:0; }',
        '}',
        '@keyframes dcc-slide-up {',
        '  from { transform:translateX(-50%) translateY(40px); opacity:0; }',
        '  to   { transform:translateX(-50%) translateY(0); opacity:1; }',
        '}',
        '@keyframes dcc-slide-down {',
        '  from { transform:translateX(-50%) translateY(0); opacity:1; }',
        '  to   { transform:translateX(-50%) translateY(40px); opacity:0; }',
        '}'
      ].join('');
      document.head.appendChild(style);
    }

    var colours = ['#1565C0','#2e7d32','#e65100','#6a1b9a','#f5a623','#d32f2f','#0288d1','#388e3c'];
    var shapes  = ['■', '●', '▲', '★', '♦'];
    var container = document.createElement('div');
    container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:7999;overflow:hidden';
    document.body.appendChild(container);

    for (var i = 0; i < 80; i++) {
      (function (idx) {
        setTimeout(function () {
          var piece = document.createElement('span');
          piece.textContent = shapes[idx % shapes.length];
          piece.setAttribute('aria-hidden', 'true');
          var leftPct  = Math.random() * 100;
          var duration = 2.5 + Math.random() * 2;
          var size     = 0.8 + Math.random() * 0.8;
          var colour   = colours[idx % colours.length];
          piece.style.cssText = [
            'position:absolute;top:-20px',
            'left:' + leftPct + '%',
            'color:' + colour,
            'font-size:' + size + 'rem',
            'animation:dcc-confetti-fall ' + duration + 's ease-in forwards',
            'user-select:none'
          ].join(';');
          container.appendChild(piece);
          setTimeout(function () { piece.remove(); }, duration * 1000 + 100);
        }, idx * 40);
      })(i);
    }

    /* Remove container after all pieces fall */
    setTimeout(function () { container.remove(); }, 80 * 40 + 4600);
  }

  /* ── Also inject slide keyframes for non-confetti banners ── */
  function ensureSlideStyles() {
    if (!document.getElementById('dcc-confetti-styles')) {
      var style = document.createElement('style');
      style.id = 'dcc-confetti-styles';
      style.textContent = [
        '@keyframes dcc-slide-up {',
        '  from { transform:translateX(-50%) translateY(40px); opacity:0; }',
        '  to   { transform:translateX(-50%) translateY(0); opacity:1; }',
        '}',
        '@keyframes dcc-slide-down {',
        '  from { transform:translateX(-50%) translateY(0); opacity:1; }',
        '  to   { transform:translateX(-50%) translateY(40px); opacity:0; }',
        '}'
      ].join('');
      document.head.appendChild(style);
    }
  }

  /* ── Main: run check when page loads ── */
  function run() {
    ensureSlideStyles();
    /* Only check on homepage or module pages */
    var path = window.location.pathname.split('/').pop();
    var isHomepage = (path === '' || path === 'index.html');
    var isModulePage = /^module/.test(path);
    if (!isHomepage && !isModulePage) return;

    var count = countDone();
    if (count > 0) checkMilestones(count);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

  /* ── Re-check when module-complete event fires ── */
  document.addEventListener('dc-module-complete', function () {
    var count = countDone();
    checkMilestones(count);
  });

})();
