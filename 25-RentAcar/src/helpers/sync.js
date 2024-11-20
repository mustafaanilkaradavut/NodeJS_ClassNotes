'use strict';

/* -------------------------------------------------------------------------- */
//-                                 RENT A CAR                                */
/* -------------------------------------------------------------------------- */

// sync():

//.. helpers icerisinde bulunan kullanicilarimizi calistirmak icin buradaki return'u yorum satirina almamiz ve sonrasinda index'teki sync uzantimizi aktif hale getirmemiz gerek.

module.exports = async function () {
   return null;
   /* REMOVE DATABASE */
   const { mongoose } = require('../configs/dbConnection');
   await mongoose.connection.dropDatabase();
   console.log('- Database and all data DELETED!');
   /* REMOVE DATABASE */
   try {
      const users = require('../mokeData/user.json');
      const User = require('../models/user');
      await User.insertMany(users);
      console.log('users added');
   } catch (error) {
      console.log("user couldn't add");
      console.log(error);
   }

   //.. Asagida cars mock datasini eklemek icin asagidaki kodlarimizi yorum satirindan kaldiririz. return null ifadesini yoruma aliriz. indexte sync calistiririz.

   // try {
   //    const cars = require('../mokeData/car.json');
   //    const Car = require('../models/car');
   //    await Car.insertMany(cars);
   //    console.log('cars added');
   // } catch (error) {
   //    console.log("cars couldn't add");
   //    console.log(error);
   // }
   try {
      const reservations = require('../mokeData/reservation.json');
      const Reservation = require('../models/reservation');
      await Reservation.insertMany(reservations);
      console.log('reservations added');
   } catch (error) {
      console.log("reservation couldn't add");
      console.log(error);
   }
};
