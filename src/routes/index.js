exports.apply = function(app) {

	"use strict";

	app.post('/passbook/:pass_name/render', require('./passbook.render'));
	app.all('*', require('./default'));

};