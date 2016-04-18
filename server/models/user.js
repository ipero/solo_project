/**
 * User schema for Mongoose.
 *
 * @module models/user
 */
var mongoose = require('mongoose');

var userStuff = mongoose.Schema({
  borrowersName: String,
  borrowersEmail: String,
  itemName: String,
  itemDesc: String,
  dateBorrowed: String,
  returnDueDate: String
});

var userSchema = mongoose.Schema({
  googleId: String,
  googleToken: String,
  googleEmail: String,
  googleName: String,
  stuff: [userStuff]
});

exports.user = mongoose.model('User', userSchema);
exports.userStuff = mongoose.model('UserStuff', userStuff);
