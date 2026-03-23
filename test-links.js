/**
 * test-links.js — Internal Link Checker
 * Digital Confidence Centre
 *
 * Run with: node test-links.js
 *
 * Reads each HTML file, extracts all href values,
 * skips external URLs, anchors, and special protocols,
 * then checks whether the target file actually exists.
 */

const fs   = require('fs');
const path = require('path');

const ROOT = __dirname;

const htmlFiles = [
  'index.html', 'resources.html', 'faq.html', 'faq-fr.html',
  'final-quiz.html', 'whats-coming.html', 'digital-literacy-101.html',
  'scam-simulator.html', 'certificate.html', 'family-setup.html',
  'module-1.html', 'module-2.html', 'module-3.html', 'module-4.html',
  'module-5.html', 'module-6.html', 'module-7.html', 'module-8.html',
  'module-9.html', 'module-10.html', 'module-11.html',
  '404.html', 'privacy.html', 'terms.html', 'copyright.html'
];

/* ---- helpers ---- */
function extractHrefs(html) {
  const hrefs = [];
  const re = /href=["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    hrefs.push(m[1]);
  }
  return hrefs;
}

function shouldSkip(href) {
  if (href.startsWith('http://'))       return true;
  if (href.startsWith('https://'))      return true;
  if (href.startsWith('#'))             return true;
  if (href.startsWith('javascript:'))   return true;
  if (href.startsWith('mailto:'))       return true;
  if (href.startsWith('tel:'))          return true;
  return false;
}

/* ---- main ---- */
let pagesChecked  = 0;
let linksChecked  = 0;
const broken      = [];

for (const file of htmlFiles) {
  const filePath = path.join(ROOT, file);

  if (!fs.existsSync(filePath)) {
    console.log(`[SKIP]   ${file} — file does not exist in repo`);
    continue;
  }

  const html      = fs.readFileSync(filePath, 'utf8');
  const hrefs     = extractHrefs(html);
  const fileDir   = path.dirname(filePath);
  pagesChecked++;

  for (const href of hrefs) {
    if (shouldSkip(href)) continue;

    /* Strip query strings and fragments for file resolution */
    const cleanHref = href.split('?')[0].split('#')[0];
    if (!cleanHref) continue;

    const target = path.resolve(fileDir, cleanHref);
    linksChecked++;

    if (!fs.existsSync(target)) {
      broken.push({ source: file, href });
      console.log(`[BROKEN] ${file}  →  ${href}`);
    }
  }
}

/* ---- report ---- */
console.log('\n══════════════════════════════════════');
console.log('  LINK CHECK REPORT');
console.log('══════════════════════════════════════');
console.log(`  Pages checked : ${pagesChecked}`);
console.log(`  Links checked : ${linksChecked}`);
console.log(`  Broken links  : ${broken.length}`);
if (broken.length > 0) {
  console.log('\n  Broken links:');
  broken.forEach(b => console.log(`  - ${b.source}  →  ${b.href}`));
}
console.log('══════════════════════════════════════\n');

process.exit(broken.length > 0 ? 1 : 0);
