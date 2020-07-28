import * as Keyboard from './Keyboard.js';
import * as Mouse from './Mouse.js';

const size =15;
const width = 100;
const height = 30;
const refresh = 33;

class Bios {
    //Sets up the draw library and all of the event captures
    //
    // TODO: remove jquery elements as the css is minimally accessed now and instead
    //       using a 2D web graphics library.
    //
    // @param: target - canvas to draw to
    // @param: os - class that uses the bios to handel inputs and outputs.
    constructor(target, os) {
        this.os = os;

        this.gl = target[0].getContext("2d", { alpha: false });

        if(this.gl === null) {
            console.log("Unable to initialize WebGL. Your browser or machine may not support it.");
            return;
        }

        //Events
        target.keydown(this.onKeyDown);
        target.keyup(this.onKeyUp)
        target.keypress(this.onKeyPress);
        //target.mouseover()

        this.ch = size * 1.1;
        this.cw = size * 0.6;

        this.y_offset = size * 0.9;

        this.gl.canvas.width = (width * this.cw) + (size * 0.15);
        this.gl.canvas.height = (height * this.ch) + (size * 0.15);

        this.gl.font = `${size}px monospace`;

        target.text("");
        target.css("marginLeft", (target.parent().width() - this.gl.canvas.width) / 2);

        target[0].focus();

        window.requestAnimationFrame(this.draw)
    }

    // Handels key down event and calls keyPress and keyUp for certain keys like
    // Backspace and Space bar to prevent the web browser from moving.
    //
    // @param: event - used to get the key that was pressed.
    onKeyDown = event => {
        let code = Keyboard.getKeyCode(event);
        Keyboard.reportKeyDown(code);

        //Prevents page from navigating when backspace or spacebar are pressed
        if(code == Keyboard.BACK_SPACE || code == Keyboard.SPACE_BAR) {
            event.preventDefault();
            this.onKeyPress(event);
            this.onKeyUp(event);
        }
    }

    // Handels key up event
    //
    // @param: event - used to get the key that was pressed.
    onKeyUp = event => {
        let code = Keyboard.getKeyCode(event);
        Keyboard.reportKeyUp(code);
    }

    // Handels key press event and paces event ot os.
    //
    // @param: event - used to get the key that was pressed.
    onKeyPress = event => {
        let code = Keyboard.getKeyCode(event);

        if(this.os.event !== undefined)
            this.os.event(code);
    }

    //Prints the string at the x and y cordinet based on a grid of chars
    print = (x,y,str) => this.gl.fillText(str, (x-1)*this.cw, ((y-1)*this.ch)+this.y_offset);

    //Future planned functions to allow access to pixels
    set = (x,y,bool) => {}
    flip = (x,y) => {}

    //draws the os using the above given functions.
    draw = () => {
        this.gl.fillColor = "black";
        this.gl.fillRect(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.save();
        this.gl.fillStyle = "green";
        this.os.draw();
        this.gl.restore();
        window.requestAnimationFrame(this.draw);
    }

    //shutsdown the app
    shutdown = () => {
        //will call final save to cookies once that is an option!
        window.location.replace("/");
    }
}

export default Bios;
