class Index {
    constructor() {
        this.path = "/";
    }

    get(req, res) {
        res.render("index");
        res.end();
    }
};

module.exports = new Index();
