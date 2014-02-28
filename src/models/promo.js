var db = require('./db');
var schema = require('caminte').Schema;

var Promo = db.define('Promo', {
	title: { type: schema.Text }
});

Promo.validatesPresenceOf('title', 'orgId');

module.exports = Promo;