const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var GameDaySummariesSchema = new Schema({
  dateCreated: Date,
  text: String,
});

module.exports = mongoose.model(
  "GameDaySummaries",
  GameDaySummariesSchema,
  "gameDaySummaries"
);
