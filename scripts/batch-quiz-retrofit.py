"""Batch-retrofit DCC modules with before/after quiz containers."""
import os

MODS = [
    ('module-21-mobile-plan', 'module-21-mobile-plan', [
        ('Long-term customers often pay more for mobile plans because', 'Long-term mobile customers often pay more because', ['They use more data', 'Carriers save promotional pricing for new customers and do not automatically lower existing bills', 'Their phones are older', 'They have better coverage'], 1),
        ('Roaming charges occur when', 'Roaming charges happen when', ['You use your phone at home during peak hours', 'You use your phone outside your carrier s coverage area especially internationally', 'You use too much data in one month', 'You call numbers in other provinces'], 1),
        ('To avoid unexpected roaming charges when travelling internationally you should', 'To avoid international roaming charges you should', ['Turn off data roaming in settings or get a travel add-on before you leave', 'Only make calls not use data', 'Switch to a new carrier when you land', 'Only use your phone on Wi-Fi and disable calls'], 0),
        ('Budget mobile carriers often offer lower prices because', 'Budget mobile carriers offer lower prices because', ['Their coverage is always worse than the big three', 'They operate on the same networks as major carriers but with less overhead and marketing', 'They do not comply with CRTC regulations', 'They limit calls to local numbers only'], 1),
        ('Number porting means', 'Number porting means', ['Getting a new phone number when you switch carriers', 'Keeping your existing phone number when switching to a new carrier', 'Transferring contacts to a new phone', 'Forwarding calls from one number to another'], 1),
    ]),
    ('module-22-tv-home-phone', 'module-22-tv-home-phone', [
        ('The CRTC skinny basic cable package in Canada must include', 'The CRTC skinny basic cable package must include', ['All major US networks and sports channels', 'A minimum set of Canadian channels at a regulated maximum price', 'Only local channels', 'Unlimited internet bundled with TV'], 1),
        ('If you want to cancel a bundled TV internet and phone package you should', 'To cancel a bundled TV internet and phone package you should', ['Just stop paying and they will cancel it automatically', 'Call the retention line ask for the cancellation department and get confirmation in writing', 'Only cancel TV keep internet and phone', 'Wait until the contract ends even if you are unhappy'], 1),
        ('Free streaming services like CBC Gem and CTV are', 'Free streaming services like CBC Gem and CTV are', ['Only available with a cable subscription', 'Available free online with no subscription required', 'Only for people under 65', 'Blocked outside Ontario'], 1),
        ('The bundle trap refers to', 'The bundle trap refers to', ['Paying for faster internet than you need', 'Being locked into a high combined bill for multiple services that would cost less separately', 'Getting too many streaming services', 'Having a long TV antenna cable'], 1),
        ('Your internet and TV promotional rate will usually increase after', 'Promotional rates for internet and TV usually increase after', ['5 years', '6 months', '12 to 24 months depending on your contract', 'Never they are permanent rates'], 2),
    ]),
    ('module-23-online-marketplace', 'module-23-online-marketplace', [
        ('The safest way to complete a transaction from Facebook Marketplace is', 'The safest way to complete a Facebook Marketplace transaction is', ['Transfer money via e-transfer before meeting', 'Meet in a public place during daylight hours and pay cash on pickup', 'Share your home address and have them pick up', 'Use the seller s preferred payment app'], 1),
        ('If an online marketplace deal seems too good to be true it usually means', 'If a marketplace deal seems too good to be true it usually means', ['You found a great deal and should act fast before it is gone', 'It may be a scam or the item may not exist', 'The seller is in a hurry and will accept less', 'The item was donated and is legitimately free'], 1),
        ('Before selling an old phone or computer online you should', 'Before selling an old phone or computer online you should', ['Just wipe the screen and hand it over', 'Factory reset it to remove all personal data accounts and photos first', 'Remove only your email app', 'Keep your photos saved on the device so the buyer can see it worked'], 1),
        ('Safe exchange zones for marketplace pickup are', 'Safe exchange zones for marketplace pickup are', ['Private locations that only sellers know about', 'Publicly marked areas often at police stations or community centres designed for safe transactions', 'Locations where you can leave items for pickup without meeting', 'Only for high-value items over 500 dollars'], 1),
        ('When buying from an online marketplace you should', 'When buying from an online marketplace you should', ['Never ask questions trust the listing photos', 'Read reviews check the seller s rating and ask to see the item in person or via video', 'Always pay before seeing the item to secure it', 'Only buy from verified businesses never individuals'], 1),
    ]),
    ('module-24-communication', 'module-24-communication', [
        ('WhatsApp differs from regular SMS texting because', 'WhatsApp differs from regular SMS texting because', ['It only works on iPhones', 'It sends messages over the internet and works across iPhone and Android without SMS charges', 'It costs extra per message', 'It requires a landline connection'], 1),
        ('Voice notes on apps like WhatsApp are useful because', 'Voice notes on messaging apps are useful because', ['They are cheaper than regular calls', 'They let you send a spoken message without needing to type which is easier for many seniors', 'They are stored forever in the cloud', 'They use less battery than text messages'], 1),
        ('Group chats can become overwhelming when', 'Group chats become overwhelming when', ['More than two people are in the group', 'Many people send frequent messages and you receive constant notifications', 'You use them on a phone rather than a computer', 'You have not checked them for a day'], 1),
        ('The Do Not Disturb feature on a smartphone', 'The Do Not Disturb feature on a smartphone', ['Turns off all phone functions including emergencies', 'Silences notifications and calls during set quiet hours while allowing emergency calls through', 'Deletes incoming messages automatically', 'Reduces your data usage'], 1),
        ('Digital communication etiquette includes', 'Good digital communication etiquette includes', ['Replying to every message within 5 minutes or being considered rude', 'Responding when you are ready and letting others know if you will be slow to reply', 'Never using emoji in messages to family', 'Only messaging during business hours'], 1),
    ]),
]

base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

for (mod, modId, qs) in MODS:
    path = os.path.join(base, mod + '.html')
    if not os.path.exists(path):
        print(mod + ': FILE NOT FOUND -- skipping')
        continue
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    if 'dcc-before-quiz' in c:
        print(mod + ': already has quiz -- skipping')
        continue
    c = c.replace('href="css/print.css">', 'href="css/print.css">\n  <link rel="stylesheet" href="css/quiz-check.css">', 1)
    h1e = c.find('</h1>') + 5
    c = c[:h1e] + '\n      <div class="dcc-quiz-container" id="dcc-before-quiz" style="margin-bottom:1.5rem"></div>' + c[h1e:]
    c = c.replace('    </main>', '\n      <div class="dcc-quiz-container" id="dcc-after-quiz" style="margin:2rem 0"></div>\n    </main>', 1)
    def q_js(q):
        return '{text:' + repr(q[0]) + ',text_after:' + repr(q[1]) + ',options:[' + ', '.join(repr(o) for o in q[2]) + '],correct:' + str(q[3]) + '}'
    qs_js = ', '.join(q_js(q) for q in qs)
    script = ('  <script src="js/quiz-check.js" defer></script>\n  <script>\n'
              "  document.addEventListener('DOMContentLoaded',function(){var Q=[" + qs_js + "];"
              "if(window.DCC_QUIZ){DCC_QUIZ.init({moduleId:" + repr(modId) + ",questions:Q,"
              "beforeContainerId:'dcc-before-quiz',afterContainerId:'dcc-after-quiz'});}"
              "});\n  </script>")
    c = c.replace('  <script src="js/read-aloud.js" defer></script>', script + '\n  <script src="js/read-aloud.js" defer></script>', 1)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)
    print(mod + ': OK')

print('Batch done.')
