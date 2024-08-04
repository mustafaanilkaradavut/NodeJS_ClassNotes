"use strict";

/* -------------------------------------------------------------------------- */
//..                         EXPRESSJS - MIDDLEWARES                          */
/* -------------------------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* -------------------------------------------------------------------------- */
//__ Middleware functions must be has three parameters.
//__ Last parameter is for next().

//? Middleware:

//* Geçebilirsiniz - geçemezsin gibi parametreleri kullanmamızı sağlayan next'tir.
app.get("/", (req, res, next) => {
  console.log("Middleware is working");

  //__ Next işlemi bir sonraki route'a havale eder.
  // next();

  //__ next bir sonraki route gideceği için sonrasının bir önemi yok.
  // res.send({
  //   message: "middleware",
  // });

  if (req.query.courseName == "clarusway") {
    next();
  } else {
    res.send({
      message: "Course name is wrong",
    });
  }
});

//? Route - Path:
app.get("/", (req, res) => {
  console.log("Route-Path is working");

  res.send({
    message: "Hellod Middleware",
  });
});

/* -------------------------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
