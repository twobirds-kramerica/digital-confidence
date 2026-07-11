<!DOCTYPE html>
<html lang="en-CA" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex,nofollow"><!-- v2 preview - remove before launch -->
  <script>
    // Theme + text size before first paint (no flash). Local only, no tracking.
    (function () {
      var t = null, s = null;
      try { t = localStorage.getItem("dccv2-theme"); s = localStorage.getItem("dccv2-text-size"); } catch (e) {}
      if (!t) t = (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", t);
      if (s) document.documentElement.classList.add("text-size-" + s);
    })();
  </script>
  <title>{{PAGE_TITLE}}</title>
  <meta name="description" content="{{META_DESCRIPTION}}">
  <link rel="icon" href="../favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="../css/tokens.css">
  <link rel="stylesheet" href="../css/core.css">
  <link rel="stylesheet" href="../css/print.css" media="print">
</head>
<body>

<a class="skip-link" href="#main">Skip to main content</a>

<!-- SHARED SHELL: header (generated from module-v2.html.tpl; identical on every page). -->
<header class="site-header">
  <div class="container">
    <a class="brand" href="../index.html">Digital Confidence Centre</a>
    <span class="secure-badge"><span aria-hidden="true">🔒</span> Secure connection</span>
    <button class="settings-toggle" type="button" data-settings-toggle aria-expanded="false" aria-controls="display-settings">
      <span aria-hidden="true">⚙</span> Display settings
    </button>
    <div class="header-tools" id="display-settings" hidden>
      <div class="text-size-group" role="group" aria-label="Text size">
        <span class="group-label" aria-hidden="true">Text size</span>
        <button class="ts-btn" type="button" data-text-size="s" aria-pressed="false" aria-label="Smaller text">A−</button>
        <button class="ts-btn" type="button" data-text-size="default" aria-pressed="true" aria-label="Standard text">A</button>
        <button class="ts-btn" type="button" data-text-size="l" aria-pressed="false" aria-label="Larger text">A+</button>
      </div>
      <div class="read-group" role="group" aria-label="Read this page aloud">
        <button class="theme-btn" type="button" data-read-aloud aria-pressed="false">🔊 Read aloud</button>
        <div class="rate-group" role="group" aria-label="Reading speed">
          <button class="ts-btn rate-btn" type="button" data-read-rate="slow" aria-pressed="false">Slower</button>
          <button class="ts-btn rate-btn" type="button" data-read-rate="normal" aria-pressed="true">Normal</button>
          <button class="ts-btn rate-btn" type="button" data-read-rate="fast" aria-pressed="false">Faster</button>
        </div>
      </div>
      <button class="theme-btn" type="button" data-theme-toggle aria-pressed="false">🌙 Dark mode</button>
    </div>
  </div>
</header>

<nav class="primary-nav" aria-label="Lesson sections">
  <div class="container">
{{PRIMARY_NAV_HTML}}
  </div>
</nav>

<nav class="breadcrumbs" aria-label="Breadcrumb">
  <div class="container">
{{BREADCRUMB_HTML}}
  </div>
</nav>

<main id="main">
  <div class="container">

    <a class="lesson-back" href="../index.html">← Back to all lessons</a>

    <p class="lesson-category"><span aria-hidden="true">{{CATEGORY_ICON}}</span> {{CATEGORY}}</p>
    <h1>{{MODULE_TITLE}}</h1>
    <p class="lesson-time"><span aria-hidden="true">⏱</span> {{LESSON_TIME}}</p>

    <!-- Brenda: the first thing a nervous reader sees removes a fear. -->
    <p class="reassurance"><span aria-hidden="true">✅</span> You are in a safe place. Nothing on this page can harm your device.</p>

    <p class="lead">{{LEAD}}</p>

{{BODY_HTML}}

    <!-- Denise: forward the lesson in isolation. Copy-link only, no share API. -->
    <section class="send-lesson" aria-labelledby="send-h">
      <h2 id="send-h">Send this lesson to someone</h2>
      <p>Helping a parent or friend? This page works on its own, with no account and nothing to install. Copy the link and text it to them.</p>
      <div class="send-row">
        <button class="btn btn-primary" type="button" data-copy-link>Copy the link to this lesson</button>
        <span class="send-done" data-copy-done hidden>Copied. Paste it into a text or email.</span>
      </div>
      <input class="visually-hidden" type="text" data-copy-field hidden readonly aria-label="Link to this lesson">
    </section>

{{SUCCESS_STATE_HTML}}

{{RELATED_HTML}}

  </div>
</main>

<!-- SHARED SHELL: footer (identical on every page). -->
<footer class="site-footer">
  <div class="container">
    <ul class="trust-row" aria-label="Our promises">
      <li><span aria-hidden="true">✓</span> No account</li>
      <li><span aria-hidden="true">✓</span> No tracking</li>
      <li><span aria-hidden="true">✓</span> Nothing to buy</li>
      <li><span aria-hidden="true">✓</span> Canadian</li>
    </ul>
    <p>Digital Confidence Centre is free to use, a community initiative by Two Birds Innovation, an Ontario company, to help Canadian seniors stay safe and connected online. No account, no tracking, no sales calls.</p>
    <p class="scope-note">Note: this site offers plain-language safety tips, not legal advice. If you suspect a scam, contact your bank directly.</p>
    <ul class="footer-links">
      <li><a href="../for-families.html">For families</a></li>
      <li><a href="../about.html">About us</a></li>
      <li><a href="../faq.html">FAQ</a></li>
      <li><a href="../glossary.html">Glossary</a></li>
      <li><a href="../privacy.html">Privacy</a></li>
      <li><a href="../terms.html">Terms</a></li>
      <li><a href="../disclaimer.html">Disclaimer</a></li>
      <li><a href="../support-directory.html">Get help</a></li>
    </ul>
  </div>
</footer>

<!-- SHARED SHELL: layered consent bar (identical on every page). -->
<div class="consent-bar" id="consent-bar" hidden role="region" aria-label="Privacy choices">
  <div class="container">
    <p>We use a small browser memory to keep the site working and remember your text size. <a href="../privacy.html">Read more</a>.</p>
    <div class="consent-actions">
      <button class="btn btn-primary" type="button" id="consent-accept">Accept</button>
      <button class="btn btn-secondary" type="button" id="consent-reject">Reject</button>
      <button class="btn-quiet" type="button" id="consent-prefs-toggle" aria-expanded="false" aria-controls="consent-prefs">Preferences</button>
    </div>
  </div>
  <div class="consent-prefs" id="consent-prefs" hidden>
    <div class="container">
      <label class="consent-option">
        <input type="checkbox" checked disabled>
        <span><span class="opt-name">Functional (always on)</span>
        <p>Keeps the site working and remembers your text size.</p></span>
      </label>
      <label class="consent-option">
        <input type="checkbox" id="consent-performance">
        <span><span class="opt-name">Performance</span>
        <p>Helps us see which lessons help most. It doesn't identify you.</p></span>
      </label>
      <label class="consent-option">
        <input type="checkbox" id="consent-marketing">
        <span><span class="opt-name">Marketing (optional)</span>
        <p>Helps us reach more seniors. We never sell your personal information.</p></span>
      </label>
      <button class="btn btn-primary" type="button" id="consent-save">Save my choices</button>
    </div>
  </div>
</div>

<script src="../js/dcc.js"></script>
<script src="../js/module.js"></script>
</body>
</html>
