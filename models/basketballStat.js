const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");

var BasketBallStatSchema = new Schema({
    player: {type: Schema.Types.ObjectId, ref: 'Player'},
    team: {type: Schema.Types.ObjectId, ref: 'Team'},
    game: {type: Schema.Types.ObjectId, ref: 'Game'},
    league: {type: Schema.Types.ObjectId, ref: 'League'},
    FGM: Number,
    FGA: Number,
    rebounds: Number,
    assists: Number,
    steals: Number,
    blocks: Number,
    turnovers:Number,
    dateCreated: Date
});

module.exports = mongoose.model('BasketBallStat', BasketBallStatSchema);
