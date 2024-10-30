'use strict';
/* -------------------------------------------------------------------------- */
//-                         EXPRESSJS - PERSONNEL API                         */
/* -------------------------------------------------------------------------- */

const Depertment = require('../models/department.model');

module.exports = {
   list: async (req, res) => {
      /*
         #swagger.tags = ["Departments"]
         #swagger.summary = "List Departments"
         #swagger.description = `
            You can send query with endpoint for search[], sort[], page and limit.
            <ul> Examples:
                  <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                  <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                  <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                  <li>URL/?<b>page=2&limit=1</b></li>
            </ul>
         `
      */
      const data = await res.getModelList(Depertment);
      res.status(200).send({
         error: false,
         data,
         details: await res.getModelListDetails(Depertment),
      });
   },

   create: async (req, res) => {
      /*
         #swagger.tags = ["Departments"]
         #swagger.summary = "Create Department"
         #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                  $ref: '#/definitions/Department'
            }
         }
    */
      const data = await Depertment.create(req.body);
      res.status(201).send({
         error: false,
         data,
      });
   },

   // URL/departments/MongoDB ID
   read: async (req, res) => {
      /*
         #swagger.tags = ["Departments"]
         #swagger.summary = "Get Single Department"
    */
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
      /*
         #swagger.tags = ["Departments"]
         #swagger.summary = "Update Department"
         #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                  $ref: '#/definitions/Department'
            }
         }
    */
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
      /*
         #swagger.tags = ["Departments"]
         #swagger.summary = "Delete Department"
    */
      const data = await Depertment.deleteOne({ _id: req.params.id });
      res.status(data.deletedCount ? 204 : 404).send({
         error: !data.deletedCount,
         data,
      });
   },

   personnels: async (req, res) => {
      /*
         #swagger.tags = ["Departments"]
         #swagger.summary = "Get Personnels of Department"
    */
      const Personnel = require('../models/personnel.model');

      const data = await res.getModelList(
         Personnel,
         { departmentId: req.params.id },
         'departmentId'
      );

      res.status(200).send({
         error: false,
         detail: await res.getModelListDetails(
            Personnel,
            { departmentId: req.params.id },
            'departmentId'
         ),
         data,
      });
   },
};
