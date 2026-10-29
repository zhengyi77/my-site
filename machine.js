/* ==========================================================================
   machine.js — item 6 (the useless machine) and item 7 (a game)

   Two independent parts in one file:
     1. The switch and the arm  — one state, three timeouts.
     2. Beat the machine        — a countdown and a button that runs away.
   ========================================================================== */
(function () {
  'use strict';

  /* ==========================================================================
     Part 1 — the useless machine
     ========================================================================== */

  var stage = document.getElementById('machine-stage');
  var switchButton = document.getElementById('switch');
  var countOutput = document.getElementById('count');

  var shutoffs = 0;
  var busy = false; // true while the arm is moving, so clicks are ignored

  function setSwitch(on) {
    if (!switchButton || !stage) return;
    switchButton.setAttribute('aria-checked', on ? 'true' : 'false');
    stage.classList.toggle('is-on', on);
  }

  if (stage && switchButton) {
    switchButton.addEventListener('click', function () {
      if (busy) return;

      var isOn = switchButton.getAttribute('aria-checked') === 'true';

      /* Turning it off by hand is allowed — the machine only objects when you
         try to keep it on. */
      if (isOn) {
        setSwitch(false);
        return;
      }

      setSwitch(true);
      busy = true;

      // 1. wait, then the arm reaches out
      window.setTimeout(function () {
        stage.classList.add('is-pressing');
      }, 600);

      // 2. the arm pushes the switch back
      window.setTimeout(function () {
        setSwitch(false);
        shutoffs += 1;
        if (countOutput) countOutput.textContent = String(shutoffs);
      }, 1250);

      // 3. the arm goes away and the machine is ready again
      window.setTimeout(function () {
        stage.classList.remove('is-pressing');
        busy = false;
      }, 1850);
    });
  }

  /* ==========================================================================
     Part 2 — beat the machine
     ========================================================================== */

  var box = document.getElementById('game-box');
  var target = document.getElementById('target');
  var overlay = document.getElementById('game-overlay');
  var startButton = document.getElementById('start');
  var scoreOutput = document.getElementById('score');
  var timeOutput = document.getElementById('time');
  var bestOutput = document.getElementById('best');
  var statusOutput = document.getElementById('game-status');

  if (!box || !target || !startButton) return;

  var GAME_SECONDS = 20;

  var score = 0;
  var secondsLeft = GAME_SECONDS;
  var timer = null;
  var best = 0;

  // localStorage can throw in private mode; a best score is not worth an error.
  try {
    best = parseInt(window.localStorage.getItem('machine-best-score'), 10) || 0;
  } catch (error) {
    best = 0;
  }

  if (bestOutput) bestOutput.textContent = String(best);

  function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /* The target is 64px wide. Keeping the position between 2% and 78% means it
     stays inside the box even on a narrow phone. */
  function moveTarget() {
    target.style.left = randomBetween(2, 78) + '%';
    target.style.top = randomBetween(4, 70) + '%';
  }

  function updateScoreboard() {
    if (scoreOutput) scoreOutput.textContent = String(score);
    if (timeOutput) timeOutput.textContent = String(secondsLeft);
  }

  function endGame() {
    window.clearInterval(timer);
    timer = null;

    target.hidden = true;
    overlay.hidden = false;

    if (score > best) {
      best = score;
      try {
        window.localStorage.setItem('machine-best-score', String(best));
      } catch (error) {
        /* ignore: the game still works, it just forgets */
      }
      if (bestOutput) bestOutput.textContent = String(best);
    }

    overlay.innerHTML =
      '<p class="game-intro">Time. You hit the target <strong>' + score +
      '</strong> times.</p>' +
      '<button class="btn btn-primary" type="button" id="start">Play again</button>';

    /* The button was replaced, so wire the new one. */
    var again = document.getElementById('start');
    if (again) again.addEventListener('click', startGame);

    if (statusOutput) {
      statusOutput.textContent = 'Game over. Final score ' + score + '.';
    }
  }

  function tick() {
    secondsLeft -= 1;
    updateScoreboard();

    if (secondsLeft <= 0) endGame();
  }

  function startGame() {
    score = 0;
    secondsLeft = GAME_SECONDS;
    updateScoreboard();

    overlay.hidden = true;
    target.hidden = false;
    moveTarget();

    if (statusOutput) statusOutput.textContent = 'Game started. Good luck.';

    window.clearInterval(timer);
    timer = window.setInterval(tick, 1000);
  }

  target.addEventListener('click', function () {
    if (target.hidden) return;

    score += 1;
    updateScoreboard();
    moveTarget();

    if (statusOutput) statusOutput.textContent = 'Score ' + score + '.';
  });

  startButton.addEventListener('click', startGame);
})();
