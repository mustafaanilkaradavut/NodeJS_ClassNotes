"use strict";

/* -------------------------------------------------------------------------- */
//..                           EXPRESS & ROUTUNGS                             */
/* -------------------------------------------------------------------------- */

//__ https://expressjs.com/
//__ npm i express dotenv

const express = require("express");
const app = express();

//? Express olmadan URL sorgulama yöntemi aşağıdaki gibidir :
// http.createServer((req, res) => {
//     if (req.url = '/') {
//         if (req.method == 'GET') {
//         } else {
//         }
//     } else if (req.url = '/second') {
//     }
// })

//? Express ile URL sorgulama :
app.get("/", (req, res) => {
  res.end("app.get is working");
});
app.post("/", (req, res) => {
  res.end("app.post is working");
});
app.put("/", (req, res) => {
  res.end("app.put is working");
});
app.delete("/", (req, res) => {
  res.end("app.delete is working");
});

//? dotenv çalıştır :
require("dotenv").config();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));

/* -------------------------------------------------------------------------- */
