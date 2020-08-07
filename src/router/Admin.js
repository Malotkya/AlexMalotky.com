let express = require('express');
let admin = express.Router();

let jobDao = require('../dao/JobDao.js');
let schoolDao = require('../dao/SchoolDao.js');

//TODO: fix this whole page!!!!!!!!!!!!
admin.path = "/Admin";

admin.get("/:Page?", async(req,res) => {
    if(req.session.user.roles.includes("Admin")) {

        let schoolHistory = await schoolDao.getAll();
        let jobHistory = await jobDao.getAll();
        let page = req.params.Page
        //let blog = require('blog.js');

        res.render("admin", {
            schoolHistory:schoolHistory,
            jobHistory:jobHistory,
            page:page
        });

    } else {
        if(req.session.user.id === -1) {
            res.render("login", {callback:"/Admin"});
        } else {
            res.render("error", {
                title:"Access Denied!",
                message:"You must be logged in as an admin to access this page.",
                user:req.session.user
            });
        }
    }
});

admin.post("/:Page", async(req,res) => {
    if(req.session.user.roles.includes("Admin")) {
        let page = req.params.Page;
        let body = req.body;

        if( page === "Job" && body.id === "" ) {
            jobDao.insert(body);
        } else if( page === "Job" ) {
            jobDao.update(body);
        } else if( page === "School" && body.id === "" ) {
            schoolDao.insert(body);
        } else if( page === "School" ) {
            schoolDao.update(body);
        } else {
            //Error
        }

        res.redirect(`/Admin/${page}`);

    } else {
        res.render("error", {
            title:"Access Denied!",
            message:"You must be logged in as an admin to access this page.",
            user:req.session.user
        });
    }
});

admin.delete("/:Page", async(req,res) => {
    if(req.session.user.roles.includes("Admin")) {
        let page = req.params.Page;
        let body = req.body;

        if( page === "Job" ) {
            jobDao.delete(body.id);
        } else if( page === "School" ) {
            schoolDao.delete(body.id);
        } else {
            //Error
        }

        res.end();

    } else {
        res.render("error", {
            title:"Access Denied!",
            message:"You must be logged in as an admin to access this page.",
            user:req.session.user
        });
    }
});

module.exports = admin;
