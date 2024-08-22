'use strict';
/* -------------------------------------------------------------------------- */
//-                         EXPRESSJS - PERSONNEL API                         */
/* -------------------------------------------------------------------------- */

const { mongoose } = require('../configs/dbConnection');

/* -------------------------------------------------------------------------- */

const DepartmentSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         trim: true,
         required: true,
         unique: true,
      },
   },
   { collection: 'departments', timestamps: true }
);

module.exports = mongoose.model('Depertment', DepartmentSchema);
