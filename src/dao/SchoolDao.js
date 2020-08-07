const SchoolHistory = require("../entity/SchoolHistory");
let dao = {};

const validate = object => {
    if(isNaN(object.gpa) || object.gpa == '')
        object.gpa = 0;
    if(typeof object.graduated == 'string')
        object.graduated = new Date(object.graduated);

    if(object.id === "")
        delete object.id;
    else
        object.id = Number(object.id);

    return object;
};

dao.getAll = async() => {
    try {
        let output = Array();
        let responce = await new SchoolHistory().orderBy('graduated', 'DESC').fetchAll();
        responce.models.forEach( obj => output.push(obj.attributes) );
        return output;
    } catch (e) {
        throw e;
    }
};

dao.update = async(object) => {
    try {
        let school = new SchoolHistory( validate(object) );
        await school.save();
    } catch (e) {
        if(e.message != 'No Rows Updated')
            throw e;
    }
};

dao.insert = async(object) => {
    try {
        let school = new SchoolHistory( validate(object) );
        await school.save(null, {method:"insert"});
    } catch (e) {

    }    
};

dao.delete = async(id) => {
    try {
        await new SchoolHistory({id:id}).destroy();
    } catch (e) {
        throw e;
    }
};

module.exports = dao;
