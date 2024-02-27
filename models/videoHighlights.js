const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var VideoHighlightSchema = new Schema({
  dateCreated: Date,
  storageKey: String,
});

module.exports = mongoose.model(
  "VideoHighlights",
  VideoHighlightSchema,
  "videoHighlights"
);
