const findTheOldest = function (people) {
  let maxAge = 0;
  let oldest;

  people.map((person) => {
    // Compute age
    if ("yearOfDeath" in person) {
      person.age = person.yearOfDeath - person.yearOfBirth;
    } else {
      let date = new Date();
      person.age = date.getFullYear() - person.yearOfBirth;
    }

    // Compare the age
    if (person.age > maxAge) {
      maxAge = person.age;
      oldest = person;
    }
  });

  return oldest;
};

// Do not edit below this line
module.exports = findTheOldest;
