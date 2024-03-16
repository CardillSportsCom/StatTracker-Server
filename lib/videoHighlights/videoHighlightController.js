const Boom = require("@hapi/boom");
const mongoose = require("mongoose");
const VideoHighlights = require("../../models/videoHighlights");

exports.get = (request, h) => {
  return VideoHighlights.find({})
    .populate("player")
    .exec()
    .then((videoHighlights) => {
      var videoHighlightsObj = {
        videoHighlights,
      };
      return videoHighlightsObj;
    })
    .catch((err) => {
      throw Boom.badRequest(err);
    });
};

exports.update = (request, h) => {
  // log the request payload and params
  const videoHighlightId = request.params.id;
  const playerId = JSON.parse(request.payload).player;

  // find the video highlight by id and update the player property to be an ObjectId of the player
  return VideoHighlights.findOneAndUpdate(
    { _id: videoHighlightId },
    { $set: { player: new mongoose.Types.ObjectId(playerId) } },
    { returnNewDocument: true }
  )
    .exec()
    .then((videoHighlight) => {
      if (!videoHighlight) {
        throw Boom.notFound("Video Highlight not found");
      }
      return videoHighlight;
    })
    .catch((err) => {
      throw Boom.badRequest(err);
    });
};
