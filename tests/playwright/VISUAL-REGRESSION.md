# Visual Regression — DCC Playwright

This directory contains two spec files with different CI lifecycles.

## `smoke.spec.js` — runs on every push
Fast (~2 min). Checks horizontal overflow, body-text presence, `<h1>` existence. Cross-engine via `.github/workflows/playwright.yml`. This is the always-on regression catcher.

## `visual.spec.js` — runs on manual trigger (for now)
Slower. Compares a full-page screenshot of each of 6 DCC pages against committed baselines in `__screenshots__/`. Fails if more than 2% of pixels differ.

Lifecycle:
1. **First run (bootstrap):** baselines don't exist yet. Trigger `visual-regression.yml` with `update_snapshots: true`. The workflow generates the initial baselines and commits them back to `main`.
2. **Subsequent runs (compare):** trigger `visual-regression.yml` without setting the input. The workflow compares against the committed baselines and fails on diffs exceeding the threshold.
3. **After an intentional visual change ships:** trigger `visual-regression.yml` with `update_snapshots: true` again. New baselines overwrite old ones.

### Triggering the workflow
- GitHub UI: Actions tab → "Visual regression (Playwright)" → Run workflow → choose `update_snapshots` toggle.
- gh CLI: `gh workflow run visual-regression.yml -f update_snapshots=true`

### Why visual regression isn't on every push (yet)
First baselines need to be committed before push-trigger is useful. Once the initial baseline commit exists on `main`, extend `visual-regression.yml` with a `push:` trigger alongside `workflow_dispatch`.

### Scope decisions
- **Chromium at desktop-1280 only.** Cross-engine visual diffs (Firefox / WebKit vs Chromium) are expected (different font rendering, sub-pixel positioning) and would produce noise without adding signal. Those engines are covered by `smoke.spec.js` for functional correctness.
- **6 pages:** index, module-1, final-quiz, accessibility, faq, styleguide. Same representative set as smoke tests.
- **Threshold:** `maxDiffPixelRatio: 0.02` (2%). Tolerates anti-aliasing and sub-pixel positioning while catching real changes.
- **Animations disabled** via injected CSS before screenshot — removes flakiness from hover / transition states.

### When this workflow fails
- Download the `visual-regression-results` artifact from the failed run.
- Open the HTML report (`playwright-report/index.html`).
- Each failure shows three images: expected (baseline), actual, diff. Eyeball the diff.
- Intentional change → trigger the workflow again with `update_snapshots: true`.
- Unintentional change → fix the regression and push again.

### Baseline management
- Baselines live in `tests/playwright/__screenshots__/`. They are committed to the repo.
- File naming: `visual.spec.js-snapshots/<test-name>-<platform>.png`. Playwright handles this.
- To delete a baseline manually: remove the file, push, re-trigger the workflow with `update_snapshots: true`.
