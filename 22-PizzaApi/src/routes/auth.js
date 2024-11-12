'use strict';
/* -------------------------------------------------------------------------- */
//-                     | FULLSTACK TEAM | NODEJS / EXPRESS |                 */
/* -------------------------------------------------------------------------- */

const router = require('express').Router();

/* ------------------------------------------------------- */

//, routes - auth :

const auth = require('../controllers/auth');

//, URL: /auth

//, Login - Logout:
router.post('/login', auth.login);
// router.all('/logout', auth.logout)
router.post('/logout', auth.logout);

/* ------------------------------------------------------- */
module.exports = router;
