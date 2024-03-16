const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var VideoHighlightSchema = new Schema({
  dateCreated: Date,
  storageKey: String,
  player: { type: Schema.Types.ObjectId, ref: "Player" },
  summary: String,
});

module.exports = mongoose.model(
  "VideoHighlights",
  VideoHighlightSchema,
  "videoHighlights"
);
