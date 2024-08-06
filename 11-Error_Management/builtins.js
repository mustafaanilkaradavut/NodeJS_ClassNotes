"use strict";
/* -------------------------------------------------------------------------- */
//..                    EXPRESSJS - BUILT-IN MIDDLEWARES                      */
/* -------------------------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* -------------------------------------------------------------------------- */
//__ Gelen Datayı Al :

//! Gelen JSON datayı kabul et :
app.use(express.json());
//! Gelen TEXT detayı kabul et :
app.use(express.text());
//! Gelen FORM-URL-ENCODE kabul et: <form action="">..submit..</form> :
app.use(express.urlencoded({ extended: false })); // default -> extended: true

app.all("/", (req, res) => {
  res.send({
    params: req.params, // URL'de params tanımlı olmalı.
    query: req.query,
    headers: req.headers,
    body: req.body,
  });
});

/* -------------------------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
