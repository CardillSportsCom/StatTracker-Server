const League = require("../../models/league");
const Player = require("../../models/player");
const LeaguePlayer = require("../../models/leaguePlayer");
const LeagueType = require("../../models/leagueType");
const PlayerType = require("../../models/playerType");
const Season = require("../../models/season");
const mongoose = require("mongoose");
const Boom = require("@hapi/boom");

exports.create = (request, h) => {
	return LeagueType.findById(request.payload.type)
		.exec()
		.then((type) => {
			const leagueObj = new League({
				name: request.payload.name,
				dateCreated: Date.now(),
				type: type,
				hasThreePoints:
					request.payload.hasThreePoints == null ? false : request.payload.hasThreePoints,
				threePointValue:
					request.payload.threePointValue == null ? 2 : request.payload.threePointValue,
				twoPointValue: request.payload.twoPointValue == null ? 1 : request.payload.twoPointValue,
			});
			return League.create(leagueObj)
				.then((newLeague) => {
					return Player.findById(request.payload.playerId)
						.exec()
						.then((player) => {
							return PlayerType.findById("5c2687215b39f81fb8a49631")
								.exec()
								.then((playerType) => {
									const leaguePlayerObj = new LeaguePlayer({
										league: newLeague,
										player: player,
										playerType: playerType,
										dateCreated: Date.now(),
									});
									return LeaguePlayer.create(leaguePlayerObj)
										.then((newleaguePlayerObj) => {
											const fromYear = new Date("2024-03-06").getFullYear();
											const toYear = new Date("2025-03-06").getFullYear();
											var name = "Season";
											if (fromYear == toYear) {
												name = fromYear + " Season";
											} else {
												name = fromYear + "-" + toYear + " Season";
											}
											const seasonObj = new Season({
												league: newLeague,
												fromDate: "2024-03-06",
												toDate: "2024-03-06",
												name: name,
											});
											return Season.create(seasonObj)
												.then((newSeason) => {
													return { message: "League created successfully", newLeague: newLeague };
												})
												.catch((err) => {
													throw Boom.badRequest("User does not exist " + err);
												});
										})
										.catch((err) => {
											throw Boom.badRequest("User does not exist " + err);
										});
								})
								.catch((err) => {
									throw Boom.badRequest("User does not exist " + err);
								});
						})
						.catch((err) => {
							throw Boom.badRequest("User does not exist " + err);
						});
				})
				.catch((err) => {
					throw Boom.badRequest("User does not exist " + err);
				});
		})
		.catch((err) => {
			throw Boom.badRequest("User does not exist " + err);
		});
};

exports.get = (request, h) => {
	if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
		return { message: "League not found", league: null };
	}
	return League.findById(request.params.id)
		.exec()
		.then((leagueObj) => {
			return { message: "Got League", league: leagueObj };
		})
		.catch((err) => {
			throw Boom.badRequest(err);
		});
};

exports.list = (request, h) => {
	return League.find()
		.exec()
		.then((leagues) => {
			return { message: "Got Leagues", leagues: leagues };
		})
		.catch((err) => {
			throw Boom.badRequest(err);
		});
};

exports.update = (request, h) => {
	if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
		return { message: "League not found", league: null };
	}
	return League.findById(request.params.id)
		.exec()
		.then((leagueObj) => {
			if (leagueObj == null) {
				return { message: "League not found", league: null };
			}
			leagueObj.name = request.payload.name;
			leagueObj.save();
			return { message: "Updated League" };
		})
		.catch((err) => {
			throw Boom.badRequest(err);
		});
};

exports.delete = (request, h) => {
	if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
		return { message: "League not found", league: null };
	}
	return League.findById(request.params.id)
		.deleteOne()
		.exec()
		.then((data) => {
			return { message: "Deleted League" };
		})
		.catch((err) => {
			throw Boom.badRequest(err);
		});
};
exports.addplayer = (request, h) => {
	if (!mongoose.Types.ObjectId.isValid(request.params.leagueId)) {
		return { message: "League not found" };
	}
	if (!mongoose.Types.ObjectId.isValid(request.payload.playerId)) {
		return { message: "Player not found" };
	}
	return League.findById(request.params.leagueId)
		.then((league) => {
			league.players.push(request.payload.playerId);
			league.save();
			return { message: "added player to league" };
		})
		.catch((err) => {
			throw Boom.badRequest(err);
		});
};

exports.removePlayer = (request, h) => {
	if (!mongoose.Types.ObjectId.isValid(request.params.leagueId)) {
		return { message: "League not found" };
	}
	if (!mongoose.Types.ObjectId.isValid(request.payload.playerId)) {
		return { message: "Player not found" };
	}
	return League.findById(request.params.leagueId)
		.then((league) => {
			for (var i = league.players.length - 1; i >= 0; i--) {
				if (league.players[i] == request.payload.playerId) {
					league.players.splice(i, 1);
				}
			}
			league.save();
			return { message: "delete player to league" };
		})
		.catch((err) => {
			throw Boom.badRequest(err);
		});
};
