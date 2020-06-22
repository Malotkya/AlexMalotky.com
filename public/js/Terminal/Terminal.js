import * as KeyCode from './KeyCode.js';
import {help, reset, exit, about, print} from './Prebuilt.js';
import App from './App.js'

class Terminal{
    // Builds the objects that will be used by the terminal and add them to
    // the dom
    //
    // @param: location in the dom you want the terminal to show in.
    constructor(object) {

        //Build output ---------------------------------------------------------
        this.output = $("<div>").attr("id", "history")
            .appendTo(object)
            .css( {
                "position": "absolute",
                "bottom": "1.2em",
                "left": "0",
                "width": "100%",
                "margin": "0",
                "overflow": "auto",
                "maxHeight": "calc(100% - 1em)",
                "wordBreak": "break-all"
            } );

        //Build input ----------------------------------------------------------
        this.preCursor = $("<div>").text("$:")
            .appendTo(object)
            .css({
                "position": "absolute",
                "bottom": "0",
                "left": "0"
            });


        this.input = $("<input>")
            .appendTo(object)
            .attr({
                "autocomplete": "off",
                "type": "text"
            }).css({
                "position": "absolute",
                "bottom": "0",
                "left": "3ch",
                "background-color": "inherit",
                "color": "inherit",
                "font-family": "inherit",
                "border-style": "none",
                "font-size": "inherit",
                "width": "calc(100% - 3ch)"
            }).keydown(this.getInput);


        //Other objects used in the terminal -----------------------------------
        this.functions = {};
        this.functionDescription = {};
        this.history = [];
        this.historyLocation = -1;

        this.init();
    };

    // Load the pre built functions and gives input focus
    init = () => {

        this.addFunction("help", "Displays this list of functions", help);
        this.addFunction("exit", "Closes the tab", exit);
        this.addFunction("reset", "Refreshes the tab", reset);
        this.addFunction("list", "Displays this list of functions", help);
        this.addFunction("about", "Displays more info about this app", about);
        this.addFunction("print", "Will print the rest of the line as html instead of text",
                            print);

        this.input.focus();
    };

    // Move through the array of past inputs and show the current selected
    // history in the input
    //
    // @param: iterator how much to move up or down
    moveHistory = it => {

        if(this.history.length > 0) {
            this.historyLocation += it;

            if(this.historyLocation < 0) {
                this.historyLocation = 0;
            }

            if(this.historyLocation >= this.history.length) {
                this.historyLocation = this.history.length-1;
            }

            this.input.val( this.history[this.historyLocation] );
        }
    };

    // Adds command to history array and prints it to the dom
    //
    // @param string form of the command
    addToHistory = string => {
        this.println(this.preCursor.text() + " " + string);
        this.history.push(string);
        this.historyLocation = this.history.length;
    };

    // Print string in <div> element
    //
    // @param input string to print
    println = input => $("<div>").text(input).appendTo(this.output)[0].scrollIntoView();

    // Prints jquery element
    //
    // @param input string to print
    print = input => input.appendTo(this.output)[0].scrollIntoView();

    // Adds function to be called from the terminal
    //
    // @param call of the function
    // @param description of the function being added
    // @param callback pointing to the function
    addFunction = (call,description,callback) => {
        this.functions[call] = callback;
        this.functionDescription[call] = description;
    }

    // Adds an app to the function list that can be called from the Terminal
    //
    // @param app to be added to the Terminal
    addApp = app => {
        if( (typeof app.call === "string") && (typeof app.description === "string")
                && (typeof app.main === "function") ){
            this.functions[app.call.toLowerCase()] = app.main;
            this.functionDescription[app.call.toLowerCase()] = app.description;
        }
    }

    //Changes the precursor string and adjusts the size of the input accordingly
    //
    // @param string for precursor
    setPreCursor = string => {
        let length = string.length+1

        this.preCursor.text(string);
        this.input.css({
            "left": `${length}ch`,
            "width": `calc(100% - ${length}ch)`
        })
    }

    // Runs the command that is inputed
    //
    // @param cmd in string form
    run = cmd => {
        this.addToHistory(cmd);

        let args = cmd.split(/\s+/);
        let callback = this.functions[args[0].toLowerCase()];

        if(callback === undefined) {
            this.println("Unkown Command!");
        } else {
            callback(this, args);
        }

    };

    // Gets keycode of event and acts accordingly to appropriate key
    //
    // KeyCode.ENTER      => runs command entered in the input
    // KeyCode.UP_ARROW   => moves back through history
    // KeyCode.DOWN_ARROW => moves forward through history
    //
    // @param event used to get key code
    getInput = event => {
        let keyCode = KeyCode.getKeyCode(event);

        switch (keyCode) {
            case KeyCode.ENTER:
                this.run(this.input.val());
                this.input.val("");
                break;

            case KeyCode.UP_ARROW:
                this.moveHistory(-1);
                break;

            case KeyCode.DOWN_ARROW:
                this.moveHistory(1);
                break;
        }
    };

};

export default Terminal;
