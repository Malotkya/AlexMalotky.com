import Stream from "./Stream.js";

class OutputStream extends Stream {
    constructor(bios) {
        super();

        this.bios = bios;
    }

    clear = () => {
        this.bios.print(this.buffer);
        this.buffer = "";
    }
}

export default OutputStream;
