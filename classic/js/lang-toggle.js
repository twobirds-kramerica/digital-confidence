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
    '2.5 Everyday Tasks':      '2.5 Tâches quotidiennes',
    '3. Passwords':            '3. Mots de passe',
    '4. App Store Safety':     '4. Sécurité de l\'App Store',
    '5. Email & Messages':     '5. Courriel et messages',
    '6. Banking':              '6. Services bancaires',
    '7. Photos & Memories':    '7. Photos et souvenirs',
    '8. Stay Connected':       '8. Rester connecté',
    '9. Understanding AI':     '9. Comprendre l\'IA',
    '10. Grocery & Delivery':  '10. Épicerie et livraison',
    '11. Ride-Sharing':        '11. Transport à la demande',
    '12. Getting Help':        '12. Obtenir de l\'aide',
    '13. Social Media':        '13. Médias sociaux',
    '14. Smart Home':          '14. Maison intelligente',
    '15. Telehealth':          '15. Télémédecine',
    '16. Travel Safety':       '16. Sécurité en voyage',
    '17. AI Research':         '17. Recherche avec l\'IA',
    'Living Alone Safely':     'Vivre seul en sécurité',
    'Show Me! (Bonus)':        'Montrez-moi ! (Bonus)',
    'Set Up for a Loved One':  'Pour un proche',
    'Resources':               'Ressources',
    'Print Centre':            'Centre d\'impression',
    'Recommended Tools':       'Outils recommandés',
    'Scam Simulator':          'Simulateur d\'arnaques',
    'Get Help':                'Obtenir de l\'aide',
    'Glossary':                'Glossaire',
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

  /* Structural aria-label translations for shared UI controls */
  var ARIA_MAP = {
    'Accessibility controls':            'Contrôles d\'accessibilité',
    'Small text':                        'Petit texte',
    'Medium text':                       'Texte moyen',
    'Large text':                        'Grand texte',
    'Extra large text':                  'Très grand texte',
    'Switch to dark mode':               'Passer en mode sombre',
    'Switch to light mode':              'Passer en mode clair',
    'Open navigation menu':              'Ouvrir le menu de navigation',
    'Close navigation':                  'Fermer la navigation',
    'Main navigation':                   'Navigation principale',
    'Footer navigation':                 'Navigation du pied de page',
    'How to have this page read aloud':  'Comment faire lire cette page à voix haute',
    'Related modules':                   'Modules connexes',
    'Print this module':                 'Imprimer ce module',
    'Open settings':                     'Ouvrir les paramètres'
  };

  /* Placeholder translations */
  var PLACEHOLDER_MAP = {
    'Your email address (optional)': 'Votre adresse courriel (facultatif)',
    'Type here...':                  'Écrivez ici...',
    'Search...':                     'Rechercher...'
  };

  var FOOTER_LINKS_MAP = {
    'Home':                'Accueil',
    'Modules':             'Modules',
    'Resources':           'Ressources',
    'Print Centre':        'Centre d\'impression',
    'Recommended Tools':   'Outils recommandés',
    'FAQ':                 'FAQ',
    'Glossary':            'Glossaire',
    'What\'s Coming':      'Prochainement',
    'For Families':        'Pour les familles',
    'About':               'À propos',
    'Privacy Policy':      'Politique de confidentialité',
    'Ideas & Feedback':    'Idées et commentaires',
    'Get Help':            'Obtenir de l\'aide'
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

    /* --- Structural aria-labels --- */
    document.querySelectorAll('[aria-label]').forEach(function (el) {
      var en = el.getAttribute('data-aria-en') || el.getAttribute('aria-label');
      /* Store original EN value on first run */
      if (!el.hasAttribute('data-aria-en')) {
        el.setAttribute('data-aria-en', en);
      }
      var fr = ARIA_MAP[en];
      if (fr) {
        el.setAttribute('aria-label', isFR ? fr : en);
      } else if (!isFR) {
        /* Restore English on toggle back */
        el.setAttribute('aria-label', en);
      }
    });

    /* --- Placeholder text --- */
    document.querySelectorAll('[placeholder]').forEach(function (el) {
      var en = el.getAttribute('data-placeholder-en') || el.getAttribute('placeholder');
      if (!el.hasAttribute('data-placeholder-en')) {
        el.setAttribute('data-placeholder-en', en);
      }
      var fr = PLACEHOLDER_MAP[en];
      if (fr) {
        el.setAttribute('placeholder', isFR ? fr : en);
      } else if (!isFR) {
        el.setAttribute('placeholder', en);
      }
    });

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
        footerSupport.innerHTML = 'Besoin d\'aide? Appelez <strong>Connected Canadians</strong> gratuitement&nbsp;:<br><a href="tel:+18773045813">1-877-304-5813</a>';
      } else {
        footerSupport.innerHTML = footerSupport.getAttribute('data-en-html');
      }
    }

    /* Footer copyright */
    var footerCopy = document.querySelector('.footer-copy');
    if (footerCopy) {
      storeEn(footerCopy);
      footerCopy.textContent = isFR
        ? '\u00A9 ' + new Date().getFullYear() + ' Two Birds. Fait avec soin en Ontario, Canada.'
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

    /* Feedback FAB button */
    var fab = document.getElementById('dc-unified-feedback-btn');
    if (fab) {
      var fabLabel = fab.querySelector('.dc-fab-label');
      if (fabLabel) fabLabel.textContent = isFR ? 'Idées et commentaires' : 'Ideas & Feedback';
      fab.setAttribute('aria-label', isFR ? 'Partager vos idées ou commentaires' : 'Share ideas or feedback');
    }

    /* Feedback modal text */
    var modalTitle = document.getElementById('dc-modal-title');
    if (modalTitle) modalTitle.innerHTML = isFR ? 'Idées et commentaires 💬' : 'Ideas &amp; Feedback 💬';

    var modalClose = document.getElementById('dc-modal-close');
    if (modalClose) {
      modalClose.textContent = isFR ? '\u00d7 Fermer' : '\u00d7 Close';
      modalClose.setAttribute('aria-label', isFR ? 'Fermer la fenêtre' : 'Close feedback');
    }

    var writtenTab = document.getElementById('dc-tab-written');
    if (writtenTab) writtenTab.innerHTML = isFR ? '\u270d\ufe0f \u00c9crit' : '\u270d\ufe0f Written';

    var voiceTab = document.getElementById('dc-tab-voice');
    if (voiceTab) voiceTab.innerHTML = isFR ? '\ud83c\udfa4 Voix' : '\ud83c\udfa4 Voice';

    var submitBtn = document.getElementById('dc-submit-btn');
    if (submitBtn && !submitBtn.dataset.submitting) {
      submitBtn.textContent = isFR ? 'Envoyer' : 'Send Feedback';
    }

    /* Generic data-en / data-fr elements (e.g. recommended-tools page) */
    document.querySelectorAll('[data-fr]').forEach(function (el) {
      /* Store original EN text on first run if data-en not already set */
      if (!el.hasAttribute('data-en')) {
        el.setAttribute('data-en', el.textContent.trim());
      }
      var frText = el.getAttribute('data-fr');
      var enText = el.getAttribute('data-en');
      /* Copyright-year literals baked into data-en/data-fr strings can't
         host a live <span>; recompute the year here instead so a language
         toggle never re-displays a stale hardcoded year. */
      var curYear = new Date().getFullYear();
      frText = frText.replace(/©\s*2026/, '© ' + curYear);
      enText = enText.replace(/©\s*2026/, '© ' + curYear);
      if (el.tagName === 'A') {
        /* For links, preserve href — only swap visible text */
        el.textContent = isFR ? frText : enText;
      } else {
        el.textContent = isFR ? frText : enText;
      }
    });

    /* Persist */
    try { localStorage.setItem('dc-lang', lang); } catch (e) {}

    /* Sync Direction B lang-bar button active state */
    document.querySelectorAll('.lang-bar-btn').forEach(function (btn) {
      var isActive = btn.id === 'lang-btn-' + lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  }

  /* Expose globally for lang-bar buttons */
  window.setLang = applyLang;

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
