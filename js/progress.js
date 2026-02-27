/* ============================================
   Progress Tracking
   Checkbox persistence with LocalStorage
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  initProgressCheckboxes();
  updateProgressOverview();
});

function initProgressCheckboxes() {
  var checkboxes = document.querySelectorAll('.progress-checkbox');
  checkboxes.forEach(function (cb) {
    var key = 'dc-progress-' + cb.getAttribute('data-id');
    // Restore saved state
    if (localStorage.getItem(key) === 'true') {
      cb.checked = true;
      updateLabel(cb, true);
    }

    cb.addEventListener('change', function () {
      localStorage.setItem(key, cb.checked);
      updateLabel(cb, cb.checked);
      updateProgressOverview();
      // Announce to screen readers
      var announcer = document.getElementById('progress-announcer');
      if (announcer) {
        var labelEl = cb.nextElementSibling;
        var labelText = labelEl ? labelEl.textContent.trim() : 'item';
        announcer.textContent = cb.checked
          ? 'Progress saved: "' + labelText + '" marked complete.'
          : 'Progress updated: "' + labelText + '" unmarked.';
      }
    });
  });
}

function updateLabel(checkbox, checked) {
  var label = checkbox.nextElementSibling;
  if (label && label.classList.contains('progress-label')) {
    if (checked) {
      label.classList.add('completed');
    } else {
      label.classList.remove('completed');
    }
  }
}

function updateProgressOverview() {
  // Count all progress items across all modules
  var totalModules = 8;
  var completedModules = 0;

  for (var m = 1; m <= totalModules; m++) {
    var prefix = 'dc-progress-m' + m;
    var allComplete = true;
    var hasItems = false;
    for (var i = 1; i <= 10; i++) {
      var key = prefix + '-' + i;
      var val = localStorage.getItem(key);
      if (val !== null) {
        hasItems = true;
        if (val !== 'true') {
          allComplete = false;
        }
      }
    }
    if (hasItems && allComplete) {
      completedModules++;
    }
  }

  // Update progress bar on home page
  var progressBar = document.querySelector('.progress-bar-fill');
  var progressText = document.querySelector('.progress-text');
  if (progressBar) {
    var percent = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
    progressBar.style.width = percent + '%';
    if (progressText) {
      progressText.textContent = completedModules + ' of ' + totalModules + ' modules completed (' + percent + '%)';
    }
  }

  // Check if all modules complete → unlock final quiz
  if (completedModules === totalModules && totalModules > 0) {
    if (localStorage.getItem('finalQuizUnlocked') !== 'true') {
      localStorage.setItem('finalQuizUnlocked', 'true');
    }
    // Show quiz banner on home page
    var banner = document.getElementById('final-quiz-banner');
    if (banner) banner.classList.add('visible');
    // Show unlock toast (if DC_QUIZ is loaded)
    if (typeof DC_QUIZ !== 'undefined' && DC_QUIZ.showUnlockNotification) {
      DC_QUIZ.showUnlockNotification();
    }
  } else if (localStorage.getItem('finalQuizUnlocked') === 'true') {
    // Already unlocked from a previous session
    var banner = document.getElementById('final-quiz-banner');
    if (banner) banner.classList.add('visible');
  }

  // Update module cards with completion status
  var cards = document.querySelectorAll('.module-card');
  cards.forEach(function (card) {
    var moduleNum = card.getAttribute('data-module');
    if (moduleNum) {
      var badge = card.querySelector('.card-progress');
      var prefix = 'dc-progress-m' + moduleNum;
      var total = 0;
      var done = 0;
      for (var i = 1; i <= 10; i++) {
        var val = localStorage.getItem(prefix + '-' + i);
        if (val !== null) {
          total++;
          if (val === 'true') done++;
        }
      }
      if (badge && total > 0) {
        badge.textContent = done + '/' + total + ' completed';
      }
    }
  });
}
