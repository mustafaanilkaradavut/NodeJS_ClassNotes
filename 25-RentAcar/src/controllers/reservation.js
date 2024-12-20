'use strict';

/* -------------------------------------------------------------------------- */
//-                                 RENT A CAR                                */
/* -------------------------------------------------------------------------- */

//.. Reservation Controller:
const Reservation = require('../models/reservation');

module.exports = {
   list: async (req, res) => {
      /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "List Reservations"
            #swagger.description = `
               You can send query with endpoint for search[], sort[], page and limit.
               <ul> Examples:
                  <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                  <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                  <li>URL/?<b>page=2&limit=1</b></li>
               </ul>
            `
        */
      //__ yetkisine göre revervasyonlara erişim ver
      let customFilter = {};
      if (!req.user.isAdmin && !req.user.isStaff) {
         customFilter = { userId: req.user.id };
      }

      const data = await res.getModelList(Reservation, customFilter);

      res.status(200).send({
         error: false,
         details: await res.getModelListDetails(Reservation, customFilter),
         data,
      });
   },

   create: async (req, res) => {
      /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Create Reservation"
            #swagger.parameters['body'] = {
               in: 'body',
               required: true,
               schema: {
                  $ref:"#/definitions/Reservation"
               }
            }
        */
      //__ "Admin-staf değilse" veya "UserId göndermişmemişse" req.user'dan al:
      if (!req.user.isAdmin && !req.user.isStaff) {
         req.body.userId = req.user._id;
      } else if (!req.body?.userId) {
         req.body.userId = req.user._id;
      }
      console.log(req.user);
      // createdId ve updatedId verisini req.user'dan al:
      req.body.createdId = req.user._id;
      req.body.updatedId = req.user._id;

      const data = await Reservation.create(req.body);
      res.status(201).send({
         error: false,
         data,
      });
   },

   read: async (req, res) => {
      /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Get Single Reservation"
        */
      let customFilter = {};
      if (!req.user.isAdmin && !req.user.isStaff) {
         customFilter = { userId: req.user.id };
      }
      const data = await Reservation.findOne({
         _id: req.params.id,
         ...customFilter,
      });
      //{_id:req.params.id,userId: req.user.id  }

      res.status(200).send({
         error: false,
         data,
      });
   },

   update: async (req, res) => {
      /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Update Reservation"
            #swagger.parameters['body'] = {
               in: 'body',
               required: true,
               schema: {
                  $ref:"#/definitions/Reservation"
               }
            }
        */
      if (!req.user.isAdmin) {
         delete req.body.userId;
      }
      //__ güncelleyen kişi giriş yapmış kullanıcı
      req.body.updatedId = req.user.id;

      const data = await Reservation.updateOne(
         { _id: req.params.id },
         req.body,
         {
            runValidators: true,
         }
      );

      res.status(202).send({
         error: false,
         data,
         new: await Reservation.findOne({ _id: req.params.id }),
      });
   },

   delete: async (req, res) => {
      /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Delete Reservation"
        */

      const data = await Reservation.deleteOne({ _id: req.params.id });

      res.status(data.deletedCount ? 204 : 404).send({
         error: !data.deletedCount,
         data,
      });
   },
};
