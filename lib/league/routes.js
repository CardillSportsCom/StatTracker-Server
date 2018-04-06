var GetLeague = require('./get-league');
var CreateLeague = require('./create-league');
var UpdateLeague = require('./update-league');
var DeleteLeague = require('./delete-league');
var ListLeague = require('./list-league');
module.exports = [].concat(GetLeague, CreateLeague, UpdateLeague, DeleteLeague, ListLeague);