import App from "./App.js";
import Help from "./Terminal/Help.js";
import Reset from "./Terminal/Reset.js";
import Exit from "./Terminal/Exit.js";
import About from "./Terminal/About.js";
import Settings from "./Terminal/Settings.js";

class Terminal extends App {
    constructor(system){
        super(null, null);

        this.running = true;
        this.system = system;

        system.addApp(new Help());
        system.addApp(new Reset());
        system.addApp(new Exit());
        system.addApp(new About());
        system.addApp(new Settings(system.bios));

        system.callstack.push(this);
    }

    main = async (system, args) => {
        while(this.running) {
            system.print("\n$: ")
            let input = await system.getln();

            let cmd = input.split(/\s+/);
            this.addToHistory(input);

            let app = system.apps[cmd[0].toLowerCase()];

            if(app === undefined) {
                system.println("Unknown Command!");
            } else {
                system.callstack.push(app);
                await system.run(cmd);
                system.callstack.pop();
            }
        }
    }

    run = () => {
        this.system.run()
        .catch(e => {
            console.error(e);
        })
    }
}

export default Terminal;
