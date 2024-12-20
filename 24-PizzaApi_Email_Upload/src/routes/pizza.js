'use strict';
/* -------------------------------------------------------------------------- */
//-                     | FULLSTACK TEAM | NODEJS / EXPRESS |                 */
/* -------------------------------------------------------------------------- */

const router = require('express').Router();
/* -------------------------------------------------------------------------- */

// UPLOAD (Multer Middleware)
// npm i multer
// https://expressjs.com/en/resources/middleware/multer.html

// const multer = require('multer');

// const upload = multer({
//    // dest: './uploads',
//    storage: multer.diskStorage({
//       destination: './uploads',
//       filename: function (req, file, returnCallback) {
//          // console.log('file', file);
//          // returnCallback(error, fileName);
//          // returnCallback(null, 'pizzaShop.jpg');
//          // returnCallback(null, file.originalname);
//          returnCallback(null, Date.now() + '_' + file.originalname);
//       },
//    }),
// });

const upload = require('../middlewares/upload');

/* -------------------------------------------------------------------------- */
//.. routes/pizza:

const pizza = require('../controllers/pizza');

//.. URL: /pizzas

router
   .route('/')
   .get(pizza.list)
   // .post(upload.single('image'), pizza.create);
   .post(upload.array('image'), pizza.create);
// .post(upload.any(), pizza.create);

//! FRONT END KISMINDA YAPILMASI GEREKENLER :
//  <form action="/pizzas" method="POST" enctype="mutipart/form-data">
//      <input type="file" name="image">
//  </form>
//! FRONT END KISMINDA YAPILMASI GEREKENLER

router
   .route('/:id')
   .get(pizza.read)
   .put(upload.single('image'), pizza.update)
   .patch(upload.single('image'), pizza.update)
   .delete(pizza.delete);

/* -------------------------------------------------------------------------- */
module.exports = router;
