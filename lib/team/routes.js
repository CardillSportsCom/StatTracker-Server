var GetTeam = require('./get-team');
var CreateTeam = require('./create-team');
var UpdateTeam = require('./update-team');
var DeleteTeam = require('./delete-team');
var ListTeam = require('./list-team');
module.exports = [].concat(GetTeam, CreateTeam, UpdateTeam, DeleteTeam, ListTeam);