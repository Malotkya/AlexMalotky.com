class Terminal {
    constructor() {
        this.path = "/cmd";
    }

    all(request, responce) {
        responce.render("cmd");
    }
}

module.exports = new Terminal();
