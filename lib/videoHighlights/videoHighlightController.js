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
  return VideoHighlights.findByIdAndUpdate(request.params.id, request.payload, {
    new: true,
  })
    .exec()
    .then((videoHighlight) => {
      return videoHighlight;
    })
    .catch((err) => {
      throw Boom.badRequest(err);
    });
};
