/* ============================================
   Digital Confidence Centre
   Friendly Confirmation Dialogs
   Replaces browser confirm() with a
   senior-friendly modal for elements
   with a data-confirm attribute.
   ============================================ */

(function () {
  'use strict';

  /* Create the modal DOM once and reuse it */
  var modal = null;
  var resolveCallback = null;

  function buildModal() {
    var overlay = document.createElement('div');
    overlay.id = 'dc-confirm-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'dc-confirm-title');
    overlay.style.cssText = [
      'display:none',
      'position:fixed',
      'inset:0',
      'background:rgba(0,0,0,0.55)',
      'z-index:99999',
      'align-items:center',
      'justify-content:center',
      'padding:1rem'
    ].join(';');

    var box = document.createElement('div');
    box.style.cssText = [
      'background:#fff',
      'border-radius:12px',
      'padding:2rem 1.75rem',
      'max-width:420px',
      'width:100%',
      'box-shadow:0 8px 32px rgba(0,0,0,0.22)',
      'font-family:inherit',
      'text-align:center'
    ].join(';');

    var icon = document.createElement('div');
    icon.id = 'dc-confirm-icon';
    icon.style.cssText = 'font-size:2.5rem;margin-bottom:0.75rem;';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = '⚠️';

    var title = document.createElement('h2');
    title.id = 'dc-confirm-title';
    title.style.cssText = 'font-size:1.25rem;margin:0 0 0.75rem;color:#1a1a1a;';

    var message = document.createElement('p');
    message.id = 'dc-confirm-message';
    message.style.cssText = 'font-size:1.05rem;color:#444;margin:0 0 1.5rem;line-height:1.6;';

    /* "No, take me back" — primary / large button (teal — safe action) */
    var btnNo = document.createElement('button');
    btnNo.id = 'dc-confirm-no';
    btnNo.style.cssText = [
      'display:block',
      'width:100%',
      'padding:0.9rem 1.25rem',
      'margin-bottom:0.75rem',
      'background:#00796B',
      'color:#fff',
      'border:none',
      'border-radius:8px',
      'font-size:1.1rem',
      'font-weight:700',
      'cursor:pointer',
      'font-family:inherit'
    ].join(';');

    /* "Yes, go ahead" — smaller, muted button (grey — not red, avoids anxiety) */
    var btnYes = document.createElement('button');
    btnYes.id = 'dc-confirm-yes';
    btnYes.style.cssText = [
      'display:block',
      'width:100%',
      'padding:0.65rem 1.25rem',
      'background:#fff',
      'color:#555',
      'border:2px solid #bbb',
      'border-radius:8px',
      'font-size:0.95rem',
      'font-weight:600',
      'cursor:pointer',
      'font-family:inherit'
    ].join(';');

    box.appendChild(icon);
    box.appendChild(title);
    box.appendChild(message);
    box.appendChild(btnNo);
    box.appendChild(btnYes);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    /* Close on overlay click (outside the box) */
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) { closeModal(false); }
    });

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.style.display !== 'none') {
        closeModal(false);
      }
    });

    btnNo.addEventListener('click', function () { closeModal(false); });
    btnYes.addEventListener('click', function () { closeModal(true); });

    /* Dark mode */
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      box.style.background = '#1e1e1e';
      title.style.color = '#f5f5f5';
      message.style.color = '#ccc';
    }

    return overlay;
  }

  function openModal(opts) {
    if (!modal) { modal = buildModal(); }

    document.getElementById('dc-confirm-icon').textContent = opts.icon || '⚠️';
    document.getElementById('dc-confirm-title').textContent = opts.title || 'Are you sure?';
    document.getElementById('dc-confirm-message').textContent = opts.message || 'This action cannot be undone.';
    document.getElementById('dc-confirm-no').textContent = opts.cancelLabel || 'No, take me back';
    document.getElementById('dc-confirm-yes').textContent = opts.confirmLabel || 'Yes, go ahead';

    modal.style.display = 'flex';
    document.getElementById('dc-confirm-no').focus();
    resolveCallback = opts.onConfirm || null;
  }

  function closeModal(confirmed) {
    if (modal) { modal.style.display = 'none'; }
    if (confirmed && typeof resolveCallback === 'function') {
      resolveCallback();
    }
    resolveCallback = null;
  }

  /* ── Intercept data-confirm elements ── */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-confirm]');
    if (!el) return;

    e.preventDefault();
    e.stopImmediatePropagation();

    var message = el.getAttribute('data-confirm') || 'Are you sure you want to do this?';
    var title = el.getAttribute('data-confirm-title') || 'Just checking…';
    var icon = el.getAttribute('data-confirm-icon') || '⚠️';
    var cancelLabel = el.getAttribute('data-confirm-cancel') || 'No, take me back';
    var confirmLabel = el.getAttribute('data-confirm-ok') || 'Yes, go ahead';

    /* Determine what to run on confirm */
    var action = null;
    var href = el.getAttribute('href');
    var onclickAttr = el.getAttribute('data-confirm-action');

    if (onclickAttr) {
      action = function () {
        try { eval(onclickAttr); } catch (err) { /* silent */ }
      };
    } else if (href && href !== '#') {
      action = function () { window.location.href = href; };
    } else if (el.tagName === 'BUTTON' || el.tagName === 'INPUT') {
      /* Re-fire the click without the guard */
      action = function () {
        el.removeAttribute('data-confirm');
        el.click();
        el.setAttribute('data-confirm', message);
      };
    }

    openModal({
      icon: icon,
      title: title,
      message: message,
      cancelLabel: cancelLabel,
      confirmLabel: confirmLabel,
      onConfirm: action
    });
  }, true);

  /* ── Upgrade the built-in reset-progress button ── */
  document.addEventListener('DOMContentLoaded', function () {
    var resetBtn = document.querySelector('.btn-reset-progress');
    if (resetBtn) {
      /* Remove the inline onclick confirm() and attach our dialog */
      resetBtn.removeAttribute('onclick');
      resetBtn.setAttribute('data-confirm', 'This will erase all your learning progress and cannot be undone. Are you sure?');
      resetBtn.setAttribute('data-confirm-title', 'Reset Your Progress?');
      resetBtn.setAttribute('data-confirm-icon', '🔄');
      resetBtn.setAttribute('data-confirm-cancel', 'No, keep my progress');
      resetBtn.setAttribute('data-confirm-ok', 'Yes, start fresh');
      resetBtn.setAttribute('data-confirm-action', 'if(typeof resetAllProgress === "function") resetAllProgress();');
    }

    /* Upgrade any clear-notes buttons */
    var clearNotesBtn = document.querySelector('.btn-clear-notes');
    if (clearNotesBtn) {
      clearNotesBtn.removeAttribute('onclick');
      clearNotesBtn.setAttribute('data-confirm', 'This will clear all your saved notes and cannot be undone.');
      clearNotesBtn.setAttribute('data-confirm-title', 'Clear All Notes?');
      clearNotesBtn.setAttribute('data-confirm-icon', '📝');
      clearNotesBtn.setAttribute('data-confirm-cancel', 'No, keep my notes');
      clearNotesBtn.setAttribute('data-confirm-ok', 'Yes, clear notes');
      clearNotesBtn.setAttribute('data-confirm-action', 'if(typeof clearNotes === "function") clearNotes();');
    }
  });

  /* Expose openModal globally in case pages want to trigger it directly */
  window.dcConfirm = openModal;
})();
