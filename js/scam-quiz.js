/* ============================================
   Scam Simulation Quiz Engine
   Interactive "Spot the Red Flags" Exercises
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  initQuizzes();
});

function initQuizzes() {
  var quizContainers = document.querySelectorAll('.quiz-container');
  quizContainers.forEach(function (container) {
    var questions = container.querySelectorAll('.quiz-question');
    var totalQuestions = questions.length;
    var answered = 0;
    var correct = 0;

    questions.forEach(function (q) {
      var options = q.querySelectorAll('.quiz-option');
      var feedback = q.querySelector('.quiz-feedback');
      var correctAnswer = q.getAttribute('data-correct');

      options.forEach(function (opt) {
        opt.addEventListener('click', function () {
          // Prevent re-answering
          if (q.classList.contains('answered')) return;
          q.classList.add('answered');
          answered++;

          var selected = opt.getAttribute('data-answer');
          var isCorrect = selected === correctAnswer;

          // Disable all options
          options.forEach(function (o) {
            o.disabled = true;
            if (o.getAttribute('data-answer') === correctAnswer) {
              o.classList.add('correct');
            }
          });

          if (isCorrect) {
            opt.classList.add('correct');
            correct++;
            if (feedback) {
              feedback.className = 'quiz-feedback show correct';
              feedback.textContent = feedback.getAttribute('data-correct-text') || 'Well done! That is the right answer.';
            }
          } else {
            opt.classList.add('incorrect');
            if (feedback) {
              feedback.className = 'quiz-feedback show incorrect';
              feedback.textContent = feedback.getAttribute('data-incorrect-text') || 'Not quite. The correct answer is highlighted in green.';
            }
          }

          // Show score when all answered
          if (answered === totalQuestions) {
            showScore(container, correct, totalQuestions);
          }
        });
      });
    });
  });
}

function showScore(container, correct, total) {
  var scoreEl = container.querySelector('.quiz-score');
  if (scoreEl) {
    scoreEl.classList.add('show');
    var scoreNum = scoreEl.querySelector('.score-number');
    var scoreMsg = scoreEl.querySelector('.score-message');
    if (scoreNum) {
      scoreNum.textContent = correct + ' out of ' + total;
    }
    if (scoreMsg) {
      if (correct === total) {
        scoreMsg.textContent = 'Perfect score! You have excellent scam-spotting skills. You should feel very confident.';
      } else if (correct >= total * 0.7) {
        scoreMsg.textContent = 'Great job! You caught most of the red flags. Review the ones you missed and try again any time.';
      } else {
        scoreMsg.textContent = 'Good effort! Scam spotting takes practice. Review the explanations above and try again when you are ready.';
      }
    }
  }
}

/* Reset quiz function (called by reset buttons) */
function resetQuiz(containerId) {
  var container = document.getElementById(containerId);
  if (!container) return;

  var questions = container.querySelectorAll('.quiz-question');
  questions.forEach(function (q) {
    q.classList.remove('answered');
    var options = q.querySelectorAll('.quiz-option');
    options.forEach(function (o) {
      o.disabled = false;
      o.classList.remove('correct', 'incorrect');
    });
    var feedback = q.querySelector('.quiz-feedback');
    if (feedback) {
      feedback.className = 'quiz-feedback';
      feedback.textContent = '';
    }
  });

  var scoreEl = container.querySelector('.quiz-score');
  if (scoreEl) {
    scoreEl.classList.remove('show');
  }

  // Re-initialize
  initQuizzes();
}
