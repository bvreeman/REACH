// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Contact model
const db = require('../models');
const moment = require('moment');
// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('database', 'username', 'password');


const m = moment();

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
  let outgoingID;

  // function that puts an ID into outgoingID based on
  // scheduled_send. Goes into /testTwilio/:id below.
  // function goApp() {
  //   app.get(`/testTwilio/:${outgoingID}`, function(req, res) {
  //     contacts.findOne({
  //       where: {
  //         id: req.params.id,
  //       },
  //     }).then(function(dbContacts) {
  //     // console.log('\n<---------------------->\n');
  //     // console.log(dbContacts.dataValues.phone_number);
  //     // console.log('\n<---------------------->\n');

  //       phoneNumber = dbContacts.dataValues.phone_number;
  //       outgoingMessage = dbContacts.dataValues.outgoing_message;

  //       client.messages.create({
  //         from: trialNumber,
  //         to: phoneNumber,
  //         body: outgoingMessage,
  //       }, function(err, data) {
  //         if (err) {
  //           console.log(err);
  //         } else console.log(data.body);
  //       });
  //     });
  //   });
  // }

  const unsentArray = [];
  const sentArray = [];

  app.get('/api/remaining', function(req, res) {
    contacts.findAll({ limit: 1, order: [['scheduled_send']] }).then(function(dbContacts) {
      // console.log(dbContacts);
      for (let i = 0; i < dbContacts.length; i++) {
        if (dbContacts[i].dataValues.sent === false) {
          unsentArray.push(dbContacts);
          // return res.json(unsentArray);
        } if (dbContacts[i].dataValues.sent === true) {
          sentArray.push(dbContacts);
        }
      }
      return res.json(unsentArray);
    });
  });

  app.get('/testTwilio/:id', function(req, res) {
    contacts.findOne({
      where: {
        id: req.params.id,
      },
    }).then(function(dbContacts) {
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

  app.get('/sendAll', function(req, res) {
    contacts.findAll({}).then(function(dbContacts) {
      for (let i = 0; i < dbContacts.length; i++) {
        phoneNumber = dbContacts[i].dataValues.phone_number;
        outgoingMessage = dbContacts[i].dataValues.outgoing_message;

        client.messages.create({
          from: trialNumber,
          to: phoneNumber,
          body: outgoingMessage,
        }, function(err, data) {
          if (err) {
            console.log(err);
          } else console.log(data.body);
        });
      }
    });
  });

  app.get('/api/getNumber', function(req, res) {
    contacts.findAll({}).then(function(dbContacts) {
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

  // PUT route for updating todos. We can get the updated todo from req.body

  app.put('/edit/:id', function (req, res) {
    contacts.udpate({
      contact_name: req.body.contact_name,
      phone_number: req.body.phone_number,
      outgoing_message: req.body.outgoing_message,
      email_address: req.body.email_address,
      scheduled_send: req.body.scheduled_send,
    }, {
      where: {
        id: req.params.id,
      },
    }).then(function(dbContacts) {
      res.json(dbContacts);
    });
  });
};
