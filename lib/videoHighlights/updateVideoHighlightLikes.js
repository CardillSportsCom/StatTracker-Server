const Joi = require("joi");
const VideoHighlightController = require("./videoHighlightController");

module.exports = [
  {
    method: "PUT",
    path: "/likeVideoHighlight/{id}",
    options: {
      handler: VideoHighlightController.updateLikes,
      description: "Like Video Highlight",
      notes: "Updates the likes for a Video Highlight",
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
