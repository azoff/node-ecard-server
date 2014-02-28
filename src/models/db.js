"use strict";

var config = require('../config');
var Schema = require('caminte').Schema;

module.exports = new Schema('sqlite3', {
	database: config.DB_PATH
});