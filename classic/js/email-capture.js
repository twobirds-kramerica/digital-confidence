/* ============================================
   Digital Confidence Centre
   Optional mid-journey email capture
   Shown on: homepage, module-3, resources
   Uses: Formspree endpoint (same as feedback)
   ============================================ */

function initEmailCapture() {
  if (localStorage.getItem('emailCaptured') === 'true') {
    var box = document.getElementById('emailInviteBox');
    if (box) box.style.display = 'none';
    return;
  }
}

function submitEmailCapture() {
  var emailInput = document.getElementById('emailCaptureInput');
  var email = emailInput ? emailInput.value.trim() : '';
  if (!email || !email.includes('@')) {
    alert('Please enter a valid email address, or click "No thank you" to skip.');
    return;
  }

  fetch('https://formspree.io/f/xeerqryj', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      email: email,
      type: 'email-capture',
      page: window.location.pathname
    })
  }).then(function () {
    localStorage.setItem('emailCaptured', 'true');
    var box = document.getElementById('emailInviteBox');
    if (box) {
      box.innerHTML = '<div class="email-invite-inner"><p>\u2705 <strong>Thank you!</strong> We will only be in touch when something new and useful is ready for you.</p></div>';
      setTimeout(function () {
        if (box) box.style.display = 'none';
      }, 4000);
    }
  }).catch(function () {
    /* Offline or network error — save locally and hide */
    localStorage.setItem('emailCaptured', 'true');
    var box = document.getElementById('emailInviteBox');
    if (box) box.style.display = 'none';
  });
}

function dismissEmailCapture() {
  localStorage.setItem('emailCaptured', 'true');
  var box = document.getElementById('emailInviteBox');
  if (box) box.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', initEmailCapture);
