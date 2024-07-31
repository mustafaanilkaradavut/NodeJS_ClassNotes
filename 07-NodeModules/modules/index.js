"use strict";
/* -------------------------------------------------------------------------- */

// console.log("Module index started");

/* -------------------------------------------------------------------------- */
//.. Export

// function test() {
//   console.log("Test function is working");
// }
// module.exports = test;

//* Shorthand
// module.exports = function test() {
//     console.log("Test function is working");
//   }

/* -------------------------------------------------------------------------- *

function test1() {
  console.log("Test-1 Working");
}
function test2() {
  console.log("Test-2 Working");
}
function test3() {
  console.log("Test-3 Working");
}

module.exports = [test1, test2, test3]; //? Array Export -> Destructuring

//* Object Export
module.exports = {
 test1: test1,
 test2: test2,
 test3: test3,
 };

? ShortHand:
module.exports = {
  test1,
  test2,
  test3,
};

Object Export -2:
 module.exports.test1 = test1
 module.exports.test2 = test2
 module.exports.test3 = test3

/* -------------------------------------------------------------------------- *

.. Module export -> function expression

 Object Export -3:

module.exports.test1 = function () {
  console.log("test1 working.");
};

module.exports.test2 = function () {
  console.log("test2 working.");
};

module.exports.test3 = function () {
  console.log("test3 working.");
};

module.exports.newVar = "new-value";

/* -------------------------------------------------------------------------- */

//? Object Export -4:

module.exports = {
  test1: function () {
    console.log("test1 working.");
  },

  test2: function () {
    console.log("test2 working.");
  },

  test3: function () {
    console.log("test3 working.");
  },

  newVar: "extra value",
};
