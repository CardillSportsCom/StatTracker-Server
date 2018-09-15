const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TeamSchema = new Schema({
    name: String,
    players: [{type:Schema.Types.ObjectId, ref: 'Player'}],
    substitutes: [{type:Schema.Types.ObjectId, ref: 'Player'}],
    injuries: [Number],
    games: [{type:Schema.Types.ObjectId, ref: 'Game'}],
    dateCreated: Date
});


module.exports = mongoose.model('Team', TeamSchema);