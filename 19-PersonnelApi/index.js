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

//.. Departments
app.use('departments', require('./src/routes/department.router'));

/* -------------------------------------------------------------------------- */
//db connection
dbConnection();

// errorHandler:
app.use(require('./src/middlewares/errorHandler'));

// RUN SERVER:
app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT));

/* -------------------------------------------------------------------------- */

// require('./src/helpers/sync')()
