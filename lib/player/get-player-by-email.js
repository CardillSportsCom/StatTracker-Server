const Joi = require("joi");
const PlayerController = require("./player");

module.exports = [
	{
		method: "GET",
		path: "/player/search/{email}",
		options: {
			handler: PlayerController.getbyemail,
			description: "Gets player by email",
			notes: "Returns the player",
			tags: ["api", "player"],
			auth: {
				strategy: "jwt",
				scope: ["player", "admin"],
			},
			validate: {
				params: Joi.object({
					email: Joi.string().required().description("the player's email"),
				}),
			},
		},
	},
];
