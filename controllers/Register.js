module.exports = class Register {
    register_form(req, res) {
        res.render('user_register.pug');
    }

    async register_user(req, res) {
        if(req.body.password != req.body.confirmPassword) {
            res.render('user_register.pug', { erreur: "Le mot de passe n'a pas été confirmé" });
            return;
        }
        let Model = require("../models/User.js");
        let User = new Model();
        let UserExist = await User.user_exist(req.body.email);
        console.log(UserExist);
        if(UserExist){
            res.render('user_register.pug', { erreur: "L'email utilisé existe déjà" });
            return; 
        }
        User.add(req, res);
        res.redirect('/');
    }
}