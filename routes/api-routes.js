// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Contact model
const db = require('../models');
const moment = require('moment');

const m = moment()
;

// console.log('\n<------------------------------>\n');
// console.log(db.contacts);
// console.log('\n<------------------------------>\n');

const contacts = db.contacts;

const trialSID = process.env.TWILIO_TRIAL_SID;
const realSID = process.env.TWILIO_SID;
const trialToken = process.env.TWILIO_TRIAL_TOKEN;
const realToken = process.env.TWILIO_TOKEN;
const trialNumber = process.env.TWILIO_TRIAL_PHONE_NUMBER;
const realNumber = process.env.TWILIO_PHONE_NUMBER;

const client = require('twilio')(trialSID, trialToken);

// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the todos

  app.get('/api/getNumber/:id', function(req, res) {
    contacts.findOne({
      where: {
        id: req.params.id,
      },
    }).then(function(dbContacts) {
      res.json(dbContacts);
    });
  });
  let phoneNumber;
  let outgoingMessage;

  app.get('/testTwilio/:id', function(req, res) {
    contacts.findOne({
      where: {
        id: req.params.id,
      },
    }).then(function(dbContacts) {
      // console.log('\n<---------------------->\n');
      // console.log(dbContacts.dataValues.phone_number);
      // console.log('\n<---------------------->\n');

      phoneNumber = dbContacts.dataValues.phone_number;
      outgoingMessage = dbContacts.dataValues.outgoing_message;

      client.messages.create({
        from: trialNumber,
        to: phoneNumber,
        body: outgoingMessage,
      }, function(err, data) {
        if (err) {
          console.log(err);
        } else console.log(data.body);
      });
    });
  });

  app.get('/api/getNumber', function(req, res) {
    contacts.findAll({}).then(function(dbContacts) {
      return res.json(dbContacts);
    });
  });

  app.get('/api/remaining', function(req, res) {
    console.log(req);
    contacts.findAll({ limit: 1, order: [['scheduled_send']] }).then(function(dbContacts) {
    // found = dbContacts.find(function(element) {
    //   console.log('\n<---------------------------->\n');
    //   console.log(`CHECK THIS OUT!!! ${element.scheduled_send}`);
    //   console.log(m);
    //   console.log('\n<---------------------------->\n');
    //   return res.json(element.scheduled_send >= m);
    // function getMinScheduledSend(dbContacts) {
    //   // console.log(dbContacts);
    //   // return res.json(dbContacts.reduce((min, p) =>
    //   //   (p.scheduled_send < min ? p.scheduled_send : min), dbContacts[0].scheduled_send));
    //   // console.log(m);
    //   // console.log(moment(dbContacts[0].dataValues.scheduled_send));
    //   return res.json(dbContacts.filter(e => e.scheduled_send >= m));
    //   // return res.json(dbContacts.filter(e => e.phone_number === '+15072591109'));
    // });
      return res.json(dbContacts);
    });
  });

  app.get('/api/earliest', function(req, res) {
    contacts.findAll({}).then(function(dbContacts) {
      dbContacts.sort(function (a, b) {
        return a.scheduled_send - b.scheduled_send;
      });
    });
  });

  // POST route for saving a new contact
  app.post('/api/getNumber', function(req, res) {
    // console.log(`POST: ${req.body}`);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    contacts.create({
      contact_name: req.body.contact_name,
      phone_number: req.body.phone_number,
      outgoing_message: req.body.outgoing_message,
      email_address: req.body.email_address,
      // scheduled_date: req.body.scheduled_date,
      // scheduled_time: req.body.scheduled_time,
      scheduled_send: req.body.scheduled_send,
      sent: req.body.sent,
    }).then(function(dbContacts) {
      // We have access to the new coontact as an argument inside of the callback function
      res.json(dbContacts);
    });
  });

  // // DELETE route for deleting todos. We can get the id of the todo we want to delete from

  app.delete('/outbox/:id', function(req, res) {
    contacts.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function(dbContacts) {
      res.json(dbContacts);
    });
  });

//   // PUT route for updating todos. We can get the updated todo from req.body
//   app.put("/api/todos", function(req, res) {

//   });
};
