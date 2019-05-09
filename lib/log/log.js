const Player = require('../../models/player')
const League = require('../../models/league')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Boom = require('boom');

exports.create = (request, h) => {
    var refinedLog = [];
    var teamAPlayers=[];
    var teamBPlayers=[];
    for(var j = 0; j< request.payload.length; j++){
        var game = request.payload[j];
        var teamOneScore = 0;
        var teamTwoScore = 0;
        for(var i = 0; i< game.teamOnePlayers.length;i++){
            var teamOnePlayer = game.teamOnePlayers[i];
            teamOneScore += teamOnePlayer.fieldGoalMade;
            var t1P = {
                playerId: teamOnePlayer.id,
                fgm:teamOnePlayer.fieldGoalMade,
                fga: teamOnePlayer.fieldGoalMade + teamOnePlayer.fieldGoalMissed,
                rebounds: teamOnePlayer.rebounds,
                assists: teamOnePlayer.assists,
                steals: teamOnePlayer.steals,
                blocks: teamOnePlayer.blocks,
                turnovers: teamOnePlayer.turnovers
            }
            teamAPlayers.push(t1p);
        }
        for(var k = 0; k< game.teamTwoPlayers.length;k++){
            var teamTwoPlayers = game.teamTwoPlayers[k];
            teamTwoScore += teamTwoPlayers.fieldGoalMade;
            var t2P = {
                playerId: teamTwoPlayers.id,
                fgm:teamTwoPlayers.fieldGoalMade,
                fga: teamTwoPlayers.fieldGoalMade + teamTwoPlayers.fieldGoalMissed,
                rebounds: teamTwoPlayers.rebounds,
                assists: teamTwoPlayers.assists,
                steals: teamTwoPlayers.steals,
                blocks: teamTwoPlayers.blocks,
                turnovers: teamTwoPlayers.turnovers
            }
            teamBPlayers.push(t2p);
        }
        var gameLog = {
            leagueId : "5ac6aaefe8da8276a88ffc07",
            teamTypeId: "5ac7e7bd9acd8e7d202b26bf",
            teamAScore: teamOneScore,
            teamBScore: teamTwoScore,
            teamA:{
                name: "Team A",
                players: teamAPlayers
            },
            teamB:{
                name: "Team B",
                players: teamBPlayers
            }
        };
        refinedLog.push(gameLog);

    }
    return(refinedLog);


}