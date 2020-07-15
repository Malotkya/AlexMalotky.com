class FamilyTree {
    constructor() {
        this.path = "/FamilyTree";
    }

    get(req, res) {
        res.render('familyTree');
    }
}

module.exports = new FamilyTree();
