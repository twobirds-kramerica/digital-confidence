/* DCC Youth course engine — theme toggle, 25-question check, certificate.
   Expects window.YT_COURSE = { title, audience, questions: [{q, a: [4], c, why}], passPct }
   Renders into #quiz-root. No accounts, no tracking, nothing leaves the browser. */
(function () {
  "use strict";

  // ---- theme toggle (same behaviour as module pages) ----
  var btn = document.getElementById("theme-btn");
  if (btn) {
    var syncTheme = function () {
      var dark = document.documentElement.getAttribute("data-theme") === "dark";
      btn.textContent = dark ? "Light mode" : "Dark mode";
      btn.setAttribute("aria-pressed", dark ? "true" : "false");
    };
    btn.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("dccv2-theme", next); } catch (e) {}
      syncTheme();
    });
    syncTheme();
  }

  // ---- quiz + certificate ----
  var course = window.YT_COURSE;
  var root = document.getElementById("quiz-root");
  if (!course || !root) return;

  var PASS = course.passPct || 85;
  var LETTERS = ["A", "B", "C", "D"];
  var order = [];
  var current = 0;
  var correct = 0;

  function shuffle(n) {
    var a = [];
    for (var i = 0; i < n; i++) a.push(i);
    for (var j = n - 1; j > 0; j--) {
      var k = Math.floor(Math.random() * (j + 1));
      var t = a[j]; a[j] = a[k]; a[k] = t;
    }
    return a;
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  function startQuiz() {
    order = shuffle(course.questions.length);
    current = 0;
    correct = 0;
    renderQuestion();
  }

  function renderIntro() {
    root.innerHTML = "";
    var box = el("div", "yt-quiz");
    var h = el("p", "yt-quiz-q", "The check: " + course.questions.length + " questions, " + PASS + "% to earn the certificate.");
    var p = el("p", "", "Question order changes every attempt, every question shows you the why, and you can retake it as many times as you want. Nothing is saved or sent anywhere.");
    var b = el("button", "yt-btn", "Start the check");
    b.type = "button";
    b.addEventListener("click", startQuiz);
    box.appendChild(h); box.appendChild(p); box.appendChild(b);
    root.appendChild(box);
  }

  function renderQuestion() {
    root.innerHTML = "";
    var qi = order[current];
    var q = course.questions[qi];
    var box = el("div", "yt-quiz");

    var prog = el("div", "yt-progress");
    var lab = el("span", "yt-progress-label", "Question " + (current + 1) + " of " + course.questions.length);
    prog.appendChild(lab);
    box.appendChild(prog);

    var qEl = el("p", "yt-quiz-q", q.q);
    box.appendChild(qEl);

    var answers = el("div", "yt-answers");
    answers.setAttribute("role", "group");
    answers.setAttribute("aria-label", "Answer choices");
    var answered = false;

    var debrief = el("div", "yt-debrief");
    var dl = el("p", "yt-debrief-label", "Why");
    var dp = el("p", "", q.why);
    debrief.appendChild(dl); debrief.appendChild(dp);

    var next = el("button", "yt-next", current + 1 < course.questions.length ? "Next question →" : "See your result →");
    next.type = "button";
    next.addEventListener("click", function () {
      current++;
      if (current < course.questions.length) renderQuestion();
      else renderResult();
    });

    q.a.forEach(function (text, idx) {
      var a = el("button", "yt-answer");
      a.type = "button";
      var letter = el("span", "yt-letter", LETTERS[idx]);
      letter.setAttribute("aria-hidden", "true");
      a.appendChild(letter);
      a.appendChild(document.createTextNode(" " + text));
      a.addEventListener("click", function () {
        if (answered) return;
        answered = true;
        if (idx === q.c) {
          a.classList.add("is-correct");
          correct++;
        } else {
          a.classList.add("is-wrong");
          var kids = answers.querySelectorAll(".yt-answer");
          kids[q.c].classList.add("show-correct");
        }
        answers.querySelectorAll(".yt-answer").forEach(function (b) { b.disabled = true; });
        debrief.classList.add("visible");
        next.classList.add("visible");
        next.focus();
      });
      answers.appendChild(a);
    });

    box.appendChild(answers);
    box.appendChild(debrief);
    box.appendChild(next);
    root.appendChild(box);
    var live = qEl;
    live.setAttribute("tabindex", "-1");
    live.focus({ preventScroll: false });
  }

  function renderResult() {
    root.innerHTML = "";
    var total = course.questions.length;
    var pct = Math.round((correct / total) * 100);
    var passed = pct >= PASS;

    var res = el("div", "yt-results visible");
    res.setAttribute("role", "status");
    var score = el("p", "yt-score", correct + " of " + total + " — " + pct + "%");
    var sub = el("p", "yt-score-sub", passed
      ? "That clears the " + PASS + "% bar. Your certificate is below."
      : "The bar is " + PASS + "%. Nothing bad happens — reread the sections above and take it again. Different question order every time.");
    res.appendChild(score); res.appendChild(sub);
    root.appendChild(res);

    if (!passed) {
      var retry = el("button", "yt-btn", "Take it again");
      retry.type = "button";
      retry.addEventListener("click", startQuiz);
      root.appendChild(retry);
      return;
    }

    var form = el("div", "yt-cert-form");
    var label = el("label", "", "Name to put on the certificate");
    label.setAttribute("for", "cert-name");
    var input = el("input");
    input.id = "cert-name";
    input.type = "text";
    input.autocomplete = "name";
    input.maxLength = 80;
    var make = el("button", "yt-btn", "Show my certificate");
    make.type = "button";
    form.appendChild(label); form.appendChild(input); form.appendChild(make);
    root.appendChild(form);

    var cert = el("div", "yt-cert");
    cert.setAttribute("role", "region");
    cert.setAttribute("aria-label", "Certificate of completion");
    root.appendChild(cert);

    make.addEventListener("click", function () {
      var name = (input.value || "").trim() || "Name withheld";
      cert.innerHTML = "";
      cert.appendChild(el("p", "yt-cert-brand", "Digital Confidence Centre · Youth"));
      cert.appendChild(el("h2", "", "Certificate of completion, earned by"));
      cert.appendChild(el("p", "yt-cert-name", name));
      cert.appendChild(el("p", "yt-cert-course", course.title));
      cert.appendChild(el("p", "yt-cert-meta", course.audience + " · Score: " + pct + "% (" + correct + " of " + total + ", pass mark " + PASS + "%)"));
      var d = new Date();
      var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      cert.appendChild(el("p", "yt-cert-meta", "Completed " + d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear()));
      cert.appendChild(el("p", "yt-cert-meta", "Free, Canadian, no account — digital confidence for everyone."));
      var print = el("button", "yt-btn yt-btn-quiet", "Print or save as PDF");
      print.type = "button";
      print.style.marginTop = "1rem";
      print.addEventListener("click", function () {
        document.body.classList.add("yt-printing");
        window.print();
      });
      window.addEventListener("afterprint", function () {
        document.body.classList.remove("yt-printing");
      });
      cert.appendChild(print);
      cert.classList.add("visible");
      cert.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  renderIntro();
})();
