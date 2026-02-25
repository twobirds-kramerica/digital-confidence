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
