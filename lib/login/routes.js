var LoginLocal = require('./login-user-local.js');
var LoginFirebase= require('./login-user-firebase.js');


module.exports=[].concat(LoginLocal, LoginFirebase);