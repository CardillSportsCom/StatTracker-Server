const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var LeagueTypeSchema = new Schema({
    name: String,
    isDisplay: Boolean
});

module.exports = mongoose.model('LeagueType', LeagueTypeSchema);