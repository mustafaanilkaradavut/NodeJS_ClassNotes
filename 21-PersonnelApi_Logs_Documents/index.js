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

/* -------------------------------------------------------------------------- */

//.. Documentation
//, $ npm i swagger-autogen   # JSON creator # Bir kez calistiracagiz.
//, $ npm i swagger-ui-express
//, $ npm i redoc-express

//__ JSON :
app.use('/documents/json', (req, res) => {
   res.sendFile('swagger.json', { root: '.' });
});

//__ SWAGGER :
const swaggerUi = require('swagger-ui-express');
const swaggerJson = require('./swagger.json');

app.use(
   '/documents/swagger',
   swaggerUi.serve,
   swaggerUi.setup(swaggerJson, {
      swaggerOptions: { persistAuthorization: true },
   })
);

//__ REDOC :
const redoc = require('redoc-express');
app.use(
   '/documents/redoc',
   redoc({ specUrl: '/documents/json', title: 'Redoc UI' })
);

/* -------------------------------------------------------------------------- */
//.. Morgan Logger
app.use(require('./src/middlewares/logger'));

//.. Authentication Middleware
app.use(require('./src/middlewares/authentication')); // Yukari koyduk cunku genel yapmak istedik

//.. res.getModelList():
app.use(require('./src/middlewares/findSearchSortPage'));

//? HomePath:
app.all('/', (req, res) => {
   res.send({
      error: false,
      message: 'Welcome to PERSONNEL API',
      session: req.session,
      isLogin: req.isLogin,
      user: req.user,
   });
});

//.. Auth
app.use('/auth', require('./src/routes/auth.router'));

//.. Tokens
app.use('/tokens', require('./src/routes/token.router'));

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
// require('./src/helpers/sync')();

// if (process.env.NODE_ENV == 'development') {
//    return;
//    require('./src/helpers/dataCreate')()
//       .then((res) => console.log('Data synched'))
//       .catch((err) => console.error('Data could not synched'));
// }
