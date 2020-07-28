class App {
    constructor(call, description) {
        this.call = call;
        this.description = description;

        this.history = {
            list: [],
            location: -1
        }
    }

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

            return this.history.list[this.history.location];
        }
    };

    // Adds command to history array and prints it to the dom
    //
    // @param string form of the command
    addToHistory = string => {
        this.history.list.push(string);
        this.history.location = this.history.length;
    };

    // Overrideable main function
    //
    // @param: terminal - used to access terminal functions (usually println)
    // @param: args - arguments passed as an array
    main(terminal, args) {
        let cmd = args.join(" ");

        let app = terminal.apps[args[0]];

        if(app === undefined) {
            terminal.println("Unkown Command!");
        } else {
            terminal.callstack.push(app);
            terminal.run(cmd);
        }

        return true;
    }

    // Overrideable function to draw over the terminal
    //
    // @param bios to draw to
    // @return false - if not drawing
    //         true - if drawing
    draw = bios => {
        return false;
    }
}

export default App;
