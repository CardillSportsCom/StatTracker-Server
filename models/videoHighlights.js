const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var VideoHighlightSchema = new Schema({
  dateCreated: Date,
  storageKey: String,
  player: { type: Schema.Types.ObjectId, ref: "Player" },
  summary: String,
  thumbnailUrl: String,
  likes: [{ type: Schema.Types.ObjectId, ref: "Player" }],
  shotType: String,
});

module.exports = mongoose.model(
  "VideoHighlights",
  VideoHighlightSchema,
  "videoHighlights"
);
