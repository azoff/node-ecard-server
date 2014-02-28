var express    = require('express');
var routes     = require('./routes');
var middleware = require('./middleware');

module.exports.start = function(port) {

	"use strict";

	var app = express();
	middleware.apply(app);
	routes.apply(app);
	app.listen(port);

};