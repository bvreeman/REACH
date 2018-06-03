const express = require('express');

const router = express.Router();

const db = require('../models');
const contacts = db.contacts;
const moment = require('moment');

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
  contacts.findAll({where: {id:req.params.id}}).then(function(dbContacts) {
    console.log(dbContacts, dbContacts[0].dataValues.id);
    let dateAndTime = dbContacts[0].dataValues.scheduled_send.split(' ');
    let date = dateAndTime[0].split('-');
    let formattedObject = {
      contact_name: dbContacts[0].dataValues.contact_name,
      phone_number: dbContacts[0].dataValues.phone_number.replace("+1", ""),
      email_address: dbContacts[0].dataValues.email_address,
      outgoing_message: dbContacts[0].dataValues.outgoing_message,
      year: date[0],
      month: date[1],
      day: date[2],
      hour: moment(dateAndTime[1], ['HH:mm']).format('hh'),
      minute: moment(dateAndTime[1], ['HH:mm']).format('mm'),
      ampm: moment(dateAndTime[1], ['HH:mm']).format('A')
    }
    return res.render("edit",formattedObject);;

  });
});  

// Export routes for server.js to use.
module.exports = router;
