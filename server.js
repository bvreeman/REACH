let express = require('express');

let app = express();
const PORT = process.env.PORT || 8080;

const db = require("./models");

require('dotenv').config();

require("./routes/api-routes.js")(app);

const mysql = require('mysql');
const bodyParser = require('body-parser');

require('nodemon');
const exphbs = require('express-handlebars');


db.sequelize.sync().then(function() {
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
});