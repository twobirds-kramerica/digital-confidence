/* =============================================================
   Digital Confidence Centre — Homepage Personalisation V2
   Uses onboarding data (dcc_goal, dcc_device, dcc_name) to:
   - Show goal-based "Recommended for you" featured module
   - Show device-specific tip in hero
   - Show "Continue where you left off" with timestamp
   Gracefully degrades if no onboarding data.
   ============================================================= */
(function () {
  'use strict';

  var goal   = localStorage.getItem('dcc_goal')   || '';
  var device = localStorage.getItem('dcc_device') || '';
  var name   = localStorage.getItem('dcc_name')   || localStorage.getItem('dc-user-name') || '';
  var lang   = localStorage.getItem('dc-lang') || '';
  var isFr   = lang === 'fr';

  if (!goal && !device && !name) return; /* no onboarding data — show default homepage */

  document.addEventListener('DOMContentLoaded', function () {

    /* ── 1. Featured module "Recommended for you" ─────────────────────── */
    var featuredMap = {
      safety: { module: 2, href: 'module-2.html', badge: 'Recommended for you', badgeFr: 'Recommandé pour vous',
        reason: 'Based on your goal: feeling safer online',
        reasonFr: 'Basé sur votre objectif\u00a0: vous sentir plus en sécurité en ligne' },
      family: { module: 8, href: 'module-8.html', badge: 'Start here for family connection', badgeFr: 'Commencez ici pour la famille',
        reason: 'Based on your goal: connecting with family',
        reasonFr: 'Basé sur votre objectif\u00a0: rester en contact avec la famille' },
      setup:  { module: 1, href: 'module-1.html', badge: 'Start here', badgeFr: 'Commencez ici',
        reason: 'The most important skill on any device',
        reasonFr: 'La compétence la plus importante sur tout appareil' }
    };

    var rec = featuredMap[goal];
    if (rec) {
      /* Find the module card for this module and inject a recommendation banner */
      var card = document.querySelector('.module-card[data-module="' + rec.module + '"]');
      if (card) {
        /* Scroll card to first position visually if possible */
        var badge = document.createElement('div');
        badge.style.cssText = [
          'background:#1565C0;color:#fff;font-size:0.78rem;font-weight:700',
          'padding:4px 10px;border-radius:4px 4px 0 0;text-align:center',
          'letter-spacing:0.04em;text-transform:uppercase'
        ].join(';');
        badge.textContent = isFr ? rec.badgeFr : rec.badge;

        var reasonEl = document.createElement('p');
        reasonEl.style.cssText = 'font-size:0.8rem;color:#555;margin:4px 0 0;font-style:italic';
        reasonEl.textContent = isFr ? rec.reasonFr : rec.reason;

        card.style.border = '2px solid #1565C0';
        card.style.borderRadius = '8px';
        card.style.position = 'relative';
        card.insertBefore(badge, card.firstChild);

        var cardContent = card.querySelector('.card-content');
        if (cardContent) cardContent.appendChild(reasonEl);
      }
    }

    /* ── 2. Device tip in hero ─────────────────────────────────────────── */
    var tipMap = {
      ipad:     { en: 'Tip for iPad: Make text larger — go to Settings (the grey gear icon) → Display & Text Size → Larger Text.',
                  fr: 'Conseil pour iPad\u00a0: Agrandissez le texte — allez dans Réglages (l\u2019icône grise) → Accessibilité → Taille du texte.' },
      iphone:   { en: 'Tip for iPhone: Double-tap the Home button (or swipe up) to switch between apps — or close the one you don\u2019t need.',
                  fr: 'Conseil pour iPhone\u00a0: Appuyez deux fois sur le bouton principal pour passer d\u2019une application à l\u2019autre.' },
      computer: { en: 'Tip for computers: Press Ctrl and + together to make everything larger on screen.',
                  fr: 'Conseil pour ordinateur\u00a0: Appuyez sur Ctrl et + pour agrandir tout ce qui est à l\u2019écran.' },
      notsure:  null
    };

    var tip = tipMap[device];
    if (tip) {
      var tipText = isFr ? tip.fr : tip.en;
      var tipBox = document.createElement('div');
      tipBox.style.cssText = [
        'background:#e8f5e9;border-left:4px solid #2e7d32;border-radius:0 8px 8px 0',
        'padding:12px 16px;margin:16px 0;font-size:0.95rem;line-height:1.6;color:#1a1a1a'
      ].join(';');
      tipBox.innerHTML = '<strong>💡 ' + (isFr ? 'Conseil' : 'Tip') + '</strong><br>' + tipText;

      /* Insert after the H1 on the homepage */
      var h1 = document.querySelector('.main-content h1');
      if (h1 && h1.parentNode) {
        h1.parentNode.insertBefore(tipBox, h1.nextSibling);
      }
    }

    /* ── 3. "Continue where you left off" ──────────────────────────────── */
    var lastModule = null;
    var lastVisited = null;
    var lastTs = 0;
    for (var i = 1; i <= 17; i++) {
      var ts = parseInt(localStorage.getItem('dc-module-' + i + '-visited') || '0', 10);
      if (ts > lastTs) { lastTs = ts; lastModule = i; }
    }
    /* Fallback: check completed modules */
    if (!lastModule) {
      for (var j = 1; j <= 17; j++) {
        if (localStorage.getItem('dc-module-' + j + '-complete') === 'true') {
          lastModule = j;
        }
      }
    }

    if (lastModule && lastTs) {
      var d = new Date(lastTs);
      var dateStr = d.toLocaleDateString(isFr ? 'fr-CA' : 'en-CA', { month: 'long', day: 'numeric', year: 'numeric' });
      var continueSection = document.createElement('div');
      continueSection.style.cssText = [
        'background:#fff3e0;border-left:4px solid #e65100;border-radius:0 8px 8px 0',
        'padding:14px 16px;margin:16px 0;font-size:0.95rem'
      ].join(';');
      var contTitle = isFr ? 'Continuer là où vous en étiez' : 'Continue where you left off';
      var contBody  = isFr
        ? 'Votre dernière visite\u00a0: <strong>Module ' + lastModule + '</strong> le ' + dateStr + '.'
        : 'Last visited\u00a0: <strong>Module ' + lastModule + '</strong> on ' + dateStr + '.';
      var contLink  = isFr ? 'Reprendre →' : 'Pick up where you left off →';
      continueSection.innerHTML =
        '<strong>📖 ' + contTitle + '</strong><br>' +
        contBody + '<br>' +
        '<a href="module-' + lastModule + '.html" style="color:#e65100;font-weight:600;margin-top:6px;display:inline-block">' + contLink + '</a>';

      var h1b = document.querySelector('.main-content h1');
      if (h1b && h1b.parentNode) {
        h1b.parentNode.insertBefore(continueSection, h1b.nextSibling);
      }
    }

    /* ── 4. Module visit tracker ────────────────────────────────────────── */
    /* Track when modules are visited so "continue" works */
    /* (Runs on module pages, not homepage — handled by module-visit-tracker below) */

  });

})();

/* ── Module visit timestamp tracker (runs on all pages) ──────────────── */
(function () {
  'use strict';
  var path = window.location.pathname + window.location.search;
  var match = path.match(/module-(\d+)/);
  if (match) {
    var modNum = parseInt(match[1], 10);
    if (modNum >= 1 && modNum <= 17) {
      localStorage.setItem('dc-module-' + modNum + '-visited', Date.now().toString());
    }
  }
})();
