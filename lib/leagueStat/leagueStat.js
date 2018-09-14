const BasketballStat = require('../../models/basketballStat');
const Team = require('../../models/team');
const TeamType = require('../../models/teamType');
const Game = require('../../models/game');
const League = require('../../models/league');
const Player = require('../../models/player');

const mongoose = require('mongoose');

exports.get = (request, h) => {
  if (!mongoose.Types.ObjectId.isValid(request.params.leagueId)) {
    return { message: "League not found", league: null };
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
          LeagueStats.push(playerTotalStats);
      }
      var LeagueStatObj = {
          leagueStats : LeagueStats
      }
          return(LeagueStatObj)
  }).catch((err) => {

    return { err: err };

  });
}
Array.prototype.unique = function() {
  return this.filter(function (value, index, self) { 
    return self.indexOf(value) === index;
  });
}
Array.prototype.sum = function (prop) {
    var total = 0
    for ( var i = 0, _len = this.length; i < _len; i++ ) {
        total += this[i][prop]
    }
    return total
}