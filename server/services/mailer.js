var nodemailer = require('nodemailer');
var SENDER = require("../config/gmailpassport.js");

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport( {
    host: "smtp.gmail.com", // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    auth: {
        user: SENDER.email, // get email and password from external file
        pass: SENDER.password
    }
});

// create template based sender function
var sendReminder = transporter.templateSender({
    subject: 'You forgot to return {{itemname}}!',
    text: 'Hello {{borrowersname}}, please return: {{ itemname }}',
    html: '<b>Hello <strong>{{borrowersname}}</strong>, please return\n<b>{{ itemname }}</b> to {{loanername}}.</p>'
}, {
    from: '"Raccoonzee App" <' + SENDER.email + '>',
});

//this function is exported and called to call sendReminder
var caller = function(mail){
  sendReminder({
      to: mail.to
  }, {
      borrowersname: mail.receiverName,
      itemname: mail.itemName,
      loanername: mail.loanerName
  }, function(err, info){
      if(err){
         console.log('Error ', err);
      }else{
          console.log('Reminder sent successfully.');
      }
  });
};

module.exports = caller;
