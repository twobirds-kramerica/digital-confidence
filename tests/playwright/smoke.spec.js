// S-029 smoke tests — DCC pages rendered at 3 viewports.
// Per-test assertions:
//   1. Horizontal overflow is 0 (scrollWidth <= innerWidth).
//   2. Body has substantive visible text (> 80 chars) so a blank page is caught.
//   3. Page has an <h1> so the layout wasn't partially stripped.
//
// Viewports come from the playwright.config.js projects: 360 / 768 / 1280.
// 6 pages × 3 viewports = 18 test cases per run.

const { test, expect } = require('@playwright/test');

const PAGES = [
  { name: 'home',          path: '/' },
  { name: 'module-1',      path: '/modules/module-1.html' },
  { name: 'final-quiz',    path: '/final-quiz.html' },
  { name: 'support-dir',   path: '/support-directory.html' },
  { name: 'faq',           path: '/faq.html' },
  { name: 'classic-home',  path: '/classic/index.html' },
];

const MIN_BODY_TEXT_LEN = 80; // heuristic: pages below this are probably broken

for (const p of PAGES) {
  test(`${p.name} renders without overflow or blank body`, async ({ page }) => {
    const response = await page.goto(p.path, { waitUntil: 'domcontentloaded' });
    expect(response, `${p.name}: navigation failed`).not.toBeNull();
    expect(response.status(), `${p.name}: HTTP status`).toBeLessThan(400);

    // Give any deferred JS a beat to settle
    await page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});

    // 1. Horizontal overflow detection
    const { scrollWidth, innerWidth, culprits } = await page.evaluate(() => {
      const innerWidth = window.innerWidth;
      const scrollWidth = document.documentElement.scrollWidth;
      const culprits = [];
      if (scrollWidth > innerWidth) {
        // Walk the DOM, find elements whose right edge exceeds innerWidth
        document.querySelectorAll('*').forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.right > innerWidth + 0.5 && r.width > 10) {
            culprits.push({
              tag: el.tagName.toLowerCase(),
              id: el.id || '',
              cls: (el.className && typeof el.className === 'string') ? el.className.slice(0, 60) : '',
              right: Math.round(r.right),
              width: Math.round(r.width),
              text: (el.textContent || '').trim().slice(0, 50),
            });
          }
        });
        // Dedupe near-identical ancestors: keep the 5 widest distinct
        culprits.sort((a, b) => b.right - a.right);
      }
      return { scrollWidth, innerWidth, culprits: culprits.slice(0, 8) };
    });
    const overflow = scrollWidth - innerWidth;
    expect(
      overflow,
      `${p.name}: horizontal overflow ${overflow}px (scrollWidth=${scrollWidth}, innerWidth=${innerWidth})\nTop culprits: ${JSON.stringify(culprits, null, 2)}`
    ).toBeLessThanOrEqual(0);

    // 2. Blank-page detection — body text exists
    const bodyText = (await page.locator('body').innerText()).trim();
    expect(
      bodyText.length,
      `${p.name}: body has only ${bodyText.length} visible chars`
    ).toBeGreaterThan(MIN_BODY_TEXT_LEN);

    // 3. At least one <h1> present (layout integrity)
    const h1Count = await page.locator('h1').count();
    expect(h1Count, `${p.name}: no <h1> found on page`).toBeGreaterThanOrEqual(1);
  });
}
