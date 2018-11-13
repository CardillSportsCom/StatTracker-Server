const BasketballStat = require('../../models/basketballStat');
const Team = require('../../models/team');
const TeamType = require('../../models/teamType');
const Game = require('../../models/game');
const League = require('../../models/league');
const Player = require('../../models/player');
const unique = require('../util/commonFunctions').unique;
const sum = require('../util/commonFunctions').sum;
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
              player: playerStats[0].player,
              playerTotalStats: {
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
          }
          var playerAverageStats = {
              
          }

          var playerStats = {
              player: playerStats[0].player,
              playerTotalStats: playerTotalStats,
              playerAverageStats: playerAverageStats
          }
          LeagueStats.push(playerTotalStats);
      }
      var LeagueStatObj = {
          leagueStats : LeagueStats
      }
          return(LeagueStatObj)
  }).catch((err) => {

        throw Boom.badRequest(err);

  });
}
