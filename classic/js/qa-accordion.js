// Quick Answers Accordion — lightweight, accessible
(function () {
  document.querySelectorAll('.qa-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      var answer = btn.nextElementSibling;
      btn.setAttribute('aria-expanded', String(!expanded));
      if (expanded) {
        answer.hidden = true;
      } else {
        answer.hidden = false;
      }
    });
  });
})();
