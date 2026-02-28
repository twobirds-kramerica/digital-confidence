/* ============================================
   Digital Confidence Centre — Final Quiz
   v2 — 20 scenario-based "What would you do?"
        questions covering all 8 modules
   Passing score: 80% (16/20)
   ============================================ */

var DC_QUIZ = (function () {
  'use strict';

  /* ── 20 Scenario-Based Questions ──────────────────────── */
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
      q: 'You\'re checking your bank statement on your iPad and notice a charge for $89 from "SVC*CLOUDTECH" that you don\'t recognize. What\'s the right first step?',
      options: [
        'Ignore it — small charges sometimes appear and disappear',
        'Post about it on Facebook to see if others got the same charge',
        'Contact your bank immediately using their official app or the number on your card and report the unrecognized charge',
        'Wait three months to see if another charge appears before acting'
      ],
      correct: 2,
      explain: 'Report unknown charges right away. Canadian banks have fraud protection — you won\'t be held responsible for charges you didn\'t make, but reporting quickly makes reversal much easier. "SVC*" often indicates a subscription-type charge that may have signed you up without clear consent.'
    },

    /* MODULE 7 — Creative Joy */
    {
      module: 'Module 7: Creative Joy',
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
      module: 'Module 7: Creative Joy',
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

    /* GENERAL / CROSS-MODULE */
    {
      module: 'General: Device Safety',
      q: 'A pop-up appears on your iPad saying "Your iPad storage is almost full. Tap here to buy extra storage for 99¢/month." The pop-up looks like it\'s from Apple. What should you do?',
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
    {
      module: 'General: Putting It All Together',
      q: 'You\'ve completed all 8 modules of the Digital Confidence Centre. Your neighbour asks how to stay safe online and says "Just give me the one most important rule." What would you tell them?',
      options: [
        '"Never use the internet — it\'s too dangerous"',
        '"If something feels urgent, scary, or too good to be true — pause, close it, and verify through official channels before doing anything"',
        '"Change your password every day to stay safe"',
        '"Only use a computer at the library where staff can help"'
      ],
      correct: 1,
      explain: 'Scammers rely on urgency and fear to prevent you from thinking clearly. The single most powerful habit is the pause. Whether it\'s a scary pop-up, an urgent email, or a suspicious phone call — stop, close it, breathe, and then verify through channels you know are real. That one habit protects you from the vast majority of threats.'
    }
  ];

  var PASS_SCORE   = 16;
  var currentQ     = 0;
  var score        = 0;
  var answered     = [];
  var quizStarted  = false;

  /* ── Public init ────────────────────────────────────────── */
  function init() {
    var container = document.getElementById('quiz-app');
    if (!container) return;

    var unlocked = localStorage.getItem('finalQuizUnlocked') === 'true'
                || localStorage.getItem('dc-quiz-dev-bypass') === 'true';

    if (!unlocked) {
      renderLocked(container);
    } else {
      renderStart(container);
    }
  }

  /* ── Locked screen ───────────────────────────────────────── */
  function renderLocked(container) {
    var statuses = '';
    for (var i = 1; i <= 8; i++) {
      var done = isModuleDone(i);
      statuses += '<li class="' + (done ? 'done' : 'pending') + '">' +
        (done ? '✅' : '⬜') + ' Module ' + i + '</li>';
    }
    container.innerHTML =
      '<div class="quiz-locked-screen">' +
        '<div class="quiz-locked-icon">🔒</div>' +
        '<h1>Final Assessment — Locked</h1>' +
        '<p>Complete all 8 learning modules to unlock the Final Assessment and earn your Certificate of Completion.</p>' +
        '<ul class="module-checklist">' + statuses + '</ul>' +
        '<p><a href="index.html">← Return to Home</a> to continue your modules.</p>' +
      '</div>';
  }

  /* ── Start / intro screen ────────────────────────────────── */
  function renderStart(container) {
    container.innerHTML =
      '<div class="quiz-container">' +
        '<div class="quiz-header">' +
          '<h1>🎓 Final Digital Confidence Assessment</h1>' +
          '<p style="color:#455A64;font-size:17px;margin:8px 0 0;">20 real-life scenarios &nbsp;·&nbsp; Pass with 80% &nbsp;·&nbsp; No time limit</p>' +
        '</div>' +
        '<div class="quiz-question" style="text-align:center;">' +
          '<div style="font-size:72px;margin-bottom:24px;">📋</div>' +
          '<h3 style="font-size:24px;">You\'ve earned this!</h3>' +
          '<p style="font-size:18px;color:var(--text-secondary);margin-bottom:32px;">' +
            'Each question describes a real situation you might encounter. ' +
            'Choose what you would do. There is no time pressure — read carefully.<br><br>' +
            'You need 16 correct answers (80%) to pass and receive your certificate.' +
          '</p>' +
          '<button class="quiz-btn quiz-btn-primary" id="start-quiz-btn" style="font-size:20px;padding:18px 48px;">Begin Assessment</button>' +
        '</div>' +
      '</div>';

    document.getElementById('start-quiz-btn').addEventListener('click', function () {
      startQuiz(container);
    });
  }

  /* ── Start quiz ──────────────────────────────────────────── */
  function startQuiz(container) {
    currentQ = 0; score = 0; answered = []; quizStarted = true;
    renderQuestion(container);
  }

  /* ── Render question ─────────────────────────────────────── */
  function renderQuestion(container) {
    var q = questions[currentQ];
    var pct = Math.round((currentQ / questions.length) * 100);
    var letters = ['A', 'B', 'C', 'D'];

    var optionsHTML = q.options.map(function (opt, i) {
      return '<button class="quiz-option" data-index="' + i + '">' +
        '<span class="quiz-option-letter">' + letters[i] + '</span>' +
        '<span>' + escHTML(opt) + '</span>' +
      '</button>';
    }).join('');

    container.innerHTML =
      '<div class="quiz-container">' +
        '<div class="quiz-header">' +
          '<h1>Final Assessment</h1>' +
          '<div class="quiz-progress-bar-wrap">' +
            '<div class="quiz-progress-bar" style="width:' + pct + '%"></div>' +
          '</div>' +
          '<div class="quiz-progress-label">Question ' + (currentQ + 1) + ' of ' + questions.length + '</div>' +
        '</div>' +
        '<div class="quiz-question" id="current-question">' +
          '<span class="quiz-module-tag">' + escHTML(q.module) + '</span>' +
          '<h3>' + escHTML(q.q) + '</h3>' +
          '<div class="quiz-options" id="options-wrap">' + optionsHTML + '</div>' +
          '<div class="quiz-feedback" id="quiz-feedback"></div>' +
        '</div>' +
        '<div class="quiz-nav">' +
          '<button class="quiz-btn quiz-btn-primary" id="next-btn" disabled>' +
            (currentQ === questions.length - 1 ? 'See My Results' : 'Next Question →') +
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

    feedback.textContent = (isCorrect ? '✅ That\'s right! ' : '❌ Not quite. ') + q.explain;
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
    var percent  = Math.round((score / questions.length) * 100);
    var icon     = passed ? '🏆' : '📚';
    var heading  = passed ? 'Congratulations — You Passed!' : 'Great Effort!';

    var message  = passed
      ? 'You scored ' + score + '/20 (' + percent + '%). You\'ve demonstrated strong digital confidence! Enter your name below to print your Certificate.'
      : 'You scored ' + score + '/20 (' + percent + '%). You need 16/20 to pass. Review the modules and try again — you\'re closer than you think!';

    var nameSection = passed
      ? '<div class="name-input-section">' +
          '<label for="cert-name">Your name for the certificate:</label>' +
          '<input type="text" id="cert-name" placeholder="e.g. Margaret Wilson" maxlength="60">' +
        '</div>' +
        '<div class="quiz-results-actions">' +
          '<button class="quiz-btn quiz-btn-primary btn-success" id="print-cert-btn">🎓 Print My Certificate</button>' +
          '<button class="quiz-btn quiz-btn-secondary" id="retake-btn">Retake Quiz</button>' +
        '</div>'
      : '<div class="quiz-results-actions">' +
          '<a href="index.html" class="quiz-btn quiz-btn-secondary">Review Modules</a>' +
          '<button class="quiz-btn quiz-btn-primary" id="retake-btn">Try Again</button>' +
        '</div>';

    container.innerHTML =
      '<div class="quiz-container"><div class="quiz-results">' +
        '<span class="quiz-results-icon">' + icon + '</span>' +
        '<h2>' + heading + '</h2>' +
        '<div class="quiz-results-score ' + (passed ? 'passing' : 'failing') + '">' + percent + '%</div>' +
        '<p class="quiz-results-message">' + message + '</p>' +
        nameSection +
      '</div></div>';

    if (passed) {
      document.getElementById('print-cert-btn').addEventListener('click', function () {
        var name = (document.getElementById('cert-name').value || 'a Digital Confidence Centre learner').trim();
        printCertificate(name, percent);
      });
    }
    var retakeBtn = document.getElementById('retake-btn');
    if (retakeBtn) retakeBtn.addEventListener('click', function () { startQuiz(container); });
  }

  /* ── Professional Certificate ───────────────────────────── */
  function printCertificate(name, percent) {
    var dateStr = new Date().toLocaleDateString('en-CA', {
      year: 'numeric', month: 'long', day: 'numeric'
    });

    var html = '<!DOCTYPE html><html lang="en"><head>' +
      '<meta charset="UTF-8"><title>Certificate of Digital Confidence</title>' +
      '<style>' +
        '@page{size:letter portrait;margin:0}' +
        '@media print{body{margin:0;-webkit-print-color-adjust:exact;print-color-adjust:exact}}' +
        'body{font-family:Georgia,"Times New Roman",serif;margin:0;padding:0;background:white}' +
        '.cert-page{width:8.5in;height:11in;padding:0.75in;box-sizing:border-box;position:relative;background:white}' +
        '.cert-border{border:12px double #2C3E50;padding:0.5in;height:100%;box-sizing:border-box;position:relative;background:linear-gradient(to bottom,#FFFFFF 0%,#F8F9FA 100%)}' +
        '.corner{position:absolute;font-size:40px;color:#CFD8DC;line-height:1}' +
        '.c-tl{top:20px;left:20px}.c-tr{top:20px;right:20px}.c-bl{bottom:20px;left:20px}.c-br{bottom:20px;right:20px}' +
        '.cert-content{text-align:center;padding:32px 20px}' +
        '.cert-org{font-size:13px;color:#546E7A;letter-spacing:4px;text-transform:uppercase;margin-bottom:12px;font-weight:600}' +
        '.cert-title{font-size:52px;color:#1565C0;margin:16px 0 8px;font-weight:bold;line-height:1.2}' +
        '.cert-subtitle{font-size:20px;color:#37474F;margin-bottom:40px;font-weight:500}' +
        '.cert-logo{font-size:72px;margin-bottom:16px}' +
        '.cert-awarded{font-size:16px;color:#546E7A;margin-bottom:12px;font-style:italic}' +
        '.cert-name{font-size:44px;color:#2C3E50;margin:20px 0;font-weight:bold;font-style:italic;border-bottom:3px solid #2C3E50;display:inline-block;padding:0 40px 10px;min-width:380px}' +
        '.cert-body{font-size:16px;color:#37474F;line-height:1.8;margin:28px auto;max-width:540px}' +
        '.cert-achievement{background:linear-gradient(135deg,#E8F5E9 0%,#C8E6C9 100%);border:2px solid #4CAF50;border-radius:12px;padding:18px 24px;margin:24px auto;max-width:460px}' +
        '.cert-achievement h3{color:#2E7D32;margin:0 0 8px;font-size:18px}' +
        '.cert-score{font-size:32px;color:#2E7D32;font-weight:bold;margin:6px 0}' +
        '.cert-skills{text-align:left;margin:20px auto;max-width:500px;color:#37474F;font-size:14px;line-height:1.6}' +
        '.cert-skills strong{display:block;margin-bottom:6px;color:#2C3E50;font-size:15px}' +
        '.cert-skills ul{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:1fr 1fr;gap:4px 20px}' +
        '.cert-skills li{padding-left:22px;position:relative}' +
        '.cert-skills li:before{content:"✓";position:absolute;left:0;color:#4CAF50;font-weight:bold}' +
        '.cert-footer{margin-top:40px;padding-top:16px;border-top:2px solid #CFD8DC;display:flex;justify-content:space-between;align-items:flex-end}' +
        '.cert-seal{text-align:center}' +
        '.seal-icon{font-size:56px;display:block;margin-bottom:4px}' +
        '.seal-text{font-size:11px;color:#546E7A;letter-spacing:2px;text-transform:uppercase}' +
        '.cert-date-block{text-align:right;font-size:15px;color:#546E7A}' +
        '.cert-date-block strong{display:block;font-size:16px;color:#2C3E50;margin-top:4px}' +
      '</style></head><body>' +
      '<div class="cert-page"><div class="cert-border">' +
        '<div class="corner c-tl">✦</div><div class="corner c-tr">✦</div>' +
        '<div class="corner c-bl">✦</div><div class="corner c-br">✦</div>' +
        '<div class="cert-content">' +
          '<div class="cert-org">Digital Confidence Centre</div>' +
          '<div class="cert-title">Certificate of Completion</div>' +
          '<div class="cert-subtitle">Digital Literacy Training Programme</div>' +
          '<div class="cert-logo">🎓</div>' +
          '<div class="cert-awarded">This certificate is proudly awarded to</div>' +
          '<div class="cert-name">' + escHTML(name) + '</div>' +
          '<div class="cert-body">In recognition of successfully completing the comprehensive 8-module Digital Confidence training programme, demonstrating applied proficiency in safe and confident use of digital devices and online services.</div>' +
          '<div class="cert-achievement">' +
            '<h3>Final Assessment Result</h3>' +
            '<div class="cert-score">' + percent + '% — Proficient</div>' +
            '<p style="margin:4px 0 0;color:#2E7D32;font-size:14px;">Scenario-based assessment passed</p>' +
          '</div>' +
          '<div class="cert-skills"><strong>Competencies Demonstrated:</strong>' +
            '<ul>' +
              '<li>Device navigation &amp; escape hatch</li><li>Online security &amp; scam awareness</li>' +
              '<li>Password management</li><li>Safe app installation</li>' +
              '<li>Email &amp; messaging security</li><li>Online banking safety</li>' +
              '<li>Creative device applications</li><li>Family connectivity</li>' +
            '</ul>' +
          '</div>' +
          '<div class="cert-footer">' +
            '<div class="cert-seal"><span class="seal-icon">🏆</span><span class="seal-text">Official Certificate</span></div>' +
            '<div class="cert-date-block">Awarded on<strong>' + dateStr + '</strong>digitalconfidencecentre.ca</div>' +
          '</div>' +
        '</div>' +
      '</div></div>' +
      '<script>window.onload=function(){setTimeout(function(){window.print();},600);};<\/script>' +
      '</body></html>';

    var win = window.open('', '_blank', 'width=900,height=1150');
    if (win) {
      win.document.write(html);
      win.document.close();
    }
  }

  /* ── Module completion check ─────────────────────────────── */
  function isModuleDone(moduleNum) {
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
    for (var i = 1; i <= 8; i++) {
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
      '<button class="quiz-unlock-close" aria-label="Close">✕</button>' +
      '<div class="quiz-unlock-content">' +
        '<div class="quiz-unlock-icon">🎉</div>' +
        '<h3>All Modules Complete!</h3>' +
        '<p>You\'ve unlocked the Final Assessment. Take the quiz to earn your Certificate.</p>' +
        '<a href="final-quiz.html" class="btn-success">Take Final Assessment →</a>' +
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
      .replace(/&/g,'&amp;').replace(/</g,'&lt;')
      .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
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
