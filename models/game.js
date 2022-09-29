const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var GameSchema = new Schema({
<<<<<<< HEAD
    teamA: {type: Schema.Types.ObjectId, ref: 'Team'},
    teamB: {type: Schema.Types.ObjectId, ref: 'Team'},
    teamAScore: String,
    teamBScore: String,
    type: {type:String, ref:'TeamType'},
    league: {type: Schema.Types.ObjectId, ref: 'League'},
    season: {type: Schema.Types.ObjectId, ref: 'Season'},
    isOvertime: Boolean,
    gameDuration: Number,
    dateCreated: Date
=======
  teamA: { type: Schema.Types.ObjectId, ref: "Team" },
  teamB: { type: Schema.Types.ObjectId, ref: "Team" },
  teamAScore: String,
  teamBScore: String,
  type: { type: String, ref: "TeamType" },
  league: { type: Schema.Types.ObjectId, ref: "League" },
  season: { type: Schema.Types.ObjectId, ref: "Season" },
  isOvertime: Boolean,
  gameDuration: Number,
  dateCreated: Date,
>>>>>>> bb75217dafda8e031083d2ca8b8be22b1977700f
});

module.exports = mongoose.model("Game", GameSchema);
