let express = require('express');
let resume = express.Router();

resume.path = "/Resume";

resume.get("/", async(req,res)=>{
    let schoolDao = require("../dao/SchoolDao.js");
    let jobDao = require("../dao/JobDao.js");
    let errorMessage = "";
    let schoolHistory = Array();
    let jobHistory = Array();

    try {
        schoolHistory = await schoolDao.getAll();
        jobHistory = await jobDao.getAll();

    } catch (error) {
        console.error(error);
        errorMessage = "There was a problem connecting to the database!";
    }

    res.render("resume", {
        schoolHistory:schoolHistory,
        jobHistory:jobHistory,
        errMsg:errorMessage
    });
});

module.exports = resume;
