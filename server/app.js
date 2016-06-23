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
var schedule = require('node-schedule');
var deadbeatFinder = require('./services/findDeadbeat.js');

// This runs at 8:30AM every day of week.
var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0,1,2,3,4,5,6];
rule.hour = 8;
rule.minute = 30;
schedule.scheduleJob(rule, function(){
    console.log('A deadbeatFinder runs at 8:30AM every day of the week.');
    deadbeatFinder();
});

// var demoRule = new schedule.RecurrenceRule();
// demoRule.second = 45;
// schedule.scheduleJob(demoRule, function(){
//     console.log(new Date(), 'The 45th second of the minute. Calling findDeadbeat');
//     deadbeatFinder();
// });


// Express App Config
var app = express();
app.use('/public', express.static(__dirname + '/public'));  // serve files from public

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("port", (process.env.PORT || 5000));

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

//deadbeatFinder();
