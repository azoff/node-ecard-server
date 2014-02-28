"use strict";

var fs = require('fs');

exports.readJsonFile = function(path, callback) {
	fs.readFile(path, function(err, data){
		if (err) {
			callback(err);
		} else try {
			callback(null, JSON.parse(data));
		} catch(e) {
			callback(e);
		}
	});
};

exports.toArray = function (obj) {
	var arr = [];
	Object.keys(obj).forEach(function(key){
		arr[parseInt(key, 10)] = obj[key];
	});
	return arr;
};

exports.serveError = function(err, res, code, msg) {
	code = code || 418;
	msg  = msg || "I\'m A Teapot";
	var number = Math.random().toString().substr(2);
	console.error("ERROR("+number+"):", err.stack);
	res.json(code, { error: msg + '. Ref #' + number });
};