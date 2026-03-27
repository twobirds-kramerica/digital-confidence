/**
 * module-interact.js
 * Module Notes, 5-star Rating, and Share buttons
 * Digital Confidence Centre — Two Birds Innovation
 */
(function() {
  'use strict';

  // Determine module ID from the page URL (e.g., module-3.html → 3)
  var match = window.location.pathname.match(/module-(\d+)/);
  var moduleId = match ? match[1] : null;
  if (!moduleId) return;

  var noteKey   = 'dc-note-' + moduleId;
  var ratingKey = 'dc-rating-' + moduleId;

  // ── Insert panel after .module-nav ──────────────────────────────────────
  var nav = document.querySelector('.module-nav');
  if (!nav) return;

  var panel = document.createElement('div');
  panel.className = 'module-interact-panel';
  panel.innerHTML = interactHTML(moduleId);
  nav.parentNode.insertBefore(panel, nav.nextSibling);

  // ── Rating ───────────────────────────────────────────────────────────────
  var savedRating = parseInt(localStorage.getItem(ratingKey) || '0', 10);
  renderStars(savedRating);

  panel.querySelectorAll('.mi-star').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var val = parseInt(this.dataset.val, 10);
      localStorage.setItem(ratingKey, val);
      renderStars(val);
      // Dispatch event so homepage cards can pick it up
      window.dispatchEvent(new CustomEvent('dc-rating-saved', { detail: { moduleId: moduleId, rating: val } }));
    });
    btn.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.click(); }
    });
  });

  function renderStars(val) {
    panel.querySelectorAll('.mi-star').forEach(function(s) {
      var n = parseInt(s.dataset.val, 10);
      s.classList.toggle('active', n <= val);
      s.setAttribute('aria-pressed', n <= val ? 'true' : 'false');
    });
    var label = panel.querySelector('.mi-rating-label');
    if (label) {
      label.textContent = val > 0
        ? (window._isFr ? val + ' étoile' + (val > 1 ? 's' : '') + ' sur 5' : val + ' of 5 stars')
        : (window._isFr ? 'Non noté' : 'Not yet rated');
    }
  }

  // ── Notes ────────────────────────────────────────────────────────────────
  var textarea = panel.querySelector('.mi-notes-area');
  if (textarea) {
    textarea.value = localStorage.getItem(noteKey) || '';
    textarea.addEventListener('input', function() {
      localStorage.setItem(noteKey, this.value);
    });
  }

  var clearBtn = panel.querySelector('.mi-notes-clear');
  if (clearBtn) {
    clearBtn.addEventListener('click', function() {
      if (!textarea) return;
      var confirmed = window.confirm(
        window._isFr
          ? 'Effacer toutes vos notes pour ce module?'
          : 'Clear all notes for this module?'
      );
      if (confirmed) {
        textarea.value = '';
        localStorage.removeItem(noteKey);
      }
    });
  }

  var printNotesBtn = panel.querySelector('.mi-notes-print');
  if (printNotesBtn) {
    printNotesBtn.addEventListener('click', function() {
      var title = document.title || 'Module Notes';
      var content = (textarea && textarea.value) || '';
      var win = window.open('', '_blank');
      if (!win) return;
      win.document.write(
        '<!DOCTYPE html><html><head><title>' + escHtml(title) + ' — Notes</title>' +
        '<style>body{font-family:Georgia,serif;padding:2rem;max-width:600px;margin:0 auto}h1{font-size:1.2rem;margin-bottom:1rem}pre{white-space:pre-wrap;font-family:inherit;line-height:1.7}p{color:#666;font-size:.85rem;margin-top:2rem}</style>' +
        '</head><body>' +
        '<h1>' + escHtml(title) + ' — ' + (window._isFr ? 'Mes notes' : 'My Notes') + '</h1>' +
        '<pre>' + escHtml(content) + '</pre>' +
        '<p>' + (window._isFr ? 'Imprimé depuis le Centre de confiance numérique' : 'Printed from Digital Confidence Centre') + '</p>' +
        '</body></html>'
      );
      win.document.close();
      win.focus();
      win.print();
    });
  }

  // ── Share ────────────────────────────────────────────────────────────────
  var shareEmail = panel.querySelector('.mi-share-email');
  if (shareEmail) {
    shareEmail.addEventListener('click', function() {
      var title = document.title || 'Digital Confidence Centre';
      var url   = window.location.href;
      var subj  = encodeURIComponent('I thought you might find this useful: ' + title);
      var body  = encodeURIComponent('Hi,\n\nI found this lesson on the Digital Confidence Centre helpful and thought you might too:\n\n' + url + '\n\nIt\'s free and you can do it at your own pace.\n');
      window.location.href = 'mailto:?subject=' + subj + '&body=' + body;
    });
  }

  var shareCopy = panel.querySelector('.mi-share-copy');
  var shareCopyFb = panel.querySelector('.mi-share-copy-fb');
  if (shareCopy) {
    shareCopy.addEventListener('click', function() {
      navigator.clipboard.writeText(window.location.href).then(function() {
        if (shareCopyFb) {
          shareCopyFb.style.display = 'inline';
          setTimeout(function() { shareCopyFb.style.display = 'none'; }, 2200);
        }
      }).catch(function() {
        // Fallback: prompt
        window.prompt(
          window._isFr ? 'Copiez ce lien :' : 'Copy this link:',
          window.location.href
        );
      });
    });
  }

  var sharePrint = panel.querySelector('.mi-share-print');
  if (sharePrint) {
    sharePrint.addEventListener('click', function() { window.print(); });
  }

  // ── Helpers ──────────────────────────────────────────────────────────────
  function escHtml(s) {
    return String(s)
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;');
  }

  function interactHTML(id) {
    return [
      '<div class="mi-section mi-rating-section">',
        '<h3 class="mi-heading" data-en="Rate This Module" data-fr="Évaluer ce module">Rate This Module</h3>',
        '<div class="mi-stars" role="group" aria-label="Module rating">',
          [1,2,3,4,5].map(function(n){
            return '<button class="mi-star" data-val="' + n + '" aria-label="' + n + ' star" aria-pressed="false" tabindex="0">★</button>';
          }).join(''),
        '</div>',
        '<span class="mi-rating-label" aria-live="polite">Not yet rated</span>',
      '</div>',

      '<div class="mi-section mi-notes-section">',
        '<h3 class="mi-heading" data-en="My Notes" data-fr="Mes notes">My Notes</h3>',
        '<textarea class="mi-notes-area" rows="4" placeholder="Type your notes here — they are saved automatically on this device." aria-label="Module notes"></textarea>',
        '<div class="mi-notes-actions">',
          '<button class="mi-btn mi-notes-print" data-en="Print Notes" data-fr="Imprimer">Print Notes</button>',
          '<button class="mi-btn mi-notes-clear" data-en="Clear Notes" data-fr="Effacer">Clear Notes</button>',
        '</div>',
      '</div>',

      '<div class="mi-section mi-share-section">',
        '<h3 class="mi-heading" data-en="Share This Module" data-fr="Partager ce module">Share This Module</h3>',
        '<div class="mi-share-actions">',
          '<button class="mi-btn mi-share-email" data-en="📧 Share by Email" data-fr="📧 Partager par courriel">📧 Share by Email</button>',
          '<button class="mi-btn mi-share-copy" data-en="🔗 Copy Link" data-fr="🔗 Copier le lien">🔗 Copy Link</button>',
          '<span class="mi-copy-fb" id="mi-copy-fb-' + id + '" style="display:none;font-size:.82rem;color:#2e7d32;margin-left:.4rem">',
            '<span data-en="Copied!" data-fr="Copié !">Copied!</span>',
          '</span>',
          '<button class="mi-btn mi-share-print" data-en="🖨️ Print Page" data-fr="🖨️ Imprimer">🖨️ Print Page</button>',
        '</div>',
      '</div>'
    ].join('');
  }
})();
