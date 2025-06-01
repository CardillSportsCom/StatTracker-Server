var CreateLeaguePlayer = require("./create-leaguePlayer");
var UpdateLeaguePlayer = require("./update-leaguePlayer");
var GetLeaguePlayerByLeague = require("./get-leaguePlayer-byLeague");
var GetLeaguePlayerByPlayer = require("./get-leaguePlayer-byPlayer");
var DeleteLeaguePlayer = require("./delete-leaguePlayer");
var GetLeaguePlayer = require("./get-leaguePlayer");
module.exports = [].concat(
	CreateLeaguePlayer,
	UpdateLeaguePlayer,
	GetLeaguePlayerByLeague,
	GetLeaguePlayerByPlayer,
	DeleteLeaguePlayer,
	GetLeaguePlayer
);
