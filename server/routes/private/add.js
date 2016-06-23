
var express = require('express');
var router = express.Router();
var User = require("../../models/user.js");

router.get('/', function (req, res) {
  res.send({ message: 'What was borrowed?' });
});

router.post('/', function(req, res){

  User.user.findOne({_id:req.session.passport.user}, function(err, user){
    if(err){
        console.log(err);
      }else {
        //console.log(user);
        User.userStuff.create({
            borrowersName: req.body.borrowersName,
            borrowersEmail: req.body.borrowersEmail,
            itemName: req.body.itemName,
            itemDesc: req.body.itemDesc,
            dateBorrowed: req.body.dateBorrowed,
            returnDueDate: req.body.returnDueDate
          },
          function(err, createdItem){

            user.stuff.push(createdItem);
            console.log("Was able to push");
            user.save(function(err){
            if(err){
              console.log("Error ons save:", err);
            } else {
              res.status(200).send();
            }
          })

        })
      }
  });
});


module.exports = router;
