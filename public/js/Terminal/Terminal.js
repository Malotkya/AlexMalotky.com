import * as Keyboard from './Keyboard.js';
import {help, reset, exit, about} from './Prebuilt.js';
import App from './App.js'
import Bios from './Bios.js'

class Terminal {
    // Builds the objects that will be used by the terminal and add them to
    // the dom
    //
    // @param: location in the dom you want the terminal to show in.
    constructor(target) {
        this.test = 0;

        this.bios = new Bios(target, this);

        this.history = {
            list: [],
            location: -1
        }

        this.reset();
        this.init();
    };

    // Load the pre built functions and gives input focus
    init = () => {

        this.functions = {
            callback:{},
            description:{}
        }

        this.addFunction("help", "Displays this list of functions", help);
        this.addFunction("exit", "Closes the tab", exit);
        this.addFunction("reset", "Resets the display", reset);
        this.addFunction("about", "Displays more info about this app", about);
    };

    // Move through the array of past inputs and show the current selected
    // history in the input
    //
    // @param: iterator how much to move up or down
    moveHistory = it => {

        if(this.history.list.length > 0) {
            this.history.location += it;

            if(this.history.location < 0) {
                this.history.location = 0;
            }

            if(this.history.location >= this.history.list.length) {
                this.history.location = this.history.list.length-1;
            }

            this.input.value = this.history.list[this.history.location];
        }
    };

    // Adds command to history array and prints it to the dom
    //
    // @param string form of the command
    addToHistory = string => {
        this.println(this.input.preCursor + string);
        this.history.list.push(string);
        this.history.location = this.history.length;
    };

    // Print string in <div> element
    //
    // @param input string to print
    println = input => {
        this.output.list.push(input);
        this.output.newline = true;
    }

    // Prints jquery element
    //
    // @param input string to print
    print = input => {
        if(this.output.newline) {
            this.output.list.push(input);
        } else {
            this.output.list[this.output.list.length-1] += input;
        }
        this.output.newline = false;
    }

    // Adds function to be called from the terminal
    //
    // @param call of the function
    // @param description of the function being added
    // @param callback pointing to the function
    addFunction = (call,description,callback) => {
        this.functions.callback[call] = callback;
        this.functions.description[call] = description;
    }

    // Adds an app to the function list that can be called from the Terminal
    //
    // @param app to be added to the Terminal
    addApp = app => {
        if( (typeof app.call === "string") && (typeof app.description === "string")
                && (typeof app.main === "function") ){
            this.functions.callback[app.call.toLowerCase()] = app.main;
            this.functions.description[app.call.toLowerCase()] = app.description;
        }
    }

    //Changes the precursor string and adjusts the size of the input accordingly
    //
    // @param string for precursor
    setPreCursor = string => {
        this.input.preCursor = string;
    }

    // Runs the command that is inputed
    //
    // @param cmd in string form
    run = cmd => {
        this.addToHistory(cmd);

        let args = cmd.split(/\s+/);
        let callback = this.functions.callback[args[0].toLowerCase()];

        if(callback === undefined) {
            this.println("Unkown Command!");
        } else {
            callback(this, args);
        }

    };

    // Gets keycode of event and acts accordingly to appropriate key
    //
    // Keyboard.ENTER      => runs command entered in the input
    // Keyboard.UP_ARROW   => moves back through history
    // Keyboard.DOWN_ARROW => moves forward through history
    //
    // @param event used to get key code
    event = key => {
            switch (key) {
            case Keyboard.ENTER:
                this.run(this.input.value);
                this.input.value = "";
                break;

            case Keyboard.BACK_SPACE:
                this.input.value = this.input.value.slice(0, -1);
                break;

            case Keyboard.ARROW_UP:
                this.moveHistory(-1);
                break;

            case Keyboard.ARROW_DOWN:
                this.moveHistory(1);
                break;

            default:
                this.input.value += Keyboard.getKeyPressed(key);
                break;
        }
    };

    draw = () => {
        this.bios.print(this.input.x, this.input.y, this.input.preCursor + this.input.value  + this.input.cursor);

        let index = this.output.list.length-1;
        let y = this.input.y-1;
        while(index >= 0 && y > 0) {
            this.bios.print(1,y,this.output.list[index]);

            index--;
            y--;
        }
    }

    reset = () => {
        this.input = {
            x:1,
            y:30,
            value:"",
            preCursor: "$: ",
            cursor: "█"
        };

        this.output = {
            list: [],
            newline:true
        };
    }

    close = () => this.bios.shutdown();

};

export default Terminal;
