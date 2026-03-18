/* ============================================
   Digital Confidence Centre
   Language Toggle — EN ↔ FR (Ontario Canadian French)
   No country flags. Fleur-de-lis only.
   ============================================ */

(function () {

  /* ---- Translation dictionaries ---- */

  var NAV_MAP = {
    'Home':                    'Accueil',
    'Foundations':             'Fondements',
    '1. The Escape Hatch':     '1. La sortie de secours',
    '2. Security Shield':      '2. Bouclier de sécurité',
    '3. Passwords':            '3. Mots de passe',
    '4. App Store Safety':     '4. Sécurité de l\'App Store',
    '5. Email & Messages':     '5. Courriel et messages',
    '6. Banking':              '6. Services bancaires',
    '7. Photos & Memories':    '7. Photos et souvenirs',
    '8. Stay Connected':       '8. Rester connecté',
    '9. Understanding AI':     '9. Comprendre l\'IA',
    '10. Grocery & Delivery':  '10. Épicerie et livraison',
    '11. Ride-Sharing':        '11. Transport à la demande',
    'Show Me! (Bonus)':        'Montrez-moi ! (Bonus)',
    'Set Up for a Loved One':  'Pour un proche',
    'Resources':               'Ressources',
    'Scam Simulator':          'Simulateur d\'arnaques',
    'My Settings':             'Mes paramètres',
    'FAQ':                     'FAQ',
    'FAQ (Français)':          'FAQ (Français)',
    'FAQ (English)':           'FAQ (anglais)'
  };

  var A11Y_MAP = {
    'Text Size':                         'Taille du texte',
    'Screen Colour':                     'Couleur de l\'écran',
    'Reading Comfort':                   'Confort de lecture',
    'Dyslexia-Friendly Font':            'Police adaptée à la dyslexie',
    'Easier to read for some people':    'Plus facile à lire pour certaines personnes',
    'Your learning journey':             'Votre parcours d\'apprentissage',
    'Digital Confidence Centre':         'Centre de Confiance Numérique'
  };

  var FOOTER_LINKS_MAP = {
    'Home':              'Accueil',
    'Resources':         'Ressources',
    'FAQ':               'FAQ',
    'For Families':      'Pour les familles',
    'Privacy Policy':    'Politique de confidentialité',
    'Ideas & Feedback':  'Idées et commentaires'
  };

  /* ---- Store original English text on first run ---- */

  function storeEn(el) {
    if (!el.hasAttribute('data-en')) {
      el.setAttribute('data-en', el.textContent.trim());
    }
  }

  function storeInnerEn(el) {
    if (!el.hasAttribute('data-en-html')) {
      el.setAttribute('data-en-html', el.innerHTML);
    }
  }

  /* ---- Apply language ---- */

  function applyLang(lang) {
    var isFR = lang === 'fr';

    /* html lang attribute */
    document.documentElement.lang = isFR ? 'fr-CA' : 'en-CA';

    /* --- Nav labels --- */
    document.querySelectorAll('.nav-label').forEach(function (el) {
      storeEn(el);
      var en = el.getAttribute('data-en');
      el.textContent = (isFR && NAV_MAP[en]) ? NAV_MAP[en] : en;
    });

    /* --- Sidebar section labels / header --- */
    document.querySelectorAll('.sidebar-a11y-title, .sidebar-header p').forEach(function (el) {
      storeEn(el);
      var en = el.getAttribute('data-en');
      el.textContent = (isFR && A11Y_MAP[en]) ? A11Y_MAP[en] : en;
    });

    /* Sidebar header h2 */
    var sideH2 = document.querySelector('.sidebar-header h2');
    if (sideH2) {
      storeEn(sideH2);
      var en = sideH2.getAttribute('data-en');
      sideH2.textContent = isFR ? 'Centre de Confiance Numérique' : en;
    }

    /* Dyslexia toggle label strong + small */
    var dyslexStrong = document.querySelector('#dyslexic-font-toggle ~ .toggle-switch ~ .toggle-text strong');
    var dyslexSmall  = document.querySelector('#dyslexic-font-toggle ~ .toggle-switch ~ .toggle-text small');
    if (dyslexStrong) {
      storeEn(dyslexStrong);
      var en = dyslexStrong.getAttribute('data-en');
      dyslexStrong.textContent = (isFR && A11Y_MAP[en]) ? A11Y_MAP[en] : en;
    }
    if (dyslexSmall) {
      storeEn(dyslexSmall);
      var en = dyslexSmall.getAttribute('data-en');
      dyslexSmall.textContent = (isFR && A11Y_MAP[en]) ? A11Y_MAP[en] : en;
    }

    /* --- Footer --- */
    var footerBrand = document.querySelector('.footer-brand');
    if (footerBrand) {
      storeEn(footerBrand);
      footerBrand.textContent = isFR
        ? 'Centre de Confiance Numérique'
        : footerBrand.getAttribute('data-en');
    }

    var footerTagline = document.querySelector('.footer-tagline');
    if (footerTagline) {
      storeEn(footerTagline);
      footerTagline.textContent = isFR
        ? 'Un programme d\'apprentissage gratuit pour les aînés canadiens'
        : footerTagline.getAttribute('data-en');
    }

    /* Footer nav links */
    document.querySelectorAll('.footer-links a').forEach(function (el) {
      storeEn(el);
      var en = el.getAttribute('data-en');
      el.textContent = (isFR && FOOTER_LINKS_MAP[en]) ? FOOTER_LINKS_MAP[en] : en;
    });

    /* Footer support line */
    var footerSupport = document.querySelector('.footer-support');
    if (footerSupport) {
      storeInnerEn(footerSupport);
      if (isFR) {
        footerSupport.innerHTML = 'Besoin d\'aide? Appelez <strong>Connected Canadians</strong> gratuitement&nbsp;:<br><a href="tel:+18558080505">1-855-808-0505</a>';
      } else {
        footerSupport.innerHTML = footerSupport.getAttribute('data-en-html');
      }
    }

    /* Footer copyright */
    var footerCopy = document.querySelector('.footer-copy');
    if (footerCopy) {
      storeEn(footerCopy);
      footerCopy.textContent = isFR
        ? '\u00A9 2026 Two Birds. Fait avec soin en Ontario, Canada.'
        : footerCopy.getAttribute('data-en');
    }

    /* FAQ language switch link */
    var faqSwitch = document.querySelector('.faq-lang-switch a');
    if (faqSwitch) {
      storeEn(faqSwitch);
      if (isFR) {
        faqSwitch.textContent = '⚜ Lire en français';
      } else {
        faqSwitch.textContent = faqSwitch.getAttribute('data-en');
      }
    }

    /* Update toggle button label */
    var btn = document.getElementById('lang-toggle-btn');
    if (btn) {
      btn.textContent = isFR ? '⚜ EN' : '⚜ FR';
      btn.setAttribute('aria-label', isFR ? 'Switch to English' : 'Passer au français');
      btn.setAttribute('aria-pressed', String(isFR));
    }

    /* Persist */
    try { localStorage.setItem('dc-lang', lang); } catch (e) {}
  }

  /* ---- Inject toggle button into accessibility bar ---- */

  function injectButton() {
    var bar = document.querySelector('.accessibility-bar');
    if (!bar) return;

    var btn = document.createElement('button');
    btn.id = 'lang-toggle-btn';
    btn.className = 'a11y-btn';
    btn.style.cssText = 'font-size:0.82rem;font-weight:700;letter-spacing:0.03em;padding:4px 8px;';
    btn.textContent = '⚜ FR';
    btn.setAttribute('aria-label', 'Passer au français');
    btn.setAttribute('aria-pressed', 'false');

    btn.addEventListener('click', function () {
      var current = document.documentElement.lang || 'en-CA';
      var next = current.startsWith('fr') ? 'en' : 'fr';
      applyLang(next);
    });

    bar.appendChild(btn);
  }

  /* ---- Init ---- */

  function init() {
    injectButton();
    var saved = 'en';
    try { saved = localStorage.getItem('dc-lang') || 'en'; } catch (e) {}
    if (saved === 'fr') {
      applyLang('fr');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
