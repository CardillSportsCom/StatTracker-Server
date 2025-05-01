const Player = require("../../models/player");
const League = require("../../models/league");
const Team = require("../../models/team");
const Game = require("../../models/game");
const BasketBallStat = require("../../models/basketballStat");
const mongoose = require("mongoose");
const commonFunctions = require("../util/commonFunctions");
const Boom = require("@hapi/boom");

exports.get = (request, h) => {
	if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
		return { message: "Game not found", player: null };
	}
	return BasketBallStat.find({ game: request.params.id })
		.populate("team")
		.populate("player")
		.exec()
		.then((gameStats) => {
			var GameStats = [];
			var teamIds = gameStats.map((a) => a.team._id).unique();
			for (var j = 0; j < teamIds.length; j++) {
				var playersOnTeam = gameStats.filter((obj) => {
					return obj.team._id == teamIds[j];
				});
				var TeamObj = {
					teamName: gameStats.find((x) => x.team._id == teamIds[j]).team.name,
					playerStats: playersOnTeam,
				};
				GameStats.push(TeamObj);
			}
			var GameStatObj = {
				gameStats: GameStats,
			};
			return GameStatObj;
		})
		.catch((err) => {
			throw Boom.badRequest(err);
		});
};
