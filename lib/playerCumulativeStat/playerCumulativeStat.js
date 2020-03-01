const BasketBallStat = require("../../models/basketballStat");
const Boom = require("boom");

const mongoose = require("mongoose");

exports.get = (request, h) => {
  const playerId = request.params.id;

  if (!mongoose.Types.ObjectId.isValid(playerId)) {
    return { message: "Player not found", player: null };
  }
  return BasketBallStat.find({ player: playerId })
    .sort("dateCreated")
    .populate("game") // For every stat populate the game data that the stat was recorded for
    .exec()
    .then(playerStats => {
      var gameDates = playerStats
        .map(a => a.game.dateCreated.toLocaleDateString()) //map every stat to the date it was created
        .unique();

      var points = [];
      var assists = [];

      for (var i = 0; i < gameDates.length; i++) {
        var date = gameDates[i];

        var statsFromThisDay = playerStats.filter(stat => {
          return stat.dateCreated.toLocaleDateString() == date;
        });

        //Number of points scored on each day by this player
        var pointStats = {
          date: date,
          value: statsFromThisDay.sum("FGM")
        };
        points.push(pointStats);

        var assistStats = {
          date: date,
          value: statsFromThisDay.sum("assists")
        };
        assists.push(assistStats);
      }

      //Number of cumulative points scored before and on this day
      var currentPointTotal = 0;
      points = points.map(stat => {
        currentPointTotal += stat.value;
        return {
          date: stat.date,
          value: currentPointTotal
        };
      });

      var currentAssistTotal = 0;
      assists = assists.map(stat => {
        currentAssistTotal += stat.value;
        return {
          date: stat.date,
          value: currentAssistTotal
        };
      });

      const cumulativeStats = {
        points: points,
        assists: assists
      };

      return { message: "Done", cumulativeStats };
    })
    .catch(err => {
      throw Boom.badRequest(err);
    });
};
