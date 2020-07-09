const {compare} = require("../util/password.js");

class Login {
    constructor() {
        this.path = "/Login";
    }

    get(req, res) {
        res.render("login");
    }

    async post(req, res) {
        let userDao = require("../dao/UserDao.js");

        let username = req.body.username;
        let password = req.body.password;
        let forward = req.body.callback;

        try {
            let responce = await userDao.getByUserName(username);
            if(responce) {
                if( compare(password, responce.password) ) {
                     delete responce.password;
                     req.session.user = responce;
                }
            }
        } catch (error) {
            console.error(error);
        }

        if(forward) {
            res.redirect(forward);
        } else {
            res.redirect("/");
        }

    }
}

module.exports = new Login();
