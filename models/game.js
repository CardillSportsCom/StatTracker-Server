const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");

var GameSchema = new Schema({
    teamA: {type: Schema.Types.ObjectId, ref: 'Team'},
    teamB: {type: Schema.Types.ObjectId, ref: 'Team'},
    type: {type:String, ref:'TeamType'},
    league: {type: Schema.Types.ObjectId, ref: 'League'},
    dateCreated: Date
});

module.exports = mongoose.model('Game', GameSchema);
