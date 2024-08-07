"use strict";

/* -------------------------------------------------------------------------- */
//..                 EXPRESSJS - TODO Project with Sequelize                  */
/* -------------------------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* -------------------------------------------------------------------------- */

//__ Accept JSON data :

app.use(express.json());

app.all("/", (req, res) => {
  res.send("WELCOME TODO API");
});

/* -------------------------------------------------------------------------- */

//- SEQUELIZE :

const { Sequelize, DataTypes } = require("sequelize");

//! Connection  Object:

// const sequelize = new Sequelize("sqlite:./db.sqlite3");
// const sequelize = new Sequelize("sqlite:" + process.env.SQLITE);
const sequelize = new Sequelize(
  "sqlite:" + (process.env.SQLITE || "./db.sqlite3")
);

//! Sequelize Model:

//sequelize.define("tableName", { ...colums });
const Todo = sequelize.define("todos", {
  id: {
    type: DataTypes.INTEGER, //, DataType // Sütun veri tipi
    allowNull: false, // default: true // Sütun verisi boş olabilir mi?
    unique: true, // default: false // Benzersiz kayıt mı?
    defaultValue: " ", // Kayıt eklendiğinde default olarak ne yazsın ?
    // primaryKey: true, // defatult: false //, Tablonun her bir kaydını ifade eden benzersiz bir numara
    // autoIncrement: true, // default: false // Sütun değeri her bir kayıtta otomatik olarak +1 artsın mı?
    // comment: "We can add comment",
    // field: "custom_field_name",
  },
});

/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */

//__ continue from here ...

const errorHandler = (err, req, res, next) => {
  const errorStatusCode = res.errorStatusCode ?? 500;
  console.log("errorHandler worked.");
  res.status(errorStatusCode).send({
    error: true, // special data
    message: err.message, // error string message
    cause: err.cause, // error option cause
    // stack: err.stack, // error details
  });
};
app.use(errorHandler);

/* -------------------------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
