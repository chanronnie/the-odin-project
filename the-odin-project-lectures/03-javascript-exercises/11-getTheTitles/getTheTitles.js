const getTheTitles = function (bookArray) {
  // METHOD 1
  // let titles = [];
  // for (let book in bookArray) {
  //   titles.push(bookArray[book]["title"]);
  // }
  // return titles;

  // METHOD 2
  return bookArray.map((book) => book.title);
};

// Do not edit below this line
module.exports = getTheTitles;
