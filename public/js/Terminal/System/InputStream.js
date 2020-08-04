import Stream from "./Stream.js"

// The input stream waits until it can get data from its stream and also holds the
// character that will be used as a cursor.
//
// @extends: Stream
// @author Alex Malotky
class InputStream extends Stream{
    // Loads the bios so that the stream can wait and set the defualt cursor that
    // is going to be displayed.
    //
    // @param bios
    constructor(bios) {
        super();
        this.bios = bios;
        this.cursor = "█";
    }

    // pulls from the stream untill the characer is met, waits if the character is not
    // in the stream.
    //
    // @param: char to pull till
    get = async (char = " ") => {
        while(true) {
            let index = this.stream.indexOf(char);
            let output = this.pull(index);

            if(output !== null)
                return output;

            await this.bios.sleep();
        }
    };

    // pulls from the stream untill the either the newline or return is met.
    //
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
