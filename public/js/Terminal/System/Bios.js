import * as Keyboard from './Keyboard.js';
import * as Mouse from './Mouse.js';
import * as Default from './Defaults.js';

// The Bios class handels all the inputs from the user and passes it to the System
// in a way that it can easily understand.  Also handels all the output by using
// the 2D graphics library that draws on a canvas.
//
// @author: Alex Malotky
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

        this.width = Default.SCREEN_WIDTH;
        this.height = Default.SCREEN_HEIGHT;

        this.background = Default.COLOR_BACKGROUND;
        this.font = Default.COLOR_FONT;

        this.setSize(Default.FONT_SIZE);

        //Events
        this.gl.canvas.tabIndex = 1;
        this.gl.canvas.addEventListener("keydown", this.onKeyDown);
        this.gl.canvas.addEventListener("keyup", this.onKeyUp)
        this.gl.canvas.addEventListener("keypress", this.onKeyPress);

        //this.target.addEventListener("scroll", this.onScroll);

        this.x = 1;
        this.y = 1;

        this.gl.fillStyle = this.font;
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
            //this.onKeyUp(event);
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
    //
    // Increments this.x and this.y
    //
    // @param: string to be printed
    print = string => {

        for(let i=0; i<string.length; i++) {
            let char = string.charAt(i);
            if(char == '\n' || char == '\r') {
                this.x = 1;
                this.y++;
            } else {
                this.put(this.x,this.y,char);
                this.x++;
                if(this.x > this.width) {
                    this.x = 1;
                    this.y++;
                }

                if(this.y > this.totalHeight()) {
                    this.grow();
                }
            }
        }
    }


    // Puts the char into the canvas
    //
    // @param char to be inputed
    put = (x, y, char) => {
        this.gl.fillStyle = this.font;
        this.gl.fillText(char, (x-1)*this.cw, (y*this.ch));
    }

    // Makes sure there is enough room for the view port and automatically scrolls
    // to the top of the viewport
    //
    view = () => {;
        let top = (this.y-1) * this.ch;

        this.y += this.height;
        this.x = 1;

        if(this.y >= this.totalHeight())
            this.grow();

        //Have to wait for the growth to render.
        window.setTimeout(()=>this.target.scrollTop = top+2, 10);

        this.gl.fillStyle = this.background;
        this.gl.fillRect( 0, top+1, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.fillStyle = this.font;

        return top;
    }

    //shutsdown the app
    //
    shutdown = () => {
        //will call final save to cookies once that is an option!
        window.location.replace("/");
    }

    //Sets the font size of the app and resizes the width and height of the appendChild
    //
    setSize = size => {
        this.size = size;

        this.ch = size;
        this.cw = size * 0.6;

        this.setWidth(this.width);
        this.setHeight(this.height);

        this.grow(true);
    }

    //Sets the width of the app in characters
    //
    // @param width - the width of the app screen
    setWidth = width => {
        this.width = width;
        this.target.width = ((width+1) * this.cw);
        this.target.style.width = `${this.target.width}px`

    }

    //Sets the height of the app in characters
    //
    // @param height - the height of the app screen
    setHeight = height => {
        this.height = height;
        this.target.height = (height * this.ch);
        this.target.style.height = `${this.target.height}px`
    }

    // Grows the canvas height by an increment of one height, or grows/shrinks the
    // canvas width
    //
    // Will create the canvas if it not already created and then set the height
    // and width to the appropriate sizes.
    //
    // param: width - if the width is being resized.
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

            this.gl = canvas.getContext("2d", { alpha: false });

            if(this.gl === null) {
                this.target.innerText = "Unable to initialize WebGL. Your browser or machine may not support it.";
                return;
            }
            this.target.innerHTML = "";
            this.target.appendChild(canvas);

            this.gl.canvas.height = this.target.height;
            this.gl.canvas.width = this.target.width;

            this.gl.font = `${this.size}px monospace`;

        }
    }

    // Scrolls the app to the target height in characters
    //
    // @param: target to scroll too
    scroll = target => {
        if(target === undefined)
            target = this.y;

        window.setTimeout(()=>this.target.scrollTop = (target + 2) * this.ch, 10);
    }

    // Gets the total height of the canvas rather then view height.
    totalHeight = () => Math.floor(this.gl.canvas.height / this.ch);

    // Puts the thread to sleep, usualy to allow the browser to get a chance to render.
    sleep = (s=100) => new Promise(r => window.setTimeout(r, s));

    // Clears the active part of the canvas with a black rectangle, and creates
    // an image of the inactive outputs to speed up rendering.
    clear = () => {
        this.gl.fillStyle = this.background;
        this.gl.fillRect( ((this.x-1)*this.cw), ((this.y-1)*this.ch), this.gl.canvas.width, this.ch*2);
        this.gl.fillRect( 0, (this.y*this.ch), this.gl.canvas.width, this.gl.canvas.height);

        return this.gl.getImageData(0,0,this.gl.canvas.width, this.gl.canvas.height);
    }

    // Render function that is called by the browser.
    render = () => {
        this.gl.putImageData( this.clear(), 0, 0 );
        this.os.render();
        window.requestAnimationFrame(this.render);
    }

    // Sets the background color of the app
    //
    // @param: color to set background
    setBackGroundColor = color => this.background = color;

    // Sets the font color of the app
    //
    // @param: color to set the font
    setFontColor = color => this.font = color;
}

export default Bios;
