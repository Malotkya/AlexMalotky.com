const  FamilyMember = require("../entity/FamilyMember.js");

class FamilyDao {
    async getById(id) {
        try {
            let responce = await new FamilyMember({id:id}).fetch();

            return responce.attributes;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getAll() {
        try {
            let output = Array();
            let responce = await new FamilyMember().fetchAll();
            responce.models.forEach(obj => output.push(obj.attributes));

            return output;
        } catch (error) {
            return Array();
        }
    }

    async update(id, name, picture, parent_id) {
        let pid = Number(parent_id);
        if(isNaN(pid))
            pid = null;

        let person = new FamilyMember({
            id:id,
            name:name,
            picture:picture,
            parent_id:pid
        });
        person.save();

        return person.attributes.id
    }

    async insert(name, picture, parent_id) {
        let pid = Number(parent_id);
        if(isNaN(pid))
            pid = null;

        let person = new FamilyMember({
            name:name,
            picture:picture,
            parent_id:pid
        });
        person = await person.save(null, {method:"insert"});

        return person.attributes.id;
    }

    async delete(id) {
        new FamilyMember({id:id}).destroy();
    }
}

module.exports = new FamilyDao();
