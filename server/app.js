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


app.listen(app.get("port"), function () {
  console.log('Listening on port: ', app.get("port"));
});
