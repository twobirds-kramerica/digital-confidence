/* ============================================
   Digital Confidence Centre
   Floating Help Button
   A persistent "? Help" button that appears
   on all pages and shows a small popover
   with three contextual choices.
   ============================================ */

(function () {
  'use strict';

  /* Resolve relative paths from the current page location */
  function resolvePath(path) {
    var depth = window.location.pathname.split('/').length - 2;
    var prefix = '';
    for (var i = 0; i < depth; i++) { prefix += '../'; }
    return prefix + path;
  }

  function buildHelpButton() {
    /* ── Wrapper ── */
    var wrapper = document.createElement('div');
    wrapper.id = 'dc-help-btn-wrapper';
    wrapper.style.cssText = [
      'position:fixed',
      'top:5rem',
      'right:1rem',
      'z-index:9000',
      'font-family:inherit'
    ].join(';');

    /* ── The Button ── */
    var btn = document.createElement('button');
    btn.id = 'dc-help-btn';
    btn.setAttribute('aria-label', 'Open help menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-haspopup', 'true');
    btn.setAttribute('aria-controls', 'dc-help-popover');
    btn.textContent = '? Help';
    btn.style.cssText = [
      'background:#1565C0',
      'color:#fff',
      'border:none',
      'border-radius:22px',
      'padding:0.5rem 1rem',
      'font-size:0.9rem',
      'font-weight:700',
      'cursor:pointer',
      'box-shadow:0 3px 10px rgba(0,0,0,0.25)',
      'font-family:inherit',
      'white-space:nowrap'
    ].join(';');

    /* ── Popover ── */
    var popover = document.createElement('div');
    popover.id = 'dc-help-popover';
    popover.setAttribute('role', 'dialog');
    popover.setAttribute('aria-label', 'Help options');
    popover.setAttribute('aria-modal', 'false');
    popover.style.cssText = [
      'display:none',
      'position:absolute',
      'right:0',
      'top:calc(100% + 0.5rem)',
      'background:#fff',
      'border:1px solid #ddd',
      'border-radius:10px',
      'box-shadow:0 6px 24px rgba(0,0,0,0.18)',
      'width:230px',
      'padding:0.5rem 0',
      'z-index:9001'
    ].join(';');

    var helpOptions = [
      {
        icon: 'ℹ️',
        label: 'About this site',
        labelFr: 'À propos de ce site',
        href: resolvePath('about.html')
      },
      {
        icon: '🔧',
        label: 'Technical problem',
        labelFr: 'Problème technique',
        href: '#',
        onclick: 'if(typeof openFeedbackModal === "function") openFeedbackModal(); return false;'
      },
      {
        icon: '📞',
        label: 'Call for help',
        labelFr: 'Appeler pour de l\'aide',
        href: resolvePath('resources/support-directory.html')
      }
    ];

    var lang = document.documentElement.getAttribute('data-lang') || 'en';

    helpOptions.forEach(function (opt) {
      var item = document.createElement('a');
      item.href = opt.href;
      if (opt.onclick) {
        item.setAttribute('onclick', opt.onclick);
      }
      item.style.cssText = [
        'display:flex',
        'align-items:center',
        'gap:0.6rem',
        'padding:0.65rem 1rem',
        'text-decoration:none',
        'color:#1a1a1a',
        'font-size:0.95rem',
        'border-bottom:1px solid #f0f0f0',
        'font-family:inherit'
      ].join(';');
      item.dataset.en = opt.label;
      item.dataset.fr = opt.labelFr;

      var iconSpan = document.createElement('span');
      iconSpan.setAttribute('aria-hidden', 'true');
      iconSpan.textContent = opt.icon;
      iconSpan.style.cssText = 'font-size:1.1rem;flex-shrink:0;';

      var labelSpan = document.createElement('span');
      labelSpan.textContent = lang === 'fr' ? opt.labelFr : opt.label;

      item.appendChild(iconSpan);
      item.appendChild(labelSpan);

      /* Hover style */
      item.addEventListener('mouseenter', function () {
        item.style.background = '#f0f4ff';
      });
      item.addEventListener('mouseleave', function () {
        item.style.background = '';
      });

      /* Close popover after navigating */
      item.addEventListener('click', function () {
        closePopover();
      });

      popover.appendChild(item);
    });

    /* Remove border from last item */
    var items = popover.querySelectorAll('a');
    if (items.length) {
      items[items.length - 1].style.borderBottom = 'none';
    }

    /* ── Toggle ── */
    var popoverOpen = false;

    function openPopover() {
      popover.style.display = 'block';
      btn.setAttribute('aria-expanded', 'true');
      popoverOpen = true;
      /* Focus first link */
      var first = popover.querySelector('a');
      if (first) { setTimeout(function () { first.focus(); }, 50); }
    }

    function closePopover() {
      popover.style.display = 'none';
      btn.setAttribute('aria-expanded', 'false');
      popoverOpen = false;
    }

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (popoverOpen) { closePopover(); } else { openPopover(); }
    });

    /* Close on outside click */
    document.addEventListener('click', function (e) {
      if (popoverOpen && !wrapper.contains(e.target)) {
        closePopover();
      }
    });

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && popoverOpen) { closePopover(); btn.focus(); }
    });

    /* Dark mode adjustment */
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      popover.style.background = '#1e1e1e';
      popover.style.borderColor = '#333';
      var anchors = popover.querySelectorAll('a');
      anchors.forEach(function (a) {
        a.style.color = '#f5f5f5';
        a.style.borderBottomColor = '#333';
      });
    }

    wrapper.appendChild(btn);
    wrapper.appendChild(popover);
    document.body.appendChild(wrapper);
  }

  /* Inject once DOM is ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildHelpButton);
  } else {
    buildHelpButton();
  }
})();
