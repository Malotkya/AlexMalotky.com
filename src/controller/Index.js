class Index {
    constructor() {
        this.path = "/";
    }

    get(req, res) {
        res.render("index");
    }
};

module.exports = new Index();
