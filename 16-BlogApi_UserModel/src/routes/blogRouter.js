"use strict";
/* -------------------------------------------------------------------------- */
//-                °    EXPRESSJS - BLOG Project with Mongoose                */
/* -------------------------------------------------------------------------- */

const router = require("express").Router();

//, Call Controllers :
const { BlogCategory, BlogPost } = require("../controllers/blogController");

/* -------------------------------------------------------------------------- */

// URL : /blog ->

// BlogCategory
router.route("/category").get(BlogCategory.list).post(BlogCategory.create);

router
  .route("/category/:categoryId")
  .get(BlogCategory.read)
  .put(BlogCategory.update)
  .patch(BlogCategory.update)
  .delete(BlogCategory.delete);

/* -------------------------------------------------------------------------- */
module.exports = router;
