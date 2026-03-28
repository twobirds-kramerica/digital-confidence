#!/usr/bin/env python3
"""Generate 10 new GEO intent pages for Digital Confidence Centre."""
import os

BASE = r'C:\Users\getkr\brenda-digital-confidence\geo-content'
BASE_URL = 'https://twobirds-kramerica.github.io/digital-confidence'

PAGES = [
    {
        "file": "seniors-digital-literacy-ontario.html",
        "title": "Digital Literacy for Seniors in Ontario: Free Resources",
        "h1": "Digital Literacy for Seniors in Ontario: Free Resources",
        "meta": "Free digital literacy resources for seniors across Ontario — iPad training, online safety guides, and scam protection. Covers London, Windsor, Kitchener, St. Thomas.",
        "faq_q1": "What free digital literacy resources exist for seniors in Ontario?",
        "faq_a1": "Ontario seniors can access the Digital Confidence Centre for free self-paced iPad and internet training, the Ontario 211 service for local tech help programmes, public library digital literacy workshops available across the province, and ServiceOntario in-person support.",
        "faq_q2": "Does Ontario have a programme for seniors learning to use technology?",
        "faq_a2": "Yes. Many Ontario public libraries offer free one-on-one tech help sessions and group digital literacy workshops. The Digital Confidence Centre provides free online modules covering everything from iPad basics to scam protection, designed specifically for Ontario seniors aged 60 and above.",
        "body": """Digital literacy is increasingly essential for older Ontarians — from booking medical appointments online to staying connected with family by video call. Yet many seniors feel left behind as technology evolves. The good news: free help exists across the province.

The Digital Confidence Centre is a free, self-paced online training programme designed specifically for seniors in Ontario. Eleven modules cover the essentials of iPad and iPhone use, online safety, banking, photos, and more — all written in plain language with no technical jargon. The programme is accessible 24 hours a day from any device.

Ontario public libraries are another outstanding free resource. Most branches offer drop-in digital help sessions and structured workshops on smartphone use, internet basics, email, and online services. Contact your local branch to find out what's available in your community.

Ontario 211 is a free telephone service (dial 211) that connects callers with local social services and programmes — including technology help for seniors. Staff can tell you about free digital literacy classes, one-on-one tech tutoring, and device loan programmes in your area.

For seniors in communities across Ontario — from Windsor and London to Kitchener and St. Thomas — free digital support is available. The first step is knowing where to look.""",
    },
    {
        "file": "how-to-teach-parent-use-ipad.html",
        "title": "How Do I Teach My Parent to Use Their iPad?",
        "h1": "How Do I Teach My Parent to Use Their iPad?",
        "meta": "Practical advice for adult children teaching a parent to use an iPad. Tips on patience, setting up safely, and the common mistakes to avoid.",
        "faq_q1": "How do I teach my elderly parent to use an iPad?",
        "faq_a1": "Start with one task at a time — video calling is often a great first goal. Set up the device before handing it over: create a simple Apple ID, enable large text, set up FaceTime with family contacts, and disable notifications that could confuse. Focus on building confidence first, not covering everything at once.",
        "faq_q2": "What are the most common mistakes when teaching seniors to use technology?",
        "faq_a2": "The most common mistakes are going too fast, teaching too many things at once, using technical terms, and taking over the device rather than letting the learner try. Adults learn better when they feel in control. Ask questions like 'What do you think will happen if you tap that?' rather than giving all the answers.",
        "body": """Helping a parent learn to use an iPad is one of the most rewarding things you can do — it keeps them connected to family, supports independent living, and opens up a world of entertainment and information. It can also be frustrating for both of you if the approach is wrong.

Here is what actually works.

Start with one goal, not a list of features. Decide together what would most improve your parent's life — video calling grandchildren, reading the news, watching YouTube videos, checking email. Master that one thing before introducing anything else. Confidence comes from repeated success at something simple.

Set the device up before you hand it over. Large text (Settings → Display & Brightness → Text Size → drag the slider right) makes everything easier to read. Turn on Zoom (Accessibility settings) if needed. Remove or organise the home screen so only the apps they need are visible. Set up contacts for the whole family in FaceTime and Phone before your first lesson.

Sit beside them, not across from them. Guide with words, not your hands. Say "Try tapping the green button" rather than reaching over and tapping it yourself. The moment you take over, learning stops.

Embrace the phrase "let's figure that out together." When something goes wrong — and it will — treat it as a puzzle, not a problem. This models the mindset you want them to have when you are not there.

The Digital Confidence Centre offers eleven free online modules designed for exactly this kind of learner. Consider working through them together — or share the link and let your parent explore at their own pace.""",
    },
    {
        "file": "best-apps-seniors-canada.html",
        "title": "The Best Apps for Canadian Seniors in 2026",
        "h1": "The Best Apps for Canadian Seniors in 2026",
        "meta": "The best free and safe apps for Canadian seniors — video calling, health, news, navigation, and safety apps reviewed for ease of use.",
        "faq_q1": "What are the best apps for seniors in Canada?",
        "faq_a1": "The most useful apps for Canadian seniors include FaceTime and Zoom for video calling, Apple Maps or Google Maps for navigation, My CRA Account for tax information, Telehealth Ontario's Ontario Health app for health records, CBC News for trusted Canadian news, and banking apps from major Canadian banks. All are available free in the App Store.",
        "faq_q2": "Are apps from the App Store safe to download?",
        "faq_a2": "Apps downloaded from Apple's App Store go through a review process before being published, which makes them significantly safer than apps downloaded from other sources. However, some scam apps do occasionally appear, so always check reviews and ratings, verify the developer name, and read the privacy policy before providing personal information.",
        "body": """Finding the right apps can transform a senior's digital experience — but the App Store contains over two million applications, and it is not always easy to know where to start. Here are the apps that Canadian seniors find most genuinely useful.

FaceTime is already installed on every iPhone and iPad. It is free, easy, and works beautifully for video calls with family and friends who also have Apple devices. For calling people on Android phones or computers, Zoom and Google Meet work well and are both free.

For navigation, Apple Maps and Google Maps both speak turn-by-turn directions aloud — no need to read while driving. Both are free and work across Canada.

The My CRA Account app is the safest way to check your tax refund status, view benefit information, and update your address with the Canada Revenue Agency. Download it only from the App Store and sign in with your verified CRA credentials.

For health in Ontario, the Health 811 app (formerly Telehealth Ontario) provides access to your health records and allows you to book telehealth appointments. The Ontario Health app is also useful for vaccine records.

For staying informed, the CBC News app provides free, trusted Canadian national and local news without paywalls. The Weather Network app is the go-to for reliable Canadian weather forecasts.

Every major Canadian bank — RBC, TD, Scotiabank, BMO, CIBC, and major credit unions — has a free, secure banking app in the App Store. Module 6 of the Digital Confidence Centre training covers how to use these safely.""",
    },
    {
        "file": "senior-scam-protection-canada.html",
        "title": "Protecting Canadian Seniors From Scams",
        "h1": "Protecting Canadian Seniors From Scams",
        "meta": "How to protect older Canadians from phone scams, email fraud, and online scams. Includes reporting resources and prevention strategies for Ontario seniors.",
        "faq_q1": "How do I protect my elderly parent from scams in Canada?",
        "faq_a1": "The most effective protection is education — ensuring your parent knows the warning signs of common scams. Key rules: the real CRA never demands gift card payment, banks never ask for your PIN, and legitimate organisations never require immediate secrecy. Have a trusted contact agreement in place and ensure they know to call you before making any unexpected payment over the phone.",
        "faq_q2": "What should I do if an elderly family member has been scammed in Canada?",
        "faq_a2": "Act quickly. If money was transferred, call the bank immediately — some transfers can be recalled within hours. Report to the Canadian Anti-Fraud Centre at 1-888-495-8501. If a credit card was used, call the card issuer to dispute the charge. If personal information was shared, consider a fraud alert with Equifax (1-800-465-7166) or TransUnion (1-800-663-9980).",
        "body": """Seniors are not scammed because they are gullible — they are targeted because scammers know that adults who grew up before mass digital communication tend to answer the phone, respond to authority, and act on urgency. These are social strengths that criminals exploit.

Canada's most common scams targeting older adults include CRA impersonation calls, grandparent scams (someone pretending a grandchild is in trouble), tech support fraud, romance scams, and investment fraud. The Canadian Anti-Fraud Centre (CAFC) reports that seniors lose more money per incident than any other age group.

The single most effective protection strategy is what security experts call the "Trusted Contact Protocol." This means agreeing in advance that any unexpected request for money, personal information, or urgent action will be discussed with a trusted family member or friend before acting. No legitimate organisation will object to this — only scammers will pressure you not to tell anyone.

The second most effective protection is recognising the universal warning signs: urgency, secrecy, unusual payment methods (gift cards, wire transfers, cryptocurrency), and requests for personal information. Legitimate organisations never use these tactics.

Digital literacy training significantly reduces scam vulnerability. Seniors who understand how email phishing, phone impersonation, and fake websites work are dramatically harder to deceive. The Digital Confidence Centre's free modules cover all of these topics in plain, accessible language.

Report all suspected scams to the Canadian Anti-Fraud Centre at 1-888-495-8501 — even if no money was lost. Your report helps protect other Canadians.""",
    },
    {
        "file": "what-is-digital-confidence-centre.html",
        "title": "What Is the Digital Confidence Centre?",
        "h1": "What Is the Digital Confidence Centre?",
        "meta": "The Digital Confidence Centre is a free digital literacy programme for seniors in Ontario. Learn about our modules, who we serve, and how to get started.",
        "faq_q1": "What is the Digital Confidence Centre?",
        "faq_a1": "The Digital Confidence Centre is a free, self-paced digital literacy programme designed for adults aged 60 and over in Ontario, Canada. It offers eleven modules covering iPad and iPhone basics, online safety, banking, email, video calling, and more — all in plain language without technical jargon. No account or registration is required.",
        "faq_q2": "Is the Digital Confidence Centre really free?",
        "faq_a2": "Yes — completely free, with no subscriptions, no hidden fees, and no account required. The Digital Confidence Centre is funded as a community service by Two Birds Innovation. Every module, resource page, and article will remain freely accessible.",
        "body": """The Digital Confidence Centre is a free, accessible digital literacy platform built specifically for adults aged 60 and over in Ontario, Canada. It was created by Two Birds Innovation in response to a simple observation: millions of Canadian seniors own smartphones and tablets but lack the confidence and knowledge to use them safely and fully.

The platform offers eleven self-paced training modules covering the most important topics for older adults navigating the digital world. These include: using an iPad and iPhone confidently, understanding and avoiding online scams, managing passwords and accounts, safe online banking and shopping, email and messaging, video calling family and friends, organising photos, and understanding artificial intelligence.

Every module is written at a Grade 5 to 8 reading level, uses plain language, avoids technical jargon, and is reviewed for accuracy. French translations are available throughout the site using the FR button at the top of each page.

Beyond the training modules, the Digital Confidence Centre offers a Quick Answers section with thirty standalone pages answering the most common questions from Ontario seniors, a Tips section with twenty articles on specific digital topics, Scam Deep Dives covering the most common frauds targeting Canadians, and a Resource Directory with local help in communities across Ontario.

The Digital Confidence Centre is designed for iPad and iPhone but works on any device with a web browser. No download, app, or account is needed. Start with any module — there is no required order — and return as often as you like.

For adult children looking for resources to share with a parent: the Digital Confidence Centre is designed to be bookmarked and used independently. Sharing the link is often the most helpful thing you can do.""",
    },
    {
        "file": "free-tech-help-seniors-ontario.html",
        "title": "Free Technology Help for Seniors in Ontario",
        "h1": "Free Technology Help for Seniors in Ontario",
        "meta": "Find free technology help for seniors across Ontario — library programmes, online resources, phone support, and local drop-in sessions for older adults.",
        "faq_q1": "Where can seniors in Ontario get free technology help?",
        "faq_a1": "Ontario seniors can get free technology help from local public libraries (most offer drop-in tech help sessions), Ontario 211 (dial 211 for referrals to local digital literacy programmes), the Digital Confidence Centre (free online self-paced modules at this website), and ServiceOntario locations across the province.",
        "faq_q2": "Does Ontario have free computer classes for seniors?",
        "faq_a2": "Yes. Many Ontario public libraries offer free computer classes and one-on-one tech help sessions for seniors. Topics typically include smartphone and tablet basics, email, video calling, and internet safety. Call your local library or check their website to see what is currently available.",
        "body": """Finding free, trustworthy technology help is easier than many Ontario seniors realise. Whether you need help setting up an email address, learning to use an iPad, understanding a bill from your phone company, or protecting yourself from scams — free support exists across the province.

Ontario's public library system is one of the best-kept secrets in technology education. Libraries in London, Windsor, Kitchener-Waterloo, St. Thomas, Hamilton, Ottawa, and communities across Ontario offer free digital literacy workshops, drop-in help sessions, and one-on-one computer coaching. These sessions are staffed by patient, knowledgeable volunteers and staff who are used to working with beginners. Call your local branch or check their website under "programs" or "digital literacy."

Dial 211 to reach the Ontario 211 service. This free telephone referral line connects Ontarians with community services, including free technology training programmes for older adults, device loan programmes, and senior-focused computer classes in your specific community.

The Digital Confidence Centre (this website) provides free, self-paced digital literacy training that can be accessed any time from any device. Eleven modules cover the topics seniors find most useful — from making video calls to avoiding scams. The platform requires no account and no download.

For those who need telephone-based help: Apple provides free phone support for iPhone and iPad users at 1-800-275-2273. Your bank's customer service line can walk you through their online banking app at no charge.

You do not need to figure this out alone — and you do not need to pay for help. Free support is available.""",
    },
    {
        "file": "ipad-for-seniors-guide.html",
        "title": "iPad for Seniors: Getting Started Guide",
        "h1": "iPad for Seniors: Getting Started Guide",
        "meta": "A gentle introduction to using an iPad for seniors — turning it on, setting up, making calls, and staying safe. Written for Canadian older adults.",
        "faq_q1": "How do I get started with an iPad as a senior?",
        "faq_a1": "Start by turning the iPad on with the top button, following the setup wizard to connect to Wi-Fi and create or sign into an Apple ID, then increase the text size in Settings for easier reading. The most useful first things to learn are: making FaceTime video calls, taking photos, sending messages, and browsing the web. Each of these takes about 15 minutes to learn.",
        "faq_q2": "Is the iPad good for seniors?",
        "faq_a2": "Yes — the iPad is widely considered the best device for older adults new to technology. The screen is large and easy to touch, the operating system is consistent and predictable, it has strong accessibility features for vision and hearing, and it only runs apps that have passed Apple's safety review. Most seniors find it significantly easier than a computer or Android device.",
        "body": """The iPad is consistently recommended by technology experts as the best first device for seniors — and for good reason. The large, bright touchscreen is forgiving and easy to interact with. The software is clean, consistent, and well-designed. Apple's accessibility features are the best in the industry. And the App Store provides access to thousands of useful, reviewed applications.

Getting started is easier than many people expect.

When you first turn on your iPad, a setup wizard will guide you through connecting to your home Wi-Fi network and creating or signing into an Apple ID (your Apple account). If you do not have an Apple ID, the wizard will help you create one using your email address. This takes about ten minutes.

The first settings change most seniors should make is increasing the text size. Go to Settings (the grey gear icon), tap Display & Brightness, then tap Text Size and drag the slider to the right until the text is comfortable to read. You can also enable Bold Text on the same screen.

Your iPad comes with several essential apps already installed. Phone (green icon) for calls. Messages (green speech bubble) for texting. FaceTime (green camera) for video calls. Photos (colourful flower) for your pictures. Safari (blue compass) for web browsing. Mail (blue envelope) for email.

Module 1 of the Digital Confidence Centre covers the iPad's most important functions step by step — including the power button, home screen, how to close an app, and how to restart the device if something goes wrong. It is designed for beginners with no prior experience and takes about 30 minutes to complete.""",
    },
    {
        "file": "online-safety-tips-elderly.html",
        "title": "Online Safety Tips for Elderly Canadians",
        "h1": "Online Safety Tips for Elderly Canadians",
        "meta": "Practical online safety tips for elderly Canadians — protecting passwords, recognising scams, using banking safely, and keeping personal information private.",
        "faq_q1": "What are the most important online safety tips for elderly Canadians?",
        "faq_a1": "The five most important online safety habits for elderly Canadians are: use a unique password for each important account, enable two-factor authentication on email and banking, never click links in unexpected emails or texts, always verify unexpected requests for money or information by calling back on a known number, and keep your device software up to date.",
        "faq_q2": "How do I protect my personal information online as a senior?",
        "faq_a2": "Never share your SIN, date of birth, or banking details unless you initiated the contact with a verified organisation. Use strong, unique passwords for each account. Check your credit card and bank statements weekly. Set up fraud alerts with your bank. Be cautious about what you share on social media — scammers use publicly available information to make their calls more convincing.",
        "body": """Online safety for older Canadians is not about fear — it is about knowing the rules that keep you safe, so you can use the internet with confidence.

Use a different password for each important account. If one password is stolen in a data breach, using it everywhere means every account is at risk. A password manager (Module 3 covers these) makes this easy to manage.

Enable two-factor authentication (2FA) on your most important accounts. Two-factor authentication adds a second step to logging in — usually a code sent to your phone. Even if someone guesses your password, they cannot get in without that code.

Never click links in emails or text messages you were not expecting. If your bank sends you an email saying your account needs attention, do not click the link — open your browser and go directly to your bank's website by typing the address yourself.

Keep your software updated. Software updates fix security vulnerabilities that criminals exploit. On your iPhone or iPad, updates are installed under Settings → General → Software Update. Enable automatic updates so this happens without you needing to remember.

Be cautious on social media. Sharing your birthday, home city, and family members' names publicly gives criminals useful information for impersonation calls. Review your privacy settings on Facebook and other platforms regularly.

When in doubt about any digital interaction — a call, an email, a text, a website — the safest action is always to do nothing until you have had a chance to verify with a trusted person. Scammers rely on urgency. Taking 24 hours to check never hurt anyone.""",
    },
    {
        "file": "video-calling-seniors-canada.html",
        "title": "Video Calling for Seniors: The Canadian Guide",
        "h1": "Video Calling for Seniors: The Canadian Guide",
        "meta": "How to video call family and friends on an iPhone or iPad in Canada — FaceTime, Zoom, and Google Meet explained step by step for seniors.",
        "faq_q1": "What is the easiest video calling app for seniors in Canada?",
        "faq_a1": "FaceTime is the easiest video calling option for iPhone and iPad users because it is already installed — no download required. Simply open FaceTime, tap the + button, type a family member's name, and tap the camera icon to call. FaceTime works over Wi-Fi and mobile data, and the call quality is excellent. It requires the person you are calling to also have an Apple device.",
        "faq_q2": "What if my family uses Android phones — can I still video call them?",
        "faq_a2": "Yes. Apple added the ability for iPhone and iPad users to create FaceTime links that Android and Windows users can join through a web browser. Zoom and Google Meet are also free alternatives that work on any device. Your family member downloads the Zoom app on their Android phone, you download it on your iPhone, and you can video call each other easily.",
        "body": """Video calling has transformed how families stay connected across Canada — from grandchildren in Vancouver to cousins in Halifax. If you have an iPhone or iPad and a Wi-Fi connection, you already have everything you need to see your family face to face, no matter how far away they are.

FaceTime is the simplest starting point for iPhone and iPad users. It is already installed on your device and requires no setup beyond having an Apple ID (which you set up when you first turned on the device). Open FaceTime (the green camera icon), tap the + button in the top right corner, type the name of the family member you want to call, and tap the green camera icon. If they have an iPhone, iPad, or Mac, the call will ring on their device.

To call someone who uses an Android phone or a Windows computer, use Zoom. Download Zoom from the App Store, create a free account, and tap "New Meeting" to start a call. Share your Zoom meeting link with your family member — they can join from any device. Zoom is free for calls up to 40 minutes.

Google Meet is another free option that works similarly to Zoom. If your family uses Gmail, Meet is already connected to their Google account.

Tips for a better video call: sit near a window so there is natural light on your face, hold the iPad at eye level rather than looking down at it, make sure your Wi-Fi is working before the call, and use headphones or earbuds if the audio is hard to hear.

Module 8 of the Digital Confidence Centre covers FaceTime and Zoom step by step with screenshots — ideal for your first video call.""",
    },
    {
        "file": "senior-digital-literacy-programs.html",
        "title": "Senior Digital Literacy Programs in Ontario",
        "h1": "Senior Digital Literacy Programs in Ontario",
        "meta": "A guide to free and low-cost digital literacy programs for seniors across Ontario — libraries, community centres, online courses, and provincial initiatives.",
        "faq_q1": "What digital literacy programs are available for seniors in Ontario?",
        "faq_a1": "Ontario seniors can access free digital literacy programmes through: public library systems (digital skills workshops and one-on-one tech help), the Digital Confidence Centre (free online self-paced modules), Ontario 211 for local programme referrals, community centres and seniors' centres, and federal government's Be Connected initiative through CAP sites across the province.",
        "faq_q2": "How do I find digital literacy classes near me in Ontario?",
        "faq_a2": "Call 211 to speak with a local referral specialist who can tell you about digital literacy programmes in your specific community. Check your nearest public library's website under 'Programs' or 'Digital Literacy.' Contact your local seniors' centre or community centre. Many municipalities have a Seniors' Services office that maintains a current list of available programmes.",
        "body": """Ontario has a rich network of free and low-cost digital literacy programmes for seniors — though finding them often requires knowing where to look.

The Ontario Public Library system is the most accessible starting point for most Ontarians. The Toronto Public Library, Ottawa Public Library, London Public Library, Windsor Public Library, and hundreds of smaller branch systems across the province offer digital skills workshops. Topics commonly covered include: smartphones and tablets, email, online safety, video calling, internet banking, health records online, and government online services. These sessions are typically offered at no cost and are led by patient, trained staff.

Ontario 211 is a free information and referral service accessible by phone (dial 211) or online. A 211 specialist can tell you what digital literacy programmes are currently running in your specific community — including programmes run by community centres, seniors' organisations, and municipal government. This is especially useful in smaller communities where programmes may not be well publicised.

The federal government's Community Access Programme (CAP) sites provide free public internet access and digital skills support at locations including libraries, community centres, schools, and rural access sites across Canada. Search "CAP site Ontario" to find the nearest location.

The Digital Confidence Centre (this website) offers free, self-paced training that can be accessed from home at any time. Eleven modules cover the fundamentals of digital life for older Ontarians. No registration, no cost, no download required. This is particularly valuable for those in rural areas with limited access to in-person programmes, or for anyone who prefers to learn at their own pace.

For programme operators and social service organisations: the Digital Confidence Centre is available as a curriculum resource for group instruction. All content is freely available and designed to be used in a facilitated workshop setting.""",
    },
]

TEMPLATE = '''<!DOCTYPE html>
<html lang="en-CA" data-theme="light" data-font-size="medium">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="index, follow">
  <meta name="description" content="{meta}">
  <title>{title} | Digital Confidence Centre</title>
  <link rel="canonical" href="{base_url}/geo-content/{file}">
  <link rel="alternate" hreflang="en-CA" href="{base_url}/geo-content/{file}">
  <link rel="alternate" hreflang="x-default" href="{base_url}/geo-content/{file}">
  <link rel="stylesheet" href="../css/main.css">
  <link rel="stylesheet" href="../css/accessibility.css">
  <link rel="icon" type="image/svg+xml" href="../favicon.svg">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{meta}">
  <meta property="og:type" content="article">
  <meta property="og:locale" content="en_CA">
  <meta name="theme-color" content="#1565C0">
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "{h1}",
    "description": "{meta}",
    "url": "{base_url}/geo-content/{file}",
    "author": {{"@type": "Organization", "name": "Digital Confidence Centre", "url": "{base_url}/"}},
    "publisher": {{"@type": "Organization", "name": "Digital Confidence Centre"}},
    "datePublished": "2026-03-28",
    "dateModified": "2026-03-28",
    "inLanguage": "en-CA",
    "speakable": {{"@type": "SpeakableSpecification", "cssSelector": ["h1", ".geo-answer"]}}
  }}
  </script>
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {{
        "@type": "Question",
        "name": "{faq_q1}",
        "acceptedAnswer": {{"@type": "Answer", "text": "{faq_a1_json}"}}
      }},
      {{
        "@type": "Question",
        "name": "{faq_q2}",
        "acceptedAnswer": {{"@type": "Answer", "text": "{faq_a2_json}"}}
      }}
    ]
  }}
  </script>
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {{"@type": "ListItem", "position": 1, "name": "Home", "item": "{base_url}/"}},
      {{"@type": "ListItem", "position": 2, "name": "{h1}", "item": "{base_url}/geo-content/{file}"}}
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
  </div>

  <nav class="main-nav" role="navigation" aria-label="Main navigation" style="background:#1565C0;padding:0.75rem 1.5rem;display:flex;align-items:center;justify-content:space-between;">
    <a href="../index.html" style="color:#fff;text-decoration:none;font-weight:700;font-size:1.1rem;">Digital Confidence Centre</a>
    <div style="display:flex;gap:1.5rem;">
      <a href="../index.html" style="color:#FFD740;text-decoration:none;font-size:0.95rem;">Home</a>
      <a href="../answers/index.html" style="color:#fff;text-decoration:none;font-size:0.95rem;">Quick Answers</a>
      <a href="../tips/index.html" style="color:#fff;text-decoration:none;font-size:0.95rem;">Tips</a>
      <a href="../resources.html" style="color:#fff;text-decoration:none;font-size:0.95rem;">Resources</a>
    </div>
  </nav>

  <main id="main" style="max-width:800px;margin:0 auto;padding:2rem 1.25rem 4rem;">
    <nav aria-label="Breadcrumb" style="font-size:0.9rem;margin-bottom:1.5rem;color:#666;">
      <a href="../index.html" style="color:#1565C0;text-decoration:none;">Home</a> ›
      <span>{h1}</span>
    </nav>

    <h1>{h1}</h1>

    <div class="geo-answer" style="line-height:1.8;">
{body_html}
    </div>

    <div style="background:#E3F2FD;border-radius:8px;padding:1.5rem;margin-top:3rem;">
      <h2 style="color:#1565C0;margin-top:0;">Free training at the Digital Confidence Centre</h2>
      <p>Our free, self-paced modules cover everything older Ontarians need to use their devices safely and confidently.</p>
      <a href="../index.html" style="display:inline-block;background:#1565C0;color:#fff;padding:0.75rem 1.5rem;border-radius:6px;text-decoration:none;font-weight:600;margin-top:0.5rem;">Start the free training →</a>
    </div>

    <div style="margin-top:2rem;padding-top:1.5rem;border-top:1px solid #e0e0e0;font-size:0.9rem;color:#666;">
      <a href="../answers/index.html" style="color:#1565C0;">Quick Answers</a> &nbsp;|&nbsp;
      <a href="../tips/index.html" style="color:#1565C0;">Tips &amp; Articles</a> &nbsp;|&nbsp;
      <a href="../resources/support-directory.html" style="color:#1565C0;">Get Help in Ontario</a>
    </div>
  </main>

  <footer style="background:#1a1a1a;color:#ccc;padding:2rem 1.5rem;text-align:center;font-size:0.9rem;margin-top:4rem;">
    <p>© 2026 Digital Confidence Centre — Free digital literacy for Ontario seniors. A Two Birds Innovation community service.</p>
  </footer>
  <script src="../js/accessibility.js" defer></script>
</body>
</html>'''

def escape_json(s):
    return s.replace('"', '\\"').replace('\n', ' ')

def body_to_html(body_text):
    """Convert plain paragraphs to HTML paragraphs."""
    paragraphs = [p.strip() for p in body_text.strip().split('\n\n') if p.strip()]
    html_parts = []
    for p in paragraphs:
        # Check if it's a heading (starts with a word pattern like "Step" or short bold)
        if p.startswith('**') and p.endswith('**') and len(p) < 100:
            heading = p.strip('*')
            html_parts.append(f'      <h2>{heading}</h2>')
        else:
            # Handle inline bold **text**
            p = p.replace('**', '<strong>', 1)
            while '**' in p:
                p = p.replace('**', '</strong>', 1)
                if '**' in p:
                    p = p.replace('**', '<strong>', 1)
            html_parts.append(f'      <p>{p}</p>')
    return '\n'.join(html_parts)

for p in PAGES:
    body_html = body_to_html(p['body'])
    html = TEMPLATE.format(
        file=p['file'],
        title=p['title'],
        h1=p['h1'],
        meta=p['meta'],
        faq_q1=p['faq_q1'],
        faq_a1_json=escape_json(p['faq_a1']),
        faq_q2=p['faq_q2'],
        faq_a2_json=escape_json(p['faq_a2']),
        body_html=body_html,
        base_url=BASE_URL,
    )
    outpath = os.path.join(BASE, p['file'])
    with open(outpath, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'Created: {p["file"]}')

print('Done — 10 GEO pages generated.')
