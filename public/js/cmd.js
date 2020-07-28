import Terminal from './Terminal/Terminal.js';
import App from "./Terminal/App.js"

window.onload = () => {

    let terminal = new Terminal(document.querySelector("#terminal"));

    terminal.println("Welcome to AlexMalotky.com");
    terminal.addApp(new Password());

    terminal.run().catch(e => {
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
