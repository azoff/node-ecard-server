var CaminteDB = require('caminte').Schema;
var db = new CaminteDB('sqlite3', { database: ':memory:' });

db.define('Pass', require('./pass'));

module.exports = db;