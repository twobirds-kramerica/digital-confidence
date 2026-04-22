// Visual regression baseline tests for DCC.
// Runs via the visual-regression.yml workflow (manual trigger for first
// baseline generation, then push-triggered for regression comparison).
//
// maxDiffPixelRatio: 0.02 means up to 2% of pixels can differ before failing.
// That tolerates font anti-aliasing / sub-pixel positioning while catching
// any meaningful layout shift, colour change, or element appearance/disappearance.
//
// To regenerate baselines after an intentional visual change:
//   - Trigger visual-regression.yml via workflow_dispatch with
//     update_snapshots: true. That runs `--update-snapshots` and commits
//     the new baselines back to main.
// Local regeneration (if a dev has Playwright installed):
//   - cd tests/playwright && npx playwright test visual.spec.js --update-snapshots

const { test, expect } = require('@playwright/test');

// Per-page options. Styleguide needs extra stabilisation: wait for the
// keyboard-helper modal to finish async-injecting, then mask the known-
// dynamic regions so they don't affect pixel diffs.
// S-DCC-VIS-STYLEGUIDE-STABLE (2026-04-21) added styleguide back after
// earlier attempts failed — new approach: mask the kbd-help dialog +
// S-030 components section via the Playwright mask: option.
const PAGES = [
  { name: 'home',          path: '/' },
  { name: 'module-1',      path: '/module-1.html' },
  { name: 'final-quiz',    path: '/final-quiz.html' },
  { name: 'accessibility', path: '/accessibility.html' },
  { name: 'faq',           path: '/faq.html' },
  {
    name: 'styleguide',
    path: '/styleguide/index.html',
    // Wait for the keyboard-helper modal to inject into <body>.
    // It's appended on DOMContentLoaded by js/keyboard-helper.js.
    waitForSelector: '#dcc-kbd-help',
    // Mask regions that cause sub-pixel anti-aliasing flakiness:
    //  - the kbd-help dialog DOM (hidden but still in tree)
    //  - the S-030 live-demos section (read-aloud/progress-dots/check-in)
    //    which renders with dynamic state
    mask: ['#dcc-kbd-help', '#s030'],
  },
];

for (const p of PAGES) {
  test(`visual: ${p.name}`, async ({ page }) => {
    await page.goto(p.path, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});

    // Wait for @font-face loads to finish. Without this, the "two consecutive
    // stable screenshots" check flakes when the fallback font gets swapped
    // mid-capture. Pattern borrowed from Playwright docs.
    await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {});

    // Per-page wait for async-injected DOM (styleguide's keyboard-helper
    // modal; harmless no-op on pages without one).
    if (p.waitForSelector) {
      await page.waitForSelector(p.waitForSelector, { state: 'attached', timeout: 5_000 })
        .catch(() => {});
    }

    // Disable animations + neutralise sticky/fixed so fullPage screenshots
    // don't duplicate the same element at varying scroll positions.
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation: none !important;
          transition: none !important;
          caret-color: transparent !important;
        }
        [style*="position: sticky"],
        [style*="position:sticky"],
        .sg-controls, .sg-toc {
          position: static !important;
        }
      `,
    });

    // Force scroll to top so fullPage captures from a consistent origin.
    await page.evaluate(() => window.scrollTo(0, 0));

    // Give deferred JS one more beat after our style injection + scroll.
    await page.waitForTimeout(500);

    // Build the screenshot options. Locators for `mask:` must be built
    // from the Playwright `page` object at call time.
    const screenshotOpts = {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
      animations: 'disabled',
    };
    if (Array.isArray(p.mask) && p.mask.length) {
      screenshotOpts.mask = p.mask.map(sel => page.locator(sel));
    }

    await expect(page).toHaveScreenshot(`${p.name}.png`, screenshotOpts);
  });
}
