const express = require('express');

const router = express.Router();

const db = require('../models');
const contacts = db.contacts;

// These lines of code for linking the CSS files for html rendering

const path = require('path');

const publicPath = path.join(__dirname, '../public');
router.use('/', express.static(publicPath));


// Create all our routes and set up logic within those routes where required.
router.get('/', function(req, res) {
  res.render('home2');
});

router.get("/outbox", function(req, res) {
  contacts.findAll({}).then(function(dbContacts) {
    return res.render("outbox",{dbContacts: dbContacts});;

  });
});  

router.get("/edit/:id", function(req, res) {
  contacts.findById(req.params.id).then(function(dbContacts) {
    return res.render("outbox",{dbContacts: dbContacts});;

  });
});  

// Export routes for server.js to use.
module.exports = router;
