"use strict";
/* -------------------------------------------------------------------------- */
//..                           EXPRESSJS - ROUTING                            */
/* -------------------------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* -------------------------------------------------------------------------- */
//? "Router" is special app for URL control in ExpressJS.

// app.get("/", (req, res) => {
//   res.send({
//     message: "Hello World",
//   });
// });

//__ express.Router():
// const router = express.Router();

// router.get("/", (req, res) => {
//   res.send({
//     message: "Home Page",
//   });
// });

// router.get("/path", (req, res) => {
//   res.send({
//     message: "Path Page",
//   });
// });

// router.post("/", (req, res) => {
//   res.send({
//     message: "Post Page",
//   });
// });

// router.put("/", (req, res) => {
//   res.send({
//     message: "Put Page",
//   });
// });

// router.delete("/", (req, res) => {
//   res.send({
//     message: "Delete Page",
//   });
// });

// router
//   .route("/")
//   .get((req, res) => {
//     res.send("get");
//   })
//   .get((req, res) => {
//     res.send("get");
//   });

//? Router tanımlandıktan sonra app.use() tanımlaması yaparız.
// app.use(router);

// const router = require("./routes/");
// app.use(router);
//* Kısa Yolu :
// app.use(require("./routes/"));
//* Eğer hespinin başına /test getireceksek bunun yolu :
app.use("/test", require("./routes/"));
/* -------------------------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
