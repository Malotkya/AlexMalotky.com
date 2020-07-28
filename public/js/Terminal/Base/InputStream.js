class InputStream {
    constructor(bios) {
        this.bios = bios;

        this.stream = "";
        this.cursor = "█";

        this.x = this.bios.x;
        this.y = this.bios.y;

        this.password = false;
    }

    add = char => {
        this.stream += char;

        if(!this.password) {
            this.bios.render(this.x, this.y, char);

            this.x++;
            if(this.x > this.bios.width()) {
                this.x = 1;
                this.y++;
            }

            if(this.y > this.bios.height()) {
                this.bios.grow();
            }

            if(char != "\n" && char != '\r')
                this.bios.render(this.x, this.y, this.cursor);
        }
    }

    remove = () => {
        if(this.stream.length > 0 && !this.password) {
            this.x--;
            if(this.x < 1) {
                this.x = this.bios.width();
                this.y--;
            }

            this.bios.render(this.x, this.y, this.cursor);

            this.stream = this.stream.slice(0, -1);
        }
    }

    set = string => {
        if(!this.password) {
            //do something
        }
    }

    clear = (p) => {
        this.stream = "";
        this.x = this.bios.x;
        this.y = this.bios.y;

        if(p !== undefined)
            this.password = p;

        this.bios.render(this.x, this.y, this.cursor);
    }

    get = async (char = " ") => {
        while(true) {
            let index = this.stream.indexOf(char);
            if(index >= 0) {
                let buffer = this.stream.substr(0, index).trim();
                this.stream = this.stream.substr(index);
                if(buffer !== "")
                    return buffer;
            }
            await this.bios.sleep();
        }
    };

    getln = async () => {
        while(true) {
            let n = this.stream.indexOf('\n');
            let r = this.stream.indexOf('\r');

            if(n >= 0) {
                let buffer = this.stream.substr(0, n).trim();
                this.stream = this.stream.substr(n);
                if(buffer !== "")
                    return buffer;
            }

            if(r >= 0) {
                let buffer = this.stream.substr(0, r).trim();
                this.stream = this.stream.substr(r);
                if(buffer !== "")
                    return buffer;
            }

            await this.bios.sleep();
        }
    }

    getPassword = async () => {
        this.clear(true);
        let output = await this.getln();
        this.clear(false);
        return output;
    }
};

export default InputStream;
