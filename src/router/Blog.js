let express = require('express');
let blog = express.Router();
let dao = require('../dao/BlogDao.js');

blog.path = "/Blog";

blog.get("/", async(req,res)=>{
    res.render("blog", {entries:await dao.getAll()});
});

module.exports = blog;
