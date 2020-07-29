import * as Keyboard from './Keyboard.js';
import * as Mouse from './Mouse.js';

class Bios {
    //Sets up the draw library and all of the event captures
    //
    // @param: target - canvas to draw to
    // @param: os - class that uses the bios to handel inputs and outputs.
    constructor(target, os) {
        this.os = os;

        this.overrideKey = [
            Keyboard.BACK_SPACE,
            Keyboard.SPACE_BAR,
            Keyboard.ARROW_UP,
            Keyboard.ARROW_DOWN
        ];

        this.target = target;

        this.width = 100;
        this.height = 30;

        this.setSize(15);

        //Events
        this.gl.canvas.tabIndex = 1;
        this.gl.canvas.addEventListener("keydown", this.onKeyDown);
        this.gl.canvas.addEventListener("keyup", this.onKeyUp)
        this.gl.canvas.addEventListener("keypress", this.onKeyPress);

        this.x = 1;
        this.y = 1;

        this.gl.fillStyle = "green";
        window.requestAnimationFrame(this.render);

        this.gl.canvas.focus();
    }

    // Handels key down event and calls keyPress and keyUp for certain keys like
    // Backspace and Space bar to prevent the web browser from moving.
    //
    // @param: event - used to get the key that was pressed.
    onKeyDown = event => {
        let code = Keyboard.getKeyCode(event);
        Keyboard.reportKeyDown(code);

        //Prevents browser default action for some keys like backspace and spacebar
        if(this.overrideKey.includes(code)) {
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
    print = string => {

        for(let i=0; i<string.length; i++) {
            let char = string.charAt(i);
            if(char == '\n' || char == '\r') {
                this.x = 1;
                this.y++;
            } else {
                this.put(this.x,this.y,char);
                this.x++;
                if(this.x >= this.width) {
                    this.x = 1;
                    this.y++;
                }

                if(this.y > this.totalHeight()) {
                    this.grow();
                }
            }
        }
    }

    put = (x, y, char) => {
        this.gl.fillStyle = "black";
        this.gl.fillRect( ((x-1)*this.cw), ((y-1)*this.ch), this.cw*2, this.ch+1);

        this.gl.fillStyle = "green";
        this.gl.fillText(char, (x-1)*this.cw, ((y-1)*this.ch)+this.y_offset);
    }

    //shutsdown the app
    shutdown = () => {
        //will call final save to cookies once that is an option!
        window.location.replace("/");
    }

    setSize = size => {
        this.size = size;

        this.ch = size * 1.2;
        this.cw = size * 0.6;

        this.y_offset = size * 0.9;

        this.setWidth(this.width);
        this.setHeight(this.height);

        this.grow(true);
    }

    setWidth = width => {
        this.width = width;
        this.target.width = (width * this.cw) + (this.size * 0.15);
        this.target.style.width = `${this.target.width}px`

    }

    setHeight = height => {
        this.height = height;
        this.target.height = (height * this.ch) + (this.size * 0.15);
        this.target.style.height = `${this.target.height}px`
    }

    //TODO: Save output so far to prevent clear on resize;
    grow = (width = false) => {
        if(this.gl) {
            let buffer = this.clear();

            if(width) {
                this.gl.canvas.width = this.target.width;
            } else {
                this.gl.canvas.height = this.gl.canvas.height + this.target.height;
            }

            this.gl.font = `${this.size}px monospace`;
            this.gl.putImageData(buffer, 0, 0);
        } else {
            let canvas = document.createElement("canvas");

            this.target.innerHTML = "";
            this.target.appendChild(canvas);

            this.gl = canvas.getContext("2d", { alpha: false });

            if(this.gl === null) {
                console.log("Unable to initialize WebGL. Your browser or machine may not support it.");
                return;
            }

            this.gl.canvas.height = this.target.height * 2;
            this.gl.canvas.width = this.target.width;

            this.gl.font = `${this.size}px monospace`;

        }
    }

    totalHeight = () => Math.floor(this.gl.canvas.height / this.ch);

    sleep = (s=100) => new Promise(r => window.setTimeout(r, s));

    clear = () => {
        this.gl.fillStyle = "black";
        this.gl.fillRect( ((this.x-1)*this.cw), ((this.y-1)*this.ch), this.gl.canvas.width, this.ch*2);
        this.gl.fillRect( 0, (this.y*this.ch), this.gl.canvas.width, this.gl.canvas.height);

        let buffer = this.gl.getImageData(0,0,this.gl.canvas.width, this.gl.canvas.height);
        this.gl.fillStyle = "green";

        return buffer;
    }

    render = () => {
        this.gl.putImageData( this.clear(), 0, 0 );
        this.os.render();
        window.requestAnimationFrame(this.render);
    }
}

export default Bios;
