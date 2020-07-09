class Index {
    constructor() {
        this.path = "/Logout";
    }

    all(req, res) {
        delete req.session.user;
        res.redirect("/");
    }
};

module.exports = new Index();
