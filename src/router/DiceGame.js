let express = require('express');
let dice = express.Router();

dice.path = "/Dice";

dice.all("/", (req,res)=>res.render("dice.ejs"));

module.exports = dice;
