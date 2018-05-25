require('dotenv').config()
const mysql = require('mysql');
const bodyParser = require('body-parser');
require('nodemon');
const exphbs = require('express-handlebars');
const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
const express = ('express');

var app = express();
var PORT = process.env.PORT || 8080;

app.get('/testTwilio', function(req, res){
    client.sendMessage({
        to: '+15072591109',
        from: '+16123245498',
        body: 'This is a test'
    }, function(err, data){
        if(err)
            console.log(err);
        console.log(data);
    })
})

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });