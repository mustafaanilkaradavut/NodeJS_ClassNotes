'use strict';
/* -------------------------------------------------------------------------- */
//-                °    EXPRESSJS - BLOG Project with Mongoose                */
/* -------------------------------------------------------------------------- */
//! Mongoose :

const mongoose = require('mongoose');

// const ModelName = new mongoose.Schema({ ...fields }, { ...settings });
// const ModelSchema = new mongoose.Schema(
//   {
//     //, PrimaryKey {_id} tanımlamaya gerek yoktur. Otomatik tanımlama yapar.
//     //, _id: Number

//     fieldName: {
//       type: String,
//       default: null, // Veri gelmediğinde yazılacak veri.
//       trim: true, // Başındaki / sonundaki boşlukları tırpar. (string)
//       unique: true, // Benzersiz kayıt.
//       index: true, // Aramalarda hızlı bir erişim sağlar.
//       // required: true, // Veri gönderimi zorunlu mu?
//       required: [true, "Bu daha mutlaka gönderilmeli."], // [Veri gönderimi zorunlu mu?, HATA MESAJI]
//       // enum: ["1", "2", "3"],
//       // enum: [1, 2, 3], // Belirli değerlenden biri olmak zorunda.
//       enum: [[1, 2, 3], "Bu değerlenden biri girilmelidir."], // Belirli değerlenden biri olmak zorunda.
//       // validate: (data) => true, // Gelen data formatının doğruluğubu kontrol etme.
//       validate: [
//         (data) => {
//           return true;
//         },
//         "Data format is not true.",
//       ], // Gelen data formatının doğruluğubu kontrol etme.
//       get: (data) => data, // Bu veriye erişilmek istendiğinde otomatik çalışacak fonksiyon.
//       set: (data) => data, // Bu field'a veri kaydedilmek istendiğinde otomatik çalışan fonksiyon.
//     },
//   },
//   {
//     collection: "tableName", // Tablo ismi
//     timestamps: true, // createAt ve updateAt otomatik yönetilir. (tanımlamaya gerek yok)
//   }
// );

// const ModelName = mongoose.model("ModelName", ModelSchema);

/* -------------------------------------------------------------------------- */
//! BlogCategory Schema :

const BlogCategorySchema = new mongoose.Schema(
  {
    // _id
    name: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    collection: 'blogCategories',
    timestamps: true,
  }
);

//, Set Model :
// const BlogCategory = mongoose.model("BlogCategory", BlogCategorySchema);

/* -------------------------------------------------------------------------- */
//! BlogPost Schema :

const BlogPostSchema = new mongoose.Schema(
  {
    // _id

    categoryId: {
      // Default Relation: ManyToOne
      type: mongoose.Schema.Types.ObjectId, // Mongoose kütüphanesinden alırız. // Hexadecimal Format: 'fedcba9876543210'
      ref: 'BlogCategory', // ID hangi Model'e ait. (mongoose.model('ModelName', Schema))
      required: true,
      // unique: true, // Convert to OneToOne Relation.
    },

    title: {
      type: String,
      trim: true,
      required: true,
    },

    content: {
      type: String,
      trim: true,
      required: true,
    },

    // createdAt // timestapms : true
    // updatedAt // timestamps : true
  },
  {
    collection: 'blogPosts',
    timestamps: true,
  }
);

//, Set Model :
// const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

/* -------------------------------------------------------------------------- */

module.exports = {
  BlogCategory: mongoose.model('BlogCategory', BlogCategorySchema),
  BlogPost: mongoose.model('BlogPost', BlogPostSchema),
};
