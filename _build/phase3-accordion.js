const fs = require('fs');
const base = 'C:/Users/getkr/brenda-digital-confidence/';

const moduleQAs = {
  'module-1': { title: 'Module 1: Mastering the Escape Hatch', qas: [
    { q: 'What do I do if my screen is frozen?', a: 'Press the Home button (the round button at the bottom of the screen, or swipe up from the bottom edge on newer iPads). This almost always returns you to your home screen. Your device cannot be permanently broken by a frozen app.' },
    { q: 'Can I break my iPad by pressing the wrong button?', a: 'No. You cannot break your iPad by pressing any button or tapping any icon. The worst that can happen is seeing something unexpected — and the Home button will always bring you back to safety.' },
    { q: 'What is a pop-up warning and should I believe it?', a: 'A pop-up warning that suddenly appears claiming your device has a virus is almost always fake. Real Apple warnings never appear suddenly like this. Press the Home button, ignore the message, and call a trusted person if unsure.' },
    { q: 'How do I close an app I am not using?', a: 'Swipe up from the bottom of the screen and pause in the middle. You will see all your open apps laid out. Swipe up on any app to close it. This is called the App Switcher.' },
  ]},
  'module-2': { title: 'Module 2: The Security Shield', qas: [
    { q: 'How do I know if a phone call is a scam?', a: 'Watch for four red flags: pressure to act immediately, requests for gift cards or e-transfer as payment, threats about arrest or account suspension, and requests to stay on the line. A real bank or government agency will never do any of these things.' },
    { q: 'What should I do if I think I have been scammed?', a: 'Stop all contact immediately. Call your bank fraud line (the number on the back of your card). Report to the Canadian Anti-Fraud Centre at 1-888-495-8501. You are not in trouble — you are the victim.' },
    { q: 'Does the CRA call about owing money?', a: 'The CRA does send letters by mail. They do not call to demand immediate payment, threaten arrest, or ask for gift cards. Hang up on any such call. You can call CRA directly at 1-800-959-8281 to verify any real balance owing.' },
    { q: 'What is the 3-Second Rule?', a: 'When you receive an unexpected call or message creating urgency — pause for 3 seconds. Ask yourself: did I expect this? Is it asking me to act fast? Does it want money or personal information? If yes to any of these, it is likely a scam.' },
  ]},
  'module-3': { title: 'Module 3: Passwords & Biometrics', qas: [
    { q: 'What makes a password strong?', a: 'A strong password is at least 12 characters long and mixes uppercase letters, lowercase letters, numbers, and symbols. It does not include your name, birthday, or pet name. The best passwords are passphrases — four random words together, like PurpleTulip!RainyBoat22.' },
    { q: 'Is it safe to use Face ID or Touch ID?', a: 'Yes. Face ID (face recognition) and Touch ID (fingerprint) are among the safest ways to unlock your device. Your biometric data is stored only on your device — it never goes to Apple servers. Using them is more secure than a 4-digit PIN.' },
    { q: 'Where should I keep a list of my passwords?', a: 'A small notebook kept in a safe place at home is acceptable. Apple Keychain password manager is also very safe and remembers passwords for you. Never save passwords in an email, a text, or a document on your phone.' },
    { q: 'How often should I change my passwords?', a: 'Change a password immediately if you suspect it has been stolen or if a company announces a data breach. Otherwise, using a strong unique password matters more than changing it frequently.' },
  ]},
  'module-4': { title: 'Module 4: App Store Safety', qas: [
    { q: 'How do I know if an app is safe to download?', a: 'Only download apps from the official Apple App Store (the blue icon with letter A). Read reviews and check the developer name. Free apps from well-known companies like TD Bank or Canada Post are generally safe. Avoid apps with very few reviews.' },
    { q: 'Can a virus get onto my iPhone through an app?', a: 'iPhone and iPad viruses from App Store apps are extremely rare. Apple reviews every app before it appears in the store. The main risk is apps that ask for more personal information than they need.' },
    { q: 'What should I do if an app asks to access my contacts, camera, or location?', a: 'Ask yourself: does this app need that? A flashlight app does not need your contacts. A navigation app reasonably needs your location. Tap "Don\'t Allow" if the request seems unnecessary. You can change permissions anytime in Settings > Privacy.' },
    { q: 'How do I delete an app I no longer want?', a: 'Press and hold the app icon until a small menu appears. Tap "Remove App" then "Delete App." This permanently removes the app. Your other apps and photos are not affected.' },
  ]},
  'module-5': { title: 'Module 5: Email & Messages', qas: [
    { q: 'How can I tell if an email is from my real bank?', a: 'Check the sender full email address — not just the display name. Your bank email will come from their official domain (e.g., @rbc.com), not @rbcalert.info or @gmail.com. If unsure, close the email and log in to your bank website directly.' },
    { q: 'Is it safe to click links in emails?', a: 'Treat links in unexpected emails with caution. If the email is urgent, claims something is wrong with your account, or promises a reward — do not click the link. Open a browser and type the company address directly.' },
    { q: 'What is a phishing email?', a: 'Phishing is when a criminal sends a fake email that looks like it is from your bank, Canada Post, Amazon, or the government. The goal is to trick you into entering your password or credit card number. Apply the 3-Second Rule: pause, be suspicious, and go to the real website yourself.' },
    { q: 'What should I do if I accidentally clicked a suspicious link?', a: 'Do not enter any information on the page that opened. Close the tab immediately. If you are unsure, call your bank fraud line. If no financial information was entered, you are likely fine — but changing your email password as a precaution is a good idea.' },
  ]},
  'module-6': { title: 'Module 6: Banking & Transactions', qas: [
    { q: 'Is online banking safe for seniors?', a: 'Yes, when you access it through your bank official app or website — not through a link in an email. Use your home Wi-Fi or mobile data, not public Wi-Fi at a coffee shop. Enable two-factor authentication if your bank offers it.' },
    { q: 'How do I use e-transfer safely?', a: 'Only send e-transfers to people you know personally. Double-check the email address before confirming — one wrong letter sends money to the wrong person. Set up Autodeposit so incoming transfers go straight to your account without a security question.' },
    { q: 'What is the e-transfer overpayment scam?', a: 'Someone sends you a fake e-transfer for more than agreed, then asks you to send the difference back. The original e-transfer was fake — but the money you send back is real. Never send an e-transfer to refund or return part of a payment you received.' },
    { q: 'What should I do if I notice an unexpected transaction on my account?', a: 'Call your bank immediately using the number on the back of your card. Do not use a phone number from an email or pop-up. Report it as fraud. Your bank fraud team can freeze your card and investigate.' },
  ]},
  'module-7': { title: 'Module 7: Photos & Memories', qas: [
    { q: 'Are my photos backed up automatically on an iPhone?', a: 'If iCloud Photos is turned on, your photos are automatically backed up whenever you are on Wi-Fi. Check this in Settings > your name > iCloud > Photos. The first 5GB is free; more storage costs a small monthly fee.' },
    { q: 'Is it safe to share photos on social media?', a: 'Before sharing a photo, think about what personal information it might reveal — your home address, daily routine, or financial situation. Set your social media account to Friends Only so only people you know can see your posts.' },
    { q: 'Can strangers access my photos on my iPhone?', a: 'No, your photos are private on your iPhone unless you share them. Only photos you deliberately share — in a message, email, or social media post — leave your device.' },
    { q: 'How do I delete a photo I do not want?', a: 'Open the Photos app, find the photo, and tap the bin icon in the bottom right corner. The photo moves to "Recently Deleted" and is permanently removed after 30 days. You can also empty it early by going to Recently Deleted and tapping "Delete All."' },
  ]},
  'module-8': { title: 'Module 8: Stay Connected', qas: [
    { q: 'What is the easiest way to video call family?', a: 'FaceTime is the easiest option if you and your family member both have Apple devices. Open FaceTime, tap the + button, type their name or phone number, and tap the video camera icon. It works over Wi-Fi at no extra charge.' },
    { q: 'Can I video call someone who has an Android phone?', a: 'Yes — use WhatsApp. It works on both iPhones and Android phones and is free over Wi-Fi. Once both of you have WhatsApp installed, open a chat, tap the phone icon, and choose the video camera option.' },
    { q: 'Is it safe to use Facebook to stay connected with family?', a: 'Facebook is a common way to stay in touch, but set your privacy settings to Friends Only so only people you approve can see your posts. Do not accept friend requests from people you do not know personally.' },
    { q: 'What is a group video call?', a: 'A group video call lets three or more people see and talk to each other at the same time. FaceTime supports up to 32 people. WhatsApp supports up to 8. Zoom is popular for larger family groups and is free to download.' },
  ]},
  'module-9': { title: 'Module 9: Understanding AI', qas: [
    { q: 'What is artificial intelligence (AI)?', a: 'Artificial intelligence is computer software that can have conversations, answer questions, write text, and generate images. Tools like Siri, Google Assistant, and ChatGPT are all forms of AI. They process enormous amounts of text to predict helpful responses.' },
    { q: 'Can AI give me wrong information?', a: 'Yes. AI tools can sound very confident while being completely wrong — this is called "hallucination." Always check important information from an AI against a trusted source: your doctor, your bank, a government website, or a reliable news outlet.' },
    { q: 'Is it safe to share personal information with AI tools?', a: 'No. Do not share your full name, address, phone number, health information, banking details, or passwords with any AI chatbot. Treat it like a public website — the information you type may be used to train the AI system.' },
    { q: 'What can AI actually help me with?', a: 'AI is genuinely useful for general questions, getting a recipe explained simply, drafting a letter, finding gift ideas, or learning about a topic you are curious about. It is a helpful tool — but not a substitute for professional advice from a doctor, lawyer, or financial adviser.' },
  ]},
  'module-10': { title: 'Module 10: Grocery & Food Delivery', qas: [
    { q: 'Is online grocery shopping safe?', a: 'Yes, when you use the official apps or websites of stores you already know — Walmart.ca, No Frills, or Loblaws. Pay with a credit card (not debit or gift card) so you have fraud protection if something goes wrong.' },
    { q: 'How do I know if a grocery delivery app is legitimate?', a: 'Download apps only from the Apple App Store. Use apps from grocery stores you recognise — Walmart, Instacart, Loblaws Pick-up & Deliver. Avoid clicking links in emails or texts that offer grocery deals — go directly to the store official app or website.' },
    { q: 'What happens if my online grocery order is wrong?', a: 'Contact the store or app customer service. Most major retailers have a satisfaction guarantee and will replace missing items or issue a refund. If you paid by credit card, you can dispute an incorrect charge with your bank.' },
    { q: 'Is it safe to save my credit card in a grocery app?', a: 'It is generally safe on official apps from established stores like Walmart or Loblaws, which use secure encrypted payment systems. Never save your card on a site you found through a link in an email.' },
  ]},
  'module-11': { title: 'Module 11: Ride-Sharing Apps', qas: [
    { q: 'Is Uber or Lyft safe to use?', a: 'Uber and Lyft are generally safe. Before getting in any ride-share vehicle, verify the car licence plate, make, and model match what is shown in the app. The app shows the driver name and photo. You can share your trip status with a trusted contact from within the app.' },
    { q: 'How do I pay for Uber or Lyft?', a: 'Payment is handled automatically through the app using a credit card you register when setting up your account. You do not need cash or a debit card. The charge goes to your credit card after the trip ends.' },
    { q: 'What if I accidentally leave something in a ride-share car?', a: 'Open the Uber or Lyft app, go to your recent trip, and tap "Find lost item." The app will connect you with the driver or their company. Act quickly — within an hour is best.' },
    { q: 'Can I request a female driver on Uber or Lyft?', a: 'At this time, neither Uber nor Lyft allows you to request a driver of a specific gender in Canada. If you have safety concerns, consider travelling with a companion or sharing your trip status with a trusted person.' },
  ]},
  'module-12': { title: 'Module 12: Getting Help', qas: [
    { q: 'Who can I call for free tech help as a senior in Canada?', a: 'Connected Canadians (1-877-304-5813) provides free, friendly telephone tech support specifically for Canadian seniors. Volunteers help with iPads, iPhones, email, video calls, and more. No appointment needed.' },
    { q: 'What is the Canadian Anti-Fraud Centre?', a: 'The Canadian Anti-Fraud Centre (CAFC) is the national hub for reporting fraud and cybercrime. If you have been targeted by a scam, call 1-888-495-8501. Reporting helps protect other Canadians.' },
    { q: 'Can my local library help me with technology?', a: 'Many Ontario public libraries offer free digital literacy programs, one-on-one tech help sessions, and computer access. Contact your local branch to ask about senior tech help programs — they are often free and designed for older adults.' },
    { q: 'What if I feel embarrassed asking for help with technology?', a: 'You never need to feel embarrassed. Millions of Canadians are learning these skills for the first time. Connected Canadians volunteers are trained to be patient and non-judgmental. Asking for help is a sign of good judgement.' },
  ]},
  'module-16-travel-safety': { title: 'Module 16: Travel Safety', qas: [
    { q: 'Is it safe to use public Wi-Fi when I travel?', a: 'Public Wi-Fi at airports, hotels, and cafes is not secure. Avoid logging into your bank or email on public Wi-Fi. Use your mobile data plan instead — it is much more secure. If you must use public Wi-Fi, avoid entering any passwords or financial information.' },
    { q: 'How do I avoid phone scams when I am travelling?', a: 'Be cautious of unsolicited calls claiming your travel booking has a problem. Call the airline, hotel, or travel agency directly using the number on their official website — not the number given to you by the caller.' },
    { q: 'What should I do if my phone is lost or stolen while travelling?', a: 'Use Apple Find My app to locate, lock, or erase your device remotely. Call your bank to put a hold on your cards. Report the theft to local police and get a reference number for insurance.' },
  ]},
  'module-17-ai-research': { title: 'Module 17: AI Research', qas: [
    { q: 'Can I trust health information from an AI?', a: 'Use AI for general background information only — never for a diagnosis or treatment plan. AI tools can be wrong or outdated about Canadian healthcare specifically. Always confirm health information with your doctor, pharmacist, or Health811 (Ontario free health advice line).' },
    { q: 'How do I write a good question for an AI chatbot?', a: 'Be specific. Instead of "tell me about heart health," try "what are the recommended daily steps for a 75-year-old with mild arthritis?" Add context about your situation. Avoid questions that need precise legal or financial answers.' },
    { q: 'What is the difference between a search engine and an AI?', a: 'A search engine (Google, Bing) shows you links to websites where you find the answer yourself. An AI chatbot reads those websites and writes you a direct answer. AI is faster but may be wrong. Search engines let you check the original source yourself.' },
    { q: 'Is it private when I ask an AI a question?', a: 'No — assume anything you type into an AI chatbot may be stored and reviewed by the company. Never share your full name, address, phone number, medical details, or banking information in an AI conversation.' },
  ]},
  'module-visual-ai': { title: 'Show Me! Visual AI Guide', qas: [
    { q: 'What is the Show Me module?', a: 'The Show Me module provides visual, step-by-step demonstrations of common tasks on your iPhone or iPad. Instead of written instructions, you see screenshots and annotated images showing exactly what to tap and where to look.' },
    { q: 'Do I need a special app for the Show Me features?', a: 'No. Everything in the Show Me module works directly in your web browser on your iPad or iPhone. You do not need to download anything extra.' },
    { q: 'Can I print the Show Me visual guides?', a: 'Yes. Each visual guide has a Print button at the bottom. When you print, only the images and steps are shown — without the navigation menus. These printed guides are useful to keep beside your device while practising.' },
  ]},
};

for (const [fname, data] of Object.entries(moduleQAs)) {
  const path = base + fname + '.html';
  if (!fs.existsSync(path)) { console.log('SKIP:', fname); continue; }
  let c = fs.readFileSync(path, 'utf8');
  if (c.includes('quick-answers-accordion')) { console.log('ALREADY:', fname); continue; }

  const schemaEntries = data.qas.map(qa =>
    `      {"@type":"Question","name":${JSON.stringify(qa.q)},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify(qa.a)}}}`
  ).join(',\n');

  const accordionItems = data.qas.map(qa => `
        <div class="qa-item">
          <button class="qa-question" aria-expanded="false">
            <span>${qa.q}</span>
            <span class="qa-chevron" aria-hidden="true">&#9660;</span>
          </button>
          <div class="qa-answer" hidden>
            <p>${qa.a}</p>
          </div>
        </div>`).join('');

  const block = `
      <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
${schemaEntries}
        ]
      }
      <\/script>
      <div class="quick-answers-accordion" id="quick-answers">
        <h2 data-en="Quick Answers" data-fr="R&#233;ponses rapides">Quick Answers</h2>
        <p class="module-byline" style="margin-bottom:0.75rem" data-en="Common questions about this topic" data-fr="Questions courantes sur ce sujet">Common questions about this topic</p>${accordionItems}
      </div>`;

  let updated = c.replace('      <div class="sources-block">', block + '\n      <div class="sources-block">');
  if (updated === c) updated = c.replace('    </main>', block + '\n    </main>');
  if (updated !== c) { fs.writeFileSync(path, updated, 'utf8'); console.log('OK:', fname); }
  else { console.log('NO MATCH:', fname); }
}
console.log('Phase 3 accordion injection complete.');
