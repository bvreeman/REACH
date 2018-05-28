let express = require('express');
let moment = require('moment')

let app = express();
const PORT = process.env.PORT || 8080;

require('dotenv').config();

const mysql = require('mysql');
const bodyParser = require('body-parser');

require('nodemon');
const exphbs = require('express-handlebars');

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


const trialSID = process.env.TWILIO_TRIAL_SID;
const realSID = process.env.TWILIO_SID;
const trialToken = process.env.TWILIO_TRIAL_TOKEN;
const realToken = process.env.TWILIO_TOKEN;

const client = require('twilio')(trialSID, trialToken);

const realNumber = +16123245498
const trialNumber = +15005550006

app.get('/testTwilio', function(req, res){
    client.messages.create({
        from: trialNumber,
        to: '+15072591109',
        body: 'This is a test', 
    }, function(err, data){
        if(err) {
            console.log(err);
        } else console.log(data.body);
    })
})

var routes = require("./controller/reachController.js");
app.use(routes);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});