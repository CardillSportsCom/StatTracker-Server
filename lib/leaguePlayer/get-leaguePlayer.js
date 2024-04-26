const Joi = require("joi");
const LeaguePlayerController = require("./leaguePlayer");

module.exports = [
	{
		method: "GET",
		path: "/league/{leagueId}/player/{playerId}",
		options: {
			handler: LeaguePlayerController.getLeaguePlayer,
			description: "Get league player",
			notes: "Returns player type in league",
			tags: ["api", "leaguePlayer"],
			auth: {
				strategy: "jwt",
				scope: ["player", "admin"],
			},
			validate: {
				params: Joi.object({
					leagueId: Joi.string().required().description("the league ID"),
					playerId: Joi.string().required().description("the player ID"),
				}),
			},
		},
	},
];
