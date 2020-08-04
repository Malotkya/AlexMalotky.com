class View {
    constructor(system) {
        //bios
        this.top = system.bios.view();
        this.width = system.bios.width;
        this.height = system.bios.height;
        this.cw = system.bios.cw;
        this.ch = system.bios.ch;

        this.font = system.bios.font;
        this.background = system.bios.background;

        //hiden canvas
        let canvas = document.createElement("canvas");
        canvas.width = this.width * this.cw;
        canvas.height = this.height * this.ch
        canvas.style.zIndex = -1;
        canvas.style.position = "absolute";
        canvas.style.top = 0;
        canvas.style.left = 0;

        this.ctx =canvas.getContext("2d");
        this.ctx.fillStyle = system.bios.gl.fillStyle;
        this.ctx.font = system.bios.gl.font;

        document.querySelector("body").appendChild(canvas);

        system.view = this;
        this.running = true;
    }

    output = (x,y,string) => {
        this.ctx.fillStyle = this.font;
        this.ctx.fillText(string, (x-1)*this.cw, (y*this.ch));
    }

    test = () => {
        for(let x=1; x<=this.width; x++) {
            for(let y=1; y<=this.height; y++) {
                this.output(x,y, Math.floor(Math.random() * 10));
            }
        }
    }

    clear = async() => {
        this.ctx.fillStyle = this.background;
        this.ctx.fillRect( 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    open = async() => {
        if(this.running) {
            await this.sleep();
            this.clear();
        }
        return this.running;
    }

    render = () => {
        if(this.running)
            return this.ctx.getImageData(0,0,this.ctx.canvas.width, this.ctx.canvas.height);

        return this.last;
    }

    close = () => {
        this.last = this.ctx.getImageData(0,0,this.ctx.canvas.width, this.ctx.canvas.height);
        this.running = false;
    }

    sleep = () => new Promise(r => window.setTimeout(r, 1));

    delete = () => {
        close();
        this.ctx.canvas.remove();
    }


}

export default View;
