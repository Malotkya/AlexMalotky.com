import App from "../App.js";

class Exit extends App {
    constructor(){
        super("exit", "Closes the terminal");
    }

    main = (system, args) => {
        terminal.println("Good Bie!")
        terminal.close();
    }

    help = (system) => {
        system.println("This closes the terminal...");
    }
};

export default Exit;
