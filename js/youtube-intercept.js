/* ============================================================
   Digital Confidence Centre — YouTube Intercept Modal
   Intercepts youtube.com / youtu.be links, shows a viewing-
   tips modal, then opens the video in a new tab on confirm.
   ============================================================ */

(function () {
  'use strict';

  /* ── Modal HTML ── */
  var MODAL_HTML =
    '<div id="yt-intercept-backdrop" role="dialog" aria-modal="true" ' +
         'aria-labelledby="yt-modal-title" aria-describedby="yt-modal-desc" ' +
         'tabindex="-1">' +
      '<div class="yt-modal-box">' +
        '<h2 id="yt-modal-title" class="yt-modal-title">' +
          '<span aria-hidden="true">▶️</span> Opening a Video' +
        '</h2>' +
        '<p id="yt-modal-desc" class="yt-modal-desc">' +
          'You\'re about to open a YouTube video in a new tab. Here are a few tips before you go:' +
        '</p>' +
        '<ul class="yt-tip-list">' +
          '<li>You can <strong>close the tab</strong> when you\'re done and return here.</li>' +
          '<li>If YouTube suggests other videos — it\'s okay to ignore them.</li>' +
          '<li>You won\'t lose your place in this lesson.</li>' +
        '</ul>' +
        '<div class="yt-modal-actions">' +
          '<button id="yt-confirm-btn" class="yt-btn yt-btn-primary">Watch Video</button>' +
          '<button id="yt-cancel-btn" class="yt-btn yt-btn-secondary">Stay Here</button>' +
        '</div>' +
        '<label class="yt-dont-show-again">' +
          '<input type="checkbox" id="yt-skip-cb" /> ' +
          'Don\'t show this tip again' +
        '</label>' +
      '</div>' +
    '</div>';

  /* ── Inject modal once ── */
  function injectModal() {
    if (document.getElementById('yt-intercept-backdrop')) return;
    var div = document.createElement('div');
    div.innerHTML = MODAL_HTML;
    document.body.appendChild(div.firstChild);
    addModalStyles();
  }

  /* ── Styles ── */
  function addModalStyles() {
    var style = document.createElement('style');
    style.textContent =
      '#yt-intercept-backdrop{' +
        'display:none;position:fixed;inset:0;background:rgba(0,0,0,0.55);' +
        'z-index:999999;align-items:center;justify-content:center;padding:16px;' +
      '}' +
      '#yt-intercept-backdrop.yt-open{display:flex;}' +
      '.yt-modal-box{' +
        'background:#fff;border-radius:16px;padding:28px 24px 24px;max-width:460px;' +
        'width:100%;box-shadow:0 8px 32px rgba(0,0,0,0.25);' +
      '}' +
      '.yt-modal-title{font-size:1.3rem;margin:0 0 12px;color:#1a1a2e;}' +
      '.yt-modal-desc{font-size:1rem;margin:0 0 12px;color:#333;line-height:1.5;}' +
      '.yt-tip-list{margin:0 0 20px;padding-left:20px;color:#333;line-height:1.8;font-size:0.95rem;}' +
      '.yt-modal-actions{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px;}' +
      '.yt-btn{' +
        'flex:1;min-width:120px;padding:12px 20px;border-radius:50px;font-size:1rem;' +
        'font-weight:600;cursor:pointer;border:none;font-family:inherit;transition:background 0.15s;' +
      '}' +
      '.yt-btn-primary{background:#c00;color:#fff;}' +
      '.yt-btn-primary:hover{background:#a00;}' +
      '.yt-btn-secondary{background:#f0f0f0;color:#333;}' +
      '.yt-btn-secondary:hover{background:#ddd;}' +
      '.yt-dont-show-again{font-size:0.85rem;color:#555;display:flex;align-items:center;gap:8px;cursor:pointer;}' +
      '.yt-dont-show-again input{width:18px;height:18px;cursor:pointer;}' +
      '@media(max-width:480px){' +
        '.yt-modal-box{padding:20px 16px 18px;}' +
        '.yt-btn{font-size:0.95rem;padding:11px 14px;}' +
      '}';
    document.head.appendChild(style);
  }

  /* ── Show modal for a given URL ── */
  function showModal(url) {
    var backdrop = document.getElementById('yt-intercept-backdrop');
    if (!backdrop) return;

    backdrop.classList.add('yt-open');
    backdrop.focus();

    var confirmBtn = document.getElementById('yt-confirm-btn');
    var cancelBtn  = document.getElementById('yt-cancel-btn');
    var skipCb     = document.getElementById('yt-skip-cb');

    /* Remove any previous listeners by cloning */
    var newConfirm = confirmBtn.cloneNode(true);
    var newCancel  = cancelBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newConfirm, confirmBtn);
    cancelBtn.parentNode.replaceChild(newCancel, cancelBtn);

    newConfirm.addEventListener('click', function () {
      if (skipCb && skipCb.checked) {
        localStorage.setItem('yt_intercept_dismissed', 'true');
      }
      closeModal();
      window.open(url, '_blank', 'noopener,noreferrer');
    });

    newCancel.addEventListener('click', closeModal);

    /* Close on backdrop click */
    backdrop.addEventListener('click', function onBackdropClick(e) {
      if (e.target === backdrop) {
        closeModal();
        backdrop.removeEventListener('click', onBackdropClick);
      }
    });

    /* Close on Escape */
    document.addEventListener('keydown', function onKey(e) {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', onKey);
      }
    });
  }

  function closeModal() {
    var backdrop = document.getElementById('yt-intercept-backdrop');
    if (backdrop) backdrop.classList.remove('yt-open');
  }

  /* ── Check if a URL is YouTube ── */
  function isYouTube(href) {
    return /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)(\/|$|\?)/.test(href);
  }

  /* ── Intercept click events ── */
  document.addEventListener('click', function (e) {
    var anchor = e.target.closest('a[href]');
    if (!anchor) return;

    var href = anchor.href;
    if (!isYouTube(href)) return;

    /* Skip if user already dismissed permanently */
    if (localStorage.getItem('yt_intercept_dismissed') === 'true') {
      /* Still ensure opens in new tab */
      if (!anchor.getAttribute('target')) {
        e.preventDefault();
        window.open(href, '_blank', 'noopener,noreferrer');
      }
      return;
    }

    e.preventDefault();
    injectModal();
    showModal(href);
  });

})();
