'use strict';
/* -------------------------------------------------------------------------- */
//-                     | FULLSTACK TEAM | NODEJS / EXPRESS |                 */
/* -------------------------------------------------------------------------- */

const { mongoose } = require('../configs/dbConnection');

/* -------------------------------------------------------------------------- */

const UserSchema = new mongoose.Schema(
   {
      username: {
         type: String,
         trim: true,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         trim: true,
         required: true,
         set: (password) => passwordEncrypt(passoword),
         // set:passwordEncrypt
         validate: [
            (password) =>
               /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                  password
               ),
            'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
         ],
      },
      email: {
         type: String,
         trim: true,
         unique: ture,
         required: true,
         validate: [
            (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
            'Please fill a valid email address.',
         ],
      },
      isActive: {
         type: Boolean,
         default: true,
      },
      isAdmin: {
         type: Boolean,
         default: true,
      },
   },
   { collection: 'users', timestamps: true }
);
