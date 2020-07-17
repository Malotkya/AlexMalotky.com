class DiceGame {
    constructor() {
        this.path = "/Dice";
    }

    get(req, res) {
        res.render("dice.ejs");
    }
};

module.exports = new DiceGame();
