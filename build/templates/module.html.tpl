<!DOCTYPE html>
<html lang="en-CA" data-font-size="medium">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script>(function(){var t=localStorage.getItem('dc-theme');if(!t){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);})();</script>
  <meta name="description" content="{{MODULE_DESCRIPTION}}">
  <meta name="keywords" content="{{MODULE_KEYWORDS}}">
  <meta property="og:title" content="Module {{MODULE_NUMBER}}: {{MODULE_TITLE}} — {{PRODUCT_NAME}}">
  <meta property="og:description" content="{{MODULE_DESCRIPTION}}">
  <meta property="og:type" content="website">
  <link rel="canonical" href="{{BASE_URL}}/{{MODULE_SLUG}}.html">
  <title>Module {{MODULE_NUMBER}}: {{MODULE_TITLE}} — {{PRODUCT_NAME}}</title>
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="{{TOKENS_CSS}}">
  <link rel="stylesheet" href="css/tokens-dark.css">
  <link rel="stylesheet" href="css/fonts.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/module-enhance.css">
  <link rel="stylesheet" href="css/accessibility.css">
  <link rel="stylesheet" href="css/mobile.css">
  <link rel="stylesheet" href="css/print.css">
  <link rel="stylesheet" href="css/quiz-check.css">
  <meta name="author" content="{{PRODUCT_NAME}}">
  <meta name="robots" content="index, follow">
  <meta property="og:url" content="{{BASE_URL}}/{{MODULE_SLUG}}.html">
  <meta property="og:image" content="{{OG_IMAGE_DEFAULT}}">
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="{{BASE_URL}}/{{MODULE_SLUG}}.html">
  <meta property="twitter:title" content="Module {{MODULE_NUMBER}}: {{MODULE_TITLE}} | {{PRODUCT_NAME}}">
  <meta property="twitter:description" content="{{MODULE_DESCRIPTION}}">
  <meta property="twitter:image" content="{{OG_IMAGE_DEFAULT}}">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": "Module {{MODULE_NUMBER}}: {{MODULE_TITLE}}",
    "description": "{{MODULE_DESCRIPTION}}",
    "url": "{{BASE_URL}}/{{MODULE_SLUG}}.html",
    "educationalLevel": "Beginner",
    "learningResourceType": "Tutorial",
    "audience": { "@type": "Audience", "audienceType": "Senior adults" },
    "inLanguage": "en-CA",
    "isAccessibleForFree": true,
    "isPartOf": {
      "@type": "Course",
      "name": "{{PRODUCT_NAME}} — Senior Technology Training",
      "url": "{{BASE_URL}}/"
    }
  }
  </script>
  <script type="application/ld+json">
  {{SCHEMA_FAQ_JSON}}
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Module {{MODULE_NUMBER}}: {{MODULE_TITLE}}",
    "description": "{{MODULE_DESCRIPTION}}",
    "url": "{{BASE_URL}}/{{MODULE_SLUG}}.html",
    "datePublished": "{{DATE_PUBLISHED}}",
    "dateModified": "{{DATE_PUBLISHED}}",
    "author": {"@type": "Organization", "name": "{{PRODUCT_NAME}}"},
    "publisher": {"@type": "Organization", "name": "{{PRODUCT_NAME}}"},
    "inLanguage": "en-CA",
    "audience": {"@type": "Audience", "audienceType": "Seniors aged 70+"}
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "{{BASE_URL}}/"},
      {"@type": "ListItem", "position": 2, "name": "Module {{MODULE_NUMBER}}: {{MODULE_TITLE}}", "item": "{{BASE_URL}}/{{MODULE_SLUG}}.html"}
    ]
  }
  </script>
  <link rel="manifest" href="manifest.json">
  <meta name="theme-color" content="{{PRIMARY_COLOUR}}">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-mobile-web-app-title" content="Digital Confidence">
  {{ANALYTICS_BLOCK}}
  <link rel="icon" type="image/svg+xml" href="favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
  <script src="js/search-index.js" defer></script>
  <script src="js/search.js" defer></script>
  <script src="js/analytics-consent.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to main content</a>

  <div class="accessibility-bar" role="toolbar" aria-label="Accessibility controls">
    <button class="a11y-btn font-size-btn" data-size="small" aria-label="Small text" aria-pressed="false" style="font-size:0.8rem">A</button>
    <button class="a11y-btn font-size-btn" data-size="medium" aria-label="Medium text" aria-pressed="true" style="font-size:1rem">A</button>
    <button class="a11y-btn font-size-btn" data-size="large" aria-label="Large text" aria-pressed="false" style="font-size:1.2rem">A</button>
    <button class="a11y-btn font-size-btn" data-size="xl" aria-label="Extra large text" aria-pressed="false" style="font-size:1.4rem">A</button>
    <button class="a11y-btn theme-toggle-btn" aria-label="Switch to dark mode">🌓</button>
  </div>

  <div class="top-bar">
    <button class="menu-btn" aria-label="Open navigation menu">☰</button>
    <span class="site-title">Module {{MODULE_NUMBER}}: {{MODULE_TITLE}}</span>
    <span></span>
  </div>

  <div class="sidebar-overlay" aria-hidden="true"></div>

  <aside class="sidebar" aria-label="Main navigation">
    <button class="sidebar-close" aria-label="Close menu">Close ✕</button>
    <div class="sidebar-header">
      <h2>{{PRODUCT_NAME}}</h2>
      <p>Your learning journey</p>
    </div>
    <nav>
      <details class="snav-group" open>
        <summary class="snav-header">Get Started</summary>
        <a href="index.html"><span class="nav-icon">🏠</span><span class="nav-label">Home</span></a>
        <a href="digital-literacy-101.html"><span class="nav-icon">📖</span><span class="nav-label">Foundations</span></a>
        <a href="family-setup.html"><span class="nav-icon">👪</span><span class="nav-label">Set Up for a Loved One</span></a>
      </details>
      <details class="snav-group">
        <summary class="snav-header">Safety First</summary>
        <a href="module-1.html"><span class="nav-icon">🪂</span><span class="nav-label">1. The Escape Hatch</span></a>
        <a href="module-2.html"><span class="nav-icon">🛡️</span><span class="nav-label">2. Security Shield</span></a>
        <a href="module-2-5.html"><span class="nav-icon">📂</span><span class="nav-label">2.5 Everyday Tasks</span></a>
        <a href="module-3.html"><span class="nav-icon">🔑</span><span class="nav-label">3. Passwords</span></a>
        <a href="module-4.html"><span class="nav-icon">📱</span><span class="nav-label">4. App Store Safety</span></a>
        <a href="module-5.html"><span class="nav-icon">✉️</span><span class="nav-label">5. Email &amp; Messages</span></a>
        <a href="scam-simulator.html"><span class="nav-icon">🎯</span><span class="nav-label">Scam Simulator</span></a>
      </details>
      <details class="snav-group">
        <summary class="snav-header">Daily Life</summary>
        <a href="module-6.html"><span class="nav-icon">🏦</span><span class="nav-label">6. Banking</span></a>
        <a href="module-7.html"><span class="nav-icon">🎨</span><span class="nav-label">7. Photos &amp; Memories</span></a>
        <a href="module-8.html"><span class="nav-icon">👨‍👩‍👧</span><span class="nav-label">8. Stay Connected</span></a>
        <a href="module-9.html"><span class="nav-icon">🤖</span><span class="nav-label">9. Understanding AI</span></a>
        <a href="module-10.html"><span class="nav-icon">🛒</span><span class="nav-label">10. Grocery &amp; Delivery</span></a>
        <a href="module-11.html"><span class="nav-icon">🚗</span><span class="nav-label">11. Ride-Sharing</span></a>
        <a href="module-12.html"><span class="nav-icon">🤝</span><span class="nav-label">12. Getting Help</span></a>
        <a href="module-13.html"><span class="nav-icon">👥</span><span class="nav-label">13. Social Media</span></a>
        <a href="module-14.html"><span class="nav-icon">🏡</span><span class="nav-label">14. Smart Home</span></a>
        <a href="module-15.html"><span class="nav-icon">🏥</span><span class="nav-label">15. Telehealth</span></a>
        <a href="module-visual-ai.html"><span class="nav-icon">📷</span><span class="nav-label">Show Me! (Bonus)</span></a>
      </details>
      <details class="snav-group">
        <summary class="snav-header">Staying Independent</summary>
        <a href="module-16-travel-safety.html"><span class="nav-icon">✈️</span><span class="nav-label">16. Travel Safety</span></a>
        <a href="module-17-ai-research.html"><span class="nav-icon">🔍</span><span class="nav-label">17. AI Research</span></a>
        <a href="module-18-staying-connected.html"><span class="nav-icon">💞</span><span class="nav-label">18. Staying Connected</span></a>
        <a href="module-19-digital-legacy.html"><span class="nav-icon">🗂️</span><span class="nav-label">19. Your Digital Life</span></a>
        <a href="module-20-internet-plan.html"><span class="nav-icon">📶</span><span class="nav-label">20. Internet Plans</span></a>
        <a href="module-21-mobile-plan.html"><span class="nav-icon">📱</span><span class="nav-label">21. Mobile Plans</span></a>
        <a href="module-22-tv-home-phone.html"><span class="nav-icon">📺</span><span class="nav-label">22. TV &amp; Phone</span></a>
        <a href="module-23-online-marketplace.html"><span class="nav-icon">🛒</span><span class="nav-label">23. Marketplace</span></a>
        <a href="module-24-communication.html"><span class="nav-icon">💬</span><span class="nav-label">24. Communication</span></a>
        <a href="resources/living-alone.html"><span class="nav-icon">🏡</span><span class="nav-label">Living Alone Safely</span></a>
      </details>
      <details class="snav-group">
        <summary class="snav-header">Resources</summary>
        <a href="answers/"><span class="nav-icon">❓</span><span class="nav-label">Quick Answers</span></a>
        <a href="interactive/"><span class="nav-icon">🎯</span><span class="nav-label">Interactive Tools</span></a>
        <a href="tips/index.html"><span class="nav-icon">💡</span><span class="nav-label">Tips &amp; Updates</span></a>
        <a href="resources.html"><span class="nav-icon">📚</span><span class="nav-label">Resources</span></a>
        <a href="recommended-tools.html"><span class="nav-icon">⭐</span><span class="nav-label">Recommended Tools</span></a>
        <a href="print-centre.html"><span class="nav-icon">🖨️</span><span class="nav-label">Print Centre</span></a>
        <a href="family.html"><span class="nav-icon">💚</span><span class="nav-label">DCC Family</span></a>
        <a href="resources/support-directory.html"><span class="nav-icon">🆘</span><span class="nav-label">Get Help</span></a>
      </details>

      <div class="sidebar-a11y-section">
        <p class="sidebar-a11y-title">Text Size</p>
        <div class="sidebar-font-row">
          <button class="a11y-btn font-size-btn" data-size="small" aria-label="Small text" aria-pressed="false" style="font-size:0.8rem">A</button>
          <button class="a11y-btn font-size-btn" data-size="medium" aria-label="Medium text" aria-pressed="false" style="font-size:1rem">A</button>
          <button class="a11y-btn font-size-btn" data-size="large" aria-label="Large text" aria-pressed="false" style="font-size:1.2rem">A</button>
          <button class="a11y-btn font-size-btn" data-size="xl" aria-label="Extra large text" aria-pressed="false" style="font-size:1.4rem">A</button>
        </div>
        <p class="sidebar-a11y-title">Screen Colour</p>
        <div class="sidebar-theme-row">
          <button class="a11y-btn theme-toggle-btn" aria-label="Switch to dark mode">🌓</button>
        </div>
      </div>
    </nav>
  </aside>

  <div class="page-wrapper">
    <main class="main-content" id="main">

      <h1>Module {{MODULE_NUMBER}}: {{MODULE_TITLE}}</h1>
      <p><strong>What you will learn:</strong> {{MODULE_INTRO}}</p>
      <img class="module-hero-image" src="{{HERO_IMAGE_URL}}" alt="{{HERO_IMAGE_ALT}}" width="{{HERO_IMAGE_WIDTH}}" height="{{HERO_IMAGE_HEIGHT}}" loading="eager">

      <div class="wizard-cta-banner" role="note">
        <span class="wizard-cta-icon" aria-hidden="true">🪄</span>
        <p>Prefer to go one step at a time? <a href="v2/wizard.html?module={{MODULE_SLUG}}">Try the guided step-by-step version <span aria-hidden="true">→</span></a></p>
      </div>

      {{STORY_BLOCK_HTML}}

      <div class="confidence-check-box">
        <span class="check-icon">💪</span>
        <p>{{CONFIDENCE_CHECK}}</p>
        <p class="check-subtext">Take it one step at a time. There is no rush.</p>
      </div>

      {{SECTIONS_HTML}}

      {{QUIZ_HTML}}

      {{MODULE_NAV_HTML}}

    </main>
  </div>

  <script src="js/app.js" defer></script>
  <script src="js/accessibility.js" defer></script>
  <script src="js/cognitive-toggles.js" defer></script>
  <script src="js/quiz.js" defer></script>
  <script src="js/progress.js" defer></script>
  <script src="js/exit-safely.js" defer></script>
  <script src="js/read-aloud.js" defer></script>
  <script src="js/feedback-widget.js" defer></script>
</body>
</html>
