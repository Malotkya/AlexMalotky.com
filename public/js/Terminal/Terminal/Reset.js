import App from "../App.js";

class Reset extends App {
    constructor(){
        super("clear", "Clears the terminal");
    }

    main = (system, args) => {
        switch (args[1]) {
            case "-h":
                this.help(system);
                break;

            case "-r":
                system.reset();
                break;

            default:
                for(let i=0; i<10; i++)
                    system.println("\n");
        }
    }

    help = (system) => {
        system.println("clear : Clears the terminal");
        system.println("   -h : displays helpful information");
        system.println("   -r : instead of clearing the screen will reset the whole terminal.");
    }
};

export default Reset;
