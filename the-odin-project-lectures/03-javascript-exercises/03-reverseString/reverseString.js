const reverseString = function (word) {
  // Method 1
  // let reversed = "";
  // for (let i = word.length - 1; i >= 0; i--) {
  //   reversed += word.charAt(i);
  // }
  // return reversed;

  // Method 2
  return word.split("").reverse().join("");
};

//Do not edit below this line
module.exports = reverseString;
