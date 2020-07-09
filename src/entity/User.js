const database = require('../util/database.js');

module.exports = database.model('User', {
    tableName: 'user',
    roles() {
        return this.belongsToMany('Role', 'user_role', 'user_id', 'role_id');
    }
});

//Stashed here because I don't believe Ill need a roles DAO.
database.model('Role', {
    tableName: 'role',
    users() {
        return this.belongsToMany("User");
    }
});
