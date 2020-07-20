let roleCount = 0;

window.onload = () => {
    document.querySelector("#role").addEventListener("click", roleDice);
    document.querySelector("#reset").addEventListener("click", reset );

    document.querySelectorAll(".die").forEach(die => {
        die.addEventListener("click", flipDie);
    });

    document.querySelector("#take1").addEventListener("click", take1);
    document.querySelector("#take2").addEventListener("click", take2);
    document.querySelector("#take3").addEventListener("click", take3);
    document.querySelector("#take4").addEventListener("click", take4);
    document.querySelector("#take5").addEventListener("click", take5);
    document.querySelector("#take6").addEventListener("click", take6);
    document.querySelector("#take3K").addEventListener("click", take3K);
    document.querySelector("#take4K").addEventListener("click", take4K);
    document.querySelector("#takeFH").addEventListener("click", takeFH);
    document.querySelector("#takeSS").addEventListener("click", takeSS);
    document.querySelector("#takeLS").addEventListener("click", takeLS);
    document.querySelector("#takeY").addEventListener("click", takeY);
    document.querySelector("#takeCH").addEventListener("click", takeCH)
}

const roleDice = () => {
    for(let i=1; i<6; i++) {
        let role = "d" + Math.floor((Math.random() * 6) + 1);
        let die = document.getElementById(i).querySelector("figure");

        if(die.className.trim().charAt(0) != "l")
            die.className = role;
    }

    roleCount++;
    if(roleCount >= 3)
        lockDice();
}

const lockDice = () => {
    document.querySelector("#role").disabled = true;
    document.querySelectorAll(".die").forEach(die => {
        let target = die.querySelector("figure");

        let number = Number(target.className.trim().charAt(1))

        if(isNaN(number))
            number = 1;

        target.className = `l${number}`;
    });
}

const unlockDice = () => {
    roleCount = 0;
    document.querySelector("#role").disabled = false;
    document.querySelectorAll(".die").forEach(die => {
        let target = die.querySelector("figure");

        let number = Number(target.className.trim().charAt(1))

        if(isNaN(number))
            number = 1;

        target.className = `d${number}`;
    });
}

const reset = () => {
    //Plan on changing this later
    window.location.reload()
}

const createScoreNode = score => {
    let output = document.createElement("span");
    output.innerText = score;
    output.className = "btn";
    return output;
}

const flipDie = event => {
    let target = event.target;
    if(target.localName != "figure")
        target = target.querySelector("figure");

    let number = Number(target.className.trim().charAt(1))

    if(isNaN(number))
        number = 1;

    if(target.className.trim().charAt(0) == "d") {
        target.className = `l${number}`;
    } else {
        target.className = `d${number}`;
    }
}

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
}

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
}

const addBottomScore = score => {
    let nodeSubTotal = document.querySelector("#lowerSubTotal");

    let subTotal = Number(nodeSubTotal.innerText);
    if( isNaN(subTotal) )
        subTotal = 0;

    subTotal += score;

    nodeSubTotal.innerText = subTotal;
}

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
}

const testYatzee = dice => {
    if( dice[0] == dice[1] && dice[1] == dice[2] &&
        dice[2] == dice[3] && dice[3] == dice[4] ) {
            let yatzeeNode = document.querySelector("#additionlYahtzee");
            let count = Number(yatzeeNode.innerText);
            if( !isNaN(count) ) {
                yatzeeNode.innerText = count + 1;
            }
        }
}

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
        let yatzeeNode = document.querySelector("#additionlYahtzee");
        yatzeeNode.innerText = 0;
        calculateTotal();
    }
}

const checkRole = () => {
    if(roleCount > 0)
        return true;

    alert("You need to role first!");
    return false;
}

const take1 = event => {
    if(checkRole()) {
        let dice = getDice();
        let score = 0;
        dice.forEach(die => {
            if(die == 1)
                score += 1;
        });

        let target = event.target.parentNode;
        target.innerHTML = "";
        target.appendChild(createScoreNode(score));

        addTopScore(score);
        testYatzee(dice);
        calculateTotal();
    }
}

const take2 = event => {
    if(checkRole()) {
        let dice = getDice();
        let score = 0;
        dice.forEach(die => {
            if(die == 2)
                score += 2;
        });

        let target = event.target.parentNode;
        target.innerHTML = "";
        target.appendChild(createScoreNode(score));

        addTopScore(score);
        testYatzee(dice);
        calculateTotal();
    }
}

const take3 = event => {
    if(checkRole()) {
        let dice = getDice();
        let score = 0;
        dice.forEach(die => {
            if(die == 3)
                score += 3;
        });

        let target = event.target.parentNode;
        target.innerHTML = "";
        target.appendChild(createScoreNode(score));

        addTopScore(score);
        testYatzee(dice);
        calculateTotal();
    }
}

const take4 = event => {
    if(checkRole()) {
        let dice = getDice();
        let score = 0;
        dice.forEach(die => {
            if(die == 4)
                score += 4;
        });

        let target = event.target.parentNode;
        target.innerHTML = "";
        target.appendChild(createScoreNode(score));

        addTopScore(score);
        testYatzee(dice);
        calculateTotal();
    }
}

const take5 = event => {
    if(checkRole()) {
        let dice = getDice();
        let score = 0;
        dice.forEach(die => {
            if(die == 5)
                score += 5;
        });

        let target = event.target.parentNode;
        target.innerHTML = "";
        target.appendChild(createScoreNode(score));

        addTopScore(score);
        testYatzee(dice);
        calculateTotal();
    }
}

const take6 = event => {
    if(checkRole()) {
        let dice = getDice();
        let score = 0;
        dice.forEach(die => {
            if(die == 6)
                score += 6;
        });

        let target = event.target.parentNode;
        target.innerHTML = "";
        target.appendChild(createScoreNode(score));

        addTopScore(score);
        testYatzee(dice);
        calculateTotal();
    }
}

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
}

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
}

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
}

const hasNext = (dice, cur, count) => {
    for(let i=0;i<dice.length;i++) {
        if(dice[i] == cur+1)
            return hasNext(dice, dice[i], count+1)
    }
    return count;
}

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
}

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
}

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
}
