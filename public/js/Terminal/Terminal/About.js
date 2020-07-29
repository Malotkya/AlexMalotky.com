import App from "../App.js";

class Help extends App {
    constructor(){
        super("about", "Displays more information about the terminal app");
    }

    main = (system, args) => {
        system.println("This is an attempt to see what I can create in this environement.");
        system.println("I plan to continue to expand the functionality of thie terminal");
        system.println("Goals Include:");
        system.println("[*]: Change how the terminal is displayed")
        system.println("[ ]: Login like functionality")
        system.println("[ ]: Saving settings to cookies");
        system.println("[ ]: Create a file like system in cookies to allow custom apps");
        system.println("[ ]: Create a basic game like snake");
    }

    help = (system) => {
        system.println("Do you really nead help with reading the about section?");
    }
};

export default Help;
