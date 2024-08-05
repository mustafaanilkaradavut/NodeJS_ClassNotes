"use strict";
/* -------------------------------------------------------------------------- */
//..                         EXPRESSJS - MIDDLEWARES                          */
/* -------------------------------------------------------------------------- */

const middleware1 = (req, res, next) => {
  console.log("middleware-1 is working.");
  next();
  // next('route')
};

const middleware2 = (req, res, next) => {
  console.log("middleware-2 is working.");
  next();
};

const middleware3 = (req, res, next) => {
  console.log("middleware-3 is working.");
  next();
};

// module.exports = [ middleware1, middleware2, middleware3 ]
module.exports = { middleware1, middleware2, middleware3 };

/* -------------------------------------------------------------------------- */

module.exports = {
  middleware1: (req, res, next) => {
    console.log("middleware-1 is working.");
    next();
  },

  middleware2: (req, res, next) => {
    console.log("middleware-2 is working.");
    next();
  },

  middleware3: (req, res, next) => {
    console.log("middleware-3 is working.");
    next();
  },
};

/* -------------------------------------------------------------------------- */
