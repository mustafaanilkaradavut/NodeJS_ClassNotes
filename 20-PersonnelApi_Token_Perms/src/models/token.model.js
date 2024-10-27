'use strict';
/* -------------------------------------------------------------------------- */
//-                         EXPRESSJS - PERSONNEL API                         */
/* -------------------------------------------------------------------------- */

const { mongoose } = require('../configs/dbConnection');

/* -------------------------------------------------------------------------- */

//__ Token Model :

const TokenSchema = new mongoose.Schema(
   {
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Personnel', // Personnel.model kisminda ne isim verdik ona bakariz.
         required: true,
      },

      token: {
         type: String,
         trim: true,
         required: true,
         unique: true,
         index: true,
      },
   },
   {
      collection: 'tokens',
      timestamps: true,
   }
);

/* -------------------------------------------------------------------------- */

module.exports = mongoose.model('Token', TokenSchema);
