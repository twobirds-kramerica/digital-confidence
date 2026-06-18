# AGENTS.md

See `CLAUDE.md` for project identity, hard constraints (static-only, no backend), accessibility standards, and content rules. Those apply to all agents.

## Cursor Cloud specific instructions

This is a **fully static** HTML/CSS/JS site (no framework, no build step). "Running the app" means serving the repo root with a static file server; there is nothing to compile.

### Services / how to run
- **Run the site:** `http-server . -p 3000 -s --cors` from the repo root, then open `http://localhost:3000/`. Any static server works; `http-server` matches what CI uses. Start it in a tmux session so it survives between commands.
- The site uses an onboarding modal on first load (location → device → privacy → font) and stores all state in LocalStorage. Module progress is **scroll-based**, not checkbox-based — sections mark themselves read as you scroll. The final quiz is gated until modules are started.

### Lint (accessibility) — the repo's only "lint"
- There is no ESLint/Prettier. The lint check is **axe-core** (see `.github/workflows/axe-core.yml`). CI only fails on *critical* WCAG violations; serious/moderate/minor are reported but non-blocking.
- Run against the running server, e.g.:
  `axe http://localhost:3000/index.html --tags wcag2a,wcag2aa,wcag21a,wcag21aa --chromedriver-path "$HOME/.npm-global/bin/chromedriver" --exit`
- **Gotcha:** the axe CLI bundles a ChromeDriver that tracks the *latest* Chrome, but this VM's Chrome is pinned to major 148. Without `--chromedriver-path` pointing at the matching `chromedriver@148` (installed by the update script), axe fails with a "session not created / version mismatch" error.

### Tests — Playwright smoke + visual
- Harness lives in `tests/playwright/` (CI-only; its `node_modules` is gitignored). Smoke tests assert no horizontal overflow, non-blank body, and an `<h1>` across 6 pages × 5 browser projects.
- The server on `:3000` must be running first. Then:
  `cd tests/playwright && PW_BASE_URL=http://localhost:3000 npx playwright test smoke.spec.js`
- `visual.spec.js` needs committed baseline snapshots and is run by `visual-regression.yml`, not the smoke workflow — don't run it ad hoc unless baselines exist.
- Internal link helper: `node test-links.js`. **Known false positives:** it flags root-relative links like `/sitemap.xml` as broken because it resolves `/` against the filesystem root; those files do exist. Not part of CI.

### Environment notes
- npm's global prefix is set to `$HOME/.npm-global` (kept in `~/.npmrc`) so `npm install -g` works without sudo; `$HOME/.npm-global/bin` is on PATH via `~/.bashrc`. An nvm warning about an incompatible `prefix` prints on most shell invocations — it is harmless and does not affect installs.
- The Python `generate_*.py` scripts and `scripts/*.py` are offline content generators, not part of the served app or its dev loop.
