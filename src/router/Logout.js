let express = require('express');
let logout = express.Router();

logout.path = "/Logout";

logout.all("/", (req, res) => {
    delete req.session.user;
    res.redirect("/");
});

module.exports = logout;
