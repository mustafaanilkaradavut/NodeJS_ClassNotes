'use strict';
/* -------------------------------------------------------------------------- */
//-                         EXPRESSJS - PERSONNEL API                         */
/* -------------------------------------------------------------------------- */

const Personnel = require('../models/personnel.model');

module.exports = {
   list: async (req, res) => {
      const data = await res.getModelList(Personnel);

      res.status(200).send({
         error: false,
         detail: await res.getModelListDetails(Personnel),
         data,
      });
   },

   create: async (req, res) => {
      // const isFirstAccount = (await Personnel.countDocuments()) === 0;
      // req.body.isAdmin = isFirstAccount ? true : false;

      //, isLead Control:

      const isLead = req.body?.isLead || false;
      if (isLead) {
         const xyz = await Personnel.updateMany(
            { departmentId: req.body.departmentId, isLead: true }, // Filtreleme yapar.
            { isLead: false } // Guncelleme yapar.
         );
      }

      const data = await Personnel.create(req.body);

      res.status(201).send({
         error: false,
         data,
      });
   },

   read: async (req, res) => {
      const data = await Personnel.findOne({ _id: req.params.id });

      res.status(200).send({
         error: false,
         data,
      });
   },

   update: async (req, res) => {
      // isLead Control:
      const isLead = req.body?.isLead || false;
      if (isLead) {
         const { departmentId } = await Personnel.findOne(
            { _id: req.params.id },
            { departmentId: 1 }
         );
         await Personnel.updateMany(
            { departmentId, isLead: true },
            { isLead: false }
         );
      }

      const data = await Personnel.updateOne({ _id: req.params.id }, req.body, {
         runValidators: true,
      });

      res.status(202).send({
         error: false,
         data,
         new: await Personnel.findOne({ _id: req.params.id }),
      });
   },

   delete: async (req, res) => {
      const data = await Personnel.deleteOne({ _id: req.params.id });

      res.status(data.deletedCount ? 204 : 404).send({
         error: !data.deletedCount,
         data,
      });
   },

   //! LOGIN & LOGOUT

   login: async (req, res) => {
      const { username, password } = req.body;

      if (username && password) {
         const user = await Personnel.findOne({ username, password });
         if (user && user.isActive) {
            // Set Session:
            req.session = {
               id: user._id,
               password: user.password,
            };
            // Set Cookie:
            if (req.body?.rememberMe) {
               req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3; // 3 Days
            }

            res.status(200).send({
               error: false,
               user,
            });
         } else {
            res.errorStatusCode = 401;
            throw new Error('Wrong Username or Password.');
         }
      } else {
         res.errorStatusCode = 401;
         throw new Error('Please entry username and password.');
      }
   },

   logout: async (req, res) => {
      if (req.session) {
         req.session = null; // Session'ı temizlemek
         res.clearCookie('session'); // Session çerezini temizlemek
         res.status(200).send({
            error: false,
            message: 'Logout is completed',
         });
      } else {
         res.status(200).send({
            error: false,
            message: 'No session to destroy, logout successful.',
         });
      }
   },
};
