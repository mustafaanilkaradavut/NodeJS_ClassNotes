'use strict';
/* -------------------------------------------------------------------------- */
//-                         EXPRESSJS - PERSONNEL API                         */
/* -------------------------------------------------------------------------- */

const router = require('express').Router();

/* -------------------------------------------------------------------------- */

const personnel = require('../controllers/personnel.controller');

// URL: /personnels
//http://localhost:8000/personnels/login

router.post('/login', personnel.login);
router.post('/logout', personnel.logout);

router.route('/').get(personnel.list).post(personnel.create);

router
   .route('/:id')
   .get(personnel.read)
   .put(personnel.update)
   .patch(personnel.update)
   .delete(personnel.delete);

/* -------------------------------------------------------------------------- */
module.exports = router;
