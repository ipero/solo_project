/**
 * Connection URI for a Mongo database that will hold our
 * application's persistent data.

 */
 var uristring =
   process.env.MONGOLAB_URI;
//var mongoDB = mongoose.connect(uristring).connection;

module.exports = uristring;
