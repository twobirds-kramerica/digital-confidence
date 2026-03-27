/**
 * Phase 7 — inject newsletter.js into all 15 module files
 */
const fs   = require('fs');
const path = require('path');
const ROOT = 'C:/Users/getkr/brenda-digital-confidence';

const MODULES = [
  'module-1.html','module-2.html','module-3.html','module-4.html',
  'module-5.html','module-6.html','module-7.html','module-8.html',
  'module-9.html','module-10.html','module-11.html','module-12.html',
  'module-13.html','module-14.html','module-15.html'
];

const SCRIPT_TAG = '  <script src="js/newsletter.js" defer></script>';

let ok = 0, skip = 0, errors = [];

MODULES.forEach(function(file) {
  const fp = path.join(ROOT, file);
  if (!fs.existsSync(fp)) { errors.push('NOT FOUND: ' + file); return; }
  let html = fs.readFileSync(fp, 'utf8');
  if (html.includes('newsletter.js')) { skip++; console.log('SKIP: ' + file); return; }
  if (!html.includes('</body>')) { errors.push('No </body>: ' + file); return; }
  html = html.replace('</body>', SCRIPT_TAG + '\n</body>');
  fs.writeFileSync(fp, html, 'utf8');
  ok++;
  console.log('OK: ' + file);
});

console.log('\nDone. Injected: ' + ok + ' | Skipped: ' + skip + ' | Errors: ' + errors.length);
if (errors.length) errors.forEach(e => console.error('  ERROR: ' + e));
