const Joi = require("joi");
const LeaguePlayerController = require("./leaguePlayer");

module.exports = [
	{
		method: "PUT",
		path: "/league/{leagueId}/player/{playerId}",
		options: {
			handler: LeaguePlayerController.updateLeaguePlayer,
			description: "Updates league player",
			notes: "Updates league player",
			tags: ["api", "leaguePlayer"],
			auth: {
				strategy: "jwt",
				scope: ["admin"],
			},
			validate: {
				payload: Joi.object({
					isAdmin: Joi.boolean().required().description("admin status"),
				}),
				params: Joi.object({
					leagueId: Joi.string().required().description("the league ID"),
					playerId: Joi.string().required().description("the player ID"),
				}),
			},
		},
	},
];
