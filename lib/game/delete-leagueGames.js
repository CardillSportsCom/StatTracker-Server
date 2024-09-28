const Joi = require("joi");
const GameController = require("./game");

module.exports = [
	{
		method: "DELETE",
		path: "/leagues/{leagueId}/games/{gameId}",
		options: {
			handler: GameController.delete,
			description: "Delete Game",
			notes: "Deletes Game",
			tags: ["api", "game"],
			auth: {
				strategy: "jwt",
				scope: ["admin"],
			},
			validate: {
				params: Joi.object({
					leagueId: Joi.string().required().description("the league id"),
					gameId: Joi.string().required().description("the game id"),
				}),
			},
		},
	},
];
