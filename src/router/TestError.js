let express = require('express');
let test = express.Router();

test.path = "/Test";

test.all("/:status/:message", (req,res)=>{
    let status = req.params.status;
    let message = req.params.message;

    res.status(status).render("error", {message:message});
});

module.exports = test;
