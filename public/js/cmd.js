import Terminal from './Terminal/Terminal.js';
import System from "./Terminal/System.js";
import App from "./Terminal/App.js";
import * as Keyboard from "./Terminal/System/Keyboard.js";

const init = () => {

    let system = new System(document.querySelector("#terminal"));
    let terminal = new Terminal(system);

    system.println("Welcome to AlexMalotky.com");
    system.addApp(new Test());

    terminal.run();
};

class Test extends App {
    constructor() {
        super("view", "For testing view port like funcitonality");
    }

    main = async (system, args) => {
        let view = await system.getView();

        while(await view.open()) {
            if(Keyboard.isKeyPressed(Keyboard.ESCAPE))
                view.close();

            view.test();
        }

    }
}
