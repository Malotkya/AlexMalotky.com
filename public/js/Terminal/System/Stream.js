class Stream {
    constructor() {
        this.stream = "";
        this.buffer = "";
    }

    add = string => this.buffer += string;

    remove = () => this.buffer = this.buffer.slice(0, -1);

    set = string => {
        if(typeof string === "string")
            this.buffer = string;
    }

    clear = () => {
        this.stream += this.buffer;
        this.buffer = "";
    }

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
