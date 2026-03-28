#!/usr/bin/env python3
"""Generate 4 missing AEO answer pages for DCC."""
import os

BASE = r'C:\Users\getkr\brenda-digital-confidence\answers'
BASE_URL = 'https://twobirds-kramerica.github.io/digital-confidence'

PAGES = [
    {
        "file": "what-is-siri.html",
        "question": "What is Siri and how do I use it safely?",
        "title": "What Is Siri and How Do I Use It Safely? — Digital Confidence Centre",
        "meta": "Siri is Apple's built-in voice assistant for iPhone and iPad. Learn what Siri can do, what to avoid sharing with it, and how to use it safely.",
        "answer_en": "Siri is Apple's built-in voice assistant — a feature already on your iPhone and iPad. You activate it by saying \"Hey Siri\" or pressing and holding the side button. Siri can set reminders, answer general questions, call contacts, read messages, and open apps without you needing to type a thing. It is especially helpful if typing on a small screen is difficult. Siri is generally safe to use for everyday tasks. However, there are important limits to keep in mind. Never ask Siri to help with banking passwords, PIN numbers, or sensitive account details — voice commands can be heard by others nearby, and Siri recordings may be reviewed by Apple for quality improvement. Do not use Siri in public places for private matters. You can review and delete your Siri history in Settings under Privacy. Siri is a helpful tool, not a person — it does not understand context the way a human does, and it can sometimes give incorrect or outdated information on medical or legal topics. Use it for simple everyday tasks and always double-check important information with a trusted source.",
        "answer_fr": "Siri est l'assistant vocal intégré d'Apple — déjà présent sur votre iPhone et iPad. Activez-le en disant « Dis Siri » ou en maintenant enfoncé le bouton latéral. Siri peut définir des rappels, répondre aux questions générales, appeler des contacts et ouvrir des applications. Siri est généralement sûr pour les tâches quotidiennes, mais ne lui demandez jamais d'aide pour des mots de passe bancaires, numéros NIP ou informations de compte sensibles — les commandes vocales peuvent être entendues par d'autres personnes à proximité. N'utilisez pas Siri dans des lieux publics pour des questions privées.",
        "warning": "Never say your passwords, PIN numbers, or banking details aloud near Siri — or any voice assistant. Someone nearby could hear you, or the recording could be stored.",
        "rule": "The 3-Second Rule: Before asking Siri anything, take 3 seconds to check: Is there anyone nearby who could hear? Is this something I would say out loud in a public place?",
        "module": "../module-9.html",
        "module_name": "Module 9: Understanding AI",
        "category": "ai-tech"
    },
    {
        "file": "how-to-protect-credit-card.html",
        "question": "How do I protect my credit card when shopping online?",
        "title": "How to Protect Your Credit Card Online — Digital Confidence Centre",
        "meta": "Keep your credit card safe when shopping online. Learn about secure websites, safe payment habits, and what to do if your card is compromised.",
        "answer_en": "Protecting your credit card online is straightforward once you know the key rules. First, only shop on websites you know and trust — look for the padlock icon in your browser's address bar and an address that starts with \"https://\". Never enter your card number on a site that lacks these. Use a credit card rather than a debit card for online shopping — credit cards have stronger fraud protection under Canadian consumer law, and a dispute is much easier to resolve. Never save your card details on websites you use rarely. Use a unique, strong password for any shopping account. Consider using Apple Pay or Google Pay when available — these services never share your actual card number with the seller. Review your credit card statement every week, not just monthly. Many banks allow you to set up instant notifications for every transaction — this is one of the best ways to catch fraud early. If you see a charge you do not recognise, call the number on the back of your card immediately. Never enter your card number on a site you reached by clicking a link in an email — type the address yourself instead.",
        "answer_fr": "Protéger votre carte de crédit en ligne est simple une fois que vous connaissez les règles clés. Magasinez uniquement sur des sites que vous connaissez et faites confiance — recherchez l'icône cadenas dans la barre d'adresse de votre navigateur et une adresse commençant par « https:// ». Utilisez une carte de crédit plutôt qu'une carte de débit pour les achats en ligne — les cartes de crédit offrent une meilleure protection contre la fraude en vertu du droit canadien de la consommation. Vérifiez votre relevé de carte de crédit chaque semaine et configurez des notifications instantanées pour chaque transaction.",
        "warning": "Never enter your credit card number after clicking a link in an email or text message. Even if the email looks real, type the store's address yourself into your browser.",
        "rule": "The 3-Second Rule: Before entering your card number online, pause and check three things — Does the address start with https? Is there a padlock? Do I trust this store?",
        "module": "../module-6.html",
        "module_name": "Module 6: Banking & Transactions",
        "category": "money"
    },
    {
        "file": "what-is-smart-speaker.html",
        "question": "What is Alexa and is it safe to have one?",
        "title": "What Is Alexa and Is It Safe? — Digital Confidence Centre",
        "meta": "Alexa is Amazon's voice assistant for Echo smart speakers. Learn how it works, what privacy settings to review, and whether it's safe for seniors.",
        "answer_en": "Alexa is Amazon's voice assistant — the technology inside Amazon Echo smart speakers. You speak to it and it can play music, answer questions, set timers, check the weather, control smart lights, and more. It listens for the wake word \"Alexa\" and responds to voice commands. Smart speakers like Amazon Echo and Google Nest are generally safe to use, with some important caveats to keep in mind. They are always listening for their wake word, which means conversations near the device may occasionally be recorded by mistake. You can review and delete your voice recordings in the Amazon Alexa app under Settings. Do not place a smart speaker near the location where you discuss sensitive financial or personal matters. Never set up purchases through Alexa without first enabling the purchase confirmation PIN in your account settings — without this, anyone who speaks to your device could place an Amazon order. If you receive a call or message through Alexa, treat it the same as any other contact — scammers can sometimes use third-party Alexa skills to impersonate legitimate services. Alexa works best for everyday household tasks and entertainment. Used thoughtfully, it can be a genuinely helpful tool.",
        "answer_fr": "Alexa est l'assistante vocale d'Amazon — la technologie dans les haut-parleurs intelligents Amazon Echo. Vous lui parlez et elle peut jouer de la musique, répondre aux questions, définir des minuteries et plus encore. Les haut-parleurs intelligents sont généralement sûrs, mais ils écoutent toujours leur mot de réveil, ce qui signifie que les conversations à proximité peuvent parfois être enregistrées par erreur. Ne placez pas de haut-parleur intelligent là où vous discutez de questions financières ou personnelles sensibles.",
        "warning": "Without a PIN, anyone who speaks to your Amazon Echo can place orders using your saved payment method. Set up a voice purchase confirmation code in your Alexa account settings.",
        "rule": "Smart speakers are convenient, but they always have a microphone on. Treat them like you would a speaker phone — be mindful of what you say nearby.",
        "module": "../module-9.html",
        "module_name": "Module 9: Understanding AI",
        "category": "ai-tech"
    },
    {
        "file": "how-to-set-up-voicemail.html",
        "question": "How do I set up voicemail on my iPhone?",
        "title": "How to Set Up Voicemail on an iPhone — Digital Confidence Centre",
        "meta": "Step-by-step guide to setting up and using voicemail on your iPhone. Includes how to set a greeting, listen to messages, and use Visual Voicemail.",
        "answer_en": "Setting up voicemail on your iPhone takes just a few minutes. First, open the Phone app — the green icon on your home screen. Tap Voicemail at the bottom right corner of the screen. If you have not set up voicemail before, you will see a Set Up Now button. Tap it. Create a voicemail password — this is typically a 4 to 6 digit number you will need to remember. Your carrier may ask you to record a greeting. To record a custom greeting, tap Greeting in the top left corner, then Custom, then Record. Speak your name and a brief message, then tap Stop when you are done. Tap Play to hear how it sounds, then tap Save when you are happy with it. To listen to voicemail messages, open the Phone app and tap Voicemail. Each message will appear as a list — tap any message to hear it. You can also see a text transcript of the message below it, which makes it easier to read without listening. iPhone's Visual Voicemail feature means you do not need to dial a number or press buttons to hear messages — they all appear in the list. If you cannot find the Voicemail tab, contact your mobile carrier, as some plans require a different set-up.",
        "answer_fr": "La configuration de la messagerie vocale sur votre iPhone ne prend que quelques minutes. Ouvrez d'abord l'application Téléphone — l'icône verte sur votre écran d'accueil. Appuyez sur Messagerie en bas à droite de l'écran. Si vous n'avez pas encore configuré la messagerie vocale, vous verrez un bouton Configurer maintenant. Appuyez dessus, créez un mot de passe de messagerie vocale, puis enregistrez un message de bienvenue personnalisé. Pour écouter les messages, ouvrez l'application Téléphone et appuyez sur Messagerie — chaque message apparaît dans une liste.",
        "warning": "Do not share your voicemail PIN with anyone who calls asking for it — legitimate phone carriers never call to ask for your voicemail password.",
        "rule": None,
        "module": "../module-8.html",
        "module_name": "Module 8: Stay Connected",
        "category": "device"
    },
]

TEMPLATE = '''<!DOCTYPE html>
<html lang="en-CA" data-theme="light" data-font-size="medium">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="index, follow">
  <meta name="description" content="{meta}">
  <title>{title}</title>
  <link rel="canonical" href="{base_url}/answers/{file}">
  <link rel="alternate" hreflang="en-CA" href="{base_url}/answers/{file}">
  <link rel="alternate" hreflang="fr-CA" href="{base_url}/answers/{file}">
  <link rel="alternate" hreflang="x-default" href="{base_url}/answers/{file}">
  <link rel="stylesheet" href="../css/main.css">
  <link rel="stylesheet" href="../css/accessibility.css">
  <link rel="icon" type="image/svg+xml" href="../favicon.svg">
  <meta property="og:title" content="{question}">
  <meta property="og:description" content="{meta}">
  <meta property="og:type" content="article">
  <meta property="og:locale" content="en_CA">
  <meta property="og:locale:alternate" content="fr_CA">
  <meta name="theme-color" content="#1565C0">
  <style>
    .breadcrumb {{ font-size: 0.9rem; margin-bottom: 1.5rem; color: var(--color-text-muted, #666); }}
    .breadcrumb a {{ color: var(--color-primary, #1565C0); text-decoration: none; }}
    .breadcrumb a:hover {{ text-decoration: underline; }}
    .answer-direct {{ background: var(--color-bg-alt, #f0f4ff); border-left: 4px solid var(--color-primary, #1565C0); padding: 1.25rem 1.5rem; border-radius: 0 8px 8px 0; margin-bottom: 2rem; font-size: 1.05rem; line-height: 1.7; }}
    .answer-steps {{ margin: 2rem 0; }}
    .answer-steps ol {{ padding-left: 1.5rem; }}
    .answer-steps ol li {{ margin-bottom: 0.75rem; line-height: 1.6; }}
    .answer-rule {{ background: var(--color-bg-success, #e8f5e9); border-left: 4px solid #2e7d32; padding: 1.25rem 1.5rem; border-radius: 0 8px 8px 0; margin: 2rem 0; }}
    .answer-rule h2 {{ color: #2e7d32; margin-top: 0; font-size: 1.1rem; }}
    .answer-warning {{ background: var(--color-bg-warning, #fff3e0); border-left: 4px solid #e65100; padding: 1.25rem 1.5rem; border-radius: 0 8px 8px 0; margin: 2rem 0; }}
    .answer-warning h2 {{ color: #e65100; margin-top: 0; font-size: 1.1rem; }}
    .answer-learn-more {{ margin: 2.5rem 0; padding: 1.5rem; background: var(--color-bg-alt, #f5f5f5); border-radius: 8px; }}
    .answer-learn-more h2 {{ margin-top: 0; }}
  </style>
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@graph": [
      {{
        "@type": "Article",
        "headline": "{question}",
        "description": "{meta}",
        "author": {{ "@type": "Organization", "name": "Digital Confidence Centre" }},
        "publisher": {{ "@type": "Organization", "name": "Two Birds Innovation", "url": "{base_url}/" }},
        "datePublished": "2026-03-28",
        "dateModified": "2026-03-28",
        "inLanguage": "en-CA",
        "url": "{base_url}/answers/{file}",
        "speakable": {{ "@type": "SpeakableSpecification", "cssSelector": ["h1", ".answer-direct"] }}
      }},
      {{
        "@type": "FAQPage",
        "mainEntity": [{{
          "@type": "Question",
          "name": "{question}",
          "acceptedAnswer": {{
            "@type": "Answer",
            "text": "{answer_json}"
          }}
        }}]
      }},
      {{
        "@type": "BreadcrumbList",
        "itemListElement": [
          {{ "@type": "ListItem", "position": 1, "name": "Home", "item": "{base_url}/" }},
          {{ "@type": "ListItem", "position": 2, "name": "Quick Answers", "item": "{base_url}/answers/" }},
          {{ "@type": "ListItem", "position": 3, "name": "{question}", "item": "{base_url}/answers/{file}" }}
        ]
      }}
    ]
  }}
  </script>
</head>
<body>
  <a href="#main" class="skip-link">Skip to main content</a>
  <div class="accessibility-bar" role="toolbar" aria-label="Accessibility controls">
    <button class="a11y-btn font-size-btn" data-size="small" aria-label="Small text" aria-pressed="false" style="font-size:0.8rem">A</button>
    <button class="a11y-btn font-size-btn" data-size="medium" aria-label="Medium text" aria-pressed="true" style="font-size:1rem">A</button>
    <button class="a11y-btn font-size-btn" data-size="large" aria-label="Large text" aria-pressed="false" style="font-size:1.2rem">A</button>
    <button class="a11y-btn font-size-btn" data-size="xl" aria-label="Extra large text" aria-pressed="false" style="font-size:1.4rem">A</button>
    <button class="a11y-btn theme-toggle-btn" aria-label="Switch to dark mode">🌓</button>
    <button class="a11y-btn lang-toggle-btn" aria-label="Switch to French" data-lang="fr">FR</button>
  </div>

  <nav class="main-nav" role="navigation" aria-label="Main navigation">
    <div class="nav-container">
      <a href="../index.html" class="nav-logo" aria-label="Digital Confidence Centre — Home">
        <span class="nav-logo-text">Digital Confidence Centre</span>
      </a>
      <ul class="nav-links">
        <li><a href="../index.html" class="nav-link" data-en="Home" data-fr="Accueil">Home</a></li>
        <li><a href="../digital-literacy-101.html" class="nav-link" data-en="Modules" data-fr="Modules">Modules</a></li>
        <li><a href="index.html" class="nav-link active" data-en="Quick Answers" data-fr="Réponses rapides">Quick Answers</a></li>
        <li><a href="../tips/index.html" class="nav-link" data-en="Tips" data-fr="Conseils">Tips</a></li>
        <li><a href="../resources.html" class="nav-link" data-en="Resources" data-fr="Ressources">Resources</a></li>
      </ul>
    </div>
  </nav>

  <main id="main" style="max-width: 800px; margin: 0 auto; padding: 2rem 1.25rem 4rem;">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="../index.html" data-en="Home" data-fr="Accueil">Home</a> &rsaquo;
      <a href="index.html" data-en="Quick Answers" data-fr="Réponses rapides">Quick Answers</a> &rsaquo;
      <span data-en="{question}" data-fr="{question}">{question}</span>
    </nav>

    <article>
      <h1 data-en="{question}" data-fr="{question}">{question}</h1>

      <div class="answer-direct" role="note">
        <p data-en="{answer_en}" data-fr="{answer_fr}">{answer_en}</p>
      </div>

{warning_block}
{rule_block}

      <div class="answer-learn-more">
        <h2 data-en="Learn more in our training modules" data-fr="En savoir plus dans nos modules de formation">Learn more in our training modules</h2>
        <p data-en="This topic is covered in depth in <a href=\\"{module_link}\\"><strong>{module_name}</strong></a> — free, self-paced, and designed for seniors in Ontario." data-fr="Ce sujet est couvert en profondeur dans <a href=\\"{module_link}\\"><strong>{module_name}</strong></a> — gratuit, à votre propre rythme, conçu pour les aînés de l'Ontario.">
          This topic is covered in depth in <a href="{module_link}"><strong>{module_name}</strong></a> — free, self-paced, and designed for seniors in Ontario.
        </p>
        <a href="{module_link}" class="btn btn-primary" style="margin-top: 1rem; display: inline-block;" data-en="Go to {module_name} →" data-fr="Aller à {module_name} →">Go to {module_name} →</a>
      </div>

      <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #e0e0e0;">
        <p style="font-size: 0.9rem; color: #666;">
          <a href="index.html" data-en="← Back to all Quick Answers" data-fr="← Retour à toutes les réponses rapides">← Back to all Quick Answers</a>
          &nbsp;|&nbsp;
          <a href="../resources/support-directory.html" data-en="Get local help in Ontario" data-fr="Obtenir de l'aide locale en Ontario">Get local help in Ontario</a>
        </p>
      </div>
    </article>
  </main>

  <footer style="background: #1a1a1a; color: #ccc; padding: 2rem 1.5rem; text-align: center; font-size: 0.9rem; margin-top: 4rem;">
    <p data-en="© 2026 Digital Confidence Centre — Free digital literacy for Ontario seniors. A Two Birds Innovation community service." data-fr="© 2026 Centre de Confiance Numérique — Littératie numérique gratuite pour les aînés de l'Ontario. Un service communautaire de Two Birds Innovation.">
      © 2026 Digital Confidence Centre — Free digital literacy for Ontario seniors. A Two Birds Innovation community service.
    </p>
    <p style="margin-top: 0.5rem;">
      <a href="../index.html" style="color: #FFD740;" data-en="Home" data-fr="Accueil">Home</a> &nbsp;|&nbsp;
      <a href="index.html" style="color: #ccc;" data-en="Quick Answers" data-fr="Réponses rapides">Quick Answers</a> &nbsp;|&nbsp;
      <a href="../resources/support-directory.html" style="color: #ccc;" data-en="Get Help" data-fr="Obtenir de l'aide">Get Help</a>
    </p>
  </footer>
  <script src="../js/accessibility.js" defer></script>
  <script src="../js/lang-toggle.js" defer></script>
</body>
</html>'''

WARNING_TEMPLATE = '''      <div class="answer-warning">
        <h2 data-en="⚠️ Common Mistake to Avoid" data-fr="⚠️ Erreur courante à éviter">⚠️ Common Mistake to Avoid</h2>
        <p data-en="{warning}" data-fr="{warning}">{warning}</p>
      </div>
'''

RULE_TEMPLATE = '''      <div class="answer-rule">
        <h2 data-en="✅ The 3-Second Rule" data-fr="✅ La règle des 3 secondes">✅ The 3-Second Rule</h2>
        <p data-en="{rule}" data-fr="{rule}">{rule}</p>
      </div>
'''

def escape_json(s):
    return s.replace('"', '\\"').replace('\n', ' ')

for p in PAGES:
    warning_block = WARNING_TEMPLATE.format(warning=p['warning']) if p.get('warning') else ''
    rule_block = RULE_TEMPLATE.format(rule=p['rule']) if p.get('rule') else ''

    html = TEMPLATE.format(
        file=p['file'],
        question=p['question'],
        title=p['title'],
        meta=p['meta'],
        answer_en=p['answer_en'],
        answer_fr=p['answer_fr'],
        answer_json=escape_json(p['answer_en']),
        warning_block=warning_block,
        rule_block=rule_block,
        module_link=p['module'],
        module_name=p['module_name'],
        base_url=BASE_URL,
    )

    outpath = os.path.join(BASE, p['file'])
    with open(outpath, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Created: {p['file']}")

print("Done — 4 answer pages generated.")
