module.exports = class Connect {
    connect_form(req, res) {
        res.render('user_connect.pug');
    }

    async connect_user(req, res) {
        let Model = require("../models/User.js");
        let User = new Model();
        let Authentificate = await User.connect(req.body.email ,req.body.password);
        if (Authentificate) {
            res.render('index.pug', { connect: "Vous êtes connecté" })
            return;
        }
        res.render('user_connect.pug', { erreur: "Mot de passe incorrect" })
    }
}