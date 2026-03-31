# Canadian English Audit — March 31, 2026

## Scope

Files changed in the last 7 days (via `git log --since="7 days ago"`), filtered to public-facing `.html` and `.js` files.

Checked for:
- "organize" → "organise"
- "recognize" → "recognise"
- "analyze" → "analyse"
- "center" → "centre" (content text only, not CSS properties/variables/class names)
- "color" → "colour" (content text only, not CSS properties/variables/attribute values)
- "favorite" → "favourite"
- "realize" → "realise"
- "customize" → "customise"

---

## Findings

### js/search.js — NOT A VIOLATION

`recognizer` appears as a JavaScript variable name (a SpeechRecognition API object reference). Variable names in code are not content text — they follow JavaScript API conventions. **No fix needed.**

### CSS properties — NOT VIOLATIONS

`color: white`, `justify-content: center`, and similar CSS property values throughout HTML `<style>` blocks and `.css` files are CSS syntax, not user-facing content. **No fix needed.**

---

## Result

**0 Canadian English violations found in user-facing content text.**

All new HTML and JS files from the last 7 days pass the Canadian English check.
