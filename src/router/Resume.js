let express = require('express');
let resume = express.Router();

resume.path = "/Resume";

resume.get("/", async(req,res)=>{
    let resumeDao = require("../dao/ResumeDao.js");
    let errorMessage = "";
    let schoolHistory = Array();
    let jobHistory = Array();

    try {
        schoolHistory = await resumeDao.getAllSchoolHistory();
        jobHistory = await resumeDao.getAllJobHistory();

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
