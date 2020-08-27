const database = require("../util/database.js");

module.exports = database.model('Blog', {
    tableName: 'blog',
    user() {
        return this.belongsTo("User", 'user_id', 'id');
    }
})
