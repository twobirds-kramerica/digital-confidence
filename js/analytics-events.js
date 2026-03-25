/* ============================================================
   Digital Confidence Centre — Analytics Event Tracking
   Google Analytics 4 custom event layer

   Tracks: module completions, quiz interactions, accessibility
   feature usage, scroll depth, outbound clicks, time on page,
   feedback submissions, video engagement, print actions.

   Depends on: GA4 snippet already loaded in <head> (gtag())
   Loaded after: app.js, accessibility.js, progress.js
   ============================================================ */

(function () {
  'use strict';

  /* Safe gtag wrapper — no-ops gracefully if GA not loaded */
  function track(eventName, params) {
    if (typeof gtag !== 'function') return;
    try {
      gtag('event', eventName, params);
    } catch (e) {
      /* silent fail — never break UX for analytics */
    }
  }

  /* Detect current page / module context */
  var currentPage  = window.location.pathname.split('/').pop() || 'index.html';
  var pageTitle    = document.title || currentPage;
  var moduleMatch  = currentPage.match(/module-(\d+)/);
  var moduleNumber = moduleMatch ? moduleMatch[1] : null;

  /* Beta tester detection (?beta=true in URL or localStorage) */
  var isBeta = new URLSearchParams(window.location.search).get('beta') === 'true'
             || localStorage.getItem('dc-beta-tester') === 'true';
  if (isBeta) localStorage.setItem('dc-beta-tester', 'true');

  document.addEventListener('DOMContentLoaded', function () {

    /* ─────────────────────────────────────────────────────
       1. MODULE PROGRESS — track when progress checkbox fired
    ───────────────────────────────────────────────────── */
    document.querySelectorAll('.progress-checkbox').forEach(function (cb) {
      cb.addEventListener('change', function () {
        if (!cb.checked) return; /* only track completions, not un-checks */
        var dataId  = cb.getAttribute('data-id') || 'unknown';
        var labelEl = cb.nextElementSibling;
        var label   = labelEl ? labelEl.textContent.trim() : dataId;
        track('module_progress_step', {
          event_category : 'Learning',
          event_label    : label,
          page_module    : moduleNumber,
          step_id        : dataId,
          is_beta        : isBeta
        });
      });
    });

    /* ─────────────────────────────────────────────────────
       2. MODULE COMPLETION — detect when all checkboxes checked
       (mirrors progress.js logic without duplicating its state)
    ───────────────────────────────────────────────────── */
    if (moduleNumber) {
      var prefix = 'dc-progress-m' + moduleNumber;
      function checkModuleComplete() {
        var total = 0, done = 0;
        for (var i = 1; i <= 10; i++) {
          var val = localStorage.getItem(prefix + '-' + i);
          if (val !== null) { total++; if (val === 'true') done++; }
        }
        if (total > 0 && done === total) {
          /* Only fire once per module per session */
          var sessionKey = 'dc-analytics-m' + moduleNumber + '-complete';
          if (!sessionStorage.getItem(sessionKey)) {
            sessionStorage.setItem(sessionKey, '1');
            track('module_complete', {
              event_category : 'Learning',
              event_label    : 'Module ' + moduleNumber,
              module_number  : parseInt(moduleNumber, 10),
              value          : parseInt(moduleNumber, 10),
              is_beta        : isBeta
            });
          }
        }
      }
      /* Re-check after any checkbox change */
      document.querySelectorAll('.progress-checkbox').forEach(function (cb) {
        cb.addEventListener('change', checkModuleComplete);
      });
      /* Also check on load (returning user may already be complete) */
      checkModuleComplete();
    }

    /* ─────────────────────────────────────────────────────
       3. QUIZ INTERACTIONS — scam-quiz.js uses .quiz-option buttons
    ───────────────────────────────────────────────────── */
    document.querySelectorAll('.quiz-container').forEach(function (container) {
      var quizId = container.id || ('quiz-' + moduleNumber);

      container.querySelectorAll('.quiz-option').forEach(function (opt) {
        opt.addEventListener('click', function () {
          if (opt.disabled) return; /* already answered */
          var isCorrect = opt.classList.contains('correct') ||
                          opt.getAttribute('data-answer') ===
                          opt.closest('.quiz-question')?.getAttribute('data-correct');
          track('quiz_answer', {
            event_category : 'Assessment',
            event_label    : quizId,
            correct        : isCorrect,
            module_number  : moduleNumber,
            is_beta        : isBeta
          });
        });
      });

      /* Quiz score shown when all answered */
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (m) {
          if (m.target.classList.contains('quiz-score-display') &&
              m.type === 'childList') {
            var scoreEl = container.querySelector('.quiz-score');
            if (scoreEl) {
              var scoreText = scoreEl.textContent || '';
              var scoreMatch = scoreText.match(/(\d+)\s*[\/of]+\s*(\d+)/);
              if (scoreMatch) {
                track('quiz_complete', {
                  event_category : 'Assessment',
                  event_label    : quizId,
                  score          : parseInt(scoreMatch[1], 10),
                  out_of         : parseInt(scoreMatch[2], 10),
                  module_number  : moduleNumber,
                  is_beta        : isBeta
                });
              }
            }
          }
        });
      });
      var scoreWrap = container.querySelector('.quiz-score-display');
      if (scoreWrap) observer.observe(scoreWrap, { childList: true, subtree: true });
    });

    /* ─────────────────────────────────────────────────────
       4. FINAL QUIZ (final-quiz.html)
    ───────────────────────────────────────────────────── */
    var finalForm = document.getElementById('final-quiz-form');
    if (finalForm) {
      finalForm.addEventListener('submit', function () {
        track('final_quiz_submit', {
          event_category : 'Assessment',
          event_label    : 'Final Assessment',
          is_beta        : isBeta
        });
      });
    }

    /* ─────────────────────────────────────────────────────
       5. FEEDBACK FORM (feedback-github.js modal)
    ───────────────────────────────────────────────────── */
    /* The feedback form is dynamically injected — use event delegation */
    document.addEventListener('submit', function (e) {
      var form = e.target;
      if (form && (form.id === 'feedback-form' || form.classList.contains('dc-feedback-form'))) {
        var typeEl = form.querySelector('[name="feedback_type"], [name="type"]');
        track('feedback_submit', {
          event_category : 'Engagement',
          event_label    : typeEl ? typeEl.value : 'Feedback',
          page_module    : moduleNumber || currentPage,
          is_beta        : isBeta
        });
      }
    });

    /* Track feedback modal open */
    document.querySelectorAll('[onclick*="openFeedbackModal"], [data-action="open-feedback"]')
      .forEach(function (btn) {
        btn.addEventListener('click', function () {
          track('feedback_modal_open', {
            event_category : 'Engagement',
            event_label    : currentPage,
            is_beta        : isBeta
          });
        });
      });

    /* ─────────────────────────────────────────────────────
       6. ACCESSIBILITY FEATURE USAGE
    ───────────────────────────────────────────────────── */
    /* Font size buttons */
    document.querySelectorAll('.font-size-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        track('accessibility_font_size', {
          event_category : 'Accessibility',
          event_label    : btn.getAttribute('data-size') || 'unknown',
          is_beta        : isBeta
        });
      });
    });

    /* Dark / light mode toggle */
    document.querySelectorAll('.theme-toggle-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var newTheme = document.documentElement.getAttribute('data-theme') === 'dark'
                     ? 'light' : 'dark';
        track('accessibility_theme', {
          event_category : 'Accessibility',
          event_label    : newTheme,
          is_beta        : isBeta
        });
      });
    });

    /* Dyslexia-friendly font toggle */
    var dyslexicToggle = document.getElementById('dyslexic-font-toggle');
    if (dyslexicToggle) {
      dyslexicToggle.addEventListener('change', function () {
        track('accessibility_dyslexic_font', {
          event_category : 'Accessibility',
          event_label    : dyslexicToggle.checked ? 'Enabled' : 'Disabled',
          is_beta        : isBeta
        });
      });
    }

    /* ─────────────────────────────────────────────────────
       7. LANGUAGE SWITCH
    ───────────────────────────────────────────────────── */
    document.querySelectorAll('.a11y-btn[href*="/lang/fr/"], a[href*="/lang/fr/"]')
      .forEach(function (link) {
        link.addEventListener('click', function () {
          track('language_switch', {
            event_category : 'Localisation',
            event_label    : 'French',
            from_page      : currentPage
          });
        });
      });

    /* EN back-links on French pages */
    document.querySelectorAll('a[href*="module-"].a11y-btn, a.a11y-btn[href$=".html"]')
      .forEach(function (link) {
        if (link.textContent.trim() === '⚜ EN') {
          link.addEventListener('click', function () {
            track('language_switch', {
              event_category : 'Localisation',
              event_label    : 'English',
              from_page      : currentPage
            });
          });
        }
      });

    /* ─────────────────────────────────────────────────────
       8. VIDEO ENGAGEMENT — video-card watch buttons
    ───────────────────────────────────────────────────── */
    document.querySelectorAll('.video-card-btn').forEach(function (btn) {
      var card = btn.closest('.video-card');
      var title = card ? (card.querySelector('h4')?.textContent?.trim() || 'Video') : 'Video';
      btn.addEventListener('click', function () {
        track('video_link_click', {
          event_category : 'Content',
          event_label    : title,
          page_module    : moduleNumber
        });
      });
    });

    /* Native <video> elements */
    document.querySelectorAll('video').forEach(function (video) {
      var title = video.dataset.title || video.id || 'Video';
      video.addEventListener('play', function () {
        track('video_play', { event_category: 'Content', event_label: title, video_id: video.id });
      });
      video.addEventListener('ended', function () {
        track('video_complete', { event_category: 'Content', event_label: title, video_id: video.id });
      });
    });

    /* ─────────────────────────────────────────────────────
       9. PRINT TRACKING
    ───────────────────────────────────────────────────── */
    document.querySelectorAll('.btn-print').forEach(function (btn) {
      btn.addEventListener('click', function () {
        track('module_print', {
          event_category : 'Content',
          event_label    : pageTitle,
          page_module    : moduleNumber
        });
      });
    });

    /* ─────────────────────────────────────────────────────
       10. OUTBOUND LINK TRACKING
    ───────────────────────────────────────────────────── */
    document.querySelectorAll('a[href^="http"]').forEach(function (link) {
      /* Skip GA / analytics URLs */
      if (link.href.includes('googletagmanager') || link.href.includes('google-analytics')) return;
      link.addEventListener('click', function () {
        track('outbound_click', {
          event_category : 'Navigation',
          event_label    : link.href,
          link_text      : link.textContent.trim().substring(0, 100),
          page_module    : moduleNumber
        });
      });
    });

    /* ─────────────────────────────────────────────────────
       11. HELP LINE PHONE CALL CLICKS
    ───────────────────────────────────────────────────── */
    document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
      link.addEventListener('click', function () {
        track('phone_call_click', {
          event_category : 'Support',
          event_label    : link.href.replace('tel:', ''),
          page_module    : moduleNumber
        });
      });
    });

    /* ─────────────────────────────────────────────────────
       12. SCAM SIMULATOR INTERACTIONS
    ───────────────────────────────────────────────────── */
    document.querySelectorAll('.scam-scenario, [data-scam-id]').forEach(function (el) {
      el.addEventListener('click', function () {
        track('scam_scenario_view', {
          event_category : 'Safety',
          event_label    : el.dataset.title || el.dataset.scamId || 'scenario',
          scenario_id    : el.dataset.scamId || el.id
        });
      });
    });

    /* ─────────────────────────────────────────────────────
       13. MODULE NAV (next/previous) CLICKS
    ───────────────────────────────────────────────────── */
    document.querySelectorAll('.module-nav .btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var direction = btn.classList.contains('btn-next') ? 'next' : 'previous';
        track('module_nav', {
          event_category : 'Navigation',
          event_label    : direction,
          from_module    : moduleNumber,
          destination    : btn.getAttribute('href')
        });
      });
    });

  }); /* end DOMContentLoaded */

  /* ─────────────────────────────────────────────────────
     14. SCROLL DEPTH TRACKING (runs immediately on scroll)
  ───────────────────────────────────────────────────── */
  var maxScrollDepth = 0;
  var scrollMilestones = [25, 50, 75, 100];
  window.addEventListener('scroll', function () {
    var scrolled = window.scrollY + window.innerHeight;
    var total    = document.body.scrollHeight;
    if (total === 0) return;
    var pct = Math.min(100, Math.round(scrolled / total * 100));
    if (pct > maxScrollDepth) {
      maxScrollDepth = pct;
      scrollMilestones.forEach(function (milestone) {
        if (pct >= milestone && maxScrollDepth >= milestone) {
          /* Fire once per milestone per page view */
          var key = 'dc-scroll-' + milestone;
          if (!sessionStorage.getItem(key + currentPage)) {
            sessionStorage.setItem(key + currentPage, '1');
            track('scroll_depth', {
              event_category : 'Engagement',
              event_label    : milestone + '%',
              page           : currentPage,
              page_module    : moduleNumber
            });
          }
        }
      });
    }
  }, { passive: true });

  /* ─────────────────────────────────────────────────────
     15. TIME ON PAGE (fires on page unload)
  ───────────────────────────────────────────────────── */
  var pageStartTime = Date.now();
  window.addEventListener('pagehide', function () {
    var seconds = Math.round((Date.now() - pageStartTime) / 1000);
    track('time_on_page', {
      event_category : 'Engagement',
      event_label    : currentPage,
      value          : seconds,
      page_module    : moduleNumber
    });
  });

  /* ─────────────────────────────────────────────────────
     16. PAGE VIEW WITH CONTEXT (augments GA4 auto-tracking)
  ───────────────────────────────────────────────────── */
  track('page_view_dcc', {
    event_category  : 'Navigation',
    page_path       : window.location.pathname,
    page_module     : moduleNumber,
    is_beta         : isBeta,
    referrer        : document.referrer || '(direct)'
  });

})();
