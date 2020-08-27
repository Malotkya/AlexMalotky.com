const Entry = require("../entity/Entry.js");
let dao = {};

dao.getAll = async() => {
    try {
        let output = [];
        let responce = await new Entry().orderBy('stamp', 'DESC').fetchAll({withRelated: 'user'});
        responce.models.forEach(obj => {
            let user = obj.relations.user.attributes;
            obj.attributes.user = user.firstName + " " + user.lastName;
            output.push(obj.attributes);
        });

        return output;
    } catch (e) {
        console.error(e);
        return [];
    }
}

dao.insert = async(object) => {
    return (await new Entry(object).save(null,{method:"insert"})).attributes
}

dao.edit = async(object) => {
    return (await new Entry(object).save()).attributes
}

dao.delete = async(id) => {
    await new Entry({id:id}).destroy();
}

module.exports = dao;
