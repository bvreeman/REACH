const express = require('express');

const router = express.Router();

// These lines of code for linking the CSS files for html rendering
const path = require('path');
const publicPath = path.join(__dirname, '../public');
router.use ('/', express.static(publicPath));


// Create all our routes and set up logic within those routes where required.
router.get('/', function(req, res) {
  res.render('home');
});

// Export routes for server.js to use.
module.exports = router;
