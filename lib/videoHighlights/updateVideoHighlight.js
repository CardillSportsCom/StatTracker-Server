const Joi = require("joi");
const VideoHighlightController = require("./videoHighlightController");

module.exports = [
  {
    method: "PUT",
    path: "/videoHighlight/{id}",
    options: {
      handler: VideoHighlightController.update,
      description: "Update Video Highlight",
      notes: "Updates Video Highlight",
      tags: ["api", "videoHighlights"],
      auth: {
        strategy: "jwt",
        scope: ["player", "admin"],
      },
      validate: {
        // TODO (Jason) - Add validation for the payload and params
        // params: Joi.object({
        // id: Joi.string()
        //   .required()
        //   .description("the id of the video highlight"),
        // }),
        // payload: Joi.object({
        // player: Joi.string().description("the id of the player"),
        // details: Joi.string()
        //   .optional()
        //   .description("a text summary describing the video"),
        // }),
      },
    },
  },
];
