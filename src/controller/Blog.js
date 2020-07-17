class Blog {
    constructor() {
        this.path = "/Blog";
    }

    get(req, res) {
        res.render("blog");
    }
};

module.exports = new Blog();
