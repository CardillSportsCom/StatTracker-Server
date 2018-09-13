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
  return Game.find({league: request.params.leagueId}).exec().then((leagueGames) => {
    var GameDays = [];

      var gameDates = leagueGames.map(a=>a.dateCreated.toLocaleDateString()).unique();
      for(var j = 0; j< gameDates.length; j++){
          var leagueGamesPlayedThisGameDay = leagueGames.filter(obj=> {
              return obj.dateCreated.toLocaleDateString() == gameDates[j]
          });

          var gameDay = {
              gameDate : gameDates[j],
              games: leagueGamesPlayedThisGameDay
          }
          GameDays.push(gameDay);
      }
      var ScoreObj = {
          gameDays : GameDays
      }
          return(ScoreObj)
  }).catch((err) => {

    return { err: err };

  });
}
Array.prototype.unique = function() {
  return this.filter(function (value, index, self) { 
    return self.indexOf(value) === index;
  });
}