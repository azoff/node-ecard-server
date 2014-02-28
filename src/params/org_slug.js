"use strict";

var app   = require('../app');
var utils = require('../utils');
var Org   = require('../models').Org;

app.param('org_slug', function(req, res, next, slug){
	Org.findOne({ where: { slug: slug }}, function(err, org){
		if (err) {
			utils.serveError(err, res, 500, 'Unexpected Database Error');
		} else if (org) {
			req.org = org;
			next();
		} else {
			var e = new Error("Unable to find org matching '"+slug+"'");
			utils.serveError(e, res, 404, e.message);
		}
	});
});