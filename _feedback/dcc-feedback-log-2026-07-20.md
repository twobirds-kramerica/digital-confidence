# DCC Feedback Log — 2026-07-20 (Aaron, live review)

**Captured live so nothing is lost again.** DCC is NOT launch-ready per Aaron: no beta test yet, no self UX/UI pass, information architecture questionable. Do NOT point people at DCC publicly (no DCC link in any LinkedIn post) until Aaron has done his UX pass and signed off. This log is the running list; items get fixed (mechanical) or flagged (taste/brand) then checked off.

## Status legend: [ ] open · [x] fixed+verified · [F] flagged for Aaron (taste/brand)

## Items

- [ ] **Dead nav tabs — "Staying Connected" and "Getting Things Done" go nowhere when clicked.** Reported on the live v2 site. (Found `module-18-staying-connected.html` links in the `classic/` build — need to confirm the LIVE v2 root site's tab targets and fix the dead ones.) Full audit of ALL nav links needed.

- [ ] **Stray blue line, top-left corner of `digital-confidence/modules-ai-literacy.html`.** Very subtle — reads as a mistake. Either remove it, or if intentional make it clearly prevalent. Aaron believes it's not supposed to be there.

- [F] **Logo / brand mark not locked.** DCC ("Digital Confidence Centre") has no logo yet. Is the current "fabric"/motif on the site meant to BE the logo? Aaron wants this confirmed and locked into the brand. → Confirm what mark is currently used, present it, Aaron decides + we lock it in DESIGN-SYSTEM / brand.

- [F] **"For Families" tab — audience-shift / IA + psychology problem (Aaron, strong flag).** The whole site speaks TO the senior/primary user. "For Families" sits IN-LINE with the other nav items, so a senior clicking it hits content aimed at a *different* audience (a loved one supporting them) with no signpost — confusing ("Am I getting this for my family? No, it's for YOUR family"). Two fixes wanted:
    1. **Nav treatment:** do NOT keep "For Families" in-line with the other menu options. Differentiate/delineate it — e.g. a hanging tab, or set off to the right / below / visually distinct — so it reads as a separate doorway for a different person, without beating them over the head.
    2. **On the page itself:** make the audience shift immediately clear so a senior who stumbles in instantly knows it's not speaking to them. Open with something like *"Do you have a loved one who could use some support with technology? This section is for you."* Possibly make the page look visually different from the rest of the site (no image required). Frame: "Are you a loved one supporting someone who needs help? This section is for you."
    IA + psychology treatment — route through the IA GATE (`/information-architecture`) + DESIGN GATE since it restructures nav; propose before building. Aaron challenges the current treatment.

- [ ] **UX/UI not yet self-reviewed by Aaron / no beta tester.** Full UX/UI audit to surface issues systematically (recover the lost feedback batch).

## Notes
- Prior DCC feedback batch (nav/delineation, read-aloud placement, logos, contrast, iPhone-default, "back to DCC" broken, video style) was given earlier this session — cross-reference `digital-confidence/_feedback/` for existing items so we don't duplicate.
- Fixes to the LIVE site must pass Playwright live-verification (LIVE-OUTCOME VERIFICATION rule) + bump service-worker CACHE_NAME so returning visitors get the fix.
