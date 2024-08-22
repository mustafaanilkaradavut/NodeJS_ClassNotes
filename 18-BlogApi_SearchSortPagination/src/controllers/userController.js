'use strict';
/* -------------------------------------------------------------------------- */
//-                °    EXPRESSJS - BLOG Project with Mongoose                */
/* -------------------------------------------------------------------------- */

// const  User  = require('../models/userModel'); //, Direct
const { User } = require('../models/userModel'); //, In Object

/* -------------------------------------------------------------------------- */
// User Controller :

module.exports.user = {
   list: async (req, res) => {
      // const data = await User.find();
      const data = await res.getModelList(User);

      res.status(200).send({
         error: false,
         result: data,
      });
   },

   //, CRUD  ->

   create: async (req, res) => {
      const data = await User.create(req.body);
      res.status(201).send({
         error: false,
         result: data,
      });
   },

   read: async (req, res) => {
      const data = await User.findOne({ _id: req.params.userId });

      res.status(200).send({
         error: false,
         result: data,
      });
   },

   update: async (req, res) => {
      // const data = await User.updateOne({ _id: req.params.userId }, req.body);

      //? Validate işleminin update ederken çalışması için runValidators ekleriz.
      const data = await User.updateOne({ _id: req.params.userId }, req.body, {
         runValidators: true,
      });

      res.status(200).send({
         error: false,
         result: data, // Güncelleme işleminin sayısal değerleri.
         new: await User.findOne({ _id: req.params.userId }), // Güncellenmiş datayı göster.
      });
   },

   delete: async (req, res) => {
      const data = await User.deleteOne({
         _id: req.params.userId,
      });
      console.log(data);

      if (data.deletedCount >= 1) {
         res.sendStatus(204); // No Content
      } else {
         res.errorStatusCode(404).send({
            error: true,
            message: 'Blog category not found.',
         });
      }
   },
};
