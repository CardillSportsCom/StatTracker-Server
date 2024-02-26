const BasketballStat = require('../../models/basketballStat');
const Team = require('../../models/team');
const TeamType = require('../../models/teamType');
const Game = require('../../models/game');
const League = require('../../models/league');
const Player = require('../../models/player');
const Season = require('../../models/season');

const Boom = require('@hapi/boom');
const commonFunctions = require('../util/commonFunctions');
const mongoose = require('mongoose');
const moment = require('moment');

exports.get = (request, h) => {
  if (!mongoose.Types.ObjectId.isValid(request.params.leagueId)) {
    return { message: "League not found", league: null };
  }

  return BasketballStat.find({league: request.params.leagueId}).sort('-dateCreated').populate('game').populate('team').populate('player').exec().then((leagueGames)=>{
      var GameDays = [];
      var seasonGames = leagueGames.filter(obj=>obj.game.season == request.params.seasonId);
      var gameDates = seasonGames.map(a=>a.game.dateCreated.toLocaleDateString()).unique();
      var games = seasonGames.map(a=>a.game).unique();
      var maxlength = gameDates.length;
      if(maxlength > 15){
        maxlength =15;
      }
      for(var j = 0; j< maxlength; j++){
          var leagueGamesPlayedThisGameDay = games.filter(obj=> {
            var momentdate = moment(obj.dateCreated);
            var localeDate = obj.dateCreated;
              return obj.dateCreated.toLocaleDateString() == gameDates[j]
          });
          var gameDateLeagueGames = seasonGames.filter(obj=>{
            var momentdate = moment(obj.dateCreated);
            var localeDate = obj.dateCreated;
              return obj.dateCreated.toLocaleDateString() == gameDates[j]
          });
          var GameDayTotalStats = [];
          var leaguePlayers = gameDateLeagueGames.map(a=>a.player._id).unique();
          for(var m = 0; m< leaguePlayers.length; m++){
              var playerStats = gameDateLeagueGames.filter(obj=> {
                  return obj.player._id == leaguePlayers[m]
              });

              var playerTotalStats = {
                  player: playerStats[0].player,
                  playerTotalStats: {
                      FGM: playerStats.sum("FGM"),
                      FGA: playerStats.sum("FGA"),
                      threePointersMade: playerStats.sum("threePointersMade"),
                      threePointersAttempted: playerStats.sum("threePointersAttempted"),
                      rebounds: playerStats.sum("rebounds"),
                      assists: playerStats.sum("assists"),
                      steals: playerStats.sum("steals"),
                      blocks: playerStats.sum("blocks"),
                      turnovers: playerStats.sum("turnovers"),
                      gamesPlayed: playerStats.length,
                      gamesWon: playerStats.filter(obj=> {
                          return obj.isWin == true;
                      }).length
                  }
              }
              GameDayTotalStats.push(playerTotalStats);
          }

          var gameDay = {
              gameDate : gameDates[j],
              games: leagueGamesPlayedThisGameDay,
              gameDayStatTotals : GameDayTotalStats
          }
          GameDays.push(gameDay);
      }
      var ScoreObj = {
          gameDays : GameDays
      }
          return(ScoreObj)
  }).catch((err) => {

        throw Boom.badRequest(err);

  });
}
Array.prototype.unique = function() {
  return this.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });
}
