var express = require('express');

exports.apply = function(app) {

	"use strict";

	app.use(express.logger());

};