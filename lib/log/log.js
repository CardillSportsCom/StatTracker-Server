const Player = require('../../models/player')
const League = require('../../models/league')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Boom = require('boom');

exports.create = (request, h) => {
    var refinedLog = [];
    for(var j = 0; j< request.payload.length; j++){
        var game = request.payload[j];
        var teamOneScore = 0;
        var teamTwoScore = 0;
        for(var i = 0; i< game.teamOnePlayers.length;i++){
            var teamOnePlayer = game.teamOnePlayers[i];
            teamOneScore += teamOnePlayer.fieldGoalMade;
        }
        for(var k = 0; k< game.teamTwoPlayers.length;k++){
            var teamTwoPlayers = game.teamTwoPlayers[k];
            teamTwoScore += teamTwoPlayers.fieldGoalMade;
        }
        var gameLog = {
            id : game.id,
            teamOneScore: teamOneScore,
            teamTwoScore: teamTwoScore
        };
        refinedLog.push(gameLog);
    }
    return(refinedLog);


}