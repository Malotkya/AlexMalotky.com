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

        return null;
    };

    // Adds command to history array and prints it to the dom
    //
    // @param string form of the command
    addToHistory = string => {
        this.history.list.push(string);
        this.history.location = this.history.list.length;
    };

    // Overrideable main function
    //
    // @param: system - used to access system functions (usually println)
    // @param: args - arguments passed as an array
    main = async (system, args) => system.println("Hello World!");

    render = bios => false;

}

export default App;
