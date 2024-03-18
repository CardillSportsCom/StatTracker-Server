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
  const summary = JSON.parse(request.payload).summary;
  const thumbnailUrl = JSON.parse(request.payload).thumbnailUrl;
  const shotType = JSON.parse(request.payload).shotType;

  // find the video highlight by id and update the player property to be an ObjectId of the player
  return VideoHighlights.findOneAndUpdate(
    { _id: videoHighlightId },
    {
      $set: {
        summary,
        thumbnailUrl,
        player: new mongoose.Types.ObjectId(playerId),
        shotType,
      },
    },
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

exports.updateLikes = (request, h) => {
  // log the request payload and params
  const videoHighlightId = request.params.id;
  const playerId = JSON.parse(request.payload).player;
  const toggleLike = JSON.parse(request.payload).toggleLike;
  const playerIdObj = new mongoose.Types.ObjectId(playerId);

  // if toggleLike is true, add the player to the likes array
  // if toggleLike is false, remove the player from the likes array
  return VideoHighlights.findById(videoHighlightId)
    .exec()
    .then((videoHighlight) => {
      if (!videoHighlight) {
        throw Boom.notFound("Video Highlight not found");
      }

      // if likes array does not exist, initialize it
      if (!videoHighlight.likes) {
        videoHighlight.likes = [];
      }

      if (toggleLike) {
        // if the player is not already in the likes array, add them
        if (videoHighlight.likes.indexOf(playerIdObj) === -1) {
          videoHighlight.likes.push(playerIdObj);
        }
      } else {
        // if the player is in the likes array, remove them
        if (videoHighlight.likes.indexOf(playerIdObj) !== -1) {
          videoHighlight.likes.pull(playerIdObj);
        }
      }

      videoHighlight.save();
      return videoHighlight;
    })
    .catch((err) => {
      throw Boom.badRequest(err);
    });
};
