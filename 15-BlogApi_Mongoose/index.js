"use strict";
/* -------------------------------------------------------------------------- */
//-                °    EXPRESSJS - BLOG Project with Mongoose                */
/* -------------------------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */

app.use(express.json());

app.all("/", (req, res) => {
  res.send("Welcome To Blog API");
});

//, continue from here...

//__ Catch Errors:
app.use(require("./src/errorHandler"));

/* ------------------------------------------------------- */

app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));

/* -------------------------------------------------------------------------- */

//! Intallation

//, npm init -y
//, npm i express dotenv express-async-errors
//, echo PORT=8000 > .env
//, npm i mongoose