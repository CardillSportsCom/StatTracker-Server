var GetLeagueGames = require("./get-leagueGames");
var DeleteLeagueGames = require("./delete-leagueGames");

module.exports = [].concat(GetLeagueGames, DeleteLeagueGames);
