import App from '../App.js';
import * as Default from '../System/Defaults.js';

class Settings extends App {
    constructor(bios) {
        super("settings", "Changes things like screen dimensions or colors");

        this.bios = bios;
        this.loop = false;
    }

    help = s => {
        s.println("Hola Mundo!");
    }

    main = async (system, args) => {

        if(args[1] === undefined) {
            this.loop = true;
        } else {
            switch(args[1].toLowerCase()) {
            case "set":
                system.println( this.change(args[2], args[3]) );
                break;
            case "reset":
                this.reset();
                system.println("Success!");
                break;
            default:
                system.println("Unknown command: " + args[1]);
            }
        }

        if(this.loop)
            await this.run(system);

        this.loop = false;
    }

    run = async(system) => {
        let input = (await system.get()).toLowerCase();
        while(input !== "exit") {
            switch (input) {
                case "reset":
                    this.reset();
                    system.println( "Success!" );
                break;

                case "set":
                let attribute = (await system.get()).toLowerCase();
                let value = (await system.get()).toLowerCase();
                system.println( this.change(attribute, value) );
                break;

                default:
                    system.println("Unknown command: " + input);
            }

            input = system.get().toLowerCase();
        }
    }

    reset = () => {
        this.bios.setWidth(Default.SCREEN_WIDTH);
        this.bios.setHeight(Default.SCREEN_HEIGHT);
        this.bios.setBackGroundColor(Default.COLOR_BACKGROUND);
        this.bios.setFontColor(Default.COLOR_FONT);
        this.bios.setSize(Default.FONT_SIZE);
    }

    change = (att, value) => {
        switch(att) {
        case "background-color":
            this.bios.setBackGroundColor(value);
            break;
        case "font-color":
            this.bios.setFontColor(value);
            break;
        case "font-size":
            this.bios.setSize(value);
            break;
        case "screen-width":
            this.bios.setWidth(value);
            this.bios.grow(true);
            break;
        case "screen-height":
            this.bios.setHeight(value);
            break;
        default:
            return "Unknown Attribute: " + att;
        }

        return "Success!";
    }

    render = bios => {
        /*if(this.loop) {

        }
        return this.loop;*/
        return false;
    }
}

export default Settings;
