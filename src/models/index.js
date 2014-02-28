"use strict";

var db = require('./db');

// models
var Org    = require('./org');
var Promo  = require('./promo');
var Device = require('./device');
var Member = require('./member');

// relationships
Org.hasMany(Member, { as: 'members', foreignKey: 'orgId' });
Org.hasMany(Promo, { as: 'promos', foreignKey: 'orgId' });
Promo.belongsTo(Org, { as: 'org', foreignKey: 'orgId' });
Member.belongsTo(Org, { as: 'org', foreignKey: 'orgId' });
Member.hasMany(Device, { as: 'devices', foreignKey: 'ownerId' });
Device.belongsTo(Member, { as: 'owner', foreignKey: 'ownerId' });

module.exports = db.models;