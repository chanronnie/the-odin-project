const fibonacci = function (memberIndex) {
  // Handle invalid parameters
  if (memberIndex < 0 || !Number.isInteger(memberIndex)) return "OOPS";
  if (memberIndex === 0) return 0;

  let array = [0, 1];
  for (let i = 2; i <= memberIndex; i++) {
    array.push(array[i - 1] + array[i - 2]);
  }
  return array[memberIndex];
};

// Do not edit below this line
module.exports = fibonacci;
