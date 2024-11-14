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

/* -------------------------------------------------------------------------- */

// E-MAIL
// nodemailer.com
// npm install nodemailer

const nodemailer = require('nodemailer');

//? Create Test Account
// nodemailer.createTestAccount().then((data) => console.log(data));  //* Bunun ciktisi asagidaki sonuctur fake bir hesap olustururuz.
// {
//    user: 'qf3tu4hlrbyme6c7@ethereal.email',
//    pass: 'N4z93TSEavy5Auy1Qd',
//    smtp: { host: 'smtp.ethereal.email', port: 587, secure: false },
//    imap: { host: 'imap.ethereal.email', port: 993, secure: true },
//    pop3: { host: 'pop3.ethereal.email', port: 995, secure: true },
//    web: 'https://ethereal.email',
//    mxEnabled: false
//  }

//? Connect to MailServer/SMTP
// const transporter = nodemailer.createTransport({
//    // SMTP Options :
//    host: 'smtp.ethereal.email',
//    port: '587',
//    secure: false,
//    auth: {
//       user: 'qf3tu4hlrbyme6c7@ethereal.email',
//       pass: 'N4z93TSEavy5Auy1Qd',
//    },
// });

// console.log(transporter);

//? SendMail :

// transporter.sendMail(
//    {
//       from: 'awxt4bslsuo53z2h@ethereal.email',
//       to: 'qadir@clarusway.com', // 'abc@def.com, def@ghi.com'
//       subject: 'Hello',
//       text: 'Hello There. How are you?',
//       html: '<p> <b> Hello There </b> <br> How are you? </p>',
//    },
//    function (error, success) {
//       success
//          ? console.log('SUCCESS:', success)
//          : console.log('ERROR: ', error);
//    }
// );

//? GoogleMail (gmail) Connection :
//__ Google -> AccountHome -> Security -> Two-Step-Verify -> App-Passwords
const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
      user: '3183anilmak@gmail.com',
      pass: 'ahjm htrv lwrh dpvy',
   },
});

//? YandexMail (yandex)
// const transporter = nodemailer.createTransport({
//     service: 'yandex',
//     auth: {
//         user: 'test@yandex.com',
//         pass: '11' // your email-password
//     }
// })

//? SenMail :

// transporter.sendMail(
//    {
//       from: '3183anilmak@gmail.com',
//       to: '3183anilmak@gmail.com', // 'abc@def.com, def@ghi.com'
//       subject: 'Hello',
//       text: 'Hello There. How are you?',
//       html: '<p> <b> Hello There </b> <br> How are you? </p>',
//    },
//    function (error, success) {
//       success
//          ? console.log('SUCCESS:', success)
//          : console.log('ERROR: ', error);
//    }
// );

/* -------------------------------------------------------------------------- */

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
