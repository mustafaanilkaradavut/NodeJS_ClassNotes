'use strict';
/* -------------------------------------------------------------------------- */
//-                         EXPRESSJS - PERSONNEL API                         */
/* -------------------------------------------------------------------------- */

const router = require('express').Router();

/* -------------------------------------------------------------------------- */

const token = require('../controllers/token.controller');

const { isAdmin } = require('../middlewares/permissions');

/* -------------------------------------------------------------------------- */
//, Normal Way

// router.route('/').get(isAdmin, token.list).post(isAdmin, token.create);

// router
//    .route('/:id')
//    .get(isAdmin, token.read)
//    .put(isAdmin, token.update)
//    .patch(isAdmin, token.update)
//    .delete(isAdmin, token.delete);

/* -------------------------------------------------------------------------- */
//, Short Way

router.use(isAdmin);
router.route('/').get(token.list).post(token.create);

router
   .route('/:id')
   .get(token.read)
   .put(token.update)
   .patch(token.update)
   .delete(token.delete);

module.exports = router;
