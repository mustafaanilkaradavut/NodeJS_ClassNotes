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

//__ AsyncErrors to errorHandler:
require("express-async-errors");

// app.all("/", (req, res) => {
//   res.send("WELCOME TODO API");
// });

/* -------------------------------------------------------------------------- */

//- SEQUELIZE :
// $ npm i sequelize sqlite3

const { Sequelize, DataTypes } = require("sequelize");

//! Connection  Object:

// const sequelize = new Sequelize("sqlite:./db.sqlite3");
// const sequelize = new Sequelize("sqlite:" + process.env.SQLITE);
const sequelize = new Sequelize(
  "sqlite:" + (process.env.SQLITE || "./db.sqlite3")
);

//! Sequelize Model:

//* Her bir model veritabanında bir tabloya karşılık gelir.
//sequelize.define("tableName", { ...colums });
const Todo = sequelize.define("todos", {
  //, ID sütunu belirtmemize gerek yoktur. Sequelize ID sütununu otomatik oluşturur.
  // id: {
  //   type: DataTypes.INTEGER, //, DataType // Sütun veri tipi
  //   allowNull: false, // default: true //, Sütun verisi boş olabilir mi?
  //   unique: true, // default: false //, Benzersiz kayıt mı?
  //   defaultValue: " ", //, Kayıt eklendiğinde default olarak ne yazsın ?
  // primaryKey: true, // defatult: false //, Tablonun her bir kaydını ifade eden benzersiz bir numara
  // autoIncrement: true, // default: false //, Sütun değeri her bir kayıtta otomatik olarak +1 artsın mı?
  // comment: "We can add comment",
  // field: "custom_field_name",
  // },

  title: {
    type: DataTypes.STRING(256), // varchar(256)
    allowNull: false,
  },

  description: DataTypes.TEXT, // ShortHand

  priority: {
    // 1:High,  0:Normal,  -1:Low
    type: DataTypes.TINYINT,
    defaultValue: false,
    defaultValue: 0,
  },

  isDone: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },

  //, createAt ve updateAt tanımlamaya gerek yok. Otomatik oluşturulur.
});

//__ Syncronization :

// Modelleri veri tabanına uygula:
// sequelize.sync(); //, CREATE TABLE    -     Sonradan yapılan değişikleri algılamaz. Mevcut tabloyu değiştir komutu vermemiz lazım.
// sequelize.sync({ force: true }); //, DROP TABLE & CREATE TABLE
// sequelize.sync({ alter: true }); //, TO BACKUP % DROP TABLE & CREATE TABLE & FORM BACKUP
//? senkronizasyonu bir kere yaptıktan sonra yoruma kalmak gerekir. Hatalara sebep olabilme ihtimali vardır.

//__ Connect to DB :
// Veri tabanına bağlan ve işlem yapmaya hazır ol demiş oluruz.

sequelize
  .authenticate()
  .then(() => console.log("* DB Connected *"))
  .catch(() => console.log("* DB Not Connected *"));

/* -------------------------------------------------------------------------- */

//- ROUTER :

const router = express.Router();

//.. LIST TODOS:
router.get("/", async (req, res) => {
  // const data = await Todo.findAll()
  const data = await Todo.findAndCountAll(); //, Verileri hem getir hem say demiş oluruz.

  res.status(200).send({
    error: false,
    result: data,
  });
});

//! CRUD: Create Read Update Delete

//.. CREATE TODO:
router.post("/", async (req, res) => {
  // const receivedData = req.body
  // console.log(receivedData)

  // const data = await Todo.create({
  //     title: receivedData.title,
  //     description: receivedData.description,
  //     priority: receivedData.priority,
  //     isDone: receivedData.isDone
  // })
  // console.log(data)

  const data = await Todo.create(req.body);
  // console.log(data)

  res.status(201).send({
    error: false,
    result: data.dataValues,
  });
});

//.. READ TODO:
router.get("/:id", async (req, res) => {
  // const data = await Todo.findOne({ where: { id: req.params.id } }); //, olması gereken budur.
  const data = await Todo.findByPk(req.params.id);

  res.status(200).send({
    error: false,
    result: data,
  });
});

//.. UPDATE TODO:
router.put("/:id", async (req, res) => {
  // const data = await Todo.update({ ...newData }, { ...filter });
  const data = await Todo.update(req.body, { where: { id: req.params.id } });
  // console.log(data);

  res.status(202).send({
    error: false,
    result: data,
    message: data[0] >= 1 ? "Updated" : "Can not be updated.",
    new: await Todo.findByPk(req.params.id), // Güncellenmiş kaydı göster.
  });
});

//.. DELETE TODO:
router.delete("/:id", async (req, res) => {
  // const data = await Todo.destroy({ ...filter });
  const data = await Todo.destroy({ where: { id: req.params.id } });
  console.log(data);

  // res.status(204).send({
  //   error: false,
  //   result: data,
  //   message: data >= 1 ? "Deleted." : "Can not Deleted",
  // });

  if (data >= 1) {
    //, Deleted
    // res.status(204).send({
    //   error: false,
    //   result: data,
    //   message: "Deleted",
    // });

    //, sadece status code çıktısı ver:
    res.sendStatus(204);
  } else {
    //, Not Deleted
    // res.status(404).send({
    //   error: true,
    //   result: data,
    //   message: "Can not be Deleted",
    // });

    //, Send to ErrorHandler:
    res.errorStatusCode = 404;
    throw new Error("Can not Deleted. Maybe already deleted.");
  }
});

app.use(router);

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
