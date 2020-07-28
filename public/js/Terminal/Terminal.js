import * as Keyboard from './Base/Keyboard.js';
import {help, reset, exit, about} from './Base/Prebuilt.js';
import App from './App.js'
import Bios from './Base/Bios.js'

class Terminal {
    // Loads the bios and main App
    //
    // @param: the target canvas to draw too
    constructor(target) {
        this.test = 0;

        this.bios = new Bios(target, this);
        this.callstack = [];

        this.callstack.push(new App());

        this.reset();
        this.init();
    };

    // Load the pre built functions
    init = () => {

        this.apps = [];

        this.addFunction("help", "Displays this list of functions", help);
        this.addFunction("exit", "Closes the tab", exit);
        this.addFunction("reset", "Resets the display", reset);
        this.addFunction("about", "Displays more info about this app", about);
    };

    // Adds the string to output to be printed and adds a new line char
    //
    // @param input string to print
    println = input => {
        this.output.list.push(input);
        this.output.newline = true;
    }

    // Adds the string to output to be printed
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
        if( (typeof call === "string") && (typeof description === "string")
                && (typeof callback === "function") ){
            let buffer = new App(call, description);
            buffer.main = callback;

            if(this.apps[call])
                throw new Error("Call is already in use");

            this.apps[call] = buffer;
        }
    }

    // Adds an app to the function list that can be called from the Terminal
    //
    // @param app to be added to the Terminal
    addApp = app => {
        if( (typeof app.call === "string") && (typeof app.description === "string")
                && (typeof app.main === "function") ){

            if(this.apps[app.call])
                throw new Error("Call is already in use");

            this.apps[app.call] = app;
        }
    }

    //Changes the precursor of the terminal
    //
    // @param string for precursor
    setPreCursor = string => {
        this.input.preCursor = string;
    }

    // Runs the command that is inputed
    //
    // @param cmd in string form
    run = cmd => {
        let args = cmd.split(/\s+/);

        this.current().addToHistory(cmd);


        let loop = this.current().main(this, args);

        if(loop !== undefined) {
            if( !loop ) {
                this.callstack.pop();
            }
        } else {
            this.callstack.pop();
        }
    };

    //Gets the top of the callstack
    current = () => this.callstack[this.callstack.length-1];

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
                this.println(this.input.preCursor + this.input.value);
                this.run(this.input.value);
                this.input.value = "";
                break;

            case Keyboard.BACK_SPACE:
                this.input.value = this.input.value.slice(0, -1);
                break;

            case Keyboard.ARROW_UP:
                this.input.value = this.current().moveHistory(-1);
                break;

            case Keyboard.ARROW_DOWN:
                this.input.value = this.current().moveHistory(1);
                break;

            default:
                this.input.value += Keyboard.getKeyPressed(key);
                break;
        }
    };

    // Gives the top of the call stack a chance to draw
    // If the top of the call stack passes, the terminal will draw the input and output
    draw = () => {
        if( !this.current().draw(this.bios) ) {
            this.bios.print(this.input.x, this.input.y,
                        this.input.preCursor + this.input.value  + this.input.cursor);

            let index = this.output.list.length-1;
            let y = this.input.y-1;
            while(index >= 0 && y > 0) {
                this.bios.print(1,y,this.output.list[index]);

                index--;
                y--;
            }
        }
    }

    //Resets the input and output
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

    //Calls to shutdown the app.
    close = () => this.bios.shutdown();

};

export default Terminal;
