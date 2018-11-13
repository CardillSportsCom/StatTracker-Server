const Player = require('../../models/player')
const League = require('../../models/league')
const Team = require('../../models/team')
const Game = require('../../models/game')
const BasketBallStat = require('../../models/basketballStat')

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


exports.get = (request, h) => {
    if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
        return { message: "Player not found", player: null };
    }
    return BasketBallStat.find({'player': request.params.id}).populate('team').exec().then((playerStats) => {
        
        return {message: "Done", playerStats};
    }).catch((err) => {
        throw Boom.badRequest(err);
    });

}