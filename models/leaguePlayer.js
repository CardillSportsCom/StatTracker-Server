const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");

var LeaguePlayerSchema = new Schema({
    player: {type: Schema.Types.ObjectId, ref: 'Player'},
    league: {type: Schema.Types.ObjectId, ref: 'League'},
    playerType: {type:String, ref:'PlayerType'},
    dateCreated: Date
});

module.exports = mongoose.model('LeaguePlayer', LeaguePlayerSchema);
