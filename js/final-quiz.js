/* ============================================
   Digital Confidence Centre — Final Quiz
   20 questions covering all 8 modules
   Passing score: 80% (16/20)
   ============================================ */

var DC_QUIZ = (function () {
  'use strict';

  /* ── 20 Questions ─────────────────────────────────────── */
  var questions = [

    /* MODULE 1 — The Escape Hatch */
    {
      module: 'Module 1: The Escape Hatch',
      q: 'Something scary pops up on your iPad saying it has a virus. What is the BEST first thing to do?',
      options: [
        'Call the phone number shown on the screen',
        'Press the Home button or swipe up to return to your Home screen',
        'Turn the iPad off and hide it',
        'Type your password into the box on the screen'
      ],
      correct: 1,
      explain: 'The Home button (or swipe-up gesture) is your Escape Hatch. It closes whatever is on your screen immediately. Scary messages like that are almost always fake — they cannot hurt you if you simply leave the page.'
    },
    {
      module: 'Module 1: The Escape Hatch',
      q: 'Which statement about your iPad is TRUE?',
      options: [
        'You can permanently break your iPad by tapping the wrong thing',
        'Deleting an app removes it forever and it cannot be reinstalled',
        'Almost everything you do on your iPad can be undone, closed, or fixed',
        'Pressing the Home button too many times can damage the device'
      ],
      correct: 2,
      explain: 'Your iPad is very forgiving. Even deleted apps can be reinstalled. Even accidentally opened websites can be closed. The Home button is always safe to press.'
    },

    /* MODULE 2 — Security Shield */
    {
      module: 'Module 2: Security Shield',
      q: 'Which of the following is a WARNING SIGN of a phishing email?',
      options: [
        'The email is longer than one page',
        'The email includes a company logo',
        'Poor grammar, urgent language, and a request to click a link immediately',
        'The email was sent on a weekend'
      ],
      correct: 2,
      explain: 'Phishing emails typically use urgency ("Act now or your account will be closed!"), poor spelling, and links that take you to fake websites. Scammers are in a hurry — they make mistakes.'
    },
    {
      module: 'Module 2: Security Shield',
      q: 'Your bank calls to say there is fraud on your account and asks for your PIN to "verify" it. What do you do?',
      options: [
        'Give them the PIN — it is your bank, after all',
        'Hang up and call your bank back using the number on the back of your bank card',
        'Give them only the last two digits of your PIN',
        'Ask them to call back tomorrow'
      ],
      correct: 1,
      explain: 'Your real bank will NEVER ask for your PIN or password by phone. Hang up immediately and call the number printed on your bank card — not any number given to you in the call.'
    },

    /* MODULE 3 — Passwords */
    {
      module: 'Module 3: Passwords & Security',
      q: 'What is two-factor authentication (2FA)?',
      options: [
        'Using two different passwords for the same account',
        'An extra security step that requires your password PLUS a separate code sent to your phone',
        'Logging in from two different devices at the same time',
        'A type of anti-virus software'
      ],
      correct: 1,
      explain: 'Two-factor authentication adds a second check. Even if a scammer learns your password, they still cannot get in without the code that was sent to your phone.'
    },
    {
      module: 'Module 3: Passwords & Security',
      q: 'Which is the STRONGEST password?',
      options: [
        'password123',
        'MyDogSparky2005',
        'T!ger$unset#Moon42',
        'abc123'
      ],
      correct: 2,
      explain: 'A strong password mixes uppercase letters, lowercase letters, numbers, and symbols — and is not a real word or personal detail. "T!ger$unset#Moon42" uses all four types and is hard to guess.'
    },

    /* MODULE 4 — App Store Safety */
    {
      module: 'Module 4: App Store Safety',
      q: 'Where is the safest place to download apps for your iPhone or iPad?',
      options: [
        'Any website that says "Free Download"',
        'A link sent in a text message from a friend',
        'The official Apple App Store (purple icon with a white "A")',
        'Websites ending in .net or .org'
      ],
      correct: 2,
      explain: 'Apple\'s App Store reviews every app before it can be listed. Downloading from unknown websites or links in messages risks installing harmful software on your device.'
    },
    {
      module: 'Module 4: App Store Safety',
      q: 'A new app you installed asks permission to access your microphone, contacts, AND camera. You only use it to read recipes. What should you do?',
      options: [
        'Allow everything — the app probably needs it',
        'Only allow permissions that make sense for what the app does (for a recipe app: none of those)',
        'Delete the app immediately — all apps that ask for permissions are dangerous',
        'Ignore the request and never use the app again'
      ],
      correct: 1,
      explain: 'Apps should only get the access they genuinely need. A recipe app has no reason to use your microphone or contacts. You can always tap "Don\'t Allow" — the app can still work for its main purpose.'
    },

    /* MODULE 5 — Email & Messages */
    {
      module: 'Module 5: Email & Messages',
      q: 'You receive an email from "Amazon" saying your package is delayed and you must click a link to reschedule. The sender\'s address is "shipping@amazon-delivery-update.net". What do you do?',
      options: [
        'Click the link — it sounds urgent',
        'Reply to the email asking for more information',
        'Do NOT click the link. Go directly to Amazon\'s website by typing amazon.ca in your browser',
        'Forward it to your family to see what they think'
      ],
      correct: 2,
      explain: 'Legitimate Amazon emails come from @amazon.ca or @amazon.com — never from hyphenated domains like "amazon-delivery-update.net". Always go directly to a company\'s website rather than clicking email links.'
    },
    {
      module: 'Module 5: Email & Messages',
      q: 'How do you stop unwanted spam emails from reaching your inbox?',
      options: [
        'Reply to the spam email and ask to be removed',
        'Mark the email as "Junk" or "Spam" in your email app — this teaches it to block similar messages',
        'Delete your email account and create a new one',
        'Call the phone company'
      ],
      correct: 1,
      explain: 'Using the "Mark as Junk/Spam" button trains your email app to recognize and block similar messages in the future. Never reply to spam — it confirms your address is active, which leads to MORE spam.'
    },

    /* MODULE 6 — Banking */
    {
      module: 'Module 6: Banking & Transactions',
      q: 'Which of these is the SAFEST way to access your online banking?',
      options: [
        'Click a link in an email that says it is from your bank',
        'Open your bank\'s official app from your Home screen, or type your bank\'s web address directly',
        'Search Google for "TD Bank login" and click the first result',
        'Use the banking link sent by a friend on Facebook'
      ],
      correct: 1,
      explain: 'Always open your banking app directly from your Home screen, or type your bank\'s web address yourself. Never follow links from emails or social media to log into your bank.'
    },
    {
      module: 'Module 6: Banking & Transactions',
      q: 'You notice a $47 charge on your bank statement from a company you do not recognize. What should you do?',
      options: [
        'Ignore it — it is probably fine',
        'Post about it on Facebook asking if anyone else got the same charge',
        'Call your bank immediately using the number on the back of your card and report the suspicious charge',
        'Wait to see if another charge appears before calling'
      ],
      correct: 2,
      explain: 'Always report unfamiliar charges to your bank right away. The sooner you report it, the easier it is to reverse. Canadian banks have fraud protection — you will not be held responsible for charges you did not make.'
    },

    /* MODULE 7 — Creative Joy */
    {
      module: 'Module 7: Creative Joy',
      q: 'You want to share a photo you took of your grandchild with your daughter. What is a safe, easy way to do this on your iPhone?',
      options: [
        'Post it publicly on social media for everyone to see',
        'Use the Share button and send it directly via iMessage or email to your daughter',
        'Take a picture of your screen with another phone',
        'You cannot share photos from an iPhone'
      ],
      correct: 1,
      explain: 'The Share button (the square with an upward arrow) lets you send photos directly and privately via iMessage, email, or WhatsApp. This is much safer than posting publicly.'
    },
    {
      module: 'Module 7: Creative Joy',
      q: 'You accidentally deleted a photo from your iPhone. Where might you be able to find it?',
      options: [
        'It is gone forever once deleted',
        'In the "Recently Deleted" album in the Photos app — photos stay there for 30 days',
        'In your email inbox',
        'You need to call Apple to recover it'
      ],
      correct: 1,
      explain: 'iPhones keep deleted photos in a "Recently Deleted" folder for 30 days. Open the Photos app → Albums → scroll down to "Recently Deleted" to restore them.'
    },

    /* MODULE 8 — Staying Connected */
    {
      module: 'Module 8: Staying Connected',
      q: 'A stranger on Facebook sends you a friend request. Their profile is new, has few photos, and they immediately message asking for gift cards to help a "family emergency." What is this?',
      options: [
        'A genuine emergency and you should help',
        'A common scam targeting people on social media — do not send money or gift cards to anyone you do not know personally',
        'A misunderstanding — reply and ask them to explain',
        'Probably a relative you forgot about'
      ],
      correct: 1,
      explain: 'Gift card requests from strangers (or apparent strangers) on social media are an extremely common scam. No legitimate emergency ever requires you to pay with gift cards. Block and report the account.'
    },
    {
      module: 'Module 8: Staying Connected',
      q: 'During a FaceTime call your grandchild\'s screen freezes. What is the most likely cause and solution?',
      options: [
        'Your iPad is broken — take it to the Apple Store',
        'A slow Wi-Fi connection. Move closer to your router or ask your grandchild to check their connection',
        'You need to pay more for a better FaceTime subscription',
        'FaceTime only works in Canada'
      ],
      correct: 1,
      explain: 'Frozen or blurry video calls are almost always caused by a slow internet connection. Moving closer to your Wi-Fi router usually fixes it. FaceTime is free and works worldwide — no paid subscription needed.'
    },

    /* GENERAL / CROSS-MODULE */
    {
      module: 'General Knowledge',
      q: 'Your iPad asks to install a software update. What should you do?',
      options: [
        'Ignore all updates — they slow your device down',
        'Wait at least a year before updating',
        'Install the update — updates fix security problems and keep your device protected',
        'Call Apple to ask permission first'
      ],
      correct: 2,
      explain: 'Software updates are important security fixes. Apple releases them when they discover vulnerabilities — installing updates promptly keeps your device safe. You can schedule updates to happen overnight while you sleep.'
    },
    {
      module: 'General Knowledge',
      q: 'Which of these Wi-Fi networks is the SAFEST to use for banking or shopping?',
      options: [
        '"Free_Mall_WiFi" at your local shopping centre',
        '"Tim_Hortons_Guest" at a coffee shop',
        'Your own home Wi-Fi network with a password',
        'Any public Wi-Fi that says "Secure"'
      ],
      correct: 2,
      explain: 'Your home Wi-Fi is private and password-protected. Public Wi-Fi networks can be monitored by others on the same network. Save banking and shopping for when you are on your home network, or use your phone\'s cellular data instead.'
    },
    {
      module: 'General Knowledge',
      q: 'What does the padlock icon (🔒) in the address bar of your browser mean?',
      options: [
        'The website is owned by the government',
        'The website has been checked by police for safety',
        'The connection between your device and the website is encrypted (private)',
        'You are not allowed to copy content from the site'
      ],
      correct: 2,
      explain: 'The padlock means the website uses HTTPS encryption — data sent between you and the site is scrambled so others cannot intercept it. Always look for the padlock before entering passwords or payment information.'
    },
    {
      module: 'General Knowledge',
      q: 'If someone phones claiming to be from "Microsoft Support" and says your computer has a virus, and asks you to let them connect remotely to fix it, you should:',
      options: [
        'Let them connect — Microsoft Support is trustworthy',
        'Give them your computer password so they can help',
        'Hang up immediately. Microsoft does not make unsolicited calls like this. It is a scam.',
        'Tell them to call back next week'
      ],
      correct: 2,
      explain: 'Microsoft, Apple, and other tech companies do NOT call you out of the blue about viruses on your computer. These "tech support" calls are scams. The caller wants remote access to steal your files, passwords, or money. Hang up.'
    },
    {
      module: 'General Knowledge',
      q: 'You have completed all 8 modules of the Digital Confidence Centre. What does that mean?',
      options: [
        'You know everything there is to know and will never be scammed',
        'You have built real skills to navigate your devices safely, spot scams, and stay connected — and you can always come back to review',
        'You must now take an in-person exam at your library',
        'Your device is now automatically protected from all threats'
      ],
      correct: 1,
      explain: 'Congratulations! Completing these modules means you have taken real, meaningful steps toward digital confidence. Technology keeps changing, so staying curious and reviewing what you have learned are the best habits you can have.'
    }
  ];

  var PASS_SCORE   = 16; // out of 20
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
          '<p style="color:#455A64;font-size:17px;margin:8px 0 0;">20 questions &nbsp;·&nbsp; Pass with 80% &nbsp;·&nbsp; Take your time</p>' +
        '</div>' +
        '<div class="quiz-question" style="text-align:center;">' +
          '<div style="font-size:72px;margin-bottom:24px;">📋</div>' +
          '<h3 style="font-size:24px;">You\'ve earned this!</h3>' +
          '<p style="font-size:18px;color:var(--text-secondary);margin-bottom:32px;">' +
            'This 20-question assessment covers all 8 modules. ' +
            'You need 16 correct answers (80%) to pass and receive your certificate.<br><br>' +
            'There is no time limit. Read each question carefully.' +
          '</p>' +
          '<button class="quiz-btn quiz-btn-primary" id="start-quiz-btn" style="font-size:20px;padding:18px 48px;">Start Assessment</button>' +
        '</div>' +
      '</div>';

    document.getElementById('start-quiz-btn').addEventListener('click', function () {
      startQuiz(container);
    });
  }

  /* ── Start quiz ──────────────────────────────────────────── */
  function startQuiz(container) {
    currentQ    = 0;
    score       = 0;
    answered    = [];
    quizStarted = true;
    renderQuestion(container);
  }

  /* ── Render question ─────────────────────────────────────── */
  function renderQuestion(container) {
    var q = questions[currentQ];
    var pct = Math.round(((currentQ) / questions.length) * 100);

    var optionsHTML = '';
    var letters = ['A', 'B', 'C', 'D'];
    q.options.forEach(function (opt, i) {
      optionsHTML +=
        '<button class="quiz-option" data-index="' + i + '">' +
          '<span class="quiz-option-letter">' + letters[i] + '</span>' +
          '<span>' + escHTML(opt) + '</span>' +
        '</button>';
    });

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
          '<button class="quiz-btn quiz-btn-primary" id="next-btn" disabled>Next →</button>' +
        '</div>' +
      '</div>';

    // Attach option listeners
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

    // Disable all options
    options.forEach(function (btn) { btn.disabled = true; });

    var isCorrect = (selectedIndex === q.correct);
    if (isCorrect) score++;
    answered.push(isCorrect);

    // Mark correct and selected
    options[q.correct].classList.add('correct');
    if (!isCorrect) {
      options[selectedIndex].classList.add('incorrect');
    }

    // Show feedback
    feedback.textContent = (isCorrect ? '✅ Correct! ' : '❌ Not quite. ') + q.explain;
    feedback.className = 'quiz-feedback show ' + (isCorrect ? 'correct-fb' : 'incorrect-fb');

    // Enable next
    nextBtn.disabled = false;

    // Update label on last question
    if (currentQ === questions.length - 1) {
      nextBtn.textContent = 'See My Results';
    }
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
    var heading  = passed ? 'Congratulations — You Passed!' : 'Great Effort — Keep Going!';
    var message  = passed
      ? 'You scored ' + score + '/20 (' + percent + '%). You have demonstrated real digital confidence. Enter your name below to print your Certificate of Completion.'
      : 'You scored ' + score + '/20 (' + percent + '%). You need 16/20 to pass. Review the modules and try again — you are closer than you think!';

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
      '<div class="quiz-container">' +
        '<div class="quiz-results">' +
          '<span class="quiz-results-icon">' + icon + '</span>' +
          '<h2>' + heading + '</h2>' +
          '<div class="quiz-results-score ' + (passed ? 'passing' : 'failing') + '">' + percent + '%</div>' +
          '<p class="quiz-results-message">' + message + '</p>' +
          nameSection +
        '</div>' +
      '</div>';

    if (passed) {
      document.getElementById('print-cert-btn').addEventListener('click', function () {
        var name = (document.getElementById('cert-name').value || 'a Digital Confidence Centre learner').trim();
        printCertificate(name, percent);
      });
    }

    var retakeBtn = document.getElementById('retake-btn');
    if (retakeBtn) {
      retakeBtn.addEventListener('click', function () {
        startQuiz(container);
      });
    }
  }

  /* ── Certificate generation ─────────────────────────────── */
  function printCertificate(name, percent) {
    var dateStr = new Date().toLocaleDateString('en-CA', {
      year: 'numeric', month: 'long', day: 'numeric'
    });

    var html =
      '<!DOCTYPE html><html><head><title>Certificate of Completion</title>' +
      '<style>' +
        '@page{size:letter;margin:0}' +
        'body{font-family:Georgia,serif;margin:0;padding:60px;background:#fff}' +
        '.cert{border:8px double #2C3E50;padding:60px;text-align:center;min-height:680px;background:linear-gradient(to bottom,#FFFFFF 0%,#F8F9FA 100%)}' +
        '.cert-org{font-size:14px;color:#546E7A;letter-spacing:4px;text-transform:uppercase;margin-bottom:16px}' +
        '.cert-title{font-size:44px;color:#1A237E;margin:0 0 12px;font-weight:bold}' +
        '.cert-subtitle{font-size:18px;color:#546E7A;margin-bottom:32px}' +
        '.cert-seal{font-size:72px;margin:24px 0}' +
        '.cert-body{font-size:18px;color:#37474F;line-height:1.8;margin:16px 0}' +
        '.cert-name{font-size:38px;color:#1565C0;margin:20px 0;font-style:italic;border-bottom:2px solid #BBDEFB;display:inline-block;padding:0 40px 8px}' +
        '.cert-score{font-size:22px;color:#2E7D32;font-weight:bold;margin:24px 0}' +
        '.cert-modules{font-size:14px;color:#546E7A;max-width:500px;margin:12px auto;line-height:1.8}' +
        '.cert-date{font-size:15px;color:#546E7A;margin-top:40px}' +
        '.cert-signature{margin-top:32px;padding-top:16px;border-top:1px solid #E0E0E0;font-size:14px;color:#90A4AE}' +
      '</style></head><body>' +
      '<div class="cert">' +
        '<div class="cert-org">Digital Confidence Centre</div>' +
        '<div class="cert-title">Certificate of Completion</div>' +
        '<div class="cert-subtitle">Digital Literacy Training Programme</div>' +
        '<div class="cert-seal">🏆</div>' +
        '<div class="cert-body">This certifies that</div>' +
        '<div class="cert-name">' + escHTML(name) + '</div>' +
        '<div class="cert-body">has successfully completed the comprehensive 8-module Digital Confidence training programme, demonstrating proficiency in:</div>' +
        '<div class="cert-modules">Device Navigation &nbsp;·&nbsp; Online Security &nbsp;·&nbsp; Password Safety<br>App Store Safety &nbsp;·&nbsp; Email &amp; Messaging &nbsp;·&nbsp; Online Banking<br>Creative Technology &nbsp;·&nbsp; Staying Connected with Family</div>' +
        '<div class="cert-score">Assessment Score: ' + percent + '%</div>' +
        '<div class="cert-date">Awarded on ' + dateStr + '</div>' +
        '<div class="cert-signature">Digital Confidence Centre &nbsp;·&nbsp; digitalconfidencecentre.ca</div>' +
      '</div></body></html>';

    var win = window.open('', '_blank');
    if (win) {
      win.document.write(html);
      win.document.close();
      win.onload = function () { win.print(); };
    }
  }

  /* ── Module completion check ─────────────────────────────── */
  function isModuleDone(moduleNum) {
    // Uses the same keys as progress.js (dc-progress-m{n}-{i})
    var prefix = 'dc-progress-m' + moduleNum;
    var hasItems = false;
    var allDone  = true;
    for (var i = 1; i <= 10; i++) {
      var val = localStorage.getItem(prefix + '-' + i);
      if (val !== null) {
        hasItems = true;
        if (val !== 'true') allDone = false;
      }
    }
    return hasItems && allDone;
  }

  /* ── Check if all modules complete (called from progress.js) */
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

  /* ── Unlock notification toast ─────────────────────────────── */
  function showUnlockNotification() {
    if (document.querySelector('.quiz-unlock-notification')) return;
    var el = document.createElement('div');
    el.className = 'quiz-unlock-notification';
    el.innerHTML =
      '<button class="quiz-unlock-close" aria-label="Close">✕</button>' +
      '<div class="quiz-unlock-content">' +
        '<div class="quiz-unlock-icon">🎉</div>' +
        '<h3>All Modules Complete!</h3>' +
        '<p>You\'ve unlocked the Final Assessment. Take the 20-question quiz to earn your Certificate.</p>' +
        '<a href="final-quiz.html" class="btn-success">Take Final Assessment →</a>' +
      '</div>';

    document.body.appendChild(el);
    el.querySelector('.quiz-unlock-close').addEventListener('click', function () {
      el.remove();
    });
  }

  /* ── Show quiz banner on home page ─────────────────────────── */
  function showHomeBanner() {
    var banner = document.getElementById('final-quiz-banner');
    if (banner) banner.classList.add('visible');
  }

  function escHTML(str) {
    return String(str)
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;');
  }

  return {
    init: init,
    checkFinalQuizUnlock: checkFinalQuizUnlock,
    showUnlockNotification: showUnlockNotification,
    showHomeBanner: showHomeBanner
  };

})();

// Auto-init on quiz page
document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('quiz-app')) {
    DC_QUIZ.init();
  }
});
