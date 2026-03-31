#!/usr/bin/env python3
import os

BASE = "C:/Users/getkr/brenda-digital-confidence"

files_og = {
    "resources/ai-tools-seniors.html": {
        "title": "AI Tools for Seniors: What They Are and How to Use Them Safely — Digital Confidence Centre",
        "description": "AI tools for seniors: what artificial intelligence is, how to use tools like Siri and ChatGPT safely, and what to watch out for. A plain-language guide for older adults.",
        "url": "https://twobirds-kramerica.github.io/digital-confidence/resources/ai-tools-seniors.html"
    },
    "resources/digital-safety-seniors-ontario.html": {
        "title": "Digital Safety for Seniors in Ontario: A Complete Guide — Digital Confidence Centre",
        "description": "A complete guide to digital safety for seniors in Ontario. Learn how to protect yourself online, avoid scams, and use your devices with confidence.",
        "url": "https://twobirds-kramerica.github.io/digital-confidence/resources/digital-safety-seniors-ontario.html"
    },
    "resources/how-to-spot-scams-canada.html": {
        "title": "How to Spot Scams in Canada: What Every Senior Should Know — Digital Confidence Centre",
        "description": "Learn how to spot scams in Canada. A practical guide for seniors on recognising fraud, phishing messages, phone scams, and online tricks.",
        "url": "https://twobirds-kramerica.github.io/digital-confidence/resources/how-to-spot-scams-canada.html"
    },
    "resources/index.html": {
        "title": "Resource Articles — Digital Confidence Centre",
        "description": "Plain-language digital resources for Ontario seniors. Guides on safety, iPad basics, online banking, video calling, and scam awareness. All completely free.",
        "url": "https://twobirds-kramerica.github.io/digital-confidence/resources/index.html"
    },
    "resources/ipad-basics-seniors.html": {
        "title": "iPad Basics for Seniors: Getting Started with Confidence — Digital Confidence Centre",
        "description": "iPad basics for seniors: a friendly, step-by-step guide to getting started with your iPad. Learn to tap, swipe, download apps, and use your device with confidence.",
        "url": "https://twobirds-kramerica.github.io/digital-confidence/resources/ipad-basics-seniors.html"
    },
    "resources/online-banking-safety-canada.html": {
        "title": "Online Banking Safety in Canada: A Senior's Guide — Digital Confidence Centre",
        "description": "A senior's guide to online banking safety in Canada. Learn how to bank securely on your iPad or computer, spot fraud, and protect your money.",
        "url": "https://twobirds-kramerica.github.io/digital-confidence/resources/online-banking-safety-canada.html"
    },
    "resources/video-calling-grandchildren.html": {
        "title": "How to Video Call Your Grandchildren: A Step-by-Step Guide — Digital Confidence Centre",
        "description": "How to video call your grandchildren using FaceTime or WhatsApp on your iPad or iPhone. A friendly step-by-step guide for seniors.",
        "url": "https://twobirds-kramerica.github.io/digital-confidence/resources/video-calling-grandchildren.html"
    },
    "tips/index.html": {
        "title": "Tips & Updates | Digital Confidence Centre",
        "description": "Short, practical digital safety tips for Canadian seniors. Updated regularly with advice on spotting scams, safe online banking, and protecting your phone.",
        "url": "https://twobirds-kramerica.github.io/digital-confidence/tips/index.html"
    },
    "geo-content/how-to-spot-phone-scam.html": {
        "title": "How do I know if a phone call is a scam? | Digital Confidence Centre",
        "description": "Scam calls pressure you to act fast, ask for gift cards, and threaten arrest. Learn the 5 warning signs of a scam phone call.",
        "url": "https://twobirds-kramerica.github.io/digital-confidence/geo-content/how-to-spot-phone-scam.html"
    },
    "geo-content/how-to-update-apps.html": {
        "title": "How do I update my apps? | Digital Confidence Centre",
        "description": "On iPhone or iPad: open the App Store, tap your profile photo, then Update All. Takes about 2 minutes. Keep apps updated to stay safe.",
        "url": "https://twobirds-kramerica.github.io/digital-confidence/geo-content/how-to-update-apps.html"
    },
    "geo-content/how-to-use-etransfer-safely.html": {
        "title": "How do I use e-transfer safely? | Digital Confidence Centre",
        "description": "Only send e-transfers to people you know. Enable Autodeposit for your account. Double-check the email before sending. Safe e-transfer guide for Canadians.",
        "url": "https://twobirds-kramerica.github.io/digital-confidence/geo-content/how-to-use-etransfer-safely.html"
    },
    "geo-content/how-to-video-call-grandchildren.html": {
        "title": "How do I video call my grandchildren? | Digital Confidence Centre",
        "description": "Use FaceTime (iPhone/iPad) or WhatsApp to video call your grandchildren for free. Step-by-step guide for Canadian seniors.",
        "url": "https://twobirds-kramerica.github.io/digital-confidence/geo-content/how-to-video-call-grandchildren.html"
    },
    "geo-content/is-it-safe-to-shop-online.html": {
        "title": "Is it safe to shop online? | Digital Confidence Centre",
        "description": "Yes, online shopping is safe on trusted Canadian sites like Amazon and Walmart. Use a credit card, look for the padlock, and shop on secure Wi-Fi.",
        "url": "https://twobirds-kramerica.github.io/digital-confidence/geo-content/is-it-safe-to-shop-online.html"
    },
    "geo-content/is-this-email-safe.html": {
        "title": "Is this email safe to open? | Digital Confidence Centre",
        "description": "Check the sender's email address, look for spelling errors, and never click links from unknown senders. 4 steps to check email safety.",
        "url": "https://twobirds-kramerica.github.io/digital-confidence/geo-content/is-this-email-safe.html"
    },
    "geo-content/online-banking-safely.html": {
        "title": "How do I set up online banking safely? | Digital Confidence Centre",
        "description": "Use your bank's official app, a strong password, and Wi-Fi at home only. 5 steps to set up online banking safely in Canada.",
        "url": "https://twobirds-kramerica.github.io/digital-confidence/geo-content/online-banking-safely.html"
    },
    "geo-content/what-is-a-strong-password.html": {
        "title": "What is a strong password? | Digital Confidence Centre",
        "description": "A strong password is at least 12 characters, unique to each account, and uses a mix of letters and numbers. Easy tips for Canadian seniors.",
        "url": "https://twobirds-kramerica.github.io/digital-confidence/geo-content/what-is-a-strong-password.html"
    },
    "geo-content/what-is-phishing.html": {
        "title": "What is phishing? | Digital Confidence Centre",
        "description": "Phishing is a fake email or text pretending to be your bank or a company to steal your login. How to spot and avoid it in Canada.",
        "url": "https://twobirds-kramerica.github.io/digital-confidence/geo-content/what-is-phishing.html"
    },
    "geo-content/what-to-do-if-scammed.html": {
        "title": "What should I do if I think I have been scammed? | Digital Confidence Centre",
        "description": "If you have been scammed: stop all contact, call your bank immediately, then report to the Canadian Anti-Fraud Centre at 1-888-495-8501.",
        "url": "https://twobirds-kramerica.github.io/digital-confidence/geo-content/what-to-do-if-scammed.html"
    },
}

og_block_tpl = (
    '  <meta property="og:title" content="{title}">\n'
    '  <meta property="og:description" content="{description}">\n'
    '  <meta property="og:type" content="website">\n'
    '  <meta property="og:url" content="{url}">\n'
    '  <meta property="og:site_name" content="Digital Confidence Centre">\n'
)

changed = 0
for rel_path, meta in files_og.items():
    filepath = os.path.join(BASE, rel_path)
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        if 'og:title' in content:
            print("SKIP (already has og:title): " + rel_path)
            continue
        og_block = og_block_tpl.format(**meta)
        if '</head>' in content:
            new_content = content.replace('</head>', og_block + '</head>', 1)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            changed += 1
            print("FIXED: " + rel_path)
        else:
            print("NO </head>: " + rel_path)
    except FileNotFoundError:
        print("NOT FOUND: " + rel_path)

print("\nTotal files updated: " + str(changed))
