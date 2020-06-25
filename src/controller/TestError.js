class TestError {
    constructor() {
        this.path = "/Test/:status/:message";
    }

    all(req, res) {
        let status = req.params.status;
        let message = req.params.message;

        res.status(status).render("error", {message:message});
    }
}

module.exports = new TestError();
