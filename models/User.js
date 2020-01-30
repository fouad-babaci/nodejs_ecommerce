const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const chalk = require('chalk');

var userSchema = new mongoose.Schema({
    first_name: 'string',
    last_name: 'string',
    email: 'string',
    password: 'string'
  });
var Users = mongoose.model('Users', userSchema);

module.exports = class User {
    user_exist(email) {
        return new Promise((resolve, rejected) => {
            Users.findOne({ email: email }, function (err, result) {
                if (err) return console.log(err);
                if(result) resolve(true);
                resolve(false);
            });
        });
    }

    connect(email, password) {
        return new Promise((resolve, rejected) => {
            Users.findOne({ email: email }, function (err, user) {
                if (err) rejected(err);
                if(bcrypt.compareSync(password, user.password)){
                    resolve(user);
                }
                    resolve(false);
                })
            });
    }

    add(req, res) {
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
        })
    }
}