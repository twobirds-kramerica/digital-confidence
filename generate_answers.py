#!/usr/bin/env python3
"""Generate 27 AEO answer pages for Digital Confidence Centre."""
import os

BASE = r'C:\Users\getkr\brenda-digital-confidence\answers'

PAGES = [
    {
        "file": "how-to-spot-phone-scam.html",
        "question": "How do I know if a phone call is a scam?",
        "question_fr": "Comment savoir si un appel téléphonique est une arnaque ?",
        "title": "How to Spot a Phone Scam — Digital Confidence Centre",
        "desc": "Not sure if a phone call is a scam? Learn the warning signs — urgent demands, gift card requests, and CRA impersonators. Tips for Canadian seniors.",
        "module": "module-2.html",
        "module_name": "Module 2: The Security Shield",
        "breadcrumb_short": "How to Spot a Phone Scam",
        "breadcrumb_short_fr": "Comment repérer une arnaque téléphonique",
        "answer_en": "Scam calls follow predictable patterns once you know what to look for. The biggest warning sign is urgency — a caller who says you must act right now, or something terrible will happen. Real organisations (CRA, banks, police) never demand immediate payment by gift card, wire transfer, or cryptocurrency. Another red flag is secrecy — being told not to tell your family or banker. Caller ID can be faked, so even a number that looks official may not be. If a call makes you feel anxious or afraid, that feeling is the scam working as intended. You can always hang up and call the organisation back using the number from their official website or the back of your card.",
        "answer_fr": "Les appels frauduleux suivent des schémas prévisibles. Le plus grand signe d'alerte est l'urgence — un appelant qui dit que vous devez agir immédiatement. Les vraies organisations ne demandent jamais de paiement immédiat par carte-cadeau. Si un appel vous rend anxieux, raccrochez et rappelez l'organisation en utilisant le numéro officiel.",
        "steps_en": [
            "Notice if you feel rushed, frightened, or pressured — that is the first sign of a scam.",
            "Scammers often claim to be from CRA, your bank, police, or a grandchild in trouble.",
            "They ask for gift cards, wire transfers, or cryptocurrencies — real organisations never do this.",
            "Caller ID can be faked — a familiar-looking number proves nothing.",
            "Hang up. You can always call back using the real number from the organisation's website.",
            "Tell a trusted person about the call — reporting it helps warn others."
        ],
        "steps_fr": [
            "Remarquez si vous vous sentez pressé ou effrayé — c'est le premier signe d'une arnaque.",
            "Les escrocs prétendent souvent être de l'ARC, votre banque ou un petit-enfant en difficulté.",
            "Ils demandent des cartes-cadeaux ou des virements — les vraies organisations ne font jamais cela.",
            "L'identification de l'appelant peut être falsifiée — un numéro familier ne prouve rien.",
            "Raccrochez. Vous pouvez toujours rappeler avec le vrai numéro officiel.",
            "Parlez de l'appel à une personne de confiance."
        ],
        "rule_en": "If anyone on the phone asks you to pay with a gift card — that is always a scam. Every time. No exceptions.",
        "rule_fr": "Si quelqu'un au téléphone vous demande de payer avec une carte-cadeau — c'est toujours une arnaque. Toujours.",
        "warning_en": "The CRA will never call you demanding immediate payment or threatening arrest. If you receive this type of call, hang up immediately.",
        "warning_fr": "L'ARC ne vous appellera jamais pour exiger un paiement immédiat ou menacer une arrestation. Si vous recevez ce type d'appel, raccrochez immédiatement."
    },
    {
        "file": "is-this-email-safe.html",
        "question": "How do I know if an email is safe to open?",
        "question_fr": "Comment savoir si un courriel est sûr à ouvrir ?",
        "title": "Is This Email Safe? How to Tell — Digital Confidence Centre",
        "desc": "Not sure if an email is safe? Learn how to spot phishing, fake senders, and dangerous links — simple tips for Canadian seniors.",
        "module": "module-5.html",
        "module_name": "Module 5: Email & Messages",
        "breadcrumb_short": "Is This Email Safe?",
        "breadcrumb_short_fr": "Ce courriel est-il sûr ?",
        "answer_en": "Opening an email is generally safe — the danger is in clicking links or attachments inside it. Before clicking anything, check who actually sent it. Look at the full email address (not just the name), and hover over any link to see where it really goes. Scam emails often create urgency — 'Your account will be closed!' or 'You have won a prize!' Real organisations never ask you to enter your password by clicking a link in an email. If you are not expecting an attachment, do not open it. When in doubt, delete the email and contact the sender directly by phone or by typing their website address yourself.",
        "answer_fr": "Ouvrir un courriel est généralement sûr — le danger est de cliquer sur des liens ou des pièces jointes. Vérifiez qui l'a vraiment envoyé. Les courriels frauduleux créent souvent l'urgence. En cas de doute, supprimez le courriel et contactez l'expéditeur directement par téléphone.",
        "steps_en": [
            "Check the sender's full email address — not just the display name.",
            "Look for urgency or threats — 'Act now!' and 'Your account is at risk!' are red flags.",
            "Hover over any link before clicking to see the real destination URL.",
            "Never enter your password after clicking a link in an email.",
            "Do not open attachments you were not expecting.",
            "If unsure, delete it and contact the company directly by typing their address yourself."
        ],
        "steps_fr": [
            "Vérifiez l'adresse courriel complète de l'expéditeur.",
            "Recherchez l'urgence ou les menaces — ce sont des signaux d'alarme.",
            "Survolez tout lien avant de cliquer pour voir la vraie destination.",
            "N'entrez jamais votre mot de passe après avoir cliqué sur un lien dans un courriel.",
            "N'ouvrez pas les pièces jointes inattendues.",
            "En cas de doute, supprimez-le et contactez l'entreprise directement."
        ],
        "rule_en": "Pause 3 seconds before clicking any link in an email. Ask: was I expecting this? Does the sender address match?",
        "rule_fr": "Faites une pause de 3 secondes avant de cliquer sur un lien dans un courriel. Demandez-vous : l'adresse de l'expéditeur correspond-elle ?",
        "warning_en": "Clicking a link in a phishing email can install harmful software or steal your passwords — even on an iPad. The safest habit is to type website addresses yourself.",
        "warning_fr": "Cliquer sur un lien dans un courriel d'hameçonnage peut installer des logiciels nuisibles ou voler vos mots de passe. L'habitude la plus sûre est de taper vous-même les adresses de sites Web."
    },
    {
        "file": "how-to-video-call-grandchildren.html",
        "question": "How do I video call my grandchildren?",
        "question_fr": "Comment faire un appel vidéo avec mes petits-enfants ?",
        "title": "How to Video Call Your Grandchildren — Digital Confidence Centre",
        "desc": "Learn how to video call your grandchildren using FaceTime or Zoom on your iPhone or iPad. Step-by-step guide for Canadian seniors.",
        "module": "module-8.html",
        "module_name": "Module 8: Stay Connected",
        "breadcrumb_short": "Video Calling Grandchildren",
        "breadcrumb_short_fr": "Appel vidéo aux petits-enfants",
        "answer_en": "Video calling your grandchildren is easier than you might think. If you have an iPhone or iPad and they have an Apple device, FaceTime is the simplest option — it is built in and free. Open the Contacts app, find your grandchild's name, and tap the green FaceTime button. If they use Android or Windows, WhatsApp or Zoom work well on any device. Ask your grandchild or a family member to set up the first call together — after that first connection, you can start calls yourself whenever you like. Good lighting (face a window) and a stable surface for your device make a big difference to the call quality.",
        "answer_fr": "L'appel vidéo à vos petits-enfants est plus facile que vous ne le pensez. Si vous avez un iPhone ou un iPad et qu'ils ont un appareil Apple, FaceTime est l'option la plus simple. Ouvrez l'application Contacts, trouvez le nom de votre petit-enfant et appuyez sur le bouton FaceTime vert.",
        "steps_en": [
            "Open the Contacts app on your iPhone or iPad.",
            "Find your grandchild's name and tap on it.",
            "Tap the green FaceTime button (iPhone/iPad to iPhone/iPad only) or use WhatsApp for any device.",
            "Wait for them to answer — your face will appear on screen.",
            "To end the call, tap the red circle with a phone icon.",
            "If the first call is tricky, ask a family member to help set it up together."
        ],
        "steps_fr": [
            "Ouvrez l'application Contacts sur votre iPhone ou iPad.",
            "Trouvez le nom de votre petit-enfant et appuyez dessus.",
            "Appuyez sur le bouton FaceTime vert ou utilisez WhatsApp pour tout appareil.",
            "Attendez qu'ils répondent — votre visage apparaîtra à l'écran.",
            "Pour terminer l'appel, appuyez sur le cercle rouge avec l'icône téléphone.",
            "Si le premier appel est difficile, demandez à un membre de la famille de vous aider."
        ],
        "rule_en": "FaceTime only works between Apple devices. For video calls with anyone using Android or a computer, use WhatsApp or Zoom instead.",
        "rule_fr": "FaceTime ne fonctionne qu'entre appareils Apple. Pour les appels vidéo avec des personnes utilisant Android ou un ordinateur, utilisez WhatsApp ou Zoom.",
        "warning_en": "If someone you do not know sends you a FaceTime request, decline it. Only accept video calls from people you know.",
        "warning_fr": "Si quelqu'un que vous ne connaissez pas vous envoie une demande FaceTime, refusez-la. N'acceptez les appels vidéo que de personnes que vous connaissez."
    },
    {
        "file": "online-banking-safely.html",
        "question": "How do I do my banking safely online?",
        "question_fr": "Comment faire mes opérations bancaires en ligne en toute sécurité ?",
        "title": "How to Bank Safely Online — Digital Confidence Centre",
        "desc": "Learn how to use online banking safely on your iPhone or iPad. Tips for Canadian seniors to avoid fraud and protect their money.",
        "module": "module-6.html",
        "module_name": "Module 6: Banking & Transactions",
        "breadcrumb_short": "Online Banking Safely",
        "breadcrumb_short_fr": "Banque en ligne en toute sécurité",
        "answer_en": "Online banking is very safe when you follow a few key habits. Always use your bank's official app (download it from the App Store by searching your bank's name) rather than clicking links in emails. Your bank will never ask for your full password or PIN over the phone or by email. Set up two-factor authentication — this sends a code to your phone when you log in, so even if someone gets your password, they cannot access your account. Check your transactions regularly, even just once a week, so you catch any unfamiliar activity quickly. Log out when you are finished, especially if others use your device.",
        "answer_fr": "Les opérations bancaires en ligne sont très sûres si vous suivez quelques habitudes clés. Utilisez toujours l'application officielle de votre banque plutôt que de cliquer sur des liens dans les courriels. Votre banque ne vous demandera jamais votre mot de passe complet par téléphone ou par courriel.",
        "steps_en": [
            "Download your bank's official app from the App Store — search your bank's name.",
            "Set up Face ID or a strong PIN so only you can open the app.",
            "Enable two-factor authentication in your bank's security settings.",
            "Log in only on your own device, using your home Wi-Fi or mobile data.",
            "Check your account activity at least once a week.",
            "Log out after every session."
        ],
        "steps_fr": [
            "Téléchargez l'application officielle de votre banque depuis l'App Store.",
            "Configurez Face ID ou un NIP fort pour que seul vous puissiez ouvrir l'application.",
            "Activez l'authentification à deux facteurs dans les paramètres de sécurité de votre banque.",
            "Connectez-vous uniquement sur votre propre appareil, en utilisant votre Wi-Fi domestique.",
            "Vérifiez l'activité de votre compte au moins une fois par semaine.",
            "Déconnectez-vous après chaque session."
        ],
        "rule_en": "Your bank will never ask for your full password, your PIN, or your card number over the phone or by email. If someone asks, it is a scam.",
        "rule_fr": "Votre banque ne vous demandera jamais votre mot de passe complet, votre NIP ou votre numéro de carte par téléphone ou par courriel. Si quelqu'un demande, c'est une arnaque.",
        "warning_en": "Never do your banking on public Wi-Fi (at a coffee shop, library, or hotel). Wait until you are on your home network or use your phone's mobile data.",
        "warning_fr": "Ne faites jamais vos opérations bancaires sur un Wi-Fi public (dans un café, une bibliothèque ou un hôtel). Attendez d'être sur votre réseau domestique."
    },
    {
        "file": "what-is-strong-password.html",
        "question": "What makes a password strong?",
        "question_fr": "Qu'est-ce qui rend un mot de passe fort ?",
        "title": "What Makes a Password Strong? — Digital Confidence Centre",
        "desc": "Learn what makes a password strong and how to create one you can remember. Simple tips for Canadian seniors to keep accounts secure.",
        "module": "module-3.html",
        "module_name": "Module 3: Passwords & Biometrics",
        "breadcrumb_short": "What Is a Strong Password?",
        "breadcrumb_short_fr": "Qu'est-ce qu'un mot de passe fort ?",
        "answer_en": "A strong password has three key qualities: it is long (at least 12 characters), it uses a mix of letters, numbers, and symbols, and it is unique to that one account. The easiest way to create a strong password is to use a passphrase — three or four random words joined together, like 'apple-river-clock-9'. This is much harder to guess than 'Password123' but easier for you to remember. The most important rule is never reuse the same password on multiple accounts. If one account gets hacked, all others using the same password are at risk. Consider using Apple's built-in password manager to generate and store strong passwords automatically.",
        "answer_fr": "Un mot de passe fort a trois qualités clés : il est long (au moins 12 caractères), utilise un mélange de lettres, de chiffres et de symboles, et est unique pour ce seul compte. La manière la plus simple est d'utiliser une phrase de passe — trois ou quatre mots aléatoires joints ensemble.",
        "steps_en": [
            "Make it at least 12 characters long — longer is stronger.",
            "Use a passphrase: three random words with numbers, like 'cat-moon-river-42'.",
            "Include at least one number and one symbol if the site requires it.",
            "Never use your name, birthday, or the word 'password'.",
            "Use a different password for every account — especially email and banking.",
            "Let Apple's built-in password manager suggest and remember passwords for you."
        ],
        "steps_fr": [
            "Rendez-le d'au moins 12 caractères — plus c'est long, plus c'est fort.",
            "Utilisez une phrase de passe : trois mots aléatoires avec des chiffres.",
            "Incluez au moins un chiffre et un symbole si le site le demande.",
            "N'utilisez jamais votre nom, votre date de naissance ou le mot 'motdepasse'.",
            "Utilisez un mot de passe différent pour chaque compte.",
            "Laissez le gestionnaire de mots de passe intégré d'Apple suggérer et mémoriser des mots de passe pour vous."
        ],
        "rule_en": "The golden rule: never use the same password on more than one account. If one is hacked, all others stay safe.",
        "rule_fr": "La règle d'or : n'utilisez jamais le même mot de passe sur plus d'un compte. Si l'un est piraté, tous les autres restent sûrs.",
        "warning_en": "Weak passwords are the number one way accounts get hacked. 'Password123' or your pet's name are not safe — even for accounts you think are unimportant.",
        "warning_fr": "Les mots de passe faibles sont la principale façon dont les comptes sont piratés. 'MotDePasse123' ou le nom de votre animal n'est pas sûr."
    },
    {
        "file": "is-it-safe-to-shop-online.html",
        "question": "Is it safe to shop online?",
        "question_fr": "Est-il sûr de magasiner en ligne ?",
        "title": "Is It Safe to Shop Online? — Digital Confidence Centre",
        "desc": "Yes — online shopping is safe when you follow a few simple rules. Tips for Canadian seniors to shop securely and avoid scam websites.",
        "module": "module-6.html",
        "module_name": "Module 6: Banking & Transactions",
        "breadcrumb_short": "Is It Safe to Shop Online?",
        "breadcrumb_short_fr": "Est-il sûr de magasiner en ligne ?",
        "answer_en": "Yes, online shopping is safe when you use well-known, trusted stores. Look for the padlock symbol in your browser's address bar and an address that starts with 'https://' — this means the connection is encrypted. Stick to stores you recognise or that have been recommended by someone you trust. Be cautious of deals that seem too good to be true — fake shops often lure buyers with impossibly low prices. Use your credit card rather than a debit card when possible, as credit cards have better fraud protection. Apple Pay on your iPad or iPhone adds an extra layer of security because it never shares your real card number with the store.",
        "answer_fr": "Oui, le magasinage en ligne est sûr si vous utilisez des magasins de confiance bien connus. Recherchez le symbole du cadenas dans la barre d'adresse de votre navigateur. Méfiez-vous des offres qui semblent trop belles pour être vraies.",
        "steps_en": [
            "Check for the padlock icon and 'https://' in the address bar before entering payment details.",
            "Stick to well-known stores — Amazon, Walmart, Best Buy, Canadian Tire, and other major Canadian retailers.",
            "If a deal seems too good to be true, search the store name plus 'reviews' or 'scam' before buying.",
            "Use a credit card or Apple Pay for better fraud protection.",
            "Check your credit card statement after purchases to spot any unfamiliar charges.",
            "Keep a record of order confirmation numbers and receipts."
        ],
        "steps_fr": [
            "Vérifiez l'icône de cadenas et 'https://' dans la barre d'adresse avant d'entrer les détails de paiement.",
            "Restez dans les magasins bien connus.",
            "Si une offre semble trop belle pour être vraie, recherchez le nom du magasin plus 'avis' avant d'acheter.",
            "Utilisez une carte de crédit ou Apple Pay pour une meilleure protection contre la fraude.",
            "Vérifiez votre relevé de carte de crédit après les achats.",
            "Conservez une trace des numéros de confirmation de commande et des reçus."
        ],
        "rule_en": "If a price seems impossibly low — say, a $2,000 television for $200 — it is almost certainly a scam. Trust your instincts.",
        "rule_fr": "Si un prix semble impossiblement bas — par exemple, un téléviseur de 2 000 $ pour 200 $ — c'est presque certainement une arnaque. Faites confiance à votre instinct.",
        "warning_en": "Never enter your banking details on a website that does not have the padlock icon. Always check the address bar before paying.",
        "warning_fr": "N'entrez jamais vos coordonnées bancaires sur un site Web qui n'a pas l'icône de cadenas. Vérifiez toujours la barre d'adresse avant de payer."
    },
    {
        "file": "what-is-phishing.html",
        "question": "What is phishing and how do I avoid it?",
        "question_fr": "Qu'est-ce que l'hameçonnage et comment l'éviter ?",
        "title": "What Is Phishing? — Digital Confidence Centre",
        "desc": "Phishing is a scam where criminals pretend to be your bank or a trusted company to steal your password. Learn how to spot and avoid it.",
        "module": "module-5.html",
        "module_name": "Module 5: Email & Messages",
        "breadcrumb_short": "What Is Phishing?",
        "breadcrumb_short_fr": "Qu'est-ce que l'hameçonnage ?",
        "answer_en": "Phishing is when scammers pretend to be a trusted organisation — your bank, Canada Post, the CRA, or a popular store — and send you a fake email, text, or message asking you to click a link and enter your login details. The word 'phishing' rhymes with 'fishing' — they are casting a net hoping someone will bite. The fake website looks almost identical to the real one, but anything you type goes directly to the criminals. The most reliable way to avoid phishing is simple: never click a link in an email to log in to an account. Instead, close the email and type the website address yourself in your browser.",
        "answer_fr": "L'hameçonnage, c'est quand des escrocs prétendent être une organisation de confiance et vous envoient un faux courriel vous demandant de cliquer sur un lien et d'entrer vos informations de connexion. La façon la plus fiable d'éviter l'hameçonnage est simple : ne cliquez jamais sur un lien dans un courriel pour vous connecter à un compte.",
        "steps_en": [
            "Recognise the pattern: an urgent email saying your account has a problem, with a link to 'fix' it.",
            "Do not click the link — even if the email looks real.",
            "Open your browser and type the website address yourself (e.g., scotiabank.com).",
            "Check the real sender address — scammers use addresses like 'service@scotiabank-secure.net'.",
            "When in doubt, call the organisation directly using the number on your card or from their official website.",
            "Report phishing emails using the 'Report Junk' button in Apple Mail."
        ],
        "steps_fr": [
            "Reconnaissez le schéma : un courriel urgent disant que votre compte a un problème, avec un lien pour le 'corriger'.",
            "Ne cliquez pas sur le lien — même si le courriel semble réel.",
            "Ouvrez votre navigateur et tapez vous-même l'adresse du site Web.",
            "Vérifiez la vraie adresse de l'expéditeur.",
            "En cas de doute, appelez l'organisation directement.",
            "Signalez les courriels d'hameçonnage en utilisant le bouton 'Signaler comme indésirable' dans Apple Mail."
        ],
        "rule_en": "Never log in to any account by clicking a link in an email. Always type the address yourself. This one habit stops most phishing.",
        "rule_fr": "Ne vous connectez jamais à un compte en cliquant sur un lien dans un courriel. Tapez toujours l'adresse vous-même. Cette seule habitude arrête la plupart des hameçonnages.",
        "warning_en": "Phishing messages now look almost identical to real ones. Even tech-savvy people get fooled. The safe habit is the same regardless: type the address yourself.",
        "warning_fr": "Les messages d'hameçonnage ressemblent maintenant presque à des vrais. Même les personnes averties en technologie se font avoir. L'habitude sûre est la même : tapez vous-même l'adresse."
    },
    {
        "file": "how-to-update-apps.html",
        "question": "How do I update the apps on my iPhone or iPad?",
        "question_fr": "Comment mettre à jour les applications sur mon iPhone ou iPad ?",
        "title": "How to Update Apps on iPhone or iPad — Digital Confidence Centre",
        "desc": "Keeping your apps updated is important for safety. Learn how to update all your apps at once on iPhone or iPad — a simple guide for seniors.",
        "module": "module-4.html",
        "module_name": "Module 4: App Store Safety",
        "breadcrumb_short": "How to Update Apps",
        "breadcrumb_short_fr": "Comment mettre à jour les applications",
        "answer_en": "Updating your apps is one of the most important things you can do for your security. Updates fix security flaws that criminals could use to access your device. On your iPhone or iPad, open the App Store (the blue icon with a white letter A), then tap your profile picture in the top right corner. Scroll down to see all the apps with available updates, and tap 'Update All' to update everything at once. You can also turn on automatic updates so your apps stay current without you having to remember. Go to Settings, then App Store, and turn on 'App Updates'.",
        "answer_fr": "La mise à jour de vos applications est l'une des choses les plus importantes que vous puissiez faire pour votre sécurité. Sur votre iPhone ou iPad, ouvrez l'App Store, puis appuyez sur votre photo de profil dans le coin supérieur droit. Faites défiler vers le bas pour voir toutes les applications avec des mises à jour disponibles.",
        "steps_en": [
            "Open the App Store (blue icon with white letter A) on your home screen.",
            "Tap your profile picture in the top-right corner.",
            "Scroll down until you see the 'Available Updates' section.",
            "Tap 'Update All' to update every app at once.",
            "To make this automatic: go to Settings → App Store → turn on 'App Updates'.",
            "Check for updates once a week if not using automatic updates."
        ],
        "steps_fr": [
            "Ouvrez l'App Store (icône bleue avec la lettre A blanche) sur votre écran d'accueil.",
            "Appuyez sur votre photo de profil dans le coin supérieur droit.",
            "Faites défiler vers le bas jusqu'à la section 'Mises à jour disponibles'.",
            "Appuyez sur 'Tout mettre à jour' pour mettre à jour chaque application à la fois.",
            "Pour automatiser : allez dans Réglages → App Store → activez 'Mises à jour des apps'.",
            "Vérifiez les mises à jour une fois par semaine si vous n'utilisez pas les mises à jour automatiques."
        ],
        "rule_en": "Turn on automatic app updates — it is one of the easiest and most effective security habits you can build.",
        "rule_fr": "Activez les mises à jour automatiques des applications — c'est l'une des habitudes de sécurité les plus simples et les plus efficaces que vous puissiez prendre.",
        "warning_en": "Outdated apps can have security flaws that criminals exploit. An app you have not updated in months may be a risk — especially banking and email apps.",
        "warning_fr": "Les applications obsolètes peuvent avoir des failles de sécurité que les criminels exploitent. Une application que vous n'avez pas mise à jour depuis des mois peut être un risque."
    },
    {
        "file": "how-to-use-etransfer-safely.html",
        "question": "How do I use Interac e-Transfer safely?",
        "question_fr": "Comment utiliser le virement Interac en toute sécurité ?",
        "title": "How to Use Interac e-Transfer Safely — Digital Confidence Centre",
        "desc": "Interac e-Transfer is a safe way to send money in Canada — when you follow a few simple rules. Tips for seniors to avoid e-Transfer scams.",
        "module": "module-6.html",
        "module_name": "Module 6: Banking & Transactions",
        "breadcrumb_short": "Using e-Transfer Safely",
        "breadcrumb_short_fr": "Utiliser le virement Interac en toute sécurité",
        "answer_en": "Interac e-Transfer is a legitimate and widely used way to send money between Canadian bank accounts. The key safety rules are: only send money to people you know personally, always double-check the email address or phone number before sending, and set a security question with an answer only the recipient knows (call them to tell them the answer — do not include it in the message). The biggest risk with e-Transfer is sending money to a scammer who is pretending to be a trusted person. Remember: once sent, e-Transfers are very difficult to reverse. Autodeposit is safe and convenient — it deposits funds automatically without requiring a security question.",
        "answer_fr": "Le virement Interac est un moyen légitime et largement utilisé d'envoyer de l'argent entre comptes bancaires canadiens. Les règles de sécurité clés sont : envoyez uniquement de l'argent à des personnes que vous connaissez personnellement, vérifiez toujours l'adresse courriel ou le numéro de téléphone avant d'envoyer.",
        "steps_en": [
            "Log in to your bank's app and look for the 'Interac e-Transfer' option.",
            "Enter the recipient's email address or phone number — double-check it carefully.",
            "Set a security question with an answer only they would know.",
            "Call or text the recipient separately to give them the security answer.",
            "Confirm the amount and recipient before hitting Send.",
            "Save your confirmation number in case there is a dispute."
        ],
        "steps_fr": [
            "Connectez-vous à l'application de votre banque et cherchez l'option 'Virement Interac'.",
            "Entrez l'adresse courriel ou le numéro de téléphone du destinataire — vérifiez-le attentivement.",
            "Définissez une question de sécurité avec une réponse que seul lui connaît.",
            "Appelez ou envoyez un message séparé au destinataire pour lui donner la réponse de sécurité.",
            "Confirmez le montant et le destinataire avant d'appuyer sur Envoyer.",
            "Sauvegardez votre numéro de confirmation en cas de litige."
        ],
        "rule_en": "Never send an e-Transfer to someone asking for payment by e-Transfer for a purchase you made online — this is a common scam. Use secure checkout instead.",
        "rule_fr": "N'envoyez jamais de virement à quelqu'un demandant un paiement par virement pour un achat que vous avez effectué en ligne — c'est une arnaque courante. Utilisez plutôt le paiement sécurisé.",
        "warning_en": "e-Transfers are very difficult to reverse once sent. If you sent money to a scammer, call your bank immediately — but act fast, as there is a limited window to cancel.",
        "warning_fr": "Les virements sont très difficiles à annuler une fois envoyés. Si vous avez envoyé de l'argent à un escroc, appelez immédiatement votre banque."
    },
    {
        "file": "how-to-use-facetime.html",
        "question": "How do I use FaceTime to call family?",
        "question_fr": "Comment utiliser FaceTime pour appeler ma famille ?",
        "title": "How to Use FaceTime to Call Family — Digital Confidence Centre",
        "desc": "FaceTime lets you see your family on your iPhone or iPad screen — it is free and built in. A step-by-step guide for Canadian seniors.",
        "module": "module-8.html",
        "module_name": "Module 8: Stay Connected",
        "breadcrumb_short": "How to Use FaceTime",
        "breadcrumb_short_fr": "Comment utiliser FaceTime",
        "answer_en": "FaceTime is Apple's built-in video calling app — it is free, works beautifully on iPhone and iPad, and requires no account or password. To start a FaceTime call, open the Contacts app, find the person you want to call, and tap the green video camera icon. Or open the FaceTime app and tap the green plus (+) button to search for a contact. FaceTime only works between Apple devices (iPhone, iPad, or Mac). If your family member has an Android phone or Windows computer, ask them to download WhatsApp — it works the same way across all devices.",
        "answer_fr": "FaceTime est l'application d'appel vidéo intégrée d'Apple — elle est gratuite et fonctionne magnifiquement sur iPhone et iPad. Pour démarrer un appel FaceTime, ouvrez l'application Contacts, trouvez la personne et appuyez sur l'icône de caméra vidéo verte.",
        "steps_en": [
            "Make sure both you and the other person have an Apple device (iPhone, iPad, or Mac).",
            "Open the Contacts app and find the person you want to call.",
            "Tap the green video camera icon to start a FaceTime call.",
            "Wait for them to answer — you will see their face on screen.",
            "Use the microphone button to mute yourself, and the camera button to switch to rear camera.",
            "Tap the red phone icon to end the call."
        ],
        "steps_fr": [
            "Assurez-vous que vous et l'autre personne avez un appareil Apple.",
            "Ouvrez l'application Contacts et trouvez la personne que vous souhaitez appeler.",
            "Appuyez sur l'icône de caméra vidéo verte pour démarrer un appel FaceTime.",
            "Attendez qu'ils répondent — vous verrez leur visage à l'écran.",
            "Utilisez le bouton microphone pour vous mettre en sourdine.",
            "Appuyez sur l'icône de téléphone rouge pour terminer l'appel."
        ],
        "rule_en": "FaceTime is free — there is no charge for the call, no matter how long you talk, as long as you are connected to Wi-Fi.",
        "rule_fr": "FaceTime est gratuit — l'appel n'est pas facturé, peu importe la durée, tant que vous êtes connecté au Wi-Fi.",
        "warning_en": "FaceTime only works between Apple devices. For calls to family using Android phones or Windows computers, use WhatsApp or Zoom instead.",
        "warning_fr": "FaceTime ne fonctionne qu'entre appareils Apple. Pour les appels à la famille utilisant des téléphones Android ou des ordinateurs Windows, utilisez WhatsApp ou Zoom."
    },
    {
        "file": "is-public-wifi-safe.html",
        "question": "Is it safe to use public Wi-Fi?",
        "question_fr": "Est-il sûr d'utiliser le Wi-Fi public ?",
        "title": "Is Public Wi-Fi Safe? — Digital Confidence Centre",
        "desc": "Public Wi-Fi at coffee shops, libraries, and hotels carries risks. Learn what's safe and what to avoid — simple tips for Canadian seniors.",
        "module": "module-2.html",
        "module_name": "Module 2: The Security Shield",
        "breadcrumb_short": "Is Public Wi-Fi Safe?",
        "breadcrumb_short_fr": "Le Wi-Fi public est-il sûr ?",
        "answer_en": "Public Wi-Fi — at a coffee shop, library, hotel, or mall — is convenient but carries real risks. Other people on the same network can potentially see your internet traffic. For casual browsing, reading news, or watching videos, public Wi-Fi is generally fine. But avoid doing anything sensitive on public Wi-Fi: banking, shopping, or logging in to important accounts. The safest alternative is to use your iPhone's mobile data (4G or 5G) instead of public Wi-Fi — this creates a private connection directly to your phone company. If you must use public Wi-Fi, at minimum make sure all the websites you visit show 'https://' in the address bar.",
        "answer_fr": "Le Wi-Fi public — dans un café, une bibliothèque ou un hôtel — est pratique mais comporte de vrais risques. Pour la navigation occasionnelle, le Wi-Fi public est généralement acceptable. Mais évitez de faire quoi que ce soit de sensible sur le Wi-Fi public : banque, achats ou connexion à des comptes importants.",
        "steps_en": [
            "Use your phone's mobile data (4G/5G) instead of public Wi-Fi for anything important.",
            "If using public Wi-Fi, only browse — do not log in to accounts.",
            "Never do banking, shopping, or enter passwords on public Wi-Fi.",
            "Check that websites show 'https://' — not 'http://' — before entering any information.",
            "Turn off Wi-Fi on your device when you leave a public place.",
            "Be aware of 'evil twin' networks — fake Wi-Fi named like a real café to intercept your data."
        ],
        "steps_fr": [
            "Utilisez les données mobiles de votre téléphone au lieu du Wi-Fi public pour tout ce qui est important.",
            "Si vous utilisez le Wi-Fi public, naviguez seulement — ne vous connectez pas à des comptes.",
            "Ne faites jamais de banque, de magasinage ou n'entrez jamais de mots de passe sur le Wi-Fi public.",
            "Vérifiez que les sites Web affichent 'https://' avant d'entrer des informations.",
            "Désactivez le Wi-Fi sur votre appareil quand vous quittez un lieu public.",
            "Méfiez-vous des faux réseaux Wi-Fi portant le nom d'un vrai café."
        ],
        "rule_en": "A simple rule: if you would not shout the information across a coffee shop, do not type it on public Wi-Fi.",
        "rule_fr": "Une règle simple : si vous ne crieriez pas l'information dans un café, ne la tapez pas sur le Wi-Fi public.",
        "warning_en": "Hackers set up fake Wi-Fi networks that look like the real thing — 'TimHortons_Free' may not be from Tim Hortons. When in doubt, use mobile data.",
        "warning_fr": "Les pirates créent de faux réseaux Wi-Fi qui ressemblent au vrai — 'TimHortons_Free' peut ne pas venir de Tim Hortons. En cas de doute, utilisez les données mobiles."
    },
    {
        "file": "how-to-update-ipad.html",
        "question": "How do I update my iPad?",
        "question_fr": "Comment mettre à jour mon iPad ?",
        "title": "How to Update Your iPad — Digital Confidence Centre",
        "desc": "Keeping your iPad updated protects you from security threats. A simple step-by-step guide for Canadian seniors on how to update iOS or iPadOS.",
        "module": "module-4.html",
        "module_name": "Module 4: App Store Safety",
        "breadcrumb_short": "How to Update Your iPad",
        "breadcrumb_short_fr": "Comment mettre à jour votre iPad",
        "answer_en": "Updating your iPad is one of the most important things you can do to stay safe — updates fix security weaknesses that criminals could use to access your device. To update, go to Settings (the grey gear icon), then tap 'General', then 'Software Update'. Your iPad will check for available updates. If one is available, tap 'Download and Install'. Make sure your iPad is connected to Wi-Fi and has at least 50% battery, or plug it in during the update. The process takes 15–30 minutes, and your iPad will restart at the end. Turn on automatic updates so you never have to remember: Settings → General → Software Update → Automatic Updates.",
        "answer_fr": "La mise à jour de votre iPad est l'une des choses les plus importantes que vous puissiez faire pour rester en sécurité. Pour mettre à jour, allez dans Réglages, puis appuyez sur 'Général', puis 'Mise à jour logicielle'. Si une mise à jour est disponible, appuyez sur 'Télécharger et installer'.",
        "steps_en": [
            "Open Settings (grey gear icon on your home screen).",
            "Tap 'General' then 'Software Update'.",
            "Wait while your iPad checks for updates.",
            "If an update is available, tap 'Download and Install'.",
            "Enter your passcode if asked.",
            "Leave your iPad connected to Wi-Fi and power until the update completes — it will restart."
        ],
        "steps_fr": [
            "Ouvrez Réglages (icône d'engrenage gris sur votre écran d'accueil).",
            "Appuyez sur 'Général' puis 'Mise à jour logicielle'.",
            "Attendez que votre iPad vérifie les mises à jour.",
            "Si une mise à jour est disponible, appuyez sur 'Télécharger et installer'.",
            "Entrez votre code d'accès si on vous le demande.",
            "Laissez votre iPad connecté au Wi-Fi et à l'alimentation jusqu'à ce que la mise à jour soit terminée."
        ],
        "rule_en": "Never ignore an update notification. Security updates should be installed within a few days of release — the longer you wait, the more vulnerable you are.",
        "rule_fr": "N'ignorez jamais une notification de mise à jour. Les mises à jour de sécurité doivent être installées dans les quelques jours suivant leur publication.",
        "warning_en": "Do not update your iPad over public Wi-Fi — use your home network. Updates are large and public Wi-Fi can be interrupted, which may cause problems.",
        "warning_fr": "Ne mettez pas à jour votre iPad via le Wi-Fi public — utilisez votre réseau domestique. Les mises à jour sont volumineuses et le Wi-Fi public peut être interrompu."
    },
    {
        "file": "is-zoom-safe.html",
        "question": "Is Zoom safe to use?",
        "question_fr": "Zoom est-il sûr à utiliser ?",
        "title": "Is Zoom Safe to Use? — Digital Confidence Centre",
        "desc": "Yes, Zoom is safe when used correctly. Learn how to use Zoom safely for video calls with family, doctors, and community groups.",
        "module": "module-8.html",
        "module_name": "Module 8: Stay Connected",
        "breadcrumb_short": "Is Zoom Safe?",
        "breadcrumb_short_fr": "Zoom est-il sûr ?",
        "answer_en": "Yes, Zoom is safe to use — it is one of the most popular video calling platforms in the world, used by businesses, schools, and healthcare providers. The main safety practices are: only join Zoom calls you were personally invited to (by someone you know), never share your meeting ID publicly, use the waiting room feature when hosting so you can control who enters, and keep the Zoom app updated. Be cautious of phishing emails that look like Zoom invitations but link to fake pages designed to steal your Zoom password. When in doubt, only join Zoom calls through a link sent by someone you trust.",
        "answer_fr": "Oui, Zoom est sûr à utiliser — c'est l'une des plateformes d'appel vidéo les plus populaires au monde. Les principales pratiques de sécurité sont : rejoignez uniquement les appels Zoom auxquels vous avez été personnellement invité, ne partagez jamais votre ID de réunion publiquement.",
        "steps_en": [
            "Download Zoom from the App Store (search 'Zoom') — only from the official store.",
            "Only join calls using links from people you know personally.",
            "Check the meeting link carefully — Zoom links start with 'zoom.us'.",
            "Never share your meeting ID or password in a public place.",
            "Update the Zoom app regularly through the App Store.",
            "If hosting a call, enable the 'Waiting Room' so you can approve who enters."
        ],
        "steps_fr": [
            "Téléchargez Zoom depuis l'App Store — uniquement depuis le magasin officiel.",
            "Rejoignez uniquement des appels en utilisant des liens de personnes que vous connaissez personnellement.",
            "Vérifiez attentivement le lien de la réunion — les liens Zoom commencent par 'zoom.us'.",
            "Ne partagez jamais votre ID de réunion ou mot de passe dans un lieu public.",
            "Mettez régulièrement à jour l'application Zoom via l'App Store.",
            "Si vous hébergez un appel, activez la 'Salle d'attente'."
        ],
        "rule_en": "Only join Zoom calls from people you know. Do not click Zoom links in unexpected emails — go to zoom.us and join using the meeting ID instead.",
        "rule_fr": "Ne rejoignez que des appels Zoom de personnes que vous connaissez. Ne cliquez pas sur des liens Zoom dans des courriels inattendus.",
        "warning_en": "'Zoom bombing' — strangers entering meetings uninvited — is a real risk for open meetings. Always use a meeting password and waiting room for any call with people you do not know.",
        "warning_fr": "Le 'Zoom bombing' — des inconnus qui entrent dans des réunions sans invitation — est un risque réel pour les réunions ouvertes. Utilisez toujours un mot de passe de réunion et une salle d'attente."
    },
    {
        "file": "how-to-book-telehealth.html",
        "question": "How do I book a telehealth appointment?",
        "question_fr": "Comment prendre un rendez-vous de télésanté ?",
        "title": "How to Book a Telehealth Appointment — Digital Confidence Centre",
        "desc": "Learn how to book and attend a virtual doctor appointment on your iPhone or iPad. A step-by-step guide for Canadian seniors.",
        "module": "module-8.html",
        "module_name": "Module 8: Stay Connected",
        "breadcrumb_short": "Booking Telehealth",
        "breadcrumb_short_fr": "Réserver une téléconsultation",
        "answer_en": "Telehealth lets you see a doctor or nurse by video call without leaving home — a great option for non-emergency consultations. In Ontario, you can access telehealth through your family doctor's patient portal, Ontario Telehealth Network, or services like Maple or Dialogue. Your doctor's office can tell you which platform they use. Once booked, you will receive a link by email or text — click it at your appointment time. You will need your iPad or iPhone with the front camera working, and a quiet private space. Most platforms work right in your browser without downloading a separate app.",
        "answer_fr": "La télésanté vous permet de voir un médecin par appel vidéo sans quitter votre maison. En Ontario, vous pouvez accéder à la télésanté via le portail de votre médecin de famille. Une fois réservé, vous recevrez un lien par courriel ou par texto.",
        "steps_en": [
            "Call your doctor's office and ask if they offer video appointments.",
            "Book a telehealth appointment — they will send you a link by email or text.",
            "On the day of the appointment, click the link at the scheduled time.",
            "Allow the website or app to use your camera and microphone when asked.",
            "Wait in the virtual waiting room until the doctor joins.",
            "After the appointment, ask for a written summary of any instructions."
        ],
        "steps_fr": [
            "Appelez le bureau de votre médecin et demandez s'il offre des rendez-vous vidéo.",
            "Réservez un rendez-vous de télésanté — ils vous enverront un lien par courriel ou par texto.",
            "Le jour du rendez-vous, cliquez sur le lien à l'heure prévue.",
            "Autorisez le site Web ou l'application à utiliser votre caméra et votre microphone.",
            "Attendez dans la salle d'attente virtuelle jusqu'à ce que le médecin vous rejoigne.",
            "Après le rendez-vous, demandez un résumé écrit des instructions."
        ],
        "rule_en": "Only book telehealth through your doctor's official patient portal or a service recommended by your doctor — not through ads or unsolicited contacts.",
        "rule_fr": "Ne réservez la télésanté que par le portail officiel de votre médecin — pas par des publicités ou des contacts non sollicités.",
        "warning_en": "Scammers advertise fake telehealth services to steal your OHIP number or credit card. Only use services recommended by your actual doctor.",
        "warning_fr": "Les escrocs font la publicité de faux services de télésanté pour voler votre numéro RAMQ ou votre carte de crédit. N'utilisez que les services recommandés par votre vrai médecin."
    },
    {
        "file": "what-is-vpn.html",
        "question": "What is a VPN and do I need one?",
        "question_fr": "Qu'est-ce qu'un VPN et en ai-je besoin ?",
        "title": "What Is a VPN and Do You Need One? — Digital Confidence Centre",
        "desc": "A VPN protects your internet connection, especially on public Wi-Fi. Learn whether you need one and how to choose safely — for Canadian seniors.",
        "module": "module-2.html",
        "module_name": "Module 2: The Security Shield",
        "breadcrumb_short": "What Is a VPN?",
        "breadcrumb_short_fr": "Qu'est-ce qu'un VPN ?",
        "answer_en": "VPN stands for Virtual Private Network. Think of it as a private tunnel for your internet traffic — it encrypts everything you send and receive, making it much harder for others to spy on your activity. At home on your own network, a VPN is not usually necessary. Where a VPN really helps is on public Wi-Fi — hotels, coffee shops, airports. If you frequently use public Wi-Fi, a paid VPN from a reputable provider is worth considering. Be very cautious of free VPNs — many collect and sell your data, which defeats the purpose entirely. Reputable paid options in Canada include NordVPN, ExpressVPN, and Proton VPN.",
        "answer_fr": "VPN signifie Réseau Privé Virtuel. Pensez-y comme un tunnel privé pour votre trafic Internet — il chiffre tout ce que vous envoyez et recevez. Chez vous sur votre propre réseau, un VPN n'est généralement pas nécessaire. Là où un VPN aide vraiment, c'est sur le Wi-Fi public.",
        "steps_en": [
            "Decide if you need one — if you rarely use public Wi-Fi, you may not need a VPN at home.",
            "If you do want one, choose a reputable paid provider: NordVPN, ExpressVPN, or Proton VPN.",
            "Avoid free VPNs — they often collect and sell your personal data.",
            "Download the VPN app from the official App Store.",
            "Follow the setup instructions — usually just pressing a 'Connect' button.",
            "Turn it on when using public Wi-Fi and turn it off at home if desired."
        ],
        "steps_fr": [
            "Décidez si vous en avez besoin — si vous utilisez rarement le Wi-Fi public, vous n'en avez peut-être pas besoin.",
            "Si vous en voulez un, choisissez un fournisseur payant réputé.",
            "Évitez les VPN gratuits — ils collectent souvent et vendent vos données personnelles.",
            "Téléchargez l'application VPN depuis l'App Store officiel.",
            "Suivez les instructions de configuration.",
            "Activez-le lorsque vous utilisez le Wi-Fi public."
        ],
        "rule_en": "If you use public Wi-Fi regularly, a paid VPN from a reputable provider is one of the best privacy investments you can make.",
        "rule_fr": "Si vous utilisez régulièrement le Wi-Fi public, un VPN payant d'un fournisseur réputé est l'un des meilleurs investissements en matière de confidentialité que vous puissiez faire.",
        "warning_en": "Free VPNs are almost always a bad deal — the product is you. Many free VPN providers sell your browsing data to advertisers. Pay for a VPN or use your mobile data instead.",
        "warning_fr": "Les VPN gratuits sont presque toujours une mauvaise affaire — le produit, c'est vous. De nombreux fournisseurs de VPN gratuits vendent vos données de navigation."
    },
    {
        "file": "how-to-recognise-romance-scam.html",
        "question": "How do I recognise a romance scam?",
        "question_fr": "Comment reconnaître une arnaque sentimentale ?",
        "title": "How to Recognise a Romance Scam — Digital Confidence Centre",
        "desc": "Romance scams target seniors on social media and dating apps. Learn the warning signs before it becomes a financial and emotional crisis.",
        "module": "module-2.html",
        "module_name": "Module 2: The Security Shield",
        "breadcrumb_short": "Recognising Romance Scams",
        "breadcrumb_short_fr": "Reconnaître les arnaques sentimentales",
        "answer_en": "Romance scammers create fake profiles on Facebook, dating apps, or even by text, pretending to be attractive, successful people — often claiming to be widowed, working overseas (military, oil rig, medical mission), or otherwise unable to meet. They spend weeks or months building trust and genuine emotional connection before ever asking for money. When the request comes, it is always urgent — a medical emergency, a stuck shipment, a travel expense to come meet you. These requests escalate until the victim runs out of money. If someone you have only met online asks you for money in any form — gift cards, wire transfer, cryptocurrency — that is a romance scam. Real people who care about you do not ask for money before meeting in person.",
        "answer_fr": "Les escrocs sentimentaux créent de faux profils sur Facebook ou des applications de rencontres. Ils passent des semaines à construire la confiance avant de demander de l'argent. Les demandes d'argent viennent toujours avec une urgence — une urgence médicale, une dépense de voyage. Si quelqu'un que vous n'avez rencontré qu'en ligne vous demande de l'argent sous quelque forme que ce soit — c'est une arnaque sentimentale.",
        "steps_en": [
            "Be cautious of online contacts who seem too perfect — attractive, successful, and immediately interested in you.",
            "Watch for claims of being overseas (military, oil rig, doctor on mission) and unable to meet.",
            "Note if they avoid video calls, or their video appears pre-recorded and not responsive.",
            "A request for money in any form — for any reason — from an online-only contact is always a scam.",
            "Run their profile photo through Google Images reverse search to see if it is stolen from someone else.",
            "Tell a trusted friend or family member if you are getting close to someone you met online."
        ],
        "steps_fr": [
            "Méfiez-vous des contacts en ligne qui semblent trop parfaits.",
            "Faites attention aux affirmations d'être à l'étranger et incapable de se rencontrer.",
            "Notez s'ils évitent les appels vidéo.",
            "Une demande d'argent sous quelque forme que ce soit d'un contact en ligne uniquement est toujours une arnaque.",
            "Effectuez une recherche inversée de leur photo de profil sur Google Images.",
            "Parlez à un ami ou un membre de la famille de confiance si vous vous rapprochez de quelqu'un rencontré en ligne."
        ],
        "rule_en": "No one who genuinely cares about you will ask for money before meeting you in person. Full stop. There are no exceptions.",
        "rule_fr": "Personne qui se soucie vraiment de vous ne vous demandera de l'argent avant de vous rencontrer en personne. Sans exception.",
        "warning_en": "Romance scams cause more financial loss than any other type of scam in Canada. They also cause deep emotional harm. If you think you are in a romance scam, call the Canadian Anti-Fraud Centre: 1-888-495-8501.",
        "warning_fr": "Les arnaques sentimentales causent plus de pertes financières que tout autre type d'arnaque au Canada. Si vous pensez être victime d'une arnaque sentimentale, appelez le Centre antifraude du Canada : 1-888-495-8501."
    },
    {
        "file": "icloud-backup.html",
        "question": "How do I back up my iPhone or iPad to iCloud?",
        "question_fr": "Comment sauvegarder mon iPhone ou iPad sur iCloud ?",
        "title": "How to Back Up iPhone or iPad to iCloud — Digital Confidence Centre",
        "desc": "iCloud backup keeps your photos, contacts, and settings safe. Learn how to set it up on your iPhone or iPad — a simple guide for Canadian seniors.",
        "module": "module-7.html",
        "module_name": "Module 7: Photos & Memories",
        "breadcrumb_short": "iCloud Backup",
        "breadcrumb_short_fr": "Sauvegarde iCloud",
        "answer_en": "iCloud backup automatically saves a copy of your iPhone or iPad to Apple's secure servers whenever you are connected to Wi-Fi and charging. This means if your device is lost, stolen, or stops working, all your photos, contacts, messages, and apps can be restored to a new device. Setting it up takes just a few minutes. Go to Settings, tap your name at the top, then tap iCloud, then iCloud Backup. Turn on 'Back Up This iPhone/iPad' and tap 'Back Up Now' to do your first backup right away. From then on, it will happen automatically overnight while you charge.",
        "answer_fr": "La sauvegarde iCloud sauvegarde automatiquement une copie de votre iPhone ou iPad sur les serveurs sécurisés d'Apple chaque fois que vous êtes connecté au Wi-Fi et en charge. Pour la configurer, allez dans Réglages, appuyez sur votre nom, puis iCloud, puis Sauvegarde iCloud.",
        "steps_en": [
            "Open Settings (grey gear icon) on your home screen.",
            "Tap your name at the very top of Settings.",
            "Tap 'iCloud' then scroll down to 'iCloud Backup'.",
            "Turn on the 'Back Up This iPhone' or 'Back Up This iPad' toggle.",
            "Tap 'Back Up Now' to start your first backup immediately.",
            "From now on, your device will back up automatically every night while charging on Wi-Fi."
        ],
        "steps_fr": [
            "Ouvrez Réglages (icône d'engrenage gris) sur votre écran d'accueil.",
            "Appuyez sur votre nom tout en haut des Réglages.",
            "Appuyez sur 'iCloud' puis faites défiler jusqu'à 'Sauvegarde iCloud'.",
            "Activez le bouton 'Sauvegarder cet iPhone' ou 'Sauvegarder cet iPad'.",
            "Appuyez sur 'Sauvegarder maintenant' pour démarrer votre première sauvegarde immédiatement.",
            "Désormais, votre appareil se sauvegardera automatiquement chaque nuit pendant la charge sur Wi-Fi."
        ],
        "rule_en": "Turn on iCloud Backup today. If your phone is ever lost or broken, your photos and memories are safe. Do not wait until after something goes wrong.",
        "rule_fr": "Activez la sauvegarde iCloud aujourd'hui. Si votre téléphone est perdu ou cassé, vos photos et vos souvenirs sont en sécurité.",
        "warning_en": "Apple's free iCloud plan includes only 5GB of storage. If your backup is larger, you may need to upgrade your iCloud plan (from $1.29/month for 50GB in Canada).",
        "warning_fr": "Le plan iCloud gratuit d'Apple ne comprend que 5 Go de stockage. Si votre sauvegarde est plus grande, vous devrez peut-être mettre à niveau votre plan iCloud (à partir de 1,29 $/mois pour 50 Go au Canada)."
    },
    {
        "file": "what-is-ai-assistant.html",
        "question": "What is an AI assistant and is it safe to use?",
        "question_fr": "Qu'est-ce qu'un assistant IA et est-il sûr à utiliser ?",
        "title": "What Is an AI Assistant? — Digital Confidence Centre",
        "desc": "AI assistants like Siri, Alexa, and ChatGPT can be helpful — but they have limits. A plain-language guide for Canadian seniors on using AI safely.",
        "module": "module-9.html",
        "module_name": "Module 9: Understanding AI",
        "breadcrumb_short": "What Is an AI Assistant?",
        "breadcrumb_short_fr": "Qu'est-ce qu'un assistant IA ?",
        "answer_en": "An AI assistant is a computer program that can answer questions and have conversations in plain language — like Siri on your iPhone, Alexa on an Amazon Echo, or ChatGPT online. They are generally safe to use for general questions, but there are important limits to keep in mind. AI assistants can make mistakes — they sometimes give confident answers that are wrong. Never share personal information like your SIN, banking details, passwords, or medical information with an AI assistant. Do not use AI to get medical diagnoses or legal advice — use it as a starting point, then verify with a professional. AI assistants also do not remember previous conversations in most cases, so each session starts fresh.",
        "answer_fr": "Un assistant IA est un programme informatique qui peut répondre aux questions en langage simple — comme Siri sur votre iPhone ou ChatGPT en ligne. Ne partagez jamais d'informations personnelles comme votre NAS, vos coordonnées bancaires ou vos mots de passe avec un assistant IA.",
        "steps_en": [
            "Siri is already on your iPhone or iPad — just say 'Hey Siri' or press and hold the side button.",
            "Use AI assistants for general questions, recipes, weather, spelling, and general information.",
            "Never share personal information: SIN, passwords, banking details, or health card numbers.",
            "Do not trust AI for medical diagnoses, legal advice, or financial decisions — verify with a professional.",
            "Remember that AI can be wrong — always confirm important information from a reliable source.",
            "If something an AI says feels wrong or alarming, seek a second opinion from a real person."
        ],
        "steps_fr": [
            "Siri est déjà sur votre iPhone ou iPad — dites simplement 'Dis Siri' ou maintenez enfoncé le bouton latéral.",
            "Utilisez les assistants IA pour des questions générales, des recettes, la météo et des informations générales.",
            "Ne partagez jamais d'informations personnelles : NAS, mots de passe, coordonnées bancaires.",
            "Ne faites pas confiance à l'IA pour les diagnostics médicaux ou les conseils juridiques.",
            "Rappelez-vous que l'IA peut se tromper — confirmez toujours les informations importantes.",
            "Si quelque chose qu'une IA dit vous semble faux ou alarmant, demandez un deuxième avis."
        ],
        "rule_en": "Think of an AI assistant like a very well-read friend who sometimes gets things wrong. Useful for general questions — but always verify important information.",
        "rule_fr": "Pensez à un assistant IA comme un ami très cultivé qui se trompe parfois. Utile pour les questions générales — mais vérifiez toujours les informations importantes.",
        "warning_en": "AI assistants do not have access to real-time information unless specifically noted. Medical, financial, or legal advice from an AI should always be verified by a qualified professional.",
        "warning_fr": "Les assistants IA n'ont pas accès aux informations en temps réel. Les conseils médicaux, financiers ou juridiques d'une IA doivent toujours être vérifiés par un professionnel qualifié."
    },
    {
        "file": "emergency-contacts-phone.html",
        "question": "How do I set up emergency contacts on my phone?",
        "question_fr": "Comment configurer des contacts d'urgence sur mon téléphone ?",
        "title": "How to Set Up Emergency Contacts on iPhone — Digital Confidence Centre",
        "desc": "Set up emergency contacts and Medical ID on your iPhone so first responders can help you even if your phone is locked. A guide for Canadian seniors.",
        "module": "module-8.html",
        "module_name": "Module 8: Stay Connected",
        "breadcrumb_short": "Emergency Contacts",
        "breadcrumb_short_fr": "Contacts d'urgence",
        "answer_en": "Setting up emergency contacts on your iPhone is one of the most important things you can do for your safety. Your iPhone has a feature called Medical ID that lets first responders see your emergency contacts, medical conditions, and medications — even when your phone is locked. To set it up, open the Health app (red heart icon), tap your profile picture, then tap Medical ID, then Edit. Add your name, any medical conditions, medications, blood type, and at least one emergency contact. You can also press the side button five times quickly to call emergency services and send your location to your emergency contacts.",
        "answer_fr": "La configuration des contacts d'urgence sur votre iPhone est l'une des choses les plus importantes que vous puissiez faire pour votre sécurité. Votre iPhone dispose d'une fonctionnalité appelée ID médical qui permet aux premiers répondants de voir vos contacts d'urgence, vos conditions médicales et vos médicaments — même lorsque votre téléphone est verrouillé.",
        "steps_en": [
            "Open the Health app (red heart icon on your home screen).",
            "Tap your profile picture or initial in the top-right corner.",
            "Tap 'Medical ID' then tap 'Edit' in the top-right.",
            "Fill in your medical conditions, medications, allergies, and blood type.",
            "Scroll down and tap 'Add Emergency Contact' — add a trusted family member.",
            "Turn on 'Show When Locked' so first responders can see it without your passcode."
        ],
        "steps_fr": [
            "Ouvrez l'application Santé (icône de cœur rouge sur votre écran d'accueil).",
            "Appuyez sur votre photo de profil ou initiale dans le coin supérieur droit.",
            "Appuyez sur 'ID médical' puis sur 'Modifier' en haut à droite.",
            "Remplissez vos conditions médicales, médicaments, allergies et groupe sanguin.",
            "Faites défiler vers le bas et appuyez sur 'Ajouter un contact d'urgence'.",
            "Activez 'Afficher lorsque verrouillé' pour que les premiers répondants puissent le voir."
        ],
        "rule_en": "Set up your Medical ID now — even before you finish reading this. It takes 5 minutes and could save your life in an emergency.",
        "rule_fr": "Configurez votre ID médical maintenant — même avant de finir de lire ceci. Cela prend 5 minutes et pourrait vous sauver la vie en cas d'urgence.",
        "warning_en": "To reach emergency services anywhere in Canada, call 911. To reach a family member quickly, press the side button 5 times to trigger Emergency SOS.",
        "warning_fr": "Pour joindre les services d'urgence partout au Canada, composez le 911. Pour joindre rapidement un membre de la famille, appuyez 5 fois sur le bouton latéral pour déclencher le SOS d'urgence."
    },
    {
        "file": "cra-scam-signs.html",
        "question": "How do I know if a CRA call is a scam?",
        "question_fr": "Comment savoir si un appel de l'ARC est une arnaque ?",
        "title": "How to Spot a CRA Scam Call — Digital Confidence Centre",
        "desc": "The CRA will never threaten arrest or demand gift cards. Learn the signs of a CRA impersonator scam — a guide for Canadian seniors.",
        "module": "module-2.html",
        "module_name": "Module 2: The Security Shield",
        "breadcrumb_short": "CRA Scam Signs",
        "breadcrumb_short_fr": "Signes d'arnaque de l'ARC",
        "answer_en": "CRA (Canada Revenue Agency) scam calls are one of the most common fraud types in Canada. Scammers call pretending to be CRA agents, claiming you owe back taxes and will be arrested unless you pay immediately. The real CRA does not work this way. The real CRA will never demand immediate payment by gift card, wire transfer, or cryptocurrency. The real CRA will never threaten immediate arrest. The real CRA will give you time to verify the debt. The real CRA will always allow you to call them back at their official number: 1-800-959-8281. If you receive a threatening call from someone claiming to be the CRA, hang up. Do not call back any number they provide.",
        "answer_fr": "Les appels frauduleux de l'ARC (Agence du revenu du Canada) sont l'un des types de fraude les plus courants au Canada. Les escrocs appellent en prétendant être des agents de l'ARC, affirmant que vous devez des impôts arriérés et serez arrêté. La vraie ARC ne demandera jamais de paiement immédiat par carte-cadeau. Si vous recevez un appel menaçant de quelqu'un prétendant être l'ARC, raccrochez.",
        "steps_en": [
            "Hang up immediately — do not engage or argue with the caller.",
            "Do not call back any number the caller gives you.",
            "If you think you may genuinely owe taxes, call the CRA directly: 1-800-959-8281.",
            "Report the scam call to the Canadian Anti-Fraud Centre: 1-888-495-8501.",
            "Tell a trusted family member about the call.",
            "Remember: CRA sends official notices by mail first, not by phone."
        ],
        "steps_fr": [
            "Raccrochez immédiatement — n'engagez pas et ne disputez pas avec l'appelant.",
            "Ne rappelez aucun numéro fourni par l'appelant.",
            "Si vous pensez devoir vraiment des impôts, appelez directement l'ARC : 1-800-959-8281.",
            "Signalez l'appel frauduleux au Centre antifraude du Canada : 1-888-495-8501.",
            "Parlez de l'appel à un membre de la famille de confiance.",
            "Rappelez-vous : l'ARC envoie d'abord des avis officiels par courrier, pas par téléphone."
        ],
        "rule_en": "The real CRA will never demand gift cards, wire transfers, or cryptocurrency. Never threaten arrest. Never refuse to let you call them back. Any of these = scam.",
        "rule_fr": "La vraie ARC ne demandera jamais de cartes-cadeaux, de virements bancaires ou de cryptomonnaie. Ne menacera jamais l'arrestation. Tout cela = arnaque.",
        "warning_en": "These calls can be very convincing and frightening. Scammers use spoofed phone numbers that look like real CRA numbers. If you feel afraid — that is the scam working. Hang up.",
        "warning_fr": "Ces appels peuvent être très convaincants et effrayants. Les escrocs utilisent des numéros de téléphone falsifiés qui ressemblent aux vrais numéros de l'ARC. Si vous vous sentez effrayé — c'est l'arnaque qui fonctionne. Raccrochez."
    },
    {
        "file": "how-to-make-strong-password.html",
        "question": "How do I create a password I can actually remember?",
        "question_fr": "Comment créer un mot de passe dont je peux vraiment me souvenir ?",
        "title": "How to Create a Password You Can Remember — Digital Confidence Centre",
        "desc": "You do not have to choose between a strong password and one you can remember. Learn the passphrase method — simple for Canadian seniors.",
        "module": "module-3.html",
        "module_name": "Module 3: Passwords & Biometrics",
        "breadcrumb_short": "Creating Memorable Passwords",
        "breadcrumb_short_fr": "Créer des mots de passe mémorables",
        "answer_en": "The best technique for creating a strong password you can actually remember is the passphrase method. Pick three or four random words that have nothing to do with each other — and add a number and symbol. For example: 'maple-penguin-clock-42!' This is 22 characters long (extremely strong) but much easier to remember than a random string like 'xK9#mP2q'. The words should be random, not related to you personally (no pets' names, no birthdays, no street names). Each account should have its own unique passphrase. If you find this hard to manage, Apple's built-in password manager will remember all your passwords securely — and suggest strong ones when you create new accounts.",
        "answer_fr": "La meilleure technique pour créer un mot de passe fort dont vous pouvez vous souvenir est la méthode de la phrase de passe. Choisissez trois ou quatre mots aléatoires sans rapport entre eux — et ajoutez un chiffre et un symbole. Par exemple : 'érable-pingouin-horloge-42!'. Chaque compte devrait avoir sa propre phrase de passe unique.",
        "steps_en": [
            "Think of three completely random, unrelated words — like 'cloud', 'bicycle', 'library'.",
            "Join them with hyphens and add a number and symbol: 'cloud-bicycle-library-7!'",
            "Make it at least 15 characters total — the longer the better.",
            "Do not use words connected to you personally (pet names, street names, birthdays).",
            "Use a different passphrase for every important account.",
            "Let Apple's Password Manager save it — go to Settings → Passwords."
        ],
        "steps_fr": [
            "Pensez à trois mots complètement aléatoires et sans rapport — comme 'nuage', 'vélo', 'bibliothèque'.",
            "Joignez-les avec des traits d'union et ajoutez un chiffre et un symbole.",
            "Faites-en au moins 15 caractères au total.",
            "N'utilisez pas de mots liés à vous personnellement.",
            "Utilisez une phrase de passe différente pour chaque compte important.",
            "Laissez le gestionnaire de mots de passe Apple le sauvegarder."
        ],
        "rule_en": "Three random words joined together — 'purple-ocean-mailbox' — is stronger than any short, complex password like 'P@ssw0rd'.",
        "rule_fr": "Trois mots aléatoires joints — 'violet-océan-boîteauxlettres' — est plus fort que n'importe quel mot de passe court et complexe.",
        "warning_en": "Writing passwords on sticky notes near your computer is a real security risk. If you need to write passwords down, keep them in a locked place — not near your device.",
        "warning_fr": "Écrire des mots de passe sur des notes autocollantes près de votre ordinateur est un vrai risque de sécurité. Si vous devez écrire des mots de passe, gardez-les dans un endroit verrouillé."
    },
    {
        "file": "what-to-do-suspicious-text.html",
        "question": "I got a suspicious text message — what should I do?",
        "question_fr": "J'ai reçu un message texte suspect — que dois-je faire ?",
        "title": "Got a Suspicious Text? Here's What to Do — Digital Confidence Centre",
        "desc": "Suspicious texts (smishing) are a growing scam. Learn what to do — and not do — when you receive a suspicious text message. Tips for Canadian seniors.",
        "module": "module-5.html",
        "module_name": "Module 5: Email & Messages",
        "breadcrumb_short": "Suspicious Text Messages",
        "breadcrumb_short_fr": "Messages texte suspects",
        "answer_en": "Suspicious text messages — called 'smishing' — are a fast-growing scam. Common ones pretend to be from Canada Post (a package could not be delivered), your bank (unusual activity detected), or a government agency. They include a link designed to steal your information. The most important rule: do not click any link in an unexpected text message. If you think the text might be real — for example, if you are expecting a package — close the text and go directly to Canada Post's website by typing canadapost.ca yourself. Report suspicious texts by forwarding them to 7726 (SPAM), which is a free Canadian reporting service.",
        "answer_fr": "Les messages texte suspects — appelés 'hameçonnage par SMS' — sont une arnaque en croissance rapide. La règle la plus importante : ne cliquez sur aucun lien dans un message texte inattendu. Signalez les textes suspects en les transférant au 7726 (SPAM).",
        "steps_en": [
            "Do not click any link in an unexpected text message — even if it looks official.",
            "Do not call any phone number included in the suspicious text.",
            "Do not reply to the text — even 'STOP' can confirm your number is active.",
            "If you think it might be real, go directly to the official website by typing it yourself.",
            "Forward the suspicious text to 7726 (SPAM) — free to all Canadian carriers.",
            "Delete the text after reporting it."
        ],
        "steps_fr": [
            "Ne cliquez sur aucun lien dans un message texte inattendu.",
            "N'appelez aucun numéro de téléphone inclus dans le texte suspect.",
            "Ne répondez pas au texte — même 'ARRÊT' peut confirmer que votre numéro est actif.",
            "Si vous pensez que c'est réel, allez directement sur le site Web officiel en le tapant vous-même.",
            "Transférez le texte suspect au 7726 (SPAM) — gratuit pour tous les opérateurs canadiens.",
            "Supprimez le texte après l'avoir signalé."
        ],
        "rule_en": "Canada Post, your bank, and the government will never ask you to verify your account details by clicking a link in a text message.",
        "rule_fr": "Postes Canada, votre banque et le gouvernement ne vous demanderont jamais de vérifier les détails de votre compte en cliquant sur un lien dans un message texte.",
        "warning_en": "Even replying 'STOP' to a scam text confirms your phone number is real and active — making you a more valuable target for further scam attempts.",
        "warning_fr": "Même répondre 'ARRÊT' à un texte frauduleux confirme que votre numéro de téléphone est réel et actif — faisant de vous une cible plus précieuse pour de futures tentatives d'arnaque."
    },
    {
        "file": "how-to-find-safe-app.html",
        "question": "How do I know if an app is safe to download?",
        "question_fr": "Comment savoir si une application est sûre à télécharger ?",
        "title": "How to Find Safe Apps to Download — Digital Confidence Centre",
        "desc": "Not all apps are trustworthy. Learn how to spot safe apps in the App Store on your iPhone or iPad — a guide for Canadian seniors.",
        "module": "module-4.html",
        "module_name": "Module 4: App Store Safety",
        "breadcrumb_short": "Finding Safe Apps",
        "breadcrumb_short_fr": "Trouver des applications sûres",
        "answer_en": "The App Store on your iPhone or iPad is the only place you should download apps — Apple reviews every app before listing it. But even in the App Store, some apps are better than others. Before downloading, check three things: the developer name (is it a well-known company?), the number of reviews (thousands of reviews is a good sign), and the date of the last update (an app not updated in years may be abandoned). Read a few reviews, especially the negative ones. Be cautious of apps that ask for permissions they do not need — a flashlight app does not need access to your contacts. If an app asks for your banking or Social Insurance Number — delete it immediately.",
        "answer_fr": "L'App Store sur votre iPhone ou iPad est le seul endroit où vous devriez télécharger des applications. Avant de télécharger, vérifiez trois choses : le nom du développeur, le nombre d'avis et la date de la dernière mise à jour. Méfiez-vous des applications qui demandent des autorisations dont elles n'ont pas besoin.",
        "steps_en": [
            "Only download apps from the App Store — never from websites or links in emails.",
            "Check the developer name — well-known companies are safer than unknown developers.",
            "Look for apps with thousands of reviews — this shows many people use it safely.",
            "Check when the app was last updated — recent updates mean the developer is active.",
            "Read a few reviews before installing.",
            "After installing, review what permissions the app requests — deny any that seem unnecessary."
        ],
        "steps_fr": [
            "Téléchargez uniquement des applications depuis l'App Store.",
            "Vérifiez le nom du développeur — les entreprises bien connues sont plus sûres.",
            "Cherchez des applications avec des milliers d'avis.",
            "Vérifiez quand l'application a été mise à jour pour la dernière fois.",
            "Lisez quelques avis avant d'installer.",
            "Après l'installation, examinez les autorisations que l'application demande."
        ],
        "rule_en": "The App Store is your best protection. Only ever download apps from there — and never by clicking a link in an email or text message.",
        "rule_fr": "L'App Store est votre meilleure protection. Ne téléchargez jamais d'applications ailleurs — et jamais en cliquant sur un lien dans un courriel ou un message texte.",
        "warning_en": "If you see an app that claims to give you free gift cards, prizes, or money — it is almost certainly designed to steal your personal information.",
        "warning_fr": "Si vous voyez une application qui prétend vous donner des cartes-cadeaux gratuites, des prix ou de l'argent — elle est presque certainement conçue pour voler vos informations personnelles."
    },
    {
        "file": "how-to-protect-credit-card-online.html",
        "question": "How do I protect my credit card when shopping online?",
        "question_fr": "Comment protéger ma carte de crédit lors des achats en ligne ?",
        "title": "Protecting Your Credit Card Online — Digital Confidence Centre",
        "desc": "Simple steps to protect your credit card when shopping online. Tips for Canadian seniors to shop safely and catch fraud early.",
        "module": "module-6.html",
        "module_name": "Module 6: Banking & Transactions",
        "breadcrumb_short": "Protecting Your Credit Card Online",
        "breadcrumb_short_fr": "Protéger votre carte de crédit en ligne",
        "answer_en": "Your credit card is one of the safest ways to shop online — but there are steps you can take to protect it further. Only enter your card details on websites with 'https://' and the padlock icon in the address bar. Use Apple Pay where available — it creates a unique transaction code so the store never sees your real card number. Set up email or text alerts on your credit card for every purchase, so you catch any unfamiliar charge immediately. Check your statement at least once a week. If you see a charge you do not recognise — even a small one — call your card company right away. Criminals sometimes make small test charges before a larger theft.",
        "answer_fr": "Votre carte de crédit est l'un des moyens les plus sûrs de magasiner en ligne. Entrez uniquement vos données de carte sur des sites Web avec 'https://'. Utilisez Apple Pay lorsque disponible. Configurez des alertes par courriel ou texte sur votre carte de crédit pour chaque achat.",
        "steps_en": [
            "Only shop on sites with 'https://' and the padlock icon in the address bar.",
            "Use Apple Pay when available — it never shares your real card number.",
            "Enable transaction alerts — contact your credit card company to set these up.",
            "Check your statement weekly for unfamiliar charges.",
            "Call your card company immediately if you see any charge you do not recognise.",
            "Never enter your credit card details on a website reached by clicking a link in an email."
        ],
        "steps_fr": [
            "Ne magasinez que sur des sites avec 'https://' et l'icône de cadenas.",
            "Utilisez Apple Pay lorsque disponible.",
            "Activez les alertes de transaction.",
            "Vérifiez votre relevé chaque semaine.",
            "Appelez immédiatement votre compagnie de carte si vous voyez des frais que vous ne reconnaissez pas.",
            "N'entrez jamais vos coordonnées de carte de crédit sur un site Web atteint en cliquant sur un lien."
        ],
        "rule_en": "Set up transaction alerts on your credit card. You will know about any suspicious charge within minutes — before it becomes a larger problem.",
        "rule_fr": "Configurez des alertes de transaction sur votre carte de crédit. Vous saurez pour tout frais suspect en quelques minutes.",
        "warning_en": "Criminals often start with a small test charge of $1–$5 to check if the card works before making larger purchases. Report any unrecognised charge, no matter how small.",
        "warning_fr": "Les criminels commencent souvent par un petit frais test de 1 à 5 $ pour vérifier si la carte fonctionne. Signalez tout frais non reconnu, peu importe sa petitesse."
    },
    {
        "file": "what-is-smart-home-device.html",
        "question": "Are smart home devices safe to use?",
        "question_fr": "Les appareils domestiques intelligents sont-ils sûrs à utiliser ?",
        "title": "Are Smart Home Devices Safe? — Digital Confidence Centre",
        "desc": "Smart speakers like Alexa and Google Home are helpful but have privacy considerations. A plain-language guide for Canadian seniors.",
        "module": "module-9.html",
        "module_name": "Module 9: Understanding AI",
        "breadcrumb_short": "Smart Home Devices",
        "breadcrumb_short_fr": "Appareils domestiques intelligents",
        "answer_en": "Smart home devices — like Amazon Echo (Alexa), Google Nest, or Apple HomePod — are listening for their wake word (like 'Alexa' or 'Hey Siri') and only record and send audio after they hear it. Most people find them very helpful for setting timers, playing music, making calls, and checking the weather. The privacy considerations: they are constantly listening for their wake word, they store your voice recordings (which you can delete), and they connect to your home Wi-Fi. To use them safely, change the default device password, keep the device software updated, and mute the microphone when you do not want it listening. Avoid discussing sensitive information near them.",
        "answer_fr": "Les appareils domestiques intelligents — comme Amazon Echo (Alexa) ou Apple HomePod — écoutent leur mot de réveil et enregistrent uniquement après l'avoir entendu. Pour les utiliser en toute sécurité, changez le mot de passe par défaut de l'appareil, gardez le logiciel à jour et coupez le microphone quand vous ne voulez pas qu'il écoute.",
        "steps_en": [
            "Change the default password on any smart home device during setup.",
            "Keep the device software updated — turn on automatic updates if available.",
            "Use the physical mute button when you do not want the device listening.",
            "Regularly review and delete your voice recording history in the device's companion app.",
            "Do not discuss banking details, passwords, or sensitive personal information near the device.",
            "Place the device away from windows and doors where others outside could trigger it."
        ],
        "steps_fr": [
            "Changez le mot de passe par défaut sur tout appareil domestique intelligent lors de la configuration.",
            "Gardez le logiciel de l'appareil à jour.",
            "Utilisez le bouton de sourdine physique quand vous ne voulez pas que l'appareil écoute.",
            "Examinez et supprimez régulièrement votre historique d'enregistrements vocaux.",
            "Ne discutez pas de coordonnées bancaires ou de mots de passe à proximité de l'appareil.",
            "Placez l'appareil loin des fenêtres et des portes."
        ],
        "rule_en": "If you do not want a smart speaker listening, press the physical mute button. A muted device with the light on (usually red) is not recording.",
        "rule_fr": "Si vous ne voulez pas qu'un haut-parleur intelligent écoute, appuyez sur le bouton de sourdine physique. Un appareil en sourdine avec la lumière allumée n'enregistre pas.",
        "warning_en": "Children may accidentally trigger purchases on smart speakers. Set up voice purchase confirmation or disable shopping features in the device settings.",
        "warning_fr": "Les enfants peuvent accidentellement déclencher des achats sur des haut-parleurs intelligents. Configurez la confirmation vocale des achats ou désactivez les fonctionnalités d'achat."
    },
    {
        "file": "how-to-use-health-portal.html",
        "question": "How do I use Ontario's patient health portal?",
        "question_fr": "Comment utiliser le portail de santé des patients de l'Ontario ?",
        "title": "How to Use Ontario's Patient Health Portal — Digital Confidence Centre",
        "desc": "Ontario's MyChart and other health portals let you see test results and book appointments online. A simple guide for Canadian seniors.",
        "module": "module-8.html",
        "module_name": "Module 8: Stay Connected",
        "breadcrumb_short": "Using Health Portals",
        "breadcrumb_short_fr": "Utiliser les portails de santé",
        "answer_en": "Many Ontario hospitals and family health teams now offer patient portals — secure websites where you can see your test results, appointment history, medication list, and sometimes book appointments or message your care team. Common portals in Ontario include MyChart (used by many hospitals), and Ocean (used by many family health teams). To get access, ask your doctor's office or hospital to invite you — they will send an email with a setup link. Set up a strong, unique password and enable two-factor authentication. Your health information is personal and sensitive, so treat the portal login with the same care as your banking login.",
        "answer_fr": "De nombreux hôpitaux et équipes de santé familiale de l'Ontario offrent des portails patients — des sites Web sécurisés où vous pouvez voir vos résultats de tests, votre historique de rendez-vous et parfois prendre des rendez-vous. Pour y accéder, demandez au bureau de votre médecin ou à l'hôpital de vous inviter.",
        "steps_en": [
            "Ask your doctor's office or hospital if they offer a patient portal.",
            "Ask them to send you an invitation — it will arrive by email.",
            "Click the link in the email and follow the setup instructions to create an account.",
            "Set a strong, unique password — different from all other accounts.",
            "Enable two-factor authentication in the portal settings.",
            "Bookmark the portal website so you always go directly to the real one."
        ],
        "steps_fr": [
            "Demandez au bureau de votre médecin ou à l'hôpital s'ils offrent un portail patient.",
            "Demandez-leur de vous envoyer une invitation — elle arrivera par courriel.",
            "Cliquez sur le lien dans le courriel et suivez les instructions pour créer un compte.",
            "Définissez un mot de passe fort et unique.",
            "Activez l'authentification à deux facteurs dans les paramètres du portail.",
            "Mettez le site Web du portail en signet pour y aller directement."
        ],
        "rule_en": "Your health portal contains very sensitive personal information. Use a unique password and two-factor authentication — treat it as carefully as your banking login.",
        "rule_fr": "Votre portail de santé contient des informations personnelles très sensibles. Utilisez un mot de passe unique et l'authentification à deux facteurs.",
        "warning_en": "Phishing emails impersonating patient portals do exist. Only ever access your portal by typing the address yourself or using a saved bookmark — never by clicking a link in an email.",
        "warning_fr": "Des courriels d'hameçonnage imitant les portails patients existent. Accédez toujours à votre portail en tapant vous-même l'adresse — jamais en cliquant sur un lien dans un courriel."
    },
    {
        "file": "how-to-spot-fake-website.html",
        "question": "How do I know if a website is fake?",
        "question_fr": "Comment savoir si un site Web est faux ?",
        "title": "How to Spot a Fake Website — Digital Confidence Centre",
        "desc": "Fake websites can steal your money or personal information. Learn the warning signs — simple tips for Canadian seniors to stay safe online.",
        "module": "module-2.html",
        "module_name": "Module 2: The Security Shield",
        "breadcrumb_short": "Spotting Fake Websites",
        "breadcrumb_short_fr": "Repérer les faux sites Web",
        "answer_en": "Fake websites are designed to look exactly like real ones — copying logos, colours, and layout. There are several reliable warning signs to check. First, look at the address bar: real websites have addresses that exactly match the real organisation (scotiabank.com, not scotiabank-secure.net or scotiabankca.com). Look for the padlock icon — but know that even fake sites can have it. Check for poor spelling, grammar, or design — professional organisations have professional websites. Be suspicious of sites reached by clicking links in emails. If you are unsure, search the organisation's name on Google and go to the result that clearly shows the real website — rather than clicking the link you were given.",
        "answer_fr": "Les faux sites Web sont conçus pour ressembler exactement aux vrais. Il y a plusieurs signes d'alerte fiables à vérifier. D'abord, regardez la barre d'adresse : les vrais sites Web ont des adresses qui correspondent exactement à la vraie organisation. Vérifiez les fautes d'orthographe, de grammaire ou de conception.",
        "steps_en": [
            "Check the full web address carefully — look for extra words, hyphens, or misspellings.",
            "Legitimate sites: scotiabank.com. Fake: scotiabank-secure.net or canadascotiabank.com.",
            "Look for the padlock icon in the address bar — though this is not foolproof.",
            "Look for spelling errors, blurry logos, or poor design on the page.",
            "Do not enter any information on a site you are not 100% confident is real.",
            "When in doubt, close the page and search for the organisation directly on Google."
        ],
        "steps_fr": [
            "Vérifiez attentivement l'adresse Web complète — cherchez des mots supplémentaires, des tirets ou des fautes d'orthographe.",
            "Sites légitimes : scotiabank.com. Faux : scotiabank-secure.net.",
            "Recherchez l'icône de cadenas dans la barre d'adresse.",
            "Cherchez des erreurs d'orthographe, des logos flous ou une mauvaise conception.",
            "N'entrez aucune information sur un site dont vous n'êtes pas sûr à 100%.",
            "En cas de doute, fermez la page et recherchez directement l'organisation sur Google."
        ],
        "rule_en": "When you are unsure if a website is real — close the tab and search for the organisation directly on Google. Then click the official result, not a link you were given.",
        "rule_fr": "Quand vous n'êtes pas sûr qu'un site Web soit réel — fermez l'onglet et recherchez directement l'organisation sur Google.",
        "warning_en": "Fake websites can look pixel-perfect. The address bar is your most reliable check — one extra word or hyphen in the web address is a clear sign of a fake.",
        "warning_fr": "Les faux sites Web peuvent sembler parfaits. La barre d'adresse est votre vérification la plus fiable — un mot supplémentaire ou un trait d'union dans l'adresse Web est un signe clair d'un faux."
    }
]

TEMPLATE = '''<!DOCTYPE html>
<html lang="en-CA" data-theme="light" data-font-size="medium">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="index, follow">
  <meta name="description" content="{desc}">
  <title>{title}</title>
  <link rel="canonical" href="https://twobirds-kramerica.github.io/digital-confidence/answers/{file}">
  <link rel="stylesheet" href="../css/main.css">
  <link rel="stylesheet" href="../css/accessibility.css">
  <link rel="icon" type="image/svg+xml" href="../favicon.svg">
  <meta property="og:title" content="Digital Confidence Centre">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="en_CA">
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
        "description": "{desc}",
        "author": {{ "@type": "Organization", "name": "Digital Confidence Centre" }},
        "publisher": {{ "@type": "Organization", "name": "Two Birds Innovation", "url": "https://twobirds-kramerica.github.io/digital-confidence/" }},
        "datePublished": "2026-03-28",
        "dateModified": "2026-03-28",
        "inLanguage": "en-CA",
        "url": "https://twobirds-kramerica.github.io/digital-confidence/answers/{file}"
      }},
      {{
        "@type": "FAQPage",
        "mainEntity": [{{
          "@type": "Question",
          "name": "{question}",
          "acceptedAnswer": {{
            "@type": "Answer",
            "text": "{answer_schema}"
          }}
        }}]
      }},
      {{
        "@type": "BreadcrumbList",
        "itemListElement": [
          {{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://twobirds-kramerica.github.io/digital-confidence/" }},
          {{ "@type": "ListItem", "position": 2, "name": "Quick Answers", "item": "https://twobirds-kramerica.github.io/digital-confidence/answers/" }},
          {{ "@type": "ListItem", "position": 3, "name": "{breadcrumb_short}" }}
        ]
      }},
      {{
        "@type": "speakable",
        "cssSelector": [".answer-direct", "h1"]
      }}
    ]
  }}
  </script>
</head>
<body>

  <div class="accessibility-bar" role="toolbar" aria-label="Accessibility controls">
    <button class="a11y-btn font-size-btn" data-size="small" aria-label="Small text" aria-pressed="false" style="font-size:0.8rem">A</button>
    <button class="a11y-btn font-size-btn" data-size="medium" aria-label="Medium text" aria-pressed="true" style="font-size:1rem">A</button>
    <button class="a11y-btn font-size-btn" data-size="large" aria-label="Large text" aria-pressed="false" style="font-size:1.2rem">A</button>
    <button class="a11y-btn font-size-btn" data-size="xl" aria-label="Extra large text" aria-pressed="false" style="font-size:1.4rem">A</button>
    <button class="a11y-btn theme-toggle-btn" aria-label="Switch to dark mode">🌓</button>
  </div>

  <div class="top-bar">
    <button class="menu-btn" aria-label="Open navigation menu">☰</button>
    <span class="site-title">Digital Confidence Centre</span>
    <span></span>
  </div>

  <div class="sidebar-overlay" aria-hidden="true"></div>

  <aside class="sidebar" aria-label="Main navigation">
    <button class="sidebar-close" aria-label="Close navigation">✕</button>
    <div class="sidebar-header">
      <h2>Digital Confidence Centre</h2>
      <p>Free digital literacy for seniors</p>
    </div>
    <nav>
      <a href="../index.html"><span class="nav-icon">🏠</span><span class="nav-label">Home</span></a>
      <a href="../answers/" aria-current="page"><span class="nav-icon">💡</span><span class="nav-label">Quick Answers</span></a>
      <a href="../module-1.html"><span class="nav-icon">🪂</span><span class="nav-label">1. The Escape Hatch</span></a>
      <a href="../resources.html"><span class="nav-icon">📚</span><span class="nav-label">Resources</span></a>
      <a href="../resources/support-directory.html"><span class="nav-icon">🆘</span><span class="nav-label">Get Help</span></a>
      <div class="sidebar-a11y-section">
        <p class="sidebar-a11y-title">Text Size</p>
        <div class="sidebar-font-row">
          <button class="a11y-btn font-size-btn" data-size="small" aria-label="Small text" aria-pressed="false" style="font-size:0.8rem">A</button>
          <button class="a11y-btn font-size-btn" data-size="medium" aria-label="Medium text" aria-pressed="false" style="font-size:1rem">A</button>
          <button class="a11y-btn font-size-btn" data-size="large" aria-label="Large text" aria-pressed="false" style="font-size:1.2rem">A</button>
          <button class="a11y-btn font-size-btn" data-size="xl" aria-label="Extra large text" aria-pressed="false" style="font-size:1.4rem">A</button>
        </div>
      </div>
    </nav>
  </aside>

  <div class="page-wrapper">
    <main class="main-content" id="main">

      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="../index.html" data-en="Home" data-fr="Accueil">Home</a> ›
        <a href="../answers/" data-en="Quick Answers" data-fr="Réponses rapides">Quick Answers</a> ›
        <span aria-current="page" data-en="{breadcrumb_short}" data-fr="{breadcrumb_short_fr}">{breadcrumb_short}</span>
      </nav>

      <h1 data-en="{question}" data-fr="{question_fr}">{question}</h1>

      <div class="answer-direct" data-speakable="true">
        <p data-en="{answer_en}" data-fr="{answer_fr}">{answer_en}</p>
      </div>

      <div class="answer-steps">
        <h2 data-en="What to do" data-fr="Que faire">What to do</h2>
        <ol>
{steps_html}
        </ol>
      </div>

      <div class="answer-rule">
        <h2 data-en="The 3-Second Rule" data-fr="La règle des 3 secondes">The 3-Second Rule</h2>
        <p data-en="{rule_en}" data-fr="{rule_fr}">{rule_en}</p>
      </div>

      <div class="answer-warning">
        <h2 data-en="Important Warning" data-fr="Avertissement important">Important Warning</h2>
        <p data-en="{warning_en}" data-fr="{warning_fr}">{warning_en}</p>
      </div>

      <div class="answer-learn-more">
        <h2 data-en="Learn More" data-fr="En savoir plus">Learn More</h2>
        <p data-en="Go deeper with our full lesson: <a href=&quot;../{module}&quot;>{module_name}</a>." data-fr="Approfondissez avec notre leçon complète : <a href=&quot;../{module}&quot;>{module_name}</a>.">Go deeper with our full lesson: <a href="../{module}">{module_name}</a>.</p>
        <p><a href="../answers/" data-en="← Back to all Quick Answers" data-fr="← Retour aux réponses rapides">← Back to all Quick Answers</a></p>
      </div>

      <footer class="site-footer">
        <div class="footer-inner">
          <p class="footer-brand">Digital Confidence Centre</p>
          <p class="footer-tagline">A free learning programme for Canadian seniors</p>
          <nav class="footer-links" aria-label="Footer navigation">
            <a href="../index.html">Home</a> |
            <a href="../resources.html">Resources</a> |
            <a href="../about.html">About</a> |
            <a href="../accessibility.html">Accessibility</a> |
            <a href="../privacy.html">Privacy Policy</a> |
            <a href="#" onclick="openFeedbackModal(); return false;">Ideas &amp; Feedback</a> |
            <a href="../resources/support-directory.html">Get Help</a>
          </nav>
          <p class="footer-copy">&copy; 2026 Two Birds Innovation. Made with care in Ontario, Canada.</p>
        </div>
      </footer>

    </main>
  </div>

  <script src="../js/search-index.js" defer></script>
  <script src="../js/search.js" defer></script>
  <script src="../js/analytics-consent.js" defer></script>
  <script src="../js/app.js" defer></script>
  <script src="../js/lang-toggle.js" defer></script>
  <script src="../js/accessibility.js" defer></script>
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

    # Build steps HTML
    steps_html_parts = []
    for en, fr in zip(page['steps_en'], page['steps_fr']):
        en_esc = en.replace('"', '&quot;')
        fr_esc = fr.replace('"', '&quot;')
        steps_html_parts.append(f'          <li data-en="{en_esc}" data-fr="{fr_esc}">{en}</li>')
    steps_html = '\n'.join(steps_html_parts)

    # Schema-safe answer (no quotes)
    answer_schema = page['answer_en'].replace('"', "'")

    html = TEMPLATE.format(
        file=page['file'],
        question=page['question'],
        question_fr=page['question_fr'],
        title=page['title'],
        desc=page['desc'],
        module=page['module'],
        module_name=page['module_name'],
        breadcrumb_short=page['breadcrumb_short'],
        breadcrumb_short_fr=page['breadcrumb_short_fr'],
        answer_en=page['answer_en'],
        answer_fr=page['answer_fr'],
        answer_schema=answer_schema,
        steps_html=steps_html,
        rule_en=page['rule_en'],
        rule_fr=page['rule_fr'],
        warning_en=page['warning_en'],
        warning_fr=page['warning_fr'],
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)
    created.append(page['file'])
    print(f"Created: {page['file']}")

print(f"\nDone. Created: {len(created)}, Skipped (already exist): {len(skipped)}")
if skipped:
    print("Skipped:", ', '.join(skipped))
