const JobHistory = require("../entity/JobHistory");
const SchoolHistory = require("../entity/SchoolHistory");

class ResumeDao {

    async getAllSchoolHistory() {
        let output = Array();
        let responce = await new SchoolHistory().orderBy('graduated', 'DESC').fetchAll();
        responce.models.forEach( obj => output.push(obj.attributes) );
        return output;
    }

    async updateSchool(id, name, degree, gpa, graduated, comments) {
        if(isNaN(gpa) || gpa == '')
            gpa = 0;
        if(typeof graduated == 'string')
            graduated = new Date(graduated);

        let school = new SchoolHistory({
            id:id,
            name:name,
            degree:degree,
            gpa:gpa,
            graduated:graduated,
            comments:comments
        });
        school.save();
    }

    async insertSchool(name, degree, gpa, graduated, comments) {
        if(isNaN(gpa) || gpa == '')
            gpa = 0;
        if(typeof graduated == 'string')
            graduated = new Date(graduated);

        let school = new SchoolHistory({
            name:name,
            degree:degree,
            gpa:gpa,
            graduated:graduated,
            comments:comments
        });
        console.log(school);
        school.save(null, {method:"insert"});
    }

    async deleteSchool(id) {
        new SchoolHistory({id:id}).destroy();
    }

    async getAllJobHistory() {
        let output = Array();
        let responce = await new JobHistory().orderBy('startDate', 'DESC').fetchAll();
        responce.models.forEach( obj => output.push(obj.attributes) );
        return output;
    }

    async updateJob(id, title, location, startDate, endDate, description) {
        if(typeof startDate == 'string')
            startDate = new Date(startDate);
        if(typeof endDate == 'string')
            endDate = new Date(endDate);

        let job = new JobHistory({
            id:id,
            title:title,
            location:location,
            startDate:startDate,
            endDate:endDate,
            description:description
        });
        job.save();
    }

    async insertJob(title, location,startDate, endDate, description) {
        if(typeof startDate == 'string')
            startDate = new Date(startDate);
        if(typeof endDate == 'string')
            endDate = new Date(endDate);
            
        let job = new JobHistory({
            title:title,
            location:location,
            startDate:startDate,
            endDate:endDate,
            description:description
        });
        console.log(job);
        job.save(null, {method:"insert"});
    }

    async deleteJob(id) {
        new JobHistory({id:id}).destroy();
    }
}

module.exports = new ResumeDao();
