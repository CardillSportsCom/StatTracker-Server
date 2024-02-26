const BasketballStat = require("../../models/basketballStat");
const Boom = require('@hapi/boom');
const mongoose = require("mongoose");

exports.get = (request, h) => {
  if (!mongoose.Types.ObjectId.isValid(request.params.leagueId)) {
    return { message: "League not found", league: null };
  }

  return BasketballStat.find({ league: request.params.leagueId })
    .populate("player")
    .populate("game")
    .exec()
    .then((leagueStats) => {
      var seasonStats = [];

      // Get all player ids for players in this league
      var leaguePlayers = leagueStats.map((a) => a.player._id).unique();

      for (var j = 0; j < leaguePlayers.length; j++) {
        // Only consider stats for this given player for the specified season
        var playerStats = leagueStats.filter((obj) => {
          return (
            obj.player._id == leaguePlayers[j] &&
            obj.game.season == request.params.seasonId
          );
        });

        // If this player has no stats for the specfied season then we should skip over them
        if (playerStats.length === 0) {
          continue;
        }

        var playerTotalStats = {
          gamesPlayed: playerStats.length,
          gamesWon: playerStats.filter((obj) => {
            return obj.isWin == true;
          }).length,
        };

        var playerStats = {
          player: playerStats[0].player,
          playerTotalStats: playerTotalStats,
        };

        seasonStats.push(playerStats);
      }
      var seasonStatsObj = {
        seasonStats,
      };
      return seasonStatsObj;
    })
    .catch((err) => {
      throw Boom.badRequest(err);
    });
};
