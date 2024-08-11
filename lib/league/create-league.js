const Joi = require("joi");
const LeagueController = require("./league");

module.exports = [
	{
		method: "POST",
		path: "/league",
		options: {
			handler: LeagueController.create,
			description: "Create League",
			notes: "Returns League ID",
			tags: ["api", "league"],
			auth: {
				strategy: "jwt",
				scope: ["player", "admin"],
			},
			validate: {
				payload: Joi.object({
					name: Joi.string().required().description("the name of the league"),
					type: Joi.string().required().description("the id of the league type"),
					playerId: Joi.string().required().description("the league creator's id "),
					hasThreePoints: Joi.boolean().description(" setting for if this league has 3 pointers"),
					threePointValue: Joi.number().description("value of three points"),
					twoPointValue: Joi.number().description("value has two points"),
				}),
			},
		},
	},
];
