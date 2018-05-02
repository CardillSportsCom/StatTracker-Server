const League = require('../../models/league')
const Player = require('../../models/player')
const LeaguePlayer = require('../../models/leaguePlayer')
const mongoose = require('mongoose');

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

                    return { err: err };

            });

        }).catch((err)=>{
            return {message: "Player doesn't exist"};
        });
    }).catch((err)=>{
        return {message: "League doesn't exist"};
    });

}

exports.getPlayers = (request,h)=>{
    return LeaguePlayer.find({'league': request.params.leagueId}, {player:1}).populate('player').exec().then((leaguePlayers)=>{
        return {message:"Got players of league", players: leaguePlayers};
    }).catch((err)=>{
        return {err:err};
    });
}

exports.getLeagues = (request, h)=>{
        return LeaguePlayer.find({'player': request.params.playerId}, {league:1}).populate('league').exec().then((leaguePlayers)=>{
        return {message:"Got leagues of player", leagues: leaguePlayers};
    }).catch((err)=>{
        return {err:err};
    });
}


exports.delete = (request, h)=>{
    return LeaguePlayer.findById(request.payload.leaguePlayerId).remove().exec().then((data)=>{
        return {message:"Removed player from league"};
    }).catch((err)=>{
        return {err:err};
    });
}