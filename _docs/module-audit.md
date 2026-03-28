# DCC Module Audit
**Last updated:** 2026-03-28
**Total modules:** 19 (plus 2.5 and visual-ai bonus modules)

---

## Module Registry

| # | File | Title | Status | Category | Last Updated |
|---|------|-------|--------|----------|--------------|
| 1 | module-1.html | Mastering the Escape Hatch | ✅ Live | Foundations | 2025-11 |
| 2 | module-2.html | The Security Shield | ✅ Live | Safety | 2025-11 |
| 2.5 | module-2-5.html | Scam Simulator | ✅ Live | Safety (bonus) | 2025-12 |
| 3 | module-3.html | Passwords & Biometrics | ✅ Live | Safety | 2025-11 |
| 4 | module-4.html | App Store Safety | ✅ Live | Safety | 2025-11 |
| 5 | module-5.html | Email & Messages | ✅ Live | Communication | 2025-11 |
| 6 | module-6.html | Banking & Transactions | ✅ Live | Financial | 2025-11 |
| 7 | module-7.html | Photos & Memories | ✅ Live | Media | 2025-12 |
| 8 | module-8.html | Stay Connected | ✅ Live | Communication | 2025-12 |
| 9 | module-9.html | Understanding AI | ✅ Live | Technology | 2026-01 |
| 10 | module-10.html | Grocery & Food Delivery | ✅ Live | Daily Life | 2026-01 |
| 11 | module-11.html | Ride-Sharing Apps | ✅ Live | Daily Life | 2026-01 |
| 12 | module-12.html | Health Apps & Telehealth | ✅ Live | Health | 2026-01 |
| 13 | module-13.html | News & Misinformation | ✅ Live | Safety | 2026-01 |
| 14 | module-14.html | Government Services Online | ✅ Live | Daily Life | 2026-02 |
| 15 | module-15.html | Smart Home Devices | ✅ Live | Technology | 2026-02 |
| 16 | module-16.html | Online Shopping Safely | ✅ Live | Financial | 2026-02 |
| 17 | module-17.html | AI Research Tools | ✅ Live | Technology | 2026-03 |
| 18 | module-18-staying-connected.html | Staying Connected When It Matters Most | ✅ Live | Expanding Your Horizons | 2026-03 |
| 19 | module-19-digital-legacy.html | Your Digital Life: Keeping It Safe and Organised | ✅ Live | Expanding Your Horizons | 2026-03 |

**Bonus modules:**
- `module-visual-ai.html` — Visual AI tools (photos, image recognition)
- `final-quiz.html` — Final quiz (unlocked after completing all 19 modules)

---

## Bilingual Coverage

All modules include `data-en` and `data-fr` attributes on all user-visible text elements. Language switching is handled by `js/lang-toggle.js`.

Known gaps:
- Some modules 12–16 may have incomplete French translations on confidence check questions — verify before any French-language outreach push

---

## Accessibility Status

All modules are built to WCAG 2.1 AA. Known considerations:
- Modules 18 and 19 added March 2026 — not yet verified against full WCAG checklist
- All modules use semantic HTML, visible focus rings, and skip-nav links
- Font size 4-level system applies globally via `dc-font-size` localStorage key

---

## Module Naming Conventions

- Modules 1–17: `module-N.html` (numeric)
- Modules 18–19: `module-18-staying-connected.html`, `module-19-digital-legacy.html` (descriptive slug added)
- Future modules should follow the `module-N-descriptive-slug.html` pattern

---

## Completion Dependencies

```
finalQuizUnlocked = true  →  requires all 19 dc-module-N = 'complete'
Certificate issued        →  requires finalQuizScore ≥ 80
```

---

## Flagged for Future Review

| Issue | Module(s) | Priority |
|-------|-----------|----------|
| French confidence check completeness | 12–16 | Medium |
| WCAG re-verify post-March additions | 18, 19 | High |
| Module 8 vs Module 18 overlap (both cover connectivity) | 8, 18 | Low — keep both, different depth |
| Module 9 (Understanding AI) may need refresh as AI tools evolve | 9 | Medium |
