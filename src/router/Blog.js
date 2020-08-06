let express = require('express');
let blog = express.Router();

blog.path = "/Blog";

blog.all("/", (req,res)=>res.render("blog"));

module.exports = blog;
