var db = require('./db');

var Org = db.define('Org', {
	slug: { type: String, length: 32, index: true },
	timezone: { type: String, length: 6, default: '-08:00' }
});

Org.validatesUniquenessOf('slug');

module.exports = Org;