const  FamilyMember = require("../entity/FamilyMember.js");

class FamilyDao {
    async getById(id) {
        try {
            let responce = await new FamilyMember({id:id}).fetch();

            let output = responce.attributes;
            output.children = await this.getByParent(output);
            return output;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getByParent(parent) {
        try {
            let output = Array();
            let responce = await new FamilyMember().where({parent_id:parent.id}).fetchAll();

            for(let i=0; i<responce.models.length; i++) {
                let child = responce.models[i].attributes;
                child.children = await this.getByParent(child);
                output.push(child);
            }
            
            return output;
        } catch (error) {
            return Array();
        }
    }
}

module.exports = new FamilyDao();
