'use strict';
/* -------------------------------------------------------------------------- */
//-                °    EXPRESSJS - BLOG Project with Mongoose                */
/* -------------------------------------------------------------------------- */

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

console.log(passwordEncrypt('123456')); // c2ef87127ce40f00efa29060a5a76777993054fa879c0e377f241986b41e9ac7

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
      set: passwordEncrypt, // Veri kaydederken return edilen data kaydedilir.
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
