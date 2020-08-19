const fs = require('fs');

const imgDir = process.cwd() + "/public/img";

const createPath = target => {
    let path = imgDir + "/" + target;

    if( !fs.existsSync(path) )
        fs.mkdirSync(path);

    return path;
};

class ImageDao {
    constructor(string) {
        this.database = createPath(string);
    }

    upload(target, data, type) {
        let file = type.split("/");

        if(file[0] != "image")
            throw new Error("Not an image");

        target += "." + file[1];
        fs.writeFileSync(this.database + "/" + target, data);
        return target;
    }

    delete(target){
        dao.unlinkSync(this.database + "/" + target);
    }
}

module.exports = ImageDao;
