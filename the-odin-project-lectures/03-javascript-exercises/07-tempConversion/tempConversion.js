// HELPER FUNCTION
const adjustDecimal = function (number) {
  return parseFloat(number.toFixed(1));
};

// SOLUTIONS
const convertToCelsius = function (fahrenheit) {
  const celcius = ((fahrenheit - 32) * 5) / 9;
  return adjustDecimal(celcius);
};

const convertToFahrenheit = function (celcius) {
  const fahrenheit = (celcius * 9) / 5 + 32;
  return adjustDecimal(fahrenheit);
};

// Do not edit below this line
module.exports = {
  convertToCelsius,
  convertToFahrenheit
};
