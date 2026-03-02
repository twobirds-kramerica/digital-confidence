/* ============================================================
   Digital Confidence Centre — Scam Panic Button
   Persistent red button + 5-step scam response guide.
   Injected on every page via JavaScript.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  injectPanicButton();
  injectScamModal();
});

function injectPanicButton() {
  var btn = document.createElement('button');
  btn.id        = 'dc-scam-panic-btn';
  btn.className = 'dc-scam-panic-btn';
  btn.setAttribute('aria-label', 'Think you\'ve been scammed? Click here for help');
  btn.title     = 'Think you\'ve been scammed? Click for immediate help';
  btn.innerHTML = '<span class="dc-panic-icon" aria-hidden="true">🚨</span><span class="dc-panic-text">Think You\'ve Been Scammed?</span>';
  btn.addEventListener('click', openScamModal);
  document.body.appendChild(btn);
}

function injectScamModal() {
  var html = [
    '<div id="dc-scam-modal" class="dc-scam-modal" role="dialog" aria-modal="true" aria-label="Scam help guide" style="display:none;">',
      '<div class="dc-scam-backdrop" id="dc-scam-backdrop"></div>',
      '<div class="dc-scam-content">',
        '<button class="dc-scam-close" onclick="closeScamModal()" aria-label="Close scam guide">&times;</button>',

        '<h2 class="dc-scam-title">🚨 You\'re Safe Now — Here\'s What To Do</h2>',

        /* Step 1 */
        '<div class="dc-scam-step">',
          '<div class="dc-step-num">1</div>',
          '<div class="dc-step-body">',
            '<h3>Stop &amp; Breathe</h3>',
            '<p><strong>Hang up the phone or close the window immediately.</strong></p>',
            '<p>Do NOT continue talking to them. Do NOT follow any more of their instructions.</p>',
          '</div>',
        '</div>',

        /* Step 2 — urgent */
        '<div class="dc-scam-step dc-step-urgent">',
          '<div class="dc-step-num">2</div>',
          '<div class="dc-step-body">',
            '<h3>Call Your Bank Right Now (If Money Was Involved)</h3>',
            '<p>If you shared banking information or sent money:</p>',
            '<p class="dc-urgent-action">Call your bank\'s fraud department immediately using the phone number <strong>on the back of your bank card</strong>.</p>',
            '<p><strong>Do NOT</strong> use any phone number the scammer gave you.</p>',
          '</div>',
        '</div>',

        /* Step 3 */
        '<div class="dc-scam-step">',
          '<div class="dc-step-num">3</div>',
          '<div class="dc-step-body">',
            '<h3>Do Not Give Remote Access</h3>',
            '<p>If they asked you to download software or "let them into your computer":</p>',
            '<ul>',
              '<li>Do NOT download anything they suggested</li>',
              '<li>Do NOT let them connect to your device</li>',
              '<li>If you already did — turn off your device and call a family member for help</li>',
            '</ul>',
          '</div>',
        '</div>',

        /* Step 4 */
        '<div class="dc-scam-step">',
          '<div class="dc-step-num">4</div>',
          '<div class="dc-step-body">',
            '<h3>Call Someone You Trust</h3>',
            '<p><strong>Right now, call a family member or a trusted friend.</strong></p>',
            '<p>Explain what happened. They can help you figure out next steps. It is okay — many people fall for scams. You are not alone, and you are not in trouble.</p>',
          '</div>',
        '</div>',

        /* Step 5 */
        '<div class="dc-scam-step">',
          '<div class="dc-step-num">5</div>',
          '<div class="dc-step-body">',
            '<h3>Report It</h3>',
            '<p><strong>Canadian Anti-Fraud Centre:</strong></p>',
            '<div class="dc-contact-block">',
              '<p><strong>Phone:</strong> <a href="tel:18884958501">1-888-495-8501</a> (Toll-free)</p>',
              '<p><strong>Website:</strong> <a href="https://antifraudcentre-centreantifraude.ca" target="_blank" rel="noopener noreferrer">antifraudcentre-centreantifraude.ca</a></p>',
              '<p><strong>Hours:</strong> Monday\u2013Friday, 9am\u20134:45pm ET</p>',
            '</div>',
            '<p>Reporting helps protect others from the same scam.</p>',
          '</div>',
        '</div>',

        '<div class="dc-scam-footer">',
          '<p class="dc-reassurance"><strong>Remember: You are safe now. Take a deep breath. Follow these steps one at a time.</strong></p>',
          '<button onclick="closeScamModal()" class="dc-scam-close-btn">Close This Guide</button>',
        '</div>',

      '</div>',
    '</div>'
  ].join('');

  document.body.insertAdjacentHTML('beforeend', html);
  document.getElementById('dc-scam-backdrop').addEventListener('click', closeScamModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var m = document.getElementById('dc-scam-modal');
      if (m && m.style.display !== 'none') closeScamModal();
    }
  });
}

function openScamModal() {
  var modal = document.getElementById('dc-scam-modal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    modal.scrollTop = 0;
    var content = modal.querySelector('.dc-scam-content');
    if (content) content.scrollTop = 0;
  }
}

function closeScamModal() {
  var modal = document.getElementById('dc-scam-modal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}
