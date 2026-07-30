#!/usr/bin/env python3
"""Generate 12 new tips articles for Digital Confidence Centre."""
import os

BASE = r'C:\Users\getkr\brenda-digital-confidence\tips'

TIPS = [
    {
        "file": "ai-voice-clone-scam.html",
        "title": "AI Voice Clone Scams: When the Voice on the Phone Isn't Who You Think | Digital Confidence Centre",
        "desc": "Criminals can now clone someone's voice using AI after just a few seconds of audio. Learn how to protect yourself from this growing scam targeting Canadian families.",
        "headline": "AI Voice Clone Scams: When the Voice on the Phone Isn't Who You Think",
        "headline_fr": "Arnaques par clonage vocal IA : Quand la voix au téléphone n'est pas qui vous croyez",
        "byline": "By Two Birds Innovation · March 2026",
        "module": "module-2.html",
        "module_name": "Module 2: The Security Shield",
        "faq": [
            {"q": "What is an AI voice clone scam?", "a": "Criminals record a few seconds of someone's voice from social media or voicemail, then use AI to clone it — creating a convincing fake that sounds like your grandchild, child, or friend calling in distress and asking for money."},
            {"q": "How do I know if the distress call is real?", "a": "Hang up and call your family member directly on their known number. If the call was real, they will answer or call back. If it was a scam, you will have saved yourself from sending money to a criminal."}
        ],
        "content": """
      <div class="geo-answer">
        <p data-en="A new and deeply unsettling scam is spreading across Canada. Criminals record just a few seconds of someone's voice — from a social media video, a voicemail greeting, or even a YouTube clip — and use artificial intelligence to clone it. The result is a convincing fake voice they can use to make phone calls." data-fr="Une nouvelle arnaque profondément troublante se répand au Canada. Les criminels enregistrent quelques secondes de la voix de quelqu'un et utilisent l'intelligence artificielle pour la cloner.">A new and deeply unsettling scam is spreading across Canada. Criminals record just a few seconds of someone's voice — from a social media video, a voicemail greeting, or even a YouTube clip — and use artificial intelligence to clone it. The result is a convincing fake voice they can use to make phone calls.</p>

        <h2 data-en="How the scam works" data-fr="Comment fonctionne l'arnaque">How the scam works</h2>
        <p data-en="You receive a call that sounds exactly like your grandchild, your son, or your daughter. They say they are in trouble — arrested, in a car accident, in hospital in another city. They beg you not to tell anyone and to send money urgently by gift card or wire transfer. The voice sounds real because it is — in a sense. It is an AI clone of their actual voice." data-fr="Vous recevez un appel qui ressemble exactement à votre petit-enfant, votre fils ou votre fille. Ils disent qu'ils ont des ennuis — arrêtés, dans un accident de voiture, à l'hôpital dans une autre ville. La voix semble réelle car c'est un clone IA de leur vraie voix.">You receive a call that sounds exactly like your grandchild, your son, or your daughter. They say they are in trouble — arrested, in a car accident, in hospital in another city. They beg you not to tell anyone and to send money urgently by gift card or wire transfer. The voice sounds real because it is — in a sense. It is an AI clone of their actual voice.</p>

        <ul class="content-list">
          <li data-en="The scammer says: &quot;Grandma, it's me, don't tell Mom.&quot; — this is designed to isolate you from support." data-fr="L'escroc dit : 'Grand-maman, c'est moi, ne le dis pas à maman.' — cela est conçu pour vous isoler du soutien.">The scammer says: "Grandma, it's me, don't tell Mom." — this is designed to isolate you from support.</li>
          <li data-en="They urgently need money — always gift cards, wire transfers, or cryptocurrency." data-fr="Ils ont besoin d'argent d'urgence — toujours des cartes-cadeaux, des virements ou de la cryptomonnaie.">They urgently need money — always gift cards, wire transfers, or cryptocurrency.</li>
          <li data-en="They tell you it must be kept secret from the rest of the family." data-fr="Ils vous disent que cela doit rester secret du reste de la famille.">They tell you it must be kept secret from the rest of the family.</li>
        </ul>

        <h2 data-en="What to do if this happens to you" data-fr="Que faire si cela vous arrive">What to do if this happens to you</h2>
        <ul class="content-list">
          <li data-en="Hang up, even if the voice sounds completely real." data-fr="Raccrochez, même si la voix semble complètement réelle.">Hang up, even if the voice sounds completely real.</li>
          <li data-en="Call your family member directly on their real, known phone number." data-fr="Appelez votre membre de la famille directement sur son vrai numéro de téléphone connu.">Call your family member directly on their real, known phone number.</li>
          <li data-en="If they answer, you will know the first call was a scam." data-fr="S'ils répondent, vous saurez que le premier appel était une arnaque.">If they answer, you will know the first call was a scam.</li>
          <li data-en="Do not send money until you have confirmed with the real person directly." data-fr="N'envoyez pas d'argent avant d'avoir confirmé avec la vraie personne directement.">Do not send money until you have confirmed with the real person directly.</li>
        </ul>

        <div class="tip-block">
          <span class="tip-label" data-en="Set up a family code word" data-fr="Établissez un mot de code familial">Set up a family code word</span>
          <p data-en="Talk to your family now and agree on a secret code word that only your family knows. If anyone calls claiming to be a family member in distress, ask for the code word. A scammer will not know it." data-fr="Parlez à votre famille maintenant et convenez d'un mot de code secret que seule votre famille connaît. Si quelqu'un appelle en prétendant être un membre de la famille en détresse, demandez le mot de code.">Talk to your family now and agree on a secret code word that only your family knows. If anyone calls claiming to be a family member in distress, ask for the code word. A scammer will not know it.</p>
        </div>
      </div>"""
    },
    {
        "file": "medicare-card-scam.html",
        "title": "The Medicare Card Scam: Why Criminals Want Your Health Card Number | Digital Confidence Centre",
        "desc": "Your Ontario health card number can be used to steal your identity. Learn how this scam works and how to protect yourself.",
        "headline": "The Medicare Card Scam: Why Criminals Want Your Health Card Number",
        "headline_fr": "L'arnaque de la carte Medicare : Pourquoi les criminels veulent votre numéro de carte santé",
        "byline": "By Two Birds Innovation · March 2026",
        "module": "module-2.html",
        "module_name": "Module 2: The Security Shield",
        "faq": [
            {"q": "Why do scammers want my health card number?", "a": "Your Ontario health card number, combined with your name and date of birth, can be used to steal your identity, fraudulently access healthcare services in your name, or as a piece of the identity puzzle needed to access your financial accounts."},
            {"q": "When is it legitimate to share my health card number?", "a": "Only share your health card number with a healthcare provider in person — your doctor, a pharmacist, a hospital. Never share it over the phone or by email, even if the caller claims to be from OHIP or the Ministry of Health."}
        ],
        "content": """
      <div class="geo-answer">
        <p data-en="Your Ontario health card number (OHIP card) is more valuable to criminals than you might think. Combined with your name and date of birth — information that is often easy to find — it can be used to steal your identity, create fraudulent health claims, or as a key piece of information needed to access your financial accounts." data-fr="Votre numéro de carte santé de l'Ontario (carte OHIP) est plus précieux pour les criminels que vous ne le pensez. Combiné à votre nom et votre date de naissance, il peut être utilisé pour voler votre identité.">Your Ontario health card number (OHIP card) is more valuable to criminals than you might think. Combined with your name and date of birth — information that is often easy to find — it can be used to steal your identity, create fraudulent health claims, or as a key piece of information needed to access your financial accounts.</p>

        <h2 data-en="How the scam works" data-fr="Comment fonctionne l'arnaque">How the scam works</h2>
        <p data-en="A caller claims to be from OHIP, the Ontario Ministry of Health, or your local health unit. They say your health card is expiring, there is an error on your file, or you are owed a refund. To fix it, they need to verify your card number, date of birth, and sometimes your address." data-fr="Un appelant prétend être d'OHIP, du ministère de la Santé de l'Ontario ou de votre unité de santé locale. Ils disent que votre carte santé expire ou qu'il y a une erreur dans votre dossier.">A caller claims to be from OHIP, the Ontario Ministry of Health, or your local health unit. They say your health card is expiring, there is an error on your file, or you are owed a refund. To fix it, they need to verify your card number, date of birth, and sometimes your address.</p>

        <ul class="content-list">
          <li data-en="OHIP will never call you asking for your health card number — they already have it." data-fr="OHIP ne vous appellera jamais pour demander votre numéro de carte santé — ils l'ont déjà.">OHIP will never call you asking for your health card number — they already have it.</li>
          <li data-en="Legitimate health card renewals happen by mail, not by phone." data-fr="Les renouvellements légitimes de carte santé se font par courrier, pas par téléphone.">Legitimate health card renewals happen by mail, not by phone.</li>
          <li data-en="No government health agency will offer you a refund by phone." data-fr="Aucune agence de santé gouvernementale ne vous offrira un remboursement par téléphone.">No government health agency will offer you a refund by phone.</li>
        </ul>

        <h2 data-en="When sharing your health card number is legitimate" data-fr="Quand partager votre numéro de carte santé est légitime">When sharing your health card number is legitimate</h2>
        <ul class="content-list">
          <li data-en="In person at your doctor's office, pharmacy, or hospital." data-fr="En personne chez votre médecin, à la pharmacie ou à l'hôpital.">In person at your doctor's office, pharmacy, or hospital.</li>
          <li data-en="Online through your doctor's official patient portal (one you set up yourself)." data-fr="En ligne via le portail patient officiel de votre médecin (que vous avez configuré vous-même).">Online through your doctor's official patient portal (one you set up yourself).</li>
          <li data-en="Never over the phone, never in response to an email, never to a caller you did not initiate contact with." data-fr="Jamais par téléphone, jamais en réponse à un courriel, jamais à un appelant que vous n'avez pas contacté.">Never over the phone, never in response to an email, never to a caller you did not initiate contact with.</li>
        </ul>

        <div class="tip-block">
          <span class="tip-label" data-en="Report it" data-fr="Signalez-le">Report it</span>
          <p data-en="If you receive a suspicious call about your health card, report it to the Canadian Anti-Fraud Centre at 1-888-495-8501. Your report helps protect others in your community." data-fr="Si vous recevez un appel suspect concernant votre carte santé, signalez-le au Centre antifraude du Canada au 1-888-495-8501.">If you receive a suspicious call about your health card, report it to the Canadian Anti-Fraud Centre at 1-888-495-8501. Your report helps protect others in your community.</p>
        </div>
      </div>"""
    },
    {
        "file": "facebook-marketplace-safety.html",
        "title": "Staying Safe on Facebook Marketplace: A Guide for Seniors | Digital Confidence Centre",
        "desc": "Facebook Marketplace is convenient but has real risks. Learn how to buy and sell safely — essential tips for Canadian seniors.",
        "headline": "Staying Safe on Facebook Marketplace: A Guide for Seniors",
        "headline_fr": "Rester en sécurité sur Facebook Marketplace : Un guide pour les aînés",
        "byline": "By Two Birds Innovation · March 2026",
        "module": "module-6.html",
        "module_name": "Module 6: Banking & Transactions",
        "faq": [
            {"q": "Is Facebook Marketplace safe to use?", "a": "Facebook Marketplace can be used safely when you follow key precautions: meet in public places (many police stations offer 'safe exchange zones'), only accept cash or Interac e-Transfer from someone you can verify, and never accept cheques or wire transfers."},
            {"q": "What are the biggest scams on Facebook Marketplace in Canada?", "a": "The most common scams are: overpayment by cheque (scammer sends a cheque for more than the price, asks you to refund the difference — the cheque bounces), fake e-Transfer confirmations (they show you a screenshot claiming payment was sent — verify in your actual bank app), and buyers who want you to ship items before payment clears."}
        ],
        "content": """
      <div class="geo-answer">
        <p data-en="Facebook Marketplace is a popular place to buy and sell locally in Canada — but it comes with real risks. Scammers actively target sellers and buyers, and transactions gone wrong can be very difficult to reverse. This guide will help you use Marketplace safely." data-fr="Facebook Marketplace est un endroit populaire pour acheter et vendre localement au Canada — mais il comporte de vrais risques. Les escrocs ciblent activement les vendeurs et les acheteurs.">Facebook Marketplace is a popular place to buy and sell locally in Canada — but it comes with real risks. Scammers actively target sellers and buyers, and transactions gone wrong can be very difficult to reverse. This guide will help you use Marketplace safely.</p>

        <h2 data-en="For sellers" data-fr="Pour les vendeurs">For sellers</h2>
        <ul class="content-list">
          <li data-en="Only accept cash or Interac e-Transfer as payment — verify the e-Transfer in your actual bank app, not from a screenshot." data-fr="N'acceptez que des espèces ou le virement Interac comme paiement — vérifiez le virement dans votre vrai compte bancaire, pas à partir d'une capture d'écran.">Only accept cash or Interac e-Transfer as payment — verify the e-Transfer in your actual bank app, not from a screenshot.</li>
          <li data-en="Never accept cheques or money orders — they can be fake and take weeks to bounce." data-fr="N'acceptez jamais de chèques ou de mandats — ils peuvent être faux et prendre des semaines à être rejetés.">Never accept cheques or money orders — they can be fake and take weeks to bounce.</li>
          <li data-en="Never ship items to buyers you haven't met in person." data-fr="N'expédiez jamais d'articles à des acheteurs que vous n'avez pas rencontrés en personne.">Never ship items to buyers you haven't met in person.</li>
          <li data-en="Meet in a public place — a coffee shop, a shopping centre, or your local police station's 'safe exchange zone'." data-fr="Rencontrez-vous dans un lieu public — un café, un centre commercial ou la 'zone d'échange sécuritaire' de votre poste de police local.">Meet in a public place — a coffee shop, a shopping centre, or your local police station's 'safe exchange zone'.</li>
        </ul>

        <h2 data-en="For buyers" data-fr="Pour les acheteurs">For buyers</h2>
        <ul class="content-list">
          <li data-en="Check the seller's profile — no reviews, recently created accounts, or very few friends are red flags." data-fr="Vérifiez le profil du vendeur — pas d'avis, des comptes récemment créés ou très peu d'amis sont des signaux d'alarme.">Check the seller's profile — no reviews, recently created accounts, or very few friends are red flags.</li>
          <li data-en="Ask for additional photos of the item before agreeing to purchase." data-fr="Demandez des photos supplémentaires de l'article avant d'accepter d'acheter.">Ask for additional photos of the item before agreeing to purchase.</li>
          <li data-en="If a deal seems too good to be true — it is almost certainly a scam." data-fr="Si une offre semble trop belle pour être vraie — c'est presque certainement une arnaque.">If a deal seems too good to be true — it is almost certainly a scam.</li>
          <li data-en="Never pay by gift card, wire transfer, or cryptocurrency — legitimate sellers don't ask for these." data-fr="Ne payez jamais par carte-cadeau, virement bancaire ou cryptomonnaie — les vendeurs légitimes ne demandent pas ces moyens de paiement.">Never pay by gift card, wire transfer, or cryptocurrency — legitimate sellers don't ask for these.</li>
        </ul>

        <div class="tip-block">
          <span class="tip-label" data-en="Safe exchange zones" data-fr="Zones d'échange sécuritaires">Safe exchange zones</span>
          <p data-en="Many Ontario police stations have designated 'safe exchange zones' with security cameras where you can complete Marketplace transactions safely. In St. Thomas, check with the St. Thomas Police Service." data-fr="De nombreux postes de police de l'Ontario ont des 'zones d'échange sécuritaires' avec des caméras de sécurité où vous pouvez effectuer des transactions Marketplace en toute sécurité.">Many Ontario police stations have designated 'safe exchange zones' with security cameras where you can complete Marketplace transactions safely. In St. Thomas, check with the St. Thomas Police Service.</p>
        </div>
      </div>"""
    },
    {
        "file": "smart-home-privacy.html",
        "title": "Smart Speakers and Privacy: What Alexa and Google Home Are Actually Listening To | Digital Confidence Centre",
        "desc": "Smart speakers are always listening for their wake word. Learn what they actually record, how to delete recordings, and how to use them safely.",
        "headline": "Smart Speakers and Privacy: What Alexa and Google Home Are Actually Listening To",
        "headline_fr": "Haut-parleurs intelligents et confidentialité : Ce qu'Alexa et Google Home écoutent vraiment",
        "byline": "By Two Birds Innovation · March 2026",
        "module": "module-9.html",
        "module_name": "Module 9: Understanding AI",
        "faq": [
            {"q": "Is Alexa always listening to my conversations?", "a": "Alexa is always listening for the wake word 'Alexa' — but it only records and sends audio after hearing it. However, false activations do occur when the device mistakenly thinks it heard its wake word. You can review and delete all recordings in the Alexa app."},
            {"q": "How do I stop my smart speaker from recording?", "a": "Press the physical mute button on your device — this cuts power to the microphone entirely. When muted, the device cannot hear anything, including its wake word. The indicator light (usually red) confirms the microphone is off."}
        ],
        "content": """
      <div class="geo-answer">
        <p data-en="If you have an Amazon Echo (Alexa), Google Nest, or Apple HomePod in your home, it is always listening — waiting to hear its wake word. This article explains exactly what these devices record, what happens to that data, and how to protect your privacy without giving up the convenience." data-fr="Si vous avez un Amazon Echo (Alexa), Google Nest ou Apple HomePod chez vous, il écoute toujours — attendant d'entendre son mot de réveil. Cet article explique exactement ce que ces appareils enregistrent et comment protéger votre vie privée.">If you have an Amazon Echo (Alexa), Google Nest, or Apple HomePod in your home, it is always listening — waiting to hear its wake word. This article explains exactly what these devices record, what happens to that data, and how to protect your privacy without giving up the convenience.</p>

        <h2 data-en="What they actually record" data-fr="Ce qu'ils enregistrent réellement">What they actually record</h2>
        <ul class="content-list">
          <li data-en="Smart speakers record audio only after they detect their wake word ('Alexa', 'Hey Google', 'Hey Siri')." data-fr="Les haut-parleurs intelligents n'enregistrent l'audio qu'après avoir détecté leur mot de réveil ('Alexa', 'Hey Google', 'Dis Siri').">Smart speakers record audio only after they detect their wake word ('Alexa', 'Hey Google', 'Hey Siri').</li>
          <li data-en="Recordings are sent to Amazon or Google's servers and may be reviewed by employees to improve the AI." data-fr="Les enregistrements sont envoyés aux serveurs d'Amazon ou de Google et peuvent être examinés par des employés pour améliorer l'IA.">Recordings are sent to Amazon or Google's servers and may be reviewed by employees to improve the AI.</li>
          <li data-en="False activations do happen — the device may think it heard its wake word when it did not." data-fr="De fausses activations se produisent — l'appareil peut croire qu'il a entendu son mot de réveil quand ce n'était pas le cas.">False activations do happen — the device may think it heard its wake word when it did not.</li>
        </ul>

        <h2 data-en="How to protect your privacy" data-fr="Comment protéger votre vie privée">How to protect your privacy</h2>
        <ul class="content-list">
          <li data-en="Mute when not in use — press the physical mute button (usually makes the ring turn red)." data-fr="Coupez le son lorsque vous ne l'utilisez pas — appuyez sur le bouton de sourdine physique (fait généralement devenir l'anneau rouge).">Mute when not in use — press the physical mute button (usually makes the ring turn red).</li>
          <li data-en="Regularly delete your recording history in the Alexa or Google Home app." data-fr="Supprimez régulièrement votre historique d'enregistrements dans l'application Alexa ou Google Home.">Regularly delete your recording history in the Alexa or Google Home app.</li>
          <li data-en="Avoid sensitive conversations (banking details, passwords, medical information) near the device." data-fr="Évitez les conversations sensibles (coordonnées bancaires, mots de passe, informations médicales) à proximité de l'appareil.">Avoid sensitive conversations (banking details, passwords, medical information) near the device.</li>
          <li data-en="Keep the device's software updated — security patches are included." data-fr="Gardez le logiciel de l'appareil à jour — les correctifs de sécurité sont inclus.">Keep the device's software updated — security patches are included.</li>
          <li data-en="Disable voice purchasing or require a PIN for purchases." data-fr="Désactivez les achats vocaux ou exigez un NIP pour les achats.">Disable voice purchasing or require a PIN for purchases.</li>
        </ul>

        <div class="tip-block">
          <span class="tip-label" data-en="Apple HomePod is more private" data-fr="Apple HomePod est plus privé">Apple HomePod is more private</span>
          <p data-en="Apple processes Siri requests on-device when possible and does not store recordings linked to your Apple ID. If privacy is a priority, HomePod is the most private of the major smart speakers." data-fr="Apple traite les requêtes Siri sur l'appareil lorsque possible et ne stocke pas d'enregistrements liés à votre identifiant Apple. Si la confidentialité est une priorité, HomePod est le haut-parleur intelligent le plus privé.">Apple processes Siri requests on-device when possible and does not store recordings linked to your Apple ID. If privacy is a priority, HomePod is the most private of the major smart speakers.</p>
        </div>
      </div>"""
    },
    {
        "file": "online-grocery-guide.html",
        "title": "How to Order Groceries Online Safely: A Guide for Seniors | Digital Confidence Centre",
        "desc": "Online grocery shopping is convenient and safe when you follow a few simple steps. A practical guide for Canadian seniors using Instacart, Walmart, and Grocery Gateway.",
        "headline": "How to Order Groceries Online Safely: A Guide for Seniors",
        "headline_fr": "Comment commander des épiceries en ligne en toute sécurité : Un guide pour les aînés",
        "byline": "By Two Birds Innovation · March 2026",
        "module": "module-10.html",
        "module_name": "Module 10: Grocery & Food Delivery",
        "faq": [
            {"q": "Which online grocery services are safe for seniors in Ontario?", "a": "Walmart Grocery, Sobeys/Voilà, Loblaws Click & Collect, Instacart, and Grocery Gateway are all reputable services used widely in Ontario. Stick to well-known services and avoid placing orders through links in emails or social media ads."},
            {"q": "Is it safe to save my credit card on an online grocery site?", "a": "It is generally safe to save your payment information on major grocery retailers — they use industry-standard encryption. However, use a credit card rather than a debit card for better fraud protection, and check your statement after each order."}
        ],
        "content": """
      <div class="geo-answer">
        <p data-en="Online grocery shopping has become a lifeline for many Canadian seniors — especially in winter, when driving may be difficult, or during periods when leaving home is not possible. The major grocery chains in Ontario have reliable, safe online ordering systems. This guide will help you use them with confidence." data-fr="Les courses en ligne sont devenues essentielles pour de nombreux aînés canadiens — surtout en hiver ou lors de périodes où quitter la maison n'est pas possible. Les grandes chaînes d'épicerie de l'Ontario disposent de systèmes de commande en ligne fiables et sûrs.">Online grocery shopping has become a lifeline for many Canadian seniors — especially in winter, when driving may be difficult, or during periods when leaving home is not possible. The major grocery chains in Ontario have reliable, safe online ordering systems. This guide will help you use them with confidence.</p>

        <h2 data-en="Trusted Ontario grocery services" data-fr="Services d'épicerie fiables de l'Ontario">Trusted Ontario grocery services</h2>
        <ul class="content-list">
          <li data-en="Walmart Grocery (walmart.ca) — delivery or in-store pickup available across Ontario." data-fr="Walmart Épicerie (walmart.ca) — livraison ou ramassage en magasin disponible partout en Ontario.">Walmart Grocery (walmart.ca) — delivery or in-store pickup available across Ontario.</li>
          <li data-en="Sobeys/Voilà (sobeys.com) — delivery available in many Ontario communities." data-fr="Sobeys/Voilà (sobeys.com) — livraison disponible dans de nombreuses communautés de l'Ontario.">Sobeys/Voilà (sobeys.com) — delivery available in many Ontario communities.</li>
          <li data-en="Loblaws Click &amp; Collect (loblaws.ca) — order online, pick up at your local store." data-fr="Loblaws Click &amp; Collect (loblaws.ca) — commandez en ligne, ramassez à votre magasin local.">Loblaws Click &amp; Collect (loblaws.ca) — order online, pick up at your local store.</li>
          <li data-en="Instacart (instacart.ca) — connects you with shoppers from most major grocery stores." data-fr="Instacart (instacart.ca) — vous met en contact avec des acheteurs de la plupart des grandes épiceries.">Instacart (instacart.ca) — connects you with shoppers from most major grocery stores.</li>
        </ul>

        <h2 data-en="How to order safely" data-fr="Comment commander en toute sécurité">How to order safely</h2>
        <ul class="content-list">
          <li data-en="Always type the store's web address yourself — do not click grocery links in emails or ads." data-fr="Tapez toujours vous-même l'adresse Web du magasin — ne cliquez pas sur des liens d'épicerie dans des courriels ou des publicités.">Always type the store's web address yourself — do not click grocery links in emails or ads.</li>
          <li data-en="Create an account with a strong, unique password and save it in Apple's Password Manager." data-fr="Créez un compte avec un mot de passe fort et unique et sauvegardez-le dans le gestionnaire de mots de passe d'Apple.">Create an account with a strong, unique password and save it in Apple's Password Manager.</li>
          <li data-en="Use a credit card for payment — better fraud protection than debit." data-fr="Utilisez une carte de crédit pour le paiement — meilleure protection contre la fraude que le débit.">Use a credit card for payment — better fraud protection than debit.</li>
          <li data-en="Check your order confirmation and your credit card statement after the delivery." data-fr="Vérifiez votre confirmation de commande et votre relevé de carte de crédit après la livraison.">Check your order confirmation and your credit card statement after the delivery.</li>
        </ul>

        <div class="tip-block">
          <span class="tip-label" data-en="Ask for help the first time" data-fr="Demandez de l'aide la première fois">Ask for help the first time</span>
          <p data-en="If you have never ordered groceries online before, ask a family member or friend to walk through the first order with you. After that, you will find it is quite straightforward." data-fr="Si vous n'avez jamais commandé d'épiceries en ligne auparavant, demandez à un membre de la famille ou à un ami de passer la première commande avec vous.">If you have never ordered groceries online before, ask a family member or friend to walk through the first order with you. After that, you will find it is quite straightforward.</p>
        </div>
      </div>"""
    },
    {
        "file": "video-call-tips-advanced.html",
        "title": "Getting the Most from Video Calls: Advanced Tips for Seniors | Digital Confidence Centre",
        "desc": "Already comfortable with video calls? These tips will help you look and sound better, manage large family calls, and troubleshoot common problems.",
        "headline": "Getting the Most from Video Calls: Advanced Tips for Seniors",
        "headline_fr": "Tirer le meilleur parti des appels vidéo : Conseils avancés pour les aînés",
        "byline": "By Two Birds Innovation · March 2026",
        "module": "module-8.html",
        "module_name": "Module 8: Stay Connected",
        "faq": [
            {"q": "How do I look and sound better on video calls?", "a": "Face a window or lamp so light falls on your face (not behind you). Position your device at eye level — prop it on a stack of books if needed. Use earbuds or headphones to reduce echo. Find a quiet room and close the door."},
            {"q": "How do I join a group FaceTime or Zoom call with multiple family members?", "a": "For group FaceTime: open the FaceTime app, tap New FaceTime, and add multiple contacts. For Zoom: the host shares a meeting link, and you just tap it at the scheduled time. Both support large family gatherings."}
        ],
        "content": """
      <div class="geo-answer">
        <p data-en="Once you are comfortable with the basics of video calling, there is a lot you can do to improve the experience — better lighting, better sound, and confidence managing group calls with the whole family. This article covers the practical tips that make a real difference." data-fr="Une fois que vous êtes à l'aise avec les bases des appels vidéo, il y a beaucoup que vous pouvez faire pour améliorer l'expérience — un meilleur éclairage, un meilleur son et de la confiance pour gérer les appels en groupe avec toute la famille.">Once you are comfortable with the basics of video calling, there is a lot you can do to improve the experience — better lighting, better sound, and confidence managing group calls with the whole family. This article covers the practical tips that make a real difference.</p>

        <h2 data-en="Look and sound your best" data-fr="Avoir la meilleure apparence et le meilleur son">Look and sound your best</h2>
        <ul class="content-list">
          <li data-en="Face a light source — sit facing a window or lamp so your face is well-lit. Light behind you makes you appear as a dark silhouette." data-fr="Faites face à une source de lumière — asseyez-vous face à une fenêtre ou une lampe. La lumière derrière vous vous fait apparaître comme une silhouette sombre.">Face a light source — sit facing a window or lamp so your face is well-lit. Light behind you makes you appear as a dark silhouette.</li>
          <li data-en="Position your device at eye level — prop your iPad on a stand or stack of books." data-fr="Positionnez votre appareil au niveau des yeux — posez votre iPad sur un support ou une pile de livres.">Position your device at eye level — prop your iPad on a stand or stack of books.</li>
          <li data-en="Use earbuds or a headset — this eliminates echo and makes your voice much clearer." data-fr="Utilisez des écouteurs ou un casque — cela élimine l'écho et rend votre voix beaucoup plus claire.">Use earbuds or a headset — this eliminates echo and makes your voice much clearer.</li>
          <li data-en="Find a quiet room and close the door before the call." data-fr="Trouvez une pièce calme et fermez la porte avant l'appel.">Find a quiet room and close the door before the call.</li>
        </ul>

        <h2 data-en="Group calls with the whole family" data-fr="Appels en groupe avec toute la famille">Group calls with the whole family</h2>
        <ul class="content-list">
          <li data-en="FaceTime supports up to 32 people — open FaceTime, tap New FaceTime, and add all the family members you want." data-fr="FaceTime prend en charge jusqu'à 32 personnes — ouvrez FaceTime, appuyez sur Nouveau FaceTime et ajoutez tous les membres de la famille que vous souhaitez.">FaceTime supports up to 32 people — open FaceTime, tap New FaceTime, and add all the family members you want.</li>
          <li data-en="For Zoom family gatherings, ask one person to be the host and share the meeting link with everyone." data-fr="Pour les rassemblements familiaux Zoom, demandez à une personne d'être l'hôte et de partager le lien de la réunion avec tout le monde.">For Zoom family gatherings, ask one person to be the host and share the meeting link with everyone.</li>
          <li data-en="Mute yourself when you are not speaking — it reduces background noise for everyone." data-fr="Coupez-vous le son lorsque vous ne parlez pas — cela réduit le bruit de fond pour tout le monde.">Mute yourself when you are not speaking — it reduces background noise for everyone.</li>
        </ul>

        <h2 data-en="Troubleshooting common problems" data-fr="Résolution des problèmes courants">Troubleshooting common problems</h2>
        <ul class="content-list">
          <li data-en="Frozen image or choppy audio: move closer to your Wi-Fi router, or restart the router." data-fr="Image figée ou audio saccadé : rapprochez-vous de votre routeur Wi-Fi, ou redémarrez le routeur.">Frozen image or choppy audio: move closer to your Wi-Fi router, or restart the router.</li>
          <li data-en="They can hear you but not see you: check that the app has permission to use the camera (Settings → Privacy → Camera)." data-fr="Ils vous entendent mais ne vous voient pas : vérifiez que l'application a l'autorisation d'utiliser la caméra (Réglages → Confidentialité → Caméra).">They can hear you but not see you: check that the app has permission to use the camera (Settings → Privacy → Camera).</li>
          <li data-en="Echo problem: one of you has speakers that are picking up the other's audio — use earbuds to fix this." data-fr="Problème d'écho : l'un de vous a des haut-parleurs qui captent l'audio de l'autre — utilisez des écouteurs pour résoudre ce problème.">Echo problem: one of you has speakers that are picking up the other's audio — use earbuds to fix this.</li>
        </ul>
      </div>"""
    },
    {
        "file": "ipad-battery-tips.html",
        "title": "How to Make Your iPad Battery Last Longer | Digital Confidence Centre",
        "desc": "Simple tips to extend your iPad's battery life and keep it healthy for longer — practical advice for Canadian seniors.",
        "headline": "How to Make Your iPad Battery Last Longer",
        "headline_fr": "Comment prolonger la durée de vie de la batterie de votre iPad",
        "byline": "By Two Birds Innovation · March 2026",
        "module": "module-4.html",
        "module_name": "Module 4: App Store Safety",
        "faq": [
            {"q": "Should I leave my iPad plugged in all the time?", "a": "Modern iPads are designed to handle staying plugged in — they stop charging at 100% and manage power intelligently. However, Apple recommends keeping the battery between 20% and 80% for long-term health. Enabling Optimised Battery Charging in Settings does this automatically."},
            {"q": "Why does my iPad battery drain so fast?", "a": "The biggest battery drains are: screen brightness (try auto-brightness), background app refresh, location services running constantly, and old batteries that have lost capacity. Check Settings → Battery to see which apps are using the most power."}
        ],
        "content": """
      <div class="geo-answer">
        <p data-en="A healthy iPad battery gives you all-day use without anxiety about charging. A few simple habits can significantly extend how long your battery lasts on a single charge — and how many years the battery stays healthy." data-fr="Une batterie iPad en bonne santé vous offre une utilisation toute la journée sans anxiété concernant la charge. Quelques habitudes simples peuvent prolonger significativement la durée de vie de votre batterie.">A healthy iPad battery gives you all-day use without anxiety about charging. A few simple habits can significantly extend how long your battery lasts on a single charge — and how many years the battery stays healthy.</p>

        <h2 data-en="Settings that save battery right now" data-fr="Paramètres qui économisent la batterie maintenant">Settings that save battery right now</h2>
        <ul class="content-list">
          <li data-en="Reduce screen brightness — this is the biggest battery drain. Swipe down from the top-right corner and drag the brightness slider down." data-fr="Réduisez la luminosité de l'écran — c'est la plus grande consommation de batterie. Faites glisser vers le bas depuis le coin supérieur droit et faites glisser le curseur de luminosité vers le bas.">Reduce screen brightness — this is the biggest battery drain. Swipe down from the top-right corner and drag the brightness slider down.</li>
          <li data-en="Turn on Auto-Brightness (Settings → Accessibility → Display &amp; Text Size → Auto-Brightness)." data-fr="Activez la luminosité automatique (Réglages → Accessibilité → Affichage et taille du texte → Luminosité automatique).">Turn on Auto-Brightness (Settings → Accessibility → Display &amp; Text Size → Auto-Brightness).</li>
          <li data-en="Turn off Wi-Fi and Bluetooth when you are not using them." data-fr="Désactivez le Wi-Fi et le Bluetooth lorsque vous ne les utilisez pas.">Turn off Wi-Fi and Bluetooth when you are not using them.</li>
          <li data-en="Enable Low Power Mode when the battery is below 30% (Settings → Battery → Low Power Mode)." data-fr="Activez le mode économie d'énergie lorsque la batterie est inférieure à 30 % (Réglages → Batterie → Mode économie d'énergie).">Enable Low Power Mode when the battery is below 30% (Settings → Battery → Low Power Mode).</li>
        </ul>

        <h2 data-en="Long-term battery health" data-fr="Santé à long terme de la batterie">Long-term battery health</h2>
        <ul class="content-list">
          <li data-en="Enable Optimised Battery Charging (Settings → Battery → Battery Health → Optimised Battery Charging). This learns your charging routine and slows charging above 80% to reduce battery aging." data-fr="Activez la charge de batterie optimisée (Réglages → Batterie → État de la batterie → Charge optimisée). Cela apprend votre routine de charge et ralentit la charge au-delà de 80 % pour réduire le vieillissement de la batterie.">Enable Optimised Battery Charging (Settings → Battery → Battery Health → Optimised Battery Charging). This learns your charging routine and slows charging above 80% to reduce battery aging.</li>
          <li data-en="Avoid exposing your iPad to extreme temperatures — very hot or very cold conditions damage the battery." data-fr="Évitez d'exposer votre iPad à des températures extrêmes — les conditions très chaudes ou très froides endommagent la batterie.">Avoid exposing your iPad to extreme temperatures — very hot or very cold conditions damage the battery.</li>
          <li data-en="Check your battery health: Settings → Battery → Battery Health. Below 80% means the battery may need replacing." data-fr="Vérifiez l'état de votre batterie : Réglages → Batterie → État de la batterie. En dessous de 80 %, la batterie peut nécessiter un remplacement.">Check your battery health: Settings → Battery → Battery Health. Below 80% means the battery may need replacing.</li>
        </ul>

        <div class="tip-block">
          <span class="tip-label" data-en="When to replace the battery" data-fr="Quand remplacer la batterie">When to replace the battery</span>
          <p data-en="If your iPad battery health is below 80%, or if your iPad shuts off unexpectedly even with charge remaining, it may be time to have the battery replaced. Apple Stores and authorised repair shops in Ontario can do this, often the same day." data-fr="Si la santé de la batterie de votre iPad est inférieure à 80 %, ou si votre iPad s'éteint de manière inattendue même avec de la charge restante, il peut être temps de faire remplacer la batterie.">If your iPad battery health is below 80%, or if your iPad shuts off unexpectedly even with charge remaining, it may be time to have the battery replaced. Apple Stores and authorised repair shops in Ontario can do this, often the same day.</p>
        </div>
      </div>"""
    },
    {
        "file": "spotting-fake-news.html",
        "title": "How to Spot Fake News Online: A Guide for Seniors | Digital Confidence Centre",
        "desc": "Misinformation spreads quickly on social media. Learn how to check if a news story is real before sharing it — practical tips for Canadian seniors.",
        "headline": "How to Spot Fake News Online: A Guide for Seniors",
        "headline_fr": "Comment repérer les fausses nouvelles en ligne : Un guide pour les aînés",
        "byline": "By Two Birds Innovation · March 2026",
        "module": "module-9.html",
        "module_name": "Module 9: Understanding AI",
        "faq": [
            {"q": "How do I know if a news story is real or fake?", "a": "Check if the story is covered by at least two major, well-known news outlets (CBC, Globe and Mail, Toronto Star). Look up the website's About page — fake news sites often have no clear ownership or contact information. Check the date — old stories are sometimes reshared to mislead."},
            {"q": "What is a reliable fact-checking website for Canadians?", "a": "MediaSmarts (mediasmarts.ca) is Canada's digital media literacy resource. PolitiFact and Snopes are well-established fact-checking sites. CBC Fact Check is a reliable Canadian source for checking political claims."}
        ],
        "content": """
      <div class="geo-answer">
        <p data-en="Misinformation — false or misleading news — spreads faster than ever on social media. Stories that trigger strong emotions (anger, fear, shock) are shared widely before anyone checks if they are true. Learning to pause and verify before sharing is one of the most important digital skills you can develop." data-fr="La désinformation — les fausses nouvelles ou les nouvelles trompeuses — se répand plus vite que jamais sur les réseaux sociaux. Apprendre à faire une pause et à vérifier avant de partager est l'une des compétences numériques les plus importantes que vous puissiez développer.">Misinformation — false or misleading news — spreads faster than ever on social media. Stories that trigger strong emotions (anger, fear, shock) are shared widely before anyone checks if they are true. Learning to pause and verify before sharing is one of the most important digital skills you can develop.</p>

        <h2 data-en="Warning signs of fake news" data-fr="Signes d'alerte des fausses nouvelles">Warning signs of fake news</h2>
        <ul class="content-list">
          <li data-en="The headline is shocking or designed to make you angry — real news is usually more measured." data-fr="Le titre est choquant ou conçu pour vous mettre en colère — les vraies nouvelles sont généralement plus mesurées.">The headline is shocking or designed to make you angry — real news is usually more measured.</li>
          <li data-en="The website name looks like a real news site but is slightly different (e.g., 'CBC-Canada.net' instead of 'cbc.ca')." data-fr="Le nom du site Web ressemble à un vrai site d'information mais est légèrement différent (par exemple, 'CBC-Canada.net' au lieu de 'cbc.ca').">The website name looks like a real news site but is slightly different (e.g., 'CBC-Canada.net' instead of 'cbc.ca').</li>
          <li data-en="The story only appears on one website — real news is covered by multiple outlets." data-fr="L'histoire n'apparaît que sur un seul site Web — les vraies nouvelles sont couvertes par plusieurs sources.">The story only appears on one website — real news is covered by multiple outlets.</li>
          <li data-en="There is no author named, or no date on the article." data-fr="Aucun auteur n'est nommé, ou il n'y a pas de date sur l'article.">There is no author named, or no date on the article.</li>
        </ul>

        <h2 data-en="How to verify before you share" data-fr="Comment vérifier avant de partager">How to verify before you share</h2>
        <ul class="content-list">
          <li data-en="Search the headline on Google — if it is real news, major outlets will have covered it." data-fr="Cherchez le titre sur Google — si c'est une vraie nouvelle, les grands médias l'auront couverte.">Search the headline on Google — if it is real news, major outlets will have covered it.</li>
          <li data-en="Check the date — is this a current story or an old one being recirculated?" data-fr="Vérifiez la date — est-ce une histoire actuelle ou une ancienne qui est recirculée ?">Check the date — is this a current story or an old one being recirculated?</li>
          <li data-en="Go to the CBC News website directly (cbc.ca/news) and search for the story." data-fr="Allez directement sur le site Web de CBC News (cbc.ca/news) et recherchez l'histoire.">Go to the CBC News website directly (cbc.ca/news) and search for the story.</li>
          <li data-en="If in doubt, don't share it — there is no harm in waiting to verify." data-fr="En cas de doute, ne le partagez pas — il n'y a aucun mal à attendre de vérifier.">If in doubt, don't share it — there is no harm in waiting to verify.</li>
        </ul>

        <div class="tip-block">
          <span class="tip-label" data-en="The SIFT method" data-fr="La méthode SIFT">The SIFT method</span>
          <p data-en="Stop — Ask yourself if you have a strong reaction. Investigate the source — who made this claim? Find better coverage — look for the same story from trusted outlets. Trace claims to their original context." data-fr="Arrêtez — Demandez-vous si vous avez une forte réaction. Enquêtez sur la source — qui a fait cette affirmation ? Trouvez une meilleure couverture — cherchez la même histoire dans des sources fiables.">Stop — Ask yourself if you have a strong reaction. Investigate the source — who made this claim? Find better coverage — look for the same story from trusted outlets. Trace claims to their original context.</p>
        </div>
      </div>"""
    },
    {
        "file": "digital-photo-organizing.html",
        "title": "How to Organise Your Digital Photos: A Simple Guide for Seniors | Digital Confidence Centre",
        "desc": "Thousands of photos on your iPhone? Learn how to organise your digital memories with albums, iCloud, and simple backup tips for Canadian seniors.",
        "headline": "How to Organise Your Digital Photos: A Simple Guide for Seniors",
        "headline_fr": "Comment organiser vos photos numériques : Un guide simple pour les aînés",
        "byline": "By Two Birds Innovation · March 2026",
        "module": "module-7.html",
        "module_name": "Module 7: Photos & Memories",
        "faq": [
            {"q": "How do I organise photos on my iPhone?", "a": "Open the Photos app and tap Albums at the bottom. Tap the + button to create a new album — name it by year, event, or family member. You can add any photos from your camera roll to an album without moving them — the original stays in your camera roll."},
            {"q": "How do I share a whole album of photos with my family?", "a": "In the Photos app, tap an album, then tap the share button (box with arrow). You can share via iCloud Shared Album (requires family members to have Apple devices), AirDrop, or email. iCloud Shared Albums let family members add their own photos to a shared collection."}
        ],
        "content": """
      <div class="geo-answer">
        <p data-en="Most iPhone and iPad users have thousands of photos stored on their device — and finding the right one can feel overwhelming. A few simple organisation habits, built up over time, will help you find photos quickly and share your memories with family." data-fr="La plupart des utilisateurs d'iPhone et d'iPad ont des milliers de photos stockées sur leur appareil. Quelques habitudes d'organisation simples vous aideront à trouver des photos rapidement et à partager vos souvenirs avec votre famille.">Most iPhone and iPad users have thousands of photos stored on their device — and finding the right one can feel overwhelming. A few simple organisation habits, built up over time, will help you find photos quickly and share your memories with family.</p>

        <h2 data-en="Creating albums on your iPhone" data-fr="Créer des albums sur votre iPhone">Creating albums on your iPhone</h2>
        <ul class="content-list">
          <li data-en="Open the Photos app and tap 'Albums' at the bottom of the screen." data-fr="Ouvrez l'application Photos et appuyez sur 'Albums' en bas de l'écran.">Open the Photos app and tap 'Albums' at the bottom of the screen.</li>
          <li data-en="Tap the + button in the top left to create a new album. Name it by event, year, or family member (e.g. 'Christmas 2025', 'Grandchildren')." data-fr="Appuyez sur le bouton + en haut à gauche pour créer un nouvel album. Nommez-le par événement, année ou membre de la famille.">Tap the + button in the top left to create a new album. Name it by event, year, or family member (e.g. 'Christmas 2025', 'Grandchildren').</li>
          <li data-en="Select the photos you want in that album and tap Done." data-fr="Sélectionnez les photos que vous souhaitez dans cet album et appuyez sur Terminé.">Select the photos you want in that album and tap Done.</li>
          <li data-en="Photos in albums are copies of the originals — deleting from an album does not delete the original photo." data-fr="Les photos dans les albums sont des copies des originaux — la suppression d'un album ne supprime pas la photo originale.">Photos in albums are copies of the originals — deleting from an album does not delete the original photo.</li>
        </ul>

        <h2 data-en="Sharing photos with your family" data-fr="Partager des photos avec votre famille">Sharing photos with your family</h2>
        <ul class="content-list">
          <li data-en="Select photos in the Photos app, tap the Share button (box with arrow), and choose how to send — Messages, Email, or AirDrop." data-fr="Sélectionnez des photos dans l'application Photos, appuyez sur le bouton Partager (boîte avec flèche) et choisissez comment envoyer.">Select photos in the Photos app, tap the Share button (box with arrow), and choose how to send — Messages, Email, or AirDrop.</li>
          <li data-en="Create an iCloud Shared Album that family members can view and add to — perfect for family events." data-fr="Créez un album partagé iCloud que les membres de la famille peuvent voir et auxquels ils peuvent ajouter — parfait pour les événements familiaux.">Create an iCloud Shared Album that family members can view and add to — perfect for family events.</li>
        </ul>

        <h2 data-en="Making sure photos are backed up" data-fr="S'assurer que les photos sont sauvegardées">Making sure photos are backed up</h2>
        <ul class="content-list">
          <li data-en="Turn on iCloud Photos (Settings → Your Name → iCloud → Photos → Sync this iPhone). All photos are backed up automatically." data-fr="Activez les photos iCloud (Réglages → Votre nom → iCloud → Photos → Synchroniser cet iPhone). Toutes les photos sont sauvegardées automatiquement.">Turn on iCloud Photos (Settings → Your Name → iCloud → Photos → Sync this iPhone). All photos are backed up automatically.</li>
          <li data-en="If storage is tight, consider upgrading your iCloud plan ($1.29/month for 50GB in Canada)." data-fr="Si le stockage est limité, envisagez de mettre à niveau votre plan iCloud (1,29 $/mois pour 50 Go au Canada).">If storage is tight, consider upgrading your iCloud plan ($1.29/month for 50GB in Canada).</li>
        </ul>
      </div>"""
    },
    {
        "file": "safe-email-habits.html",
        "title": "10 Safe Email Habits Every Senior Should Have | Digital Confidence Centre",
        "desc": "Simple daily email habits that protect you from phishing, malware, and scams — practical tips for Canadian seniors to stay safe in their inbox.",
        "headline": "10 Safe Email Habits Every Senior Should Have",
        "headline_fr": "10 habitudes de courriel sécuritaires que chaque aîné devrait avoir",
        "byline": "By Two Birds Innovation · March 2026",
        "module": "module-5.html",
        "module_name": "Module 5: Email & Messages",
        "faq": [
            {"q": "What is the single most important email safety habit?", "a": "Never click a link in an email to log in to any account. Always open your browser and type the website address yourself. This one habit stops almost all phishing attacks."},
            {"q": "How do I know if an attachment in an email is safe to open?", "a": "Only open attachments from people you were expecting to hear from. If you receive an attachment from someone you know but were not expecting it, call them directly to confirm they sent it before opening. Never open .exe, .zip, or .dmg attachments from strangers."}
        ],
        "content": """
      <div class="geo-answer">
        <p data-en="Email is one of the most common ways criminals try to access your accounts and steal your money. But with a few consistent habits, your inbox can be a safe place. Here are 10 habits that make a real difference." data-fr="Le courriel est l'un des moyens les plus courants que les criminels utilisent pour accéder à vos comptes et voler votre argent. Mais avec quelques habitudes cohérentes, votre boîte de réception peut être un endroit sûr.">Email is one of the most common ways criminals try to access your accounts and steal your money. But with a few consistent habits, your inbox can be a real safe place. Here are 10 habits that make a real difference.</p>

        <ul class="content-list">
          <li data-en="1. Never click a link in an email to log in to a bank, store, or government site — type the address yourself." data-fr="1. Ne cliquez jamais sur un lien dans un courriel pour vous connecter à une banque, un magasin ou un site gouvernemental — tapez vous-même l'adresse.">1. Never click a link in an email to log in to a bank, store, or government site — type the address yourself.</li>
          <li data-en="2. Check the sender's full email address, not just the name — 'Royal Bank' displayed over 'support@royalbank-secure.net' is a scam." data-fr="2. Vérifiez l'adresse courriel complète de l'expéditeur, pas seulement le nom.">2. Check the sender's full email address, not just the name — 'Royal Bank' displayed over 'support@royalbank-secure.net' is a scam.</li>
          <li data-en="3. Never open an unexpected attachment, even from people you know — call them first to confirm." data-fr="3. N'ouvrez jamais une pièce jointe inattendue, même de personnes que vous connaissez — appelez-les d'abord pour confirmer.">3. Never open an unexpected attachment, even from people you know — call them first to confirm.</li>
          <li data-en="4. Delete emails that create urgency or fear without reading them carefully first." data-fr="4. Supprimez les courriels qui créent l'urgence ou la peur sans les lire attentivement d'abord.">4. Delete emails that create urgency or fear without reading them carefully first.</li>
          <li data-en="5. Report junk mail — in Apple Mail, press and hold on the email and select Report Junk. This trains the filter." data-fr="5. Signalez les courriels indésirables — dans Apple Mail, appuyez et maintenez enfoncé sur le courriel et sélectionnez Signaler comme indésirable.">5. Report junk mail — in Apple Mail, press and hold on the email and select Report Junk. This trains the filter.</li>
          <li data-en="6. Use a strong, unique password for your email account — it is the key to everything else." data-fr="6. Utilisez un mot de passe fort et unique pour votre compte courriel — c'est la clé de tout le reste.">6. Use a strong, unique password for your email account — it is the key to everything else.</li>
          <li data-en="7. Turn on two-factor authentication for your email — this stops criminals even if they get your password." data-fr="7. Activez l'authentification à deux facteurs pour votre courriel — cela arrête les criminels même s'ils obtiennent votre mot de passe.">7. Turn on two-factor authentication for your email — this stops criminals even if they get your password.</li>
          <li data-en="8. Do not unsubscribe from spam by clicking links inside the email — just delete it. Unsubscribing can confirm your address is active." data-fr="8. Ne vous désabonnez pas du spam en cliquant sur des liens dans le courriel — supprimez-le simplement.">8. Do not unsubscribe from spam by clicking links inside the email — just delete it. Unsubscribing can confirm your address is active.</li>
          <li data-en="9. Never email passwords, credit card numbers, or SIN numbers — email is not fully secure." data-fr="9. N'envoyez jamais par courriel des mots de passe, des numéros de carte de crédit ou des numéros d'assurance sociale — le courriel n'est pas entièrement sécurisé.">9. Never email passwords, credit card numbers, or SIN numbers — email is not fully secure.</li>
          <li data-en="10. If you receive an email that worries you, call the organisation directly using the number on their official website — not any number in the email." data-fr="10. Si vous recevez un courriel qui vous inquiète, appelez l'organisation directement en utilisant le numéro sur son site Web officiel — pas tout numéro dans le courriel.">10. If you receive an email that worries you, call the organisation directly using the number on their official website — not any number in the email.</li>
        </ul>
      </div>"""
    },
    {
        "file": "talking-to-ai.html",
        "title": "How to Talk to AI: A Plain-Language Guide for Seniors | Digital Confidence Centre",
        "desc": "AI assistants like Siri, ChatGPT, and Gemini can be helpful — when you know how to use them well. A practical guide for Canadian seniors.",
        "headline": "How to Talk to AI: A Plain-Language Guide for Seniors",
        "headline_fr": "Comment parler à l'IA : Un guide en langage simple pour les aînés",
        "byline": "By Two Birds Innovation · March 2026",
        "module": "module-9.html",
        "module_name": "Module 9: Understanding AI",
        "faq": [
            {"q": "What can I use an AI assistant for?", "a": "AI assistants are helpful for getting quick answers to general questions, writing help (drafting a letter or email), understanding complex topics in plain language, recipe ideas, translation, and summarising long documents. They are not reliable for medical diagnoses, legal advice, financial decisions, or current news."},
            {"q": "Is it safe to tell an AI assistant personal things about myself?", "a": "Treat AI conversations like a postcard — assume your words may be reviewed or stored by the company. Never share your SIN, passwords, banking details, or full health information. General conversation about daily life is fine."}
        ],
        "content": """
      <div class="geo-answer">
        <p data-en="AI assistants — like Siri on your iPhone, ChatGPT online, or Google's Gemini — can answer questions, help you write letters, and explain complex things in plain language. Knowing how to get the most out of them (and what to be cautious about) is a valuable skill." data-fr="Les assistants IA — comme Siri sur votre iPhone, ChatGPT en ligne ou Gemini de Google — peuvent répondre à des questions, vous aider à rédiger des lettres et expliquer des choses complexes en langage simple.">AI assistants — like Siri on your iPhone, ChatGPT online, or Google's Gemini — can answer questions, help you write letters, and explain complex things in plain language. Knowing how to get the most out of them (and what to be cautious about) is a valuable skill.</p>

        <h2 data-en="Great uses for AI assistants" data-fr="Excellentes utilisations des assistants IA">Great uses for AI assistants</h2>
        <ul class="content-list">
          <li data-en="Ask it to explain something in plain language: 'What is a mortgage in simple words?'" data-fr="Demandez-lui d'expliquer quelque chose en langage simple : 'Qu'est-ce qu'une hypothèque en termes simples ?'">Ask it to explain something in plain language: 'What is a mortgage in simple words?'</li>
          <li data-en="Help with writing: 'Help me write a thank-you note to my neighbour for bringing me soup when I was sick.'" data-fr="Aide à la rédaction : 'Aide-moi à écrire une note de remerciement à mon voisin pour m'avoir apporté de la soupe quand j'étais malade.'">Help with writing: 'Help me write a thank-you note to my neighbour for bringing me soup when I was sick.'</li>
          <li data-en="Recipe ideas: 'What can I make for dinner with chicken, potatoes, and carrots?'" data-fr="Idées de recettes : 'Que puis-je faire pour le dîner avec du poulet, des pommes de terre et des carottes ?'">Recipe ideas: 'What can I make for dinner with chicken, potatoes, and carrots?'</li>
          <li data-en="Summaries: 'Here is a long letter from my insurance company. Can you explain what it means in plain language?'" data-fr="Résumés : 'Voici une longue lettre de ma compagnie d'assurance. Pouvez-vous expliquer ce que cela signifie en langage simple ?'">Summaries: 'Here is a long letter from my insurance company. Can you explain what it means in plain language?'</li>
        </ul>

        <h2 data-en="What to be cautious about" data-fr="Ce dont il faut se méfier">What to be cautious about</h2>
        <ul class="content-list">
          <li data-en="AI can be confidently wrong — always verify important information from an authoritative source." data-fr="L'IA peut se tromper avec confiance — vérifiez toujours les informations importantes auprès d'une source faisant autorité.">AI can be confidently wrong — always verify important information from an authoritative source.</li>
          <li data-en="Never share personal information: SIN, banking details, passwords, or detailed health information." data-fr="Ne partagez jamais d'informations personnelles : NAS, coordonnées bancaires, mots de passe ou informations de santé détaillées.">Never share personal information: SIN, banking details, passwords, or detailed health information.</li>
          <li data-en="AI does not know today's news unless told — its knowledge has a cutoff date." data-fr="L'IA ne connaît pas les nouvelles d'aujourd'hui à moins qu'on ne lui dise — ses connaissances ont une date limite.">AI does not know today's news unless told — its knowledge has a cutoff date.</li>
          <li data-en="Do not use AI for medical, legal, or financial decisions — these need qualified professionals." data-fr="N'utilisez pas l'IA pour des décisions médicales, juridiques ou financières — celles-ci nécessitent des professionnels qualifiés.">Do not use AI for medical, legal, or financial decisions — these need qualified professionals.</li>
        </ul>

        <div class="tip-block">
          <span class="tip-label" data-en="Siri is your easiest starting point" data-fr="Siri est votre point de départ le plus simple">Siri is your easiest starting point</span>
          <p data-en="If you have never used an AI assistant, start with Siri — it is already on your iPhone or iPad. Just say 'Hey Siri' and ask a question. It is free, private, and designed for everyday use." data-fr="Si vous n'avez jamais utilisé d'assistant IA, commencez par Siri — il est déjà sur votre iPhone ou iPad. Dites simplement 'Dis Siri' et posez une question. C'est gratuit, privé et conçu pour une utilisation quotidienne.">If you have never used an AI assistant, start with Siri — it is already on your iPhone or iPad. Just say 'Hey Siri' and ask a question. It is free, private, and designed for everyday use.</p>
        </div>
      </div>"""
    },
    {
        "file": "password-manager-setup.html",
        "title": "How to Set Up Apple's Password Manager: A Step-by-Step Guide | Digital Confidence Centre",
        "desc": "Apple's built-in password manager remembers all your passwords securely — no extra app needed. A simple setup guide for Canadian seniors.",
        "headline": "How to Set Up Apple's Password Manager: A Step-by-Step Guide",
        "headline_fr": "Comment configurer le gestionnaire de mots de passe d'Apple : Un guide étape par étape",
        "byline": "By Two Birds Innovation · March 2026",
        "module": "module-3.html",
        "module_name": "Module 3: Passwords & Biometrics",
        "faq": [
            {"q": "Is Apple's Password Manager safe?", "a": "Yes — Apple's Password Manager (also called iCloud Keychain) is very safe. Passwords are encrypted and stored on Apple's secure servers. They are never shared with Apple or anyone else. It uses the same security as your iPhone's Face ID or Touch ID."},
            {"q": "What if I forget my iPhone passcode — will I lose all my passwords?", "a": "Your passwords are backed up in iCloud, linked to your Apple ID. As long as you remember your Apple ID email and password, you can recover access to your saved passwords on any Apple device."}
        ],
        "content": """
      <div class="geo-answer">
        <p data-en="You do not need to remember dozens of passwords — and you should not try. Apple's built-in password manager (called iCloud Keychain) stores all your passwords securely on your iPhone or iPad, so you only need to remember one thing: your Face ID or your iPhone passcode." data-fr="Vous n'avez pas besoin de mémoriser des dizaines de mots de passe. Le gestionnaire de mots de passe intégré d'Apple (appelé iCloud Keychain) stocke tous vos mots de passe en toute sécurité sur votre iPhone ou iPad.">You do not need to remember dozens of passwords — and you should not try. Apple's built-in password manager (called iCloud Keychain) stores all your passwords securely on your iPhone or iPad, so you only need to remember one thing: your Face ID or your iPhone passcode.</p>

        <h2 data-en="How to turn it on" data-fr="Comment l'activer">How to turn it on</h2>
        <ul class="content-list">
          <li data-en="Open Settings (grey gear icon) on your iPhone or iPad." data-fr="Ouvrez Réglages (icône d'engrenage gris) sur votre iPhone ou iPad.">Open Settings (grey gear icon) on your iPhone or iPad.</li>
          <li data-en="Tap your name at the top, then tap iCloud." data-fr="Appuyez sur votre nom en haut, puis sur iCloud.">Tap your name at the top, then tap iCloud.</li>
          <li data-en="Scroll down and tap 'Passwords and Keychain' — turn it on." data-fr="Faites défiler vers le bas et appuyez sur 'Mots de passe et Keychain' — activez-le.">Scroll down and tap 'Passwords and Keychain' — turn it on.</li>
          <li data-en="Now whenever you create a new password on a website, Apple will offer to save it for you. Tap 'Save Password'." data-fr="Maintenant, chaque fois que vous créez un nouveau mot de passe sur un site Web, Apple vous proposera de le sauvegarder. Appuyez sur 'Enregistrer le mot de passe'.">Now whenever you create a new password on a website, Apple will offer to save it for you. Tap 'Save Password'.</li>
        </ul>

        <h2 data-en="How to view your saved passwords" data-fr="Comment voir vos mots de passe sauvegardés">How to view your saved passwords</h2>
        <ul class="content-list">
          <li data-en="Go to Settings → Passwords. You will need your Face ID or passcode to open this." data-fr="Allez dans Réglages → Mots de passe. Vous aurez besoin de votre Face ID ou code d'accès pour ouvrir cela.">Go to Settings → Passwords. You will need your Face ID or passcode to open this.</li>
          <li data-en="Search for any website to find your saved password for it." data-fr="Recherchez n'importe quel site Web pour trouver votre mot de passe sauvegardé pour celui-ci.">Search for any website to find your saved password for it.</li>
          <li data-en="If Apple marks a password with a yellow triangle warning, it means it has been seen in a data breach — change that password immediately." data-fr="Si Apple marque un mot de passe avec un avertissement de triangle jaune, cela signifie qu'il a été vu dans une violation de données — changez immédiatement ce mot de passe.">If Apple marks a password with a yellow triangle warning, it means it has been seen in a data breach — change that password immediately.</li>
        </ul>

        <h2 data-en="How Apple fills in passwords automatically" data-fr="Comment Apple remplit automatiquement les mots de passe">How Apple fills in passwords automatically</h2>
        <ul class="content-list">
          <li data-en="When you visit a website or open an app where you have a saved password, a suggestion will appear above the keyboard — tap it to fill in your login automatically." data-fr="Lorsque vous visitez un site Web ou ouvrez une application où vous avez un mot de passe sauvegardé, une suggestion apparaîtra au-dessus du clavier — appuyez dessus pour remplir automatiquement votre connexion.">When you visit a website or open an app where you have a saved password, a suggestion will appear above the keyboard — tap it to fill in your login automatically.</li>
          <li data-en="This works in Safari and in most iPhone and iPad apps." data-fr="Cela fonctionne dans Safari et dans la plupart des applications iPhone et iPad.">This works in Safari and in most iPhone and iPad apps.</li>
        </ul>

        <div class="tip-block">
          <span class="tip-label" data-en="Strong password suggestions" data-fr="Suggestions de mots de passe forts">Strong password suggestions</span>
          <p data-en="When creating a new account on any website, Apple will suggest a strong password automatically — a long, random string that is unique to that site. Accept the suggestion and let Apple remember it. You will never have to type it again." data-fr="Lors de la création d'un nouveau compte sur n'importe quel site Web, Apple suggérera automatiquement un mot de passe fort. Acceptez la suggestion et laissez Apple s'en souvenir. Vous n'aurez plus jamais à le taper.">When creating a new account on any website, Apple will suggest a strong password automatically — a long, random string that is unique to that site. Accept the suggestion and let Apple remember it. You will never have to type it again.</p>
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
  <link rel="canonical" href="https://twobirds-kramerica.github.io/digital-confidence/tips/{file}">
  <title>{title}</title>
  <link rel="stylesheet" href="../css/main.css">
  <link rel="stylesheet" href="../css/accessibility.css">
  <link rel="icon" type="image/svg+xml" href="../favicon.svg">
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "{headline}",
    "description": "{desc}",
    "url": "https://twobirds-kramerica.github.io/digital-confidence/tips/{file}",
    "author": {{"@type": "Organization", "name": "Two Birds Innovation"}},
    "publisher": {{"@type": "Organization", "name": "Digital Confidence Centre"}},
    "datePublished": "March 2026", "dateModified": "March 2026", "inLanguage": "en-CA"
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
        <a href="../index.html" data-en="Home" data-fr="Accueil">Home</a> ›
        <a href="index.html" data-en="Tips &amp; Updates" data-fr="Conseils et mises à jour">Tips &amp; Updates</a> ›
        <span data-en="{headline}" data-fr="{headline_fr}">{headline}</span>
      </nav>

      <h1 data-en="{headline}" data-fr="{headline_fr}">{headline}</h1>
      <p class="module-byline" data-en="{byline}" data-fr="{byline}">{byline}</p>

{content}

      <div class="confidence-check-box" style="margin-top:2rem">
        <strong data-en="Want to learn more?" data-fr="Vous voulez en savoir plus ?">Want to learn more?</strong><br>
        <span data-en="{module_name} goes deeper on this topic." data-fr="{module_name} approfondit ce sujet.">{module_name} goes deeper on this topic.</span>
        <br><a href="../{module}" class="btn btn-primary" style="margin-top:0.75rem;display:inline-block" data-en="Go to module →" data-fr="Aller au module →">Go to module →</a>
        &nbsp;
        <a href="index.html" class="btn btn-secondary" style="margin-top:0.75rem;display:inline-block" data-en="All Tips →" data-fr="Tous les conseils →">All Tips →</a>
      </div>

    </main>
  </div>
  <script src="../js/lang-toggle.js" defer></script>
  <script src="../js/offline-banner.js" defer></script>
</body>
</html>
'''

created = []
skipped = []

for tip in TIPS:
    filepath = os.path.join(BASE, tip['file'])
    if os.path.exists(filepath):
        skipped.append(tip['file'])
        continue

    # Build FAQ JSON
    faq_items = []
    for faq in tip['faq']:
        q = faq['q'].replace('"', '\\"')
        a = faq['a'].replace('"', '\\"')
        faq_items.append(f'{{"@type":"Question","name":"{q}","acceptedAnswer":{{"@type":"Answer","text":"{a}"}}}}')
    faq_json = ',\n      '.join(faq_items)

    html = TEMPLATE.format(
        file=tip['file'],
        title=tip['title'],
        desc=tip['desc'],
        headline=tip['headline'],
        headline_fr=tip['headline_fr'],
        byline=tip['byline'],
        module=tip['module'],
        module_name=tip['module_name'],
        faq_json=faq_json,
        content=tip['content'],
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)
    created.append(tip['file'])
    print(f"Created: {tip['file']}")

print(f"\nDone. Created: {len(created)}, Skipped: {len(skipped)}")
