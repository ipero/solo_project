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
var mailer = require('./services/mailer.js'); //--- TO DO: call mailer on schedule
//var schedule = require('node-schedule');

var cron = require('node-schedule');
// run the job at 18:55:30 on Dec. 14 2018
//var today = new Date().now();
//console.log(today);
// var date = new Date(2016, 03, 12, 14, 38, 30);
// cron.scheduleJob(date, function(){
//     console.log(new Date(), "Somthing important is going to happen today!");
// });
var rule = new cron.RecurrenceRule();
rule.second = 30;
cron.scheduleJob(rule, function(){
    console.log(new Date(), 'The 30th second of the minute.');
});


// var j = schedule.scheduleJob('42 * * * *', function(){
//   console.log('The answer to life, the universe, and everything!');
// });

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

app.listen(app.get("port"), function () {
  console.log('Listening on port: ', app.get("port"));
});
