const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var LeagueSchema = new Schema({
    name : String,
    dateCreated: Date

});

module.exports = mongoose.model('League', LeagueSchema);