'use script';

// --------------------- //
// SELECT DOM ELEMENTS

const btnRock = document.querySelector('.btn-rock');
const btnPaper = document.querySelector('.btn-paper');
const btnScissors = document.querySelector('.btn-scissors');
const btnReset = document.querySelector('.btn-reset');

let humanScoreEl = document.querySelector('.score-human');
let computerScoreEl = document.querySelector('.score-computer');
let humanChoiceEl = document.querySelector('.choice-human');
let computerChoiceEl = document.querySelector('.choice-computer');
let roundOutcomeEl = document.querySelector('.round-outcome');
let roundResultEl = document.querySelector('.round-result');
let gamePhaseEl = document.querySelector('.game-phase');
let movesEl = document.querySelector('.moves');

// --------------------- //
// STATE VARIABLES

let humanScore;
let computerScore;
let rounds;
let endOfGame;

// --------------------- //
// HELPER FUNCTIONS

const displayRoundDetails = function (currentOutcome, winnerMove, loserMove) {
  roundOutcomeEl.textContent = `${currentOutcome} in round ${rounds}!`;
  roundResultEl.textContent = `${winnerMove} ${winnerMove === loserMove ? 'equals' : 'beats'} ${loserMove}. `;
};

const clearSetups = function () {
  humanChoiceEl.classList.remove('rock', 'paper', 'scissors');
  computerChoiceEl.classList.remove('rock', 'paper', 'scissors');
  document.querySelector('.player-human .win-marker').classList.add('removed');
  document.querySelector('.player-computer .win-marker').classList.add('removed');
  document.querySelector(`.player-human`).classList.remove('winner-setup');
  document.querySelector(`.player-computer`).classList.remove('winner-setup');
};

// --------------------- //
// GAME LOGIC FUNCTIONS

// Start or reset the game
const init = function () {
  humanScore = 0;
  computerScore = 0;
  rounds = 1;
  endOfGame = false;

  humanScoreEl.textContent = humanScore;
  computerScoreEl.textContent = computerScore;
  gamePhaseEl.textContent = 'vs';
  roundOutcomeEl.textContent = 'Choose your move';
  roundResultEl.textContent = '...';

  clearSetups();
  movesEl.classList.remove('hidden');
};

const getComputerChoice = function () {
  const randomChoice = Math.trunc(Math.random() * 3);
  const rockPaperScissors = ['Rock', 'Paper', 'Scissors'];
  return rockPaperScissors[randomChoice];
};

const playRound = function (humanChoice, computerChoice) {
  // Display selected moves
  gamePhaseEl.textContent = `Round ${rounds}`;
  humanChoiceEl.classList.add(`${humanChoice.toLowerCase()}`);
  computerChoiceEl.classList.add(`${computerChoice.toLowerCase()}`);

  // When there is a draw
  if (humanChoice === computerChoice) {
    displayRoundDetails('A draw', humanChoice, computerChoice);
    return;
  }

  const humanWins = (humanChoice === 'Rock' && computerChoice === 'Scissors') || (humanChoice === 'Paper' && computerChoice === 'Rock') || (humanChoice === 'Scissors' && computerChoice === 'Paper');

  // When human wins
  if (humanWins) {
    humanScore++;
    humanScoreEl.textContent = humanScore;
    displayRoundDetails('You win', humanChoice, computerChoice);
    document.querySelector('.player-human .win-marker').classList.remove('removed');

    // When computer wins
  } else {
    computerScore++;
    computerScoreEl.textContent = computerScore;
    displayRoundDetails('You lose', computerChoice, humanChoice);
    document.querySelector('.player-computer .win-marker').classList.remove('removed');
  }

  // Increment rounds
  rounds++;
  endOfGame = rounds > 5;
};

const playGame = function (humanChoice) {
  // Play the game for 5 rounds
  clearSetups();
  const computerChoice = getComputerChoice();
  playRound(humanChoice, computerChoice);

  // Announce the champion after round 5
  if (endOfGame) {
    let champion = humanScore > computerScore ? 'human' : 'computer';
    document.querySelector(`.player-${champion}`).classList.add('winner-setup');
    movesEl.classList.add('hidden');
  }
};

// --------------------- //
// EVENT HANDLERS

init();

btnRock.addEventListener('click', () => playGame('Rock'));
btnPaper.addEventListener('click', () => playGame('Paper'));
btnScissors.addEventListener('click', () => playGame('Scissors'));
btnReset.addEventListener('click', init);
