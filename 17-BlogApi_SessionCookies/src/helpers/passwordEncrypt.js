'use strict';
/* -------------------------------------------------------------------------- */
//-                °    EXPRESSJS - BLOG Project with Mongoose                */
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
module.exports  = function (password) {
  return crypto
    .pbkdf2Sync(password, keyCode, loopCount, charCount, encType)
    .toString('hex');
};

/* -------------------------------------------------------------------------- */