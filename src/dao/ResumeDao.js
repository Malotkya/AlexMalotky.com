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

    async addNewSchool(name, degree, gpa, graduated, comments) {
        let school = new SchoolHistory({
            name:name,
            degree:degree,
            gpa:gpa,
            graduated:graduated,
            comments:comments
        });
        school.save(null, {method:"insert"});
    }

    async getAllJobHistory() {
        let output = Array();
        let responce = await new JobHistory().orderBy('startDate', 'DESC').fetchAll();
        responce.models.forEach( obj => output.push(obj.attributes) );
        return output;
    }

    async updateJob(id, title, location,startDate, endDate, description) {
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

    async addNewJob(title, location,startDate, endDate, description) {
        let job = new JobHistory({
            title:title,
            location:location,
            startDate:startDate,
            endDate:endDate,
            description:description
        });
        job.save(null, {method:"insert"});
    }
}

module.exports = new ResumeDao();
