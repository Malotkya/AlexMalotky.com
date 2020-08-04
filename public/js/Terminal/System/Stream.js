// This class acts like a stream to handel inputs and outputs.  This class doesn't
// really contain an actual stream but instead containts a string that is read from
// and a buffer that is editable that is then "saved" to the stream string.
//
// author: Alex Malotky
class Stream {
    //Initializes the stream and buffer strings.
    constructor() {
        this.stream = "";
        this.buffer = "";
    }

    // Appends to the end of the buffer
    //
    // @param string to append
    add = string => this.buffer += string;

    // removes the last char from the buffer string
    //
    remove = () => this.buffer = this.buffer.slice(0, -1);

    // Sets the buffer to the string and forgets old buffer data
    //
    // @param string to set the buffer
    set = string => {
        if(typeof string === "string")
            this.buffer = string;
    }

    // Appends the buffer to the stream and clears the buffer data
    //
    // @param string to append
    clear = () => {
        this.stream += this.buffer;
        this.buffer = "";
    }

    // Pulls from the stream up to the index, if the index is invalid or the returned
    // data would be empty for any reason, null is returned instead
    //
    // @param index ot pull till
    pull = index => {
        if(index >= 0) {
            let buffer = this.stream.substr(0, index);
            this.stream = this.stream.substr(index+1);
            if(buffer !== "")
                return buffer;
        }
        return null;
    }
};

export default Stream;
