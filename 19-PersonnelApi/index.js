'use strict';
/* -------------------------------------------------------------------------- */
//-                         EXPRESSJS - PERSONNEL API                         */
/* -------------------------------------------------------------------------- */

/*
    $ npm i express dotenv mongoose express-async-errors
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
      secret: process.env.SECRET_KEY,
      // cookie: {
      //     secure: !(process.env.NODE_ENV=="development"),
      //     httpOnly: false,
      //     maxAge: 24 * 60 * 60 * 1000,
      //   }
   })
);

//.. Departments
app.use('departments', require('./src/routes/department.router'));

//? errorHandler:
app.use(require('./src/middlewares/errorHandler'));

//? RUN SERVER:
app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT));

/* -------------------------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()
