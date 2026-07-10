/* ============================================================================
   DCC v2 lesson-page behaviour (Sprint V2-2 shell).
   Quiz feedback, no-login checklist progress (reuses the Small Wins store in
   dcc.js), and the "Send this lesson" copy-link. No accounts, no tracking:
   everything stays in this browser. Load AFTER dcc.js.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Quiz: reveal feedback on the chosen answer ------------------- */
  document.querySelectorAll(".quiz-q").forEach(function (q) {
    var correct = q.getAttribute("data-correct");
    var fb = q.querySelector(".quiz-fb");
    var opts = q.querySelectorAll(".quiz-opt");
    opts.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var right = btn.getAttribute("data-answer") === correct;
        opts.forEach(function (b) { b.disabled = true; });
        btn.classList.add(right ? "chosen-right" : "chosen-wrong");
        if (fb) {
          fb.textContent = right
            ? (fb.getAttribute("data-right") || "That is right.")
            : (fb.getAttribute("data-wrong") || "Not quite. Have another read above.");
          fb.classList.add("show", right ? "good" : "try");
        }
      });
    });
  });

  /* ---------- Checklist: persist each tick to the Small Wins store --------- */
  var list = document.querySelector("[data-checklist]");
  if (list && window.DCC) {
    var key = list.getAttribute("data-checklist");
    var boxes = list.querySelectorAll('input[type="checkbox"]');
    var total = boxes.length;
    boxes.forEach(function (box) {
      // Restore prior ticks for this browser.
      if (window.DCC.winCount) {
        // winCount only gives a total; we re-tick by stored step names.
      }
      box.addEventListener("change", function () {
        if (box.checked && window.DCC.winStep) {
          window.DCC.winStep(key, box.id, total);
        }
      });
    });
    if (window.DCC.smallWins) window.DCC.smallWins(key, total);
  }

  /* ---------- Send this lesson: copy the page link (no share API) ---------- */
  var copyBtn = document.querySelector("[data-copy-link]");
  if (copyBtn) {
    var doneMsg = document.querySelector("[data-copy-done]");
    copyBtn.addEventListener("click", function () {
      var url = window.location.href;
      function shown() {
        if (doneMsg) { doneMsg.hidden = false; }
        copyBtn.textContent = "Link copied";
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(shown, fallback);
      } else {
        fallback();
      }
      function fallback() {
        // Old-browser path: select a hidden field so the reader can copy manually.
        var f = document.querySelector("[data-copy-field]");
        if (f) { f.hidden = false; f.value = url; f.focus(); f.select(); }
        shown();
      }
    });
  }
})();
