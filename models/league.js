const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var LeagueSchema = new Schema({
    name: String,
    dateCreated: Date,
    players: [{ type: Schema.Types.ObjectId, ref: 'Players' }]

});

module.exports = mongoose.model('League', LeagueSchema);