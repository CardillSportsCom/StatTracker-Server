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
      var rebounds = [];
      var steals = [];
      var blocks = [];
      var turnovers = [];

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

        var reboundsStats = {
          date: date,
          value: statsFromThisDay.sum("rebounds")
        };
        rebounds.push(reboundsStats);

        var stealsStats = {
          date: date,
          value: statsFromThisDay.sum("steals")
        };
        steals.push(stealsStats);

        var blocksStats = {
          date: date,
          value: statsFromThisDay.sum("blocks")
        };
        blocks.push(blocksStats);

        var turnoverStats = {
          date: date,
          value: statsFromThisDay.sum("turnovers")
        };
        turnovers.push(turnoverStats);
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

      var currentReboundTotal = 0;
      rebounds = rebounds.map(stat => {
        currentReboundTotal += stat.value;
        return {
          date: stat.date,
          value: currentReboundTotal
        };
      });

      var currentStealTotal = 0;
      steals = steals.map(stat => {
        currentStealTotal += stat.value;
        return {
          date: stat.date,
          value: currentStealTotal
        };
      });

      var currentBlockTotal = 0;
      blocks = blocks.map(stat => {
        currentBlockTotal += stat.value;
        return {
          date: stat.date,
          value: currentBlockTotal
        };
      });

      var currentTurnoverTotal = 0;
      turnovers = turnovers.map(stat => {
        currentTurnoverTotal += stat.value;
        return {
          date: stat.date,
          value: currentTurnoverTotal
        };
      });

      const cumulativeStats = {
        points: points,
        assists: assists,
        rebounds: rebounds,
        steals: steals,
        blocks: blocks,
        turnovers: turnovers
      };

      return { message: "Done", cumulativeStats };
    })
    .catch(err => {
      throw Boom.badRequest(err);
    });
};
