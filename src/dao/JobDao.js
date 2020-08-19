const JobHistory = require("../entity/JobHistory");
let dao = {};

const validate = object => {
    if(typeof object.startDate == 'string')
        object.startDate = new Date(object.startDate);
    if(typeof object.endDate == 'string')
        object.endDate = new Date(object.endDate);

    if(object.id === "")
        delete object.id;
    else
        object.id = Number(object.id);

    return object;
}

dao.getAll = async() => {
    try {
        let output = Array();
        let responce = await new JobHistory().orderBy('startDate', 'DESC').fetchAll();
        responce.models.forEach( obj => output.push(obj.attributes) );
        return output;
    } catch (e) {
        throw e;
    }
}

dao.update = async(object) => {
    try {
        let job = new JobHistory( validate(object) );
        await job.save();
    } catch (e) {
        if(e.message != 'No Rows Updated')
            throw e;
    }
}

dao.insert = async(object) => {
    try {
        let job = new JobHistory( validate(object) );
        await job.save(null, {method:"insert"});
    } catch (e) {
        throw e;
    }

};

dao.delete = async(id) => {
    try {
        await new JobHistory({id:id}).destroy();
    } catch (e) {
        throw e;
    }
};

module.exports = dao;
