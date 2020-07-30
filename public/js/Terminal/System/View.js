import System from "./System.js";

class View {
    constructor(system) {
        system.bios.view();

        this.width = system.bios.width;
        this.height = system.bios.height;

        system.view = this;
        this.arr = Array(this.width).fill(null).map(() => Array(this.height));
    }

    test = () => {
        for(let x=1; x<=this.width; x++) {
            for(let y=1; y<=this.height; y++) {
                this.arr[x][y] = x+y;
            }
        }
    }

    render = system => {

    }


}

export default View;
