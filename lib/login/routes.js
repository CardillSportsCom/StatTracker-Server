var LoginLocal = require('./login-user-local.js');
var LoginFirebase= require('./login-user-firebase.js');
var LoginNextAuth = require('./login-user-next-auth.js');


module.exports=[].concat(LoginLocal, LoginFirebase, LoginNextAuth);