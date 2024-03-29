const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var BasketBallStatSchema = new Schema({
    player: {type: Schema.Types.ObjectId, ref: 'Player'},
    team: {type: Schema.Types.ObjectId, ref: 'Team'},
    game: {type: Schema.Types.ObjectId, ref: 'Game'},
    league: {type: Schema.Types.ObjectId, ref: 'League'},
    FGM: Number,
    FGA: Number,
    threePointersMade: Number,
    threePointersAttempted: Number,
    rebounds: Number,
    assists: Number,
    steals: Number,
    blocks: Number,
    blocksAgainst : Number,
    stealsAgainst : Number,
    turnovers:Number,
    dateCreated: Date,
    isWin: Boolean,
    pointsScored: Number
});

module.exports = mongoose.model('BasketBallStat', BasketBallStatSchema);
