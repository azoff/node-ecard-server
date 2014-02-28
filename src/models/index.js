var CaminteDB = require('caminte').Schema;
var db = new CaminteDB('sqlite3', { database: ':memory:' }); //TODO: add Data dir

require('./pass').defineAs(db, 'Pass');

db.automigrate();

module.exports = db.models;