let express = require('express');
let terminal = express.Router();

terminal.path = "/cmd";

terminal.all("/", (req, res) => res.render("cmd"));

module.exports = terminal;
