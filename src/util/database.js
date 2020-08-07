const knex = require('./conn.js');

module.exports = require('bookshelf')(knex)
