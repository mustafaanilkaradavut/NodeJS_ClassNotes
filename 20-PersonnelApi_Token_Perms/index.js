'use strict';
/* -------------------------------------------------------------------------- */
//-                         EXPRESSJS - PERSONNEL API                         */
/* -------------------------------------------------------------------------- */

/*
   $ npm i express dotenv mongoose express-async-errors
   $ npm i -D nodemon
   $ npm run dev
   $ npm i cookie-session
   $ npm i jsonwebtoken
*/

const express = require('express');
const { dbConnection } = require('./src/configs/dbConnection');
const app = express();

/* -------------------------------------------------------------------------- */
// continue from here...
// envVariables to process.env:
require('dotenv').config();
const PORT = process.env?.PORT || 8000;

// asyncErrors to errorHandler:
require('express-async-errors');

/* -------------------------------------------------------------------------- */
//? db connection:
dbConnection();

//? body parser:
app.use(express.json());

//__ httpOnly:true XSS Cross Site Scripting  - - -> Cookie'leri güvenli hale getirmek için yaparız.
app.use(
   require('cookie-session')({
      name: 'session',
      secret: process.env.SECRET_KEY,
      cookie: {
         secure: !(process.env.NODE_ENV == 'development'),
         httpOnly: false,
         maxAge: 24 * 60 * 60 * 1000,
      },
   })
);

//.. res.getModelList():
app.use(require('./src/middlewares/findSearchSortPage'));

//? HomePath:
app.all('/', (req, res) => {
   res.send({
      error: false,
      message: 'Welcome to PERSONNEL API',
      session: req.session,
      isLogin: req.isLogin,
   });
});

//.. Departments
app.use('/departments', require('./src/routes/department.router'));

//.. Personnels
app.use('/personnels', require('./src/routes/personnel.router'));

//.. not found routes
app.all('*', async (req, res) => {
   res.status(404).send({
      error: true,
      message: 'Route not available',
   });
});

//? errorHandler:
app.use(require('./src/middlewares/errorHandler'));

//? RUN SERVER:
app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT));

/* -------------------------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()

// if (process.env.NODE_ENV == 'development') {
//    // return;
//    require('./src/helpers/dataCreate')()
//       .then((res) => console.log('Data synched'))
//       .catch((err) => console.error('Data could not synched'));
// }
