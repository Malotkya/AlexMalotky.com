const database = require('../util/database.js');

module.exports = database.model('FamilyMember', {
    tableName: 'familyMember',
});
