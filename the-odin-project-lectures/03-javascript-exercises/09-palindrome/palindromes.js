const palindromes = function (word) {
  // 1. Remove whitespace and punctuations & convert to lower case
  const cleaned = word.replaceAll(/[^\w]+/g, "").toLowerCase();

  // 2. Check front and back character
  let isSame = true;
  const wordLength = cleaned.length;
  for (let i = 0; i < wordLength; i++) {
    const front = cleaned.charAt(i);
    const back = cleaned.charAt(wordLength - 1 - i);
    if (front !== back) {
      isSame = false;
      break;
    }
  }

  return isSame;
};

// Do not edit below this line
module.exports = palindromes;
