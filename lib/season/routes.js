var GetSeason = require('./get-season');
var CreateSeason = require('./create-season');
var UpdateSeason = require('./update-season');
var DeleteSeason = require('./delete-season');
var ListSeason = require('./list-season');
module.exports = [].concat(GetSeason, CreateSeason, UpdateSeason, DeleteSeason, ListSeason);