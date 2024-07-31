"use strict";
/* -------------------------------------------------------------------------- */

// console.log("Module index started");

/* -------------------------------------------------------------------------- */
//.. Export

function test() {
  console.log("Test function is working");
}
module.exports = test;

//* Short Way
// module.exports = function test() {
//     console.log("Test function is working");
//   }

/* -------------------------------------------------------------------------- */

function test1() {
  console.log("Test-1 Working");
}
function test2() {
  console.log("Test-2 Working");
}
function test3() {
  console.log("Test-3 Working");
}

// module.exports = [test1, test2, test3]; //? Array Export -> Destructuring

module.exports = {
  test1: test1,
  test2: test2,
  test3: test3,
};

//? ShortHand:
module.exports = {
  test1,
  test2,
  test3,
};
