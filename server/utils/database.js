//Connect to DB
var databaseUri = require('../config/database.js');
var mongoose = require('mongoose');

module.exports = function () {
  console.log(process.env.MONGOLAB_URI);
  mongoose.connect(process.env.MONGOLAB_URI);

  // When successfully connected
  mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + databaseUri);
  });

  // If the connection throws an error
  mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
  });

  // When the connection is disconnected
  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
  });

};
