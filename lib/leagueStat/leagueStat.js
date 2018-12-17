const BasketballStat = require('../../models/basketballStat');
const Team = require('../../models/team');
const TeamType = require('../../models/teamType');
const Game = require('../../models/game');
const League = require('../../models/league');
const Player = require('../../models/player');
const Boom = require('boom');
const commonFunctions = require('../util/commonFunctions');
const mongoose = require('mongoose');

exports.get = (request, h) => {
   var fromDate = new Date();
   var toDate = new Date();
   var perGame = 10;
  if (!mongoose.Types.ObjectId.isValid(request.params.leagueId)) {
    return { message: "League not found", league: null };
  }
  
  if(request.params.fromDate != null){
      fromDate = request.params.fromDate;
  }
  if(request.params.toDate != null){
      toDate = request.params.toDate;
  }
  if(request.params.perGame){
      perGame = request.params.perGame;
  }

  return BasketballStat.find({league: request.params.leagueId}).populate('player').exec().then((leagueStats) => {
    var LeagueStats = [];

      var leaguePlayers = leagueStats.map(a=>a.player._id).unique();
      for(var j = 0; j< leaguePlayers.length; j++){
          var playerStats = leagueStats.filter(obj=> {
              return obj.player._id == leaguePlayers[j]
          });

          var playerTotalStats = {

            FGM: playerStats.sum("FGM"),
            FGA: playerStats.sum("FGA"),
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
          var playerAverageStats = {
            FGM: (perGame * playerStats.sum("FGM")/playerStats.length).toFixed(2),
            FGA: (perGame * playerStats.sum("FGA")/playerStats.length).toFixed(2),
            rebounds: (perGame * playerStats.sum("rebounds")/playerStats.length).toFixed(2),
            assists: (perGame * playerStats.sum("assists")/playerStats.length).toFixed(2),
            steals: (perGame * playerStats.sum("steals")/playerStats.length).toFixed(2),
            blocks: (perGame * playerStats.sum("blocks")/playerStats.length).toFixed(2),
            turnovers: (perGame * playerStats.sum("turnovers")/playerStats.length).toFixed(2),
            gamesPlayed: playerStats.length,
            gamesWon: playerStats.filter(obj=> {
                return obj.isWin == true;
            }).length
          }

          var playerStats = {
              player: playerStats[0].player,
              playerTotalStats: playerTotalStats,
              playerAverageStats: playerAverageStats
          }
          LeagueStats.push(playerStats);
      }
      var LeagueStatObj = {
          leagueStats : LeagueStats
      }
          return(LeagueStatObj)
  }).catch((err) => {

        throw Boom.badRequest(err);

  });
}
