// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Contact model
var db = require("../models");
var contacts = db.contacts;


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
  app.get("/testTwilio", function(req, res) {
    client.messages.create({
        from: trialNumber,
        to: '+15072591109',
        body: 'This is a test', 
    }, function(err, data){
        if(err) {
            console.log(err);
        } else console.log(data.body);
    })
    });

    // console.log(db.contacts);

//   app.get("/getNumber", function(req, res) {
//     contacts.findAll({}).then(function(results) {
//         return res.json(results);
//         });
//   })

//   // POST route for saving a new todo
//   app.post("/api/todos", function(req, res) {
//     console.log(req.body);
//     // create takes an argument of an object describing the item we want to
//     // insert into our table. In this case we just we pass in an object with a text
//     // and complete property (req.body)
//     db.Todo.create({
//       text: req.body.text,
//       complete: req.body.complete
//     }).then(function(dbTodo) {
//       // We have access to the new todo as an argument inside of the callback function
//       res.json(dbTodo);
//     });
//   });

//   // DELETE route for deleting todos. We can get the id of the todo we want to delete from
//   // req.params.id
//   app.delete("/api/todos/:id", function(req, res) {

//   });

//   // PUT route for updating todos. We can get the updated todo from req.body
//   app.put("/api/todos", function(req, res) {

//   });
};
