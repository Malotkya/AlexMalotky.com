class Admin {
    constructor() {
        this.path = "/Admin/:Page?/:Action?";
    }

    static async loadAdminPage(request, responce) {
        let resumeDao = require('../dao/ResumeDao.js');
        let schoolHistory = await resumeDao.getAllSchoolHistory();
        let jobHistory = await resumeDao.getAllJobHistory();
        let page = request.params.Page
        //let blog = require('blog.js');

        responce.render("admin", {
            user:request.session.user,
            schoolHistory:schoolHistory,
            jobHistory:jobHistory,
            page:page
        });
    }

    async get(req, res) {
        if(req.session.user) {
            if(req.session.user.roles.includes("Admin")) {
                await Admin.loadAdminPage(req, res);
            } else {
                res.render("error", {
                    title:"Access Denied!",
                    message:"You must be logged in as an admin to access this page.",
                    user:req.session.user
                });
            }

        } else {
            res.render("login", {callback:"/Admin"}); //{callback:`/Admin/${page}`});
        }
    }

    async post(req, res) {
        if(req.session.user.roles.includes("Admin")) {
            let action = req.params.Action;
            let objectType = req.params.Page;
            let resumeDao = require("../dao/ResumeDao");
            let body = req.body;

            try
            {
                switch(action) {
                case "Delete":
                    if(objectType == "Job") {
                        resumeDao.deleteJob(body.id);
                    } else if(objectType == "School") {
                        resumeDao.deleteSchool(body.id);
                    }
                    break;
                case "Update":
                    if(objectType == "Job") {
                        resumeDao.updateJob(body.id, body.title, body.location, body.startDate, body.endDate, body.description);
                    } else if(objectType == "School") {
                        resumeDao.updateSchool(body.id, body.name, body.degree, body.gpa, body.graduated, body.comments);
                    }
                    break;
                case "New":
                    if(objectType == "Job") {
                        resumeDao.insertJob(body.title, body.location, body.startDate, body.endDate, body.description);
                    } else if(objectType == "School") {
                        resumeDao.insertSchool(body.name, body.degree, body.gpa, body.graduated, body.comments);
                    }
                    break;
                default:
                    res.redirect(`/Admin/${objectType}`);
                    break;
                }
            } catch(error) {
                console.error(error);
                res.status(500).send(JSON.stringify(error)).end();
            }

            res.status(200).send("Sucess").end();
        }
    } else {
        res.redirect('/Error')
    }
}

module.exports = new Admin();
