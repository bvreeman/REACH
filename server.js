const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

const db = require('./models');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('dotenv').config();

require('./routes/api-routes.js')(app);

require('nodemon');
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const routes = require('./routes/html-routes.js');

app.use(routes);

db.sequelize.sync().then(() => {
  app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT}`);
  });
});
