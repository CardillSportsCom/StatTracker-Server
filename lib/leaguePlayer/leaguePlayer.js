const League = require('../../models/league')
const Player = require('../../models/player')
const LeaguePlayer = require('../../models/leaguePlayer')
const PlayerType = require('../../models/playerType')
const mongoose = require('mongoose');
const Boom = require('boom');

exports.create = (request, h) => {

    return League.findById(request.payload.leagueId).exec().then((league)=>{
        return Player.findById(request.payload.playerId).exec().then((player)=>{
            const leaguePlayerObj = new LeaguePlayer({
                player: player,
                league: league,
                dateCreated: Date.now()
            });
            return LeaguePlayer.create(leaguePlayerObj).then((newLeaguePlayer) => {

                return { message: "Player added to league successfully", newLeaguePlayer: newLeaguePlayer };

                }).catch((err) => {

        throw Boom.badRequest(err);

            });

        }).catch((err)=>{
        throw Boom.badRequest(err);
        });
    }).catch((err)=>{
        throw Boom.badRequest(err);
    });

}

exports.getPlayers = (request,h)=>{
    return LeaguePlayer.find({'league': request.params.leagueId}, {player:1}).populate('player').populate('playerType').exec().then((leaguePlayers)=>{
        return {message:"Got players of league", players: leaguePlayers};
    }).catch((err)=>{
        throw Boom.badRequest(err);
    });
}

exports.getLeagues = (request, h)=>{
        return LeaguePlayer.find({'player': request.params.playerId}, {league:1}).populate('league').populate('playerType').exec().then((leaguePlayers)=>{
        return {message:"Got leagues of player", leagues: leaguePlayers};
    }).catch((err)=>{
        throw Boom.badRequest(err);
    });
}


exports.delete = (request, h)=>{
    return LeaguePlayer.findById(request.payload.leaguePlayerId).deleteOne().exec().then((data)=>{
        return {message:"Removed player from league"};
    }).catch((err)=>{
        throw Boom.badRequest(err);
    });
}
