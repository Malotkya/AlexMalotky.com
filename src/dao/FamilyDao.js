const  FamilyMember = require("../entity/FamilyMember.js");
const imageDao = new (require("./ImageDao.js"))("Family");
let dao = {};

const validate = object => {

    object.parent_id = Number(object.parent_id);
    if(isNaN(object.parent_id))
        object.parent_id = null;

    return object;
}

dao.getById = async(id) => {
    try {
        return (await new FamilyMember({id:id}).fetch()).attributes;
    } catch (e) {
        return null;
    }
}

dao.getAll = async() => {
    try {
        let output = Array();
        let responce = await new FamilyMember().fetchAll();
        responce.models.forEach(obj => output.push(obj.attributes));

        return output;
    } catch (error) {
        return Array();
    }
}

dao.update = async(object, files) => {
    if(files !== null) {
        object.picture = imageDao.upload(object.name,
                    files.picture.data, files.picture.mimetype);
    }

    let person = new FamilyMember(validate(object));
    return (await person.save()).attributes
}

dao.insert = async(object, files) => {
    if(files !== null) {
        object.picture = imageDao.upload(object.name,
                    files.picture.data, files.picture.mimetype);
    }

    let person = new FamilyMember(validate(object));
    return (await person.save(null, {method:"insert"})).attributes;
}

dao.delete = async(id) => {
    let picture = (await dao.getById(id)).picture;
    if(picture !== "")
        imageDao.delete(picture);

    new FamilyMember({id:id}).destroy();
}

module.exports = dao;
