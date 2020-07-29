import App from "../App.js";

class Help extends App {
    constructor(){
        super("help", "I try to help out how ever I can");
    }

    main = (system, args) => {
        if(args[1] === undefined) {

            for(const key in system.apps) {
                let app = system.apps[key];
                if(app.description !== undefined)
                    system.println(`${key} - ${app.description}`);
            }
        } else {
            let app = null;
            let intrusive = (args[1] == "-i")
            if(intrusive) {
                app = system.apps[args[2].toLowerCase()];
            } else {
                app = system.apps[args[1].toLowerCase()];
            }

            if( typeof app.help === "function") {
                app.help(system);
            } else {
                system.println("Sorry, I don't know that application.");
            }
        }
    }

    help = (system) => {
        system.println("Holla Mundo!");
    }
};

export default Help;
