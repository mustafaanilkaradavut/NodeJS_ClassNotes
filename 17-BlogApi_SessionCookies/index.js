'use strict';
/* -------------------------------------------------------------------------- */
//-                °    EXPRESSJS - BLOG Project with Mongoose                */
/* -------------------------------------------------------------------------- */

const express = require('express');
const app = express();

require('dotenv').config();
require('express-async-errors');
const PORT = process.env.PORT || 8000;

/* -------------------------------------------------------------------------- */
//__ Accept JSON:
app.use(express.json());

//? DB CONNECTION:
// const dbConnection = require("./src/dbConnection");
// dbConnection();
require('./src/dbConnection')();

// Catch error from async:
require('express-async-errors');

/* -------------------------------------------------------------------------- */

//- SessionCookies:
// http://expressjs.com/en/resources/middleware/cookie-session.html
// https://www.npmjs.com/package/cookie-session
//__ $ npm i cookie-session

const session = require('cookie-session'); // Session Middleware

app.use(
   // General Settings
   session({
      secret: process.env.SECRET_KEY, // Cookie datası şifreleme anahtarı
      // maxAge: 1000 * 60 * 60 * 24 * 3, //miliSecond - 3 days
   })
);

/* -------------------------------------------------------------------------- */

app.all('/', (req, res) => {
   res.send({
      session: req.session,
      message: 'WELCOME TO BLOG API',
   });
});

/* -------------------------------------------------------------------------- */

//__ Routes :

app.use('/auth', require('./src/routes/authRouter')); //, User Model / Login / Logout -- Auth
app.use('/user', require('./src/routes/userRouter')); //, User Model
app.use('/blog', require('./src/routes/blogRouter')); //, BlogCategory & BlogPost

/* -------------------------------------------------------------------------- */

//__ Catch Errors:
app.use(require('./src/middlewares/errorHandler'));

/* -------------------------------------------------------------------------- */

app.listen(PORT, () => console.log('Running: http://127.0.0.1:' + PORT));

/* -------------------------------------------------------------------------- */

//! Intallation

//, npm init -y
//, npm i express dotenv express-async-errors
//, echo PORT=8000 > .env
//, npm i mongoose

//! Process :

//, models -> controller -> routes -> index
