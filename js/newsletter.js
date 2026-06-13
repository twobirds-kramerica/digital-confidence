/**
 * newsletter.js
 * "Get weekly tips" signup — mailto-based, localStorage confirmed state
 * Injects a newsletter signup widget wherever .dc-newsletter-slot exists
 * Digital Confidence Centre — Two Birds Innovation
 */
(function () {
  'use strict';

  var CONFIRMED_KEY = 'dc-newsletter-signed-up';
  var isFr = (localStorage.getItem('dc-lang') || navigator.language || 'en').startsWith('fr');

  function t(en, fr) { return isFr ? fr : en; }

  function isConfirmed() {
    try { return localStorage.getItem(CONFIRMED_KEY) === 'true'; } catch(e) { return false; }
  }

  function setConfirmed() {
    try { localStorage.setItem(CONFIRMED_KEY, 'true'); } catch(e) {}
  }

  function buildWidget(slot) {
    if (slot.dataset.newsletterInjected) return;
    slot.dataset.newsletterInjected = 'true';
    if (isConfirmed()) {
      slot.innerHTML = buildConfirmedHTML();
      return;
    }
    slot.innerHTML = buildFormHTML();
    var form = slot.querySelector('.nl-form');
    if (!form) return;
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var emailEl = form.querySelector('.nl-email');
      var email   = emailEl ? emailEl.value.trim() : '';
      handleSubmit(email, slot);
    });
  }

  function handleSubmit(email, slot) {
    if (!email || !email.includes('@')) {
      var errEl = slot.querySelector('.nl-error');
      if (errEl) errEl.style.display = 'block';
      return;
    }
    // Open mailto
    var subject = encodeURIComponent(t('Sign me up for Digital Confidence Centre tips', 'Je veux recevoir les conseils du Centre de confiance numérique'));
    var body    = encodeURIComponent(
      t(
        'Hi,\n\nPlease add me to the Digital Confidence Centre weekly tips email list.\n\nMy email: ' + email + '\n\nThank you!',
        'Bonjour,\n\nVeuillez m\'ajouter à la liste de diffusion hebdomadaire du Centre de confiance numérique.\n\nMon courriel : ' + email + '\n\nMerci !'
      )
    );
    window.location.href = 'mailto:hello@twobirds.ca?subject=' + subject + '&body=' + body;
    // Mark as confirmed and show success
    setConfirmed();
    slot.innerHTML = buildConfirmedHTML();
  }

  function buildFormHTML() {
    return [
      '<div class="nl-widget">',
        '<div class="nl-icon">📬</div>',
        '<div class="nl-body">',
          '<strong class="nl-title">' + t('Get weekly digital safety tips', 'Conseils hebdomadaires de sécurité numérique') + '</strong>',
          '<p class="nl-desc">' + t('Short, practical tips delivered by email — free, for Canadian seniors.', 'Conseils courts et pratiques par courriel — gratuits, pour les aînés canadiens.') + '</p>',
          '<form class="nl-form" novalidate>',
            '<div class="nl-input-row">',
              '<input class="nl-email" type="email" placeholder="' + t('Your email address', 'Votre adresse courriel') + '" autocomplete="email" aria-label="' + t('Email address', 'Adresse courriel') + '" required>',
              '<button class="nl-submit" type="submit">' + t('Sign Up', 'S\'inscrire') + '</button>',
            '</div>',
            '<p class="nl-error" style="display:none;color:#c62828;font-size:.82rem;margin-top:.35rem">' + t('Please enter a valid email address.', 'Veuillez entrer une adresse courriel valide.') + '</p>',
            '<p class="nl-fine">' + t('No spam. Unsubscribe anytime by replying "unsubscribe".', 'Pas de spam. Désabonnez-vous en répondant « désabonnement ».') + '</p>',
          '</form>',
        '</div>',
      '</div>'
    ].join('');
  }

  function buildConfirmedHTML() {
    return [
      '<div class="nl-widget nl-widget-confirmed">',
        '<div class="nl-icon">✅</div>',
        '<div class="nl-body">',
          '<strong class="nl-title">' + t('You\'re signed up!', 'Vous êtes inscrit !') + '</strong>',
          '<p class="nl-desc">' + t('Your email app has opened with a pre-filled message. Just send it and we\'ll add you to the list.', 'Votre application de courriel s\'est ouverte avec un message prérempli. Envoyez-le et nous vous ajouterons à la liste.') + '</p>',
        '</div>',
      '</div>'
    ].join('');
  }

  // ── Init all slots on the page ───────────────────────────────────────────
  function initAll() {
    var slots = document.querySelectorAll('.dc-newsletter-slot');
    slots.forEach(function(slot) { buildWidget(slot); });
  }

  // ── Inject CSS ───────────────────────────────────────────────────────────
  function injectStyles() {
    if (document.getElementById('dc-newsletter-styles')) return;
    var style = document.createElement('style');
    style.id = 'dc-newsletter-styles';
    style.textContent = [
      '.nl-widget{display:flex;gap:.85rem;align-items:flex-start;background:var(--color-surface,#fff);border:1.5px solid #1565C0;border-radius:14px;padding:1.1rem 1.25rem;}',
      '.nl-widget-confirmed{border-color:#2e7d32;}',
      '.nl-icon{font-size:1.8rem;flex-shrink:0;line-height:1;margin-top:.1rem;}',
      '.nl-body{flex:1;}',
      '.nl-title{display:block;font-size:1rem;font-weight:700;margin-bottom:.3rem;color:var(--color-text,#1a1a1a);}',
      '.nl-desc{font-size:1rem;color:var(--color-text-light,#50505F);line-height:1.55;margin:0 0 .75rem;}',
      '.nl-input-row{display:flex;gap:.45rem;flex-wrap:wrap;}',
      '.nl-email{flex:1;min-width:180px;padding:.5rem .75rem;border:1px solid #ccc;border-radius:8px;font-size:1rem;font-family:inherit;color:var(--color-text,#1a1a1a);background:var(--color-bg,#fff);min-height:44px;}',
      '.nl-email:focus{outline:2px solid #1565C0;border-color:#1565C0;}',
      '.nl-submit{padding:.5rem 1.1rem;background:#1565C0;color:#fff;border:none;border-radius:8px;font-size:1rem;font-weight:700;cursor:pointer;white-space:nowrap;min-height:44px;}',
      '.nl-submit:hover{background:#0d47a1;}',
      '.nl-fine{font-size:.95rem;color:var(--color-text-light,#50505F);margin:.45rem 0 0;}',
      '[data-theme="dark"] .nl-widget{border-color:#1565C0;}',
      '[data-theme="dark"] .nl-desc{color:#B0B8C1;}',
      '[data-theme="dark"] .nl-email{background:#152030;color:#E0E0E0;border-color:#555;}',
    ].join('');
    document.head.appendChild(style);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){ injectStyles(); initAll(); });
  } else {
    injectStyles(); initAll();
  }

  // Expose for module-complete callback
  window.dcNewsletterRefresh = initAll;
})();
