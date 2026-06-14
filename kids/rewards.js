/* ==========================================================================
   DCC Kids — Rewards & Incentive Engine (sovereign, offline-first)
   --------------------------------------------------------------------------
   Sprint: DCC Kids — Rewards and Incentive System (2026-06-13).
   Shape brief: quality/dcc-kids-rewards-shape-brief.md (two-birds-portfolio).
   SME-cleared: hal-stack/personas/review-log/2026-06-13-sme-review-005-kids-rewards.md.

   HARD CONSTRAINTS (from the SME panel — do not violate):
   - localStorage ONLY. No network calls. No accounts. No contact collection.
   - Nothing leaves the device. "Sharing" = the caregiver prints or saves an
     image and shares it themselves.
   - Cumulative only. No streaks, no loss, no countdowns, no leaderboards.
   - Per-cohort reward sets. A badge is earned at the reflection/understanding
     step a module calls DCCRewards.earn() from — never on page arrival.

   Parent-linked accounts are explicitly OUT of scope here (would need a
   backend, a new ADR superseding ADR-0004, and a Vera consent review).
   ========================================================================== */
(function (global) {
  'use strict';

  /* Self-inject the rewards stylesheet relative to this script's own URL, so
     module pages only need to include rewards.js (no per-page <link> edit).
     Idempotent — skips if the stylesheet is already linked. */
  try {
    var cur = global.document.currentScript;
    if (cur && cur.src) {
      var cssHref = cur.src.replace(/rewards\.js(\?.*)?$/, 'rewards.css');
      var existing = global.document.querySelectorAll('link[rel="stylesheet"]');
      var found = false;
      for (var li = 0; li < existing.length; li++) {
        if (existing[li].href === cssHref) { found = true; break; }
      }
      if (!found) {
        var link = global.document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssHref;
        global.document.head.appendChild(link);
      }
    }
  } catch (e) { /* styling is progressive; engine still works unstyled */ }

  var STORAGE_KEY = 'dcc-kids-rewards';
  var SCHEMA_VERSION = 1;

  /* Per-cohort badge sets. 7-9 is the pilot cohort (all 8 modules).
     4-6 and 10-12 are scaffolded empty and filled when those cohorts are
     retrofitted — the engine, hub, and certificate are cohort-agnostic. */
  var BADGES = {
    '7-9': [
      { id: 'telling-a-grown-up-when-something-feels-weird', title: 'Trust Your Gut',  icon: '🛡️', cat: 'Emotional Safety' },
      { id: 'real-made-up-or-somewhere-in-between',          title: 'Fact Detective',  icon: '🔍', cat: 'Critical Thinking' },
      { id: 'online-kindness-counts',                        title: 'Kindness Keeper', icon: '💛', cat: 'Emotional Safety' },
      { id: 'watching-to-learn-vs-watching-to-pass-time',    title: 'Smart Watcher',   icon: '🎯', cat: 'Learning' },
      { id: 'making-something-useful-for-someone-else',      title: 'Helper Maker',    icon: '🛠️', cat: 'Creative Making' },
      { id: 'building-a-safe-online-identity',               title: 'Identity Guard',  icon: '🔒', cat: 'Tech Safety' },
      { id: 'pause-and-show-a-grown-up-when-an-app-asks',    title: 'Pause & Ask',     icon: '✋', cat: 'Tech Safety' },
      { id: 'creating-a-strong-password',                    title: 'Password Pro',    icon: '🔑', cat: 'Tech Safety' }
    ],
    '4-6': [],
    '10-12': []
  };

  var COHORT_LABEL = { '7-9': 'Ages 7–9', '4-6': 'Ages 4–6', '10-12': 'Ages 10–12' };

  /* ---- storage (defensive; localStorage can throw in private mode) ------- */

  function readAll() {
    try {
      var raw = global.localStorage.getItem(STORAGE_KEY);
      if (!raw) return { v: SCHEMA_VERSION, cohorts: {} };
      var data = JSON.parse(raw);
      if (!data || typeof data !== 'object') return { v: SCHEMA_VERSION, cohorts: {} };
      if (!data.cohorts) data.cohorts = {};
      return data;
    } catch (e) {
      return { v: SCHEMA_VERSION, cohorts: {} };
    }
  }

  function writeAll(data) {
    try {
      global.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      return false;
    }
  }

  function cohortState(data, cohort) {
    if (!data.cohorts[cohort]) {
      data.cohorts[cohort] = { earned: {}, childName: '', adultMode: false };
    }
    var c = data.cohorts[cohort];
    if (!c.earned) c.earned = {};
    return c;
  }

  /* ---- public API -------------------------------------------------------- */

  var API = {
    /* Record a badge as earned. Call this from a module's reflection step,
       NOT on page load. Returns true if newly earned, false if already had it. */
    earn: function (cohort, moduleId) {
      if (!BADGES[cohort]) return false;
      var data = readAll();
      var c = cohortState(data, cohort);
      if (c.earned[moduleId]) return false;
      c.earned[moduleId] = new Date().toISOString();
      writeAll(data);
      return true;
    },

    isEarned: function (cohort, moduleId) {
      var c = cohortState(readAll(), cohort);
      return !!c.earned[moduleId];
    },

    /* Returns the full badge set for a cohort with earned-state merged in. */
    getBadges: function (cohort) {
      var defs = BADGES[cohort] || [];
      var c = cohortState(readAll(), cohort);
      return defs.map(function (b) {
        return {
          id: b.id, title: b.title, icon: b.icon, cat: b.cat,
          earned: !!c.earned[b.id], date: c.earned[b.id] || null
        };
      });
    },

    earnedCount: function (cohort) {
      var c = cohortState(readAll(), cohort);
      var defs = BADGES[cohort] || [];
      var n = 0;
      defs.forEach(function (b) { if (c.earned[b.id]) n++; });
      return n;
    },

    totalCount: function (cohort) { return (BADGES[cohort] || []).length; },

    allEarned: function (cohort) {
      var total = (BADGES[cohort] || []).length;
      return total > 0 && API.earnedCount(cohort) === total;
    },

    getChildName: function (cohort) {
      return cohortState(readAll(), cohort).childName || '';
    },

    /* Stored LOCALLY ONLY. Never transmitted. Optional. */
    setChildName: function (cohort, name) {
      var data = readAll();
      cohortState(data, cohort).childName = (name || '').slice(0, 40);
      writeAll(data);
    },

    getAdultMode: function (cohort) {
      return !!cohortState(readAll(), cohort).adultMode;
    },

    setAdultMode: function (cohort, on) {
      var data = readAll();
      cohortState(data, cohort).adultMode = !!on;
      writeAll(data);
    },

    /* Clears one cohort's reward data only. The caregiver controls this. */
    reset: function (cohort) {
      var data = readAll();
      if (data.cohorts[cohort]) {
        data.cohorts[cohort] = { earned: {}, childName: '', adultMode: false };
        writeAll(data);
      }
    },

    cohortLabel: function (cohort) { return COHORT_LABEL[cohort] || cohort; },

    /* Build the plain-language family synopsis text (warm, short).
       Returns { learned: [..], growing: [..], together: '..' }. */
    buildSynopsis: function (cohort) {
      var badges = API.getBadges(cohort);
      var learned = badges.filter(function (b) { return b.earned; })
                          .map(function (b) { return b.title + ' (' + b.cat + ')'; });
      var growing = badges.filter(function (b) { return !b.earned; })
                          .map(function (b) { return b.title; });
      var together = growing.length
        ? 'This week, try the next activity together — "' + growing[0] + '" is a great one to do side by side.'
        : 'Every activity is done! Revisit a favourite together and talk about what changed.';
      return { learned: learned, growing: growing, together: together };
    }
  };

  /* ---- UI helpers (DOM builders; no innerHTML with user data) ------------ */

  function el(tag, cls, text) {
    var node = global.document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  function fmtDate(iso) {
    try {
      return new Date(iso || Date.now()).toLocaleDateString('en-CA',
        { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) { return ''; }
  }

  /* Mount a single "I did it!" earn button inside a module's reflection step.
     options: { cohort, moduleId, onEarn? }. Idempotent re-render on click. */
  API.mountEarnButton = function (mountEl, options) {
    if (!mountEl) return;
    var cohort = options.cohort, moduleId = options.moduleId;

    function render() {
      mountEl.textContent = '';
      var earned = API.isEarned(cohort, moduleId);
      var badge = (BADGES[cohort] || []).filter(function (b) { return b.id === moduleId; })[0];
      if (earned) {
        var done = el('div', 'dcc-earn dcc-earn-done');
        done.appendChild(el('span', 'dcc-earn-icon', badge ? badge.icon : '⭐'));
        var t = el('div', 'dcc-earn-text');
        t.appendChild(el('strong', null, 'Badge earned: ' + (badge ? badge.title : 'Done')));
        t.appendChild(el('span', null, 'See it on your Rewards page.'));
        done.appendChild(t);
        mountEl.appendChild(done);
      } else {
        var wrap = el('div', 'dcc-earn');
        var p = el('p', 'dcc-earn-prompt',
          'Talked it through and tried the activity together? Mark it done to earn the ' +
          (badge ? '“' + badge.title + '” ' : '') + 'badge.');
        var btn = el('button', 'dcc-earn-btn');
        btn.type = 'button';
        btn.appendChild(global.document.createTextNode((badge ? badge.icon + '  ' : '') + 'I did this activity!'));
        btn.addEventListener('click', function () {
          API.earn(cohort, moduleId);
          if (typeof options.onEarn === 'function') options.onEarn();
          render();
        });
        wrap.appendChild(p);
        wrap.appendChild(btn);
        mountEl.appendChild(wrap);
      }
    }
    render();
  };

  /* Build a certificate DOM node (used for on-screen, print, and PNG). */
  function buildCertNode(cohort) {
    var name = API.getChildName(cohort);
    var cert = el('div', 'dcc-cert');
    cert.appendChild(el('div', 'dcc-cert-seal', '🏆'));
    cert.appendChild(el('p', 'dcc-cert-kicker', 'Digital Confidence Centre'));
    cert.appendChild(el('h3', 'dcc-cert-title', 'Certificate of Digital Confidence'));
    cert.appendChild(el('p', 'dcc-cert-presented', 'Proudly presented to'));
    cert.appendChild(el('p', 'dcc-cert-name', name ? name : 'A DCC Kid'));
    cert.appendChild(el('p', 'dcc-cert-body',
      'for completing all ' + API.totalCount(cohort) + ' digital literacy activities for ' +
      API.cohortLabel(cohort) + ' — learning to think critically, stay safe, and be kind online.'));
    cert.appendChild(el('p', 'dcc-cert-date', fmtDate(new Date().toISOString())));
    return cert;
  }

  /* Draw the certificate to a canvas and trigger a PNG download. Fully local. */
  API.downloadCertificatePNG = function (cohort) {
    var W = 1000, H = 720, c = global.document.createElement('canvas');
    c.width = W; c.height = H;
    var ctx = c.getContext('2d');
    ctx.fillStyle = '#FFFDF7'; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = '#00695C'; ctx.lineWidth = 10; ctx.strokeRect(24, 24, W - 48, H - 48);
    ctx.strokeStyle = '#B2DFDB'; ctx.lineWidth = 2; ctx.strokeRect(44, 44, W - 88, H - 88);
    ctx.textAlign = 'center'; ctx.fillStyle = '#00695C';
    ctx.font = '64px serif'; ctx.fillText('🏆', W / 2, 150);
    ctx.font = 'bold 22px sans-serif'; ctx.fillText('DIGITAL CONFIDENCE CENTRE', W / 2, 205);
    ctx.fillStyle = '#1A1A2E'; ctx.font = 'bold 42px serif';
    ctx.fillText('Certificate of Digital Confidence', W / 2, 275);
    ctx.fillStyle = '#555'; ctx.font = '22px sans-serif';
    ctx.fillText('Proudly presented to', W / 2, 350);
    ctx.fillStyle = '#00695C'; ctx.font = 'bold 52px serif';
    ctx.fillText(API.getChildName(cohort) || 'A DCC Kid', W / 2, 420);
    ctx.fillStyle = '#1A1A2E'; ctx.font = '24px sans-serif';
    var line = 'for completing all ' + API.totalCount(cohort) + ' activities for ' + API.cohortLabel(cohort) + '.';
    ctx.fillText(line, W / 2, 500);
    ctx.fillStyle = '#777'; ctx.font = '20px sans-serif';
    ctx.fillText(fmtDate(new Date().toISOString()), W / 2, 600);
    try {
      var url = c.toDataURL('image/png');
      var a = el('a'); a.href = url;
      a.download = 'dcc-certificate-' + cohort + '.png';
      global.document.body.appendChild(a); a.click(); global.document.body.removeChild(a);
    } catch (e) { /* canvas export blocked — print remains available */ }
  };

  /* Print just the certificate via a print-only overlay (print CSS hides the rest). */
  API.printCertificate = function (cohort) {
    var prev = global.document.getElementById('dcc-print-area');
    if (prev) prev.parentNode.removeChild(prev);
    var area = el('div'); area.id = 'dcc-print-area';
    area.appendChild(buildCertNode(cohort));
    global.document.body.appendChild(area);
    global.window.print();
  };

  /* Render the Rewards hub into a mount element on a cohort index page. */
  API.renderHub = function (mountEl, cohort) {
    if (!mountEl) return;
    mountEl.textContent = '';
    var earnedN = API.earnedCount(cohort), total = API.totalCount(cohort);

    mountEl.appendChild(el('h2', 'dcc-hub-title', '🏆 My Rewards'));
    mountEl.appendChild(el('p', 'dcc-hub-progress',
      earnedN + ' of ' + total + ' badges earned — every one stays, nothing is ever lost.'));

    var wall = el('div', 'dcc-badge-wall');
    API.getBadges(cohort).forEach(function (b) {
      var tile = el('div', 'dcc-badge-tile' + (b.earned ? ' is-earned' : ' is-locked'));
      tile.appendChild(el('span', 'dcc-badge-icon', b.earned ? b.icon : '🔒'));
      tile.appendChild(el('span', 'dcc-badge-name', b.title));
      tile.appendChild(el('span', 'dcc-badge-cat', b.cat));
      tile.setAttribute('aria-label', b.title + (b.earned ? ' — earned' : ' — not earned yet'));
      wall.appendChild(tile);
    });
    mountEl.appendChild(wall);

    /* Milestone certificate */
    var milestone = el('div', 'dcc-milestone');
    if (API.allEarned(cohort)) {
      milestone.appendChild(el('p', 'dcc-milestone-yay',
        '🎉 All ' + total + ' badges earned! Your certificate is ready.'));
      var nameRow = el('label', 'dcc-name-row');
      nameRow.appendChild(global.document.createTextNode('Name on certificate (optional): '));
      var nameInput = el('input', 'dcc-name-input');
      nameInput.type = 'text'; nameInput.maxLength = 40;
      nameInput.value = API.getChildName(cohort);
      nameInput.placeholder = 'A DCC Kid';
      nameInput.addEventListener('change', function () { API.setChildName(cohort, nameInput.value); });
      nameRow.appendChild(nameInput);
      milestone.appendChild(nameRow);

      var btnRow = el('div', 'dcc-btn-row');
      var printBtn = el('button', 'dcc-action-btn'); printBtn.type = 'button';
      printBtn.textContent = '🖨️ Print certificate';
      printBtn.addEventListener('click', function () { API.setChildName(cohort, nameInput.value); API.printCertificate(cohort); });
      var pngBtn = el('button', 'dcc-action-btn dcc-action-secondary'); pngBtn.type = 'button';
      pngBtn.textContent = '🖼️ Save as picture';
      pngBtn.addEventListener('click', function () { API.setChildName(cohort, nameInput.value); API.downloadCertificatePNG(cohort); });
      btnRow.appendChild(printBtn); btnRow.appendChild(pngBtn);
      milestone.appendChild(btnRow);
      milestone.appendChild(el('p', 'dcc-share-note',
        'Print it for the fridge, or save the picture and share it yourself — nothing is sent anywhere from here.'));
    } else {
      milestone.appendChild(el('p', 'dcc-milestone-locked',
        '🔒 Earn all ' + total + ' badges to unlock a printable certificate.'));
    }
    mountEl.appendChild(milestone);

    /* For grown-ups: family synopsis + adult-participant toggle + reset */
    var grown = el('details', 'dcc-grown');
    grown.appendChild(el('summary', 'dcc-grown-summary', 'For grown-ups'));

    var adultRow = el('label', 'dcc-adult-row');
    var adultBox = el('input'); adultBox.type = 'checkbox'; adultBox.checked = API.getAdultMode(cohort);
    adultBox.addEventListener('change', function () { API.setAdultMode(cohort, adultBox.checked); });
    adultRow.appendChild(adultBox);
    adultRow.appendChild(global.document.createTextNode(' We are doing these activities together (grown-up joining in)'));
    grown.appendChild(adultRow);

    var syn = API.buildSynopsis(cohort);
    var synBox = el('div', 'dcc-synopsis');
    synBox.appendChild(el('p', 'dcc-syn-h', 'A quick summary to share with family or a teacher:'));
    var learnedP = el('p', null);
    learnedP.appendChild(el('strong', null, 'Worked on: '));
    learnedP.appendChild(global.document.createTextNode(syn.learned.length ? syn.learned.join(', ') : 'Just getting started.'));
    synBox.appendChild(learnedP);
    if (syn.growing.length) {
      var growP = el('p', null);
      growP.appendChild(el('strong', null, 'Still growing: '));
      growP.appendChild(global.document.createTextNode(syn.growing.join(', ')));
      synBox.appendChild(growP);
    }
    var togP = el('p', null);
    togP.appendChild(el('strong', null, 'Try together: '));
    togP.appendChild(global.document.createTextNode(syn.together));
    synBox.appendChild(togP);
    grown.appendChild(synBox);

    var resetBtn = el('button', 'dcc-reset-btn'); resetBtn.type = 'button';
    resetBtn.textContent = 'Start over (clears badges on this device)';
    resetBtn.addEventListener('click', function () {
      if (global.confirm('Clear all badges for ' + API.cohortLabel(cohort) + ' on this device? This cannot be undone.')) {
        API.reset(cohort); API.renderHub(mountEl, cohort);
      }
    });
    grown.appendChild(resetBtn);
    mountEl.appendChild(grown);
  };

  global.DCCRewards = API;
})(window);

