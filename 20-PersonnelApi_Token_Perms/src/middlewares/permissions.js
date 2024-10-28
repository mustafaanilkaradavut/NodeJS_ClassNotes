'use strict';
/* -------------------------------------------------------------------------- */
//-                         EXPRESSJS - PERSONNEL API                         */
/* -------------------------------------------------------------------------- */

//__ Permission Control Middleware:

module.exports = {
   isLogin: (req, res, next) => {
      if (req.user && req.user.isActive) {
         next();
      } else {
         res.errorStatusCode = 403;
         throw new Error('NoPermission: You must Login');
      }
   },

   isAdmin: (req, res, next) => {
      if ((req.user && isActive && req, isAdmin)) {
         next();
      } else {
         res.errorStatusCode = 403;
         throw new Error('NoPermission: You must Login and to be Admin');
      }
   },

   isAdminOrLead: (req, res, next) => {
      if (
         req.user &&
         req.user.isActive &&
         (req.user.isAdmin || req.user.isLead)
      ) {
         next();
      } else {
         res.errorStatusCode = 403;
         throw new Error(
            'NoPermission: You must Login and to be Admin or Department Lead'
         );
      }
   },
};

/* -------------------------------------------------------------------------- */
