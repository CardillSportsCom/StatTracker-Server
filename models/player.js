const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var PlayerSchema = new Schema(
	{
		firstName: String,
		lastName: String,
		dateCreated: Date,
		imageUri: String,
		email: { type: String, required: true, index: { unique: true } },
		password: String,
		teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
		isAdmin: Boolean,
		accountType: { type: Schema.Types.ObjectId, ref: "AccountType" },
	},
	{ toJSON: { virtuals: true } }
);

PlayerSchema.virtual("teamPlayers", {
	ref: "Team",
	localField: "_id",
	foreignField: "players",
	justOne: false,
});

module.exports = mongoose.model("Player", PlayerSchema);
