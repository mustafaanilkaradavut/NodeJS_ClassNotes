"use strict";
/* -------------------------------------------------------------------------- */
//-                °    EXPRESSJS - BLOG Project with Mongoose                */
/* -------------------------------------------------------------------------- */

//? Call Models :
const { BlogCategory, BlogPost } = require("../models/blogModel");

/* -------------------------------------------------------------------------- */
//? BlogCategory Controller :

module.exports.BlogCategory = {
  create: async (req, res) => {
    res.send("Create Method");
  },
};

/* -------------------------------------------------------------------------- */
//? BlogPost Controller :

module.exports.BlogPost = {};
