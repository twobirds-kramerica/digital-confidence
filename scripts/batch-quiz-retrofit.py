"""Final batch: modules 25, 26, 27, and 2-5."""
import os

MODS = [
    ('module-25-outage-detection', 'module-25-outage-detection', [
        ('When your internet stops working the first thing to check is', 'When internet stops working the first thing to check is', ['Call your internet provider immediately', 'Whether the problem is with your device router or the provider by checking other devices', 'Unplug your router and leave it off for an hour', 'Replace your router'], 1),
        ('Downdetector is a website that', 'Downdetector is a website that', ['Provides government internet repair services', 'Shows real-time reports of outages for major internet and service providers', 'Monitors your personal internet speed', 'Sells replacement routers'], 1),
        ('Restarting your router typically involves', 'Restarting your router typically involves', ['Pressing a factory reset button', 'Unplugging it waiting 30 seconds and plugging it back in', 'Calling your provider to do it remotely', 'Updating its software manually'], 1),
        ('If your internet is slow during evenings but fine in the morning this likely indicates', 'Internet slow in evenings but fine mornings likely indicates', ['Your router is overheating', 'Network congestion from many users on your street or building using the internet at the same time', 'Your plan has a daily data limit', 'Your device needs to be replaced'], 1),
        ('The four fixes to try before calling your internet provider are', 'Before calling your internet provider the four fixes to try are', ['Restart router restart device check cables check status page', 'Restart your phone twice wait an hour call a neighbour to check theirs', 'Only restart the router everything else requires a technician', 'Change your Wi-Fi password update your device and restart the router'], 0),
    ]),
    ('module-26-notifications', 'module-26-notifications', [
        ('Turning off non-essential app notifications helps because', 'Turning off non-essential notifications helps because', ['It speeds up your internet', 'It reduces interruptions and helps you focus on what actually matters to you', 'It prevents apps from updating automatically', 'It reduces your monthly data usage'], 1),
        ('Do Not Disturb mode on your phone', 'Do Not Disturb mode on your phone', ['Blocks all calls permanently', 'Silences notifications and calls during set hours while allowing emergency calls through', 'Deletes incoming messages during the quiet period', 'Reduces your battery drain'], 1),
        ('A badge notification is', 'A badge notification is', ['A pop-up that takes over your screen', 'The small red number that appears on an app icon showing unread items', 'A sound alert that plays when you receive a message', 'A vibration pattern unique to each app'], 1),
        ('To reduce notification overwhelm the most effective approach is', 'To reduce notification overwhelm the most effective approach is', ['Turn off all notifications for every app', 'Review each app s notification settings and keep only the ones that are genuinely useful to you', 'Delete social media apps entirely', 'Only use your phone two hours per day'], 1),
        ('Quiet Hours or Scheduled Summary on iPhones and Androids lets you', 'Quiet Hours or Scheduled Summary lets you', ['Never receive notifications from specific people', 'Batch notifications to deliver at a time you choose reducing interruptions throughout the day', 'Automatically reply to messages during quiet periods', 'Forward notifications to a family member'], 1),
    ]),
    ('module-27-inbox-spam', 'module-27-inbox-spam', [
        ('The difference between deleting and archiving an email is', 'The difference between deleting and archiving an email is', ['There is no difference both remove the email permanently', 'Delete removes the email permanently while archive hides it in a folder you can search later', 'Archive deletes after 30 days delete is permanent', 'Archive is only available on paid email plans'], 1),
        ('A good method for unsubscribing from legitimate newsletters is', 'A good method to unsubscribe from legitimate newsletters is', ['Reply to the email asking to be removed', 'Click the Unsubscribe link at the bottom of the email from a company you know and trust', 'Block the sender which also removes you from their list', 'Forward the email to spam then wait two weeks'], 1),
        ('Helen had 14327 emails in her inbox. The best first step to manage this is', 'Managing an inbox with thousands of emails the best first step is', ['Delete all emails and start fresh', 'Create folders archive older emails by category and search for important ones before deleting', 'Export everything to a spreadsheet', 'Contact email support to have them sort it for you'], 1),
        ('Spam filters work by', 'Email spam filters work by', ['Blocking all emails from unknown senders', 'Using pattern recognition to identify messages that look like spam and routing them to a folder', 'Requiring senders to prove their identity each time', 'Only allowing emails from your existing contacts'], 1),
        ('Safe unsubscribe means', 'Safe unsubscribe means', ['Unsubscribing from any email that arrives', 'Only clicking Unsubscribe in emails from companies you recognise and actually signed up for', 'Using a third-party service to unsubscribe from everything at once', 'Forwarding unwanted email to your carrier'], 1),
    ]),
    ('module-2-5', 'module-2-5-everyday-tasks', [
        ('Copying and pasting text on a phone typically involves', 'Copying and pasting text on a phone typically involves', ['Typing it out again manually', 'Holding your finger on the text selecting it tapping Copy then tapping Paste where you want it', 'Using a keyboard shortcut the same as on a computer', 'Sharing the screen with another device'], 1),
        ('Taking a screenshot on an iPhone means', 'Taking a screenshot on an iPhone means', ['Saving the current screen as a photo in your camera roll', 'Sending the current screen to Apple', 'Printing whatever is on the screen', 'Creating a video recording of your screen'], 0),
        ('If you accidentally delete a contact or file where should you check first', 'If you accidentally delete something where should you check first', ['It is gone permanently nothing can be done', 'The Recently Deleted folder or Trash on most devices stores deleted items for 30 days', 'Call your carrier they keep backup copies', 'Restart your phone it may come back'], 1),
        ('Autocorrect on a smartphone is designed to', 'Autocorrect on a smartphone is designed to', ['Correct your grammar when writing emails', 'Automatically fix spelling mistakes as you type though it sometimes changes words incorrectly', 'Learn all your passwords and fill them in automatically', 'Block offensive language in messages'], 1),
        ('The clock or timer app on your phone can be useful for', 'The clock or timer app on your phone can be useful for', ['Only for people who do not have a watch', 'Setting alarms for medications reminders and appointments', 'Tracking how long you have been on the internet', 'Measuring your heart rate'], 1),
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

print('All done -- full retrofit complete.')
