module.exports = class Connect {
    connect_form(req, res) {
        res.render('user_connect.pug');
    }

    async connect_user(req, res) {
        let Model = require("../models/User.js");
        let User = new Model();
        let UserConnected = await User.connect(req.body.email ,req.body.password);
        if (UserConnected) {
            req.session.login = true;
            req.session.user = {
                first_name : UserConnected.first_name,
                last_name : UserConnected.last_name,
                email : UserConnected.email
            };
            req.flash('info', 'Connection réussie');
            res.redirect('/')
            return;
        }
        res.render('user_connect.pug', { erreur: "Mot de passe incorrect" })
    }

    deconnect_user(req, res) {
        req.session.login = false;
        req.session.user = "";
        res.redirect('/');
    }
}