'use strict';
/* -------------------------------------------------------------------------- */
//-                °    EXPRESSJS - BLOG Project with Mongoose                */
/* -------------------------------------------------------------------------- */

const mongoose = require('mongoose');

/* -------------------------------------------------------------------------- */

//! Password Encrypt ( PBKDF2 Method )
//, https://nodejs.org/api/crypto.html#cryptopbkdf2password-salt-iterations-keylen-digest-callback

const crypto = require('node:crypto');

//__ Parameters :
const keyCode = process.env.SECRET_KEY; // Şifreleme anahtarı
const loopCount = 10000; // Döngü sayısı ---- 10_000_000_0000 olarak alt çizgi kullanarak sayıları yazabiliriz.
const charCount = 32; // write 32 for 64
const encType = 'sha512'; // Şifreleme algoritması

//? Return encrypt password :
const passwordEncrypt = function (password) {
  return crypto
    .pbkdf2Sync(password, keyCode, loopCount, charCount, encType)
    .toString('hex');
};

/* -------------------------------------------------------------------------- */

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      // unique: [true, 'Email must be unuqie'], // Not supported
      required: [true, 'Email is required'],
      // validate: (email) => {
      // Eğer return = true ise kaydeder.
      //   if (email.includes('@') && email.includes('.')) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // },

      // validate: (email) => email.includes('@') && email.includes('.'), // Short Way

      validate: [
        (email) => email.includes('@') && email.includes('.'),
        'Email Type Is Incorrect',
      ],
      // validate: (email) => { // Eğer return=true ise kaydeder.
      //     if (email.includes('@') && email.includes('.')) {
      //         return true
      //     } else {
      //         throw new Error('Email type is incorrect: ' + email)
      //     }
      // }
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'Password is required'],
      // set: (password) => passwordEncrypt(password),
      //set: passwordEncrypt, //, Veri kaydederken return edilen data kaydedilir.

      //, Set methodu validate methodundan önce çalışır. Dolayısı ile validate data her zaman aynı formattadır. (Validate yapamayız.)
      //? Uzun Yol :
      // set: (password) => {
      //   if (password.length >= 8) {
      //     return passwordEncrypt(password);
      //   } else {
      //     return 'Wrong Processes';
      //   }
      // },
      // validate: (password) => {
      //   if (password == 'Wrong Processes') {
      //     return false;
      //   } else {
      //     return true;
      //   }
      // },

      //? Kısa Yol :
      set: (password) =>
        password.length >= 8 ? passwordEncrypt(password) : 'Wrong Processes',
      validate: (password) => password != 'Wrong Processes', //* Güncelleme yaparken valiadate çalışmaz.
    },
    firstName: String,
    lastName: String,
  },
  {
    collection: 'users',
    timestamps: true,
  }
);

// module.exports = mongoose.model('User', UserSchema); //, Direct
module.exports.User = mongoose.model('User', UserSchema); //, In Object
