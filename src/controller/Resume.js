class Resume {
    constructor() {
        this.path = "/Resume"
    }

    async get(req, res) {
        let SchoolHistory = require('../dao/SchoolHistory.js');
        let JobHistory = require('../dao/JobHistory.js');
        let errorMessage = "";
        let schoolHistory = Array();
        let jobHistory = Array();

        try {
            let sqlResponce = await new SchoolHistory().orderBy('graduated', 'DESC').fetchAll();
            sqlResponce.models.forEach( obj => schoolHistory.push(obj.attributes) );

            sqlResponce = await new JobHistory().orderBy('startDate', 'DESC').fetchAll()
            sqlResponce.models.forEach( obj => jobHistory.push(obj.attributes) );
        } catch (error) {
            console.error(error);
            errorMessage = JSON.stringify(error);
        }

        res.render("resume", {
            schoolHistory:schoolHistory,
            jobHistory:jobHistory,
            errMsg:errorMessage
        });
    }

};

module.exports = new Resume();
