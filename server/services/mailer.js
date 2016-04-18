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
    html: "<p>Hello {{borrowersname}}, this is just a friendly"
     +" reminder from Bloodhound App. A while ago you borrowed {{ itemname }} from "
     +"{{loanername}}.</p>"
     +"<p>Please return\n<b>{{ itemname }}</b> to {{loanername}} in next 2 weeks.</p>"
}, {
    from: '"Bloodhound App" <' + SENDER.email + '>',
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
