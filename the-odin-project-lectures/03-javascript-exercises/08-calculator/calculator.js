// Addition of two numbers
const add = function (a, b) {
  return a + b;
};

// Substraction of two numbers
const subtract = function (a, b) {
  return a - b;
};

// Sum of an array
const sum = function (array) {
  return array.reduce((total, current) => total + current, 0);
};

// Product of the array elements
const multiply = function (array) {
  return array.reduce((product, current) => product * current);
};

const power = function (a, exponent) {
  return Math.pow(a, exponent);
};

const factorial = function (n) {
  if (n === 0) return 1;

  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
};

// Do not edit below this line
module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial
};
