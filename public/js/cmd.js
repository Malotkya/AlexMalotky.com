import Terminal from './Terminal/Terminal.js';
import System from "./Terminal/System.js";
import App from "./Terminal/App.js";

window.onload = () => {

    let system = new System(document.querySelector("#terminal"));
    let terminal = new Terminal(system);

    system.println("Welcome to AlexMalotky.com");
    system.addApp(new Password());

    system.run().catch(e => {
        console.error(e);
    });
};

class Password extends App {
    constructor() {
        super("password", "For testing getPassword()");
    }

    main = async (terminal, args) => {
        let password = await terminal.getPassword();

        terminal.println("!!!" + password + "!!!");
    }
}
