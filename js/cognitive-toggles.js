/* ============================================
   Cognitive Accessibility Toggles
   Phase 4C — Digital Confidence Centre
   --------------------------------------------
   Reading Guide   — localStorage key: dc-reading-guide
   Reduce Animations — localStorage key: dc-reduce-animations
   --------------------------------------------
   NOTE: These functions are also wired into
   js/accessibility.js which calls them on
   DOMContentLoaded. This file is a standalone
   reference / secondary entry point.
   ============================================ */

/* Reading Guide
   Adds class 'reading-guide' to <body>.
   CSS in css/accessibility.css highlights
   hovered paragraphs and list items in yellow.
*/
function setReadingGuide(isOn) {
  document.body.classList.toggle('reading-guide', isOn);
  localStorage.setItem('dc-reading-guide', isOn ? 'true' : 'false');
  var btn = document.querySelector('.reading-guide-btn');
  if (btn) {
    btn.classList.toggle('active', isOn);
    btn.setAttribute('aria-pressed', isOn ? 'true' : 'false');
  }
  if (typeof dcAnnounce === 'function') {
    dcAnnounce(isOn ? 'Reading guide on — hover over text to highlight it' : 'Reading guide off');
  }
}

/* Reduce Animations
   Adds class 'reduce-motion' to <body>.
   CSS in css/accessibility.css disables
   all transitions and animations.
*/
function setReduceAnimations(isOn) {
  document.body.classList.toggle('reduce-motion', isOn);
  localStorage.setItem('dc-reduce-animations', isOn ? 'true' : 'false');
  var btn = document.querySelector('.reduce-motion-btn');
  if (btn) {
    btn.classList.toggle('active', isOn);
    btn.setAttribute('aria-pressed', isOn ? 'true' : 'false');
  }
  if (typeof dcAnnounce === 'function') {
    dcAnnounce(isOn ? 'Animations reduced' : 'Animations restored');
  }
}

/* Apply saved preferences on load (early, before DOMContentLoaded) */
(function applyCognitivePrefs() {
  if (localStorage.getItem('dc-reading-guide') === 'true') {
    document.body.classList.add('reading-guide');
  }
  if (localStorage.getItem('dc-reduce-animations') === 'true') {
    document.body.classList.add('reduce-motion');
  }
})();
