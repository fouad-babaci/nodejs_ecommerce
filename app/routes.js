const chalk = require('chalk');
module.exports = (app) => {

    app.get('/', function(req, res) {
        res.render('index')
    })
    app.get('/inscription', function(req, res) {
        res.render('user_register.pug')
    })
    app.get('/connect', function(req, res) {
        res.render('user_connect.pug')
    })
    app.post('/inscription', function(req, res) {
        const bcrypt = require('bcryptjs');
        const mongoose = require('mongoose');
        if(req.body.password != req.body.confirmPassword) {
            res.redirect('/inscription');
            return;
        }
        var userSchema = new mongoose.Schema({
            first_name: 'string',
            last_name: 'string',
            email: 'string',
            password: 'string'
          });
        var Users = mongoose.model('Users', userSchema);
        //hashage du password
        var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        var newUser = new Users({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hash
        })
        newUser.save(function (err){
            if (err) return console.log(err);
            console.log(chalk.blue.underline('Ajout réussi'));
            res.redirect('/');
        })
    })
}