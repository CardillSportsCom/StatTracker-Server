const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var LeagueSchema = new Schema({
    name: String,
    dateCreated: Date,
    type: {type:String, ref:'LeagueType'},

});

module.exports = mongoose.model('League', LeagueSchema);