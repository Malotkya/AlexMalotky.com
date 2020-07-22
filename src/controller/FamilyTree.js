class FamilyTree {
    constructor() {
        this.path = "/FamilyTree";
    }

    async get(req, res) {
        if(req.session.user) {
            if(req.session.user.roles.includes("Family")) {
                await FamilyTree.loadFamilyTree(req, res);
            } else {
                res.render("error", {
                    title:"Access Denied!",
                    message:"You must be logged in as a family member to access this page.",
                    user:req.session.user
                });
            }

        } else {
            res.render("login", {callback:"/FamilyTree"});
        }
    }

    static async loadFamilyTree(req, res) {
        let dao = require("../dao/FamilyDao.js");
        try {
            let parent = await dao.getById(1);
            res.render('familyTree', {
                parent:parent,
                user:req.session.user
            });
        } catch (e) {
            res.render('error', {
                title: "Database Error",
                message: "There was a problem contacting the database."
            });
        }
    }
}

module.exports = new FamilyTree();
