'use strict';
/* -------------------------------------------------------------------------- */
//-                         EXPRESSJS - PERSONNEL API                         */
/* -------------------------------------------------------------------------- */

// Simple Token
// Token Authentication
// Basic Token
// Token

const Token = require('../models/token.model');

module.exports = {
   list: async (req, res) => {
      /*
         _swagger.deprecated = true
         #swagger.ignore = true
      */
      const data = await res.getModelList(Token);
      res.status(200).send({
         error: false,
         data,
         details: await res.getModelListDetails(Token),
      });
   },

   create: async (req, res) => {
      /*
         _swagger.deprecated = true
         #swagger.ignore = true
      */
      const data = await Token.create(req.body);
      res.status(201).send({
         error: false,
         data,
      });
   },

   // URL/departments/MongoDB ID
   read: async (req, res) => {
      /*
         _swagger.deprecated = true
         #swagger.ignore = true
      */
      const data = await Token.findOne({ _id: req.params.id });
      res.status(200).send({
         error: false,
         data,
      });
   },

   update: async (req, res) => {
      /*
         _swagger.deprecated = true
         #swagger.ignore = true
      */
      const data = await Token.updateOne({ _id: req.params.id }, req.body, {
         runValidators: true,
      });
      res.status(202).send({
         error: false,
         data,
         new: await Token.findOne({ _id: req.params.id }),
      });
   },

   delete: async (req, res) => {
      /*
         _swagger.deprecated = true
         #swagger.ignore = true
      */
      const data = await Token.deleteOne({ _id: req.params.id });
      res.status(data.deletedCount ? 204 : 404).send({
         error: !data.deletedCount,
         data,
      });
   },
};

/* -------------------------------------------------------------------------- */
