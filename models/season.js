<<<<<<< HEAD
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SeasonSchema = new Schema({
    name: String,
    fromDate: Date,
    toDate: Date,
    league: {type:Schema.Types.ObjectId, ref:'League'}
});

module.exports = mongoose.model('Season', SeasonSchema);
=======
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var SeasonSchema = new Schema({
  name: String,
  league: { type: Schema.Types.ObjectId, ref: "League" },
});

module.exports = mongoose.model("Season", SeasonSchema);
>>>>>>> bb75217dafda8e031083d2ca8b8be22b1977700f
