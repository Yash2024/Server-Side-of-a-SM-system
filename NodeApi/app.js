var express = require('express');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
const dbConfig = require('./config/database.config.js');


mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, { useNewUrlParser: true }).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get('/', (req, res) => res.send('API is running!!!'));

require('./routes/Product.routes.js')(app);

var server = app.listen(5500, () => {
    console.log("Server is listening on port 5500");
});