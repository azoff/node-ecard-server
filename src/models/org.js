"use strict";

var db = require('./db');

var Org = db.define('Org', {
	slug: { type: String, length: 32, index: true },
	timezone: { type: String, length: 6, default: '-08:00' }
});

Org.prototype.pkFields = function(style, callback) {
	callback(null, {});
};

Org.prototype.currentPromo = function(callback) {
	require('./promo').findOne().desc('created_ts').run({}, callback);
};

Org.prototype.currentPromoPkFields = function(style, callback) {
	this.currentPromo(function(err, promo) {
		promo.pkFields(style, callback);
	});
};

Org.validatesUniquenessOf('slug');

module.exports = Org;