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
// app.get("/", (req, res, next) => {
//   console.log("Middleware is working");

//__ Next işlemi bir sonraki route'a havale eder.
// next();

//__ next bir sonraki route gideceği için sonrasının bir önemi yok.
// res.send({
//   message: "middleware",
// });

//   if (req.query.courseName == "clarusway") {
//     next();
//   } else {
//     res.send({
//       message: "Course name is wrong",
//     });
//   }
// });

// //? Route - Path:
// app.get("/", (req, res) => {
//   console.log("Route-Path is working");

//   res.send({
//     message: "Hellod Middleware",
//   });
// });

/* -------------------------------------------------------------------------- */

app.get("/", (req, res, next) => {
  console.log("middleware is working");

  //__ Bir sonraki controller'a data gönderme:
  // req:
  req.message = "Hello world from middleware";
  // res:
  if (req.query.course == "clarusway") {
    res.message = "You are in the correct place";
  } else {
    res.message = "Are you doing true ?";
  }
  next();
});

//? Route-Path:
app.get("/", (req, res) => {
  console.log("route-path is working.");

  res.send({
    // message: req.message
    message: res.message,
  });
});

/* -------------------------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
