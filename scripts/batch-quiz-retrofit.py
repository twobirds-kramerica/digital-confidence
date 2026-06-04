"""Batch-retrofit DCC modules with before/after quiz containers and DCC_QUIZ.init calls.
   Update MODS list below and re-run for each batch.
"""
import os

MODS = [
    ('module-16-travel-safety', 'module-16-travel-safety', [
        ('When using hotel or airport Wi-Fi you should avoid', 'When using hotel or airport Wi-Fi you should avoid', ['Checking the weather', 'Online banking or entering passwords', 'Reading news websites', 'Watching videos'], 1),
        ('Offline maps are useful when travelling because', 'Offline maps are useful when travelling because', ['They are always more accurate than online maps', 'They work without internet access so no roaming charges', 'They update faster than Google Maps', 'They are required by Canadian law when driving abroad'], 1),
        ('If your phone is stolen abroad the first thing to do is', 'If your phone is stolen abroad the first step is', ['Post about it on social media', 'Contact your bank and carrier to lock the device and protect your accounts', 'Wait until you get home to report it', 'Buy a new phone at a local store'], 1),
        ('Travel insurance that covers your electronics is', 'Travel insurance covering your electronics is', ['Always included with your credit card automatically', 'Worth checking before you travel as coverage varies', 'Never worth purchasing it will not pay out', 'Only needed for international travel not within Canada'], 1),
        ('A digital boarding pass on your phone is', 'A digital boarding pass on your phone is', ['Not accepted at most Canadian airports', 'Accepted at most airports and backed up by your email confirmation', 'Less secure than a paper pass', 'Only valid if your phone battery is above 50 percent'], 1),
    ]),
    ('module-18-staying-connected', 'module-18-staying-connected', [
        ('To stay connected with family who live far away a good free option is', 'To stay connected with distant family a good free option is', ['Sending physical letters', 'Video calling via FaceTime WhatsApp or Google Meet', 'Calling on your landline only', 'Using fax'], 1),
        ('Scheduled weekly calls with family help seniors because', 'Scheduled regular calls with family help because', ['They reduce your phone bill', 'They provide predictable social connection which reduces isolation', 'They are required by some community programs', 'They help you remember how to use your phone'], 1),
        ('Connected Canadians provides free technology support for seniors', 'Connected Canadians provides', ['Discounted phone plans for seniors', 'Free volunteer technology help for Canadian seniors', 'Government-funded internet access', 'Hardware donations for low-income seniors'], 1),
        ('If a family member in a different time zone wants to video call you should', 'A family member in a different time zone wants to call. You should', ['Refuse calls outside business hours', 'Agree on a regular scheduled time that works for both time zones', 'Only call when you feel like it with no schedule', 'Ask them to move closer'], 1),
        ('Grief support groups online can help because', 'Online grief support groups can help because', ['They replace professional counselling entirely', 'They connect you with others who understand your experience without leaving home', 'They are only for people who recently lost someone', 'They require a paid subscription to access'], 1),
    ]),
    ('module-19-digital-legacy', 'module-19-digital-legacy', [
        ('A digital legacy refers to', 'A digital legacy refers to', ['Money stored in online bank accounts only', 'All online accounts passwords and digital assets you leave behind when you pass away', 'Photos printed and stored on a computer', 'Your email address and phone number'], 1),
        ('Storing your account passwords securely for a trusted family member means', 'Storing passwords for a trusted family member means', ['Sharing them on a sticky note on your computer', 'Keeping them in a secure written document in a known safe place or a password manager', 'Emailing them to family so they always have access', 'Storing them in a text message to yourself'], 1),
        ('Apple Legacy Contact is a feature that allows you to', 'Apple Legacy Contact allows you to', ['Transfer your phone plan to a family member after you pass', 'Designate someone to access your Apple account data after your death', 'Share your Apple ID with family while you are alive', 'Back up your photos to a relative s iCloud'], 1),
        ('What should you include in a digital instructions document for family', 'A digital instructions document for family should include', ['Your banking PIN numbers and CRA password', 'A list of your accounts with usernames and guidance on which to close or keep', 'Every password you have ever used', 'Only your social media accounts'], 1),
        ('Why is it important to review your digital accounts periodically', 'Why review your digital accounts periodically', ['To ensure you are not being charged for services you no longer use', 'To increase your credit score', 'To qualify for senior discounts online', 'To avoid your phone running out of storage'], 1),
    ]),
    ('module-20-internet-plan', 'module-20-internet-plan', [
        ('Data cap on an internet plan means', 'Data cap on an internet plan means', ['The maximum speed your plan can reach', 'The maximum amount of data you can use per month before extra charges or slowdowns', 'The number of devices you can connect at once', 'How long your internet contract lasts'], 1),
        ('If your internet bill jumps up after 12 months you should', 'If your internet bill increases after 12 months you should', ['Accept it that is just how internet plans work', 'Call the provider s retention line and ask for a new promotional rate', 'Cancel immediately and switch to another provider', 'Reduce your internet usage to avoid the extra charges'], 1),
        ('Mbps stands for', 'Mbps stands for', ['Megabytes per second a measure of file size', 'Megabits per second a measure of internet speed', 'Monthly bandwidth per subscription', 'Mobile broadband per second'], 1),
        ('Streaming HD video typically requires a minimum download speed of about', 'Streaming HD video typically requires a minimum download speed of about', ['1 Mbps', '5 to 25 Mbps', '100 Mbps', '1000 Mbps'], 1),
        ('When comparing internet plans the most important factors for a typical senior household are', 'Most important factors when comparing internet plans for a senior household are', ['The fastest possible speed and unlimited data at any price', 'Reliable speed for your actual usage and a monthly cost within your budget', 'The most TV channels included', 'Whether the router is a specific brand'], 1),
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
    before = '\n      <div class="dcc-quiz-container" id="dcc-before-quiz" style="margin-bottom:1.5rem"></div>'
    c = c[:h1e] + before + c[h1e:]

    after = '\n      <div class="dcc-quiz-container" id="dcc-after-quiz" style="margin:2rem 0"></div>'
    c = c.replace('    </main>', after + '\n    </main>', 1)

    def q_js(q):
        opts = ', '.join(repr(o) for o in q[2])
        return '{text:' + repr(q[0]) + ',text_after:' + repr(q[1]) + ',options:[' + opts + '],correct:' + str(q[3]) + '}'

    qs_js = ', '.join(q_js(q) for q in qs)
    script = (
        '  <script src="js/quiz-check.js" defer></script>\n'
        '  <script>\n'
        "  document.addEventListener('DOMContentLoaded',function(){\n"
        '    var Q=[' + qs_js + '];\n'
        "    if(window.DCC_QUIZ){DCC_QUIZ.init({moduleId:" + repr(modId) + ",questions:Q,"
        "beforeContainerId:'dcc-before-quiz',afterContainerId:'dcc-after-quiz'});}\n"
        '  });\n'
        '  </script>'
    )

    c = c.replace(
        '  <script src="js/read-aloud.js" defer></script>',
        script + '\n  <script src="js/read-aloud.js" defer></script>',
        1
    )

    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)
    print(mod + ': OK')

print('Batch done.')
