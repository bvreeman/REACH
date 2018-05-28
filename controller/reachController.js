var express = require("express");

var router = express.Router();


// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {

    res.render("home");
  });

// Export routes for server.js to use.
module.exports = router;
