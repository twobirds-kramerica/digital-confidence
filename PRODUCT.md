# Product

## Register

product

## Users

Canadian adults aged 65 and older, primarily using an iPhone, iPad, or Android tablet. Frequently in dark mode (Android system dark theme is common in this demographic). Low digital confidence — many are using the internet cautiously or for the first time. Caregivers (adult children aged 40–60) who set up devices and want their parents to continue learning. Library facilitators running 90-minute group sessions with 8–12 seniors. They are reading carefully, often with reading glasses, frequently interrupted, and may return to the same module multiple times over weeks.

Primary task on any screen: complete one section of a learning module at their own pace, then either continue or safely stop and come back later.

## Product Purpose

Free Canadian digital literacy programme. 29 adult modules covering device basics, online safety, banking, AI literacy, video calling, and government benefits. Content is explicitly Canadian (CRA, Service Canada, provincial services). No login. No tracking. No cost. Works on any device in any browser.

Success looks like: a 70-year-old senior who was afraid to use their iPhone for anything beyond calls can now check their CRA account, video call grandchildren, and recognise a phishing email — without needing to call their children for help.

## Brand Personality

Trusted neighbour. Kitchen-table warmth. Anxiety-first (remove fear before teaching skill).

Tone: calm, patient, never condescending. Like a knowledgeable friend sitting beside you, not a textbook.
Voice: plain language, short sentences, Canadian English. "You are in a safe place" is a recurring phrase. "Nothing on this page can harm your device" is a literal reassurance used at the top of every module.

## Anti-references

- Apple.com (too sleek, intimidating for seniors)
- Khan Academy (too educational-institutional, too much chrome)
- AARP.org (too dense, magazine-style, overwhelming)
- Any dark-themed tech dashboard (Career Coach Theme C is explicitly NOT a DCC direction)
- Floating overlays that cover content (? Help buttons, feedback bubbles — these are current anti-patterns already on the live site)
- Small text, thin weights, low-contrast helper text
- "Sign up to unlock" gates of any kind

## Design Principles

1. **Anxiety first.** Every screen assumes the user is slightly afraid. The first visual message must be reassuring, not instructional.
2. **One thing per screen.** No competing calls to action. The section being read is the only thing that matters. Navigation is available but recedes.
3. **Dark mode is not an afterthought.** All text, quiz questions, answer options, and interactive elements must have WCAG AA contrast in both light and dark mode. Test dark mode first, not last.
4. **Floating elements earn their position.** Nothing hovers over readable content. Help buttons, feedback widgets, and progress indicators stay in designated zones that never collide with prose.
5. **Always a way back.** Every module page has a clear, visible Home link. Seniors frequently get disoriented — the escape hatch is not just content, it is structural.

## Accessibility & Inclusion

- WCAG 2.1 AA minimum; AA for contrast on all text including quiz options, helper text, placeholder text in dark mode
- Base font size: 18px minimum; A/A+/A++ text-size toggle present on every page
- Touch targets: 44×44px minimum (56px preferred for primary actions)
- Reading glasses assumption: large x-height fonts, generous line height (1.6 minimum)
- Dark mode: ALL components must maintain contrast ratios in system dark mode — this is not optional
- Reduced motion: `prefers-reduced-motion` respected on all transitions
- Read-aloud: every module page has a working read-aloud affordance (speech-config.js + read-aloud.js wired to all 32 modules; module-1-wizard.html is a noindex POC and is intentionally excluded)
- No autoplay, no video that starts without user action
- Screen reader compatible: semantic heading hierarchy, ARIA labels on interactive elements
