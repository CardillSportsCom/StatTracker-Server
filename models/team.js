const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TeamSchema = new Schema({
    name: String,
    players: [{type:String, ref: 'Player'}],
    league: {type:String, ref:'League'},
    dateCreated: Date
});

module.exports = mongoose.model('Team', TeamSchema);