"use strict";
//.. npm init -y
//.. nodemon

//! --------------------------------- NODE JS -------------------------------- */

//? HTTP SERVER:

const http = require("node:http"); // BuiltIn Module.
const { stringify } = require("node:querystring");
/* -------------------------------------------------------------------------- *

// http.createServer( (request, response)=>{...}) //* Sıralama önemlidir önce request sonra response gelir.

//* App adlı değişkeni bir server haline getiririz.

const app = http.createServer((request, response) => {
  response.end("Hello World");
  console.log("Console Print");
});

// Default server (local domain) = localhost
// Default server IP (local IP) = 128.0.0.1
app.listen(8000, () => console.log("Server started: http://127.0.0.1:8000"));

/* -------------------------------------------------------------------------- *

const app = http.createServer((req, res) => {
  if (req.url == "/") {
    res.end("Main Page");
  } else if (req.url == "/second") {
    res.end("Second Page");
  } else {
    res.end("Any Page");
  }
});

app.listen(8000, () => console.log("http://127.0.0.1:8000"));

/* -------------------------------------------------------------------------- *

const app = http
  .createServer((req, res) => {
    if (req.url == "/") {
      res.end("Main Page");
    } else if (req.url == "/second") {
      res.end("Second Page");
      // console.log(req);  //__ Detaylı bilgileri görmek için yazarız.
    } else {
      res.end("Any Page");
    }
  })
  .listen(8000, () => console.log("http://127.0.0.1:8000"));

/* -------------------------------------------------------------------------- */

const app = http
  .createServer((req, res) => {
    if (req.url == "/api") {
      // res.end("API"); //__ res.end işlemi blocklar. Devam eden kodlar çalışmaz.

      // res.write("Writing - 1");
      // res.write("Writing - 2");
      // res.write("Writing - 3");
      // res.write("Writing - 4");
      // res.end();

      // console.log(req.method); //__ GET, POST gibi işlemlerden hangisinin çalıştığını gösterir.

      if (req.method == "GET") {
        //__ res.writeHead ile response kısmındaki düzenlemeleri gerçekleştirebiliriz. ( multi headers )
        res.setHeader("title", "value"); //__ setHeader (single headers)
        res.writeHead(400, "Wrong Process", {
          //__ sonda olması gerekiyor. single öncelikli.
          "multi-header": "test",
        });

        const obj = {
          result: true,
          message: "Hello World",
        };
        // res.write(obj); //* Bu şekilde yazamayız. Aşağıdaki gibi yapmalıyız.
        res.write(JSON.stringify(obj));
        res.end();
      } else {
        res.end("Wrong Method");
      }
    } else {
      res.end("HTML");
    }
  })
  .listen(8000, () => console.log("http://127.0.0.1:8000"));
