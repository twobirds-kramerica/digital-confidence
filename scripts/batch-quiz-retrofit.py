"""Batch-retrofit DCC modules 13-15 with before/after quiz containers and DCC_QUIZ.init calls."""
import os

MODS = [
    ('module-13', 'module-13-social-media', [
        ('Social media Public setting means anyone can see it', 'Social media Public setting means', ['Only friends can see it', 'Anyone on the internet can see it including strangers', 'Only people in your city', 'Only logged-in users'], 1),
        ('Friend requests from strangers safest approach', 'Friend requests from people you do not know safest approach', ['Accept all more connections is better', 'Only accept people you know or can verify', 'Never use friend features', 'Accept if photo looks friendly'], 1),
        ('Chain message share or bad luck what to do', 'Chain message share or bad luck what to do', ['Share it harmless fun', 'Do not share it viral chain message', 'Share only with family', 'Report to police'], 1),
        ('Grandchild posts home address online you should', 'Home address posted online you should', ['Not worry just one photo', 'Ask them to remove it home address sharing is a safety risk', 'Comment positively on the photo', 'Only ask if they have many followers'], 1),
        ('Privacy settings on social media control', 'Privacy settings on social media control', ['How fast posts load', 'Who can see your posts photos and personal info', 'How many ads you see', 'Whether your phone battery drains faster'], 1),
    ]),
    ('module-14', 'module-14-smart-home', [
        ('Smart speaker wake word means it only sends data when activated', 'Smart speaker wake word means', ['It is always recording and sending everything', 'It only sends data when the wake word is detected', 'It only works when connected to your TV', 'It requires a monthly subscription'], 1),
        ('Email says smart home hacked click link to fix', 'Email says smart home device hacked click link', ['Click the link immediately', 'Delete the email and check via the official app only', 'Unplug and dispose of the device', 'Forward to your internet provider'], 1),
        ('Good reason to use a smart doorbell camera', 'A benefit of a smart doorbell camera is', ['It automatically locks your door', 'You can see who is at your door from your phone when away', 'It calls 911 automatically', 'It replaces your existing door lock'], 1),
        ('Best place for smart home device instructions', 'Best place to find smart home device instructions', ['Any website that comes up in a search', 'The official manufacturer app or website', 'Facebook groups for tech advice', 'YouTube videos with many subscribers'], 1),
        ('Temporarily mute smart speaker easiest way', 'Temporarily mute a smart speaker easiest way', ['Unplug it from the wall', 'Press the physical mute button on the device', 'Cover it with a cloth', 'Change your Wi-Fi password'], 1),
    ]),
    ('module-15', 'module-15-telehealth', [
        ('Telehealth lets you see a provider by video or phone without travelling', 'Telehealth allows you to', ['Only refill prescriptions online', 'See or speak with a healthcare provider by video or phone without travelling to a clinic', 'Only communicate with your own family doctor', 'Book in-person appointments faster'], 1),
        ('Telehealth Ontario operates 24 hours 7 days a week', 'Telehealth Ontario operating hours', ['Monday to Friday 9am to 5pm', '24 hours a day 7 days a week', 'On weekends only', 'Only during cold and flu season'], 1),
        ('Before video appointment test camera microphone find quiet space', 'Before a video appointment with your doctor', ['Call ahead to confirm your credit card is on file', 'Test your camera and microphone find a quiet space and have medications nearby', 'Download a new app every time for security', 'Ask a neighbour to sit with you'], 1),
        ('Unknown number texts saying doctor wants telehealth call verify first', 'Unknown number texts saying doctor wants an immediate call', ['Join the call doctors sometimes use new numbers', 'Call your doctor office on their known number to verify before joining', 'Block the number immediately', 'Forward the text to family to decide'], 1),
        ('Telehealth Ontario serves Ontario residents only', 'Telehealth Ontario serves', ['All of Canada equally', 'Ontario residents only', 'Ontario and Quebec', 'Ontario British Columbia and Alberta'], 1),
    ]),
]

base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

for (mod, modId, qs) in MODS:
    path = os.path.join(base, mod + '.html')
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()

    # CSS
    c = c.replace(
        'href="css/print.css">',
        'href="css/print.css">\n  <link rel="stylesheet" href="css/quiz-check.css">',
        1
    )

    # Before quiz after first </h1>
    h1e = c.find('</h1>') + 5
    before = '\n      <div class="dcc-quiz-container" id="dcc-before-quiz" style="margin-bottom:1.5rem"></div>'
    c = c[:h1e] + before + c[h1e:]

    # After quiz before </main>
    after = '\n      <div class="dcc-quiz-container" id="dcc-after-quiz" style="margin:2rem 0"></div>'
    c = c.replace('    </main>', after + '\n    </main>', 1)

    # Build question JS
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

print('All done.')
