const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TeamSchema = new Schema({
    name: String,
    players: [{type:Schema.Types.ObjectId, ref: 'Player'}],
    substitutes: [{type:Schema.Types.ObjectId, ref: 'Player'}],
    injuries: [{type:Schema.Types.ObjectId, ref: 'Player'}],
    games: [{type:Schema.Types.ObjectId, ref: 'Game'}],
    league: {type: Schema.Types.ObjectId, ref: 'League'},
    dateCreated: Date
});


module.exports = mongoose.model('Team', TeamSchema);