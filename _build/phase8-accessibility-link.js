/**
 * Phase 8 — inject accessibility link into footer of all 15 module files
 */
const fs   = require('fs');
const path = require('path');
const ROOT = 'C:/Users/getkr/brenda-digital-confidence';

const FILES = [
  'module-1.html','module-2.html','module-3.html','module-4.html',
  'module-5.html','module-6.html','module-7.html','module-8.html',
  'module-9.html','module-10.html','module-11.html','module-12.html',
  'module-13.html','module-14.html','module-15.html'
];

let ok = 0, skip = 0, errors = [];

FILES.forEach(function(file) {
  const fp = path.join(ROOT, file);
  if (!fs.existsSync(fp)) { errors.push('NOT FOUND: ' + file); return; }
  let html = fs.readFileSync(fp, 'utf8');
  if (html.includes('accessibility.html')) { skip++; console.log('SKIP: ' + file); return; }
  // Insert after privacy.html link
  html = html.replace(
    '<a href="privacy.html">Privacy Policy</a> |',
    '<a href="privacy.html">Privacy Policy</a> |\n            <a href="accessibility.html">Accessibility</a> |'
  );
  fs.writeFileSync(fp, html, 'utf8');
  ok++;
  console.log('OK: ' + file);
});

console.log('\nDone. Updated: ' + ok + ' | Skipped: ' + skip + ' | Errors: ' + errors.length);
if (errors.length) errors.forEach(e => console.error('  ERROR: ' + e));
