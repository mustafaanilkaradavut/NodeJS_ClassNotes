'use strict';
/* -------------------------------------------------------------------------- */
//-                     | FULLSTACK TEAM | NODEJS / EXPRESS |                 */
/* -------------------------------------------------------------------------- */
//.. senMail(to, subject, message)

const nodemailer = require('nodemailer');

module.exports = function sendMail(to, subject, message) {
   //? GoogleMail (gmail) Connection :
   //__ Google -> AccountHome -> Security -> Two-Step-Verify -> App-Passwords
   const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         user: '3183anilmak@gmail.com',
         pass: 'ahjm htrv lwrh dpvy',
      },
   });

   /* -------------------------------------------------------------------------- */

   //? SendMail :
   transporter.sendMail(
      {
         from: '3183anilmak@gmail.com',
         // to: '3183anilmak@gmail.com', // 'abc@def.com, def@ghi.com'
         to: to,
         // subject: 'Hello',
         subject: subject,
         // text: 'Hello There. How are you?',
         text: message,
         // html: '<p> <b> Hello There </b> <br> How are you? </p>',
         html: message,
      },
      function (error, success) {
         success
            ? console.log('SUCCESS:', success)
            : console.log('ERROR: ', error);
      }
   );
};
