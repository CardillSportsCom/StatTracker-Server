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
      var GameDays = {};
      for(var i = 0; i < leagueGames.length; i++){
          var gameDay = leagueGames[i];
          var date = gameDay.dateCreated.toLocaleDateString();
          if(GameDays[date] == null){
              GameDays[date] = [];
          }
              GameDays[date].push(leagueGames[i]);
          
      }
          return(GameDays);
  }).catch((err) => {

    return { err: err };

  });
}