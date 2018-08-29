const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TeamSchema = new Schema({
    name: String,
    players: [{type:Schema.Types.ObjectId, ref: 'Player'}],
    league: {type:String, ref:'League'},
    games: [{type:Schema.Types.ObjectId, ref: 'Game'}],
    dateCreated: Date
}, { toJSON: { virtuals: true } });

TeamSchema.virtual('teamAGames',{
    ref: 'Game',
    localField: '_id',
    foreignField: 'teamA',
    justOne:false
})
TeamSchema.virtual('teamBGames',{
    ref: 'Game',
    localField: '_id',
    foreignField: 'teamB',
    justOne:false
})

module.exports = mongoose.model('Team', TeamSchema);