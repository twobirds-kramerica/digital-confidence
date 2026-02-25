/* ============================================
   Digital Confidence Centre
   Main Application JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  initSidebar();
  setActiveNavLink();
});

/* Sidebar Toggle */
function initSidebar() {
  var menuBtn = document.querySelector('.menu-btn');
  var sidebar = document.querySelector('.sidebar');
  var overlay = document.querySelector('.sidebar-overlay');
  var closeBtn = document.querySelector('.sidebar-close');

  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      sidebar.classList.add('open');
      overlay.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeSidebar);
  }

  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  });
}

/* Highlight active nav link */
function setActiveNavLink() {
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var links = document.querySelectorAll('.sidebar nav a');
  links.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
}

/* Smooth scroll for anchor links */
document.addEventListener('click', function (e) {
  var anchor = e.target.closest('a[href^="#"]');
  if (anchor) {
    var target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});
