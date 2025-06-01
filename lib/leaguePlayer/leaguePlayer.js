const League = require("../../models/league");
const Player = require("../../models/player");
const LeaguePlayer = require("../../models/leaguePlayer");
const PlayerType = require("../../models/playerType");
const mongoose = require("mongoose");
const Boom = require("@hapi/boom");

exports.create = (request, h) => {
	return LeaguePlayer.findOne({
		player: request.payload.playerId,
		league: request.payload.leagueId,
	})
		.exec()
		.then((existingLeaguePlayer) => {
			if (existingLeaguePlayer != null) {
				return { message: "League player already exists", newLeaguePlayer: existingLeaguePlayer };
			} else {
				return League.findById(request.payload.leagueId)
					.exec()
					.then((league) => {
						return Player.findById(request.payload.playerId)
							.exec()
							.then((player) => {
								const leaguePlayerObj = new LeaguePlayer({
									player: player,
									league: league,
									dateCreated: Date.now(),
									playerType: new mongoose.Types.ObjectId("5c2687005b39f81fb8a4962f"),
								});
								return LeaguePlayer.create(leaguePlayerObj)
									.then((newLeaguePlayer) => {
										return {
											message: "Player added to league successfully",
											newLeaguePlayer: newLeaguePlayer,
										};
									})
									.catch((err) => {
										throw Boom.badRequest(err);
									});
							})
							.catch((err) => {
								throw Boom.badRequest(err);
							});
					})
					.catch((err) => {
						throw Boom.badRequest(err);
					});
			}
		})
		.catch((err) => {
			throw Boom.badRequest(err);
		});
};

exports.getPlayers = (request, h) => {
	return LeaguePlayer.find({ league: request.params.leagueId })
		.populate("player")
		.populate("playerType")
		.exec()
		.then((leaguePlayers) => {
			return {
				message: "Got players of league",
				players: leaguePlayers.sort(function (a, b) {
					if (a.player.firstName < b.player.firstName) {
						return -1;
					}
					if (a.player.firstName > b.player.firstName) {
						return 1;
					}
					return 0;
				}),
			};
		})
		.catch((err) => {
			throw Boom.badRequest(err);
		});
};

exports.getLeagues = (request, h) => {
	return LeaguePlayer.find({ player: request.params.playerId }, { league: 1 })
		.populate("league")
		.populate("playerType")
		.exec()
		.then((leaguePlayers) => {
			return { message: "Got leagues of player", leagues: leaguePlayers };
		})
		.catch((err) => {
			throw Boom.badRequest(err);
		});
};

exports.delete = (request, h) => {
	return LeaguePlayer.findById(request.payload.leaguePlayerId)
		.deleteOne()
		.exec()
		.then((data) => {
			return { message: "Removed player from league" };
		})
		.catch((err) => {
			throw Boom.badRequest(err);
		});
};

exports.getLeaguePlayer = (request, h) => {
	if (!mongoose.Types.ObjectId.isValid(request.params.playerId)) {
		return { message: "Player not found", leaguePlayer: null };
	}
	if (!mongoose.Types.ObjectId.isValid(request.params.leagueId)) {
		return { message: "League not found", leaguePlayer: null };
	}
	return LeaguePlayer.findOne({ player: request.params.playerId, league: request.params.leagueId })
		.populate("playerType")
		.exec()
		.then((leaguePlayer) => {
			if (leaguePlayer == null) {
				return { message: "LeaguePlayer not found", leaguePlayer: null };
			} else {
				return { message: "LeaguePlayer found", leaguePlayer: leaguePlayer };
			}
		})
		.catch((err) => {
			throw Boom.badRequest(err);
		});
};
exports.updateLeaguePlayer = (request, h) => {
	if (!mongoose.Types.ObjectId.isValid(request.params.playerId)) {
		return { message: "Player not found", leaguePlayer: null };
	}
	if (!mongoose.Types.ObjectId.isValid(request.params.leagueId)) {
		return { message: "League not found", leaguePlayer: null };
	}
	if (request.payload.isAdmin) {
		return PlayerType.findOne({ name: "admin" })
			.then((adminPlayerType) => {
				return LeaguePlayer.findOne({
					player: request.params.playerId,
					league: request.params.leagueId,
				})
					.then((leaguePlayer) => {
						leaguePlayer.playerType = adminPlayerType;
						leaguePlayer.save();
						return { message: "LeaguePlayer updated" };
					})
					.catch((err) => {
						throw Boom.badRequest(err);
					});
			})
			.catch((err) => {
				throw Boom.badRequest(err);
			});
	} else {
		return PlayerType.findOne({ name: "player" })
			.then((playerPlayerType) => {
				return LeaguePlayer.findOne({
					player: request.params.playerId,
					league: request.params.leagueId,
				})
					.then((leaguePlayer) => {
						leaguePlayer.playerType = playerPlayerType;
						leaguePlayer.save();
						return { message: "LeaguePlayer updated" };
					})
					.catch((err) => {
						throw Boom.badRequest(err);
					});
			})
			.catch((err) => {
				throw Boom.badRequest(err);
			});
	}
};
