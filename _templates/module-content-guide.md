# Module Content Creation Guide — Digital Confidence Centre

Use this guide every time you write a new DCC module. It covers structure, tone, rules, and length targets so all modules feel consistent and trustworthy.

---

## Structure

Every module follows this exact order:

1. **Breadcrumb** — Home › Module N
2. **H1 Heading** — Module N: Title
3. **What You'll Learn** (tip-block) — 3 bullet outcomes
4. **Section 1** — Introduction with story-block
5. **Section 2** — Core concept with tip-block
6. **Section 3** — Deeper topic or second concept
7. **Practice Scenario** — Real-world situation with hidden answer
8. **Key Takeaways** — 6-card grid
9. **Mark Your Progress** — 3 checkboxes
10. **Navigation** — Previous / Home / Next module buttons
11. **Footer**

Do not deviate from this order. Seniors rely on predictability.

---

## Tone Guidelines

### What Good Tone Sounds Like
- Warm, matter-of-fact, and never condescending
- Addresses the reader directly: "you", not "seniors" or "older adults"
- Normalises mistakes: "Everyone does this at some point"
- Acknowledges fear as valid before teaching the solution
- Short sentences. One idea per sentence whenever possible.
- Uses "tap" not "click" — these learners are on iPads

### What to Avoid
- Never say "It's simple!" or "Easy!" — if it were easy, they wouldn't need this module
- Never say "Just" — it implies the reader should already know
- Never use "elderly" — say "seniors" or simply "you"
- Avoid acronyms without spelling them out first: "Wi-Fi (wireless internet)"
- No jargon left unexplained: define every tech term in plain language
- Don't talk about "the cloud" without explaining what it means first
- Don't assume readers have used a computer before — assume iPad only

### The Tone Test
Read your draft aloud. If you'd be embarrassed to say it to a 75-year-old at a library help desk, rewrite it.

---

## Content Rules

### Ontario-First Rule
Every example, every scenario, and every named service must be Ontario-specific. No US examples. If you mention a bank, use an Ontario bank. If you mention a grocery store, use an Ontario chain.

**Approved Ontario Examples:**

| Category | Acceptable Examples |
|---|---|
| Banks | RBC, TD, Scotiabank, BMO, CIBC, Meridian Credit Union |
| Grocery | No Frills, Loblaws, Metro, Food Basics, Sobeys, FreshCo |
| Pharmacy | Shoppers Drug Mart, Rexall, Guardian |
| Coffee | Tim Hortons (not Starbucks as primary example) |
| Ride-sharing | Uber, Lyft |
| Phone carriers | Bell, Rogers, Telus, Koodo, Fido |
| Cities | St. Thomas, London, Stratford, Guelph, Kitchener, Brantford, Windsor |

### Story Blocks
Every module must include at least one `story-block`. Stories should:
- Feature a named character (Margaret, Jim, Dorothy, Frank, Betty, George)
- Describe a realistic situation a 70+ Ontario resident would face
- Show a positive outcome — the character learns something or avoids a problem
- Be 3–5 sentences maximum

### Tip Blocks
Tip blocks are for practical, actionable advice. They should:
- Start with an emoji label (e.g. "💡 Quick Tip" or "🍁 Ontario Note")
- Contain one clear action or fact
- Never be used for warnings — use a `warning-block` (red left border) for danger notices

### Practice Scenarios
The scenario must:
- Describe a realistic situation in 1–2 sentences
- Have a single correct response (not a quiz — just a "here's what you do" moment)
- Use the hidden-answer toggle so learners can try before seeing the answer
- Be drawn from real situations Ontario seniors have faced

---

## Length Targets

| Section | Target Length |
|---|---|
| H1 title | Under 7 words |
| What You'll Learn (each outcome) | 8–14 words |
| Section intro paragraph | 40–80 words |
| Story block | 60–100 words |
| Tip block | 30–60 words |
| Practice scenario description | 25–50 words |
| Scenario answer | 40–80 words |
| Each takeaway card | 15–30 words |
| Each progress checkbox label | Under 10 words |
| Total module reading time | 8–14 minutes |

If your draft is over 14 minutes of reading, split the topic into two modules.

---

## Common Mistakes to Avoid

1. **Writing for a web developer, not a senior.** Every sentence should pass the "Margaret test" — would a 74-year-old in St. Thomas understand this without a dictionary?

2. **Too many warnings.** One clear warning per module maximum. Piling up warnings creates anxiety and causes readers to skip content.

3. **Passive voice.** "Mistakes can be made" is weak. "You might tap the wrong button — that's fine" is better.

4. **Long sentences.** If a sentence has more than one comma, split it.

5. **Skipping the story block.** Data shows story blocks are the most-read element in DCC modules. Never cut them to save space.

6. **Using US spelling.** This is a Canadian programme. Centre, colour, labour, cheque, favour, recognise, organise, customise.

7. **Assuming prior knowledge.** Always explain what something is before explaining how to use it. "The App Store is Apple's official shop for apps (programmes for your iPad)."

8. **Making the scenario too hard.** The practice scenario should feel achievable on a first try. It is not a test — it is a confidence builder.

9. **Ignoring the print layout.** Seniors often print modules to read later. Check that the page looks clean when printed (no broken layouts, no cut-off tables).

10. **Forgetting progress checkboxes.** Every module needs exactly 3 checkboxes. These are critical to the learner's sense of progress.

---

## Accessibility Checklist

Before submitting a new module, verify each item:

- [ ] All images have descriptive `alt` text (not "image of phone" — describe what it shows)
- [ ] Colour is never the only way to convey information (don't say "tap the green button" without also naming it)
- [ ] Font size system is intact — no inline styles override the `data-font-size` attribute
- [ ] No content is hidden that assistive technology needs to read
- [ ] Story blocks and tip blocks use `<span>` labels, not headings, so they don't disrupt screen reader heading order
- [ ] Interactive elements (scenario toggle, progress checkboxes) have `aria-label` or visible labels
- [ ] Page tested at 150% zoom — no horizontal scrolling
- [ ] Page tested at 200% zoom — all content still readable
- [ ] Print stylesheet renders cleanly (no overlapping elements, no cut-off text)
- [ ] All links have meaningful text ("Learn more about passwords" not "Click here")
- [ ] Colour contrast meets WCAG AA minimum (4.5:1 for body text)
- [ ] No autoplay audio or video
- [ ] Touch targets (buttons, checkboxes) are at least 44×44 pixels on iPad

---

## Quick Reference: Placeholder Tags in module-template.html

| Placeholder | What to Replace With |
|---|---|
| `{{MODULE_NUM}}` | Module number (e.g. 13) |
| `{{MODULE_TITLE}}` | Module title (e.g. Understanding Cloud Storage) |
| `{{MODULE_NUM_PREV}}` | Previous module number |
| `{{MODULE_NUM_NEXT}}` | Next module number |
| `{{OUTCOME_1}}` through `{{OUTCOME_3}}` | Three learning outcomes |
| `{{SECTION_1_TITLE}}` | First section heading |
| `{{SECTION_1_CONTENT}}` | First section body paragraph |
| `{{STORY_LABEL}}` | Story block label (e.g. "Margaret's Story") |
| `{{STORY_CONTENT}}` | Story block paragraph(s) |
| `{{SECTION_2_TITLE}}` | Second section heading |
| `{{SECTION_2_CONTENT}}` | Second section body paragraph |
| `{{TIP_LABEL}}` | Tip block label with emoji |
| `{{TIP_CONTENT}}` | Tip block text |
| `{{SECTION_3_TITLE}}` | Third section heading |
| `{{SECTION_3_CONTENT}}` | Third section body paragraph |
| `{{SCENARIO_DESCRIPTION}}` | Practice scenario situation |
| `{{SCENARIO_ANSWER}}` | What to do in the scenario |
| `{{TOPIC_1}}`, `{{SKILL_1}}`, `{{CONFIDENCE_1}}` | Progress checkbox completions |

---

*This guide is maintained by Aaron Kramer, Two Birds Innovation.*
*Last updated: 2026-03-24*
