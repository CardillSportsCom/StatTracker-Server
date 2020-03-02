const BasketballStat = require("../../models/basketballStat");
const Boom = require("boom");

const mongoose = require("mongoose");

function dynamicSort(property) {
  var sortOrder = 1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a,b) {
      /* next line works with strings and numbers, 
       * and you may want to customize it to your needs
       */
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}

exports.get = (request, h) => {
  const leagueId = request.params.id;
  if (!mongoose.Types.ObjectId.isValid(leagueId)) {
    return { message: "League not found", league: null };
  }
  return BasketballStat.find({ league: leagueId })
    .populate("player")
    .exec()
    .then(leagueStats => {

      var leagueTotalStats = [];

      var leaguePlayers = leagueStats.map(a => a.player._id).unique();
      for (var j = 0; j < leaguePlayers.length; j++) {
        var playerStats = leagueStats.filter(obj => {
          return obj.player._id == leaguePlayers[j];
        });

        var playerTotalStats = {
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
          gamesWon: playerStats.filter(obj => {
            return obj.isWin == true;
          }).length
        };

        var playerStats = {
          player: playerStats[0].player,
          playerTotalStats: playerTotalStats,
        };
        leagueTotalStats.push(playerStats);
      }

      var winLeaders =[];
      var pointLeaders = [];
      var assistLeaders = [];
      var reboundLeaders = [];
      var stealLeaders = [];
      var blockLeaders = [];
      var turnoverLeaders = [];

      for (var i=0; i<leagueTotalStats.length; i++) {
        var playerStat = leagueTotalStats[i];

        var winStat = {
          imageUri: playerStat.player.imageUri,
          name: playerStat.player.firstName,
          value: playerStat.playerTotalStats.gamesWon
        }
        winLeaders.push(winStat);

        var pointStat = {
          imageUri: playerStat.player.imageUri,
          name: playerStat.player.firstName,
          value: playerStat.playerTotalStats.FGM
        }
        pointLeaders.push(pointStat);

        var assistStat = {
          imageUri: playerStat.player.imageUri,
          name: playerStat.player.firstName,
          value: playerStat.playerTotalStats.assists
        }
        assistLeaders.push(assistStat);

        var reboundStat = {
          imageUri: playerStat.player.imageUri,
          name: playerStat.player.firstName,
          value: playerStat.playerTotalStats.rebounds
        }
        reboundLeaders.push(reboundStat);

        var stealStat = {
          imageUri: playerStat.player.imageUri,
          name: playerStat.player.firstName,
          value: playerStat.playerTotalStats.steals
        }
        stealLeaders.push(stealStat);

        var blockStat = {
          imageUri: playerStat.player.imageUri,
          name: playerStat.player.firstName,
          value: playerStat.playerTotalStats.blocks
        }
        blockLeaders.push(blockStat);

        var turnoverStat = {
          imageUri: playerStat.player.imageUri,
          name: playerStat.player.firstName,
          value: playerStat.playerTotalStats.turnovers
        }
        turnoverLeaders.push(turnoverStat);
      }

      winLeaders.sort(dynamicSort("-value"));
      pointLeaders.sort(dynamicSort("-value"));
      assistLeaders.sort(dynamicSort("-value"));
      reboundLeaders.sort(dynamicSort("-value"));
      stealLeaders.sort(dynamicSort("-value"));
      blockLeaders.sort(dynamicSort("-value"));
      turnoverLeaders.sort(dynamicSort("-value"));
      
      var leagueLeaders = {
        points: pointLeaders.slice(0,6),
        assists: assistLeaders.slice(0,6),
        rebounds: reboundLeaders.slice(0,6),
        steals: stealLeaders.slice(0,6),
        blocks: blockLeaders.slice(0,6),
        turnovers: turnoverLeaders.slice(0,6),
      }

      var leagueStatObj = {
        message: "Done",
        leagueLeaders: leagueLeaders
      };

      return leagueStatObj;
    })
    .catch(err => {
      throw Boom.badRequest(err);
    });
};
