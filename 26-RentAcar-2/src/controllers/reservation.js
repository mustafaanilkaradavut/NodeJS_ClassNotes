'use strict';

/* -------------------------------------------------------------------------- */
//-                                 RENT A CAR                                */
/* -------------------------------------------------------------------------- */

//.. Reservation Controller:

const Reservation = require('../models/reservation');
const dateValidation = require('../helpers/dateValidation');
const CustomError = require('../errors/customError');
const Car = require('../models/car');

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
         customFilter = { userId: req.user._id };
      }

      const data = await res.getModelList(Reservation, customFilter);

      res.status(200).send({
         error: false,
         details: await res.getModelListDetails(Reservation, customFilter, [
            { path: 'userId', select: 'username firstName lastName' },
            { path: 'carId', select: 'brand model' },
            { path: 'createdId', select: 'username' },
            { path: 'updatedId', select: 'username' },
         ]),
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

      //.. "Admin-staf değilse" veya "UserId göndermişmemişse" req.user'dan al:

      if (!req.user.isAdmin && !req.user.isStaff) {
         req.body.userId = req.user.id;
      } else if (!req.body?.userId) {
         req.body.userId = req.user.id;
      }

      //.. createdId ve updatedId verisini req.user'dan al:
      req.body.userId = req.user._id;
      req.body.createdId = req.user._id;
      req.body.updatedId = req.user._id;

      const [totalDays, starDate, endDate] = dateValidation(
         req.body?.startDate,
         req.body?.endDate
      );

      //.. istediğim araç kiralanmış mı?

      const isCarReserved = await Reservation.findOne({
         carId: req.body.carId,
         startDate: { $lte: req.body.endDate },
         endDate: { $gte: req.body.startDate },
      });
      //.. kiralanmışsa rezervasyona izin verme

      if (isCarReserved) {
         throw new CustomError(
            'The car is already reserved for the given dates',
            400
         );
      }
      //.. kullanıcının bu tarihlerde rezervasyonu var mı?

      const userReservationInDates = await Reservation.findOne({
         carId: req.body.carId,
         startDate: { $lte: req.body.endDate },
         endDate: { $gte: req.body.startDate },
      });

      //.. bu tarihlerde r ezervasyon varsa yine izin verme

      if (userReservationInDates) {
         throw new CustomError(
            'The user already reserved another car for given dates',
            400
         );
      }
      //.. Bir günlük araç kiralama bedelini öğren
      
      const car = await Car.findOne(
         { _id: req.body.carId },
         { pricePerDay: 1 } // Sadece pricePerDay alanını getir
      );

      if (!car) {
         return res
            .status(404)
            .send({ error: true, message: 'Car not found.' });
      }

      // Günlük maliyeti al ve toplam ücreti hesapla
      const dailyCost = Number(car.pricePerDay);

      // Tarih farkını hesapla
      const totalRentalDays = Math.ceil(
         (new Date(req.body.endDate) - new Date(req.body.startDate)) /
            (1000 * 60 * 60 * 24)
      );

      // Loglama: Kontrol amaçlı gün sayısı ve günlük maliyet
      console.log(`Daily Cost: ${dailyCost}`);
      console.log(`Total Rental Days: ${totalRentalDays}`);

      // Toplam ücreti hesapla
      req.body.amount = dailyCost * totalRentalDays;

      // Loglama: Hesaplanan toplam ücret
      // console.log(`Calculated Amount: ${req.body.amount}`);

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
         customFilter = { userId: req.user._id };
      }
      const data = await Reservation.findOne({
         _id: req.params._id,
         ...customFilter,
      }).populate([
         { path: 'userId', select: 'username firstName lastName' },
         { path: 'carId', select: 'brand model' },
         { path: 'createdId', select: 'username' },
         { path: 'updatedId', select: 'username' },
      ]);
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
