/**
 * utils.js
 * Shared utility functions for the Digital Confidence Centre.
 * Load before other scripts that depend on these helpers.
 */

window.DCC = window.DCC || {};

/**
 * Safe localStorage wrapper — never throws, returns null on error.
 */
DCC.store = {
  get(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); return true; } catch { return false; }
  },
  remove(key) {
    try { localStorage.removeItem(key); return true; } catch { return false; }
  },
  getJSON(key) {
    try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
  },
  setJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
  }
};

/**
 * Get current language from localStorage or browser preference.
 * Returns 'en' or 'fr'.
 */
DCC.getLang = function() {
  const stored = DCC.store.get('dc-lang');
  if (stored === 'fr' || stored === 'en') return stored;
  return navigator.language && navigator.language.startsWith('fr') ? 'fr' : 'en';
};

/**
 * Detect if analytics consent has been given.
 */
DCC.hasAnalyticsConsent = function() {
  return DCC.store.get('analytics_consent') === 'true';
};

/**
 * Sanitise a string for safe display in innerHTML contexts.
 * Use for any user-supplied or external string placed into HTML.
 */
DCC.escapeHTML = function(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

/**
 * Debounce a function — delay execution until after wait ms have elapsed
 * since the last invocation.
 */
DCC.debounce = function(fn, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), wait);
  };
};

/**
 * Check if the current page is a module page and return the module number.
 * Returns null if not a module page.
 */
DCC.getCurrentModule = function() {
  const match = window.location.pathname.match(/module-(\d+)/);
  return match ? parseInt(match[1], 10) : null;
};

/**
 * Mark a module as complete in localStorage.
 */
DCC.markModuleComplete = function(moduleNum) {
  DCC.store.set('dc-module-' + moduleNum, 'complete');
};

/**
 * Check if a module is complete.
 */
DCC.isModuleComplete = function(moduleNum) {
  return DCC.store.get('dc-module-' + moduleNum) === 'complete';
};

/**
 * Log a non-critical error to localStorage for debugging.
 * Keeps the last 10 errors only.
 */
DCC.logError = function(context, message) {
  try {
    const log = DCC.store.getJSON('dc-error-log') || [];
    log.push({ t: Date.now(), ctx: context, msg: String(message) });
    if (log.length > 10) log.splice(0, log.length - 10);
    DCC.store.setJSON('dc-error-log', log);
  } catch { /* silent */ }
};
