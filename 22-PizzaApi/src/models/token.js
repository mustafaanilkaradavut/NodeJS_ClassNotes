'use strict';
/* -------------------------------------------------------------------------- */
//-                     | FULLSTACK TEAM | NODEJS / EXPRESS |                 */
/* -------------------------------------------------------------------------- */

const { mongoose } = require('../configs/dbConnection');

/* ------------------------------------------------------- */

const TokenSchema = mongoose.Schema(
   {
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'user',
         required: true,
         unique: true,
         index: true,
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

//, Model :

module.exports = mongoose.model('Token', TokenSchema);
