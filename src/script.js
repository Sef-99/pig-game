'use strict';

const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const diceElement = document.getElementById('dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

diceElement.classList.add('hidden');

const scores = [];
const WINNING_SCORE = 100;
let currentScore, activePlayer, isGamePlaying;
initializeGame();

btnNew.addEventListener('click', initializeGame);

function initializeGame() {
  scores[0] = 0;
  scores[1] = 0;
  activePlayer = 0;
  currentScore = 0;
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  isGamePlaying = true;
  updateOverallScores();
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  resetCurrentScores();
}

btnHold.addEventListener('click', function () {
  if (isGamePlaying) {
    scores[activePlayer] += currentScore;
    currentScore = 0;
    updateOverallScores();
    resetCurrentScores();
    if (scores[activePlayer] >= WINNING_SCORE) {
      finishGame();
    } else {
      activePlayer = getInactivePlayer();
      updateUITurns();
    }
  }
});

function finishGame() {
  isGamePlaying = false;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');
  diceElement.classList.add('hidden');
}

function updateOverallScores() {
  score0Element.textContent = scores[0];
  score1Element.textContent = scores[1];
}

btnRoll.addEventListener('click', function () {
  if (isGamePlaying) {
    const randomDiceRoll = Math.trunc(Math.random() * 6) + 1;
    displayDice(randomDiceRoll);

    if (randomDiceRoll !== 1) {
      addScoreToPlayer(randomDiceRoll);
    } else {
      currentScore = 0;
      activePlayer = getInactivePlayer();
      updateUITurns();
      resetCurrentScores();
    }
  }
});

function resetCurrentScores() {
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
}

function getInactivePlayer() {
  return activePlayer === 0 ? 1 : 0;
}

function updateUITurns() {
  const inactivePlayer = getInactivePlayer();
  const activePlayerSection = document.querySelector(
    `.player--${activePlayer}`
  );
  const inactivePlayerSection = document.querySelector(
    `.player--${inactivePlayer}`
  );
  inactivePlayerSection.classList.toggle('player--active');
  activePlayerSection.classList.toggle('player--active');
}

function addScoreToPlayer(diceRoll) {
  currentScore += diceRoll;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
}

function displayDice(diceRoll) {
  diceElement.classList.remove('hidden');
  diceElement.src = `img/dice-${diceRoll}.png`;
}
