class FamilyTree {
    constructor() {
        this.path = "/FamilyTree/:Action?";
    }

    async get(req, res) {
        if(req.session.user) {
            if(req.session.user.roles.includes("Family")) {
                let dao = require("../dao/FamilyDao.js");
                let family = await dao.getAll();
                let id = req.query.id;

                res.render('familyTree', {
                    tree:family,
                    user:req.session.user,
                    id:id
                });

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

    async post(req, res) {
        if(req.session.user.roles.includes("Family-Admin")) {
            let dao = require("../dao/FamilyDao.js");
            let action = req.params.Action;
            let id = -1;

            switch(action) {
            case "Create":
                id = await dao.insert(req.body.name,
                                      null, //picture location
                                      req.body.parent_id
                                  );
                break;
            case "Update":
                id = await dao.update(req.body.id,
                                      req.body.name,
                                      null, //picture location
                                      req.body.parent_id
                                  );
                break;
            case "Delete":
                dao.delete(req.body.id);
                break;
            default:
                //Do Nothing
            }
            console.log(id);
            let redirect = "";
            if(id >= 0) {
                redirect = `?id=${id}`
            }
            res.redirect(`/FamilyTree${redirect}`);
        } else {
            res.render("error", {
                title: "Access Denied!",
                message: "You need to be an admin to access this page!"
            });
        }
    }


}

module.exports = new FamilyTree();
