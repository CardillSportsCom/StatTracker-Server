const Player = require('../../models/player')
const League = require('../../models/league')
const Team = require('../../models/team')
const Game = require('../../models/game')
const BasketBallStat = require('../../models/basketballStat')

const mongoose = require('mongoose');



exports.list = (request, h) => {
    if (!mongoose.Types.ObjectId.isValid(request.params.leagueId)) {
        return { message: "League not found", player: null };
    }
    return Game.find({'league': request.params.leagueId}).exec().then((leagueGames)=>{
        return {message:"Got games of league", games: leagueGames};
    }).catch((err)=>{
        throw Boom.badRequest(err);
    });

}