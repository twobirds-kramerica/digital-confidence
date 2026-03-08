# Digital Confidence Centre — Sprint Backlog

## DEFERRED — Visual AI Feature (Medium-High Effort)

### Feature: "Show Me" — Visual AI Assistant for Seniors

**Concept:**
Integrate a "Show Me" button or section in relevant modules that teaches seniors how to use their device's camera as a learning tool. Specifically:

- How to use Google Lens (Android) or Visual Look Up (iPhone/iPad) to:
  - Identify a plant or weed in the garden
  - Find a replacement part for a household item
  - Identify what something on screen means (take a photo of your screen)
  - Find where to buy something they can see
  - Check if something looks suspicious or safe

- How to use YouTube search with a photo (describe what you see, search for a tutorial)
- How to use the camera to ask questions via Google or Siri

**Why it matters:**
This turns the camera from a scary unknown into a powerful tool for independence. It directly addresses the "creative play" goal from the Brenda interview — using the device to explore the world, not just complete tasks.

**Implementation notes:**
- Module 7 (Photos & Creative Joy) is the natural home, but a standalone "Bonus Module" may be better
- Must be iOS-first (iPhone/iPad) with Android variants
- No third-party API keys needed — all features are native to the device
- Low-stakes exercises: photograph a houseplant, look it up, celebrate the result
- Include a Success State for each exercise
- Requires image placeholders showing where to find Google Lens / Visual Look Up on device

**Effort estimate:** Medium-High (new module or major module expansion)
**Priority:** Post-beta, Sprint 6 or 7
**Flagged by Aaron:** Yes — high enthusiasm, felt it would build independence and joy

---

## Deferred from Sprint 6 Full Capacity

### Feature: French Language Support

**Concept:**
Add a French (Canadian) language variant of the full site, or at minimum a bilingual toggle for key pages.

**Why it matters:**
A significant proportion of Ontario seniors speak French as a first language (especially Eastern Ontario, Ottawa). `faq-fr.html` exists as a proof-of-concept.

**Implementation notes:**
- Requires translating all 11 module pages + homepage, resources, FAQ
- French content already started: `faq-fr.html`
- Consider lang toggle in sidebar nav rather than separate URL structure
- All content must use Canadian French (not European French)

**Effort estimate:** High
**Priority:** Post-launch, Sprint 9+

---

### Feature: Family Dashboard

**Concept:**
A lightweight dashboard page for family members / caregivers to see a summary of their loved one's progress without needing access to the senior's device.

**Why it matters:**
Family members are a key part of the support network. Giving them visibility increases engagement and provides a natural check-in prompt.

**Implementation notes:**
- Could be implemented as a shareable link with a unique ID (localStorage-generated)
- Progress data is currently only in localStorage — would need a way to export/share
- `family-setup.html` already exists as entry point for family caregivers
- Privacy considerations: consent must be explicit before sharing progress data
- Could be as simple as a printable summary sheet generated from localStorage

**Effort estimate:** Medium-High
**Priority:** Post-launch, Sprint 8

---

### Feature: Printable PDFs for Each Module

**Concept:**
Generate a one-page printable summary of each module's key points, suitable for seniors who prefer paper notes or have low-vision needs.

**Why it matters:**
Some seniors want a physical reference. Printing from the browser currently loses layout. A print-optimised summary would bridge the digital/paper gap.

**Implementation notes:**
- Certificate.html already has a `@media print` implementation — reuse that pattern
- Each module summary should include: module title, 3–5 key takeaways, the Three-Second Rule reminder, and a support phone number
- Can be triggered from a "Print Summary" button in each module's footer
- Consider generating dynamically from existing module content vs. static HTML print pages

**Effort estimate:** Medium
**Priority:** Post-launch, Sprint 8

---

### Audit: Podcast Integration

**Concept:**
Review and update all podcast integration points across the site, ensuring podcast cards link to active episodes and reflect the current content structure.

**Why it matters:**
Podcast links added in earlier sprints may point to placeholder or outdated URLs. Active podcast content increases session time and provides an offline learning option.

**Implementation notes:**
- Audit all `podcast-card` elements across module pages and resources.html
- Verify that audio embed sources (if any) are accessible and not broken
- Ensure podcast content is captioned or has transcript options for accessibility
- Consider adding podcast section to resources.html if not already present

**Effort estimate:** Low-Medium
**Priority:** Sprint 8
