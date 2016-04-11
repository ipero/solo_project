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
var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://raccoonzeeapp%40gmail.com:12345Abc@smtp.gmail.com');

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"Raccoonzee App 👥" <raccoonzeeapp@gmail.com>', // sender address
    to: 'myefeather@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world!!', // plaintext body
    html: '<b>Hello world 🐴</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
//---- END of NODEMAILER

app.listen(app.get("port"), function () {
  console.log('Listening on port: ', app.get("port"));
});
