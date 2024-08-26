// CALCULATOR 2024 - Author: Ronnie Chan

"use strict";

// -------------------------- //
// SELECT DOM ELEMENTS

let displayInputEl = document.querySelector(".display-input");
let displayResultEl = document.querySelector(".display-result");
const btnClear = document.querySelector(`.btn-clear`);
const btnSign = document.querySelector(".btn-sign");
const btnPercent = document.querySelector(".btn-percent");

// -------------------------- //
// VARIABLES

let currNum;
let firstNum;
let secondNum;
let operator;
let hasError;
let hasCalculated;

// -------------------------- //
// FUNCTIONS FOR HANDLING OPERAND BUTTONS

function handleOperandClick(event) {
  if (hasError) return;
  if (hasCalculated) init();

  const value = event.target.value;
  if (!isNaN(Number(value))) {
    handleNumberClick(value);
  } else if (value === "decimal") {
    handleDecimalClick(value);
  } else if (value === "delete") {
    handleDeleteClick(value);
  }
}

function handleNumberClick(value) {
  // Append clicked digit to current number
  currNum += value;
  appendInputDisplay(value);
}

function handleDecimalClick(value) {
  if (currNum.toString().includes(".")) return;

  // If there's no current number, start with "0."
  if (currNum.length === 0) {
    currNum = "0.";
    appendInputDisplay("0.");

    // Otherwise, add a decimal after the current number
  } else {
    currNum += ".";
    appendInputDisplay(".");
  }
}

function handleDeleteClick(value) {
  // Remove the last input
  currNum = currNum.slice(0, -1);
  setInputDisplay(displayInputEl.textContent.slice(0, -1));

  // Adjust the variables
  const newInput = displayInputEl.textContent;
  if (!newInput.includes(secondNum.toString())) {
    secondNum = 0;
  } else if (!newInput.includes(operator)) {
    operator = "";
  } else if (!newInput.includes(firstNum.toString())) {
    firstNum = 0;
  }
}

// -------------------------- //
// HELPER FUNCTIONS

// FUNCTIONS TO MANAGE AND UPDATE DISPLAY ELEMENTS
function isInputEmpty() {
  return displayInputEl.textContent.length === 0;
}

function appendInputDisplay(newInput) {
  displayInputEl.textContent += newInput;
}

function replaceInputElement(oldEl, newEl) {
  setInputDisplay(displayInputEl.textContent.replace(oldEl, newEl));
}

function setInputDisplay(newText) {
  displayInputEl.textContent = newText;
}

function setResultDisplay(newText) {
  displayResultEl.textContent = newText;
}

// FUNCTION TO RESET THE APP
function init() {
  setInputDisplay("");
  setResultDisplay("0");
  currNum = "";
  firstNum = 0;
  secondNum = 0;
  operator = "";
  hasError = false;
  hasCalculated = false;
}

// -------------------------- //
// -------------------------- //

// Initialize the calculator
init();

// -------------------------- //
// EVENT HANDLERS FOR BUTTON CLICKS

document
  .querySelectorAll(".operands .btn")
  .forEach((button) => button.addEventListener("click", (e) => handleOperandClick(e)));
