/* DCC v2 - Certificate page (Sprint V2-5).
   Consciously ported from the original certificate.html inline script.
   Uses the SAME localStorage keys as the original site (userName,
   finalQuizScore, finalQuizDate) so nobody's earned certificate resets
   when they land on v2 (rebuild-plan risk 11). */
document.addEventListener('DOMContentLoaded', function () {
  var name  = localStorage.getItem('userName') || '';
  var score = localStorage.getItem('finalQuizScore') || '';
  var date  = localStorage.getItem('finalQuizDate') || '';

  /* Populate date - use stored or today */
  if (!date) {
    date = new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });
    localStorage.setItem('finalQuizDate', date);
  }
  document.getElementById('cert-date-display').textContent = date;

  /* Populate score */
  if (score) {
    document.getElementById('cert-score-display').textContent = score + '% — Proficient';
  }

  /* Populate name or show entry form */
  if (name) {
    document.getElementById('cert-name-display').textContent = name;
    document.getElementById('name-section').style.display = 'none';
  } else {
    document.getElementById('name-section').style.display = 'block';
    document.getElementById('cert-name-display').textContent = '— Your Name —';
  }

  /* Generate button */
  var genBtn = document.getElementById('generate-btn');
  if (genBtn) {
    genBtn.addEventListener('click', function () {
      var n = (document.getElementById('name-input').value || '').trim();
      if (!n) { alert('Please enter your name first.'); return; }
      localStorage.setItem('userName', n);
      document.getElementById('cert-name-display').textContent = n;
      document.getElementById('name-section').style.display = 'none';
    });
  }
});
