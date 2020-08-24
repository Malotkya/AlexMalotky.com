const fs = require('fs');

const imgDir = process.cwd() + "/public/img";

const createPath = (target, public) => {
    if(target === undefined)
        target = "";
    let path = imgDir + "/" + target;

    if( !fs.existsSync(path) ) {
        if(block) {
            throw new Error("404");
        } else {
            fs.mkdirSync(path);
        }
    }


    return path;
};

class ImageDao {
    constructor(string, block) {
        this.database = createPath(string, block);
    }

    upload(target, data, type) {
        let file = type.split("/");
        let name = target.split(".");

        if(file[0] != "image")
            throw new Error("Not an image");

        target = name[0] + "." + file[1];
        fs.writeFileSync(this.database + "/" + target, data);
        return target;
    }

    delete(target){
        fs.unlinkSync(this.database + "/" + target);
    }

    getAll() {
        return fs.readdirSync(this.database);
    }
}

module.exports = ImageDao;
