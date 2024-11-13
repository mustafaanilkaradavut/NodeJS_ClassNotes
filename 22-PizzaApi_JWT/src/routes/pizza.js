'use strict';
/* -------------------------------------------------------------------------- */
//-                     | FULLSTACK TEAM | NODEJS / EXPRESS |                 */
/* -------------------------------------------------------------------------- */

const router = require('express').Router();

/* ------------------------------------------------------- */
//.. routes/pizza:

const pizza = require('../controllers/pizza');

//.. URL: /pizzas

router.route('/').get(pizza.list).post(pizza.create);

router
   .route('/:id')
   .get(pizza.read)
   .put(pizza.update)
   .patch(pizza.update)
   .delete(pizza.delete);

/* ------------------------------------------------------- */
module.exports = router;
