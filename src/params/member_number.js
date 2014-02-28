"use strict";

var app    = require('../app');
var utils  = require('../utils');
var Member = require('../models').Member;

app.param('member_number', function(req, res, next, number){

	if (!req.org) {
		var e = new Error('Unable to find org for member '+number);
		utils.serveError(e, res, 404, e.message);
		return;
	}

	Member.findOne({ where: { number: number, orgId: req.org.id }}, function(err, member){
		if (err) {
			utils.serveError(err, res, 500, 'Unexpected Database Error');
		} else if (member) {
			req.member = member;
			next();
		} else {
			var e = new Error("Unable to find member '"+number+"'");
			utils.serveError(e, res, 404, e.message);
		}
	});

});