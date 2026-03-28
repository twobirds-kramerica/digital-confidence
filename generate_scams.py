#!/usr/bin/env python3
"""Generate 8 new scam deep dive pages for Digital Confidence Centre."""
import os

BASE = r'C:\Users\getkr\brenda-digital-confidence\resources\scam-deep-dives'

PAGES = [
    {
        "file": "cra-impersonation-complete-guide.html",
        "title": "CRA Impersonation Scams: The Complete Guide | Digital Confidence Centre",
        "desc": "CRA impersonation is Canada's most reported phone scam. Learn every version of this scam, the warning signs, and exactly what to do when you get the call.",
        "headline": "CRA Impersonation Scams: The Complete Guide",
        "warning": "⚠️ Key warning sign: The real CRA will never threaten immediate arrest, demand payment by gift card, or refuse to let you call them back. Any of these means it is a scam — hang up.",
        "faq": [
            {"q": "Does the CRA ever call Canadians?", "a": "Yes — the CRA does sometimes call taxpayers. But they will never demand immediate payment, threaten arrest, insist on gift cards or wire transfers, or refuse to send written confirmation. They will always allow you to call them back at 1-800-959-8281."},
            {"q": "How do I find out if I genuinely owe money to the CRA?", "a": "Log in to your CRA My Account at canada.ca/my-cra-account to see your actual balance and any notices. Any legitimate debt will be documented there. You can also call the CRA directly at 1-800-959-8281 — not any number a caller gives you."}
        ],
        "content": """
      <div class="geo-answer">
        <h2>Why this scam is so effective</h2>
        <p>The CRA has authority over every Canadian's finances — the threat of arrest, frozen accounts, or deportation triggers immediate fear. Scammers deliberately exploit this fear, giving you no time to think or verify. The calls can be very convincing: they know your name, they may know your address, and they use official-sounding language.</p>

        <h2>The versions of this scam</h2>
        <ol class="content-list">
          <li><strong>The tax arrest threat:</strong> You owe back taxes and will be arrested within hours unless you pay immediately by gift card or wire transfer.</li>
          <li><strong>The refund scam:</strong> You are owed a refund but must first pay a processing fee or verify your banking details to receive it.</li>
          <li><strong>The automated voice scam:</strong> A recorded message says your SIN has been "suspended" and demands you press 1 to speak with an agent.</li>
          <li><strong>The email/text version:</strong> An email claiming to be from the CRA says you must click a link to verify your identity or receive a refund.</li>
        </ol>

        <h2>How to respond</h2>
        <ol class="content-list">
          <li>Hang up immediately — do not press any numbers or stay on the line.</li>
          <li>Do not call back any number the caller provides.</li>
          <li>If you are genuinely concerned about your tax situation, call the CRA directly at <strong>1-800-959-8281</strong>.</li>
          <li>Log in to CRA My Account (canada.ca) to see your real account balance.</li>
          <li>Report the call to the Canadian Anti-Fraud Centre: <strong>1-888-495-8501</strong>.</li>
        </ol>

        <h2>What the real CRA will and will not do</h2>
        <ul class="content-list">
          <li>✅ The real CRA may call you — but will always provide their employee number and allow you to call them back.</li>
          <li>✅ The real CRA sends official assessments and notices by mail first.</li>
          <li>🚫 The real CRA will <strong>never</strong> demand gift cards, cryptocurrency, or wire transfers.</li>
          <li>🚫 The real CRA will <strong>never</strong> threaten arrest, deportation, or immediate legal action on a first call.</li>
          <li>🚫 The real CRA will <strong>never</strong> tell you to keep the call secret from your family.</li>
        </ul>

        <div class="tip-block">
          <span class="tip-label">The 24-hour rule</span>
          <p>No legitimate government agency requires you to make a financial decision within hours of a phone call. If someone is pressuring you to pay right now, that pressure itself is the scam. Real debts can always be verified and paid tomorrow.</p>
        </div>
      </div>"""
    },
    {
        "file": "tech-support-scam.html",
        "title": "Tech Support Scams: How Criminals Get Into Your Device | Digital Confidence Centre",
        "desc": "Tech support scams trick seniors into giving criminals remote access to their computer or iPad. Learn how this scam works and how to shut it down immediately.",
        "headline": "Tech Support Scams: How Criminals Get Into Your Device",
        "warning": "⚠️ Key warning sign: A warning pop-up on your screen with a phone number to call is always a scam. Microsoft, Apple, and Google never contact you this way. Do not call the number.",
        "faq": [
            {"q": "What is a tech support scam?", "a": "A tech support scam is when criminals pretend to be from Apple, Microsoft, or a security company and claim your device has a virus or problem. They ask you to call a number or let them connect remotely to 'fix' it — then they steal your information or money."},
            {"q": "If I gave someone remote access to my device, what should I do?", "a": "Disconnect from the internet immediately (turn off Wi-Fi and mobile data). Call a trusted family member or local computer repair shop to have your device checked. Change the passwords on any accounts you used while the criminal had access. Contact your bank if you shared any financial information."}
        ],
        "content": """
      <div class="geo-answer">
        <h2>How the scam starts</h2>
        <p>Tech support scams typically begin in one of three ways:</p>
        <ul class="content-list">
          <li><strong>Pop-up warning:</strong> A scary full-screen alert appears on your device saying it has been infected and you must call a number immediately.</li>
          <li><strong>Cold call:</strong> Someone calls claiming to be from Microsoft, Apple, or your internet provider, saying they have detected a problem on your device.</li>
          <li><strong>Search engine ad:</strong> You search for tech support help and click what appears to be an official Apple or Microsoft link — but is actually a scammer's site.</li>
        </ul>

        <h2>What happens next</h2>
        <ol class="content-list">
          <li>They instruct you to download a remote access program (such as TeamViewer or AnyDesk) that lets them control your device.</li>
          <li>They show you "evidence" of problems — system logs that look alarming but are completely normal.</li>
          <li>They demand payment for their "repairs" — usually by gift card, wire transfer, or credit card.</li>
          <li>While they have access, they may install malware, steal stored passwords, or access your banking apps.</li>
        </ol>

        <h2>Immediate response steps</h2>
        <ol class="content-list">
          <li>Close the pop-up window. If you cannot close it, hold the power button to restart your device.</li>
          <li>Do not call any number displayed in a pop-up warning — this is never legitimate.</li>
          <li>If you already allowed remote access: disconnect from the internet immediately and seek help from a trusted person or local repair shop.</li>
          <li>If you paid: call your bank or credit card company immediately — explain you were scammed and request a chargeback.</li>
        </ol>

        <div class="tip-block">
          <span class="tip-label">Real tech support does not find you</span>
          <p>Apple, Microsoft, and your internet provider do not monitor your device and spontaneously call you when problems appear. Any unsolicited contact claiming your device has a problem is a scam — every single time.</p>
        </div>
      </div>"""
    },
    {
        "file": "prize-winner-scam.html",
        "title": "Prize Winner Scams: Why You Did Not Win That Lottery | Digital Confidence Centre",
        "desc": "Prize winner and lottery scams target Canadian seniors. Learn why you must pay fees before collecting your prize — a scam that has cost Canadians millions.",
        "headline": "Prize Winner Scams: Why You Did Not Win That Lottery",
        "warning": "⚠️ Key warning sign: Legitimate lotteries never require winners to pay fees, taxes, or processing charges before receiving their prize. Any prize that requires advance payment is a scam.",
        "faq": [
            {"q": "How does the prize winner scam work?", "a": "You receive a call, letter, or email saying you have won a lottery, sweepstakes, or prize. To claim it, you must pay a fee — for processing, customs, taxes, or insurance. Once you pay, they invent more fees. The prize does not exist."},
            {"q": "I received an official-looking cheque for part of my winnings — is that safe?", "a": "No. This is a well-known variant of the scam. The cheque is fraudulent. You are asked to deposit it and wire back part of it for fees. By the time your bank discovers the cheque was fake (which can take weeks), you have already sent real money to the criminals."}
        ],
        "content": """
      <div class="geo-answer">
        <h2>How this scam unfolds</h2>
        <ol class="content-list">
          <li>You receive notice of a win — by phone, email, text, or even a physical letter with an official-looking cheque.</li>
          <li>The prize sounds life-changing: a million-dollar lottery, a luxury car, or a major appliance.</li>
          <li>To claim your prize, you must pay a small fee first — for taxes, processing, customs, or shipping.</li>
          <li>After you pay the first fee, there are more fees. Each payment is justified with a new excuse.</li>
          <li>When you stop paying, the contact disappears — and so does your money.</li>
        </ol>

        <h2>Common versions in Canada</h2>
        <ul class="content-list">
          <li><strong>Foreign lottery win:</strong> You have won a European lottery you never entered.</li>
          <li><strong>Sweepstakes winner:</strong> A retail sweepstakes has selected you as a winner.</li>
          <li><strong>Publisher's Clearing House fake:</strong> A convincing imitation of a legitimate contest notification.</li>
          <li><strong>Scratch ticket scam:</strong> A mailer includes a scratch ticket that "wins" — but collecting requires calling a number and paying fees.</li>
        </ul>

        <h2>Why the advance fee logic fails</h2>
        <p>Real prize winnings do not require advance payment. Taxes on Canadian lottery winnings are handled by the government — not by the lottery organiser. Real prizes are delivered without you paying anything first. This is the single most reliable test: if collecting your prize requires you to pay money first, it is not a prize.</p>

        <h2>If you have already paid</h2>
        <ul class="content-list">
          <li>Stop sending money immediately — do not let them persuade you that one more payment will unlock the prize.</li>
          <li>Report to the Canadian Anti-Fraud Centre: 1-888-495-8501.</li>
          <li>Contact your bank if payment was made by credit card — a chargeback may be possible.</li>
          <li>If you sent a wire transfer or cryptocurrency, recovery is unlikely — focus on stopping further losses.</li>
        </ul>
      </div>"""
    },
    {
        "file": "investment-scam-seniors.html",
        "title": "Investment Scams Targeting Seniors: How to Protect Your Savings | Digital Confidence Centre",
        "desc": "Investment fraud is the highest-value scam targeting Canadian seniors. Learn how these scams work and how to verify any investment opportunity before committing.",
        "headline": "Investment Scams Targeting Seniors: How to Protect Your Savings",
        "warning": "⚠️ Key warning sign: Any investment guaranteeing unusually high, risk-free returns is fraud. Legitimate investments always carry risk — the higher the promised return, the higher the risk. No exceptions.",
        "faq": [
            {"q": "What is the most common investment scam targeting Canadian seniors?", "a": "Cryptocurrency investment scams (sometimes called 'pig butchering' scams) are currently the highest-loss category. A stranger — often posing as a romantic interest or new friend — introduces you to a cryptocurrency platform that shows impressive returns. When you try to withdraw, there are always more fees. The platform is fake."},
            {"q": "How do I verify if an investment is legitimate?", "a": "Check the Ontario Securities Commission (OSC) at osc.ca to verify if a firm or individual is registered to sell investments in Ontario. Call the OSC Inquiries and Contact Centre at 1-877-785-1555. Legitimate investment advisers will always provide documentation and registration numbers."}
        ],
        "content": """
      <div class="geo-answer">
        <h2>Why seniors are targeted</h2>
        <p>Seniors in Canada hold a disproportionately large share of investment assets — retirement savings built over a lifetime. Investment fraudsters specifically target this demographic with sophisticated, long-running schemes that may take months to reveal themselves as scams.</p>

        <h2>Common investment fraud types</h2>
        <ul class="content-list">
          <li><strong>Cryptocurrency scams:</strong> A trusted contact (sometimes a romance scam contact) introduces you to a cryptocurrency platform with guaranteed returns. The platform is fake — your money is stolen when you try to withdraw.</li>
          <li><strong>Ponzi and pyramid schemes:</strong> Early investors receive payments funded by new investors, creating the illusion of legitimate returns. The scheme collapses when new investment dries up.</li>
          <li><strong>Unregistered advisors:</strong> Someone poses as an investment professional and solicits money without being registered with the Ontario Securities Commission.</li>
          <li><strong>Affinity fraud:</strong> Scams that spread through community networks (churches, cultural communities, seniors' groups) — you trust the investment because a trusted community member recommends it.</li>
        </ul>

        <h2>The red flags</h2>
        <ul class="content-list">
          <li>Guaranteed high returns with no risk — this combination does not exist in legitimate markets.</li>
          <li>Pressure to act quickly before the opportunity closes.</li>
          <li>Secrecy — being told not to discuss it with family or a financial adviser.</li>
          <li>Returns that are unusually consistent regardless of market conditions.</li>
          <li>Difficulty accessing or withdrawing your money, always with one more fee required.</li>
        </ul>

        <h2>Before investing — verify</h2>
        <ol class="content-list">
          <li>Check if the firm or individual is registered: osc.ca or 1-877-785-1555.</li>
          <li>Get everything in writing — a legitimate adviser will always provide documentation.</li>
          <li>Talk to a family member or your bank's financial adviser before committing.</li>
          <li>Search the company name plus "scam" or "fraud" on Google before investing.</li>
        </ol>
      </div>"""
    },
    {
        "file": "door-to-door-scam.html",
        "title": "Door-to-Door Scams Targeting Seniors | Digital Confidence Centre",
        "desc": "Door-to-door scammers pose as utility workers, home repair contractors, and charity collectors. Learn how to protect yourself at your own front door.",
        "headline": "Door-to-Door Scams Targeting Seniors",
        "warning": "⚠️ Key warning sign: Never allow anyone into your home without seeing their identification and calling the company they claim to represent — using a number you find yourself, not one they give you.",
        "faq": [
            {"q": "What should I do if someone comes to my door claiming to be from my utility company?", "a": "Ask to see their ID badge. Do not let them in immediately. Tell them to wait while you call the utility company directly — find the number on your bill or the company's official website, not from anything the person provides. A legitimate utility worker will wait. A scammer will leave."},
            {"q": "Am I allowed to turn people away at my door?", "a": "Absolutely. You have every right to decline to open the door, to ask them to leave, or to ask them to return when a family member is present. You are never obligated to let anyone into your home. If someone refuses to leave, call 9-1-1."}
        ],
        "content": """
      <div class="geo-answer">
        <h2>Common door-to-door scams</h2>
        <ul class="content-list">
          <li><strong>Utility impersonation:</strong> Someone claims to be from Hydro One, Union Gas, or your water utility, saying they must inspect your meter or check for a gas leak. They enter your home to distract you while an accomplice steals valuables.</li>
          <li><strong>Driveway and home repair scams:</strong> Contractors offer to seal your driveway, clean your gutters, or fix your roof for a very low price. Work is done poorly or not at all — and they demand far more than originally quoted.</li>
          <li><strong>Charitable collection fraud:</strong> Someone poses as a charity collector for a cause that sounds legitimate. The money goes to the scammer, not to charity.</li>
          <li><strong>Energy contract switching:</strong> High-pressure salespeople push you to sign contracts for energy, internet, or phone services that are not beneficial to you. In Ontario, the Energy Consumer Protection Act gives you a 10-day cooling-off period to cancel.</li>
        </ul>

        <h2>How to protect yourself</h2>
        <ol class="content-list">
          <li>You are not required to open the door. Looking through a window or peephole first is sensible and safe.</li>
          <li>If you open the door, keep it closed with the chain on while you speak to them.</li>
          <li>Ask for photo identification and write down the name and company.</li>
          <li>Call the company using a number from their official website or your bill — not any number the person provides.</li>
          <li>Never sign any contract at the door under pressure. Take the paperwork and review it overnight.</li>
        </ol>

        <h2>Ontario consumer protections</h2>
        <p>Ontario's Consumer Protection Act gives you important rights when dealing with door-to-door salespeople:</p>
        <ul class="content-list">
          <li>You have the right to a 10-day cooling-off period for most door-to-door contracts.</li>
          <li>Any contract over $50 must be written and signed.</li>
          <li>You can cancel within 10 days without penalty for most consumer contracts.</li>
        </ul>

        <div class="tip-block">
          <span class="tip-label">A note on "official" uniforms</span>
          <p>Uniforms and ID badges are easy to fake. The only reliable verification is calling the company directly on a number you find yourself — not one provided by the person at your door.</p>
        </div>
      </div>"""
    },
    {
        "file": "fake-charity-scam.html",
        "title": "Fake Charity Scams: How to Give Safely | Digital Confidence Centre",
        "desc": "Fake charities exploit Canadians' generosity — especially after disasters. Learn how to verify any charity before donating and protect your money.",
        "headline": "Fake Charity Scams: How to Give Safely",
        "warning": "⚠️ Key warning sign: A legitimate charity will never pressure you to donate immediately or use aggressive tactics. Take your time — your money will do more good at a verified charity next week than at a fake one today.",
        "faq": [
            {"q": "How do I know if a charity is real?", "a": "Check the Canada Revenue Agency's list of registered charities at canada.ca/charities-giving. Every legitimate Canadian charity that issues tax receipts must be registered. You can search by name and see their financial filings. A charity not in this registry cannot issue an official tax receipt."},
            {"q": "What should I do if I am unsure about a charity solicitation?", "a": "Ask for the charity's registered number (a legitimate charity will provide it), then verify it yourself at canada.ca/charities-giving. Do not donate using a link in an email or text — go to the charity's official website by typing it yourself. Never donate by gift card, wire transfer, or cryptocurrency."}
        ],
        "content": """
      <div class="geo-answer">
        <h2>How fake charity scams work</h2>
        <p>Fake charity scams are most common after natural disasters (earthquakes, wildfires, floods), during holiday seasons, and around Remembrance Day. Scammers register names that sound like well-known charities, create convincing websites, and solicit donations by phone, email, or door-to-door.</p>

        <h2>Warning signs</h2>
        <ul class="content-list">
          <li>A charity name that sounds very similar to a well-known organisation — 'Canadian Red Cross Foundation' instead of 'Canadian Red Cross'.</li>
          <li>Pressure to donate right now, today, before you can think about it.</li>
          <li>Request for payment by gift card, wire transfer, or cryptocurrency.</li>
          <li>Unable to provide their CRA registered charity number when asked.</li>
          <li>Vague descriptions of how donations are used — "helping the needy" without specifics.</li>
          <li>Refusal to provide a mailing address or verifiable contact information.</li>
        </ul>

        <h2>How to give safely</h2>
        <ol class="content-list">
          <li>Verify using the CRA registry: canada.ca/charities-giving. Search by charity name to confirm registration.</li>
          <li>Go directly to the charity's official website by typing it yourself — do not click links in emails.</li>
          <li>Pay by credit card for better fraud protection — never by gift card or wire transfer.</li>
          <li>Save your donation receipt for tax purposes.</li>
          <li>If you received a phone solicitation, hang up and make your decision in your own time.</li>
        </ol>

        <h2>Well-known, verified Canadian charities</h2>
        <ul class="content-list">
          <li>Canadian Red Cross (redcross.ca) — disaster relief and humanitarian aid.</li>
          <li>United Way (unitedway.ca) — community support services across Canada.</li>
          <li>Heart and Stroke Foundation (heartandstroke.ca) — health research.</li>
          <li>Second Harvest (secondharvest.ca) — food rescue for communities in need.</li>
        </ul>
      </div>"""
    },
    {
        "file": "medicare-drug-scam.html",
        "title": "Medicare and Drug Discount Scams Targeting Seniors | Digital Confidence Centre",
        "desc": "Scammers offer fake drug discount cards and Medicare benefits to steal your identity. A guide for Canadian seniors on protecting your health information.",
        "headline": "Medicare and Drug Discount Scams Targeting Seniors",
        "warning": "⚠️ Key warning sign: Never give your health card number, SIN, or banking information in exchange for a drug discount card or Medicare benefit offer. These are identity theft tools.",
        "faq": [
            {"q": "Are free drug discount card offers legitimate?", "a": "Some legitimate drug discount programs exist in Ontario, such as the Ontario Drug Benefit program for seniors 65+ (through OHIP). However, unsolicited phone or email offers of drug discount cards are almost always scams designed to steal your personal information. Contact your pharmacist about legitimate discount programs."},
            {"q": "What information should I never give out about my health benefits?", "a": "Never give your OHIP card number, your private health insurance plan number, your SIN, or your banking information to anyone offering drug discounts, supplemental Medicare benefits, or health-related gifts over the phone or by email. Legitimate programs do not require this information upfront from unsolicited contacts."}
        ],
        "content": """
      <div class="geo-answer">
        <h2>Common Medicare and drug scam variations</h2>
        <ul class="content-list">
          <li><strong>Drug discount card scam:</strong> You are offered a free drug discount card by phone or mail. To receive it, you must provide your OHIP number, SIN, or banking information. The card is worthless — your information is used for identity theft or fraudulent claims.</li>
          <li><strong>Supplemental benefit offer:</strong> A caller claims to be from the government or your insurance company, offering extra health benefits or a refund. They need to "verify" your information first.</li>
          <li><strong>Medical equipment scam:</strong> You are offered free or low-cost medical equipment (mobility aids, hearing aids, glucose monitors) in exchange for your health card and insurance information.</li>
          <li><strong>Prescription delivery fraud:</strong> Someone contacts you claiming to offer delivery of your prescription medications at a discount. They request your pharmacy details and insurance information.</li>
        </ul>

        <h2>Legitimate Ontario drug benefit programs</h2>
        <p>Ontario has real programs to help seniors with medication costs — but you access them through your pharmacist or doctor, not through unsolicited calls:</p>
        <ul class="content-list">
          <li><strong>Ontario Drug Benefit (ODB):</strong> Free or low-cost prescription drugs for Ontarians 65 and over. Accessed automatically through your OHIP card at any registered pharmacy.</li>
          <li><strong>Trillium Drug Program:</strong> Helps lower-income families with high drug costs. Apply through ServiceOntario.</li>
          <li><strong>Ask your pharmacist:</strong> A registered pharmacist is your best resource for understanding what drug benefits you qualify for.</li>
        </ul>

        <h2>How to protect yourself</h2>
        <ol class="content-list">
          <li>Never share your OHIP number over the phone in response to an unsolicited call.</li>
          <li>Contact your pharmacist or doctor to ask about any drug discount programs — they know what is legitimate.</li>
          <li>If you receive an unsolicited health benefit offer, hang up and call the organisation directly using the number from their official website.</li>
          <li>Report suspected healthcare fraud to the Ontario Ministry of Health's Fraud Reporting Line: 1-888-994-0011.</li>
        </ol>
      </div>"""
    },
    {
        "file": "social-media-impersonation.html",
        "title": "Social Media Impersonation Scams | Digital Confidence Centre",
        "desc": "Scammers copy your profile or your friends' profiles on Facebook to run scams. Learn how impersonation works and how to protect yourself on social media.",
        "headline": "Social Media Impersonation Scams",
        "warning": "⚠️ Key warning sign: If a friend's Facebook account suddenly asks you for money or gift cards — even in a genuine-sounding message — call your friend directly to verify before doing anything.",
        "faq": [
            {"q": "What is social media impersonation?", "a": "Criminals create fake copies of real people's Facebook or Instagram profiles using stolen photos and information. They then contact the real person's friends, pretending to be them, and run various scams — requesting money, gift cards, or personal information."},
            {"q": "How do I know if I am talking to my real friend or an impersonator?", "a": "Call your friend on the phone using their number you already have — not by Facebook Messenger. If their account was cloned, the real person will tell you. If the message came from a hacked account, your friend may not know. A phone call takes 30 seconds and eliminates all doubt."}
        ],
        "content": """
      <div class="geo-answer">
        <h2>How social media impersonation works</h2>
        <ol class="content-list">
          <li>Criminals download your photos and copy your profile information from Facebook, creating a near-identical fake account.</li>
          <li>They send friend requests to all your actual friends — who may accept, thinking it is you with a new account.</li>
          <li>Once connected, they message your friends with requests: "I am stranded and need $200 for a bus ticket," "I lost my phone and need you to buy me a gift card," or simply asking for personal information.</li>
          <li>A variation is hacking into existing accounts — taking over a real account and using it to scam that person's friends.</li>
        </ol>

        <h2>Warning signs you are being impersonated</h2>
        <ul class="content-list">
          <li>Friends ask if you created a new Facebook account — you did not.</li>
          <li>Friends report receiving strange messages from "you."</li>
          <li>You receive a friend request from what appears to be your own profile.</li>
        </ul>

        <h2>What to do if your profile is being impersonated</h2>
        <ol class="content-list">
          <li>Report the fake account to Facebook immediately (three-dot menu on the profile → Report).</li>
          <li>Post a warning on your real account alerting friends to the fake profile.</li>
          <li>Ask friends to report the fake account as well — multiple reports accelerate removal.</li>
          <li>Review your privacy settings: limit who can see your photos and friend list (Settings → Privacy).</li>
        </ol>

        <h2>Protecting your account from being hacked</h2>
        <ul class="content-list">
          <li>Use a strong, unique password on your Facebook account.</li>
          <li>Enable two-factor authentication (Settings → Security and Login → Two-Factor Authentication).</li>
          <li>Never share your Facebook password with anyone.</li>
          <li>Be suspicious of any message asking you to click a link to verify your account or win a prize.</li>
        </ul>

        <div class="tip-block">
          <span class="tip-label">One phone call prevents most social media scams</span>
          <p>Any unexpected request for money from a friend on social media — no matter how convincing — should trigger a direct phone call to that friend. This one habit stops nearly every social media impersonation scam.</p>
        </div>
      </div>"""
    },
]

TEMPLATE = '''<!DOCTYPE html>
<html lang="en-CA" data-theme="light" data-font-size="medium">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{desc}">
  <link rel="canonical" href="https://twobirds-kramerica.github.io/digital-confidence/resources/scam-deep-dives/{file}">
  <title>{title}</title>
  <link rel="stylesheet" href="../../css/main.css">
  <link rel="stylesheet" href="../../css/accessibility.css">
  <link rel="icon" type="image/svg+xml" href="../../favicon.svg">
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "{headline}",
    "description": "{desc}",
    "url": "https://twobirds-kramerica.github.io/digital-confidence/resources/scam-deep-dives/{file}",
    "author": {{"@type": "Person", "name": "Aaron Kramer", "worksFor": {{"@type": "Organization", "name": "Two Birds Innovation"}}}},
    "publisher": {{"@type": "Organization", "name": "Digital Confidence Centre"}},
    "datePublished": "2026-03-28", "dateModified": "2026-03-28", "inLanguage": "en-CA"
  }}
  </script>
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {faq_json}
    ]
  }}
  </script>
</head>
<body>
  <a href="#main" class="skip-link">Skip to main content</a>
  <div class="page-wrapper">
    <main class="main-content" id="main" style="max-width:780px">

      <nav aria-label="Breadcrumb" class="breadcrumb" style="font-size:0.9rem;margin-bottom:1.5rem;color:#666">
        <a href="../../index.html" data-en="Home" data-fr="Accueil">Home</a> ›
        <a href="../../module-2.html" data-en="Module 2: Security Shield" data-fr="Module 2 : Bouclier de sécurité">Module 2: Security Shield</a> ›
        <span>{headline}</span>
      </nav>

      <h1>{headline}</h1>
      <p class="module-byline">Reviewed by Aaron Kramer, Two Birds Innovation &middot; Last reviewed: March 2026</p>

      <div class="warning-block">
        <strong>{warning}</strong>
      </div>

{content}

      <div class="confidence-check-box" style="margin-top:2rem">
        <strong data-en="Learn more about staying safe online" data-fr="En savoir plus sur la sécurité en ligne">Learn more about staying safe online</strong><br>
        <span data-en="Module 2: The Security Shield covers scam protection in depth." data-fr="Module 2 : Le bouclier de sécurité couvre la protection contre les arnaques en profondeur.">Module 2: The Security Shield covers scam protection in depth.</span>
        <br><a href="../../module-2.html" class="btn btn-primary" style="margin-top:0.75rem;display:inline-block" data-en="Go to module →" data-fr="Aller au module →">Go to module →</a>
        &nbsp;
        <a href="../../resources.html" class="btn btn-secondary" style="margin-top:0.75rem;display:inline-block" data-en="All Resources →" data-fr="Toutes les ressources →">All Resources →</a>
      </div>

    </main>
  </div>
  <script src="../../js/lang-toggle.js" defer></script>
  <script src="../../js/offline-banner.js" defer></script>
</body>
</html>
'''

created = []
skipped = []

for page in PAGES:
    filepath = os.path.join(BASE, page['file'])
    if os.path.exists(filepath):
        skipped.append(page['file'])
        continue

    faq_items = []
    for faq in page['faq']:
        q = faq['q'].replace('"', '\\"')
        a = faq['a'].replace('"', '\\"')
        faq_items.append(f'{{"@type":"Question","name":"{q}","acceptedAnswer":{{"@type":"Answer","text":"{a}"}}}}')
    faq_json = ',\n      '.join(faq_items)

    html = TEMPLATE.format(
        file=page['file'],
        title=page['title'],
        desc=page['desc'],
        headline=page['headline'],
        warning=page['warning'],
        faq_json=faq_json,
        content=page['content'],
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)
    created.append(page['file'])
    print(f"Created: {page['file']}")

print(f"\nDone. Created: {len(created)}, Skipped: {len(skipped)}")
