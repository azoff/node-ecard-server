exports.defineAs = function(db, table) {

	"use strict";

	var Pass = db.define(table, {
		serialNumber: { type: String, index: true }
	});

	return Pass;

};