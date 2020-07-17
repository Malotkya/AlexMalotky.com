class FamilyTree {
    constructor() {
        this.path = "/FamilyTree";
    }

    async get(req, res) {
        let dao = require("../dao/FamilyDao.js");
        try {
            let parent = await dao.getById(1);
            res.render('familyTree', {parent:parent});
        } catch (e) {
            res.render('error', {
                title: "Database Error",
                message: "There was a problem contacting the database."
            });
        }
    }
}

module.exports = new FamilyTree();
