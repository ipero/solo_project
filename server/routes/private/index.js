/**
 * Handles all routing for private routes.
 *
 * @module routes/private/index
 */
var express = require('express');
var router  = express.Router();
var add = require('./add.js');
var view = require('./view.js');

/** ---------- SUBROUTES ---------- **/
router.use('/add', add);
router.use('/view', view);

/**
 * GET private/index
 */
router.get('/', function (req, res) {
  res.redirect('/'); // they made it!
});

module.exports = router;
