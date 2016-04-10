var express = require('express');
var router = express.Router();
var User = require("../../models/user.js");
var moment = require("moment");
router.get("/:id", function(req, res){
  console.log("Got from client side ", req.params.id );
  User.user.find({googleEmail:req.params.id}, function(err, data){
      if(err){
        console.log(err);
      }else{
        var date = moment(data[0].stuff[0].dateBorrowed).format("YYYY-DD-MM");
        data[0].stuff[0].dateBorrowed = date;
      console.log(data[0].stuff[0].dateBorrowed +" "+ date);
      res.send(data);
    }
  });
});

router.delete("/delete/:id", function(req, res){
  var userId = req.session.passport.user;
  var deleteItemId = req.params.id;
  console.log("Delete ", req.params.id, userId);

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

module.exports = router;
