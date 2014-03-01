"use strict";

var db = require('./db');
var Member = db.define('Member', {
	number:     { type: String, length: 64, index: true },
	points:     { type: Number, default: 0 },
	expires_ts: { type: Number, default: Date.now }
});

Member.prototype.pkFields = function(style, callback) {
	this.pkExpiresString(function(err, expires){
		if (err) { callback(err); return; }
		var fields = {
			storeCard: {
				serialNumber: this.number,
					barcode: {
					message: this.number,
						altText: this.number
				},
				storeCard: {
					primaryFields: {
						0: { value: this.points.toString() }
					},
					secondaryFields: {
						0: { value: expires }
					},
					auxiliaryFields: {
						0: { value: this.displayStatus() }
					}
				}
			}
		};
		callback(null, (style in fields) ? fields[style] : {});
	}.bind(this));
};

Member.prototype.pkExpiresString = function(callback) {
	this.org(function(err, org){
		if (err) { callback(err); return; }
		var timezone = (org && org.timezone) ? org.timezone : '-08:00';
		callback(null, this.expires().toISOString().replace(/T.+$/, 'T00:00' + timezone));
	}.bind(this));
};

Member.prototype.expires = function() {
	return new Date(this.expires_ts);
};

Member.prototype.active = function() {
	return this.expires_ts >= Date.now();
};

Member.prototype.displayStatus = function() {
	return this.active() ? 'Active' : 'Inactive';
};

Member.validatesLengthOf('number', { min: 5, message: { min: 'Member Number Required' }});
Member.validatesPresenceOf('orgId');
Member.validatesUniquenessOf('number');

module.exports = Member;