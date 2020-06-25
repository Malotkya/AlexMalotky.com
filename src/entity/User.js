const database = require('../util/database.js');
const password = require('../util/password.js');

module.exports = database.model('User', {
    tableName: 'user',
    roles() {
        return this.belongsToMany('Roles');
    }
    setPassword(string) {
        this.password = password.hash(string);
    }
    comparePassword(string) {
        return password.compare(string, this.password);
    }
});

//Stashed here because I don't believe Ill need a roles DAO.
database.model('Role', {
    tableName: 'role',
    users() {
        return this.belongsToMany("User");
    }
});
