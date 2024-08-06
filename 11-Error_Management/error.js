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

// app.get("/user/:id", (req, res) => {
// Hata gönder ve sistemi kilitle ( kodlar işlemeye devam etmez ) // Block Code
// throw new Error("Eror ! Something went wrong.");

// res.send({
//   id: req.params.id,
//   message: "Hello World",
// });

//   if (isNaN(req.params.id)) {
//     throw new Error("ID parameter should be number!");
//   } else {
//     res.send("ID is correct");
//   }
// });

/* -------------------------------------------------------------------------- */
//__ TRY - CATCH :

app.get("/user/:id", function (req, res, next) {
  try {
    if (isNaN(req.params.id)) {
      throw new Error("ID parameter should be number");
    } else {
      res.status(200).send({
        error: false,
        message: "ID is correct. Everything is OK",
      });
    }
  } catch (err) {
    //? Hata oluşursa catch() çalışır ve hata err parametresi ile gönderilir.
    //? next(error) ile hatayı errorHandler'a gönderebiliriz.
    next(err);

    res.status(400).send({
      error: true,
      message: err.message,
    });
  }
});

/* -------------------------------------------------------------------------- */
//__ ASYNC :

// const asyncFunction = async () => {
//   throw new Error("async-error");
// };

// app.get("/async", async (req, res, next) => {
//   await asyncFunction()
//     .then() // Çıktıda hata yok.
//     .catch((err) => {
//       next(err);
//     }); // Çıktıda hata var.
// });

/* -------------------------------------------------------------------------- */
//__ express-async-errors
//,, $ npm i express-async-errors

//,, Async fonksiyonlardaki hataları errorHandler'a yönlendir:
require("express-async-errors");

const asyncFunction = async () => {
  throw new Error("async-error");
};

app.get("/async", async (req, res, next) => {
  // await asyncFunction();
  res.errorStatusCode = 400;
  throw new Error("async-error", {
    cause: "It's a error in async function ",
  });
});

/* -------------------------------------------------------------------------- */
//- ErrorHandler 4 parametreli olmak zorunda. Hata yakalayıcı parametre 1. parametredir.
//- ErrorHandler en sonda yer almalı (sayfanın en altında)

const errorHandler = (error, req, res, next) => {
  console.log("ErrorHandler is working.");

  const statusCode = res?.errorStatusCode || 500;

  res.status(statusCode).send({
    error: true,
    message: error.message, // Hata mesajı
    cause: error.cause, // Hata neden oluştu ({ cause: '' })
    stack: error.stack, // Hata orjinal çıktısı
  });
};

// Error handler son middleware olmalı.
app.use(errorHandler);

/* -------------------------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
