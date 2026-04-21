// Playwright config for DCC viewport + cross-engine smoke tests.
// Chromium tests all 3 viewports (catches layout regressions per-viewport).
// Firefox + WebKit test at desktop-1280 only (catches engine differences:
// SVG rendering, font metrics, JS API gaps) — viewport bugs are already
// caught upstream by Chromium, so we don't pay the 3x combinatorial cost.

const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: '.',
  // Centralise baseline snapshots under __screenshots__/ so the
  // visual-regression.yml commit step can diff one directory.
  // Preserves {-projectName} and {-snapshotSuffix} so multi-project /
  // multi-OS baselines don't collide.
  snapshotPathTemplate: '__screenshots__/{testFilePath}/{arg}{-projectName}{-snapshotSuffix}{ext}',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],

  use: {
    baseURL: process.env.PW_BASE_URL || 'http://localhost:3000',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
  },

  projects: [
    // --- Chromium: all 3 viewports (viewport regressions) ------------------
    {
      name: 'chromium-mobile-360',
      use: { ...devices['Desktop Chrome'], viewport: { width: 360, height: 800 } },
    },
    {
      name: 'chromium-tablet-768',
      use: { ...devices['Desktop Chrome'], viewport: { width: 768, height: 1024 } },
    },
    {
      name: 'chromium-desktop-1280',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 900 } },
    },

    // --- Cross-engine: Firefox + WebKit at desktop only --------------------
    // Purpose: catch engine-specific bugs (SVG, font rendering, JS API
    // surface differences). Viewport bugs are already covered by Chromium.
    {
      name: 'firefox-desktop-1280',
      use: { ...devices['Desktop Firefox'], viewport: { width: 1280, height: 900 } },
    },
    {
      name: 'webkit-desktop-1280',
      use: { ...devices['Desktop Safari'], viewport: { width: 1280, height: 900 } },
    },
  ],
});
