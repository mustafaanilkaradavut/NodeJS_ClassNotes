'use strict';
/* -------------------------------------------------------------------------- */
//-                °    EXPRESSJS - BLOG Project with Mongoose                */
/* -------------------------------------------------------------------------- */

const { User } = require('../models/userModel');

//__ Call From File :

const passwordEncrypt = require('../helpers/passwordEncrypt');

/* -------------------------------------------------------------------------- */
//__ Auth Controller :

module.exports.auth = {
   login: async (req, res) => {
      const { email, password } = req.body;

      if (email && password) {
         //, Email && Password : OK
         // const user = await User.findOne({ email: email });
         const user = await User.findOne({ email });
         if (user) {
            //, User : OK
            // console.log(user);
            if (user.password == passwordEncrypt(password)) {
               //, Password : OK
               res.send({
                  message: 'Login is succesfully',
               });
            } else {
               res.errorStatusCode = 401;
               throw new Error('Login Parameters are not true.');
            }
         } else {
            res.errorStatusCode = 401;
            throw new Error('This user not found');
         }
      } else {
         res.errorStatusCode = 401;
         throw new Error('Email and Password are Required');
      }
   },

   logout: async (req, res) => {},
};

/* -------------------------------------------------------------------------- */
