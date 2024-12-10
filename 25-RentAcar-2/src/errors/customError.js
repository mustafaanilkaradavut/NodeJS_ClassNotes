'use strict';
/* -------------------------------------------------------------------------- */
//-                                 RENT A CAR                                */
/* -------------------------------------------------------------------------- */

class CustomError extends Error {
   constructor(mesage, statusCode) {
      super(message);
      this.statusCode = statusCode || 500;
   }
}

module.exports = CustomError;
