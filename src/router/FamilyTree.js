let express = require('express');
let familyTree = express.Router();

familyTree.path = "/FamilyTree";

familyTree.get("/", async(req,res)=>{
    if(req.session.user.roles.includes("Family")) {
        let dao = require("../dao/FamilyDao.js");
        let family = await dao.getAll();
        let id = req.query.id;

        res.render('familyTree', {
            tree:family,
            id:id,
            user:req.session.user
        });

    } else {

        if(req.session.user.id < 0) {
            res.render("login", {
                callback: "/FamilyTree",
                message: "You need to be logged in to view this page."
            });
        } else {
            res.render("error", {
                title:"Access Denied!",
                message:"You must be logged in as a family member to access this page."
            });
        }

    }
});

familyTree.post("/:Action", async(req,res)=>{
    try {
        if(!req.session.user.roles.includes("Family-Admin"))
            throw new Error("User Error");

            let dao = require("../dao/FamilyDao.js");
            let action = req.params.Action;
            let id = -1;

            switch(action) {
            case "Create":
                id = (await dao.insert(req.body, req.files)).id;
                break;
            case "Update":
                id = (await dao.update(req.body, req.files)).id;
                break;
            case "Delete":
                dao.delete(req.body.id);
                break;
            default:
                //Do Nothing
            }
            let redirect = "";
            if(id >= 0) {
                redirect = `?id=${id}`
            }
            res.redirect(`/FamilyTree${redirect}`);
    } catch (e) {
        if(e.message == "User Error") {
            res.render("error", {
                title: "Access Denied!",
                message: "You need to be an admin to access this page!"
            });
        } else {
            console.error(e);
            res.render("error", {
                message: e.message,
                err: e
            });
        }
    }
});

module.exports = familyTree;
