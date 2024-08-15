'use strict';
/* -------------------------------------------------------------------------- */
//-                °    EXPRESSJS - BLOG Project with Mongoose                */
/* -------------------------------------------------------------------------- */

const mongoose = require('mongoose');

/* -------------------------------------------------------------------------- */
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    firstName: String,
    lastName: String,
  },
  {
    collection: 'users',
    timestamps: true,
  }
);

/* -------------------------------------------------------------------------- */

// module.exports = mongoose.model('User', UserSchema); // Direct
module.exports.User = mongoose.model('User', UserSchema); // In Object
