var path = require('path');

exports.BASE_DIR         = path.dirname(__dirname);
exports.HOME_DIR         = path.dirname(exports.BASE_DIR);

// Passbook Settings
exports.PASS_TYPE_PREFIX = 'pass.com.azoffdesign.';
exports.IOS_TEAM_ID      = 'LYS5QV8874';
exports.IOS_CERT_PASS    = process.env.IOS_CERT_PASS || 'ecard';
exports.IOS_DIR          = process.env.IOS_DIR || path.join(exports.HOME_DIR, 'ios');
exports.IOS_CERTS_DIR    = path.join(exports.IOS_DIR,  'certs');
exports.IOS_TEMPLATE_DIR = path.join(exports.IOS_DIR,  'templates');
exports.IOS_IMAGE_DIR    = path.join(exports.IOS_DIR,  'images');