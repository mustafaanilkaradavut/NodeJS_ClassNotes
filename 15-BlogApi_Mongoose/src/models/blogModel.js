"use strict";
/* -------------------------------------------------------------------------- */
//-                °    EXPRESSJS - BLOG Project with Mongoose                */
/* -------------------------------------------------------------------------- */
//! Mongoose :

const mongoose = require("mongoose");

// const ModelName = new mongoose.Schema({ ...fields }, { ...settings });
const ModelSchema = new mongoose.Schema(
  {
    //, PrimaryKey {_id} tanımlamaya gerek yoktur. Otomatik tanımlama yapar.
    //, _id: Number

    fieldName: {
      type: String,
      default: null, // Veri gelmediğinde yazılacak veri.
      trim: true, // Başındaki / sonundaki boşlukları tırpar. (string)
      unique: true, // Benzersiz kayıt.
      index: true, // Aramalarda hızlı bir erişim sağlar.
      // required: true, // Veri gönderimi zorunlu mu?
      required: [true, "Bu daha mutlaka gönderilmeli."], // [Veri gönderimi zorunlu mu?, HATA MESAJI]
      // enum: ["1", "2", "3"],
      // enum: [1, 2, 3], // Belirli değerlenden biri olmak zorunda.
      enum: [[1, 2, 3], "Bu değerlenden biri girilmelidir."], // Belirli değerlenden biri olmak zorunda.
      // validate: (data) => true, // Gelen data formatının doğruluğubu kontrol etme.
      validate: [
        (data) => {
          return true;
        },
        "Data format is not true.",
      ], // Gelen data formatının doğruluğubu kontrol etme.
      get: (data) => data, // Bu veriye erişilmek istendiğinde otomatik çalışacak fonksiyon.
      set: (data) => data, // Bu field'a veri kaydedilmek istendiğinde otomatik çalışan fonksiyon.
    },
  },
  {
    collection: "tableName", // Tablo ismi
    timestamps: true, // createAt ve updateAt otomatik yönetilir. (tanımlamaya gerek yok)
  }
);

const ModelName = mongoose.model("ModelName", ModelSchema);

/* -------------------------------------------------------------------------- */
//! BlogCategory Model :
