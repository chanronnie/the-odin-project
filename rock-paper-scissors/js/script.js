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
