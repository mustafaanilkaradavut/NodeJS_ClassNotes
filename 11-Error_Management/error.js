"use strict";

/* -------------------------------------------------------------------------- */
//..                      EXPRESSJS - ERROR MANAGEMENT                        */
/* -------------------------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* -------------------------------------------------------------------------- */
//__ THROW :

app.get("/user/:id", (req, res) => {
  // Hata gönder ve sistemi kilitle ( kodlar işlemeye devam etmez ) // Block Code
  // throw new Error("Eror ! Something went wrong.");

  // res.send({
  //   id: req.params.id,
  //   message: "Hello World",
  // });

  if (isNaN(req.params.id)) {
    throw new Error("ID parameter should be number!");
  } else {
    res.send("ID is correct");
  }
});

/* -------------------------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
