const fs = require('fs');
const base = 'C:/Users/getkr/brenda-digital-confidence/tips/';

function makeTipPage({ slug, titleEn, titleFr, descEn, descFr, moduleLink, moduleName, datePublished, bodyEn, faq }) {
  const faqSchema = faq.map(q =>
    `      {"@type":"Question","name":${JSON.stringify(q.q)},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify(q.a)}}}`
  ).join(',\n');

  return `<!DOCTYPE html>
<html lang="en-CA" data-theme="light" data-font-size="medium">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${descEn}">
  <link rel="canonical" href="https://twobirds-kramerica.github.io/digital-confidence/tips/${slug}.html">
  <title>${titleEn} | Digital Confidence Centre</title>
  <link rel="stylesheet" href="../css/main.css">
  <link rel="stylesheet" href="../css/accessibility.css">
  <link rel="icon" type="image/svg+xml" href="../favicon.svg">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": ${JSON.stringify(titleEn)},
    "description": ${JSON.stringify(descEn)},
    "url": "https://twobirds-kramerica.github.io/digital-confidence/tips/${slug}.html",
    "author": {"@type": "Organization", "name": "Two Birds Innovation"},
    "publisher": {"@type": "Organization", "name": "Digital Confidence Centre"},
    "datePublished": "${datePublished}", "dateModified": "${datePublished}", "inLanguage": "en-CA"
  }
  <\/script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
${faqSchema}
    ]
  }
  <\/script>
</head>
<body>
  <a href="#main" class="skip-link">Skip to main content</a>
  <div class="page-wrapper">
    <main class="main-content" id="main" style="max-width:780px">

      <nav aria-label="Breadcrumb" class="breadcrumb" style="font-size:0.9rem;margin-bottom:1.5rem;color:#666">
        <a href="../index.html" data-en="Home" data-fr="Accueil">Home</a> ›
        <a href="index.html" data-en="Tips &amp; Updates" data-fr="Conseils et mises à jour">Tips &amp; Updates</a> ›
        <span data-en="${titleEn}" data-fr="${titleFr}">${titleEn}</span>
      </nav>

      <h1 data-en="${titleEn}" data-fr="${titleFr}">${titleEn}</h1>
      <p class="module-byline" data-en="By Two Birds Innovation · ${datePublished}" data-fr="Par Two Birds Innovation · ${datePublished}">By Two Birds Innovation · ${datePublished}</p>

${bodyEn}

      <div class="confidence-check-box" style="margin-top:2rem">
        <strong data-en="Want to learn more?" data-fr="Vous voulez en savoir plus ?">Want to learn more?</strong><br>
        <span data-en="${moduleName} goes deeper on this topic." data-fr="${moduleName} approfondit ce sujet.">${moduleName} goes deeper on this topic.</span>
        <br><a href="${moduleLink}" class="btn btn-primary" style="margin-top:0.75rem;display:inline-block" data-en="Go to module →" data-fr="Aller au module →">Go to module →</a>
        &nbsp;
        <a href="index.html" class="btn btn-secondary" style="margin-top:0.75rem;display:inline-block" data-en="All Tips →" data-fr="Tous les conseils →">All Tips →</a>
      </div>

    </main>
  </div>
  <script src="../js/lang-toggle.js" defer></script>
  <script src="../js/offline-banner.js" defer></script>
</body>
</html>`;
}

const tips = [
  {
    slug: 'spring-cleaning-your-apps',
    titleEn: 'Spring-Clean Your Apps',
    titleFr: 'Nettoyage printanier de vos applis',
    descEn: 'Old, unused apps can access your contacts, photos, and location without you realising. Here is how to delete them in 5 minutes.',
    descFr: 'Les anciennes applications inutilisées peuvent accéder à vos contacts, photos et localisation sans que vous le réalisiez.',
    moduleLink: '../module-4.html',
    moduleName: 'Module 4: App Store Safety',
    datePublished: 'March 2026',
    faq: [
      { q: 'Why should I delete old apps I no longer use?', a: 'Unused apps can still run in the background, use your storage, and — most importantly — retain permissions to access your contacts, photos, camera, or location. Deleting them removes that risk and speeds up your device.' },
      { q: 'How do I delete an app on iPhone or iPad?', a: 'Press and hold the app icon until a small menu appears. Tap "Remove App," then "Delete App." The app is gone along with its stored data. Your other apps and photos are not affected.' },
    ],
    bodyEn: `      <div class="geo-answer">
        <p data-en="Unused apps are like old keys on a keyring — most are harmless, but some still have access to your home. Here is how to clear them out:" data-fr="Les applications inutilisées sont comme de vieilles clés sur un porte-clés — la plupart sont inoffensives, mais certaines ont encore accès à votre maison. Voici comment les supprimer :">Unused apps are like old keys on a keyring — most are harmless, but some still have access to your home. Here is how to clear them out:</p>

        <h2 data-en="Why old apps are a risk" data-fr="Pourquoi les anciennes applications sont un risque">Why old apps are a risk</h2>
        <ul class="content-list">
          <li data-en="Old apps may still have permission to access your contacts, photos, camera, or location — even when you have not opened them in months" data-fr="Les anciennes applications peuvent toujours avoir la permission d'accéder à vos contacts, photos, appareil photo ou localisation — même si vous ne les avez pas ouvertes depuis des mois">Old apps may still have permission to access your contacts, photos, camera, or location — even when you have not opened them in months</li>
          <li data-en="Companies that made older apps sometimes sell to other owners — and your data may go with the sale" data-fr="Les entreprises qui ont créé d'anciennes applications les vendent parfois à d'autres propriétaires — et vos données peuvent partir avec la vente">Companies that made older apps sometimes sell to other owners — and your data may go with the sale</li>
          <li data-en="Unused apps take up storage space, which can slow down your device" data-fr="Les applications inutilisées occupent de l'espace de stockage, ce qui peut ralentir votre appareil">Unused apps take up storage space, which can slow down your device</li>
        </ul>

        <h2 data-en="How to delete an app (iPhone or iPad)" data-fr="Comment supprimer une application (iPhone ou iPad)">How to delete an app (iPhone or iPad)</h2>
        <ol class="content-list">
          <li data-en="Find the app icon on your home screen" data-fr="Trouvez l'icône de l'application sur votre écran d'accueil">Find the app icon on your home screen</li>
          <li data-en="Press and hold it until a small menu appears" data-fr="Appuyez dessus et maintenez jusqu'à ce qu'un petit menu apparaisse">Press and hold it until a small menu appears</li>
          <li data-en="Tap &quot;Remove App&quot;" data-fr="Appuyez sur « Supprimer l'application »">Tap "Remove App"</li>
          <li data-en="Tap &quot;Delete App&quot; to confirm" data-fr="Appuyez sur « Supprimer l'application » pour confirmer">Tap "Delete App" to confirm</li>
        </ol>

        <div class="tip-block">
          <span class="tip-label" data-en="Not sure which apps to delete?" data-fr="Vous ne savez pas quelles applications supprimer ?">Not sure which apps to delete?</span>
          <p data-en="Go to Settings → General → iPhone Storage (or iPad Storage). Scroll through the list — any app that shows &quot;Last Used&quot; more than 6 months ago is a good candidate for deletion." data-fr="Allez dans Réglages → Général → Stockage iPhone (ou iPad). Faites défiler la liste — toute application affichant « Dernière utilisation » il y a plus de 6 mois est une bonne candidate à la suppression.">Go to Settings → General → iPhone Storage (or iPad Storage). Scroll through the list — any app that shows "Last Used" more than 6 months ago is a good candidate for deletion.</p>
        </div>
      </div>`
  },
  {
    slug: 'spotting-a-fake-website',
    titleEn: 'Spotting a Fake Website',
    titleFr: 'Repérer un faux site Web',
    descEn: 'Three things to check before you enter any personal information on a website: the padlock, the web address, and your instincts.',
    descFr: 'Trois choses à vérifier avant de saisir des informations personnelles sur un site Web.',
    moduleLink: '../module-5.html',
    moduleName: 'Module 5: Email & Messages',
    datePublished: 'March 2026',
    faq: [
      { q: 'What does the padlock symbol mean on a website?', a: 'The padlock (🔒) in your browser address bar means the connection between your device and the website is encrypted — your information is scrambled so others cannot read it. Always look for the padlock before entering a password or payment details.' },
      { q: 'How do I know if a website address is real?', a: 'Look at the main domain — the part just before .com or .ca. A real RBC website is at rbc.com. A fake one might be at rbc-security.com or rbc.login-verify.info — the part after "rbc" is the giveaway. Real companies own their own domain directly.' },
    ],
    bodyEn: `      <div class="geo-answer">
        <p data-en="Criminals create fake websites that look almost identical to real banks, government sites, and stores. Here are three quick checks that take less than 10 seconds each:" data-fr="Les criminels créent de faux sites Web qui ressemblent presque identiquement à de vraies banques, sites gouvernementaux et magasins. Voici trois vérifications rapides qui prennent chacune moins de 10 secondes :">Criminals create fake websites that look almost identical to real banks, government sites, and stores. Here are three quick checks that take less than 10 seconds each:</p>

        <h2 data-en="Check 1: The padlock" data-fr="Vérification 1 : Le cadenas">Check 1: The padlock</h2>
        <p data-en="Look for a padlock symbol (🔒) at the start of the address bar at the top of your browser. If the padlock is there, the connection is encrypted — your information cannot be read by others on the same network." data-fr="Cherchez un symbole de cadenas (🔒) au début de la barre d'adresse en haut de votre navigateur. Si le cadenas est là, la connexion est chiffrée.">Look for a padlock symbol (🔒) at the start of the address bar at the top of your browser. If the padlock is there, the connection is encrypted — your information cannot be read by others on the same network.</p>
        <p data-en="No padlock? Leave immediately. Do not enter any information." data-fr="Pas de cadenas ? Partez immédiatement. Ne saisissez aucune information.">No padlock? Leave immediately. Do not enter any information.</p>

        <h2 data-en="Check 2: The web address" data-fr="Vérification 2 : L'adresse Web">Check 2: The web address</h2>
        <p data-en="Read the address in the address bar carefully. The real name of the website is the part just before .com or .ca. For example:" data-fr="Lisez attentivement l'adresse dans la barre d'adresse. Le vrai nom du site est la partie juste avant .com ou .ca.">Read the address in the address bar carefully. The real name of the website is the part just before .com or .ca. For example:</p>
        <ul class="content-list">
          <li data-en="✅ rbc.com — real" data-fr="✅ rbc.com — réel">✅ rbc.com — real</li>
          <li data-en="❌ rbc-alert.info — fake" data-fr="❌ rbc-alert.info — faux">❌ rbc-alert.info — fake</li>
          <li data-en="❌ secure-rbc.com — fake" data-fr="❌ secure-rbc.com — faux">❌ secure-rbc.com — fake</li>
        </ul>

        <h2 data-en="Check 3: Your instincts" data-fr="Vérification 3 : Votre instinct">Check 3: Your instincts</h2>
        <p data-en="If something feels off — unusual spelling, odd layout, prices that seem too good to be true — trust that feeling and leave. Search the website name plus the word &quot;scam&quot; on Google." data-fr="Si quelque chose vous semble étrange — orthographe inhabituelle, mise en page bizarre, prix trop beaux pour être vrais — faites confiance à ce sentiment et partez.">If something feels off — unusual spelling, odd layout, prices that seem too good to be true — trust that feeling and leave. Search the website name plus the word "scam" on Google.</p>

        <div class="tip-block">
          <span class="tip-label" data-en="Never follow a link to log in" data-fr="Ne suivez jamais un lien pour vous connecter">Never follow a link to log in</span>
          <p data-en="If you receive an email or text saying your account needs attention, do not click any link. Open a fresh browser tab and type the bank or company address yourself. This guarantees you are on the real website." data-fr="Si vous recevez un courriel ou un SMS disant que votre compte a besoin d'attention, ne cliquez sur aucun lien. Ouvrez un nouvel onglet de navigateur et tapez vous-même l'adresse de la banque ou de l'entreprise.">If you receive an email or text saying your account needs attention, do not click any link. Open a fresh browser tab and type the bank or company address yourself. This guarantees you are on the real website.</p>
        </div>
      </div>`
  },
  {
    slug: 'how-to-set-up-autodeposit',
    titleEn: 'How to Set Up Autodeposit for e-Transfer',
    titleFr: 'Comment configurer le dépôt automatique pour le virement',
    descEn: 'Autodeposit sends incoming e-transfers directly to your bank account with no security question — safer and more convenient.',
    descFr: 'Le dépôt automatique envoie les virements directement à votre compte bancaire sans question de sécurité.',
    moduleLink: '../module-6.html',
    moduleName: 'Module 6: Banking & Transactions',
    datePublished: 'March 2026',
    faq: [
      { q: 'What is Autodeposit for Interac e-Transfer?', a: 'Autodeposit is a feature that links your email address or phone number directly to your bank account. When someone sends you an e-transfer, the money is deposited automatically without you needing to answer a security question. It is actually more secure than the security question method.' },
      { q: 'Is Autodeposit safe?', a: 'Yes — Autodeposit is safer than using a security question because there is no secret answer for a scammer to steal over the phone. Once set up, transfers go directly to your account. Your bank verifies the deposit automatically.' },
    ],
    bodyEn: `      <div class="geo-answer">
        <p data-en="Autodeposit is one of the simplest security upgrades you can make to protect your e-transfer money. Here is what it is and how to set it up:" data-fr="Le dépôt automatique est l'une des améliorations de sécurité les plus simples que vous puissiez apporter pour protéger votre argent de virement électronique. Voici ce que c'est et comment le configurer :">Autodeposit is one of the simplest security upgrades you can make to protect your e-transfer money. Here is what it is and how to set it up:</p>

        <h2 data-en="What is Autodeposit?" data-fr="Qu'est-ce que le dépôt automatique ?">What is Autodeposit?</h2>
        <p data-en="Normally, when someone sends you an Interac e-transfer, you have to answer a security question to accept it. With Autodeposit turned on, the money goes straight to your account without a security question — faster and safer." data-fr="Normalement, lorsque quelqu'un vous envoie un virement Interac, vous devez répondre à une question de sécurité pour l'accepter. Avec le dépôt automatique activé, l'argent va directement dans votre compte sans question de sécurité.">Normally, when someone sends you an Interac e-transfer, you have to answer a security question to accept it. With Autodeposit turned on, the money goes straight to your account without a security question — faster and safer.</p>

        <h2 data-en="How to set up Autodeposit" data-fr="Comment configurer le dépôt automatique">How to set up Autodeposit</h2>
        <p data-en="The exact steps vary by bank, but the path is similar at all major Canadian banks:" data-fr="Les étapes exactes varient selon la banque, mais le chemin est similaire dans toutes les grandes banques canadiennes :">The exact steps vary by bank, but the path is similar at all major Canadian banks:</p>
        <ol class="content-list">
          <li data-en="Open your bank app (TD, RBC, BMO, Scotiabank, CIBC, or your credit union app)" data-fr="Ouvrez votre application bancaire (TD, RBC, BMO, Scotiabank, CIBC ou votre application de caisse populaire)">Open your bank app (TD, RBC, BMO, Scotiabank, CIBC, or your credit union app)</li>
          <li data-en="Find the Interac e-Transfer section (usually under Transfers or Payments)" data-fr="Trouvez la section Virement Interac (généralement sous Virements ou Paiements)">Find the Interac e-Transfer section (usually under Transfers or Payments)</li>
          <li data-en="Look for Autodeposit settings or a Registration option" data-fr="Cherchez les paramètres de dépôt automatique ou une option d'inscription">Look for Autodeposit settings or a Registration option</li>
          <li data-en="Register your email address or phone number — this is the address people will send transfers to" data-fr="Enregistrez votre adresse courriel ou votre numéro de téléphone — c'est l'adresse à laquelle les gens enverront les virements">Register your email address or phone number — this is the address people will send transfers to</li>
          <li data-en="Confirm via a verification email your bank sends you" data-fr="Confirmez via un courriel de vérification que votre banque vous envoie">Confirm via a verification email your bank sends you</li>
        </ol>

        <div class="tip-block">
          <span class="tip-label" data-en="Not comfortable setting this up yourself?" data-fr="Pas à l'aise pour le configurer vous-même ?">Not comfortable setting this up yourself?</span>
          <p data-en="Visit your bank branch and ask a teller to help you set up Autodeposit. It takes about 5 minutes and they will walk you through it step by step." data-fr="Rendez-vous à votre succursale bancaire et demandez à un caissier de vous aider à configurer le dépôt automatique. Cela prend environ 5 minutes et ils vous guideront étape par étape.">Visit your bank branch and ask a teller to help you set up Autodeposit. It takes about 5 minutes and they will walk you through it step by step.</p>
        </div>
      </div>`
  },
  {
    slug: 'five-things-never-share-online',
    titleEn: '5 Things You Should Never Share Online',
    titleFr: '5 choses à ne jamais partager en ligne',
    descEn: 'Your SIN, banking details, health card number, passwords, and full address should never be shared online or over the phone with strangers.',
    descFr: 'Votre NAS, coordonnées bancaires, numéro de carte santé, mots de passe et adresse complète ne doivent jamais être partagés en ligne.',
    moduleLink: '../module-2.html',
    moduleName: 'Module 2: The Security Shield',
    datePublished: 'March 2026',
    faq: [
      { q: 'What personal information should I never share online?', a: 'Never share your Social Insurance Number (SIN), banking passwords or PINs, credit card full number + CVV + expiry date together, Ontario health card number, and your full home address with exact postal code on public social media. These five items are the keys to your identity and financial life.' },
      { q: 'If a government website asks for my SIN, is that safe?', a: 'Government websites (those ending in .gc.ca) do sometimes require your SIN for tax filing or benefit applications. Check the web address carefully — it must end in .gc.ca, not any other domain. Never provide your SIN in response to an email or phone call you did not initiate.' },
    ],
    bodyEn: `      <div class="geo-answer">
        <p data-en="Some information, once in the wrong hands, gives criminals everything they need to steal your identity or empty your accounts. These five items should stay private:" data-fr="Certaines informations, une fois entre de mauvaises mains, donnent aux criminels tout ce dont ils ont besoin pour voler votre identité ou vider vos comptes. Ces cinq éléments doivent rester privés :">Some information, once in the wrong hands, gives criminals everything they need to steal your identity or empty your accounts. These five items should stay private:</p>

        <h2 data-en="Never share these 5 things" data-fr="Ne partagez jamais ces 5 choses">Never share these 5 things</h2>
        <ul class="content-list">
          <li data-en="🔴 Your Social Insurance Number (SIN) — this is the key to your entire financial identity in Canada. Only share it with your employer for payroll, your bank when opening an account, or official government portals ending in .gc.ca" data-fr="🔴 Votre numéro d'assurance sociale (NAS) — c'est la clé de toute votre identité financière au Canada. Ne le partagez qu'avec votre employeur pour la paie, votre banque lors de l'ouverture d'un compte, ou les portails gouvernementaux officiels se terminant par .gc.ca">🔴 Your Social Insurance Number (SIN) — this is the key to your entire financial identity in Canada. Only share it with your employer for payroll, your bank when opening an account, or official government portals ending in .gc.ca</li>
          <li data-en="🔴 Your banking passwords and PINs — no bank, CRA agent, or tech support person will ever legitimately ask you for these. Ever." data-fr="🔴 Vos mots de passe bancaires et NIP — aucune banque, agent de l'ARC ou technicien d'assistance ne vous demandera jamais légitimement ces informations. Jamais.">🔴 Your banking passwords and PINs — no bank, CRA agent, or tech support person will ever legitimately ask you for these. Ever.</li>
          <li data-en="🔴 Your full credit card details (number + expiry + CVV together) — only enter these on websites you navigated to yourself, with a padlock in the address bar" data-fr="🔴 Vos coordonnées complètes de carte de crédit (numéro + date d'expiration + CVV ensemble) — ne les saisissez que sur les sites Web auxquels vous avez accédé vous-même, avec un cadenas dans la barre d'adresse">🔴 Your full credit card details (number + expiry + CVV together) — only enter these on websites you navigated to yourself, with a padlock in the address bar</li>
          <li data-en="🔴 Your Ontario health card number — this is used for identity fraud. Only share it with a healthcare provider in person" data-fr="🔴 Votre numéro de carte Santé de l'Ontario — il est utilisé pour la fraude d'identité. Ne le partagez qu'avec un prestataire de soins de santé en personne">🔴 Your Ontario health card number — this is used for identity fraud. Only share it with a healthcare provider in person</li>
          <li data-en="🔴 Your full home address with postal code on public social media — this helps criminals know when you are away from home and where to find you" data-fr="🔴 Votre adresse complète avec code postal sur les réseaux sociaux publics — cela aide les criminels à savoir quand vous êtes absent de chez vous et où vous trouver">🔴 Your full home address with postal code on public social media — this helps criminals know when you are away from home and where to find you</li>
        </ul>

        <div class="tip-block">
          <span class="tip-label" data-en="The emergency exception" data-fr="L'exception d'urgence">The emergency exception</span>
          <p data-en="In a genuine 911 emergency, you will give your address to the dispatcher. That is the right thing to do. The rule above is about protecting yourself from scammers, not about preventing you from getting help when you truly need it." data-fr="Dans une véritable urgence au 911, vous donnerez votre adresse au répartiteur. C'est la bonne chose à faire. La règle ci-dessus concerne la protection contre les arnaqueurs, pas pour vous empêcher d'obtenir de l'aide quand vous en avez vraiment besoin.">In a genuine 911 emergency, you will give your address to the dispatcher. That is the right thing to do. The rule above is about protecting yourself from scammers, not about preventing you from getting help when you truly need it.</p>
        </div>
      </div>`
  },
  {
    slug: 'understanding-two-factor-authentication',
    titleEn: 'What Is Two-Factor Authentication?',
    titleFr: "Qu'est-ce que l'authentification à deux facteurs ?",
    descEn: 'Two-factor authentication (2FA) adds a second lock to your accounts — even if a criminal steals your password, they still cannot get in.',
    descFr: "L'authentification à deux facteurs (2FA) ajoute un deuxième verrou à vos comptes.",
    moduleLink: '../module-3.html',
    moduleName: 'Module 3: Passwords & Biometrics',
    datePublished: 'March 2026',
    faq: [
      { q: 'What is two-factor authentication (2FA)?', a: 'Two-factor authentication is a security feature that requires two separate proofs of identity before letting you into an account. Usually this means your password plus a code sent to your phone by text message. Even if someone steals your password, they cannot log in without also having your phone.' },
      { q: 'How do I turn on two-factor authentication?', a: 'For your Apple ID: go to Settings > your name > Password & Security > Two-Factor Authentication. For your bank account: log in to your online banking and look for Security Settings or Two-Step Verification. For email: go to your email provider security settings and look for 2-Step Verification.' },
    ],
    bodyEn: `      <div class="geo-answer">
        <p data-en="Imagine your account has a door with two locks. A criminal might pick the first lock (your password) — but they still cannot open the door without the second lock. That is what two-factor authentication (2FA) does." data-fr="Imaginez que votre compte a une porte avec deux verrous. Un criminel pourrait crocheter le premier verrou (votre mot de passe) — mais il ne peut toujours pas ouvrir la porte sans le deuxième verrou. C'est ce que fait l'authentification à deux facteurs (2FA).">Imagine your account has a door with two locks. A criminal might pick the first lock (your password) — but they still cannot open the door without the second lock. That is what two-factor authentication (2FA) does.</p>

        <h2 data-en="How it works" data-fr="Comment ça fonctionne">How it works</h2>
        <ol class="content-list">
          <li data-en="You enter your password as usual" data-fr="Vous entrez votre mot de passe comme d'habitude">You enter your password as usual</li>
          <li data-en="The website or app sends a 6-digit code to your phone by text message" data-fr="Le site Web ou l'application envoie un code à 6 chiffres sur votre téléphone par SMS">The website or app sends a 6-digit code to your phone by text message</li>
          <li data-en="You enter that code on the screen" data-fr="Vous entrez ce code à l'écran">You enter that code on the screen</li>
          <li data-en="You are logged in — and a criminal with just your password cannot get through" data-fr="Vous êtes connecté — et un criminel qui n'a que votre mot de passe ne peut pas entrer">You are logged in — and a criminal with just your password cannot get through</li>
        </ol>

        <h2 data-en="Where to turn it on" data-fr="Où l'activer">Where to turn it on</h2>
        <ul class="content-list">
          <li data-en="Apple ID: Settings → your name → Password &amp; Security → Two-Factor Authentication" data-fr="Identifiant Apple : Réglages → votre nom → Mot de passe et sécurité → Authentification à deux facteurs">Apple ID: Settings → your name → Password &amp; Security → Two-Factor Authentication</li>
          <li data-en="Online banking: Log in → Security Settings → Two-Step Verification (name varies by bank)" data-fr="Services bancaires en ligne : Connexion → Paramètres de sécurité → Vérification en deux étapes (le nom varie selon la banque)">Online banking: Log in → Security Settings → Two-Step Verification (name varies by bank)</li>
          <li data-en="Gmail or other email: Account Settings → Security → 2-Step Verification" data-fr="Gmail ou autre courriel : Paramètres du compte → Sécurité → Validation en deux étapes">Gmail or other email: Account Settings → Security → 2-Step Verification</li>
        </ul>

        <div class="tip-block">
          <span class="tip-label" data-en="Important: never share the code" data-fr="Important : ne partagez jamais le code">Important: never share the code</span>
          <p data-en="If you receive a 2FA code by text that you did NOT request — do not share it with anyone. A scammer calling and asking you to read them the code is trying to hijack your account. Your real bank will never ask for this code over the phone." data-fr="Si vous recevez un code 2FA par SMS que vous n'avez PAS demandé — ne le partagez avec personne. Un escroc qui vous appelle et vous demande de lui lire le code tente de pirater votre compte. Votre vraie banque ne demandera jamais ce code par téléphone.">If you receive a 2FA code by text that you did NOT request — do not share it with anyone. A scammer calling and asking you to read them the code is trying to hijack your account. Your real bank will never ask for this code over the phone.</p>
        </div>
      </div>`
  },
  {
    slug: 'what-to-do-before-you-travel',
    titleEn: 'Tech Checklist Before You Travel',
    titleFr: 'Liste de contrôle technique avant de voyager',
    descEn: 'A quick 5-step checklist to protect your phone and data before any trip — whether you are going to Florida or visiting family across town.',
    descFr: 'Une liste de contrôle en 5 étapes pour protéger votre téléphone et vos données avant tout voyage.',
    moduleLink: '../module-16-travel-safety.html',
    moduleName: 'Module 16: Travel Safety',
    datePublished: 'March 2026',
    faq: [
      { q: 'What should I do with my phone before travelling?', a: 'Five things: back up your phone to iCloud, turn on Find My iPhone, enable your roaming plan with your carrier, write down your carrier customer service number on paper, and screenshot important documents (boarding pass, hotel confirmation). These five steps take about 10 minutes and protect you against loss, theft, or disconnection.' },
      { q: 'Should I use public Wi-Fi at airports and hotels when travelling?', a: 'Avoid it for anything sensitive. Public Wi-Fi is not secure — others on the same network can potentially see what you are doing. Use your mobile data plan for banking or email. If you must use hotel Wi-Fi, stick to general browsing and do not log into any financial accounts.' },
    ],
    bodyEn: `      <div class="geo-answer">
        <p data-en="Before any trip — even a short one — take 10 minutes to run through this checklist. It protects your phone and your information if anything goes wrong while you are away:" data-fr="Avant tout voyage — même court — prenez 10 minutes pour parcourir cette liste de contrôle. Elle protège votre téléphone et vos informations si quelque chose tourne mal pendant votre absence :">Before any trip — even a short one — take 10 minutes to run through this checklist. It protects your phone and your information if anything goes wrong while you are away:</p>

        <h2 data-en="5-step travel tech checklist" data-fr="Liste de contrôle technique en 5 étapes pour voyager">5-step travel tech checklist</h2>
        <ol class="content-list">
          <li data-en="Back up your iPhone or iPad to iCloud (Settings → your name → iCloud → iCloud Backup → Back Up Now). This saves all your photos, contacts, and settings in case your device is lost or stolen." data-fr="Sauvegardez votre iPhone ou iPad sur iCloud (Réglages → votre nom → iCloud → Sauvegarde iCloud → Sauvegarder maintenant).">Back up your iPhone or iPad to iCloud (Settings → your name → iCloud → iCloud Backup → Back Up Now). This saves all your photos, contacts, and settings in case your device is lost or stolen.</li>
          <li data-en="Confirm Find My is turned on (Settings → your name → Find My → Find My iPhone → On). This lets you locate, lock, or erase your device remotely if it goes missing." data-fr="Confirmez que Localiser est activé (Réglages → votre nom → Localiser → Localiser mon iPhone → Activé).">Confirm Find My is turned on (Settings → your name → Find My → Find My iPhone → On). This lets you locate, lock, or erase your device remotely if it goes missing.</li>
          <li data-en="Call your carrier (Rogers, Bell, Telus, or your provider) to ask about roaming plans if you are travelling outside Canada. Roaming charges can be very high without a plan." data-fr="Appelez votre opérateur (Rogers, Bell, Telus ou votre fournisseur) pour vous renseigner sur les forfaits itinérance si vous voyagez hors du Canada.">Call your carrier (Rogers, Bell, Telus, or your provider) to ask about roaming plans if you are travelling outside Canada. Roaming charges can be very high without a plan.</li>
          <li data-en="Write down your carrier's customer service number on paper and keep it in your wallet. If your phone is stolen, you will not be able to look it up on the device." data-fr="Notez le numéro du service client de votre opérateur sur papier et gardez-le dans votre portefeuille.">Write down your carrier's customer service number on paper and keep it in your wallet. If your phone is stolen, you will not be able to look it up on the device.</li>
          <li data-en="Take a screenshot of your boarding pass, hotel confirmation, and travel insurance policy. Save these to your camera roll so they are accessible without internet." data-fr="Faites une capture d'écran de votre carte d'embarquement, de la confirmation d'hôtel et de la police d'assurance voyage.">Take a screenshot of your boarding pass, hotel confirmation, and travel insurance policy. Save these to your camera roll so they are accessible without internet.</li>
        </ol>

        <div class="tip-block">
          <span class="tip-label" data-en="Avoid public Wi-Fi for sensitive tasks" data-fr="Évitez le Wi-Fi public pour les tâches sensibles">Avoid public Wi-Fi for sensitive tasks</span>
          <p data-en="Public Wi-Fi at airports and hotels is not secure. Use your mobile data plan for banking, email, and anything with a password. For general browsing (maps, news), public Wi-Fi is usually fine." data-fr="Le Wi-Fi public dans les aéroports et les hôtels n'est pas sécurisé. Utilisez votre forfait de données mobiles pour les opérations bancaires, le courriel et tout ce qui nécessite un mot de passe.">Public Wi-Fi at airports and hotels is not secure. Use your mobile data plan for banking, email, and anything with a password. For general browsing (maps, news), public Wi-Fi is usually fine.</p>
        </div>
      </div>`
  },
  {
    slug: 'how-to-avoid-marketplace-scams',
    titleEn: 'Avoiding Facebook Marketplace Scams',
    titleFr: 'Éviter les arnaques sur Facebook Marketplace',
    descEn: 'Practical rules for buying and selling on Facebook Marketplace safely — including the one rule that prevents most fraud.',
    descFr: 'Règles pratiques pour acheter et vendre en toute sécurité sur Facebook Marketplace.',
    moduleLink: '../module-2.html',
    moduleName: 'Module 2: The Security Shield',
    datePublished: 'March 2026',
    faq: [
      { q: 'Is Facebook Marketplace safe to use?', a: 'Facebook Marketplace can be safe if you follow a few rules: only meet in public places, accept cash or PayPal (never e-transfer before meeting), and never ship an item before payment is confirmed in your account. Most scams on Marketplace happen when one person trusts the other before the transaction is complete.' },
      { q: 'What is the fake e-transfer scam on Facebook Marketplace?', a: 'A buyer agrees to buy your item and sends a fake e-transfer notification email. The email looks real but the money never arrives in your account. They pressure you to ship first before checking your actual bank account. Always verify the money appears in your real bank account before releasing any item.' },
    ],
    bodyEn: `      <div class="geo-answer">
        <p data-en="Facebook Marketplace is a popular way to buy and sell locally in Ontario — but it is also used by scammers. These simple rules protect you from the most common fraud:" data-fr="Facebook Marketplace est un moyen populaire d'acheter et de vendre localement en Ontario — mais il est aussi utilisé par des escrocs. Ces règles simples vous protègent des fraudes les plus courantes :">Facebook Marketplace is a popular way to buy and sell locally in Ontario — but it is also used by scammers. These simple rules protect you from the most common fraud:</p>

        <h2 data-en="Rules for selling" data-fr="Règles pour vendre">Rules for selling</h2>
        <ul class="content-list">
          <li data-en="Meet in a public place — a coffee shop parking lot, a police station lobby, or a busy shopping mall. Never invite strangers to your home." data-fr="Rencontrez-vous dans un endroit public — un parking de café, le hall d'un poste de police ou un centre commercial animé. N'invitez jamais des inconnus chez vous.">Meet in a public place — a coffee shop parking lot, a police station lobby, or a busy shopping mall. Never invite strangers to your home.</li>
          <li data-en="Accept cash or PayPal only for small transactions. Never accept e-transfer before the buyer has the item in their hands — fake e-transfer notifications are one of the most common Marketplace scams." data-fr="Acceptez uniquement les espèces ou PayPal pour les petites transactions. N'acceptez jamais un virement électronique avant que l'acheteur n'ait l'article en main.">Accept cash or PayPal only for small transactions. Never accept e-transfer before the buyer has the item in their hands — fake e-transfer notifications are one of the most common Marketplace scams.</li>
          <li data-en="Never ship an item before payment is confirmed in your actual bank account — not just in an email notification." data-fr="N'expédiez jamais un article avant que le paiement soit confirmé dans votre vrai compte bancaire — pas seulement dans une notification par courriel.">Never ship an item before payment is confirmed in your actual bank account — not just in an email notification.</li>
        </ul>

        <h2 data-en="Rules for buying" data-fr="Règles pour acheter">Rules for buying</h2>
        <ul class="content-list">
          <li data-en="If the price is dramatically below market value, it is likely a scam or stolen goods. Research what similar items sell for before buying." data-fr="Si le prix est nettement inférieur à la valeur marchande, il s'agit probablement d'une arnaque ou de marchandises volées. Renseignez-vous sur le prix de vente d'articles similaires avant d'acheter.">If the price is dramatically below market value, it is likely a scam or stolen goods. Research what similar items sell for before buying.</li>
          <li data-en="Never send money in advance for an item you have not seen — even if the seller has good reviews. The item may not exist." data-fr="N'envoyez jamais d'argent à l'avance pour un article que vous n'avez pas vu — même si le vendeur a de bonnes évaluations.">Never send money in advance for an item you have not seen — even if the seller has good reviews. The item may not exist.</li>
        </ul>

        <div class="tip-block">
          <span class="tip-label" data-en="Meet at your local police station" data-fr="Rencontrez-vous au poste de police local">Meet at your local police station</span>
          <p data-en="Many Ontario police stations have a designated safe exchange zone in their lobby or parking lot specifically for online marketplace transactions. Both buyer and seller feel safer, and honest transactions complete without any problem." data-fr="De nombreux postes de police de l'Ontario ont une zone d'échange sécurisée désignée dans leur hall ou leur parking spécifiquement pour les transactions sur les marchés en ligne.">Many Ontario police stations have a designated safe exchange zone in their lobby or parking lot specifically for online marketplace transactions. Both buyer and seller feel safer, and honest transactions complete without any problem.</p>
        </div>
      </div>`
  },
  {
    slug: 'keeping-your-ipad-up-to-date',
    titleEn: 'Keeping Your iPad Up to Date',
    titleFr: 'Maintenir votre iPad à jour',
    descEn: 'iOS updates fix security holes. Step-by-step guide to checking for and installing software updates on your iPhone or iPad.',
    descFr: "Les mises à jour iOS corrigent les failles de sécurité. Guide étape par étape pour vérifier et installer les mises à jour sur votre iPhone ou iPad.",
    moduleLink: '../module-4.html',
    moduleName: 'Module 4: App Store Safety',
    datePublished: 'March 2026',
    faq: [
      { q: 'Why should I update my iPhone or iPad software?', a: 'Every iOS update from Apple includes security fixes that close vulnerabilities criminals could use to access your device or data. Keeping your software updated is one of the most important things you can do to stay secure. Older, unpatched software is a known target for attackers.' },
      { q: 'How often does Apple release iOS updates?', a: 'Apple releases major iOS updates once a year (usually in autumn) and smaller security patches every few weeks throughout the year. If you turn on automatic updates, your device will install these overnight while it is charging — no action required from you.' },
    ],
    bodyEn: `      <div class="geo-answer">
        <p data-en="Apple releases software updates for iPhones and iPads regularly. These updates fix security problems that criminals could otherwise use to break into your device. Here is how to check for updates and turn on automatic updates so it happens by itself:" data-fr="Apple publie régulièrement des mises à jour logicielles pour les iPhone et iPad. Ces mises à jour corrigent des problèmes de sécurité que les criminels pourraient autrement utiliser pour accéder à votre appareil. Voici comment vérifier les mises à jour et activer les mises à jour automatiques :">Apple releases software updates for iPhones and iPads regularly. These updates fix security problems that criminals could otherwise use to break into your device. Here is how to check for updates and turn on automatic updates so it happens by itself:</p>

        <h2 data-en="Check for updates now" data-fr="Vérifier les mises à jour maintenant">Check for updates now</h2>
        <ol class="content-list">
          <li data-en="Make sure you are connected to Wi-Fi" data-fr="Assurez-vous d'être connecté au Wi-Fi">Make sure you are connected to Wi-Fi</li>
          <li data-en="Open Settings (the grey icon with gears)" data-fr="Ouvrez Réglages (l'icône grise avec des engrenages)">Open Settings (the grey icon with gears)</li>
          <li data-en="Tap General" data-fr="Appuyez sur Général">Tap General</li>
          <li data-en="Tap Software Update" data-fr="Appuyez sur Mise à jour logicielle">Tap Software Update</li>
          <li data-en="If an update is available, tap Download and Install. Your device will ask for your passcode and then begin the update." data-fr="Si une mise à jour est disponible, appuyez sur Télécharger et installer.">If an update is available, tap Download and Install. Your device will ask for your passcode and then begin the update.</li>
        </ol>

        <h2 data-en="Turn on automatic updates" data-fr="Activer les mises à jour automatiques">Turn on automatic updates</h2>
        <ol class="content-list">
          <li data-en="Open Settings → General → Software Update" data-fr="Ouvrez Réglages → Général → Mise à jour logicielle">Open Settings → General → Software Update</li>
          <li data-en="Tap Automatic Updates" data-fr="Appuyez sur Mises à jour automatiques">Tap Automatic Updates</li>
          <li data-en="Turn on both Download iOS Updates and Install iOS Updates" data-fr="Activez à la fois Télécharger les mises à jour iOS et Installer les mises à jour iOS">Turn on both Download iOS Updates and Install iOS Updates</li>
        </ol>
        <p data-en="Once automatic updates are on, your iPad will install updates overnight while it is charging. You may notice your device restarted — that is the update completing. No action needed from you." data-fr="Une fois les mises à jour automatiques activées, votre iPad installera les mises à jour pendant la nuit pendant la charge.">Once automatic updates are on, your iPad will install updates overnight while it is charging. You may notice your device restarted — that is the update completing. No action needed from you.</p>

        <div class="tip-block">
          <span class="tip-label" data-en="Always update your apps too" data-fr="Mettez également à jour vos applications">Always update your apps too</span>
          <p data-en="Your iPhone and iPad software is separate from your apps. Go to the App Store → tap your profile photo → scroll down → tap Update All to update all your apps at once." data-fr="Le logiciel de votre iPhone et iPad est séparé de vos applications. Allez dans l'App Store → appuyez sur votre photo de profil → faites défiler vers le bas → appuyez sur Tout mettre à jour.">Your iPhone and iPad software is separate from your apps. Go to the App Store → tap your profile photo → scroll down → tap Update All to update all your apps at once.</p>
        </div>
      </div>`
  },
];

for (const tip of tips) {
  const html = makeTipPage(tip);
  fs.writeFileSync(base + tip.slug + '.html', html, 'utf8');
  console.log('Written:', tip.slug + '.html');
}
console.log('Phase 4 tip articles complete.');
