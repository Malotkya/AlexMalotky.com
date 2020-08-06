let express = require('express');
let index = express.Router();

index.path = "/";

index.all("/", (req, res) => res.render("index"));

module.exports = index;
