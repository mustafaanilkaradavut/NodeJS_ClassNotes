'use strict';
/* -------------------------------------------------------------------------- */
//-                     | FULLSTACK TEAM | NODEJS / EXPRESS |                 */
/* -------------------------------------------------------------------------- */
/*
   $ cp .env-sample .env
   $ npm init -y
   $ npm i express dotenv mongoose express-async-errors
   $ npm i morgan swagger-autogen swagger-ui-express redoc-express
   $ npm install -D nodemon -----       "dev": "nodemon index.js"
   $ mkdir logs
   $ nodemon
*/
const express = require('express');
const app = express();

/* ------------------------------------------------------- */
//__ Required Modules:

// envVariables to process.env:
require('dotenv').config();
const PORT = process.env?.PORT || 8000;

// asyncErrors to errorHandler:
require('express-async-errors');

/* ------------------------------------------------------- */

//__ Configrations:

// Connect to DB:
const { dbConnection } = require('./src/configs/dbConnection');
dbConnection();

/* ------------------------------------------------------- */

//__ Middlewares:

// Accept JSON:
app.use(express.json());

// Logger:
app.use(require('./src/middlewares/logger'));

// Auhentication:
app.use(require('./src/middlewares/authentication'));

// findSearchSortPage / res.getModelList:
app.use(require('./src/middlewares/queryHandler'));

/* ------------------------------------------------------- */

//__ Routes:

// routes/index.js:
app.use('/', require('./src/routes/'));

// HomePath:
app.all('/', (req, res) => {
   res.send({
      error: false,
      message: 'Welcome to PIZZA API',
      docs: {
         swagger: '/documents/swagger',
         redoc: '/documents/redoc',
         json: '/documents/json',
      },
      user: req.user,
   });
});

/* ------------------------------------------------------- */

// errorHandler:
app.use(require('./src/middlewares/errorHandler'));

// RUN SERVER:
app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')() // !!! It clear database.
