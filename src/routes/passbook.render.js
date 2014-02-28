"use strict";

var app     = require('../app');
var path    = require('path');
var async   = require('async');
var utils   = require('../utils');
var config  = require('../config');
var extend  = require('extend');
var newPass = require('passbook');

var cache = {};

app.post('/passbook/:org_slug/:member_number', function(req, res) {

	res.json(200, { 'org': req.org.id, 'member': req.member.id });
	return;

	async.waterfall([
		getTemplate,
		getFields,
		renderPass
	], onError);

	function getTemplate(callback) {
		if (name in cache) {
			callback(null, cache[name]);
		} else {
			var template = path.join(config.IOS_TEMPLATE_DIR, name);
			async.waterfall([
				async.apply(utils.readJsonFile, template + '.json'),
				createTemplate
			], callback);
		}
	}

	function createTemplate(template, callback) {
		var type   = config.PASS_TYPE_PREFIX + name;
		var imagedir = path.join(config.IOS_IMAGE_DIR, name);
		template.passTypeIdentifier = type;
		template.teamIdentifier     = config.IOS_TEAM_ID;
		template = newPass(template.style, template);
		template.keys(config.IOS_CERTS_DIR, config.IOS_CERT_PASS);
		template.loadImagesFrom(imagedir);
		callback(null, cache[name] = template);
	}

	function getFields(template, callback) {
		var fields  = extend(true, {}, template.fields, req.body);
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