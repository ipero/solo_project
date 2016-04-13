var User = require("../models/user.js");
var mailer = require('./mailer.js');

//find deadbeat guy
var findDeadbeat = function(){
  User.user.find({}, function(err, data){
      var todayDate = new Date();
      var numItemsNotReturned = 0;
      if(err){
        console.log(err);
      }else{
        //go through whole database
        for( var i = 0; i<data.length; i++){
          var loanerName = data[i].googleName;
          //for each user search through stuff
          for(var j=0; j<data[i].stuff.length; j++){

            var returnDueDateConverted = new Date(data[i].stuff[j].returnDueDate);

            //check if something is over due by one day.
            //getTime converts date to milliseconds (one day is 86,400,400 milliseconds)
            if( (returnDueDateConverted.getTime()+86400000) < todayDate.getTime() ){
              console.log('We are going to send reminder to ', data[i].stuff[j].borrowersName )
              numItemsNotReturned++;
              console.log("The " + data[i].stuff[j].itemName + " is over due: ", returnDueDateConverted );
              // call mailer to send email
              mailer({
                to: data[i].stuff[j].borrowersEmail,
                receiverName: data[i].stuff[j].borrowersName,
                itemName: data[i].stuff[j].itemName,
                loanerName: loanerName
              });
            }
          }
        }
      }
  });
};

module.exports = findDeadbeat;
