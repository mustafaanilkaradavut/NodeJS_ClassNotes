"use strict";

/* -------------------------------------------------------------------------- */
//__                                 DOTENV                                   */
/* -------------------------------------------------------------------------- */
//* package.jsob -> "main" -> change to index.js

//__ $ npm i dotenv

// dotenv start:  //? nodemon index ----> then;
require("dotenv").config();

// console.log(process.env)
console.log(process.env.HOST);
console.log(process.env.PORT);
console.log(process.env.EXTRA);

console.log("Index is working");
