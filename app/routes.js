module.exports = (app) => {

    app.get('/', function(req, res) {
        let Controller = require("../controllers/Home.js")
        let Home = new Controller()
        Home.print(req, res)
    })
    app.get('/inscription', function(req, res) {
        let Controller = require("../controllers/Register.js");
        let Register = new Controller();
        Register.register_form(req, res);
    })
    app.get('/connect', function(req, res) {
        let Controller = require("../controllers/Connect.js");
        let Connect = new Controller();
        Connect.connect_form(req, res);
    })
    app.get('/deconnect', function(req, res) {
        let Controller = require("../controllers/Connect.js");
        let Connect = new Controller();
        Connect.deconnect_user(req, res);
    })
    app.post('/inscription', function(req, res) {
        let Controller = require("../controllers/Register.js");
        let Register = new Controller();
        Register.register_user(req, res);
    })
    app.post('/connect', function(req, res) {
        let Controller = require("../controllers/Connect.js");
        let Connect = new Controller();
        Connect.connect_user(req, res);
    })
}