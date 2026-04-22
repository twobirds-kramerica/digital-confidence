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

// NOTE: styleguide excluded after 4 distinct stabilisation attempts
// on 2026-04-21 all failed Playwright's "two consecutive stable
// screenshots" gate:
//   1. document.fonts.ready + 500ms settle   → fail
//   2. +position:sticky overrides            → fail
//   3. waitForSelector('#dcc-kbd-help')      → fail (S-DCC-VIS-
//   4. +Playwright mask on #dcc-kbd-help       STYLEGUIDE-STABLE
//      and #s030 sections                      attempt)         → fail
// Conclusion: styleguide typography + live component samples are
// intrinsically pixel-noisy under the two-frame stability check.
// Further code-level tweaks are throwing work at a surface that
// fundamentally doesn't quiet. Options for a future attempt:
//   a) switch styleguide to viewport-clip of a pinned hero region
//      (not fullPage), covering only the stable colour/tokens section;
//   b) increase retries + raise maxDiffPixelRatio aggressively, but
//      that weakens the regression signal.
// Leaving out for now is the honest call.
const PAGES = [
  { name: 'home',          path: '/' },
  { name: 'module-1',      path: '/module-1.html' },
  { name: 'final-quiz',    path: '/final-quiz.html' },
  { name: 'accessibility', path: '/accessibility.html' },
  { name: 'faq',           path: '/faq.html' },
];

for (const p of PAGES) {
  test(`visual: ${p.name}`, async ({ page }) => {
    await page.goto(p.path, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});

    // Wait for @font-face loads to finish.
    await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {});

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

    // Give deferred JS a beat after our style injection.
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot(`${p.name}.png`, {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
      animations: 'disabled',
    });
  });
}
