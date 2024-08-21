'use strict';
/* -------------------------------------------------------------------------- */
//-                °    EXPRESSJS - BLOG Project with Mongoose                */
/* -------------------------------------------------------------------------- */

const router = require('express').Router();

// Call Controllers: ( küçük harflerle user, controllerda ise User çünkü karıştırmamak ve farklı olması için.)
const { auth } = require('../controllers/authController');

/* -------------------------------------------------------------------------- */

// URL : /auth ->

router.post('/login', auth.login);
// router.post('/logout', auth.logout);
router.all('/logout', auth.logout);

/* -------------------------------------------------------------------------- */
module.exports = router;
