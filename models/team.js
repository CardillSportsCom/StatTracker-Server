const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TeamSchema = new Schema({
    name: String,
    players: [{type:Schema.Types.ObjectId, ref: 'Player'}],
    league: {type:String, ref:'League'},
    games: [{type:Schema.Types.ObjectId, ref: 'Game'}],
    dateCreated: Date
});


module.exports = mongoose.model('Team', TeamSchema);