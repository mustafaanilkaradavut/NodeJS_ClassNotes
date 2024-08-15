"use strict";
/* -------------------------------------------------------------------------- */
//-                °    EXPRESSJS - BLOG Project with Mongoose                */
/* -------------------------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */

//__ Accept JSON:
app.use(express.json());

//? DB CONNECTION:
// const dbConnection = require("./src/dbConnection");
// dbConnection();
require("./src/dbConnection")();

// Catch error from async:
require("express-async-errors");

//__ Catch Errors:
app.use(require("./src/errorHandler"));

/* ------------------------------------------------------- */

app.all("/", (req, res) => {
  res.send("WELCOME TO BLOG API");
});

/* -------------------------------------------------------------------------- */

//__ Routes :

app.use("/blog", require("./src/routes/blogRouter"));

/* -------------------------------------------------------------------------- */

app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));

/* -------------------------------------------------------------------------- */

//! Intallation

//, npm init -y
//, npm i express dotenv express-async-errors
//, echo PORT=8000 > .env
//, npm i mongoose

//! Process :

//, models -> controller -> routes -> index
