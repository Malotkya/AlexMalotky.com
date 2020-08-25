let express = require('express');
let portfolio = express.Router();

portfolio.path = "/Portfolio";

portfolio.all("/", (req,res) => res.render("portfolio"));

module.exports = portfolio;
