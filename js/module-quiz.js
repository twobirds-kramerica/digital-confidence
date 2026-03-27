/* =============================================================
   Digital Confidence Centre — Module Quiz System
   5-question quiz at end of every module
   Pass score: 4/5
   Stores pass/fail per module in localStorage (dc-quiz-m[N]-passed)
   Also stores score for adaptive final quiz
   ============================================================= */
(function () {
  'use strict';

  /* ── Question bank — 5 questions per module ─────────────────────────── */
  var QUESTIONS = {
    1: [
      { q: 'What is the most reliable way to exit an app on any device?',
        opts: ['Pull out the battery', 'Press the Home button or swipe up', 'Turn off the Wi-Fi', 'Wait for it to close itself'], ans: 1 },
      { q: 'You see a scary message saying your device has a virus. What should you do first?',
        opts: ['Call the number on the screen', 'Press the Home button to leave the page', 'Type in your password to fix it', 'Turn off your phone immediately'], ans: 1 },
      { q: 'What does it mean when an app is "frozen" (not responding)?',
        opts: ['The device temperature is too cold', 'The app has stopped working temporarily', 'You need to buy a new device', 'Your internet is broken'], ans: 1 },
      { q: 'How do you close an app completely on an iPad?',
        opts: ['Delete the app icon', 'Double-tap Home (or swipe up from the bottom) and swipe the app away', 'Shake the iPad', 'Turn off Wi-Fi'], ans: 1 },
      { q: 'If you tap something by mistake and a page opens that worries you, what is the fastest solution?',
        opts: ['Call 911', 'Tap the back arrow or press Home to leave the page', 'Smash the screen', 'Wait for 10 minutes'], ans: 1 }
    ],
    2: [
      { q: 'A caller says they are from "Microsoft Support" and need your password to fix a problem. What do you do?',
        opts: ['Give them your password — Microsoft needs it', 'Hang up. Real companies never ask for passwords by phone.', 'Ask them to call back tomorrow', 'Give them your email address instead'], ans: 1 },
      { q: 'What is "phishing"?',
        opts: ['A type of internet fishing game', 'A scam that tries to trick you into giving personal information', 'A way to make your phone faster', 'A Canadian government programme'], ans: 1 },
      { q: 'You receive an email saying you have won $500. What is the most likely truth?',
        opts: ['You really won — claim it immediately', 'It is almost certainly a scam — delete it', 'Forward it to all your friends', 'Reply to find out more details'], ans: 1 },
      { q: 'Which of these is a sign of a fake website?',
        opts: ['It has a padlock icon', 'It asks for your banking password in an email link', 'It loads quickly', 'It has a phone number listed'], ans: 1 },
      { q: 'How long should you wait before reporting a scam attempt to the Canadian Anti-Fraud Centre?',
        opts: ['30 days', '1 year', 'Report it as soon as possible', 'Only if you lost money'], ans: 2 }
    ],
    3: [
      { q: 'What makes a password strong?',
        opts: ['Using your pet\'s name', 'A mix of upper and lower case letters, numbers, and symbols — at least 12 characters', 'Using your birthday', 'A single common word'], ans: 1 },
      { q: 'What is two-factor authentication (2FA)?',
        opts: ['A second password you create', 'A security step where a code is sent to your phone to confirm it\'s really you', 'Two people sharing one account', 'A type of antivirus software'], ans: 1 },
      { q: 'Face ID or a fingerprint is safer than a PIN because:',
        opts: ['It is quicker', 'No one else has your face or fingerprint', 'You can share it with family', 'It never needs updating'], ans: 1 },
      { q: 'You have the same password for your email and your bank. This is:',
        opts: ['A good idea — easier to remember', 'Risky — if one is stolen, both are at risk', 'Required by the bank', 'Recommended by Apple'], ans: 1 },
      { q: 'A password manager does what?',
        opts: ['Resets your password every day', 'Stores your passwords securely so you only need one master password', 'Shares passwords with your family', 'Sends passwords to Apple for safekeeping'], ans: 1 }
    ],
    4: [
      { q: 'Where is the safest place to download apps on an iPhone or iPad?',
        opts: ['Any website on the internet', 'Only from the Apple App Store', 'From email links', 'From your friend\'s device via Bluetooth'], ans: 1 },
      { q: 'Before installing a new app, you should check:',
        opts: ['The app\'s colour scheme', 'Reviews, the developer\'s name, and what permissions it requests', 'Whether it has a Canadian flag', 'How many photos it has'], ans: 1 },
      { q: 'An app asks for permission to access your contacts and location. You should:',
        opts: ['Always allow everything', 'Think about whether the app actually needs this — deny what it does not need', 'Delete the app immediately', 'Allow location but never contacts'], ans: 1 },
      { q: 'Why is it important to keep your apps updated?',
        opts: ['Updates add more ads', 'Updates fix security problems and bugs', 'Updates delete your photos', 'Updates make the app smaller'], ans: 1 },
      { q: 'A pop-up says you must install an app NOW or your phone will be damaged. You should:',
        opts: ['Install it immediately', 'Close the pop-up — this is a scam', 'Call your phone provider', 'Turn off Wi-Fi first, then install it'], ans: 1 }
    ],
    5: [
      { q: 'What is spam email?',
        opts: ['A type of canned meat', 'Unwanted email, usually trying to sell something or scam you', 'Email from the government', 'A subscription newsletter'], ans: 1 },
      { q: 'You receive an email asking you to click a link to "verify your account." The safest response is:',
        opts: ['Click the link — it probably is your bank', 'Do not click — log in directly to your account through the official website or app', 'Reply to ask if it is real', 'Forward it to a friend'], ans: 1 },
      { q: 'What does BCC mean in an email?',
        opts: ['Big Carbon Copy', 'Blind Carbon Copy — sends to someone without other recipients seeing', 'Back-up Copy Check', 'British Columbia Communication'], ans: 1 },
      { q: 'If you receive a text message from an unknown number with a link, you should:',
        opts: ['Tap the link to find out what it is', 'Delete the message — do not tap any links from unknown senders', 'Reply to ask who sent it', 'Forward it to 911'], ans: 1 },
      { q: 'Which is the most important thing to do when you have finished using your email on a shared computer?',
        opts: ['Clear the browser cache', 'Sign out / log out of your account', 'Delete all your messages', 'Change your password every time'], ans: 1 }
    ],
    6: [
      { q: 'What is e-Interac (Interac e-Transfer)?',
        opts: ['A way to pay for goods at a store with cash', 'A way to send money to another person using email or a phone number', 'A type of credit card', 'A Canadian government benefit payment'], ans: 1 },
      { q: 'Which of these is a sign that an online shopping site may not be safe?',
        opts: ['It has https:// at the start of the address', 'The price is extremely low and there are no reviews', 'It asks you to create an account', 'It is listed on Google'], ans: 1 },
      { q: 'You notice an unfamiliar transaction on your bank statement. What should you do first?',
        opts: ['Wait to see if it fixes itself', 'Contact your bank immediately to report it', 'Post about it on Facebook', 'Move all your money to a different account'], ans: 1 },
      { q: 'What is the purpose of a credit score?',
        opts: ['It is your social media rating', 'It shows lenders how reliably you pay back borrowed money', 'It measures how much money you have saved', 'It is a government ID number'], ans: 1 },
      { q: 'To pay safely online, the website address should start with:',
        opts: ['http://', 'www://', 'https://', 'ftp://'], ans: 2 }
    ],
    7: [
      { q: 'Where are photos stored when you take a picture on your iPhone?',
        opts: ['Only in your email', 'In the Photos app on your device', 'Automatically on Facebook', 'In your text messages'], ans: 1 },
      { q: 'What does "iCloud Backup" do for your photos?',
        opts: ['Deletes your oldest photos automatically', 'Saves a copy of your photos to Apple\'s servers so they are safe if your phone is lost', 'Shares your photos with Apple employees', 'Compresses your photos to save space'], ans: 1 },
      { q: 'How do you share a photo with a family member using an iPhone?',
        opts: ['Print it out and mail it', 'Open the photo, tap the Share button, and choose Messages, Email, or AirDrop', 'Take a photo of your screen', 'Ask Apple customer service to send it'], ans: 1 },
      { q: 'If you accidentally delete a photo, where can you find it (within 30 days)?',
        opts: ['It is gone forever', 'In the "Recently Deleted" folder in the Photos app', 'In your email', 'In the App Store'], ans: 1 },
      { q: 'What is a "shared album" in the Photos app?',
        opts: ['An album that anyone in the world can see', 'A private album you can share with specific family or friends', 'An album that automatically shares to social media', 'A paid feature only for iPhone Pro users'], ans: 1 }
    ],
    8: [
      { q: 'FaceTime is a video calling app available on:',
        opts: ['All Android phones', 'Only Apple devices (iPhone, iPad, Mac)', 'Any smartphone if you pay a subscription', 'Windows computers only'], ans: 1 },
      { q: 'WhatsApp allows you to call and message people:',
        opts: ['Only in Canada', 'Anywhere in the world, for free, using your internet connection', 'Only to other WhatsApp users in your city', 'Only if they have an iPhone'], ans: 1 },
      { q: 'Before a video call with family, what is a good habit?',
        opts: ['Update all your apps', 'Make sure your device is charged, your camera is clean, and you are in a well-lit spot', 'Turn off notifications on all apps', 'Change your Wi-Fi password'], ans: 1 },
      { q: 'How do you mute yourself during a Zoom call?',
        opts: ['Put your finger over the microphone', 'Click or tap the microphone icon at the bottom of the screen', 'Unplug your headphones', 'Close the Zoom app'], ans: 1 },
      { q: 'Someone you met online says they love you and asks you to send them money. This is most likely:',
        opts: ['A genuine romance developing online', 'A romance scam — a common fraud targeting older adults', 'Normal online behaviour', 'A government assistance programme'], ans: 1 }
    ],
    9: [
      { q: 'What is artificial intelligence (AI)?',
        opts: ['A type of robot that can clean your house', 'Computer systems that can perform tasks that normally require human thinking, like answering questions', 'A new type of operating system replacing Windows', 'A social media platform'], ans: 1 },
      { q: 'Siri is an example of:',
        opts: ['A security camera system', 'A voice-activated AI assistant built into Apple devices', 'A paid subscription service', 'A Canadian government app'], ans: 1 },
      { q: 'If an AI gives you health advice, you should:',
        opts: ['Follow it immediately — AI is always accurate', 'Use it as a starting point, but always confirm with a real doctor or pharmacist', 'Ignore it completely — AI is never right', 'Share it on Facebook for others to use'], ans: 1 },
      { q: 'A "deepfake" video is:',
        opts: ['A video filmed underwater', 'A video that uses AI to make someone appear to say or do something they never did', 'A type of news broadcast', 'A training video for divers'], ans: 1 },
      { q: 'What is the main privacy concern with AI voice assistants like Siri?',
        opts: ['They drain your battery too quickly', 'They may be listening for their "wake word" and could accidentally record conversations', 'They cost too much money per month', 'They replace your mobile data'], ans: 1 }
    ],
    10: [
      { q: 'What does "click and collect" mean when ordering groceries online?',
        opts: ['You click on an ad and they deliver for free', 'You order online and pick up your groceries at the store at a chosen time', 'A loyalty points programme', 'A feature that auto-reorders your groceries'], ans: 1 },
      { q: 'When ordering food delivery online, which is the safest payment method?',
        opts: ['Giving your credit card number over the phone to the driver', 'Paying through the secure app or website checkout', 'Sending an Interac e-Transfer to the restaurant directly', 'Paying cash to any person who arrives'], ans: 1 },
      { q: 'You receive a delivery notification asking you to pay a customs fee to release your parcel. This is likely:',
        opts: ['A legitimate fee — pay it immediately', 'A common courier scam — do not pay without verifying with the real delivery company', 'A government levy you must pay by law', 'An error from Canada Post that can be disputed'], ans: 1 },
      { q: 'What should you do if a food delivery driver\'s name does not match the one shown in the app?',
        opts: ['Let them in — probably a substitute', 'Do not accept the delivery and report it through the app', 'Ask them for their employee ID', 'Rate them one star'], ans: 1 },
      { q: 'PC Optimum, Air Miles, and Scene+ are examples of:',
        opts: ['Banking apps', 'Canadian grocery and retail loyalty rewards programmes', 'Government assistance programmes', 'Insurance products'], ans: 1 }
    ],
    11: [
      { q: 'Before getting in a rideshare car (Uber/Lyft), you should:',
        opts: ['Get in quickly to save time', 'Check the licence plate, driver\'s name, and photo in the app match the car and driver', 'Share your trip details on social media', 'Pay in cash rather than the app'], ans: 1 },
      { q: 'Surge pricing on Uber means:',
        opts: ['The driver is speeding', 'Fares are temporarily higher due to high demand', 'Your account has been charged incorrectly', 'A discount is available'], ans: 1 },
      { q: 'If you leave something in an Uber, how do you recover it?',
        opts: ['Call 911', 'Use the "Find lost item" feature in the Uber app to contact the driver', 'Post in a Facebook group', 'Go back to where the trip started'], ans: 1 },
      { q: 'The safest way to book an accessible ride with a mobility aid is:',
        opts: ['Wave from the street', 'Specify your accessibility need when booking in the app or call a mobility-specific service', 'Book a regular ride and hope the driver helps', 'Order two rides at once'], ans: 1 },
      { q: 'Why should you share your trip details with a family member before a rideshare?',
        opts: ['So they can pay your fare', 'As a safety measure so someone knows your route and expected arrival time', 'The app requires a second contact', 'To get a discount code'], ans: 1 }
    ],
    12: [
      { q: 'When waiting on hold with a customer service line, what is a useful strategy?',
        opts: ['Hang up and try a different company', 'Press 0 or say "representative" to reach a person faster, or use a callback option', 'Call 911 for help', 'Write an angry letter instead'], ans: 1 },
      { q: 'Under Canadian consumer protection law, you generally have the right to:',
        opts: ['Return any product for any reason forever', 'A refund or exchange if a product is defective or not as described', 'Sue any company in the USA', 'A free replacement after 5 years'], ans: 1 },
      { q: 'A technician says they need "remote access" to your device to fix a problem you did not ask about. You should:',
        opts: ['Allow it — they are probably from Apple', 'Refuse. Never allow remote access from someone who contacted you unsolicited.', 'Give access but watch what they do', 'Ask them to call back tomorrow'], ans: 1 },
      { q: 'If a family helper is managing your devices, it is good practice to:',
        opts: ['Give them your banking password too', 'Set clear boundaries about what they can access, and review your accounts regularly', 'Let them change all your passwords', 'Delete your accounts when they leave'], ans: 1 },
      { q: 'The best way to document a dispute with a company is to:',
        opts: ['Tell your friends', 'Keep written records of all calls, emails, and receipts with dates and names', 'Call the company every day', 'Post a negative review immediately'], ans: 1 }
    ],
    13: [
      { q: 'On Facebook, "Friends only" privacy means:',
        opts: ['Anyone on the internet can see your posts', 'Only people you have accepted as Facebook friends can see your posts', 'Only your family can see your posts', 'Facebook employees can see your posts'], ans: 1 },
      { q: 'You receive a Facebook friend request from someone claiming to be a person you already know. The safest response is:',
        opts: ['Accept immediately — they must be genuine', 'Check with the real person another way (phone call) before accepting', 'Ignore it forever', 'Report the request to the police'], ans: 1 },
      { q: 'On Facebook Marketplace, a buyer offers to pay more than your asking price by cheque. This is:',
        opts: ['Great luck — accept immediately', 'A common overpayment scam — do not accept', 'A special buyer protection programme', 'Normal marketplace behaviour'], ans: 1 },
      { q: 'Instagram is primarily designed for:',
        opts: ['Sharing long text articles', 'Sharing photos and short videos', 'Online banking', 'Video calls only'], ans: 1 },
      { q: 'What is "catfishing"?',
        opts: ['Fishing for catfish in a lake', 'Creating a fake online identity to deceive someone into a relationship', 'A type of social media filter', 'A privacy setting on Instagram'], ans: 1 }
    ],
    14: [
      { q: 'A smart thermostat like a Nest or ecobee allows you to:',
        opts: ['Only control heating from home', 'Control your home\'s temperature remotely from your phone', 'Replace your furnace entirely', 'Use less electricity by turning off appliances'], ans: 1 },
      { q: 'Why is it important to change the default password on a new smart home device?',
        opts: ['Default passwords are hard to remember', 'Default passwords are publicly known and easy for hackers to exploit', 'It improves the device\'s speed', 'The manufacturer requires it for warranty'], ans: 1 },
      { q: 'The Ontario Enbridge Home Efficiency Rebate programme offers:',
        opts: ['Free smart devices to all seniors', 'Rebates of up to $5,000 on home energy improvements', 'Free furnace installation for all homeowners', 'A grant for solar panels'], ans: 1 },
      { q: 'A video doorbell camera stores footage:',
        opts: ['Only on a TV inside your home', 'In the cloud (internet) and/or a local storage device, depending on the brand', 'At the police station automatically', 'Nowhere — it is only for live viewing'], ans: 1 },
      { q: 'Before buying a smart home device, you should check:',
        opts: ['That it matches your furniture colour', 'Whether it is compatible with your existing devices and what data it collects', 'That it has a Canadian flag on the box', 'Whether it was featured on TV'], ans: 1 }
    ],
    15: [
      { q: 'In Ontario, you can book a telehealth appointment through:',
        opts: ['Only by going to the hospital in person first', 'Through your family doctor\'s patient portal, or services like Maple or Teladoc', 'Only through a private paid service', 'The Ontario government automatically sets them up'], ans: 1 },
      { q: 'Ontario Telehealth (Health811) provides:',
        opts: ['Emergency ambulance dispatch', 'Free, 24/7 telephone health advice from a registered nurse', 'Prescription delivery service', 'Hospital bed booking'], ans: 1 },
      { q: 'MyChart is an online portal that allows patients to:',
        opts: ['Order medications without a prescription', 'View their own medical records, test results, and appointment history', 'Chat with other patients', 'Access their OHIP billing history'], ans: 1 },
      { q: 'When joining a video appointment with your doctor, what should you prepare in advance?',
        opts: ['Nothing — just wait for them to call', 'A list of your medications, current symptoms, and a quiet well-lit space', 'Your doctor\'s home address', 'A printed copy of your health card'], ans: 1 },
      { q: 'Your OHIP card is:',
        opts: ['A debit card you pay with at the pharmacy', 'Your Ontario Health Insurance Plan card — shows you are covered for publicly funded health services', 'A credit card for medical expenses', 'A senior\'s transit pass'], ans: 1 }
    ],
    16: [
      { q: 'Before travelling internationally, you should back up your devices because:',
        opts: ['Customs may delete your photos', 'Devices can be lost, stolen, or damaged while travelling', 'Airlines require it before boarding', 'It speeds up your phone during the flight'], ans: 1 },
      { q: 'Using public Wi-Fi in a hotel or airport is:',
        opts: ['Always completely safe', 'Risky for banking or sharing personal information — use a VPN or your phone\'s cellular data instead', 'Required by law in Ontario', 'Only unsafe in the USA'], ans: 1 },
      { q: 'A "travel scam" might look like:',
        opts: ['Your hotel room key not working', 'Fake booking websites that take your money without providing accommodation', 'A long queue at the airport', 'Weather delays on your flight'], ans: 1 },
      { q: 'To avoid international roaming charges on your phone, you can:',
        opts: ['Turn off your phone for the entire trip', 'Buy a local SIM card, use a travel data plan from your carrier, or turn off data roaming', 'Only use the phone in your hotel room', 'Call your carrier from abroad — it is free'], ans: 1 },
      { q: 'The most important document to have a digital and printed copy of while travelling is:',
        opts: ['Your library card', 'Your passport (photo page), travel insurance details, and emergency contacts', 'Your bank statement', 'Your home address'], ans: 1 }
    ],
    17: [
      { q: 'ChatGPT, Claude, and Google Gemini are examples of:',
        opts: ['Social media platforms', 'AI language models that can answer questions and help with writing', 'Antivirus software', 'Operating systems'], ans: 1 },
      { q: 'When an AI gives you a medical, legal, or financial answer, you should:',
        opts: ['Trust it completely — AI has access to all current information', 'Use it as a starting point but verify with a qualified professional', 'Never ask AI about these topics', 'Print the answer and bring it to your doctor'], ans: 1 },
      { q: 'AI tools can "hallucinate," which means they sometimes:',
        opts: ['Create visual art', 'Generate confident-sounding but completely false information', 'Refuse to answer difficult questions', 'Require you to pay for accurate answers'], ans: 1 },
      { q: 'To protect your privacy when using AI tools, you should:',
        opts: ['Use your full legal name and address so they can personalise answers', 'Avoid sharing personal details like your home address, SIN, or financial information', 'Always share your email address', 'Use the same account for everything'], ans: 1 },
      { q: 'A good way to check whether an AI\'s answer is accurate is to:',
        opts: ['Ask the AI the same question three times', 'Cross-reference the answer with a trusted website or authoritative source', 'Ask a different AI the same question', 'Trust it if it sounds confident'], ans: 1 }
    ]
  };

  /* ── Detect current module ───────────────────────────────────────────── */
  var path = window.location.pathname + window.location.href;
  var modMatch = path.match(/module-(\d+)/);
  if (!modMatch) return;
  var modNum = parseInt(modMatch[1], 10);
  if (!QUESTIONS[modNum]) return;

  var isFr = (localStorage.getItem('dc-lang') || navigator.language || 'en').startsWith('fr');

  /* ── Inject quiz after the last <h2> or before the module-learn-more section ── */
  document.addEventListener('DOMContentLoaded', function () {
    /* Don't show if already passed */
    if (localStorage.getItem('dc-quiz-m' + modNum + '-passed') === 'true') {
      injectPassedBadge();
      return;
    }
    injectQuizTrigger();
  });

  function injectPassedBadge() {
    var main = document.querySelector('.main-content, main, #main-content, .page-content, body');
    if (!main) return;
    var badge = document.createElement('div');
    badge.style.cssText = [
      'background:#e8f5e9;border:2px solid #2e7d32;border-radius:10px',
      'padding:16px 20px;margin:24px 0;display:flex;align-items:center;gap:12px',
      'font-size:1rem'
    ].join(';');
    badge.innerHTML = '<span style="font-size:1.5rem">✅</span>' +
      '<div><strong style="color:#1b5e20">' +
      (isFr ? 'Module terminé — Quiz réussi&nbsp;!' : 'Module complete — Quiz passed!') +
      '</strong><br><span style="color:#555;font-size:0.9rem">' +
      (isFr ? 'Vous avez réussi le quiz de ce module.' : 'You demonstrated understanding of this module.') +
      '</span></div>';
    var footer = main.querySelector('footer, .site-footer');
    if (footer) main.insertBefore(badge, footer);
    else main.appendChild(badge);
  }

  function injectQuizTrigger() {
    var main = document.querySelector('.main-content, main, #main-content, .page-content');
    if (!main) return;

    var wrapper = document.createElement('div');
    wrapper.id = 'module-quiz-wrapper';
    wrapper.style.cssText = 'margin:32px 0;';

    var btn = document.createElement('button');
    btn.id = 'module-quiz-start';
    btn.style.cssText = [
      'background:#1565C0;color:#fff;font-size:1.05rem;font-weight:700',
      'border:none;border-radius:10px;padding:16px 28px;cursor:pointer;width:100%',
      'max-width:400px;display:block;margin:0 auto'
    ].join(';');
    btn.textContent = isFr ? '📝 Tester mes connaissances (5 questions)' : '📝 Test my understanding (5 questions)';

    var sub = document.createElement('p');
    sub.style.cssText = 'text-align:center;color:#777;font-size:0.88rem;margin-top:8px';
    sub.textContent = isFr
      ? 'Répondez à 4 questions sur 5 pour déverrouiller «\u00a0Module terminé\u00a0».'
      : 'Answer 4 out of 5 correctly to unlock "Mark as complete".';

    wrapper.appendChild(btn);
    wrapper.appendChild(sub);

    var footer = main.querySelector('footer, .site-footer');
    if (footer) main.insertBefore(wrapper, footer);
    else main.appendChild(wrapper);

    btn.addEventListener('click', function () {
      showQuiz(wrapper);
    });
  }

  function showQuiz(container) {
    var questions = shuffle(QUESTIONS[modNum].slice());
    var current = 0;
    var score = 0;
    var answers = [];

    function renderQ() {
      var q = questions[current];
      var html = '<div id="mq-box" style="background:#f9f9f9;border:1px solid #ddd;border-radius:12px;padding:24px 28px;margin:0">' +
        '<p style="font-size:0.8rem;color:#888;margin:0 0 8px">' +
          (isFr ? 'Question ' : 'Question ') + (current + 1) + ' / ' + questions.length +
        '</p>' +
        '<p style="font-weight:700;font-size:1.05rem;margin:0 0 20px;line-height:1.5">' + q.q + '</p>' +
        '<div id="mq-opts">';

      q.opts.forEach(function (opt, i) {
        html += '<button class="mq-opt" data-i="' + i + '" style="' + [
          'display:block;width:100%;text-align:left;padding:12px 16px',
          'background:#fff;border:2px solid #ddd;border-radius:8px',
          'margin-bottom:10px;cursor:pointer;font-size:0.95rem;transition:all 0.15s'
        ].join(';') + '">' + opt + '</button>';
      });

      html += '</div></div>';
      container.innerHTML = html;

      container.querySelectorAll('.mq-opt').forEach(function (btn) {
        btn.addEventListener('mouseenter', function () { btn.style.borderColor = '#1565C0'; });
        btn.addEventListener('mouseleave', function () { btn.style.borderColor = '#ddd'; });
        btn.addEventListener('click', function () {
          var chosen = parseInt(btn.getAttribute('data-i'), 10);
          answers.push(chosen);
          if (chosen === q.ans) score++;

          /* Highlight correct/wrong */
          container.querySelectorAll('.mq-opt').forEach(function (b, idx) {
            b.disabled = true;
            if (idx === q.ans) b.style.background = '#e8f5e9';
            if (idx === chosen && chosen !== q.ans) b.style.background = '#ffebee';
          });

          setTimeout(function () {
            current++;
            if (current < questions.length) {
              renderQ();
            } else {
              showResult();
            }
          }, 800);
        });
      });
    }

    function showResult() {
      var passed = score >= 4;
      localStorage.setItem('dc-quiz-m' + modNum + '-score', score);
      localStorage.setItem('dc-quiz-m' + modNum + '-passed', passed ? 'true' : 'false');
      if (passed) {
        localStorage.setItem('dc-module-' + modNum + '-complete', 'true');
      }

      var html = '<div style="text-align:center;background:#f9f9f9;border-radius:12px;padding:32px 24px">';
      if (passed) {
        html += '<div style="font-size:2.5rem;margin-bottom:12px">✅</div>';
        html += '<h3 style="color:#1b5e20;margin:0 0 10px">' +
          (isFr ? 'Quiz réussi\u00a0!' : 'Module quiz passed!') + '</h3>';
        html += '<p style="color:#555;margin:0 0 20px">' + score + ' / ' + questions.length + ' — ' +
          (isFr ? 'Vous avez vraiment compris ce module.' : 'You really understood this one.') + '</p>';
        html += '<button onclick="this.closest(\'#module-quiz-wrapper\').innerHTML=\'<p style=text-align:center>✅ ' +
          (isFr ? 'Module terminé&nbsp;!' : 'Module complete!') + '</p>\'" style="' + ctaStyle('#2e7d32') + '">' +
          (isFr ? 'Marquer comme terminé ✅' : 'Mark as complete ✅') + '</button>';
      } else {
        html += '<div style="font-size:2.5rem;margin-bottom:12px">📖</div>';
        html += '<h3 style="color:#e65100;margin:0 0 10px">' +
          (isFr ? 'Presque&nbsp;! Essayez encore.' : 'Almost there. Try again.') + '</h3>';
        html += '<p style="color:#555;margin:0 0 20px">' + score + ' / ' + questions.length + ' — ' +
          (isFr ? 'Relisez le module et réessayez — sans pression.' : 'Review the module and try again — no pressure.') + '</p>';
        html += '<button id="mq-retry" style="' + ctaStyle('#e65100') + '">' +
          (isFr ? 'Réessayer →' : 'Try again →') + '</button>';
      }
      html += '</div>';
      container.innerHTML = html;

      var retryBtn = document.getElementById('mq-retry');
      if (retryBtn) {
        retryBtn.addEventListener('click', function () {
          score = 0; current = 0; answers = [];
          questions = shuffle(QUESTIONS[modNum].slice());
          renderQ();
        });
      }
    }

    renderQ();
  }

  function ctaStyle(bg) {
    return 'background:' + bg + ';color:#fff;border:none;border-radius:8px;' +
      'padding:14px 24px;font-size:1rem;font-weight:700;cursor:pointer;width:100%;max-width:320px';
  }

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr;
  }

})();
