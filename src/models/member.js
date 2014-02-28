"use strict";

var db = require('./db');
var Member = db.define('Member', {
	number:  { type: String, length: 64, index: true },
	points:  { type: Number, default: 0 },
	expires: { type: Number, default: Date.now }
});

Member.prototype.expiresPkDateString = function(callback) {
	var expires = (new Date(this.expires)).toISOString();
	this.org(function(err, org){
		var timezone = org ? org.timezone : '-08:00';
		callback(null, expires.replace(/T.+$/, 'T00:00' + timezone));
	});
};

Member.prototype.active = function() {
	return this.expires >= Date.now();
};

Member.prototype.displayStatus = function() {
	return this.active() ? 'Active' : 'Inactive';
};

Member.validatesLengthOf('number', { min: 5, message: { min: 'Member Number Required' }});
Member.validatesPresenceOf('orgId');
Member.validatesUniquenessOf('number');

module.exports = Member;