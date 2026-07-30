const fs = require('fs');
const base = 'C:/Users/getkr/brenda-digital-confidence/resources/scam-deep-dives/';

function makePage(data) {
  const faqSchema = data.faq.map(q =>
    `      {"@type":"Question","name":${JSON.stringify(q.q)},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify(q.a)}}}`
  ).join(',\n');

  return `<!DOCTYPE html>
<html lang="en-CA" data-theme="light" data-font-size="medium">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${data.metaDesc}">
  <link rel="canonical" href="https://twobirds-kramerica.github.io/digital-confidence/resources/scam-deep-dives/${data.slug}.html">
  <title>${data.title} | Digital Confidence Centre</title>
  <link rel="stylesheet" href="../../css/main.css">
  <link rel="stylesheet" href="../../css/accessibility.css">
  <link rel="icon" type="image/svg+xml" href="../../favicon.svg">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": ${JSON.stringify(data.title)},
    "description": ${JSON.stringify(data.metaDesc)},
    "url": "https://twobirds-kramerica.github.io/digital-confidence/resources/scam-deep-dives/${data.slug}.html",
    "author": {"@type": "Organization", "name": "Two Birds Innovation"},
    "publisher": {"@type": "Organization", "name": "Digital Confidence Centre"},
    "datePublished": "2026-03-27", "dateModified": "2026-03-27", "inLanguage": "en-CA"
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
        <a href="../../index.html" data-en="Home" data-fr="Accueil">Home</a> ›
        <a href="../../module-2.html" data-en="Module 2: Security Shield" data-fr="Module 2 : Bouclier de sécurité">Module 2: Security Shield</a> ›
        <span>${data.title}</span>
      </nav>

      <h1>${data.title}</h1>
      <p class="module-byline">Reviewed by Two Birds Innovation &middot; Last reviewed: March 2026</p>

${data.body}

      <div class="confidence-check-box" style="margin-top:2rem">
        <strong>Report this scam</strong><br>
        If you have experienced this scam, report it to the <strong>Canadian Anti-Fraud Centre</strong> at <a href="tel:+18884958501">1-888-495-8501</a> or at <a href="https://www.antifraudcentre-centreantifraude.ca" target="_blank" rel="noopener noreferrer">antifraudcentre.ca</a>. Reporting helps protect other Canadians.
        <br><a href="../../module-2.html" class="btn btn-primary" style="margin-top:0.75rem;display:inline-block">Back to Module 2: Security Shield →</a>
      </div>

      <div class="sources-block">
        <h3>Sources &amp; References</h3>
        <ul>
          <li><a href="https://www.antifraudcentre-centreantifraude.ca" target="_blank" rel="noopener noreferrer">Canadian Anti-Fraud Centre (CAFC)</a></li>
          <li><a href="https://www.rcmp-grc.gc.ca/en/fraud" target="_blank" rel="noopener noreferrer">RCMP Fraud Prevention</a></li>
          <li><a href="https://www.getcybersafe.gc.ca" target="_blank" rel="noopener noreferrer">Get Cyber Safe — Government of Canada</a></li>
        </ul>
      </div>

    </main>
  </div>
  <script src="../../js/lang-toggle.js" defer></script>
  <script src="../../js/offline-banner.js" defer></script>
</body>
</html>`;
}

const scams = [
  {
    slug: 'courier-fraud',
    title: 'The Courier Fraud Scam',
    metaDesc: 'Courier fraud: a scammer calls pretending to be your bank, then sends a "courier" to collect your card and PIN. How it works and how to stop it.',
    faq: [
      { q: 'What is the courier fraud scam?', a: 'Courier fraud is when a criminal calls pretending to be your bank or police and tells you your card has been compromised. They ask you to cut your card or hand it to a courier who will "take it to the bank for investigation." The courier is also a criminal. Your real bank will never send someone to pick up your card.' },
      { q: 'How do I know if a courier fraud call is fake?', a: 'Any caller who asks you to hand over your bank card, give your PIN to anyone, or wait for someone to come to your home is a criminal. Hang up immediately. Call your bank on the number printed on the back of your card — from a different phone if possible.' },
    ],
    body: `      <div class="warning-block">
        <strong>⚠️ Key warning sign:</strong> Your real bank will NEVER send anyone to your home to collect your bank card. Ever. If someone says they are coming to your door for your card — it is a criminal.
      </div>

      <div class="geo-answer">
        <h2>How the scam works — step by step</h2>
        <ol class="content-list">
          <li>You receive a phone call. The caller claims to be from your bank's fraud department or from the police. They sound professional and calm.</li>
          <li>They tell you that your bank card has been compromised, cloned, or used fraudulently. They say they need to replace it immediately.</li>
          <li>They ask you to confirm your card number and PIN "to verify your identity."</li>
          <li>They tell you to cut your card in half but keep both pieces — or simply wait with the card. They say a courier or officer is coming to collect it for "investigation."</li>
          <li>A person arrives at your door, takes your card (and often your PIN), and leaves. Your account is drained within hours.</li>
        </ol>

        <h2>Why it works</h2>
        <p>The scam is effective because it creates both fear (your card is compromised) and a sense of official authority (they are from the bank or police). The caller is often very convincing — they may know your name, address, or part of your account number, which they obtained from previous fraud or data leaks.</p>
        <p>Many victims do not realise they have been scammed until they try to use their card or check their account.</p>

        <h2>What to do if you receive this call</h2>
        <ul class="content-list">
          <li>Hang up immediately</li>
          <li>Wait at least 5 minutes before making another call — some scammers stay on the line and "spoof" your dial tone</li>
          <li>Call your bank using the number on the back of your card, or on your official bank statement</li>
          <li>Tell your bank about the call — they will take action if your account is at risk</li>
          <li>Call the Canadian Anti-Fraud Centre at 1-888-495-8501</li>
        </ul>

        <div class="tip-block">
          <span class="tip-label">The bank will never call and ask for your PIN</span>
          <p>Your bank already knows your PIN is secret. A legitimate bank employee will never ask for it over the phone, in a text message, or through a third party. If anyone asks for your PIN — the call is a fraud.</p>
        </div>
      </div>`
  },
  {
    slug: 'call-forwarding-scam',
    title: 'The Call Forwarding Scam',
    metaDesc: 'The call forwarding scam tricks you into dialling a code that redirects your phone calls to criminals — intercepting your bank verification codes.',
    faq: [
      { q: 'What is the call forwarding scam?', a: 'A criminal calls pretending to be your phone carrier or bank and asks you to dial a specific code on your phone — something like *21*[their number]#. This activates call forwarding, which redirects all incoming calls (including your bank one-time passwords and verification codes) to the criminal\'s phone. They then access your accounts.' },
      { q: 'How do I turn off call forwarding if I think I have been tricked?', a: 'On most Canadian phones, dial ##002# and press call. This cancels all call forwarding and redirections. If you are with Rogers, Bell, or Telus, call their customer support immediately and report the issue. Change your banking passwords from a different device right away.' },
    ],
    body: `      <div class="warning-block">
        <strong>⚠️ Key warning sign:</strong> Your phone carrier or bank will never ask you to dial a code to "activate security" or "fix an account problem." Dialling codes you are asked to enter by a caller is almost always a scam.
      </div>

      <div class="geo-answer">
        <h2>How the scam works — step by step</h2>
        <ol class="content-list">
          <li>You receive a call from someone claiming to be your mobile carrier (Rogers, Bell, Telus) or your bank. They say there is a problem with your account or your SIM card.</li>
          <li>They tell you the fix requires dialling a specific code on your phone — for example, *21*[their phone number]# followed by the call button.</li>
          <li>You dial the code without realising it activates call forwarding — routing all your incoming calls to the criminal's phone number.</li>
          <li>The criminal now calls your bank, pretending to be you. When the bank sends a one-time verification code to "your" phone, the criminal receives it instead.</li>
          <li>They access your online banking, change passwords, and transfer money.</li>
        </ol>

        <h2>The codes criminals use</h2>
        <p>Common call forwarding activation codes used in this scam include:</p>
        <ul class="content-list">
          <li><code>*21*[number]#</code> — unconditional call forwarding</li>
          <li><code>**21*[number]#</code> — forwarding variation</li>
          <li><code>*67*[number]#</code> — another variation</li>
        </ul>
        <p>To cancel all forwarding: dial <code>##002#</code> and press call. Do this if you are unsure whether you have been tricked.</p>

        <h2>What to do</h2>
        <ul class="content-list">
          <li>Hang up on any caller asking you to dial any code</li>
          <li>Call your carrier directly on their official number to verify your account status</li>
          <li>Dial ##002# to cancel any call forwarding that may have been activated</li>
          <li>Change your online banking password from a device that is not your phone</li>
          <li>Report to the Canadian Anti-Fraud Centre: 1-888-495-8501</li>
        </ul>

        <div class="tip-block">
          <span class="tip-label">Your carrier will never ask you to dial a code over the phone</span>
          <p>Legitimate phone carriers manage account settings through your online account portal or at a retail store — not by asking you to dial codes. Any caller asking you to input codes is attempting fraud.</p>
        </div>
      </div>`
  },
  {
    slug: 'cra-phone-scam',
    title: 'The CRA Phone Scam',
    metaDesc: 'The CRA phone scam: criminals call pretending to be Canada Revenue Agency threatening arrest for unpaid taxes. How it works and how to spot it.',
    faq: [
      { q: 'Does the CRA call to demand immediate payment?', a: 'The real Canada Revenue Agency (CRA) primarily contacts Canadians by mail. While CRA agents may call, they will never threaten immediate arrest, demand payment by gift card or cryptocurrency, or ask you to stay on the line. If you are unsure about a balance owing, hang up and call CRA directly at 1-800-959-8281.' },
      { q: 'What should I do if I receive a threatening CRA call?', a: 'Hang up. Do not press any numbers. Do not call back the number they give you. If you have a genuine concern about your taxes, call the real CRA at 1-800-959-8281 or log into your My CRA Account at canada.ca. Report the scam call to the Canadian Anti-Fraud Centre at 1-888-495-8501.' },
    ],
    body: `      <div class="warning-block">
        <strong>⚠️ Key warning sign:</strong> The real CRA will NEVER threaten you with immediate arrest. They will NEVER ask for payment by gift card, iTunes card, Bitcoin, or wire transfer. Legitimate CRA debts are settled through your bank or by mail.
      </div>

      <div class="geo-answer">
        <h2>The exact script — what criminals say</h2>
        <p>CRA phone scam calls often use a recorded voice that says something like:</p>
        <div class="story-block">
          <p><em>"This is an urgent call from the Canada Revenue Agency. A lawsuit has been filed against you for tax fraud. You owe $3,800 in back taxes. If you do not call us immediately at [fake number], a warrant will be issued for your arrest. Press 1 now to speak to an officer."</em></p>
        </div>
        <p>If a real person then picks up, they will:</p>
        <ul class="content-list">
          <li>Demand you pay immediately by gift card (iTunes, Google Play, Amazon) or cryptocurrency</li>
          <li>Threaten police will arrive at your home within hours if you hang up</li>
          <li>Ask you to stay on the phone while you purchase the gift cards</li>
          <li>Tell you not to tell anyone what you are doing</li>
        </ul>

        <h2>Why seniors are specifically targeted</h2>
        <p>The CRA scam is designed to trigger fear of authority and fear of criminal consequences. Scammers have researched which fears are most powerful among older adults — the threat of arrest, the embarrassment of tax problems, and the fear of losing one's home. These fears override rational thinking. That is entirely intentional.</p>

        <h2>How to tell a real CRA call from a fake one</h2>
        <ul class="content-list">
          <li><strong>Real CRA:</strong> Sends a letter first. Gives you time to respond. Will not threaten arrest. Will direct you to canada.ca or 1-800-959-8281. Will accept payment through your bank or online.</li>
          <li><strong>Fake CRA:</strong> Calls out of nowhere. Demands immediate payment. Threatens arrest. Asks for gift cards. Asks you to stay on the line. Tells you to keep it secret.</li>
        </ul>

        <div class="tip-block">
          <span class="tip-label">Verify any CRA concern yourself</span>
          <p>If you receive a call that worries you, hang up and call CRA directly at 1-800-959-8281. Or log into your My CRA Account at canada.ca. A genuine CRA debt will be clearly shown there. The real CRA is patient and will give you time.</p>
        </div>
      </div>`
  },
  {
    slug: 'grandparent-scam',
    title: 'The Grandparent Scam',
    metaDesc: 'The grandparent scam: criminals call pretending to be your grandchild in trouble — arrested, in hospital, or needing bail money. How it works and how to stop it.',
    faq: [
      { q: 'What is the grandparent scam?', a: 'The grandparent scam is when a criminal calls you pretending to be your grandchild in crisis — claiming to be arrested, in an accident, or in hospital abroad. A fake "lawyer" or "police officer" then comes on the line demanding bail money or medical fees immediately by cash courier or wire transfer. The grandchild is always fine — the call is entirely fabricated.' },
      { q: 'How do I verify if my grandchild is really in trouble?', a: 'Hang up and call your grandchild directly on the phone number you already have for them — not on any number the caller gives you. If you cannot reach them, call another family member. A genuine emergency can wait 5 minutes for you to verify it is real. Scammers always create urgency to prevent this verification step.' },
    ],
    body: `      <div class="warning-block">
        <strong>⚠️ Key warning sign:</strong> A caller asking you to keep an emergency "secret from the family" is a criminal. Real emergencies do not require secrecy. The secrecy instruction is specifically designed to prevent you from verifying the story with someone who would catch the lie.
      </div>

      <div class="geo-answer">
        <h2>How the scam works — step by step</h2>
        <ol class="content-list">
          <li>You receive a call from someone who sounds distressed. They say: "Grandma? It's me." You say a name — your grandchild's — and they confirm it.</li>
          <li>They claim to be in serious trouble: arrested in another city or country, in a car accident, hospitalised, or detained by customs. They say they need money urgently.</li>
          <li>A second person comes on the line — a "lawyer," "bail bondsman," or "police officer" — who explains the situation and demands immediate payment.</li>
          <li>They specify the amount ($2,000–$10,000 is common), tell you it must be cash sent by courier or wire, and instruct you to keep it secret from other family members "to protect your grandchild's reputation."</li>
          <li>They may call back multiple times with "new developments" requiring more money.</li>
        </ol>

        <h2>How criminals find your information</h2>
        <p>Scammers research their targets using social media. If your grandchild's Facebook, Instagram, or TikTok account is public, criminals can learn their name, your name, the city they live in, recent trips, and relationships. This makes the initial call sound credible.</p>
        <p>This is one reason it is worth checking whether your family members' social media accounts are set to "Friends Only" rather than public.</p>

        <h2>What to do immediately</h2>
        <ol class="content-list">
          <li>Stay calm. Tell the caller you need to call your grandchild back on the number you already have.</li>
          <li>Hang up.</li>
          <li>Call your grandchild directly — or call their parents.</li>
          <li>If the original caller tries to stop you from hanging up or calling independently, that confirms it is a scam.</li>
          <li>Report to the Canadian Anti-Fraud Centre: 1-888-495-8501.</li>
        </ol>

        <div class="tip-block">
          <span class="tip-label">Create a family code word</span>
          <p>One practical defence: agree on a code word with your grandchildren — a word only your real family would know. If someone claiming to be your grandchild cannot provide the code word, it is not them. This is a simple, powerful protection against this scam.</p>
        </div>
      </div>`
  },
  {
    slug: 'romance-scam-seniors',
    title: 'Romance Scams Targeting Seniors',
    metaDesc: 'Romance scams targeting Canadian seniors: how criminals build fake relationships online over months before asking for money. Warning signs and what to do.',
    faq: [
      { q: 'What is a romance scam?', a: 'A romance scam is when a criminal creates a fake online identity — usually an attractive, successful, and thoughtful person — and builds a relationship with a victim over weeks or months. Once trust is established, they ask for money, usually with an urgent story: a medical emergency, a business deal gone wrong, or being stranded abroad. They never meet in person. The relationship was entirely fabricated to take money.' },
      { q: 'How do I know if someone I met online is a scammer?', a: 'Key warning signs: they are unusually attractive and successful; they declare love or deep feelings very quickly; they always have an excuse for why they cannot meet in person or video call; they eventually ask for money for an emergency; the photos they use appear in multiple online profiles under different names (search their photo using Google reverse image search). Trust these signals — they are almost always right.' },
    ],
    body: `      <div class="warning-block">
        <strong>⚠️ Key warning sign:</strong> If someone you have never met in person asks for money — in any amount, for any reason — it is almost certainly a scam. Genuine romantic partners do not ask for financial help from people they have never met face-to-face.
      </div>

      <div class="geo-answer">
        <h2>How romance scams work — the full timeline</h2>
        <p>Unlike quick scams, romance fraud is a long-term investment by criminals. Here is how a typical scam unfolds over weeks or months:</p>
        <ol class="content-list">
          <li><strong>Contact:</strong> The scammer reaches out on a dating site, Facebook, or even through a "wrong number" text. Their profile shows an attractive person with a compelling life story — often a widowed professional (doctor, engineer, military officer).</li>
          <li><strong>Building trust:</strong> They invest significant time communicating — good morning messages, thoughtful questions, consistent attention. They remember details you share. They seem like they truly care.</li>
          <li><strong>The barrier:</strong> There is always a reason they cannot meet or video call — they are overseas on a contract, their camera is broken, they are in a remote location. The excuses are plausible and patient.</li>
          <li><strong>The crisis:</strong> After weeks or months, a sudden emergency arises. A medical bill. A customs fee on a package. A business deal requiring a temporary loan. The amount starts small.</li>
          <li><strong>Escalation:</strong> Each payment resolves one crisis and creates another. Total losses can reach tens of thousands of dollars before victims recognise what is happening.</li>
        </ol>

        <h2>Why this scam is particularly painful</h2>
        <p>Beyond the financial loss, victims often experience deep shame and grief — the loss of a relationship they believed was real. Many are reluctant to report it or tell family. Scammers specifically target people who are widowed, recently divorced, or living alone.</p>
        <p>There is no shame in being targeted. These criminals are professional manipulators who invest real time in their deceptions. You were not foolish — you were deceived by someone skilled at deception.</p>

        <h2>Warning signs — act on these immediately</h2>
        <ul class="content-list">
          <li>They declare love or deep feelings within days or weeks</li>
          <li>They cannot video call or meet due to "circumstances"</li>
          <li>Their profile pictures appear in other names when you search them on Google Images</li>
          <li>They ask for money — any amount, for any reason</li>
          <li>They ask you not to tell your family about the relationship</li>
          <li>The story keeps changing when you ask questions</li>
        </ul>

        <div class="tip-block">
          <span class="tip-label">Do a reverse image search</span>
          <p>Save one of their profile photos. Go to images.google.com, click the camera icon, and upload the photo. If the same photo appears under different names on other websites, the person is using a stolen identity. This is the single most effective way to detect a romance scammer before it is too late.</p>
        </div>
      </div>`
  },
];

for (const scam of scams) {
  const html = makePage(scam);
  fs.writeFileSync(base + scam.slug + '.html', html, 'utf8');
  console.log('Written:', scam.slug + '.html');
}
console.log('Phase 6 scam deep dives complete.');
