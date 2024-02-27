const Boom = require("@hapi/boom");
const mongoose = require("mongoose");
const VideoHighlights = require("../../models/videoHighlights");

exports.get = (request, h) => {
  return VideoHighlights.find({})
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
