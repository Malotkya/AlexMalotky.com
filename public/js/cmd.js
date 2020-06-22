import Terminal from './Terminal/Terminal.js';
import App from './Terminal/App.js';

const init = () => {

    let terminal = new Terminal(document.querySelector("#wrapper"));

    terminal.println("Welcome to AlexMalotky.com");

    terminal.addFunction("set", "Can be used to apply css properties to the page", set);
    terminal.addApp(new App("doIt", "A basic hello world app"));
    terminal.addApp(new myApp());

}; window.onload = init;

const set = (terminal, args) => {
    switch (args[1].toLowerCase()) {
    case "help":
        terminal.println("Any css property can be changed/added to the body element of this page using this property.");
        terminal.println("Additionaly using preCursor will change the string before each input");
        terminal.println("I have also added the functionality that font-color works the same as color.");
        break;
    case "precursor":
        terminal.setPreCursor(args[2]);
        break;
    case "font-color":
        args[1] = "color";
    default:
        document.querySelector("body").style[args[1]] = args[2];

    }
}

class myApp extends App {
    constructor() {
        super("count", "counts numbers and remembers how much it has counted");

        this.total = 0;
    }

    main = (terminal, args) => {
        let input = Number(args[1]);

        if(input > 0) {
            let count = 0;

            while(count < input) {
                terminal.println(++count);
            }

            this.total += input;
        }

        terminal.println(`I have counted a total number of ${this.total}`);
    }
}
