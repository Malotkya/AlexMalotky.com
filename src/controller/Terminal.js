class Terminal {
    constructor() {
        this.path = "/cmd";
    }

    all(request, responce) {
        responce.render("cmd");
        responce.end();
    }
}

module.exports = new Terminal();
