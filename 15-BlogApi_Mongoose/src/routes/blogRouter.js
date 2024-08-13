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
router.route("/category").post(BlogCategory.create);

/* -------------------------------------------------------------------------- */
module.exports = router;
