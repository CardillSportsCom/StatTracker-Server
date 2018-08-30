const Player = require('../../models/player')
const League = require('../../models/league')
const Team = require('../../models/team')
const Game = require('../../models/game')
const BasketBallStat = require('../../models/basketballStat')

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


exports.get = (request, h) => {
    if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
        return { message: "Game not found", player: null };
    }
    return BasketBallStat.find({'game': request.params.id}).populate('team').exec().then((gameStats) => {
        
        return {message: "Done", gameStats};
    }).catch((err) => {
        return { err: err };
    });

}