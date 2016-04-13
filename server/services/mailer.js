var nodemailer = require('nodemailer');
var pw = require("../config/gmailpassport.js");
var User = require("../models/user.js");

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport( {
    host: "smtp.gmail.com", // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    auth: {
        user: "raccoonzeeapp@gmail.com",
        pass: pw.password // get password from external file
    }
});

// create template based sender function
var sendPwdReminder = transporter.templateSender({
    subject: 'You forgot to return {{itemname}}!',
    text: 'Hello {{borrowersname}}, please return: {{ itemname }}',
    html: '<b>Hello <strong>{{borrowersname}}</strong>, please return\n<b>{{ itemname }}</b> to {{loanername}}.</p>'
}, {
    from: 'raccoonzeeapp@gmail.com',
});
//find overdue stuff
User.user.find({}, function(err, data){
    var todayDate = new Date();
    var numItemsNotReturned = 0;
    var borrowersemail = "";
    if(err){
      console.log(err);
    }else{
      //go through whole database
      for( var i = 0; i<data.length; i++){
        var loanerName = data[i].googleName;

        //console.log("DB: ",data[i]);
        //for each user search through stuff
        for(var j=0; j<data[i].stuff.length; j++){

          var returnDueDateConverted = new Date(data[i].stuff[j].returnDueDate);

          //check if something is over due by one day.
          //getTime converts date to milliseconds (one day is 86,400,400 milliseconds)
          if( (returnDueDateConverted.getTime()+86400000) < todayDate.getTime() ){
            borrowersemail = "";
            borrowersemail = data[i].stuff[j].borrowersEmail;
            console.log('We are going to send reminder to ', borrowersemail )
            numItemsNotReturned++;
            console.log("The " + data[i].stuff[j].itemName + " is over due: ", returnDueDateConverted );
            //use template based sender to send a message
            sendPwdReminder({
                to: borrowersemail
            }, {
                borrowersname: data[i].stuff[j].borrowersName,
                itemname: data[i].stuff[j].itemName,
                loanername: loanerName
            }, function(err, info, borrowersemail){
                if(err){
                   console.log('Error ', err);
                }else{
                    console.log('Reminder sent successfully.'); //TO DO: work on it later ( why it is always same emeail?)
                }
            });
          }
        }
      }
    }
});

module.exports = transporter;
