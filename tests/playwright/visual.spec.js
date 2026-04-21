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

const PAGES = [
  { name: 'home',          path: '/' },
  { name: 'module-1',      path: '/module-1.html' },
  { name: 'final-quiz',    path: '/final-quiz.html' },
  { name: 'accessibility', path: '/accessibility.html' },
  { name: 'faq',           path: '/faq.html' },
  { name: 'styleguide',    path: '/styleguide/index.html' },
];

for (const p of PAGES) {
  test(`visual: ${p.name}`, async ({ page }) => {
    await page.goto(p.path, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});

    // Wait for @font-face loads to finish. Without this, the "two consecutive
    // stable screenshots" check flakes on styleguide because the fallback
    // font gets swapped mid-capture. Pattern borrowed from Playwright docs.
    await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {});

    // Disable animations + neutralise sticky/fixed so fullPage screenshots
    // don't duplicate the same element at varying scroll positions. The
    // styleguide's sticky header-controls panel otherwise caused Playwright
    // to fail the "two consecutive stable screenshots" check.
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

    // Give deferred JS (e.g., keyboard-helper modal injection on styleguide)
    // a beat to finish DOM mutations before we ask for stable screenshots.
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot(`${p.name}.png`, {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
      animations: 'disabled',
    });
  });
}
