'use strict';
/* -------------------------------------------------------------------------- */
//-                         EXPRESSJS - PERSONNEL API                         */
/* -------------------------------------------------------------------------- */

const router = require('express').Router();

const auth = require('../controllers/auth.controller');

/* -------------------------------------------------------------------------- */

// URL: /auth

router.post('/login', auth.login);
router.get('/logout', auth.logout);
// router.all('/logout', auth.logout); //* swaggerAutogen all() ve use() methodunu yakalamaz.

/* -------------------------------------------------------------------------- */

module.exports = router;
