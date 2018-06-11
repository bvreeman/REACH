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


let currentTime;

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

  app.get('/testingTime', function(req, res) {
    currentTime = moment().format('YYYY-MM-DD hh:mm A');
    contacts.findAll({}).then(function(dbContacts) {
      // console.log(dbContacts);
      if (dbContacts[0].dataValues.scheduled_send != currentTime) {
        console.log(currentTime);
        console.log('yeehaw!!!');
      } else {
        console.log(currentTime);
        console.log('try again!');
      }
    });
  });

  let timerVariable;

  app.get('/api/remaining', function(req, res) {
    function twilioGo() {
      currentTime = moment().format('YYYY-MM-DD hh:mm A');
      console.log('it is running');
      contacts.findAll({
        where:
        {
          sent: false,
        },
        order: [
          ['scheduled_send', 'ASC'],
        ],
      }).then(function(dbContacts) {
        for (let i = 0; i < dbContacts.length; i++) {
          if (dbContacts[i].scheduled_send == currentTime) {
            phoneNumber = dbContacts[i].phone_number;
            outgoingMessage = dbContacts[i].outgoing_message;

            client.messages.create({
              from: trialNumber,
              to: phoneNumber,
              body: outgoingMessage,
            }, function(err, data) {
              if (err) {
                console.log(err);
                return (dbContacts);
              }
              console.log(`CHECK OUT THIS DATA ${data.body}`);
              contacts.update(
                {
                  sent: true,
                },
                {
                  where:
                    {
                      id: dbContacts[i].dataValues.id,
                    },
                  returning: true,
                },
              ).then(function(result) {
                return (result);
              // console.log(result);
              });
              return (dbContacts);
            });
          }
        }
        clearTimeout(timerVariable);
        timerVariable = setTimeout(function() { twilioGo(); }, 60000);
        return (dbContacts);
      });
      clearTimeout(timerVariable);
      timerVariable = setTimeout(function() { twilioGo(); }, 60000);
    }
    twilioGo();
  });

  // This function sends all of the messages in queue regardless of DATE/TIME
  // or currently if it has been sent.

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

  // This function sends the message for a specified ID

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

  // function that accesses all of the items in the API

  app.get('/api/getNumber', function(req, res) {
    contacts.findAll({}).then(function(dbContacts) {
      return res.json(dbContacts);
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

  app.get('/send/:id', function(req, res) {
    contacts.update(
      {
        sent: false,
      },
      {
        where:
        {
          id: req.params.id,
        },
        returning: true,
      },
    ).then(function(result) {
      return res.json(result);
      // console.log(result);
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
    contacts.update({
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


// function that puts an ID into outgoingID based on
// scheduled_send. Goes into /testTwilio/:id below.
// app.get(`/testTwilio/:${outgoingID}`, function(req, res) {
//   contacts.findOne({
//     where: {
//       id: req.params.id,
//     },
//   }).then(function(dbContacts) {
//     // console.log('\n<---------------------->\n');
//     // console.log(dbContacts.dataValues.phone_number);
//     // console.log('\n<---------------------->\n');

//     phoneNumber = dbContacts.dataValues.phone_number;
//     outgoingMessage = dbContacts.dataValues.outgoing_message;

//     client.messages.create({
//       from: trialNumber,
//       to: phoneNumber,
//       body: outgoingMessage,
//     }, function(err, data) {
//       if (err) {
//         console.log(err);
//       } else console.log(data.body);
//     });
//   });
// })

// app.get('/api/remaining', function(req, res) {
//   contacts.findAll({
//     where:
//       {
//         sent: false,
//       },
//     order: [
//       ['scheduled_send', 'ASC'],
//     ],
//   }).then(function(dbContacts) {
//     phoneNumber = dbContacts[0].phone_number;
//     outgoingMessage = dbContacts[0].outgoing_message;

//     client.messages.create({
//       from: trialNumber,
//       to: phoneNumber,
//       body: outgoingMessage,
//     }, function(err, data) {
//       if (err) {
//         console.log(err);
//       } else console.log(data.body);
//     });
//   });
// });

//   function myFunction(){
//     console.log('myFunction Called')
// }

// myFunction();

// setInterval(function(){
//     myFunction()}, 30000)

// app.get('/api/remaining', function(req, res) {
//   function twilioGo() {
//     console.log('it is running');
//     contacts.findAll({
//       where:
//       {
//         sent: false,
//       },
//       order: [
//         ['scheduled_send', 'ASC'],
//       ],
//     }).then(function(dbContacts) {
//       phoneNumber = dbContacts[0].phone_number;
//       outgoingMessage = dbContacts[0].outgoing_message;
//       client.messages.create({
//         from: realNumber,
//         to: phoneNumber,
//         body: outgoingMessage,
//       }, function(err, data) {
//         if (err) {
//           console.log(err);
//         } else console.log(data.body);
//       });
//       return (dbContacts);
//     }).then(function(dbContacts) {
//       contacts.update(
//         {
//           sent: true,
//         },
//         {
//           where:
//         {
//           id: dbContacts[0].dataValues.id,
//         },
//           returning: true,
//         },
//       ).then(function(result) {
//         // return res.json(result);
//         // console.log(result);
//       });
//     });
//   }
//   twilioGo();

//   setInterval(function() {
//     twilioGo();
//   }, 60000);
// });
