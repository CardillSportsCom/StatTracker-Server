const Joi = require("joi");
const VideoHighlightController = require("./videoHighlightController");

module.exports = [
  {
    method: "GET",
    path: "/videoHighlights",
    options: {
      handler: VideoHighlightController.get,
      description: "Get all video highlights",
      notes: "Returns all video highlights",
      tags: ["api", "videoHighlights"],
      auth: {
        strategy: "jwt",
        scope: ["player", "admin"],
      },
    },
  },
];
