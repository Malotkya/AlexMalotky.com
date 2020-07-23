const User = require("../entity/User.js");

class UserDao {
    async getByUserName(username) {
        try {
            let responce = await new User({'email':username})
                .fetch({
                    withRelated: 'roles'
                });

            let output = responce.attributes;
            output.roles = Array();
            responce.relations.roles.models.forEach(obj => {
                output.roles.push(obj.attributes.type);
            })
            return output
        } catch (error) {
            return null;
        }
    }

    async getById(id) {
        try {
            let responce = await new User({id:id})
                .fetch({
                    withRelated: 'roles'
                });

            let output = responce.attributes;
            output.roles = Array();
            responce.relations.roles.models.forEach(obj => {
                output.roles.push(obj.attributes.type);
            })
            return output
        } catch (error) {
            return null;
        }
    }

    async getAll() {
        let responce = await new User()>fetchAll({withRelated: 'roles'});

        let output = Array();
        responce.models.forEach(user => output.push(user));

        return output;
    }

    async insert(email, password_hash, firstName, lastName) {
        let user = new User({
            email:email,
            password:password_hash,
            firstName:firstName,
            lastName:lastName
        });
        user = await user.save(null, {method:"insert"});
        return user.attributes.id;
    }
}

module.exports = new UserDao();
