"use strict";
/* -------------------------------------------------------------------------- */
//-                °    EXPRESSJS - BLOG Project with Mongoose                */
/* -------------------------------------------------------------------------- */

//! Mongoose
//! $ npm i mongoose

const mongoose = require("mongoose");

const dbConnection = async () => {
  mongoose
    .connect(process.env?.MONGODB || "mongodb://localhost:27017/blogAPI")
    .then(() => console.log("* DB Connected"))
    .catch(() => console.log("DB Not Connected"));
};
module.exports = dbConnection;
