// CALCULATOR 2024 - Author: Ronnie Chan

'use strict';

// -------------------------- //
// SELECT DOM ELEMENTS

let displayInputEl = document.querySelector('.display-input');
let displayResultEl = document.querySelector('.display-result');
const btnClear = document.querySelector(`.btn-clear`);
const btnSign = document.querySelector('.btn-sign');
const btnPercent = document.querySelector('.btn-percent');

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

  const value = event.target.value || event.key;
  if (!isNaN(Number(value))) {
    handleNumberClick(value);
  } else if (value === 'decimal' || value === '.') {
    handleDecimalClick(value);
  } else if (value === 'delete' || value === 'Backspace') {
    handleDeleteClick(value);
  }
}

function handleNumberClick(value) {
  // Append clicked digit to current number
  currNum += value;
  appendInputDisplay(value);
}

function handleDecimalClick(value) {
  if (currNum.toString().includes('.')) return;

  // If there's no current number, start with "0."
  if (currNum.length === 0) {
    currNum = '0.';
    appendInputDisplay('0.');

    // Otherwise, add a decimal after the current number
  } else {
    currNum += '.';
    appendInputDisplay('.');
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
    operator = '';
  } else if (!newInput.includes(firstNum.toString())) {
    firstNum = 0;
  }
}

// -------------------------- //
// FUNCTIONS FOR HANDLING OPERATOR BUTTONS

function handleOperatorClick(event) {
  if (hasError || isInputEmpty()) return;

  const selectedOperator = event.target.dataset.action || event.key;
  if (selectedOperator === 'equals' || selectedOperator === 'Enter' || selectedOperator === '=') {
    handleEqualsClick();
  } else {
    handleInputOperator(selectedOperator);
  }
}

function handleInputOperator(operatorValue) {
  if (hasCalculated) continueCalculation();

  // Map operator value to symbol
  const operatorMapping = {
    add: '+',
    substract: '-',
    multiply: 'x',
    divide: '÷',
    '*': 'x',
    '/': '÷',
  };
  const operatorSymbol = operatorMapping[operatorValue] || operatorValue;

  // Store the operator if not found
  if (!operator) {
    firstNum = Number(currNum);
    operator = operatorSymbol;
    appendInputDisplay(operator);
    currNum = '';

    // Overwrite the last operator if present
  } else if (firstNum && operator && !currNum) {
    operator = operatorSymbol;
    setInputDisplay(`${firstNum}${operator}`);

    // If user inputs a 2nd operator, compute first expression part
  } else if (firstNum && operator && !secondNum) {
    secondNum = Number(currNum);
    firstNum = compute(firstNum, operator, secondNum);
    operator = operatorSymbol;
    setInputDisplay(`${firstNum}${operator}`);
  }
}

// -------------------------- //
// FUNCTION FOR HANDLING "EQUALS" BUTTON

function handleEqualsClick() {
  if (hasCalculated) return;

  secondNum = Number(currNum);
  compute(firstNum, operator, secondNum);
  hasCalculated = true;
}

// FUNCTION FOR CALCULATING
function compute(a, operator, b) {
  const mapOperation = {
    '+': add,
    '-': substract,
    x: multiply,
    '*': multiply,
    '÷': divide,
    '/': divide,
  };
  let result = mapOperation[operator](a, b);
  if (!Number.isInteger(result)) result = parseFloat(result.toFixed(5));
  setResultDisplay(result);

  // Reset variables
  secondNum = 0;
  currNum = '';

  return result;
}

// -------------------------- //
// FUNCTIONS FOR SIMPLE ARITHMETIC OPERATIONS

function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    hasError = true;
    return 'MATH ERROR';
  }
  return a / b;
}

// -------------------------- //
// FUNCTION FOR HANDLING SIGN BUTTON

function handleSignClick() {
  if (hasError || isInputEmpty()) return;
  if (hasCalculated) {
    init();
    return;
  }

  // Reverse the sign
  const prevNum = currNum;
  currNum *= -1;
  replaceInputElement(prevNum, currNum);
}

// -------------------------- //
// FUNCTION FOR HANDLING PERCENT BUTTON

function handlePercentClick() {
  if (hasError || isInputEmpty()) return;
  if (hasCalculated) {
    init();
    return;
  }

  // If input is something like "5+%", send an error message
  if (firstNum && operator && !currNum) {
    hasError = true;
    appendInputDisplay('%');
    setResultDisplay('SYNTAX ERROR');
    return;
  }

  handlePercentComputations();
}

function handlePercentComputations() {
  // If input consists of a single number, convert it to a percentage
  if (currNum && !operator) {
    currNum = Number(currNum) / 100;
    firstNum = currNum;
    setInputDisplay(firstNum);

    // If input consists of 2 numbers, adjust the current number based on the percentage
  } else if (firstNum && operator && currNum) {
    currNum = firstNum * (Number(currNum) / 100);
    secondNum = currNum;
    compute(firstNum, operator, secondNum);
    appendInputDisplay('%');
    hasCalculated = true;
  }
}

// -------------------------- //
// HELPER FUNCTIONS

// FUNCTION TO START A NEW CALCULATION USING THE PREVIOUS RESULT
function continueCalculation() {
  firstNum = Number(displayResultEl.textContent);
  setInputDisplay(displayResultEl.textContent);

  setResultDisplay('0');
  currNum = '';
  secondNum = 0;
  hasCalculated = false;
}

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
  setInputDisplay('');
  setResultDisplay('0');
  currNum = '';
  firstNum = 0;
  secondNum = 0;
  operator = '';
  hasError = false;
  hasCalculated = false;
}

// -------------------------- //
// -------------------------- //

// Initialize the calculator
init();

// -------------------------- //
// EVENT HANDLERS FOR BUTTON CLICKS

document.querySelectorAll('.operands .btn').forEach((button) => button.addEventListener('click', (e) => handleOperandClick(e)));

document.querySelectorAll('.operators .btn').forEach((button) => button.addEventListener('click', (e) => handleOperatorClick(e)));

btnSign.addEventListener('click', handleSignClick);
btnPercent.addEventListener('click', handlePercentClick);
btnClear.addEventListener('click', init);

// -------------------------- //
// EVENT HANDLERS FOR KEYBOARD INPUT

document.addEventListener('keydown', function (e) {
  const key = e.key;
  const operators = '+-*/=';

  if ((Number(key) >= 0 && Number(key) <= 9) || key === '.' || key === 'Backspace') {
    handleOperandClick(e);
  } else if (operators.includes(key) || key === 'Enter') {
    handleOperatorClick(e);
  } else if (key === 's' || key === 'n') {
    handleSignClick();
  } else if (key === '%') {
    handlePercentClick();
  } else if (key === 'c' || key === 'Escape') {
    init();
  }
});
