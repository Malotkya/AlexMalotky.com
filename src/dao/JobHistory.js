const database = require('../util/database.js');

module.exports = database.model('JobHistory', {
    tableName: 'jobHistory'
});
