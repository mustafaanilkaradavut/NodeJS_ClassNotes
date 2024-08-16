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
const loopCount = 10000; // Döngü sayısı
const charCount = 32; // write 32 for 64
const encType = 'sha412'; // Şifreleme algoritması

//? Return encrypt password :
const passwordEncrypt = function (password) {
  return crypto.pbkdf2Sync(password, keyCode, loopCount, charCount, encType);
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
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'Password is required'],
      set: (password) => {
        return 'anil';
      }, // Veri kaydederken return edilen data kaydedilir.
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
