# Digital Confidence Centre — Version Française

## Structure

Ce dossier contiendra la version française complète du site.
La structure reflète exactement la version anglaise.

**État actuel :** Infrastructures en place — contenu en attente de traduction professionnelle.

## Approach

- All content requires **professional human translation**, not machine translation (Google Translate, DeepL)
- Translator should be a native Québécois French speaker familiar with Ontario-specific terminology
- Preferred dialect: French Canadian (Ontario variant) — not European French
- Key terminology preferences: "courriel" (not "email"), "aîné" (not "senior"), "clavardage" (not "chat")

## Pages Needed

Priority 1 (high traffic):
- [ ] index.html (homepage)
- [ ] module-1.html through module-12.html
- [ ] faq.html → faq-fr.html (partial version exists at root level)
- [ ] resources.html

Priority 2:
- [ ] about.html
- [ ] glossary.html
- [ ] scam-simulator.html
- [ ] family-setup.html

## Language Switching

Language switching is handled by `../../js/lang-toggle.js` — it auto-injects an ⚜ FR / ⚜ EN button into the accessibility bar on every page. The same script handles localStorage persistence of the user's language preference.

The `../../js/translations.json` file contains all UI string mappings for programmatic use.

## Contact for Translation

Aaron Kramer — aaron.patzalek@gmail.com
Two Birds Innovation, St. Thomas, Ontario

## Timeline

French translation is targeted for Q2 2026. Community partnerships with Franco-Ontarian organisations are being explored to fund professional translation.
