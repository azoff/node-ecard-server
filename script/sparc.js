"use strict";

var models = require('../src/models');
var org = new models.Org({ slug: 'sparc', timezone: '-08:01' });
org.save(function(){
	var expires = Date.now() + 60 * 60 * 24 * 365 * 1000;
	org.promos.create({ title: 'Big Deal!' });
	org.members.create({ number: '000000000', expires: expires });
});