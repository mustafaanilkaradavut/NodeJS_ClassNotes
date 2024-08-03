"use strict";

/* -------------------------------------------------------------------------- */
//..                           EXPRESS & ROUTUNGS                             */
/* -------------------------------------------------------------------------- */

//__ https://expressjs.com/
//__ npm i express dotenv

const express = require("express");
const app = express();
/* -------------------------------------------------------------------------- *
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
  // res.end("app.get is working");
  // const obj = {
  //   error: false,
  //   message: "welcome",
  // };
  // res.end(JSON.stringify(obj));
  //__ Send Method :
  // res.send({
  //   error: false,
  //   message: "Welcome",
  // });

  //__ Status Method:
  // res.status(404);
  // res.send({
  //   error: false,
  //   message: "Page Not Found",
  // });

  //__ Output:
  res.status(404).send({
    error: false,
    message: "Page Not Found",
  });
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

/* -------------------------------------------------------------------------- */

//? dotenv çalıştır :
require("dotenv").config();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));

/* -------------------------------------------------------------------------- */

// app.get('/', (req, res) => { res.end('app.get is working')})
// app.post('/', (req, res) => { res.end('app.post is working')})
// app.put('/', (req, res) => { res.end('app.put is working')})
// app.delete('/', (req, res) => { res.end('app.delete is working')})

//__ ALL METHOD:
// app.all("/", (req, res) => {
//   res.end("app.all is working");
// });

//__ ROUTE METHOD:
// app.route('/')
//     .get((req, res) => { res.end('app.get is working')})
//     .post((req, res) => { res.end('app.post is working')})
//     .put((req, res) => { res.end('app.put is working')})
//     .delete((req, res) => { res.end('app.delete is working')})

/* -------------------------------------------------------------------------- */
//__ URL (path) Options:

// app.get('/', (req, res) => { res.send('Here is Main Page')}) // / == Anasayfa (home path)
// app.get('/path', (req, res) => { res.send('Here is "path" page')}) // "/path" == "/path/"

//? Express Joker karakterleri destekler: (RexExp kuralları ile aynı)
// app.get('/abc(x?)123', (req, res) => { res.send('now in here: /abc(x?)123')}) // abc123 == abcx123
// app.get('/abc(x+)123', (req, res) => { res.send('now in here: /abc(x+)123')}) // abcx..x123
// app.get('/abc123(x+)', (req, res) => { res.send('now in here: /abc123(x+)')}) // abcx..x123
// app.get('/abc*123', (req, res) => { res.send('now in here: /abc*123')}) // abc123 == abc(ANY)123

//? Express RegularExpression destekler:
// app.get(/xyz/, (req, res) => { res.send('now in here: /xyz/')}) // içinde xyz geçen url'yi kabul et.
// app.get(/xyz$/, (req, res) => { res.send('now in here: /xyz$/')}) // xyz ile biten url'yi kabul et.
// app.get(/^\/xyz/, (req, res) => { res.send('now in here: /^\/xyz/')}) // xyz ile biten url'yi kabul et.

/* -------------------------------------------------------------------------- */