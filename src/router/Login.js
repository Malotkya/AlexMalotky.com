let express = require('express');
let login = express.Router();

const {compare} = require("../util/password.js");
login.path = "/Login";

login.get("/", (req,res)=>res.render("login"));

login.post("/", async(req,res)=>{
    let userDao = require("../dao/UserDao.js");

    let username = req.body.username.trim();
    let password = req.body.password.trim();
    let forward = req.body.callback.trim();

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
});

module.exports = login;