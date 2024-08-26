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
