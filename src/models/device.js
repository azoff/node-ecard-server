var db = require('./db');

var Device = db.define('Device', {
	uuid: { type: String, length: 128, index: true },
	type: { type: String, length: 32 }
});

Device.validatesPresenceOf('orgId', 'uuid', 'type');
Device.validatesUniquenessOf('uuid');

module.exports = Device;