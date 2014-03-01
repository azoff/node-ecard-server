"use strict";

var async = require('async');
var models = require('../src/models');

var Org    = models.Org;
var Member = models.Member;
var Promo  = models.Promo;

Org.findOrCreate(
	{ slug: 'sparc' },
	{ timezone: '-08:01' },
	function(err, org) {
		if (err) throw err;
		var expires = Date.now() + 60 * 60 * 24 * 365 * 1000;
		async.parallel([
			async.apply(
				Promo.findOrCreate.bind(Promo),
				{ orgId: org.id },
				{ title: 'Big Deal!' }
			),
			async.apply(
				Member.findOrCreate.bind(Member),
				{ orgId: org.id, number: '000000000' },
				{ expires_ts: expires }
			)
		], function(err) {
			if (err) throw err;
		});
	}
);