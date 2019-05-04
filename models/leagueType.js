const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var LeagueTypeSchema = new Schema({
    name: String,
    isDisplay: Boolean
});

LeagueTypeSchema.set('collection', 'leagueTypes');


module.exports = mongoose.model('LeagueType', LeagueTypeSchema);