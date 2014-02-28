"use strict";
require('../app').all('*', function(req, res) {
	res.json(404, { error: 'Unknown Route' });
});