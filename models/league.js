const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");

var LeagueSchema = new Schema({
    name: String,
    dateCreated: Date,
    players: [{ type: Schema.Types.ObjectId, ref: 'Player', childPath:'leagues' }]

});
LeagueSchema.plugin(relationship, {
    relationshipPathName: 'players'
});
module.exports = mongoose.model('League', LeagueSchema);