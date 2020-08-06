let express = require("express");
let signup = express.Router();

const {hash, compare} = require("../util/password.js");
signup.path = "/Signup";

signup.get("/", (req,res)=>{
    let callback = req.query.return;
    res.render("signup", {callback:callback});
});

signup.post("/", async(req,res)=>{
    let callback = req.body.callback;
    let email = req.body.email;
    let password1 = req.body.password1;
    let password2 = req.body.password2;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;

    let dao = require("../dao/UserDao.js");

    if(password1 === password2) {
        let password_hash = hash(password1);
        let test = await dao.getByUserName(email);

        if(test == null) {
            let id = await dao.insert(email, password_hash, firstName, lastName);
            req.session.user = await dao.getById(id);
            if(callback == "") {
                res.redirect("/");
            } else {
                res.redirect(callback);
            }
        } else {
            res.render("signup", {
                email:email,
                firstName:firstName,
                lastName:lastName,
                callback:callback,
                errMessage:"The email is already taken!"
            });
        }

    } else {
        res.render("signup", {
            email:email,
            firstName:firstName,
            lastName:lastName,
            callback:callback,
            errMessage:"The passwords must match!"
        });
    }
});

module.exports = signup;
