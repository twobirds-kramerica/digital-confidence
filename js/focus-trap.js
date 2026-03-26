/* ============================================
   Focus Trap Utility
   Digital Confidence Centre
   ============================================ */

/**
 * trapFocus(modalElement, triggerElement)
 *
 * Traps keyboard focus inside a modal/panel. Returns a cleanup function
 * that removes the trap and restores focus to the triggering element.
 *
 * Usage:
 *   var releaseTrap = trapFocus(myModal, document.activeElement);
 *   // later, on close:
 *   releaseTrap();
 */
function trapFocus(modalElement, triggerElement) {
  var FOCUSABLE_SELECTORS = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    'details > summary'
  ].join(', ');

  function getFocusableElements() {
    return Array.prototype.slice.call(
      modalElement.querySelectorAll(FOCUSABLE_SELECTORS)
    ).filter(function (el) {
      return !el.closest('[hidden]') && el.offsetParent !== null;
    });
  }

  function handleKeydown(e) {
    if (e.key !== 'Tab') return;

    var focusable = getFocusableElements();
    if (focusable.length === 0) return;

    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      /* Shift+Tab — wrap backwards */
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      /* Tab — wrap forwards */
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  /* Move focus to the first focusable element inside the modal */
  var focusable = getFocusableElements();
  if (focusable.length > 0) {
    focusable[0].focus();
  }

  modalElement.addEventListener('keydown', handleKeydown);

  /* Return a cleanup/release function */
  return function releaseTrap() {
    modalElement.removeEventListener('keydown', handleKeydown);
    /* Restore focus to the element that opened the modal */
    if (triggerElement && typeof triggerElement.focus === 'function') {
      triggerElement.focus();
    }
  };
}
