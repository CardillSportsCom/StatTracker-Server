var CreateLeaguePlayer = require('./create-leaguePlayer');
var GetLeaguePlayerByLeague = require('./get-leaguePlayer-byLeague');
var GetLeaguePlayerByPlayer = require('./get-leaguePlayer-byPlayer');
var DeleteLeaguePlayer = require('./delete-leaguePlayer');
module.exports = [].concat(CreateLeaguePlayer, GetLeaguePlayerByLeague, GetLeaguePlayerByPlayer, DeleteLeaguePlayer);