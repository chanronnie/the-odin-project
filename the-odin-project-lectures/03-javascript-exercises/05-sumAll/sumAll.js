const sumAll = function (min, max) {
  // Check parameters
  if (!Number.isInteger(min) || !Number.isInteger(max)) return "ERROR!";
  if (min < 0 || max < 0) return "ERROR!";

  // Swap parameters
  if (min > max) {
    const temp = max;
    min = max;
    max = temp;
  }

  // Perform addition
  let sum = 0;
  for (let i = min; i <= max; i++) {
    sum += i;
  }
  return sum;
};

// Do not edit below this line
module.exports = sumAll;
