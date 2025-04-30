const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var LeagueSchema = new Schema({
	name: String,
	dateCreated: Date,
	type: { type: String, ref: "LeagueType" },
	hasThreePoints: Boolean,
	threePointValue: Number,
	twoPointValue: Number,
	hasFouls: Boolean,
});

module.exports = mongoose.model("League", LeagueSchema);
