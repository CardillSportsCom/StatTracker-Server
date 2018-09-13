const BasketballStat = require('../../models/basketballStat');
const Team = require('../../models/team');
const TeamType = require('../../models/teamType');
const Game = require('../../models/game');
const League = require('../../models/league');
const Player = require('../../models/player');

const mongoose = require('mongoose');

exports.create = (request, h) => {

    return League.findById(request.payload.leagueId).exec().then((league)=>{
        return TeamType.findById(request.payload.teamTypeId).exec().then((teamType)=>{
            var teamAPlayers = request.payload.teamA.players.map(y=>y.playerId);
            var teamBPlayers = request.payload.teamB.players.map(y=>y.playerId);
            
            const TeamA = new Team({
                name: request.payload.teamA.name,
                league: league,
                players:teamAPlayers,
                substitutes:teamASubstitues,
                injuries:teamAInjuries,
                dateCreated: Date.now()
            });
            const TeamB = new Team({
                name: request.payload.teamB.name,
                league: league,
                substitutes:teamBSubstitues,
                injuries:teamBInjuries,
                players: teamBPlayers,
                dateCreated: Date.now()
            });
            return Team.create(TeamA).then((teamAObj)=>{
                return Team.create(TeamB).then((teamBObj)=>{
                    const newGame = new Game({
                        teamA : teamAObj,
                        teamB : teamBObj,
                        type : teamType,
                        league: league,
                        teamAScore: request.payload.teamAScore,
                        teamBScore: request.payload.teamBScore,
                        dateCreated: Date.now()
                    });
                    return Game.create(newGame).then((newGameObj)=>{
                        for(var i = 0, len = teamAObj.players.length; i < len; i++){
                            var currentPlayerId = teamAObj.players[i];
                            var currentPlayer = request.payload.teamA.players.filter(item=> item.playerId == currentPlayerId)[0];
                            const newBBallStat = new BasketballStat({
                                player: currentPlayerId,
                                team: teamAObj,
                                game: newGameObj,
                                FGM: currentPlayer.fgm,
                                FGA: currentPlayer.fga,
                                rebounds: currentPlayer.rebounds,
                                assists: currentPlayer.assists,
                                steals: currentPlayer.steals,
                                blocks: currentPlayer.blocks,
                                stealsAgainst: currentPlayer.stealsAgainst,
                                blocksAgainst: currentPlayer.blocksAgainst,
                                turnovers: currentPlayer.turnovers,
                                dateCreated: Date.now()
                            });
                            
                            BasketballStat.create(newBBallStat);
                        }
                        for(var i = 0, len = teamBObj.players.length; i < len; i++){
                            var currentPlayerId = teamBObj.players[i];
                            var currentPlayer = request.payload.teamB.players.filter(item=> item.playerId == currentPlayerId)[0];
                            const newBBallStat = new BasketballStat({
                                player: currentPlayerId,
                                team: teamBObj,
                                game: newGameObj,
                                FGM: currentPlayer.fgm,
                                FGA: currentPlayer.fga,
                                rebounds: currentPlayer.rebounds,
                                assists: currentPlayer.assists,
                                steals: currentPlayer.steals,
                                blocks: currentPlayer.blocks,
                                stealsAgainst: currentPlayer.stealsAgainst,
                                blocksAgainst: currentPlayer.blocksAgainst,
                                turnovers: currentPlayer.turnovers,
                                dateCreated: Date.now()
                            });
                            
                            BasketballStat.create(newBBallStat);
                        }
                        return { message: "POST Stat endpoint reached" };
                    }).catch((err) => {
                        return { err: err };
                    });
                }).catch((err) => {
                    return { err: err };
                });
            }).catch((err) => {
                return { err: err };
            });
        }).catch((err)=>{
            return {err : err};
        });
    }).catch((err)=>{
        return {err : err};
    });

   
}