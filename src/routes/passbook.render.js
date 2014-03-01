"use strict";

var app     = require('../app');
var path    = require('path');
var async   = require('async');
var utils   = require('../utils');
var config  = require('../config');
var extend  = require('extend');
var newPass = require('passbook');

var cache = {};

app.get('/passbook/:org_slug/:member_number', function(req, res) {

	var cardname = req.params.org_slug + '-card';

	async.waterfall([
		getTemplate,
		getFieldSources,
		getFields,
		renderPass
	], onError);

	function getTemplate(callback) {
		if (cardname in cache) {
			callback(null, cache[cardname]);
		} else {
			var template = path.join(config.IOS_TEMPLATE_DIR, cardname + '.json');
			async.waterfall([
				async.apply(utils.readJsonFile, template),
				createTemplate
			], callback);
		}
	}

	function createTemplate(template, callback) {
		var type   = config.PASS_TYPE_PREFIX + cardname;
		var imagedir = path.join(config.IOS_IMAGE_DIR, cardname);
		template.passTypeIdentifier = type;
		template.teamIdentifier     = config.IOS_TEAM_ID;
		template = newPass(template.style, template);
		template.keys(config.IOS_CERTS_DIR, config.IOS_CERT_PASS);
		template.loadImagesFrom(imagedir);
		callback(null, cache[cardname] = template);
	}

	function getFieldSources(template, callback) {
		async.parallel({
			org: async.apply(req.org.pkFields.bind(req.org), template.style),
			member: async.apply(req.member.pkFields.bind(req.member), template.style),
			promo: async.apply(req.org.currentPromoPkFields.bind(req.org), template.style)
		}, function(err, sources) {
			if (err) { callback(err); return; }
			sources.template = template.fields;
			callback(null, template, sources);
		});
	}

	function getFields(template, sources, callback) {
		var fields  = extend(true, {}, sources.template, sources.org, sources.promo, sources.member);
		var convert = ['primary', 'secondary', 'auxiliary', 'back'];
		convert.forEach(function(name){
			name += 'Fields';
			if (name in fields[template.style])
				fields[template.style][name] = utils.toArray(fields[template.style][name]);
		});
		callback(null, template, fields);
	}

	function renderPass(template, fields, callback) {
		template.createPass(fields).render(res, callback);
	}

	function onError(err) {
		if (err) res.json(500, { error: err.message });
	}

});