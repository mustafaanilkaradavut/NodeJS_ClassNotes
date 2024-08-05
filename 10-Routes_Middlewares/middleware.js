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

// app.get("/", (req, res, next) => {
//   console.log("middleware is working");

//__ Bir sonraki controller'a data gönderme:
// req:
// req.message = "Hello world from middleware";
// res:
//   if (req.query.course == "clarusway") {
//     res.message = "You are in the correct place";
//   } else {
//     res.message = "Are you doing true ?";
//   }
//   next();
// });

//? Route-Path:
// app.get("/", (req, res) => {
//   console.log("route-path is working.");

//   res.send({
//     // message: req.message
//     message: res.message,
//   });
// });

/* -------------------------------------------------------------------------- */

app.get("/", (req, res, next) => {
  console.log("middleware-1 is working.");
  req.message1 = "middleware-1";
  next();
});
app.get("/", (req, res, next) => {
  console.log("middleware-2 is working.");
  req.message2 = "middleware-2";
  next();
});
app.get("/", (req, res, next) => {
  console.log("middleware-3 is working.");
  req.message3 = "middleware-3";
  next();
});
app.get("/", (req, res, next) => {
  console.log("middleware-4 is working.");
  req.message4 = "middleware-4";
  next();
});

//? Route-Path:
app.get("/", (req, res) => {
  res.send({
    message: "There is not any problem.",
    message1: req.message1,
    message2: req.message2,
    message3: req.message3,
    message4: req.message4,
  });
});

/* -------------------------------------------------------------------------- */

// app.get('/', (req, res, next) => {
//     console.log('middleware-1 is working.')
//     next()
// })

//* Ayrı bir fonksiyon olarak yazabilir, bu sayede başka bir dosyada çağırabiliriz.
// const middleware1 = (req, res, next) => {
//     console.log('middleware-1 is working.')
//     next()
//     next('route')
// }

// const middleware2 = (req, res, next) => {
//     console.log('middleware-2 is working.')
//     next()
// }

// app.get('/', middleware1)
//? use ile middleware çağırabiliriz:
// app.use(middleware1)
// app.use(middleware2)
//? Tek use içinde virgülle ayırıp kullanabiliriz:
// app.use(middleware1, middleware2)
// app.use(middleware2, middleware1)
//? Array içinde çağırabiliz:
// app.use([middleware1, middleware2])
//? URL'ye özel middlewares:
// app.use('/test', [middleware1, middleware2]) // use() methodu all() methodu gibi tüm methodlara izin verir.
// app.get('/test', [middleware1, middleware2]) // sadece get() için çalışır
//? Middlewareleri direk route-controller öncesinde de çağırabiliriz:
// app.all('/*', [middleware1, middleware2], (req, res) => {

//     res.send({
//         message: 'Sorun yok.',
//     })

// })
// app.get('/*', (req, res) => {

//     res.send({
//         message: 'next(route).',
//     })

// })

/* -------------------------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
