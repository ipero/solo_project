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

  User.user.update(
    { "_id": userId },
    { "$pull": { "stuff": { "_id": deleteItemId } } },
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
  var item = req.body;
  
  User.user.findOneAndUpdate(
    { "_id": req.user._id, "stuff._id": item._id },
    {
        "$set": {
            "stuff.$.borrowersName": item.borrowersName,
            "stuff.$.borrowersEmail": item.borrowersEmail,
            "stuff.$.itemName": item.itemName,
            "stuff.$.itemDesc": item.itemDesc,
            "stuff.$.dateBorrowed": item.dateBorrowed,
            "stuff.$.returnDueDate": item.returnDueDate
        }
    },
    function(err,doc) {
      if(err){
          console.log(err);
      } else {
          res.status(200).send();
      }
    }
  );

});

module.exports = router;
