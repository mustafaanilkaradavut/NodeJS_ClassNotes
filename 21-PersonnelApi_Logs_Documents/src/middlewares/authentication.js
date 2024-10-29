'use strict';
/* -------------------------------------------------------------------------- */
//-                         EXPRESSJS - PERSONNEL API                         */
/* -------------------------------------------------------------------------- */

const Token = require('../models/token.model');

module.exports = async (req, res, next) => {
   req.user = null;

   // Authorization : ApiKey ... tokenKey ...
   // Authorization : Bearer ... tokenKey ...
   // Authorization : Auth ... tokenKey ...
   // Authorization : X-API-KEY ... tokenKey ...
   // Authorization : x-auth-token ... tokenKey ...
   // Authorization : Token ... tokenKey ..tokenKey

   //, Get Token From Headers :
   const auth = req.headers?.authorization || null; // Token ... tokenKey...
   const tokenKey = auth ? auth.split(' ') : null; // ['Token', '...tokenKey...'

   if (tokenKey && tokenKey[0] === 'Token') {
      const tokenData = await Token.findOne({ token: tokenKey[1] }).populate(
         'userId'
      );
      if (tokenData) req.user = tokenData.userId;
   }
   //    console.log(req.user);

   next();
};

/* -------------------------------------------------------------------------- */
