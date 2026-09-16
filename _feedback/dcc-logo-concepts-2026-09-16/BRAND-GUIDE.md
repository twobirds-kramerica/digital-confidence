# DCC Brand Guide: Logo & Favicon System (Mini Reference)

> **DRAFT -- DESIGN GATE not cleared, not live, this is Aaron's live design review in progress (2026-09-16), not a final locked system.**

---

## 1. System Overview & Architecture

The Digital Confidence Centre (DCC) visual identity system is designed around a multi-tier product architecture. Each tier shares a unified core brand anchor while expressing its specific audience alignment through distinct color tokens and age-coded motifs.

### The Naming Template Pattern
The primary brand lockup follows a strict, extensible template: **`DCC [Tier]`**

- **`DCC`**: Invariant brand prefix. Fixed in **DCC Trust Blue (`#1D4E89`)** across all product tiers and applications.
- **`[Tier]`**: Dynamic product line designation. Recolored per product line to match that tier's primary accent color token (e.g., "Adults" in Amber `#E0A63A`, "KIDS" in Burnt Orange `#E8842C`).

#### System Extensibility & Future Tiers
The `DCC [Tier]` pattern accommodates future expansion without visual fragmentation. Examples discussed during design reviews include:
- `DCC Special Education` *(Accent token TBD -- **NOT YET BUILT**)*
- `DCC For You` *(Custom/personalized learning program -- **NOT YET BUILT**)*

---

## 2. Color Tokens & Contrast Audits

### Palette Tokens
| Token Name | Hex Value | Application / Role |
| :--- | :--- | :--- |
| **DCC Trust Blue** | `#1D4E89` | Adults background, fixed `DCC` wordmark prefix, Adults tier tag text |
| **DCC Amber** | `#E0A63A` | Adults tier accent (spectacles motif + `Adults` tier title text) |
| **DCC Teal** | `#2A7B6F` | Kids background, Kids tier tag text |
| **DCC Orange** | `#E8842C` | Kids tier accent (baseball cap motif + `KIDS` tier title text) |
| **DCC Pure White** | `#FFFFFF` | Light bulb contour silhouette & base line art |
| **DCC Off-White** | `#FAFAF8` | Facial expression elements (eyes & smiles) & cap top button |
| **DCC Dark Slate** | `#1C2733` | Subtitle text ("Digital Confidence Centre") |
| **DCC Divider Gray** | `#D5DDE6` | Lockup vertical separator line |

### WCAG Contrast Ratios & Graphical Accessibility
Calculated against standard WCAG relative luminance ($L = 0.2126 R + 0.7152 G + 0.0722 B$ with sRGB linear conversion):

1. **DCC Amber (`#E0A63A`) on DCC Trust Blue (`#1D4E89`)**:
   - **Contrast Ratio: 3.88:1**
   - *Status: PASS* (Exceeds 3:1 minimum for UI icon motifs and large display text $\ge$24px/18pt bold).
2. **DCC Amber (`#E0A63A`) on White (`#FFFFFF`)**:
   - **Contrast Ratio: 2.17:1**
   - *Status: FLAGGED (< 3:1)*. Amber text or icons require a dark container background (such as Trust Blue) or display size $\ge$52px bold for sufficient legibility on light surfaces.
3. **DCC Orange (`#E8842C`) on DCC Teal (`#2A7B6F`)**:
   - **Contrast Ratio: 1.86:1**
   - *Status: FLAGGED (< 3:1)*. Graphical features on Teal backgrounds use high-contrast Off-White (`#FAFAF8`) facial accents (**5.40:1** contrast ratio against Teal) for primary readability.
4. **DCC Orange (`#E8842C`) on White (`#FFFFFF`)**:
   - **Contrast Ratio: 2.71:1**
   - *Status: FLAGGED (< 3:1 for body text)*. Approved for large display title text (`DCC KIDS` at 52px ExtraBold) on white backgrounds.
5. **Pure White (`#FFFFFF`) on DCC Trust Blue (`#1D4E89`)**:
   - **Contrast Ratio: 8.43:1** (*Passes WCAG AAA*).
6. **Pure White (`#FFFFFF`) on DCC Teal (`#2A7B6F`)**:
   - **Contrast Ratio: 5.05:1** (*Passes WCAG AA*).
7. **DCC Dark Slate (`#1C2733`) on White (`#FFFFFF`)**:
   - **Contrast Ratio: 14.77:1** (*Passes WCAG AAA*).

---

## 3. Typography Standards

### Font Stacks
- **Primary Sans-Serif Stack**: `'Source Sans 3', 'Segoe UI', system-ui, -apple-system, sans-serif`
- **Secondary Serif Stack (Brand Copy/Voice)**: `'Merriweather', Georgia, serif`

### Role Hierarchy & SVG viewBox Scale Reference (640x160 viewBox)
- **Primary Prefix (`DCC`)**: Source Sans 3, Bold (700), `52px`, fill `#1D4E89`.
- **Adult Tier Title (`Adults`)**: Source Sans 3, Bold (700), `52px`, fill `#E0A63A`.
- **Kid Tier Title (`KIDS`)**: Source Sans 3, Extra Bold (800), `52px`, fill `#E8842C`.
- **Brand Subtitle (`Digital Confidence Centre`)**: Source Sans 3, SemiBold (600), `22px`, letter-spacing `0.5px`, fill `#1C2733`.
- **Adult Tier Tag (`ADULT LEARNING TIER`)**: Source Sans 3, SemiBold (600), `14px`, letter-spacing `1px`, text-transform `uppercase`, fill `#1D4E89`.
- **Kid Tier Tag (`YOUTH & JUNIOR LEARNING TIER`)**: Source Sans 3, SemiBold (600), `14px`, letter-spacing `1px`, text-transform `uppercase`, fill `#2A7B6F`.

---

## 4. Sizing & Usage Guidance

### Min/Max Sizing Thresholds
- **Favicon / Icon-Only Mark**:
  - *Minimum Size*: `16x16 px`
  - *Recommended Standard*: `32x32 px` (or Retina `64x64 px`)
- **Full Logo Lockup**:
  - *Minimum Width*: `240 px` (at 240x60 scale, tier tag text remains readable at ~5.25pt).
  - *Standard Display*: `640x160 px` viewBox.

### Usage Context Rules
- **Icon-Only Mark (Favicon / Squircle Badge)**:
  - Browser favicons and touch icons.
  - App launcher icons & avatar/profile placeholders.
  - Compact mobile headers (viewports `< 480px`).
- **Full Logo Lockup**:
  - Desktop & tablet website navigation headers.
  - Official program documents, reports, and marketing collateral.
  - Presentation title slides & video end-cards.

---

## 5. Contrast & Variation Swatches

Below are inline SVG swatches confirming mark legibility across White, Near-Black, and Tier Native backgrounds.

### DCC Adults Swatches
```xml
<!-- Light Background (White #FFFFFF) -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" width="320" height="80">
  <rect width="320" height="80" fill="#FFFFFF" stroke="#E2E8F0"/>
  <g transform="translate(10, 10) scale(0.5)">
    <rect width="120" height="120" rx="24" fill="#1D4E89" stroke="#E0A63A" stroke-width="3"/>
    <circle cx="46.5" cy="53.5" r="12" fill="none" stroke="#E0A63A" stroke-width="3.0"/>
    <circle cx="73.5" cy="53.5" r="12" fill="none" stroke="#E0A63A" stroke-width="3.0"/>
    <path d="M58.5 51.4 C59.4 48.4 60.6 48.4 61.5 51.4" fill="none" stroke="#E0A63A" stroke-width="2.7" stroke-linecap="round"/>
    <path d="M54 74 Q60 78.5 66 74" fill="none" stroke="#FAFAF8" stroke-width="3.0" stroke-linecap="round"/>
  </g>
  <text x="80" y="38" font-family="'Source Sans 3', sans-serif" font-weight="700" font-size="24" fill="#1D4E89">DCC <tspan fill="#E0A63A">Adults</tspan></text>
  <text x="80" y="56" font-family="'Source Sans 3', sans-serif" font-weight="600" font-size="11" fill="#1D4E89" letter-spacing="0.5">ADULT LEARNING TIER</text>
</svg>

<!-- Dark Background (Near-Black #121212) -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" width="320" height="80">
  <rect width="320" height="80" fill="#121212"/>
  <g transform="translate(10, 10) scale(0.5)">
    <rect width="120" height="120" rx="24" fill="#1D4E89" stroke="#E0A63A" stroke-width="3"/>
    <circle cx="46.5" cy="53.5" r="12" fill="none" stroke="#E0A63A" stroke-width="3.0"/>
    <circle cx="73.5" cy="53.5" r="12" fill="none" stroke="#E0A63A" stroke-width="3.0"/>
    <path d="M58.5 51.4 C59.4 48.4 60.6 48.4 61.5 51.4" fill="none" stroke="#E0A63A" stroke-width="2.7" stroke-linecap="round"/>
    <path d="M54 74 Q60 78.5 66 74" fill="none" stroke="#FAFAF8" stroke-width="3.0" stroke-linecap="round"/>
  </g>
  <text x="80" y="38" font-family="'Source Sans 3', sans-serif" font-weight="700" font-size="24" fill="#FFFFFF">DCC <tspan fill="#E0A63A">Adults</tspan></text>
  <text x="80" y="56" font-family="'Source Sans 3', sans-serif" font-weight="600" font-size="11" fill="#93C5FD" letter-spacing="0.5">ADULT LEARNING TIER</text>
</svg>
```

### DCC Kids Swatches
```xml
<!-- Tier Native Background (DCC Teal #2A7B6F) -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" width="320" height="80">
  <rect width="320" height="80" fill="#2A7B6F" rx="4"/>
  <g transform="translate(10, 10) scale(0.5)">
    <rect width="120" height="120" rx="24" fill="#2A7B6F" stroke="#E8842C" stroke-width="3"/>
    <path d="M42 28 C42 16 53 12 64 12 C74 12 82 17 82 28 Z" fill="#E8842C"/>
    <path d="M76 28 C85 28 98 30 102 36 C92 36 78 32 72 30.5 Z" fill="#E8842C"/>
    <circle cx="62" cy="12" r="3" fill="#FAFAF8"/>
    <circle cx="49" cy="55" r="5.5" fill="#FAFAF8"/>
    <circle cx="71" cy="55" r="5.5" fill="#FAFAF8"/>
    <path d="M53 68 Q60 74 67 68" fill="none" stroke="#FAFAF8" stroke-width="4" stroke-linecap="round"/>
  </g>
  <text x="80" y="38" font-family="'Source Sans 3', sans-serif" font-weight="800" font-size="24" fill="#FFFFFF">DCC <tspan fill="#E8842C">KIDS</tspan></text>
  <text x="80" y="56" font-family="'Source Sans 3', sans-serif" font-weight="600" font-size="11" fill="#A7F3D0" letter-spacing="0.5">YOUTH &amp; JUNIOR LEARNING TIER</text>
</svg>
```

---

## 6. Brand Voice & Tagline Status Note

- **Canonical 3-Word Essence**: *"Calm. Capable. Dignified."*
- **Aaron's Live Draft Revision (2026-09-16)**: *"Confident. Capable. Caring."*

> **Status Notice**: Aaron's live draft revision ("Confident. Capable. Caring.") is a tentative draft revision in progress and is **not fully locked**. To ensure visual longevity and prevent graphics from requiring re-renders when copy evolves, tagline strings have been removed from logo graphic lockups and replaced with standardized tier tags (`ADULT LEARNING TIER`, `YOUTH & JUNIOR LEARNING TIER`).
