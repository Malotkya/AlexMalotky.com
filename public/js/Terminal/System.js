import * as Keyboard from './System/Keyboard.js';
import Terminal from './Terminal.js';
import Bios from './System/Bios.js';
import InputStream from './System/InputStream.js';
import Stream from './System/Stream.js';
import View from './System/View.js';

class System {
    // Loads the bios and main App
    //
    // @param: the target canvas to draw too
    constructor(target) {

        this.bios = new Bios(target, this);

        this.callstack = [];
        this.apps = [];

        this.input = new InputStream(this.bios);
        this.output = new Stream();

        this.password = false;
        this.view = null;
    };

    // Adds the string to output to be printed and adds a new line char
    //
    // @param input string to print
    println = input => this.print(input + "\n");

    // Adds the string to output to be printed
    //
    // @param input string to print
    print = input => {
        this.output.add(input);
        this.input.clear();
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

            if(this.apps[call.toLowerCase()])
                throw new Error("Call is already in use");

            this.apps[call.toLowerCase()] = buffer;
        }
    }

    // Adds an app to the function list that can be called from the Terminal
    //
    // @param app to be added to the Terminal
    addApp = app => {
        if( (typeof app.call === "string") && (typeof app.description === "string")
                && (typeof app.main === "function") ){

            if(this.apps[app.call.toLowerCase()])
                throw new Error("Call is already in use");

            this.apps[app.call.toLowerCase()] = app;
        }
    }

    // Runs the command that is inputed
    //
    // @param cmd in string form
    run = async(args) => {
        this.output.clear();
        this.input.clear();
        let p = await this.current().main(this, args);
        if(this.view !== null)
            this.view = null;
        else
            this.output.clear();
        return p;
    }

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
        let update = "";
        switch (key) {
            case Keyboard.BACK_SPACE:
                this.input.remove();
                break;

            case Keyboard.ARROW_UP:
                this.input.set( this.current().moveHistory(-1) );
                break;

            case Keyboard.ARROW_DOWN:
                this.input.set( this.current().moveHistory(1) );
                break;

            case Keyboard.ENTER:
                this.input.add( Keyboard.getKeyPressed(key) );
                if(!this.password && this.view !== null)
                    this.output.add(this.input.buffer);
                this.input.clear();
                break;

            default:
                this.input.add( Keyboard.getKeyPressed(key) );
                break;
        }
    };

    //Resets the input and output
    reset = () => {

    }

    //Calls to shutdown the app.
    close = () => this.bios.shutdown();

    get = async(char = "/s") => await this.input.get(char);
    getln = async() => await this.input.getln();
    getPassword = async() => {
        this.password = true;
        let output = await this.input.getln();
        this.password = false;
        return output;
    }

    getView = async() => {
        this.output.clear();

        // Wait to render the steam
        while(this.output.stream.length > 0)
            await this.bios.sleep();

        return new View(this);
    }

    render = () => {
        if( this.view === null ) {

            if(this.output.stream.length > 0) {
                this.bios.print(this.output.stream);
                this.output.stream = "";
            }

            let x = this.bios.x;
            let y = this.bios.y;

            let output = char => {
                if(char == '\n' || char == '\r') {
                    x = 1;
                    y++;
                }  else {
                    this.bios.put(x,y,char);
                    x++;
                }


                if(x > this.bios.width) {
                    x = 1;
                    y++;
                }

                if(y > this.bios.totalHeight()) {
                    this.bios.grow();
                }
            }

            [...this.output.buffer].forEach(char => output(char));

            if( !this.password) {
                [...this.input.buffer].forEach(char => output(char));
            }

            this.bios.put(x, y, this.input.cursor);
        } else {
            this.view.render(this);
        }
    }

};

export default System;
