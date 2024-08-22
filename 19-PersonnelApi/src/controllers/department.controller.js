'use strict';
/* -------------------------------------------------------------------------- */
//-                         EXPRESSJS - PERSONNEL API                         */
/* -------------------------------------------------------------------------- */

const Depertment = require('../models/department.model');

module.exports = {
   list: async (req, res) => {
      const data = await res.getModelList(Depertment);
      res.status(200).send({
         error: false,
         data,
         details: await res.getModelListDetails(Depertment),
      });
   },

   create: async (req, res) => {
      const data = await Depertment.create(req.body);
      res.status(201).send({
         error: false,
         data,
      });
   },

   // URL/departments/MongoDB ID
   read: async (req, res) => {
      const data = await Depertment.findOne({ _id: req.params.id });
      res.status(200).send({
         error: false,
         data,
      });
   },

   // Filter, Update, Options
   // const options = { upsert: true };
   // acknowledged: İşlemin MongoDB tarafından tanındığını gösterir.
   // matchedCount: Filtre kriterleriyle eşleşen belge sayısını belirtir.
   // modifiedCount: Güncellenen belge sayısını belirtir.
   // upsertedId: Eğer upsert kullanıldıysa ve yeni bir belge oluşturulduysa, bu belgenin _id değeri burada yer alır.
   // upsertedCount: upsert işlemi ile kaç belgenin oluşturulduğunu belirtir.

   update: async (req, res) => {
      const data = await Depertment.updateOne(
         { _id: req.params.id },
         req.body,
         {
            runValidators: true,
         }
      );
      res.status(202).send({
         error: false,
         data,
         new: await Depertment.findOne({ _id: req.params.id }),
      });
   },

   delete: async (req, res) => {
      const data = await Depertment.deleteOne({ _id: req.params.id });
      res.status(data.deletedCount ? 204 : 404).send({
         error: !data.deletedCount,
         data,
      });
   },
};
