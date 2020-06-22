class Resume {
    constructor() {
        this.path = "/Resume"
    }

    get(req, res) {
        res.write("This is the resume page!");
        res.end();
    }

};

module.exports = new Resume();
