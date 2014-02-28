var async       = require('async');
var express     = require('express');
var development = require('./development');

exports.apply = function(app) {

	"use strict";

	app.configure('development', async.apply(development.apply, app));
	app.use(express.json());

};