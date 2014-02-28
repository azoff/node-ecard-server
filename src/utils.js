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