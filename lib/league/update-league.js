const Joi = require("joi");
const LeagueController = require("./league");

module.exports = [
	{
		method: "PUT",
		path: "/league/{id}",
		options: {
			handler: LeagueController.update,
			description: "Update League",
			notes: "Updates League",
			tags: ["api", "league"],
			auth: {
				strategy: "jwt",
				scope: ["admin"],
			},
			validate: {
				params: Joi.object({
					id: Joi.string().required().description("the id of the league"),
				}),
				payload: Joi.object({
					name: Joi.string().required().description("the name of the league"),
					hasThreePoints: Joi.boolean().description(" setting for if this league has 3 pointers"),
					threePointValue: Joi.number().description("value of three points"),
					twoPointValue: Joi.number().description("value has two points"),
					hasFouls: Joi.boolean().description("setting for fouls and free throws"),
				}),
			},
		},
	},
];
