const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const chalk = require('chalk');
const config = require("./app/config.js");
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }))
 


//connexion mongo db
mongoose.connect(config.db_mongo, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(chalk.blue.underline('Connexion a la base de donnée réussie'));
});


app.set('views', path.join(__dirname, 'templates'))
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public'))); 

//router
require("./app/routes.js")(app);

app.listen(config.port, () => {
    console.log(chalk.blue.underline('http://127.0.0.1:'+config.port));
})
