// Require Node Modules
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
// Require Custom App Modules
var passport = require('./auth/passport.js');
var configs = require('./config/auth.js');
var index = require('./routes/index.js');
var auth = require('./routes/auth.js');
var isLoggedIn = require('./utils/auth.js');
var private = require('./routes/private/index.js');
var database = require('./utils/database.js');
var mailer = require('./services/mailer.js'); //--- check this

// Express App Config
var app = express();
app.use('/public', express.static(__dirname + '/public'));  // serve files from public

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("port", process.env.PORT || 5000);
// Database Connection Handling
database();

// Session Creation and Storage
app.use(session({
  secret: configs.sessionVars.secret,
  key: 'user',
  resave: 'true',
  saveUninitialized: false,
  cookie: { maxage: 60000, secure: false },
}));
// Passport
app.use(passport.initialize()); // kickstart passport
/**
 * Alters request object to include user object.
 * @see {@link auth/passport}
 */
app.use(passport.session());
// Routes
app.use('/auth', auth);
app.use('/private', isLoggedIn, private);
app.use('/', index);


//----START TESTING NODEMAILER-----
// mailer.sendPwdReminder({
//     to: 'myefeather@gmail.com'
// }, {
//     username: 'Raccoonzee',
//     password: 'erwerwerfdsf3234q2123432423'
// }, function(err, info){
//     if(err){
//        console.log('Error');
//     }else{
//         console.log('Password reminder sent');
//     }
// });
// //get data for mailer
// var User = require("./models/user.js");
//
// var mailOptions = {
//     from: '"Raccoonzee App" <raccoonzeeapp@gmail.com>', // sender address
//     to: 'myefeather@gmail.com', // list of receivers
//     subject: 'Hello object 3', // Subject line
//     text: 'Hello world!!', // plaintext body
//     html: '<p>Hello world</p><br /> <p>Please return this item' // html body
// };
//mailer.sendMail(mailOptions);

// --- End NODEMAILER -----


app.listen(app.get("port"), function () {
  console.log('Listening on port: ', app.get("port"));
});
