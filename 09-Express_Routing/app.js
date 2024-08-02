"use strict";

/* -------------------------------------------------------------------------- */
//..                           EXPRESS & ROUTUNGS                             */
/* -------------------------------------------------------------------------- */

//__ https://expressjs.com/
//__ npm i express dotenv

const express = require("express");
const app = express();

//? dotenv çalıştır :
require("dotenv").config();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));

/* -------------------------------------------------------------------------- */
