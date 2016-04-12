var nodemailer = require('nodemailer');
var User = require("../models/user.js");

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport( {
    host: "smtp.gmail.com", // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    auth: {
        user: "raccoonzeeapp@gmail.com",
        pass: "Abc72345*"
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
    var borrowersemail;
    if(err){
      console.log(err);
    }else{
      //go through whole database
      for( var i = 0; i<data.length; i++){
        var loanerName = data[i].googleName;

        //console.log("DB: ",data[i]);
        //for each user search through stuff
        for(var j=0; j<data[i].stuff.length; j++){
          //console.log(data.stuff[i].returnDueDate);
          var loanerName = data[i].googleName;
          var returnDueDateConverted = new Date(data[i].stuff[j].returnDueDate);


          //check if something is over due by one day.
          //getTime converts date to milliseconds (one day is 86,400,400 milliseconds)
          if( (returnDueDateConverted.getTime()) < todayDate.getTime() ){
            borrowersemail = data[i].stuff[j].borrowersEmail;
            numItemsNotReturned++;
            console.log("This " + data[i].stuff[j].itemName + " is over due: ", returnDueDateConverted );
            //use template based sender to send a message
            sendPwdReminder({
                to: data[i].stuff[j].borrowersEmail
            }, {
                borrowersname: data[i].stuff[j].borrowersName,
                itemname: data[i].stuff[j].itemName,
                loanername: loanerName
            }, function(err, info){
                if(err){
                   console.log('Error ', err);
                }else{
                    console.log('Reminder sent to ', borrowersemail );
                }
            });

          }
          // if(numItemsNotReturned == 1){
          //   console.log(numItemsNotReturned);
          //   break;
          // }
        }
      }
    }
});




// setup e-mail data with unicode symbols
// var mailOptions = {
//     from: '"Raccoonzee App" <raccoonzeeapp@gmail.com>', // sender address
//     to: 'myefeather@gmail.com', // list of receivers
//     subject: 'Goodbye ', // Subject line
//     text: 'Hello world!!', // plaintext body
//     html: '<p>Hello world</p><br /> <p>Please return this item' // html body
// };

// send mail with defined transport object
// transporter.sendMail(mailOptions, function(error, info){
//     if(error){
//         return console.log(error);
//     }
//     console.log('Message sent: ' + info.response);
// });







module.exports = transporter;
