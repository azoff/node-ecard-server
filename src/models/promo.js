"use strict";

var db = require('./db');
var schema = require('caminte').Schema;

var Promo = db.define('Promo', {
	title: { type: schema.Text },
	created_ts: { type: Number, default: Date.now }
});

Promo.prototype.pkFields = function(style, callback) {
	var fields = {
		storeCard: {
			storeCard: {
				backFields: {
					0: {
						value: this.title
					}
				}
			}
		}
	};
	callback(null, (style in fields) ? fields[style] : {});
};

Promo.validatesPresenceOf('title', 'orgId');

module.exports = Promo;