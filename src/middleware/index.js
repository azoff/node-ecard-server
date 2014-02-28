var express  = require('express');
var app     = require('../app');

app.use(express.json());
require('./development');
