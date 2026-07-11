/* ============================================================
   Digital Confidence Centre — A/B Testing Framework
   Lightweight, cookie-free, GA4-integrated variant testing.

   HOW IT WORKS:
   1. Define experiments in the EXPERIMENTS config below
   2. Each experiment has a name, variants, and traffic weight
   3. Users are bucketed deterministically by a random ID
      stored in localStorage (consistent across sessions)
   4. The active variant is applied via CSS class / DOM swap
   5. Variant assignment is sent to GA4 for analysis

   VIEWING RESULTS:
   - GA4 → Explore → Free-form report
   - Dimension: Event parameter "experiment_variant"
   - Metrics: Conversions, Engagement time, Scroll depth
   ============================================================ */

(function () {
  'use strict';

  /* ── Experiment Definitions ──────────────────────────────── */
  var EXPERIMENTS = [

    {
      id      : 'homepage-headline',
      name    : 'Homepage Headline Copy',
      page    : 'index.html',
      active  : false,  /* set to true to enable */
      selector: '.welcome-hero-text h1',
      variants: [
        { id: 'control', weight: 50,
          apply: function (el) { /* leave as-is */ } },
        { id: 'variant-a', weight: 50,
          apply: function (el) {
            el.textContent = 'Learn Technology at Your Own Pace';
          }
        }
      ]
    },

    {
      id      : 'module1-cta',
      name    : 'Module 1 Start CTA Text',
      page    : 'module-1.html',
      active  : false,
      selector: '.module-nav .btn-primary',
      variants: [
        { id: 'control',   weight: 50, apply: function () {} },
        { id: 'variant-a', weight: 50,
          apply: function (el) {
            if (el) el.textContent = 'Next: Stay Safe Online →';
          }
        }
      ]
    },

    {
      id      : 'feedback-button-position',
      name    : 'Feedback Button Visibility',
      page    : null,   /* null = all pages */
      active  : false,
      selector: null,
      variants: [
        { id: 'control',   weight: 50, apply: function () {} },
        { id: 'variant-a', weight: 50,
          apply: function () {
            /* Add prominent feedback banner to bottom of page */
            var banner = document.createElement('div');
            banner.style.cssText = 'position:fixed;bottom:16px;right:16px;' +
              'background:#1565C0;color:white;padding:12px 20px;border-radius:50px;' +
              'cursor:pointer;z-index:9000;font-size:0.9rem;box-shadow:0 4px 12px rgba(0,0,0,0.2)';
            banner.textContent = '💬 Quick Feedback';
            banner.setAttribute('role', 'button');
            banner.setAttribute('tabindex', '0');
            banner.addEventListener('click', function () {
              if (typeof openFeedbackModal === 'function') openFeedbackModal();
            });
            document.body.appendChild(banner);
          }
        }
      ]
    }

  ];

  /* ── User Bucketing ──────────────────────────────────────── */
  function getUserId() {
    var key = 'dc-ab-user-id';
    var id = localStorage.getItem(key);
    if (!id) {
      id = Math.random().toString(36).substring(2, 11);
      localStorage.setItem(key, id);
    }
    return id;
  }

  function hashToNumber(str) {
    /* Simple djb2-style hash → 0-99 integer */
    var hash = 5381;
    for (var i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
    }
    return Math.abs(hash) % 100;
  }

  function pickVariant(experiment, userId) {
    var bucket = hashToNumber(userId + '_' + experiment.id);
    var cumulative = 0;
    for (var i = 0; i < experiment.variants.length; i++) {
      cumulative += experiment.variants[i].weight;
      if (bucket < cumulative) return experiment.variants[i];
    }
    return experiment.variants[0]; /* fallback */
  }

  /* ── GA4 Tracking ────────────────────────────────────────── */
  function trackVariant(experiment, variant) {
    if (typeof gtag !== 'function') return;
    try {
      gtag('event', 'experiment_impression', {
        event_category      : 'A/B Test',
        experiment_id       : experiment.id,
        experiment_name     : experiment.name,
        experiment_variant  : variant.id
      });

      /* Set user property for audience segmentation */
      gtag('set', 'user_properties', {
        ['ab_' + experiment.id]: variant.id
      });
    } catch (e) {}
  }

  /* ── Experiment Runner ───────────────────────────────────── */
  function runExperiments() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    var userId = getUserId();

    EXPERIMENTS.forEach(function (exp) {
      if (!exp.active) return;
      if (exp.page && exp.page !== currentPage) return;

      var variant = pickVariant(exp, userId);

      /* Store assignment for consistent experience */
      var assignKey = 'dc-ab-' + exp.id;
      var stored    = localStorage.getItem(assignKey);
      if (stored) {
        /* Retrieve previous assignment for consistency */
        var storedVariant = exp.variants.find(function (v) { return v.id === stored; });
        if (storedVariant) variant = storedVariant;
      } else {
        localStorage.setItem(assignKey, variant.id);
      }

      /* Apply variant */
      try {
        var el = exp.selector ? document.querySelector(exp.selector) : null;
        variant.apply(el);
        document.documentElement.setAttribute(
          'data-ab-' + exp.id.replace(/[^a-z0-9]/gi, '-'), variant.id
        );
      } catch (e) {
        console.warn('[DCC A/B] Error applying variant:', exp.id, e);
      }

      /* Track in GA4 */
      trackVariant(exp, variant);
    });
  }

  /* ── Public API ──────────────────────────────────────────── */
  window.DCC = window.DCC || {};
  window.DCC.ab = {
    /* Force a specific variant for testing: DCC.ab.force('experiment-id', 'variant-id') */
    force: function (experimentId, variantId) {
      localStorage.setItem('dc-ab-' + experimentId, variantId);
      window.location.reload();
    },
    /* Reset all A/B assignments: DCC.ab.reset() */
    reset: function () {
      Object.keys(localStorage).forEach(function (key) {
        if (key.startsWith('dc-ab-')) localStorage.removeItem(key);
      });
      window.location.reload();
    },
    /* Show current variant assignments in console */
    status: function () {
      var assignments = {};
      Object.keys(localStorage).forEach(function (key) {
        if (key.startsWith('dc-ab-')) assignments[key] = localStorage.getItem(key);
      });
      console.table(assignments);
    }
  };

  /* Run after DOM is ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runExperiments);
  } else {
    runExperiments();
  }

})();
