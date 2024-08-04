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
//__ URL Parameters:

// app.get("/*", (req, res) => {
//   res.send({
//     url: {
//       protocol: req.protocol,
//       secure: req.secure,
//       hostname: req.hostname,
//       // baseUrl: req.baseUrl, // artık req.url geçerli
//       params: req.params,
//       query: req.query, // Sadece query verir. (path vermez.)
//       path: req.path, // Sadece subfolder (/name/name1/name2) verir. (query vermez)
//       originalUrl: req.originalUrl, // URL'yi tümüyle verir.
//       url: req.url, // Router URL'sini verir.
//     },
//   });
// });

/* -------------------------------------------------------------------------- */
//__ URL User Path:    (URL'de gönderdiğimiz user'ı yakalamak)

// app.get("/user/:userId/config/:process", (req, res) => {
//   res.send({
//     userId: req.params.userId,
//     process: req.params.process,
//     url: {
//       params: req.params,
//     },
//   });
// });

// app.get('/user/:userId([0-9]+)', (req, res) => {
app.get("/user/:userId(\\d+)", (req, res) => {
  res.send({
    path: req.path,
    userId: req.params.userId,
    abc: req.query.abc,
  });
});

/* -------------------------------------------------------------------------- */
//__ Response.Methods:

//? sendStatus():
// app.get('/', (req, res) => { res.sendStatus(404) })
//? status():
// app.get('/', (req, res) => { res.status(200).send({ message: 'OK' }) })
// app.post('/', (req, res) => { res.status(201).send({ message: 'Created' }) })
// app.put('/', (req, res) => { res.status(202).send({ message: 'Updated' }) })
// app.patch('/', (req, res) => { res.status(202).send({ message: 'Updated' }) })
// app.delete('/', (req, res) => { res.status(204).send({ message: 'Deleted' }) })
//? json() (send() methodunu kullanabiliriz)
// app.get('/', (req, res) => { res.json({ message: 'OK' }) })
//? download():
// app.get('/download', (req, res) => { res.download('./readme.md') })
// app.get('/download', (req, res) => { res.download('./readme.md', 'newName.txt') })
//? sendFile():
// console.log(__dirname)
// app.get('/package', (req, res) => { res.sendFile(__dirname + '/package.json') }) //* dosya yolu TAM (gerçek) olmalı
//? redirect()
app.get("/clarusway", (req, res) => {
  res.redirect("https://clarusway.com");
}); // Varsayılan 302'dir
// app.get('/301', (req, res) => { res.redirect(301, 'https://clarusway.com') }) //* Kalıcı yönlendirme yapar. Hafızada tutar.
// app.get('/302', (req, res) => { res.redirect(302, 'https://google.com') }) //* Geçici yönlendirme yapar.
