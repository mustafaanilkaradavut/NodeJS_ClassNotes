'use strict';
/* -------------------------------------------------------------------------- */
//-                         EXPRESSJS - PERSONNEL API                         */
/* -------------------------------------------------------------------------- */

const router = require('express').Router();

const auth = require('../controllers/auth.controller');

/* -------------------------------------------------------------------------- */

// URL: /auth

router.post('/login', auth.login);
router.all('/logout', auth.logout);

/* -------------------------------------------------------------------------- */

module.exports = router;
