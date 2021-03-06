let roleCount = 0;
const numbers = [
    "Ones:",
    "Twos:",
    "Threes:",
    "Fours:",
    "Fives:",
    "Sixs:"
];

const roleDice = () => {
    for(let i=1; i<6; i++) {
        let role = Math.floor((Math.random() * 6) + 1);
        let die = document.getElementById(i).querySelector("figure");

        if(die.className.trim().charAt(0) != "l")
            die.className = `d${role} `;
    }

    roleCount++;
    if(roleCount >= 3)
        lockDice();
};

const lockDice = () => {
    document.querySelector("#role").disabled = true;
    document.querySelectorAll(".die").forEach(die => {
        let target = die.querySelector("figure");

        let number = Number(target.className.trim().charAt(1))

        if(isNaN(number))
            number = 1;

        target.className = `l${number} `;
    });
};

const unlockDice = () => {
    roleCount = 0;
    document.querySelector("#role").disabled = false;
    document.querySelectorAll(".die").forEach(die => {
        let target = die.querySelector("figure");

        let number = Number(target.className.trim().charAt(1))

        if(isNaN(number))
            number = 1;

        target.className = `d${number} `;
    });
};

const reset = () => {
    let target = document.querySelector("main");
    target.innerHTML = "";
    roleCount = 0;
    buildGame(target);
};

const createScoreNode = score => {
    let output = document.createElement("span");
    output.innerText = score;
    output.className = "btn";
    return output;
};

const flipDie = event => {
    let target = event.target;
    if(target.localName != "figure")
        target = target.querySelector("figure");

    let number = Number(target.className.trim().charAt(1))

    if(isNaN(number))
        number = 1;

    if(target.className.trim().charAt(0) == "d") {
        target.className = `l${number} `;
    } else {
        target.className = `d${number} `;
    }
};

const getDice = () => {
    let output = Array();
    document.querySelectorAll("figure").forEach(die => {
        let number = Number(die.className.charAt(1));

        if(isNaN(number)) {
            output.push(0);
        } else {
            output.push(number);
        }
    });
    return output;
};

const addTopScore = score => {
    let nodeSubTotal = document.querySelector("#upperSubTotal");

    let subTotal = Number(nodeSubTotal.innerText);
    if( isNaN(subTotal) )
        subTotal = 0;

    subTotal += score;
    if(subTotal >= 63) {
        let nodeBonus = document.querySelector("#bonusPoints");
        if( nodeBonus.innerText.trim() == "") {
            nodeBonus.appendChild( createScoreNode("+35") );
            subTotal += 35;
        }
    }

    nodeSubTotal.innerText = subTotal;
};

const addBottomScore = score => {
    let nodeSubTotal = document.querySelector("#lowerSubTotal");

    let subTotal = Number(nodeSubTotal.innerText);
    if( isNaN(subTotal) )
        subTotal = 0;

    subTotal += score;

    nodeSubTotal.innerText = subTotal;
};

const calculateTotal = () => {
    let upperTotal = Number(document.querySelector("#upperSubTotal").innerText);
    if(isNaN(upperTotal))
        upperTotal = 0;

    let lowerTotal = Number(document.querySelector("#lowerSubTotal").innerText);
    if(isNaN(lowerTotal))
        lowerTotal = 0;

    let yatzeeCount = Number(document.querySelector("#additionlYahtzee").innerText);
    if(isNaN(yatzeeCount))
        yatzeeCount = 0;

    let total = upperTotal + lowerTotal + (100 * yatzeeCount);
    document.querySelector("#total").innerText = total;

    unlockDice();
};

const testYatzee = dice => {
    if( dice[0] == dice[1] && dice[1] == dice[2] &&
        dice[2] == dice[3] && dice[3] == dice[4] ) {
            let yatzeeNode = document.querySelector("#additionlYahtzee");
            let count = Number(yatzeeNode.innerText);
            if( !isNaN(count) ) {
                yatzeeNode.innerText = count + 1;
            }
        }
};

const takeY = event => {
    if(checkRole()) {
        let dice = getDice();
        let score = 0;
        if( dice[0] == dice[1] && dice[1] == dice[2] &&
            dice[2] == dice[3] && dice[3] == dice[4] ) {
                score = 50;
        }

        let target = event.target.parentNode;
        target.innerHTML = "";
        target.appendChild(createScoreNode(score));

        addBottomScore(score);
        if(score > 0){
            let yatzeeNode = document.querySelector("#additionlYahtzee");
            yatzeeNode.innerText = 0;
        }
        calculateTotal();
    }
};

const checkRole = () => {
    if(roleCount > 0)
        return true;

    alert("You need to role first!");
    return false;
};

const takeNumber = event => {
    if(checkRole()) {
        let dice = getDice();
        let score = 0;

        let number = Number(event.target.attributes.number.nodeValue);
        if(isNaN(number))
            number = 0;

        dice.forEach(die => {
            if(die == number)
                score += number;
        });

        let target = event.target.parentNode;
        target.innerHTML = "";
        target.appendChild(createScoreNode(score));

        addTopScore(score);
        testYatzee(dice);
        calculateTotal();
    }
};

const take3K = event => {
    if(checkRole()) {
        let dice = getDice();
        let score = 0;
        let valid = false;

        dice.forEach(left => {
            let count = 0;
            dice.forEach(right => {
                if(left == right)
                    count++;
            })

            if(count >= 3) {
                valid = true;
                return;
            }
        })

        if(valid) {
            dice.forEach(die => score += die);
        }

        let target = event.target.parentNode;
        target.innerHTML = "";
        target.appendChild(createScoreNode(score));

        addBottomScore(score);
        testYatzee(dice);
        calculateTotal();
    }
};

const take4K = event => {
    if(checkRole()) {
        let dice = getDice();
        let score = 0;
        let valid = false;

        dice.forEach(left => {
            let count = 0;
            dice.forEach(right => {
                if(left == right)
                    count++;
            })

            if(count >= 4) {
                valid = true;
                return;
            }
        })

        if(valid) {
            dice.forEach(die => score += die);
        }

        let target = event.target.parentNode;
        target.innerHTML = "";
        target.appendChild(createScoreNode(score));

        addBottomScore(score);
        testYatzee(dice);
        calculateTotal();
    }
};

const takeFH = event => {
    if(checkRole()) {
        let dice = getDice();
        let score = 0;
        let threeOfAKind = false;
        let twoOfAKind = false

        dice.forEach(left => {
            let count = 0;
            dice.forEach(right => {
                if(left == right)
                    count++;
            })

            if(count == 2)
                twoOfAKind = true;

            if(count == 3)
                threeOfAKind = true;
        })

        if(twoOfAKind && threeOfAKind) {
            score = 25;
        }

        let target = event.target.parentNode;
        target.innerHTML = "";
        target.appendChild(createScoreNode(score));

        addBottomScore(score);
        testYatzee(dice);
        calculateTotal();
    }
};

const hasNext = (dice, cur, count) => {
    for(let i=0;i<dice.length;i++) {
        if(dice[i] == cur+1)
            return hasNext(dice, dice[i], count+1)
    }
    return count;
};

const takeSS = event => {
    if(checkRole()) {
        let dice = getDice();
        let score = 0;
        let valid = false;

        dice.forEach(die => {
            let count = hasNext(dice, die, 1);

            if(count >= 4) {
                valid = true;
                return;
            }
        })

        if(valid) {
            score = 30;
        }

        let target = event.target.parentNode;
        target.innerHTML = "";
        target.appendChild(createScoreNode(score));

        addBottomScore(score);
        testYatzee(dice);
        calculateTotal();
    }
};

const takeLS = event => {
    if(checkRole()) {
        let dice = getDice();
        let score = 0;
        let valid = false;

        dice.forEach(die => {
            let count = hasNext(dice, die, 1);

            if(count >= 5) {
                valid = true;
                return;
            }
        })

        if(valid) {
            score = 40;
        }

        let target = event.target.parentNode;
        target.innerHTML = "";
        target.appendChild(createScoreNode(score));

        addBottomScore(score);
        testYatzee(dice);
        calculateTotal();
    }
};

const takeCH = event => {
    if(checkRole()) {
        let dice = getDice();
        let score = 0;

        dice.forEach(die => score += die);

        let target = event.target.parentNode;
        target.innerHTML = "";
        target.appendChild(createScoreNode(score));

        addBottomScore(score);
        testYatzee(dice);
        calculateTotal();
    }
};

const help = event => window.alert("This is a game of Yatzee:\n" +
                                    "To start the game you click on role the dice.\n" +
                                    "Then you click on the dice you want to keep and role again\n" +
                                    "Once you have the dice you want to keep or you have roled the maximum of three times you may " +
                                    " click keep on the score you want to take.");

const createScoreBoardNode = (string, buttonSettings, buttonOverRide) => {
    let output = document.createElement("div");
    output.className = "w-100 row";

    let first = document.createElement("span");
    first.className = "col-6";
    first.innerText = string;


    let second = document.createElement("span");
    second.className = "col-6";
    if(typeof buttonOverRide != "undefined") {
        second = buttonOverRide;
    } else {
        let button = document.createElement("button");
        button.className = "btn btn-primary";
        button.innerText = "Take";

        if(typeof buttonSettings.number != "undefined")
            button.setAttribute("number", buttonSettings.number);

        if(typeof buttonSettings.callback != "undefined")
            button.addEventListener("click", buttonSettings.callback);

        second.appendChild(button);
    }

    output.appendChild(first);
    output.appendChild(second);

    return output;
};

const createTotalNode = (string, id) => {
    let output = document.createElement("div");
    output.className = "w-100 row";

    let first = document.createElement("span");
    first.className = "col-9";
    first.innerText = string;


    let second = document.createElement("span");
    second.className = "col-3";
    second.id = id;

    output.appendChild(first);
    output.appendChild(second);

    return output;
};

const buildGame = target => {

    for(let i=1;i<6;i++) {
        let die = document.createElement("div");
        die.className = "die col-md-2 col-sm-4 col-6";
        die.id = i;

        let figure = document.createElement("figure")
        figure.className = `d${i} `;

        die.appendChild(figure);
        die.addEventListener("click", flipDie);
        target.appendChild(die);
    }
    let buttonGroup = document.createElement("div");
    buttonGroup.className = "col-md-2 col-sm-4 col-6";

    let btnRole = document.createElement("button")
    btnRole.innerText = "Role Dice";
    btnRole.className = "btn btn-primary w-100";
    btnRole.id = "role"
    btnRole.addEventListener("click", roleDice);

    let btnReset = document.createElement("button")
    btnReset.innerText = "Reset";
    btnReset.className = "btn btn-secondary w-100";
    btnReset.addEventListener("click", reset );

    let btnHelp = document.createElement("button")
    btnHelp.innerText = "About";
    btnHelp.className = "btn btn-success w-100";
    btnHelp.addEventListener("click", help);

    buttonGroup.appendChild(btnRole);
    buttonGroup.appendChild(btnReset);
    buttonGroup.appendChild(btnHelp);
    target.appendChild(buttonGroup);

    let scoreboard = document.createElement("div");
    scoreboard.className = "col-12 row scoreboard";

    let scoreHeader = document.createElement("strong");
    scoreHeader.className = "col-12";
    scoreHeader.innerText = "Scoring";
    scoreboard.appendChild(scoreHeader);

    //Top Half of Score Board
    let topHalf = document.createElement("div");
    topHalf.className = "col-sm-4";

    numbers.forEach((item, i) => topHalf.appendChild(createScoreBoardNode(item, {
            number:i+1,
            callback: takeNumber
        })));

    let bonus = document.createElement("span");
    bonus.className = "col-6"
    bonus.id = "bonusPoints";
    topHalf.appendChild(createScoreBoardNode("Bonus Points:", null, bonus));

    //Bottom Half of ScoreBoard
    let bottomHalf = document.createElement("div");
    bottomHalf.className = "col-sm-4";

    bottomHalf.appendChild(createScoreBoardNode("Three of a Kind:", {callback:take3K}));
    bottomHalf.appendChild(createScoreBoardNode("Four of a Kind:" , {callback:take4K}));
    bottomHalf.appendChild(createScoreBoardNode("Full House:" ,     {callback:takeFH}));
    bottomHalf.appendChild(createScoreBoardNode("Small Strait:" ,   {callback:takeSS}));
    bottomHalf.appendChild(createScoreBoardNode("Large Strait:" ,   {callback:takeLS}));
    bottomHalf.appendChild(createScoreBoardNode("Yahtzee:" ,        {callback:takeY}));
    bottomHalf.appendChild(createScoreBoardNode("Chance:" ,         {callback:takeCH}));

    let totals = document.createElement("div");
    totals.className = "col-sm-4";

    totals.appendChild(createTotalNode("Upper Sub Total:", "upperSubTotal"));
    totals.appendChild(createTotalNode("Lower Sub Total:", "lowerSubTotal"));
    totals.appendChild(document.createElement("hr"));
    totals.appendChild(createTotalNode("Additional Yahtzee's:", "additionlYahtzee"));
    totals.appendChild(document.createElement("hr"));
    totals.appendChild(createTotalNode("Total:", "total"));

    scoreboard.appendChild(topHalf);
    scoreboard.appendChild(bottomHalf);
    scoreboard.appendChild(totals);
    target.appendChild(scoreboard)
};

window.onload = reset;
