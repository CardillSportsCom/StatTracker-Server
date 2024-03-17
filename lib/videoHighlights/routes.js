var GetVideoHighlights = require("./get-videoHighlights");
var UpdateVideoHighlight = require("./updateVideoHighlight");
var UpdateVideoHighlightLikes = require("./updateVideoHighlightLikes");

module.exports = [].concat(
  GetVideoHighlights,
  UpdateVideoHighlight,
  UpdateVideoHighlightLikes
);
