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
}

module.exports = new UserDao();
