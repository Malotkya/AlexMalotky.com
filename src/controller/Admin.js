//import {getUser, postUser} from "../util/user.js";

class Admin {
    constructor() {
        this.path = "/Admin";
    }



    async get(req, res) {
        if(req.session.user) {
            res.render("admin");
        } else {
            res.render("login")
        }
    }

    async post(req, res) {
        try {
            let user = null; //await postUser(req, res);

            if(user == null) {
                res.render("login", {errMsg:"Username or Password are incorect!",
                                     username:req.body.username});
            } else {
                res.render("admin", {user:user});
            }
        } catch (error) {
            res.render("error", {message: JSON.stringify(error)})
        }
    }
}

module.exports = new Admin();
