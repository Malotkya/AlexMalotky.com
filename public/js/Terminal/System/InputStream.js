import Stream from "./Stream.js"

class InputStream extends Stream{
    constructor(bios) {
        super();
        this.bios = bios;
        this.cursor = "█";
    }

    get = async (char = " ") => {
        while(true) {
            let index = this.stream.indexOf(char);
            let output = this.pull(index);

            if(output !== null)
                return output;

            await this.bios.sleep();
        }
    };

    getln = async () => {
        while(true) {
            let n = this.stream.indexOf('\n');
            let r = this.stream.indexOf('\r');

            let N = this.pull(n);
            if(N !== null)
                return N;

            let R = this.pull(r);
            if(R !== null)
                return R;

            await this.bios.sleep();
        }
    }
};

export default InputStream;
