var express = require('express');
var router = express.Router();
var User = require("../../models/user.js");
var moment = require("moment");

router.get("/", function(req, res){

  User.user.find({_id:req.session.passport.user}, function(err, data){
      if(err){
        console.log(err);
      }else{
      //   var date = moment(data[0].stuff[0].dateBorrowed).format("YYYY-DD-MM");
      //   data[0].stuff[0].dateBorrowed = date;
      // console.log(data[0].stuff[0].dateBorrowed +" "+ date);
      res.send(data);
    }
  });
});

router.delete("/delete/:id", function(req, res){
  var userId = req.session.passport.user;
  var deleteItemId = req.params.id;
  console.log("Delete item _id", req.params.id + "user _id" + userId);

  User.user.update(
    { "_id": req.session.passport.user },
    { "$pull": { "stuff": { "_id": req.params.id } } },
    function(err, numAffected) {
        if(err){
            console.log(err);
        } else {
            res.status(200).send();
        }
    }
  );


});

//Update data for particular item
router.post('/', function(req, res){

  var item = req.body._id;
  console.log(item._id);
  console.log("Request data------ ", req.user._id);
  res.status(200).send();


  // User.user.findOne({googleEmail:req.body.email}, function(err, user){
  //   if(err){
  //       console.log(err);
  //     }else {
  //       console.log(user);
  //       User.userStuff.create({
  //           borrowersName: req.body.borrowersName,
  //           borrowersEmail: req.body.borrowersEmail,
  //           itemName: req.body.itemName,
  //           itemDesc: req.body.itemDesc,
  //           dateBorrowed: req.body.dateBorrowed,
  //           returnDueDate: req.body.returnDueDate
  //         },
  //         function(err, createdItem){
  //           user.stuff.push(createdItem);
  //           user.save(function(err){
  //           if(err){
  //             console.log(err);
  //           } else {
  //             res.status(200).send();
  //           }
  //         })
  //
  //       })
  //     }
  // });
});

module.exports = router;
