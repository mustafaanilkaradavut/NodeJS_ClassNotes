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
router.post('/login', auth.login); // Login and get Token or JWT
router.post('/refresh', auth.refresh); // JWT: Refresh
// router.all('/logout', auth.logout)
router.post('/logout', auth.logout); // Token logout

/* ------------------------------------------------------- */
module.exports = router;
