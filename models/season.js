const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SeasonSchema = new Schema({
    name: String,
    fromDate: Date,
    toDate: Date,
    league: {type:Schema.Types.ObjectId, ref:'League'}
});

module.exports = mongoose.model('Season', SeasonSchema);
