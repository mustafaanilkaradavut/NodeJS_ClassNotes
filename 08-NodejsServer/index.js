"use strict";
//.. npm init -y
//.. nodemon

//! --------------------------------- NODE JS -------------------------------- */

//? HTTP SERVER:

const http = require("node:http"); // BuiltIn Module.
/* -------------------------------------------------------------------------- */

// http.createServer( (request, response)=>{...}) //* Sıralama önemlidir önce request sonra response gelir.

//* App adlı değişkeni bir server haline getiririz.

const app = http.createServer((request, response) => {
  response.end("Hello World");
  console.log("Console Print");
});

// Default server (local domain) = localhost
// Default server IP (local IP) = 128.0.0.1
app.listen(8000, () => console.log("Server started: http://127.0.0.1:8000"));
