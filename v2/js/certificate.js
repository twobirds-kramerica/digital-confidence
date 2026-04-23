/* ============================================================================
   DCC v2 — Completion certificate (S-DCC-V2 Phase 5)
   ----------------------------------------------------------------------------
   Exposes window.dccCertificate.generate({moduleTitle, learnerName, language}).

   Design call: the sprint spec asked for jsPDF client-side PDF generation.
   Vendoring jsPDF (~200 KB) without running a real package-mirror process
   + the "no external CDNs" sovereignty rule pushed toward a simpler path:
   open a self-contained, printable HTML document in a new window, and
   let the user print to PDF via their browser's built-in Save-as-PDF
   feature. Works on every modern browser (desktop + mobile) with zero
   external dependencies and full offline support.

   Rationale documented here so future Claude instances see why this
   differs from the spec's jsPDF suggestion. If a true binary PDF is
   strictly needed later, vendor jsPDF into v2/vendor/jspdf/ and swap
   the generate() body. The function signature stays stable either way.

   White-label: the generated certificate respects
   CSS variable --client-logo-url from tokens (if set). Default shows
   "Digital Confidence Centre" text wordmark.
   ============================================================================ */

(function () {
  'use strict';

  if (window.dccCertificate && window.dccCertificate.generate) return;

  var I18N = {
    en: {
      header: 'Certificate of Completion',
      issuedTo: 'This is to certify that',
      nameAnonymous: 'Learner',
      hasCompleted: 'has successfully completed',
      dateLabel: 'Date completed',
      orgLine: 'Digital Confidence Centre',
      subtitle: 'Senior-friendly digital literacy for Ontario',
      printHint: 'Use your browser\'s Print button and choose "Save as PDF" to save this certificate.',
      printButton: 'Print / Save as PDF',
      closeButton: 'Close',
    },
    fr: {
      header: 'Certificat de Réussite',
      issuedTo: 'Nous certifions que',
      nameAnonymous: 'Apprenant(e)',
      hasCompleted: 'a complété avec succès',
      dateLabel: 'Date de complétion',
      orgLine: 'Centre de Confiance Numérique',
      subtitle: 'Littératie numérique adaptée aux aînés de l\'Ontario',
      printHint: 'Utilisez le bouton Imprimer de votre navigateur et choisissez « Enregistrer en PDF » pour sauvegarder ce certificat.',
      printButton: 'Imprimer / Enregistrer en PDF',
      closeButton: 'Fermer',
    },
  };

  function escapeHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatDate(lang) {
    try {
      var locale = lang === 'fr' ? 'fr-CA' : 'en-CA';
      return new Date().toLocaleDateString(locale, {
        year: 'numeric', month: 'long', day: 'numeric',
      });
    } catch (e) {
      return new Date().toISOString().substring(0, 10);
    }
  }

  /**
   * Build a complete standalone HTML certificate document (self-contained,
   * inlines all styles + fonts-from-root-path references).
   * @param {{moduleTitle:string, learnerName:string, language:string}} opts
   * @return {string}
   */
  function buildCertificateHtml(opts) {
    var lang = (opts && opts.language === 'fr') ? 'fr' : 'en';
    var dict = I18N[lang];
    var learner = (opts && opts.learnerName && opts.learnerName.trim()) || dict.nameAnonymous;
    var title = (opts && opts.moduleTitle) || 'Module';
    var date = formatDate(lang);

    var htmlLang = lang === 'fr' ? 'fr-CA' : 'en-CA';

    // Self-contained HTML — inline CSS so the certificate works as a
    // standalone printable document even if opened later outside v2/.
    return '<!DOCTYPE html>\n'
      + '<html lang="' + htmlLang + '">\n'
      + '<head>\n'
      + '<meta charset="UTF-8">\n'
      + '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
      + '<title>' + escapeHtml(dict.header) + ' — ' + escapeHtml(title) + '</title>\n'
      + '<style>\n'
      + '  @page { size: letter landscape; margin: 12mm; }\n'
      + '  * { box-sizing: border-box; }\n'
      + '  html, body { height: 100%; }\n'
      + '  body {\n'
      + '    margin: 0;\n'
      + '    font-family: "Merriweather", Georgia, serif;\n'
      + '    background: #FFF8F0;\n'
      + '    color: #3D3229;\n'
      + '    display: flex;\n'
      + '    flex-direction: column;\n'
      + '    min-height: 100vh;\n'
      + '  }\n'
      + '  .toolbar {\n'
      + '    display: flex;\n'
      + '    justify-content: center;\n'
      + '    gap: 16px;\n'
      + '    padding: 16px;\n'
      + '    background: #FFFFFF;\n'
      + '    border-bottom: 1px solid #E8DDD0;\n'
      + '  }\n'
      + '  .toolbar button {\n'
      + '    min-height: 56px;\n'
      + '    padding: 12px 24px;\n'
      + '    border-radius: 8px;\n'
      + '    border: 2px solid #E8842C;\n'
      + '    background: #E8842C;\n'
      + '    color: #FFFFFF;\n'
      + '    font-family: "Source Sans 3", sans-serif;\n'
      + '    font-size: 18px;\n'
      + '    font-weight: 600;\n'
      + '    cursor: pointer;\n'
      + '  }\n'
      + '  .toolbar button.ghost {\n'
      + '    background: transparent;\n'
      + '    color: #2A7B6F;\n'
      + '    border-color: #C9B9A5;\n'
      + '  }\n'
      + '  .toolbar button:focus-visible {\n'
      + '    outline: 3px solid #E8842C;\n'
      + '    outline-offset: 2px;\n'
      + '  }\n'
      + '  .cert-wrap {\n'
      + '    flex: 1 1 auto;\n'
      + '    display: flex;\n'
      + '    align-items: center;\n'
      + '    justify-content: center;\n'
      + '    padding: 24px;\n'
      + '  }\n'
      + '  .cert {\n'
      + '    width: 100%;\n'
      + '    max-width: 900px;\n'
      + '    aspect-ratio: 11 / 8.5;\n'
      + '    padding: 48px;\n'
      + '    background: #FFFFFF;\n'
      + '    border: 8px double #2A7B6F;\n'
      + '    border-radius: 8px;\n'
      + '    display: flex;\n'
      + '    flex-direction: column;\n'
      + '    align-items: center;\n'
      + '    justify-content: space-between;\n'
      + '    text-align: center;\n'
      + '    box-shadow: 0 4px 24px rgba(42, 123, 111, 0.12);\n'
      + '  }\n'
      + '  .cert-header {\n'
      + '    font-family: "Source Sans 3", sans-serif;\n'
      + '    font-size: 36px;\n'
      + '    font-weight: 700;\n'
      + '    color: #2A7B6F;\n'
      + '    letter-spacing: 0.02em;\n'
      + '    margin: 0 0 8px;\n'
      + '  }\n'
      + '  .cert-subtitle {\n'
      + '    font-size: 16px;\n'
      + '    color: #7A6E62;\n'
      + '    margin: 0;\n'
      + '  }\n'
      + '  .cert-logo {\n'
      + '    width: 140px;\n'
      + '    height: 140px;\n'
      + '    margin: 16px auto;\n'
      + '    background: var(--client-logo-url, url("../assets/logos/dcc/dcc-logo.svg")) no-repeat center;\n'
      + '    background-size: contain;\n'
      + '  }\n'
      + '  .cert-body p { margin: 8px 0; font-size: 20px; }\n'
      + '  .cert-learner {\n'
      + '    font-size: 36px;\n'
      + '    font-weight: 700;\n'
      + '    color: #2A7B6F;\n'
      + '    border-bottom: 2px solid #C9B9A5;\n'
      + '    padding-bottom: 8px;\n'
      + '    margin: 8px 40px;\n'
      + '  }\n'
      + '  .cert-module {\n'
      + '    font-size: 24px;\n'
      + '    font-weight: 600;\n'
      + '    color: #3D3229;\n'
      + '    margin: 16px 0;\n'
      + '  }\n'
      + '  .cert-footer {\n'
      + '    display: flex;\n'
      + '    justify-content: space-between;\n'
      + '    width: 100%;\n'
      + '    font-family: "Source Sans 3", sans-serif;\n'
      + '    font-size: 14px;\n'
      + '    color: #7A6E62;\n'
      + '    padding-top: 24px;\n'
      + '    border-top: 1px solid #E8DDD0;\n'
      + '  }\n'
      + '  .print-hint {\n'
      + '    text-align: center;\n'
      + '    font-size: 14px;\n'
      + '    color: #7A6E62;\n'
      + '    padding: 8px 24px 24px;\n'
      + '  }\n'
      + '  @media print {\n'
      + '    .toolbar, .print-hint { display: none; }\n'
      + '    body { background: #FFFFFF; }\n'
      + '    .cert { box-shadow: none; border-width: 6px; }\n'
      + '  }\n'
      + '</style>\n'
      + '</head>\n'
      + '<body>\n'
      + '<div class="toolbar">\n'
      + '  <button type="button" onclick="window.print()">' + escapeHtml(dict.printButton) + '</button>\n'
      + '  <button type="button" class="ghost" onclick="window.close()">' + escapeHtml(dict.closeButton) + '</button>\n'
      + '</div>\n'
      + '<p class="print-hint">' + escapeHtml(dict.printHint) + '</p>\n'
      + '<div class="cert-wrap">\n'
      + '  <article class="cert">\n'
      + '    <header>\n'
      + '      <p class="cert-header">' + escapeHtml(dict.header) + '</p>\n'
      + '      <p class="cert-subtitle">' + escapeHtml(dict.orgLine) + ' — ' + escapeHtml(dict.subtitle) + '</p>\n'
      + '      <div class="cert-logo" role="presentation" aria-hidden="true"></div>\n'
      + '    </header>\n'
      + '    <div class="cert-body">\n'
      + '      <p>' + escapeHtml(dict.issuedTo) + '</p>\n'
      + '      <p class="cert-learner">' + escapeHtml(learner) + '</p>\n'
      + '      <p>' + escapeHtml(dict.hasCompleted) + '</p>\n'
      + '      <p class="cert-module">' + escapeHtml(title) + '</p>\n'
      + '    </div>\n'
      + '    <footer class="cert-footer">\n'
      + '      <span>' + escapeHtml(dict.dateLabel) + ': ' + escapeHtml(date) + '</span>\n'
      + '      <span>' + escapeHtml(dict.orgLine) + '</span>\n'
      + '    </footer>\n'
      + '  </article>\n'
      + '</div>\n'
      + '</body>\n'
      + '</html>\n';
  }

  function generate(opts) {
    var html = buildCertificateHtml(opts || {});
    // Open in a new window so the original wizard state is preserved.
    // If popup-blocked, fall back to replacing current document via
    // data: URL (rare but handled).
    var w;
    try {
      w = window.open('', '_blank', 'noopener');
    } catch (e) { w = null; }

    if (w && w.document) {
      w.document.open();
      w.document.write(html);
      w.document.close();
      try { w.focus(); } catch (e) { /* ignore */ }
      return true;
    }

    // Popup blocked: use data: URL on a hidden anchor as fallback.
    try {
      var blob = new Blob([html], { type: 'text/html;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener';
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 4000);
      return true;
    } catch (e) {
      return false;
    }
  }

  window.dccCertificate = {
    generate: generate,
    // Exposed for testing / customisation.
    _buildHtml: buildCertificateHtml,
  };
})();
