let express = require('express');

let app = express();
const PORT = process.env.PORT || 8080;

require('dotenv').config();

require("./routes/api-routes.js")(app);

const mysql = require('mysql');
const bodyParser = require('body-parser');

require('nodemon');
const exphbs = require('express-handlebars');

// const trialSID = process.env.TWILIO_TRIAL_SID;
// const realSID = process.env.TWILIO_SID;
// const trialToken = process.env.TWILIO_TRIAL_TOKEN;
// const realToken = process.env.TWILIO_TOKEN;
// const trialNumber = process.env.TWILIO_TRIAL_PHONE_NUMBER;
// const realNumber = process.env.TWILIO_PHONE_NUMBER;


// const client = require('twilio')(trialSID, trialToken);

// app.get('/testTwilio', function(req, res){
//     client.messages.create({
//         from: trialNumber,
//         to: '+15072591109',
//         body: 'This is a test', 
//     }, function(err, data){
//         if(err) {
//             console.log(err);
//         } else console.log(data.body);
//     })
// })

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});