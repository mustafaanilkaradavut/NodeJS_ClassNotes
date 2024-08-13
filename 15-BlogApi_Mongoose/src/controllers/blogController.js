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
    // res.send("Create Method");

    const data = await BlogCategory.create(req.body);
    // console.log(data);
    res.status(201).send({
      error: false,
      result: data,
    });
  },
};

/* -------------------------------------------------------------------------- */
//? BlogPost Controller :

module.exports.BlogPost = {};
