'use strict';
/* -------------------------------------------------------------------------- */
//-                     | FULLSTACK TEAM | NODEJS / EXPRESS |                 */
/* -------------------------------------------------------------------------- */
//.. Authentication Controller:

const Token = require('../models/token');
const User = require('../models/user');
const passwordEncrypt = require('../helpers/passwordEncrypt');
const jwt = require('jsonwebtoken');

module.exports = {
   login: async (req, res) => {
      /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = 'Login with username (or email) and password for get simpleToken and JWT'
            #swagger.parameters["body"] = {
               in: "body",
               required: true,
               schema: {
                  "username": "test",
                  "password": "aA?123456",
               }
            }
      */
      const { username, email, password } = req.body;
      if (!((username || email) && password)) {
         res.errorStatusCode = 401;
         throw new Error('username/email and password are required');
      }
      const user = await User.findOne({ $or: [{ username }, { email }] });
      if (user?.password !== passwordEncrypt(password)) {
         res.errorStatusCode = 401;
         throw new Error('incorrect username/email or password.');
      }
      if (!user.isActive) {
         res.errorStatusCode = 401;
         throw new Error('This account is not active.');
      }

      //__ Simple Token :

      let tokenData = await Token.findOne({ userId: user.id });
      if (!tokenData) {
         tokenData = await Token.create({
            userId: user.id,
            token: passwordEncrypt(user.id + Date.now()),
         });
      }

      //__ JWT Token :

      //, Access Token
      const accessData = {
         _id: user._id,
         username: user.username,
         email: user.email,
         isActive: user.isActive,
         isAdmin: user.isAdmin,
      };
      // Convert to JWT :
      // jwt.sign(payload, key { expiresIn: '30m'})  ========== Verdigimiz sureyi islemek icin buraya yazariz. Daha ozel ve korunmasi gereken bilgileri icerir.
      const accessToken = jwt.sign(accessData, process.env.ACCESS_KEY, {
         expiresIn: '30m',
      });

      //, Refresh Token
      const refreshData = {
         _id: user._id,
         password: user.password,
      };

      // Comvert to JWT :
      const refreshToken = jwt.sign(refreshData, process.env.REFRESH_KEY, {
         expiresIn: '3d',
      });

      res.send({
         error: false,
         token: tokenData.token,
         bearer: {
            access: accessToken,
            refresh: refreshToken,
         },
         user,
      });
   },

   refresh: async (req, res) => {
      /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Refresh"
            #swagger.description = 'Refresh with refreshToken for get accessToken'
            #swagger.parameters["body"] = {
               in: "body",
               required: true,
               schema: {
                  "bearer": {
                     refresh: '...refresh_token...'
                  }
               }
            }
      */

      const refreshToken = req.body?.bearer?.refresh;

      if (refreshToken) {
         const refreshData = await jwt.verify(
            refreshToken,
            process.env.REFRESH_KEY
         );
         if (refreshData) {
            const user = await User.findOne({ _id: refreshData._id });
            if (user && user.password == refreshData.password) {
               if (user.isActive) {
                  res.status(200).send({
                     error: false,
                     bearer: {
                        access: jwt.sign(
                           user.toJSON(),
                           process.env.ACCESS_KEY,
                           {
                              expiresIn: '30m',
                           }
                        ),
                     },
                  });
               } else {
                  res.errorStatusCode = 401;
                  throw new Error('This Account is not Active');
               }
            } else {
               res.errorStatusCode = 401;
               throw new Error('Wrong ID or Password');
            }
         } else {
            res.errorStatusCode = 401;
            throw new Error('JWT refresh data is wrong');
         }
      } else {
         res.errorStatusCode = 401;
         throw new Error('Please enter bearer.refresh');
      }
   },

   logout: async (req, res) => {
      /*
            #swagger.tags = ["Tokens"]
            #swagger.summary = "Create Token"
      */

      const auth = req.headers?.authorization; //"Token token"
      const tokenKey = auth ? auth.split(' ') : null; // [ "Token", tokenKey]

      if (tokenKey[0] == 'Token') {
         const result = await Token.deleteOne({ token: tokenKey });

         res.send({
            error: false,
            message: 'Token deleted. Logout was OK.',
            result,
         });
      } else if (tokenKey[0] == 'Bearer') {
         res.send({
            error: false,
            message: 'JWT: No need any proccess for logout',
         });
      }
   },
};
