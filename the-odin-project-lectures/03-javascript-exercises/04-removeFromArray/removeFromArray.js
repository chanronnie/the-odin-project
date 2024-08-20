const removeFromArray = function (array, ...args) {
  // Rest Parameters: Syntax that allows the function to accept a list of an infinite number of arguments [...args]
  // Filter function: filter out elements that satisfies the condition
  return array.filter((element) => !args.includes(element));
};

// Do not edit below this line
module.exports = removeFromArray;
