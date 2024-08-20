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

app.all('/', (req, res) => {
  res.send('WELCOME TO BLOG API');
});

/* -------------------------------------------------------------------------- */

//__ Routes :

app.use('/auth', require('./src/routes/authRouter')); //, User Model / Login / Logout -- Auth
app.use('/user', require('./src/routes/userRouter')); //, User Model
app.use('/blog', require('./src/routes/blogRouter')); //, BlogCategory & BlogPost

/* -------------------------------------------------------------------------- */

//__ Catch Errors:
app.use(require('./src/errorHandler'));

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
