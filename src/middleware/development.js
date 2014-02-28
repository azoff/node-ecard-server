"use strict";

var express = require('express');
var app     = require('../app');

app.configure('development', function(){
	app.use(express.logger());
});