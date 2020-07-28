import Terminal from './Terminal/Terminal.js';
import App from "./Terminal/App.js"

window.onload = () => {

    let terminal = new Terminal(document.querySelector("#terminal"));

    terminal.println("Welcome to AlexMalotky.com");

    terminal.run().catch(e => {
        console.error(e);
    });


};
