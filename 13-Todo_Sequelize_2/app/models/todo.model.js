"use strict";

/* -------------------------------------------------------------------------- */
//-                   EXPRESSJS - TODO Project with Sequelize                  */
/* -------------------------------------------------------------------------- */
//? $ npm i sequelize sqlite3

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

//! Module Export:
module.exports = Todo;
