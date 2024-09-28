const Player = require("../../models/player");
const League = require("../../models/league");
const Team = require("../../models/team");
const Game = require("../../models/game");
const BasketBallStat = require("../../models/basketballStat");

const mongoose = require("mongoose");

exports.list = (request, h) => {
	if (!mongoose.Types.ObjectId.isValid(request.params.leagueId)) {
		return { message: "League not found", player: null };
	}
	return Game.find({ league: request.params.leagueId })
		.exec()
		.then((leagueGames) => {
			return { message: "Got games of league", games: leagueGames };
		})
		.catch((err) => {
			throw Boom.badRequest(err);
		});
};

exports.delete = (request, h) => {
	if (!mongoose.Types.ObjectId.isValid(request.params.leagueId)) {
		return { message: "League not found", deleted: false };
	}
	if (!mongoose.Types.ObjectId.isValid(request.params.gameId)) {
		return { message: "Game not found", deleted: false };
	}

	return Game.findOneAndDelete({ league: request.params.leagueId, _id: request.params.gameId })
		.exec()
		.then((game) => {
			if (game == null) {
				return { message: "Game not found", deleted: false };
			} else {
				return BasketBallStat.deleteMany({
					league: request.params.leagueId,
					game: request.params.gameId,
				})
					.exec()
					.then((_) => {
						return { message: "Game deleted", deleted: true };
					});
			}
		})
		.catch((err) => {
			throw Boom.badRequest(err);
		});
};
