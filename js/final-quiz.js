/* DCC v2 - Final Assessment runner (Sprint V2-5).
   Consciously ported from js/final-quiz.js (old site) per rebuild-plan
   risk 7 (no wholesale old-JS import; this file is the one conscious port).
   Changes from the original:
   - "Continue to Resources" links point at the v2 support directory
     (resources.html is deferred old-site content).
   - The adaptive skip notice uses the .quiz-milestone class instead of
     hard-coded light-mode inline colours (v2 has dark mode).
   - Same localStorage keys as the original (finalQuizScore, finalQuizDate,
     userName, dc-quiz-m*-passed, dc-progress-m*) so progress carries over
     (rebuild-plan risk 11). */
/* ============================================
   Digital Confidence Centre — Final Quiz
   v8 — 60 scenario-based "What would you do?"
        questions covering modules 1–11, 13–15, 2.5
   Passing score: 74% (44/60)
   Sprint 8: added 18 new questions for
             modules 13, 14, 15, and 2.5
   ============================================ */

var DC_QUIZ = (function () {
  'use strict';

  /* ── 30 Scenario-Based Questions ──────────────────────── */
  var questions = [

    /* MODULE 1 — The Escape Hatch */
    {
      module: 'Module 1: The Escape Hatch',
      q: 'You\'re reading a recipe on your iPad when a loud alarm sounds and your screen fills with flashing red text: "CRITICAL VIRUS DETECTED! Call 1-888-555-0123 IMMEDIATELY!" What do you do?',
      options: [
        'Call the number right away — this sounds serious',
        'Press the Home button or swipe up to return to your Home screen, then ignore the message',
        'Turn off your iPad and leave it off for a few days',
        'Give someone on the phone remote access to your iPad to fix it'
      ],
      correct: 1,
      explain: 'This is a fake alert — a very common scare tactic. Your Escape Hatch (Home button or swipe-up) instantly closes the website causing the alarm. Real viruses never announce themselves with pop-up phone numbers. Your iPad is completely fine.'
    },
    {
      module: 'Module 1: The Escape Hatch',
      q: 'An app on your iPad completely freezes — you can\'t tap anything and the screen won\'t respond. What\'s the right sequence to try?',
      options: [
        'Smash the screen firmly several times to wake it up',
        'First press Home (or swipe up), then if still frozen force-quit the app, then restart if needed',
        'Immediately take it to the Apple Store — it must be broken',
        'Remove the SIM card and reinsert it'
      ],
      correct: 1,
      explain: 'The escalation ladder: Home button first (gentlest), then force-quit the frozen app by swiping it away in the App Switcher, then restart if needed. This handles 99% of frozen-screen situations without any repair.'
    },

    /* MODULE 2 — Security Shield */
    {
      module: 'Module 2: Security Shield',
      q: 'You get an email from "TD Bank Security Team" saying your account is suspended. The subject says "URGENT: Verify your identity NOW." The link in the email goes to "td-bank-secure-login.com". What do you do?',
      options: [
        'Click the link quickly — your account might be blocked',
        'Reply to the email asking if it\'s legitimate',
        'Close the email, open a fresh browser tab, and type your bank\'s real web address yourself',
        'Forward it to family members to see if they got it too'
      ],
      correct: 2,
      explain: 'The domain "td-bank-secure-login.com" is NOT TD Bank\'s real website (which is td.com). Scammers create convincing fake websites to steal your login. Never click bank links in emails — always type the address yourself.'
    },
    {
      module: 'Module 2: Security Shield',
      q: 'Your grandson calls you in a panic. He says he\'s been arrested in another city and needs you to buy $2,000 in gift cards immediately to pay bail. He begs you not to tell anyone. What is this?',
      options: [
        'A real emergency — buy the gift cards right away to help him',
        'The "Grandparent Scam." Hang up, then call your grandson directly on his real number to verify',
        'Probably a prank from his friends',
        'A legitimate bail process — gift cards are commonly used for bail'
      ],
      correct: 1,
      explain: 'This is the "Grandparent Scam" — one of Canada\'s most common elder fraud tactics. Legitimate bail processes never use gift cards. Always verify by calling your grandchild directly on their known number before doing anything.'
    },

    /* MODULE 3 — Passwords */
    {
      module: 'Module 3: Passwords & Security',
      q: 'You\'re setting up a new account. The site asks you to create a password. Which password would best protect your account?',
      options: [
        'Your name plus your birth year: "Margaret1952"',
        'The word "password" (easy to remember)',
        'A random mix like "BlueSky!River9Maple" — something you can picture but no one could guess',
        'Your phone number, since you always remember it'
      ],
      correct: 2,
      explain: 'Good passwords are long, mix word types, and aren\'t personal information. "BlueSky!River9Maple" uses three random words with a symbol and number — easy for you to visualize but essentially impossible to guess. Personal info like birthdays and phone numbers are the first things hackers try.'
    },
    {
      module: 'Module 3: Passwords & Security',
      q: 'After entering your email password, your email provider sends a 6-digit code to your phone and asks you to enter it before logging in. You didn\'t request this. What\'s happening?',
      options: [
        'Your account has been hacked — change your password immediately',
        'Your email provider is testing a new feature you should skip',
        'This is two-factor authentication working correctly — enter the code to log in securely',
        'This is a phishing attempt — do not enter the code'
      ],
      correct: 2,
      explain: 'Two-factor authentication (2FA) is a security feature that protects you. When YOU log in, the system sends a code to your phone to confirm it\'s really you. This is a good thing — enter the code. If you receive a code when you didn\'t try to log in, that\'s when to worry (someone else tried).'
    },

    {
      module: 'Module 3: Passwords & Security',
      q: 'You have just turned on two-factor authentication for your Gmail account. An hour later, you receive a phone call from someone claiming to be from Google. They say there is a problem with your account and ask you to read them the 6-digit code that just arrived by text message. What do you do?',
      options: [
        'Read them the code — Google needs it to fix your account',
        'Ask them to call back tomorrow to give you time to think',
        'Hang up immediately. A legitimate company will never call to ask for your verification code. This is a scam.',
        'Give them only the first 3 digits of the code to verify they are real'
      ],
      correct: 2,
      explain: 'This is a "real-time phishing" scam. The caller is trying to log into YOUR account right now and needs you to hand them the 2FA code. Google, your bank, and any legitimate company will NEVER call you to ask for a verification code. The moment someone asks for your 6-digit code over the phone, hang up. Even giving part of it is dangerous.'
    },

    /* MODULE 4 — App Store Safety */
    {
      module: 'Module 4: App Store Safety',
      q: 'You want to download a free Sudoku game. You find one on the App Store with 4.8 stars and 50,000 reviews. But when you tap it, it asks for permission to access your microphone, contacts, and location. What should you do?',
      options: [
        'Allow everything — popular apps are always safe',
        'Tap "Don\'t Allow" for all three — a Sudoku game has no reason to need your microphone, contacts, or location',
        'Delete the app — any app that asks for permissions is dangerous',
        'Allow only the microphone permission and deny the rest'
      ],
      correct: 1,
      explain: 'A number-puzzle game genuinely needs none of those permissions. Tapping "Don\'t Allow" is completely safe — the app will still work for puzzles. Permissions should match what an app actually does.'
    },
    {
      module: 'Module 4: App Store Safety',
      q: 'You receive a text message from "Apple" with a link to "download the latest iOS security update." The link goes to "apple-ios-update.net." What do you do?',
      options: [
        'Tap the link — security updates are important',
        'Delete the text. Real iPhone updates come through Settings → General → Software Update, never a text message',
        'Forward the link to your children to handle',
        'Reply "STOP" to opt out of updates'
      ],
      correct: 1,
      explain: 'Apple never sends software updates through text messages. Real updates arrive through Settings on your device. "apple-ios-update.net" is not an Apple website. This is a classic smishing (SMS phishing) attack.'
    },

    /* MODULE 5 — Email & Messages */
    {
      module: 'Module 5: Email & Messages',
      q: 'You\'re reading your emails and find one from "Amazon" saying your order was declined and you need to update your payment info. The email shows your name but the sender\'s address is "noreply@amazon-updates-canada.com." What do you do?',
      options: [
        'Update your payment — Amazon needs it',
        'Reply asking for more details about the declined order',
        'Do NOT click any links. Go directly to amazon.ca and check your orders there',
        'Call the 1-800 number shown in the email'
      ],
      correct: 2,
      explain: 'Legitimate Amazon emails come from @amazon.ca or @amazon.com — never from hyphenated domains like "amazon-updates-canada.com." Your name appearing in the email doesn\'t make it legitimate — scammers buy lists. Go directly to the real website to check.'
    },
    {
      module: 'Module 5: Email & Messages',
      q: 'You\'ve been getting 10+ spam emails per day. A spam email says "Click here to unsubscribe permanently." What should you do?',
      options: [
        'Click "Unsubscribe" — this will stop all the spam',
        'Ignore the unsubscribe link. Use your email app\'s "Mark as Junk" button instead',
        'Reply to the spam email asking to be removed from their list',
        'Create a new email address to escape the spam'
      ],
      correct: 1,
      explain: '"Unsubscribe" links in spam often confirm your address is active, causing MORE spam. The "Mark as Junk" or "Mark as Spam" button in your email app quietly teaches the system to block similar messages — without tipping off the spammer.'
    },

    /* MODULE 6 — Banking */
    {
      module: 'Module 6: Banking & Transactions',
      q: 'Someone phones claiming to be from your bank\'s fraud department. They say there\'s suspicious activity and need to "verify" your account by asking for your online banking password and PIN. What do you do?',
      options: [
        'Give the information — fraud departments need it to protect your account',
        'Give only partial information (first two digits of PIN)',
        'Hang up immediately. Call your bank back using the number on the back of your card',
        'Ask them to call back in an hour'
      ],
      correct: 2,
      explain: 'Your real bank will NEVER ask for your password or PIN — not by phone, not by email, not by text. This is a social engineering scam. Hang up and call your bank using only the number printed on your card to verify whether there\'s a real issue.'
    },
    {
      module: 'Module 6: Banking & Transactions',
      q: 'You\'re checking your bank statement on your iPad and notice a charge for $89 from "SVC*CLOUDTECH" that you don\'t recognise. What\'s the right first step?',
      options: [
        'Ignore it — small charges sometimes appear and disappear',
        'Post about it on Facebook to see if others got the same charge',
        'Contact your bank immediately using their official app or the number on your card and report the unrecognised charge',
        'Wait three months to see if another charge appears before acting'
      ],
      correct: 2,
      explain: 'Report unknown charges right away. Canadian banks have fraud protection — you won\'t be held responsible for charges you didn\'t make, but reporting quickly makes reversal much easier. "SVC*" often indicates a subscription-type charge that may have signed you up without clear consent.'
    },

    /* MODULE 7 — Photos & Memories */
    {
      module: 'Module 7: Photos & Memories',
      q: 'You took a wonderful photo of your grandchildren at their birthday party. You want to share it with family but not post it publicly online. What\'s the safest way?',
      options: [
        'Post it on Facebook with privacy set to "Public" so family can easily find it',
        'Email it or send it via iMessage directly to family members you choose',
        'Upload it to a free photo-sharing website you found through Google',
        'Post it in a Facebook group with 500 members called "Windsor Families"'
      ],
      correct: 1,
      explain: 'Sending directly via email or iMessage means only your chosen recipients see the photo. Posting publicly — even in groups — puts photos of children in front of strangers. Direct sharing is always the safest option for family photos.'
    },
    {
      module: 'Module 7: Photos & Memories',
      q: 'You were editing photos on your iPad and accidentally deleted 12 pictures from last Christmas. You\'re heartbroken. What should you try first?',
      options: [
        'Nothing — photos are gone forever once deleted on an iPad',
        'Call Apple Support immediately — they can restore photos',
        'Open the Photos app, tap Albums, scroll down and tap "Recently Deleted" — photos stay there for 30 days',
        'Restore your iPad to factory settings to get them back'
      ],
      correct: 2,
      explain: 'The "Recently Deleted" album in Photos is your safety net. Deleted photos stay there for 30 days before being permanently removed. Tap "Recover" on any photo to bring it back. No support call needed.'
    },

    /* MODULE 8 — Staying Connected */
    {
      module: 'Module 8: Staying Connected',
      q: 'During a FaceTime call with your daughter in Vancouver, the video suddenly becomes blocky and the audio cuts out. She sounds like a robot. What\'s most likely happening and what should you try?',
      options: [
        'Your iPad is broken — the video chip has failed',
        'The FaceTime app needs to be reinstalled',
        'It\'s likely a slow Wi-Fi connection. Try moving closer to your router, or ask your daughter to check her connection',
        'FaceTime doesn\'t work well across provinces'
      ],
      correct: 2,
      explain: 'Pixelated video and robot-like audio are classic signs of a slow or unstable internet connection — not a hardware failure. Moving closer to your Wi-Fi router usually resolves it instantly. FaceTime works perfectly across all Canadian provinces and internationally.'
    },
    {
      module: 'Module 8: Staying Connected',
      q: 'A stranger on Facebook named "Michael Roberts" sends you a friend request. He has 3 friends, his profile is 2 weeks old, and within minutes of you accepting, he messages saying he\'s a Canadian soldier overseas and needs help buying iTunes gift cards for his squad. What do you do?',
      options: [
        'Help him — soldiers deserve support',
        'Ask him to prove he\'s a real soldier first',
        'Unfriend and block him immediately. This is a romance/gift card scam — a very common fraud targeting Canadians',
        'Report him but keep him as a friend to gather evidence'
      ],
      correct: 2,
      explain: 'This is the "military romance scam" — one of the most reported frauds in Canada. No real soldier asks strangers for gift cards. The combination of a new profile, few friends, and an immediate gift card request are all classic warning signs. Unfriend, block, and report.'
    },

    /* MODULE 8 — Texting & Public vs Private */
    {
      module: 'Module 8: Staying Connected',
      q: 'You\'d like to call your friend Margaret for a chat but you remember learning that sending a quick message first is now considered the polite thing to do. What is the best approach?',
      options: [
        'Call her directly — calling is always the most respectful way to reach someone',
        'Never call at all — texting has completely replaced phone calls',
        'Send a short text first: "Hi Margaret, free for a call this morning?" — then call when she replies',
        'Send a long detailed email asking permission to call, then wait several days'
      ],
      correct: 2,
      explain: 'A quick "Are you free to talk?" text before calling is the modern courtesy — it lets Margaret know a call is coming so she isn\'t caught off guard. Calling is absolutely still fine, especially for close family or emergencies. The text-first habit simply makes calling even more considerate.'
    },
    {
      module: 'Module 8: Staying Connected',
      q: 'You want to send your friend Susan a quick note on Facebook about a beautiful sunset. You type your message and notice a globe icon next to the button you\'re about to tap. What does the globe mean?',
      options: [
        'Your Wi-Fi is working — the globe just shows you are connected to the internet',
        'The message is encrypted and completely private — only Susan will see it',
        'The globe means this will be a public post — visible to everyone on Facebook, not just Susan',
        'The globe shows the message will be translated to other languages'
      ],
      correct: 2,
      explain: 'The globe icon means your post will be visible to EVERYONE — like pinning a note on a bulletin board in a shopping centre. To reach Susan privately, look for her photo at the top and a "Send" button at the bottom (not "Post"). The rule: see a globe — stop and check. No globe means private message.'
    },

    /* GENERAL / CROSS-MODULE */
    {
      module: 'General: Device Safety',
      q: 'A pop-up appears on your iPad saying "Your iPad storage is almost full. Tap here to buy extra storage for 99 cents/month." The pop-up looks like it\'s from Apple. What should you do?',
      options: [
        'Tap it — extra storage is cheap and useful',
        'Close the pop-up. If you genuinely need more storage, go to Settings → your name → iCloud to manage it through Apple\'s official settings',
        'Enter your credit card details — it\'s only 99 cents',
        'Turn off your iPad to make the pop-up stop permanently'
      ],
      correct: 1,
      explain: 'Apple never offers storage upgrades through random pop-ups while browsing. This is a scam designed to steal credit card details or install malware. All legitimate Apple purchases and settings happen through your device\'s built-in Settings app — never through pop-ups.'
    },
    {
      module: 'General: Online Safety',
      q: 'You\'re at Tim Hortons using their free Wi-Fi to check your email. You want to quickly check your bank balance while you\'re there. What\'s the safest approach?',
      options: [
        'Use the Tim Hortons Wi-Fi — it\'s fine for banking',
        'Switch to your phone\'s cellular data (4G/LTE) or wait until you\'re home to do your banking',
        'Use the public Wi-Fi but log out immediately after',
        'Ask Tim Hortons staff if their Wi-Fi is encrypted before using it'
      ],
      correct: 1,
      explain: 'Public Wi-Fi networks can be monitored by others on the same network. For banking and anything sensitive, use your cellular data connection (4G/LTE) or wait until you\'re on your secured home Wi-Fi. Your cellular connection is encrypted by default.'
    },
    {
      module: 'General: Scam Awareness',
      q: 'Someone phones saying your Social Insurance Number has been "compromised in criminal activity" and you\'ll be arrested unless you pay $800 in Bitcoin to clear your name. They say this call is confidential and you must not tell anyone. What do you do?',
      options: [
        'Pay immediately to avoid arrest',
        'Ask them for more time to gather the money',
        'Hang up. The CRA and police never demand Bitcoin payments or secrecy. This is a common government impersonation scam.',
        'Give them your SIN number to verify the issue'
      ],
      correct: 2,
      explain: 'The Canada Revenue Agency, RCMP, and all government agencies never demand payment in Bitcoin, gift cards, or wire transfers. They never threaten immediate arrest by phone. They never ask for secrecy. These three features together are the signature of a government impersonation scam. Hang up immediately.'
    },
    {
      module: 'General: Browser Safety',
      q: 'You\'re about to enter your credit card number to buy a birthday gift online. You notice the website address starts with "http://" instead of "https://" and there\'s no padlock icon. What should you do?',
      options: [
        'Continue — the padlock just means the site is government-approved',
        'Do not enter your credit card on this site. The missing padlock means the connection is not encrypted',
        'The padlock only matters for banking sites, not shopping',
        'Refresh the page — the padlock will appear after you start filling in the form'
      ],
      correct: 1,
      explain: 'The padlock icon and "https://" mean your data is encrypted between your device and the site — no one can intercept it in transit. An "http://" site (no padlock) sends your data as plain text, readable by anyone on the same network. Never enter payment information on unsecured sites.'
    },
    /* MODULE 9 — Understanding AI */
    {
      module: 'Module 9: Understanding AI',
      q: 'You receive a phone call that sounds exactly like your granddaughter Emily. She says she has been arrested in another city and needs you to send $3,000 through e-transfer immediately — and not to tell her parents. What do you do?',
      options: [
        'Send the money right away — you recognise her voice',
        'Hang up immediately, then call Emily directly on her real phone number to verify',
        'Ask the caller questions only the real Emily would know',
        'Transfer half the money now and wait for more information'
      ],
      correct: 1,
      explain: 'AI can clone a loved one\'s voice from just seconds of audio on social media. This is the "Grandparent Scam 2.0." No matter how real the voice sounds, always hang up and call back on the person\'s real, known number. A family secret code word also helps — a real family member will know it; a scammer will not.'
    },
    {
      module: 'Module 9: Understanding AI',
      q: 'A video goes viral showing a well-known Canadian politician saying something shocking and offensive. The video looks real — but something feels off about the lip movements. What is the safest first step?',
      options: [
        'Share it immediately — the public deserves to know',
        'Pause and check whether the video appears on reputable news sources like CBC or CTV before believing or sharing it',
        'If it looks real enough, it must be real',
        'Report it to the politician\'s office by phone'
      ],
      correct: 1,
      explain: 'Deepfake videos can look extremely convincing. Unnatural lip sync, stiff movement, and unusual lighting are warning signs. Apply the 3-Second Rule: Stop, Breathe, Verify. If CBC, CTV, or Globe and Mail are not reporting it, the video is almost certainly a deepfake. Never share without verifying.'
    },

    /* MODULE 10 — Grocery & Food Delivery */
    {
      module: 'Module 10: Grocery & Food Delivery',
      q: 'You just placed your first Instacart order. The shopper texts: "The brand of yogurt you ordered is sold out — OK to substitute with a similar one?" What do you do?',
      options: [
        'Ignore the message — this is probably a scam',
        'Reply yes or no through the Instacart app — this is a normal, expected part of the process',
        'Cancel the entire order immediately',
        'Give the shopper your phone number so they can call you directly'
      ],
      correct: 1,
      explain: 'Instacart shoppers often send substitution messages when items are out of stock. This is completely normal and expected. Reply through the app — yes for a substitution or no if you only want that specific item. No personal information is needed.'
    },
    {
      module: 'Module 10: Grocery & Food Delivery',
      q: 'Your Uber Eats order arrived, but one item is completely wrong — you ordered a garden salad and received a Caesar salad. What is the correct way to resolve this?',
      options: [
        'Accept it — there is no way to get a refund from a delivery app',
        'Call the restaurant directly and demand a refund',
        'Open the Uber Eats app, find your recent order, tap "Report a Problem," and request a refund for the incorrect item',
        'Post a negative review and accept the loss'
      ],
      correct: 2,
      explain: 'Delivery apps have straightforward refund processes built right in. Open the app, find your order in your history, tap "Report a Problem" or "Get Help," describe the issue, and request a refund or credit. Most refunds are processed within a few days — no phone calls required.'
    },

    /* MODULE 11 — Ride-Sharing */
    {
      module: 'Module 11: Ride-Sharing',
      q: 'You requested an Uber and a silver car pulls up. Before you open the door, what is the single most important thing to do?',
      options: [
        'Ask the driver "Are you my Uber?" and get in if they say yes',
        'Check that the licence plate on the car matches the plate shown in your Uber app',
        'Check that the car colour looks approximately right',
        'Get in quickly so you don\'t hold up traffic'
      ],
      correct: 1,
      explain: 'Always check the licence plate FIRST — before opening the door, before saying anything. Anyone can claim to be your Uber driver; the licence plate cannot lie. The driver should also greet YOU by name (not the other way around) before you get in. These two steps take seconds and protect you every time.'
    },
    {
      module: 'Module 11: Ride-Sharing',
      q: 'You are midway through an Uber ride when the driver takes an unexpected route and you feel uneasy. What should you do?',
      options: [
        'Stay calm and say nothing — drivers know the best routes',
        'Immediately demand the driver pull over in a dangerous area',
        'Open the Uber app, tap the shield icon to access safety features, and optionally tap the 911 emergency button to share your location',
        'Jump out of the moving car'
      ],
      correct: 2,
      explain: 'Your safety always comes first. In the Uber app, the shield icon gives you access to: Share Trip (sends your real-time location to a trusted contact), and a 911 Emergency button that also shares your trip details with first responders. You can also politely ask to be let out at a well-lit, populated location like a gas station or pharmacy.'
    },

    {
      module: 'General: Putting It All Together',
      q: 'You\'ve completed all 11 modules of the Digital Confidence Centre. Your neighbour asks how to stay safe online and says "Just give me the one most important rule." What would you tell them?',
      options: [
        '"Never use the internet — it\'s too dangerous"',
        '"If something feels urgent, scary, or too good to be true — pause, close it, and verify through official channels before doing anything"',
        '"Change your password every day to stay safe"',
        '"Only use a computer at the library where staff can help"'
      ],
      correct: 1,
      explain: 'Scammers rely on urgency and fear to prevent you from thinking clearly. The single most powerful habit is the pause. Whether it\'s a scary pop-up, an urgent email, or a suspicious phone call — stop, close it, breathe, and then verify through channels you know are real. That one habit protects you from the vast majority of threats.'
    },

    /* MODULE 2 — Scam Scenarios (Extra) */
    {
      module: 'Module 2: The Security Shield',
      q: 'You receive an email saying "Your package could not be delivered — click here to reschedule." You were not expecting any packages. What should you do?',
      options: [
        'Click the link — maybe someone sent a surprise gift',
        'Delete it — this is a common delivery scam',
        'Call the delivery company\'s official number to check',
        'Forward it to family to ask if they sent something'
      ],
      correct: 1,
      explain: 'Delivery scams are very common. If you were not expecting a package, delete the email. Real delivery companies leave a notice at your door or send a tracking number you can look up on their official website — never through an unexpected email link.'
    },

    /* MODULE 4 — App Safety (Extra) */
    {
      module: 'Module 4: App Store Safety',
      q: 'A website you are installing software from says "Please disable your antivirus temporarily to complete this installation." What should you do?',
      options: [
        'Follow the instructions — the software needs this to install',
        'This is a major warning sign — close the website immediately',
        'Only disable it if the company name looks familiar',
        'Disable it briefly, then turn it back on straight after'
      ],
      correct: 1,
      explain: 'Legitimate software never asks you to disable your antivirus protection. This is almost always malware trying to sneak past your security. Close the website immediately and do not install anything.'
    },

    /* General: Public Wi-Fi Safety */
    {
      module: 'General: Browser Safety',
      q: 'You are using the free Wi-Fi at your local coffee shop. Which of these activities is safest to do?',
      options: [
        'Check your bank balance',
        'Browse the news',
        'Shop online and enter your credit card number',
        'Log into your email account'
      ],
      correct: 1,
      explain: 'On public Wi-Fi, other people on the same network could potentially see what you are doing. Browsing news is safe. For banking, shopping, and email — wait until you are on your home Wi-Fi or mobile data.'
    },

    /* MODULE 13 — Social Media */
    {
      module: 'Module 13: Social Media',
      q: 'You receive a Facebook friend request from someone you don\'t recognise. Their profile was created three weeks ago, they have no mutual friends with you, and their profile photo looks like a professional model. What should you do?',
      options: [
        'Accept it — the more friends the better',
        'Decline it. These are classic signs of a fake or scam profile.',
        'Accept it, but don\'t share personal posts with them',
        'Message them to ask why they want to be friends'
      ],
      correct: 1,
      explain: 'A new account, stock-photo profile picture, and zero mutual connections are the three biggest red flags of a fake profile. Scammers and romance fraudsters typically create these accounts to target seniors. It is always safe to decline requests from people you do not know personally.'
    },
    {
      module: 'Module 13: Social Media',
      q: 'You posted a photo on Facebook and realised you accidentally set the audience to "Public" instead of "Friends." What does "Public" mean on Facebook?',
      options: [
        'Only your Facebook friends can see it',
        'Anyone on the internet — including people with no Facebook account — can find and see this post',
        'Only people in Canada can see it',
        'Only people over 18 can see it'
      ],
      correct: 1,
      explain: '"Public" on Facebook means anyone anywhere in the world — including people who are not logged into Facebook — can find and see that post through Google search or direct link. Always set your default audience to "Friends" for personal posts and photos.'
    },
    {
      module: 'Module 13: Social Media',
      q: 'Someone on Facebook Marketplace is selling a laptop for $50. They ask you to send the money by Interac e-transfer before you see the item in person. What should you do?',
      options: [
        'Send the money — $50 is not much to risk',
        'Decline. Never send money to a stranger before seeing the item. Arrange to meet in person at a public place and pay cash on the spot.',
        'Ask them to send you the laptop first, then you\'ll pay',
        'Send half the money now and the rest after you see it'
      ],
      correct: 1,
      explain: 'This is a classic Marketplace scam. Once you send an e-transfer to a stranger, that money is almost impossible to recover. Always see items in person before paying, meet in a well-lit public place (many Ontario police stations have designated "safe exchange zones"), and pay with cash.'
    },

    /* MODULE 14 — Smart Home */
    {
      module: 'Module 14: Smart Home Basics',
      q: 'Your new voice assistant (Amazon Alexa) is sitting on your kitchen counter. Your neighbour asks, "Isn\'t it always listening to everything you say?" What is the accurate answer?',
      options: [
        'Yes, it records and stores every conversation in your home',
        'It is always listening for the specific wake word only ("Alexa"). After hearing it, it records your command and sends it to be processed.',
        'No, it only activates when you press a button',
        'It only listens when connected to the internet'
      ],
      correct: 1,
      explain: 'Voice assistants are designed to listen only for their specific wake word (Alexa, Hey Google, Siri). After hearing it, they record your voice command. If privacy concerns you, every device has a physical mute button that physically disconnects the microphone — you can see a red indicator light when muted.'
    },
    {
      module: 'Module 14: Smart Home Basics',
      q: 'You are thinking about getting a smart thermostat. Which of these statements is TRUE about Ontario energy rebates for smart thermostats?',
      options: [
        'There are no rebates available in Ontario',
        'Both Enbridge Gas and Hydro One offer rebates that can significantly offset the cost of a smart thermostat',
        'Rebates are only available if you are under 65',
        'You must buy the thermostat from a utility company to get the rebate'
      ],
      correct: 1,
      explain: 'Ontario residents can access rebates through Enbridge Gas (for natural gas heating) and Hydro One (for electric heat pumps). These programs are designed to encourage energy efficiency and can offset a significant portion of the cost. Check enbridgegas.com/rebates or hydroone.com for current amounts and eligibility.'
    },
    {
      module: 'Module 14: Smart Home Basics',
      q: 'What is a "smart plug" and why is it considered the best starter smart home device for beginners?',
      options: [
        'It is a special power bar that costs $200 and requires an electrician to install',
        'A small device you plug into any existing outlet — it makes that outlet controllable by phone or voice, with no installation or wiring required',
        'A plug adapter that only works with Apple devices',
        'A device that monitors how much electricity you use and sends you monthly reports'
      ],
      correct: 1,
      explain: 'A smart plug is the perfect starting point because it requires zero installation — just plug it into a regular wall outlet and connect it to a free app. You can then schedule any device plugged into it (lamp, coffee maker, fan) to turn on and off automatically. Canadian Tire sells them for $15–$35.'
    },

    /* MODULE 15 — Telehealth */
    {
      module: 'Module 15: Telehealth',
      q: 'It is 11pm on a Saturday and you have been experiencing chest tightness for the past hour that is making you anxious. You are not sure if it is serious. What is the BEST first step?',
      options: [
        'Wait until Monday to call your family doctor',
        'Call 911 immediately — chest tightness can indicate a heart emergency',
        'Call Ontario Telehealth at 1-866-797-0000 to speak with a registered nurse',
        'Google your symptoms and decide based on what you find'
      ],
      correct: 1,
      explain: 'Chest tightness that concerns you — especially at night — should never be ignored. Call 911 immediately. This is a potential cardiac emergency and requires immediate assessment by paramedics, not a telehealth call. Ontario Telehealth is excellent for non-emergency health questions, but chest pain is always treated as urgent.'
    },
    {
      module: 'Module 15: Telehealth',
      q: 'Your doctor\'s office uses a patient portal called MyChart. You log in and see a lab result marked "Abnormal." Before calling the office in a panic, what should you know?',
      options: [
        '"Abnormal" always means something is seriously wrong',
        'Lab reference ranges are set for a general population. "Abnormal" flags are common and your doctor will contact you if action is needed. Wait for their call.',
        'You should ignore the portal — only trust results your doctor tells you in person',
        'You should immediately go to the emergency room'
      ],
      correct: 1,
      explain: 'Lab reference ranges cover a statistical average of the population. Many results are flagged "Abnormal" that are completely fine for your individual situation — age, medications, and existing conditions all affect what is normal for YOU. If the result required urgent action, your doctor would have already called. Check when the result was uploaded — if it was days ago and you haven\'t heard, it likely requires no immediate action.'
    },
    {
      module: 'Module 15: Telehealth',
      q: 'A health website emails you saying "Your Ontario health records are at risk. Click here immediately to verify your identity and protect your information." What should you do?',
      options: [
        'Click the link and verify your information to protect your health records',
        'Delete the email. Government and hospital systems never contact patients this way. This is a phishing scam.',
        'Forward it to your doctor to ask if it is real',
        'Call the number in the email to report the breach'
      ],
      correct: 1,
      explain: 'Ontario\'s health system (MyHealth Ontario, hospital portals, OHIP) will never send unsolicited emails asking you to verify personal information. This is a classic phishing attack targeting health data. Delete it immediately. If you are genuinely concerned about your account security, go directly to myhealth.ontario.ca by typing it in your browser — never click a link from an email.'
    },

    /* ── NEW QUESTIONS v8 ──────────────────────────────────── */

    /* MODULE 13 — Social Media (4 new questions) */
    {
      module: 'Module 13: Social Media',
      q: 'You want to check who can see your Facebook posts. Some posts are set to "Friends" and others to "Public." Which setting is safer for personal posts like photos of your home?',
      options: [
        '"Public" — more people can enjoy your photos',
        '"Friends" — only people you have personally approved can see the post',
        'It makes no difference either way',
        '"Public" is safer because Facebook monitors it more closely'
      ],
      correct: 1,
      explain: '"Friends" limits your post to only the people in your approved friends list. "Public" means anyone in the world, including people not on Facebook, can find and view your post through Google or a direct link. For personal photos — especially anything showing your home, your routine, or family members — always choose "Friends" or a more restricted audience.'
    },
    {
      module: 'Module 13: Social Media',
      q: 'You receive a second Facebook friend request from someone already in your friends list. Your original friend is still showing as connected. What is most likely happening?',
      options: [
        'Your friend accidentally sent a duplicate request — accept it',
        'Facebook sometimes re-sends friend requests as a reminder',
        'Someone has created a fake copy of your friend\'s profile. Do not accept — warn your real friend.',
        'Your friend wants to connect on a different account — it is safe to accept'
      ],
      correct: 2,
      explain: 'This is called a "cloned profile" scam. Scammers copy a real person\'s name and profile photo to create a fake account, then target all the real person\'s friends. Once accepted, they may send messages asking for money or personal information. If you already have someone as a friend and receive a new request from the same name, it is almost certainly a fake. Warn your real friend so they can report the cloned account to Facebook.'
    },
    {
      module: 'Module 13: Social Media',
      q: 'Which of the following types of information is safest to share publicly on your Facebook profile?',
      options: [
        'Your full home address so friends can find you easily',
        'Your daily routine and the times you are usually out of the house',
        'Your general interests, hobbies, and your first name',
        'Photos showing the front of your house with the street number visible'
      ],
      correct: 2,
      explain: 'General interests and hobbies are low-risk personal details. Your home address, daily routine, and photos that reveal your exact home location could be misused by a burglar or scammer. As a rule: if the information could help someone find you physically or know when your home is empty, keep it private.'
    },
    {
      module: 'Module 13: Social Media',
      q: 'Someone is sending you unwanted and uncomfortable messages on Facebook. What is the most effective way to stop all contact from them?',
      options: [
        'Reply politely asking them to stop',
        'Delete your Facebook account',
        'Use Facebook\'s Block feature — this prevents them from seeing your profile, messaging you, or finding you on Facebook at all',
        'Report each individual message one at a time'
      ],
      correct: 2,
      explain: 'Blocking is the most complete solution. When you block someone on Facebook, they cannot message you, see your posts, search for your profile, or contact you in any way on that platform. To block: go to their profile, tap the three dots (...), then select Block. Replying to unwanted messages often encourages the sender to continue.'
    },

    /* MODULE 14 — Smart Home (4 new questions) */
    {
      module: 'Module 14: Smart Home',
      q: 'A stranger knocks on your door and offers to install a "free smart thermostat" from a government programme. He asks for your Wi-Fi password to complete the setup. What should you do?',
      options: [
        'Accept — a free thermostat from a government programme is a great deal',
        'Let him in but stand nearby to watch',
        'Decline politely and close the door. Legitimate programmes send registered technicians with advance notice and official ID — they never show up unannounced.',
        'Give him the Wi-Fi password but change it after he leaves'
      ],
      correct: 2,
      explain: 'This is a door-to-door scam. Giving your Wi-Fi password to a stranger could allow them to access every device on your home network. Legitimate government smart home programmes (such as Enbridge or Hydro One rebate installations) require you to apply first, receive written confirmation, and book a certified technician with company identification. Always verify before giving anyone access to your home or your network.'
    },
    {
      module: 'Module 14: Smart Home',
      q: 'Your neighbour worries that her smart doorbell camera could be hacked. Is this a real concern, and what is the best defence?',
      options: [
        'No — smart home devices cannot be hacked, only computers can',
        'Yes — use a strong, unique password for the device\'s app account and keep the device firmware updated',
        'Yes — the only safe option is to unplug all smart home devices',
        'No — the camera manufacturer monitors all footage for security'
      ],
      correct: 1,
      explain: 'Smart home devices including cameras can be hacked, particularly when they use weak or default passwords. The two most effective defences are: (1) set a strong, unique password for the app account connected to the device, and (2) keep the device firmware updated — most devices do this automatically when set to auto-update. A strong home Wi-Fi password also protects all your connected devices.'
    },
    {
      module: 'Module 14: Smart Home',
      q: 'What is "mesh Wi-Fi" and why might it benefit seniors in larger homes?',
      options: [
        'Mesh Wi-Fi is a special filter that automatically blocks harmful websites',
        'Mesh Wi-Fi uses multiple small devices placed around your home to create one strong, seamless Wi-Fi signal everywhere — no more dead spots',
        'Mesh Wi-Fi is only for businesses and requires professional installation',
        'Mesh Wi-Fi requires a separate monthly subscription from your internet provider'
      ],
      correct: 1,
      explain: 'A mesh Wi-Fi system uses two or three small "nodes" placed around your home that work together to create one strong Wi-Fi signal in every room — kitchen, bedroom, basement, and backyard. This eliminates the weak signal spots that often make smart devices unreliable or cause video calls to cut out. Popular brands available in Canada include Google Nest WiFi and Eero, and they can usually be set up without professional help.'
    },
    {
      module: 'Module 14: Smart Home',
      q: 'You are setting up a new smart thermostat app and it asks you to create an account. You want to use the same password you use for your email. What should you do instead?',
      options: [
        'Use the same password — it is too hard to remember different ones',
        'Create a new unique password for the thermostat account and save it in your device\'s password manager',
        'Use your home address as the password — you will never forget it',
        'Skip creating a password if the app allows it'
      ],
      correct: 1,
      explain: 'Every account — including smart home device accounts — should have its own unique password. If one account is compromised and you reuse passwords, all your other accounts become vulnerable. Use your iPhone or iPad\'s built-in iCloud Keychain (Settings → Passwords) to suggest and save a strong, unique password. It fills in automatically when you log in next time, so you only need to remember one master password.'
    },

    /* MODULE 15 — Telehealth (4 new questions) */
    {
      module: 'Module 15: Telehealth',
      q: 'Your family doctor offers virtual visits covered by OHIP. Which situation is BEST suited to a virtual/telehealth visit rather than in person?',
      options: [
        'You have fallen and need stitches',
        'You have had chest pain for the past two hours',
        'You have had a mild skin rash for a week and want your doctor\'s opinion',
        'You need a blood test ordered and the blood drawn at a lab'
      ],
      correct: 2,
      explain: 'A mild rash lasting a week with no urgent symptoms is an ideal case for a virtual visit — your doctor can see it on camera, discuss it, and prescribe treatment if needed. Injuries requiring stitches, chest pain, and blood draws require in-person care. The general rule: if you can show it on camera and it is not an emergency, telehealth works well. If you need a physical examination or a test, go in person.'
    },
    {
      module: 'Module 15: Telehealth',
      q: 'You have a virtual doctor appointment tomorrow at 2pm. What steps should you take to prepare?',
      options: [
        'Wait until 2pm and tap the link when the reminder arrives',
        'Find a quiet, well-lit space, charge your iPad, test your camera and microphone, have your health card and medications list ready, and join a few minutes early',
        'Sit in your car for privacy and use your cellular data connection',
        'Write out a list of every health concern you have ever had to make the most of the time'
      ],
      correct: 1,
      explain: 'Preparing for a telehealth visit like an in-person appointment makes a big difference. Good lighting means your doctor can see you clearly. A charged device prevents a disconnection mid-appointment. Having your medications list ready saves time. Joining a few minutes early lets you resolve any technical issues without eating into your appointment time. A quiet space ensures the doctor can hear you clearly.'
    },
    {
      module: 'Module 15: Telehealth',
      q: 'You want to activate a MyChart patient portal account. Your clinic mailed you an activation code. What is the safest way to complete registration?',
      options: [
        'Search "MyChart login" in Google and click the first result',
        'Go directly to your clinic\'s official website and follow their MyChart link from there',
        'Click any link in an email that mentions MyChart',
        'Ask someone at a public computer to help you set it up'
      ],
      correct: 1,
      explain: 'Always access patient portals through your healthcare provider\'s official website — type the address yourself or use a bookmark you previously saved. Google results can include look-alike sites or outdated pages. Your activation code is only valid on the genuine portal, so starting from your clinic\'s own website ensures you are on the correct, secure site and not a copycat page designed to steal your information.'
    },
    {
      module: 'Module 15: Telehealth',
      q: 'You have mild cold symptoms — runny nose, mild sore throat — and want medical advice without leaving home. What is the best first step?',
      options: [
        'Call 911',
        'Go directly to the hospital emergency department',
        'Call Ontario Telehealth at 1-866-797-0000 to speak with a registered nurse free of charge, 24 hours a day',
        'Search your symptoms on a random health website and self-diagnose'
      ],
      correct: 2,
      explain: 'Ontario Telehealth (1-866-797-0000) is a free, 24/7 service staffed by registered nurses. They can assess your symptoms over the phone, give you advice, and tell you whether you need to visit a doctor or go to urgent care. This is the ideal first step for non-emergency symptoms like a mild cold. Emergency rooms and 911 are for urgent or potentially life-threatening situations — using them for minor illnesses creates unnecessary waits for people who truly need emergency care.'
    },

    /* MODULE 2.5 — Common Digital Tasks (6 new questions) */
    {
      module: 'Module 2.5: Common Digital Tasks',
      q: 'You sent an Interac e-Transfer but mistyped the recipient\'s email address. The wrong person has not yet accepted the transfer. What should you do immediately?',
      options: [
        'Nothing — e-Transfers cannot be cancelled once sent',
        'Contact your bank right away — if the transfer has not been accepted, your bank may be able to cancel it',
        'Send another transfer to the correct person and accept the financial loss',
        'Email the incorrect address and ask the stranger to return the money'
      ],
      correct: 1,
      explain: 'An e-Transfer that has been sent but not yet accepted can often be cancelled by your bank. Call your bank\'s customer service line as soon as you notice the mistake and explain what happened. Time is critical — once the transfer is accepted by the recipient, recovery becomes much more difficult. This is why double-checking the email address before tapping Send is so important.'
    },
    {
      module: 'Module 2.5: Common Digital Tasks',
      q: 'You turned on iCloud Photos on your iPad, which has 2,400 existing photos. How many of your photos will be backed up to iCloud?',
      options: [
        'None — iCloud Backup and iCloud Photos are separate features',
        'Only photos taken after you turned on iCloud Photos',
        'All 2,400 photos — iCloud Photos backs up your entire photo library including older photos',
        'Only enough to fill your free 5 GB storage'
      ],
      correct: 2,
      explain: 'When you enable iCloud Photos, Apple uploads your entire photo library to iCloud — not just photos taken afterwards. All existing photos and videos are included. The upload process may take several hours or days on a large library, depending on your Wi-Fi speed. You can monitor progress in Settings → your name → iCloud → Photos. Once complete, all photos are safely backed up and accessible on any Apple device signed into your Apple ID.'
    },
    {
      module: 'Module 2.5: Common Digital Tasks',
      q: 'A notification appears on your iPhone saying "iOS 18.4 is available." Where is the only safe place to install this update?',
      options: [
        'Tap the notification link if it takes you directly to the App Store',
        'Go to Settings → General → Software Update on your device',
        'Search "iOS 18.4 download" in Safari and download from a website',
        'Wait — you cannot install updates yourself, Apple does it automatically'
      ],
      correct: 1,
      explain: 'The only safe place to install an iOS update is through Settings → General → Software Update. This connects directly to Apple\'s servers and installs the genuine update. Downloading iOS from websites or following links in text messages is how scammers deliver fake "updates" that install harmful software. The real iOS update process happens entirely within your device\'s Settings app, never through a website.'
    },
    {
      module: 'Module 2.5: Common Digital Tasks',
      q: 'You want to book a follow-up appointment with your specialist using their online portal. During account registration, the site asks for your Social Insurance Number (SIN). What should you do?',
      options: [
        'Enter your SIN — healthcare providers need it for identification',
        'Close the page. Medical portals in Ontario use your health card number and date of birth — they never need your SIN for appointment booking.',
        'Enter only the last four digits of your SIN',
        'Call the clinic to confirm the SIN is required before entering it'
      ],
      correct: 1,
      explain: 'Ontario healthcare portals verify your identity using your Ontario health card number and date of birth — not your Social Insurance Number. A medical booking site that asks for your SIN is either a scam site or has a serious data collection error. Your SIN is a highly sensitive identifier linked to your tax records; it should only ever be provided to Canada Revenue Agency or an employer for payroll. Close any medical site that asks for it and contact your clinic by phone to report the issue.'
    },
    {
      module: 'Module 2.5: Common Digital Tasks',
      q: 'Your iPhone shows a warning: "Your cellular data usage is at 90% of your monthly plan." What is the smartest action for the rest of the month?',
      options: [
        'Turn off your iPhone until the new billing cycle begins',
        'Connect to Wi-Fi whenever possible to avoid using your remaining cellular data',
        'Stream videos freely — phone carriers do not actually charge for going over',
        'Buy a new iPhone with a larger data plan immediately'
      ],
      correct: 1,
      explain: 'When your data is nearly used up, the simple solution is to use Wi-Fi instead of cellular data. At home, at the library, at a friend\'s house — whenever you see the Wi-Fi symbol in the top corner of your screen, you are on Wi-Fi and not using your data plan. Tasks like streaming video, downloading app updates, and loading photo-heavy websites use significant data. Doing these on Wi-Fi costs nothing extra.'
    },
    {
      module: 'Module 2.5: Common Digital Tasks',
      q: 'A friend recommends a meditation app and suggests you search for it in the App Store. You find two apps that look very similar. How do you choose the safe, legitimate one?',
      options: [
        'Download both and try them — it is fine to delete one later',
        'Choose the one at the top of the search results regardless of other information',
        'Check the developer name, star rating, number of reviews, and read a few user reviews before downloading',
        'Avoid free apps — only paid apps from the App Store are safe'
      ],
      correct: 2,
      explain: 'Before downloading any app, check four things: (1) the developer name — does it match a known company? (2) the star rating — 4 stars or above suggests quality; (3) the number of reviews — thousands of reviews indicates a widely-used, legitimate app; (4) recent user reviews — do they describe the app working as expected? Free apps are completely safe to download from the App Store — Apple reviews every app before listing it. The App Store itself is your protection.'
    }
  ];

  var PASS_SCORE   = 44;   /* 74% of 60 */
  var currentQ     = 0;
  var score        = 0;
  var answered     = [];
  var quizStarted  = false;

  /* ── Encouragement milestones ── */
  var MILESTONES = {
    10: { en: '10 questions done! You\'re finding your rhythm. Keep going!', fr: '10 questions! Vous êtes dans votre élan. Continuez!' },
    20: { en: 'You\'ve answered 20 questions — you\'re a third of the way there!', fr: '20 questions &#8212; un tiers du chemin parcouru!' },
    30: { en: 'Halfway there! 30 questions completed. You\'re doing really well.', fr: 'À mi-chemin! 30 questions terminées. Vous vous en sortez très bien.' },
    40: { en: 'Just 20 questions to go. You\'ve got this!', fr: 'Plus que 20 questions. Vous pouvez le faire!' },
    50: { en: 'Final stretch — only 10 questions left. Almost there!', fr: 'Dernière ligne droite &#8212; plus que 10 questions. Presque!' }
  };

  function getLang() {
    try {
      var l = document.documentElement.getAttribute('data-lang') ||
              localStorage.getItem('dc-lang') || navigator.language || 'en';
      return l.toLowerCase().startsWith('fr') ? 'fr' : 'en';
    } catch (e) { return 'en'; }
  }

  /* ── Public init ────────────────────────────────────────── */
  function init() {
    var container = document.getElementById('quiz-app');
    if (!container) return;
    buildReadinessPanel(container);
  }

  /* ── Readiness Panel (Phase 2) ──────────────────────────── */
  function buildReadinessPanel(container) {
    var total = 11;
    var doneCount = 0;
    var incomplete = [];
    var mLabels = [
      'Module 1: The Escape Hatch',
      'Module 2: The Security Shield',
      'Module 3: Passwords & Biometrics',
      'Module 4: App Store Safety',
      'Module 5: Email & Messages',
      'Module 6: Banking & Transactions',
      'Module 7: Photos & Memories',
      'Module 8: Stay Connected',
      'Module 9: Understanding AI',
      'Module 10: Grocery & Food Delivery',
      'Module 11: Ride-Sharing Apps'
    ];
    var mUrls = [
      'modules/module-1.html', 'modules/module-2.html', 'modules/module-3.html', 'modules/module-4.html',
      'modules/module-5.html', 'modules/module-6.html', 'modules/module-7.html', 'modules/module-8.html',
      'modules/module-9.html', 'modules/module-10.html', 'modules/module-11.html'
    ];

    for (var i = 1; i <= total; i++) {
      if (isModuleDone(i)) { doneCount++; }
      else { incomplete.push({ label: mLabels[i - 1], url: mUrls[i - 1] }); }
    }

    var statusHTML = '';
    for (var j = 1; j <= total; j++) {
      var d = isModuleDone(j);
      statusHTML += '<li class="' + (d ? 'done' : 'pending') + '">' +
        (d ? '&#x2705;' : '&#x2B1C;') + ' ' + escHTML(mLabels[j - 1]) + '</li>';
    }

    var bannerHTML = '';
    var actionHTML = '';

    if (doneCount === total) {
      localStorage.setItem('finalQuizUnlocked', 'true');
      bannerHTML =
        '<div class="confidence-check-box">' +
          '&#x2705; <strong>You are ready!</strong><br>' +
          'You have completed all 15 modules. You can take the Final Assessment now ' +
          '&#8212; and you can retake it as many times as you like. There is no pressure and no time limit.' +
        '</div>';
      actionHTML =
        '<button class="quiz-btn quiz-btn-primary" id="start-quiz-btn" ' +
        'style="font-size:20px;padding:18px 48px;margin-top:24px;">Begin Assessment &#8594;</button>';
    } else if (doneCount === 0) {
      bannerHTML =
        '<div class="tip-box">' +
          '&#128161; <strong>It looks like you have not started the modules yet.</strong><br>' +
          'The Digital Confidence Centre works best when you go through the modules first ' +
          '&#8212; they prepare you for this assessment. ' +
          '<a href="modules/module-1.html">Start with Module 1 &#8594;</a>' +
        '</div>';
    } else {
      var incLinks = incomplete.map(function (m) {
        return '<li><a href="' + m.url + '">' + escHTML(m.label) + ' &#8594;</a></li>';
      }).join('');
      bannerHTML =
        '<div class="warning-box">' +
          '&#x26A0;&#xFE0F; <strong>A few modules are not finished yet:</strong>' +
          '<ul style="margin:12px 0 0 20px;">' + incLinks + '</ul><br>' +
          'You can still take the quiz now &#8212; but you might find it easier after finishing those modules. The choice is yours.' +
        '</div>';
      actionHTML =
        '<button class="quiz-btn quiz-btn-secondary" id="take-anyway-btn" ' +
        'style="margin-top:16px;">Take the Quiz Anyway</button>';
    }

    container.innerHTML =
      '<div class="quiz-container">' +
        '<div class="quiz-header"><h1>&#127891; Final Assessment &#8212; Readiness Check</h1></div>' +
        '<div class="quiz-question">' +
          bannerHTML +
          (doneCount > 0
            ? '<h3 style="margin-top:28px;font-size:18px;">Your progress so far:</h3>' +
              '<ul class="module-checklist">' + statusHTML + '</ul>'
            : '') +
          actionHTML +
        '</div>' +
      '</div>';

    var startBtn = document.getElementById('start-quiz-btn');
    if (startBtn) startBtn.addEventListener('click', function () { renderStart(container); });
    var takeBtn = document.getElementById('take-anyway-btn');
    if (takeBtn) takeBtn.addEventListener('click', function () { renderStart(container); });
  }

  /* ── Locked screen (kept for dev reference) ─────────────── */
  function renderLocked(container) {
    var statuses = '';
    for (var i = 1; i <= 11; i++) {
      var done = isModuleDone(i);
      statuses += '<li class="' + (done ? 'done' : 'pending') + '">' +
        (done ? '&#x2705;' : '&#x2B1C;') + ' Module ' + i + '</li>';
    }
    container.innerHTML =
      '<div class="quiz-locked-screen">' +
        '<div class="quiz-locked-icon">&#128274;</div>' +
        '<h1>Final Assessment &#8212; Locked</h1>' +
        '<p>Complete all 15 learning modules to unlock the Final Assessment and earn your Certificate of Completion.</p>' +
        '<ul class="module-checklist">' + statuses + '</ul>' +
        '<p><a href="index.html">&#8592; Return to Home</a> to continue your modules.</p>' +
      '</div>';
  }

  /* ── Start / intro screen ────────────────────────────────── */
  function renderStart(container) {
    container.innerHTML =
      '<div class="quiz-container">' +
        '<div class="quiz-header">' +
          '<h1>&#127891; Final Digital Confidence Assessment</h1>' +
          '<p style="color:#455A64;font-size:17px;margin:8px 0 0;">60 real-life scenarios &nbsp;&middot;&nbsp; Pass with 74% &nbsp;&middot;&nbsp; No time limit</p>' +
        '</div>' +
        '<div class="quiz-question" style="text-align:center;">' +
          '<div class="three-second-rule-box" style="text-align:left;margin-bottom:24px;">' +
            '&#x1F6D1; Take your time. There is no clock, no pressure, and no one watching. ' +
            'Read each question carefully &#8212; Stop, Breathe, then choose your answer.' +
          '</div>' +
          '<div style="font-size:72px;margin-bottom:24px;">&#128203;</div>' +
          '<h3 style="font-size:24px;">You\'ve earned this!</h3>' +
          '<p style="font-size:18px;color:var(--text-secondary);margin-bottom:32px;">' +
            'Each question describes a real situation you might encounter. ' +
            'Choose what you would do. There is no time pressure &#8212; read carefully.<br><br>' +
            'You need 44 correct answers (74%) to pass and receive your certificate. (60 questions total)' +
          '</p>' +
          '<button class="quiz-btn quiz-btn-primary" id="start-quiz-btn" style="font-size:20px;padding:18px 48px;">Begin Assessment</button>' +
        '</div>' +
      '</div>';

    document.getElementById('start-quiz-btn').addEventListener('click', function () {
      startQuiz(container);
    });
  }

  /* ── Start quiz (adaptive: skip questions from passed module quizzes) ── */
  function startQuiz(container) {
    currentQ = 0; score = 0; answered = []; quizStarted = true;

    /* Filter out questions from modules where the user already passed 4/5 */
    var skipped = 0;
    questions = questions.filter(function (q) {
      var modMatch = q.module && q.module.match(/^Module ([\d.]+)/);
      if (!modMatch) return true;
      var key = modMatch[1];
      if (localStorage.getItem('dc-quiz-m' + key + '-passed') === 'true') {
        skipped++;
        return false;
      }
      return true;
    });

    /* Show skip notice if any were skipped */
    if (skipped > 0) {
      var lang = getLang();
      var notice = document.createElement('div');
      notice.className = 'quiz-milestone';
      notice.innerHTML = lang === 'fr'
        ? '&#128218; <strong>Nous avons sauté ' + skipped + ' question' + (skipped > 1 ? 's' : '') + ' que vous avez déjà prouvé savoir.</strong> Ce quiz a été réduit à ' + questions.length + ' questions.'
        : '&#128218; <strong>We skipped ' + skipped + ' question' + (skipped > 1 ? 's' : '') + ' you already proved you know.</strong> This quiz has been shortened to ' + questions.length + ' question' + (questions.length > 1 ? 's' : '') + '.';

      /* Inject notice into quiz container after it renders */
      var insertNotice = function () {
        var qBox = container.querySelector('.quiz-question');
        if (qBox) qBox.insertBefore(notice, qBox.firstChild);
      };
      setTimeout(insertNotice, 0);
    }

    renderQuestion(container);
  }

  /* ── Render question ─────────────────────────────────────── */
  function renderQuestion(container) {
    var q = questions[currentQ];
    var pct = Math.round((currentQ / questions.length) * 100);
    var letters = ['A', 'B', 'C', 'D'];
    var lang = getLang();

    var headerLabel  = lang === 'fr' ? 'Évaluation finale' : 'Final Assessment';
    var qLabel       = lang === 'fr'
      ? 'Question ' + (currentQ + 1) + ' sur ' + questions.length
      : 'Question ' + (currentQ + 1) + ' of ' + questions.length;
    var scoreLabel   = lang === 'fr'
      ? score + ' correctes jusqu\'ici'
      : score + ' correct so far';
    var nextLabel    = currentQ === questions.length - 1
      ? (lang === 'fr' ? 'Voir mes résultats' : 'See My Results')
      : (lang === 'fr' ? 'Question suivante &#8594;' : 'Next Question &#8594;');

    var milestoneHTML = '';
    if (MILESTONES[currentQ]) {
      milestoneHTML =
        '<div class="quiz-milestone" role="status">' +
          '&#127775; ' + MILESTONES[currentQ][lang] +
        '</div>';
    }

    var optionsHTML = q.options.map(function (opt, i) {
      return '<button class="quiz-option" data-index="' + i + '">' +
        '<span class="quiz-option-letter">' + letters[i] + '</span>' +
        '<span>' + escHTML(opt) + '</span>' +
      '</button>';
    }).join('');

    container.innerHTML =
      '<div class="quiz-container">' +
        '<div class="quiz-header">' +
          '<div class="quiz-header-row">' +
            '<h1>' + headerLabel + '</h1>' +
            '<span class="quiz-score-tracker" aria-live="polite">' + scoreLabel + '</span>' +
          '</div>' +
          '<div class="quiz-progress-bar-wrap">' +
            '<div class="quiz-progress-bar" style="width:' + pct + '%"></div>' +
          '</div>' +
          '<div class="quiz-progress-label">' + qLabel + '</div>' +
        '</div>' +
        milestoneHTML +
        '<div class="quiz-question" id="current-question">' +
          '<span class="quiz-module-tag">' + escHTML(q.module) + '</span>' +
          '<h3>' + escHTML(q.q) + '</h3>' +
          '<div class="quiz-options" id="options-wrap">' + optionsHTML + '</div>' +
          '<div class="quiz-feedback" id="quiz-feedback"></div>' +
        '</div>' +
        '<div class="quiz-nav">' +
          '<button class="quiz-btn quiz-btn-primary" id="next-btn" disabled>' +
            nextLabel +
          '</button>' +
        '</div>' +
      '</div>';

    container.querySelectorAll('.quiz-option').forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectAnswer(container, parseInt(this.getAttribute('data-index')));
      });
    });

    document.getElementById('next-btn').addEventListener('click', function () {
      nextQuestion(container);
    });
  }

  /* ── Select answer ────────────────────────────────────────── */
  function selectAnswer(container, selectedIndex) {
    var q = questions[currentQ];
    var options = container.querySelectorAll('.quiz-option');
    var feedback = document.getElementById('quiz-feedback');
    var nextBtn  = document.getElementById('next-btn');

    options.forEach(function (btn) { btn.disabled = true; });

    var isCorrect = (selectedIndex === q.correct);
    if (isCorrect) score++;
    answered.push(isCorrect);

    options[q.correct].classList.add('correct');
    if (!isCorrect) options[selectedIndex].classList.add('incorrect');

    var lang = getLang();
    var correctPfx = lang === 'fr' ? '&#x2705; Exact\u00a0! ' : '&#x2705; That\'s right! ';
    var wrongPfx   = lang === 'fr' ? '&#x1F4A1; Pas tout \u00e0 fait. ' : '&#x1F4A1; Not quite. ';
    feedback.innerHTML = (isCorrect ? correctPfx : wrongPfx) + escHTML(q.explain);
    feedback.className = 'quiz-feedback show ' + (isCorrect ? 'correct-fb' : 'incorrect-fb');
    nextBtn.disabled = false;
  }

  /* ── Next question ─────────────────────────────────────────── */
  function nextQuestion(container) {
    currentQ++;
    if (currentQ < questions.length) {
      renderQuestion(container);
    } else {
      renderResults(container);
    }
  }

  /* ── Results screen ────────────────────────────────────────── */
  function renderResults(container) {
    var passed   = score >= PASS_SCORE;
    var perfect  = score === questions.length;
    var percent  = Math.round((score / questions.length) * 100);
    var icon     = passed ? '&#127942;' : '&#128218;';
    var lang     = getLang();

    var heading  = passed
      ? (lang === 'fr' ? 'F&#233;licitations &#8212; Vous avez r&#233;ussi!' : 'Congratulations &#8212; You Passed!')
      : (lang === 'fr' ? 'Bel effort!' : 'Great Effort!');

    /* Save to LocalStorage */
    var dateStr = new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });
    localStorage.setItem('finalQuizScore', percent);
    localStorage.setItem('finalQuizDate', dateStr);

    var extraHTML = '';
    if (perfect) {
      extraHTML = '<div class="confidence-check-box" style="margin-top:16px;">' +
        '&#127775; <strong>' + (lang === 'fr' ? 'Score parfait!' : 'A perfect score!') + '</strong> ' +
        (lang === 'fr'
          ? 'C\'est vraiment exceptionnel. Vous avez ma&#238;tris&#233; chaque sujet de ce programme.'
          : 'That is truly exceptional. You have mastered every topic in this programme.') +
        '</div>';
    }

    var message = passed
      ? (lang === 'fr'
          ? 'Vous avez obtenu ' + score + '/' + questions.length + ' (' + percent + '&#160;%). Bravo&#160;! Entrez votre pr&#233;nom ci-dessous pour obtenir votre certificat.'
          : 'You scored ' + score + '/' + questions.length + ' (' + percent + '%). You have demonstrated strong digital confidence! Enter your name below to get your Certificate of Completion.')
      : (lang === 'fr'
          ? 'Vous avez obtenu ' + score + '/' + questions.length + ' (' + percent + '&#160;%). Il vous faut 44 bonnes r&#233;ponses sur 60 (74&#160;%) pour r&#233;ussir. Vous pouvez r&#233;essayer autant de fois que vous voulez.'
          : 'You scored ' + score + '/' + questions.length + ' (' + percent + '%). You need 44/' + questions.length + ' (74%) to pass. Great effort &#8212; review the modules you found tricky and try again. There is no limit on retakes.');

    /* Module breakdown */
    var moduleMap = {};
    questions.forEach(function (q, i) {
      var mod = q.module;
      if (!moduleMap[mod]) moduleMap[mod] = { correct: 0, total: 0 };
      moduleMap[mod].total++;
      if (answered[i]) moduleMap[mod].correct++;
    });

    var breakdownRows = '';
    Object.keys(moduleMap).forEach(function (mod) {
      var m = moduleMap[mod];
      var modPct = Math.round((m.correct / m.total) * 100);
      var modPass = modPct >= 74;
      breakdownRows +=
        '<tr class="' + (modPass ? 'mod-pass' : 'mod-review') + '">' +
          '<td>' + escHTML(mod) + '</td>' +
          '<td style="text-align:center;">' + m.correct + '/' + m.total + '</td>' +
          '<td style="text-align:center;">' + (modPass ? '&#x2705;' : '&#x26A0;&#xFE0F;') + '</td>' +
        '</tr>';
    });

    var breakdownLabel   = lang === 'fr' ? 'R&#233;sultats par module' : 'Results by Module';
    var breakdownModCol  = lang === 'fr' ? 'Module' : 'Module';
    var breakdownScoreCol= lang === 'fr' ? 'Score' : 'Score';
    var breakdownStatusCol = lang === 'fr' ? '&#201;tat' : 'Status';

    var breakdownHTML =
      '<details class="quiz-breakdown" style="margin-top:28px;text-align:left;">' +
        '<summary style="font-size:1rem;font-weight:700;cursor:pointer;padding:10px 0;color:var(--accent-primary);">' +
          '&#128202; ' + breakdownLabel +
        '</summary>' +
        '<table class="quiz-breakdown-table">' +
          '<thead><tr>' +
            '<th>' + breakdownModCol + '</th>' +
            '<th style="text-align:center;">' + breakdownScoreCol + '</th>' +
            '<th style="text-align:center;">' + breakdownStatusCol + '</th>' +
          '</tr></thead>' +
          '<tbody>' + breakdownRows + '</tbody>' +
        '</table>' +
      '</details>';

    var printLabel = lang === 'fr' ? '&#128424; Imprimer mes r&#233;sultats' : '&#128424; Print My Results';
    var certLabel  = lang === 'fr' ? '&#127891; Obtenir mon certificat' : '&#127891; Get My Certificate';
    var retakeLabel = lang === 'fr' ? 'R&#233;essayer' : 'Retake Quiz';
    var reviewLabel = lang === 'fr' ? 'Revoir les modules' : 'Review Modules';
    var certNameLabel = lang === 'fr' ? 'Votre pr&#233;nom pour le certificat&#160;:' : 'Your name for the certificate:';
    var certNamePlaceholder = lang === 'fr' ? 'ex. Marguerite Tremblay' : 'e.g. Margaret Wilson';
    var resourcesLabel = lang === 'fr' ? 'Où trouver plus d’aide &#8594;' : 'Where to get more help &#8594;';

    var nameSection = passed
      ? '<div class="name-input-section" style="margin-top:24px;">' +
          '<label for="cert-name" style="display:block;margin-bottom:8px;font-weight:600;">' +
            certNameLabel +
          '</label>' +
          '<input type="text" id="cert-name" placeholder="' + certNamePlaceholder + '" maxlength="60" ' +
            'style="font-size:18px;padding:10px;border:2px solid #ddd;border-radius:8px;width:100%;box-sizing:border-box;">' +
        '</div>' +
        '<div class="quiz-results-actions">' +
          '<button class="quiz-btn quiz-btn-primary btn-success" id="get-cert-btn">' + certLabel + '</button>' +
          '<button class="quiz-btn quiz-btn-secondary" id="print-results-btn">' + printLabel + '</button>' +
          '<button class="quiz-btn quiz-btn-secondary" id="retake-btn">' + retakeLabel + '</button>' +
        '</div>' +
        '<div style="margin-top:20px;text-align:center;">' +
          '<a href="support-directory.html" style="color:var(--accent-primary);font-size:16px;">' + resourcesLabel + '</a>' +
        '</div>'
      : '<div class="quiz-results-actions">' +
          '<a href="index.html" class="quiz-btn quiz-btn-secondary">' + reviewLabel + '</a>' +
          '<button class="quiz-btn quiz-btn-secondary" id="print-results-btn">' + printLabel + '</button>' +
          '<button class="quiz-btn quiz-btn-primary" id="retake-btn">' + retakeLabel + '</button>' +
        '</div>' +
        '<div style="margin-top:20px;text-align:center;">' +
          '<a href="support-directory.html" style="color:var(--accent-primary);font-size:16px;">' + resourcesLabel + '</a>' +
        '</div>';

    container.innerHTML =
      '<div class="quiz-container"><div class="quiz-results">' +
        '<span class="quiz-results-icon">' + icon + '</span>' +
        '<h2>' + heading + '</h2>' +
        '<div class="quiz-results-score ' + (passed ? 'passing' : 'failing') + '">' + percent + '%</div>' +
        '<p class="quiz-results-message">' + message + '</p>' +
        extraHTML +
        breakdownHTML +
        nameSection +
      '</div></div>';

    if (passed) {
      document.getElementById('get-cert-btn').addEventListener('click', function () {
        var name = (document.getElementById('cert-name').value || '').trim();
        if (name) localStorage.setItem('dc-user-name', name);
        window.location.href = 'certificate.html';
      });
    }
    var printBtn = document.getElementById('print-results-btn');
    if (printBtn) printBtn.addEventListener('click', function () { window.print(); });
    var retakeBtn = document.getElementById('retake-btn');
    if (retakeBtn) retakeBtn.addEventListener('click', function () { startQuiz(container); });
  }

  /* ── Module completion check ─────────────────────────────── */
  /* v2 modules persist checklist progress through DCC.winStep() into
     "dccv2-wins-module-<N>" (a JSON array of ticked checkbox ids — see
     js/dcc.js SW_PREFIX/winStep and js/module.js's data-checklist wiring).
     No total is stored alongside the array, so "all done" is checked
     against each module's known checklist item count below (kept in sync
     with the <ul class="checklist" data-checklist="module-N"> markup in
     modules/module-N.html). v1 dc-progress-m<N>-<step> keys are kept as a
     fallback so returning classic-era users still register as done. */
  var V2_MODULE_CHECKLIST_TOTAL = {
    1: 4, 2: 7, 3: 6, 4: 6, 5: 5, 6: 5, 7: 6, 8: 6, 9: 6, 10: 6, 11: 6
  };
  function isModuleDone(moduleNum) {
    var v2Key = 'dccv2-wins-module-' + moduleNum;
    var v2Wins;
    try { v2Wins = JSON.parse(localStorage.getItem(v2Key)) || []; }
    catch (e) { v2Wins = []; }
    if (v2Wins.length > 0) {
      var total = V2_MODULE_CHECKLIST_TOTAL[moduleNum];
      return total ? v2Wins.length >= total : true;
    }

    var prefix = 'dc-progress-m' + moduleNum;
    var hasItems = false, allDone = true;
    for (var i = 1; i <= 10; i++) {
      var val = localStorage.getItem(prefix + '-' + i);
      if (val !== null) { hasItems = true; if (val !== 'true') allDone = false; }
    }
    return hasItems && allDone;
  }

  /* ── Check all modules complete ─────────────────────────── */
  function checkFinalQuizUnlock() {
    var allDone = true;
    for (var i = 1; i <= 11; i++) {
      if (!isModuleDone(i)) { allDone = false; break; }
    }
    if (allDone) {
      localStorage.setItem('finalQuizUnlocked', 'true');
      showUnlockNotification();
      showHomeBanner();
    }
    return allDone;
  }

  function showUnlockNotification() {
    if (document.querySelector('.quiz-unlock-notification')) return;
    var el = document.createElement('div');
    el.className = 'quiz-unlock-notification';
    el.innerHTML =
      '<button class="quiz-unlock-close" aria-label="Close">&#x2715;</button>' +
      '<div class="quiz-unlock-content">' +
        '<div class="quiz-unlock-icon">&#127881;</div>' +
        '<h3>All Modules Complete!</h3>' +
        '<p>You\'ve unlocked the Final Assessment. Take the quiz to earn your Certificate.</p>' +
        '<a href="final-quiz.html" class="btn-success">Take Final Assessment &#8594;</a>' +
      '</div>';
    document.body.appendChild(el);
    el.querySelector('.quiz-unlock-close').addEventListener('click', function () { el.remove(); });
  }

  function showHomeBanner() {
    var banner = document.getElementById('final-quiz-banner');
    if (banner) banner.classList.add('visible');
  }

  function escHTML(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  return {
    init: init,
    checkFinalQuizUnlock: checkFinalQuizUnlock,
    showUnlockNotification: showUnlockNotification,
    showHomeBanner: showHomeBanner
  };

})();

document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('quiz-app')) DC_QUIZ.init();
});
