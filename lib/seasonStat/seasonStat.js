const BasketballStat = require("../../models/basketballStat");
const Boom = require("@hapi/boom");
const mongoose = require("mongoose");
const league = require("../../models/league");

exports.get = (request, h) => {
	if (!mongoose.Types.ObjectId.isValid(request.params.leagueId)) {
		return { message: "League not found", league: null };
	}
	return league
		.findById(request.params.leagueId)
		.exec()
		.then((league) => {
			return BasketballStat.find({ league: request.params.leagueId })
				.populate("player")
				.populate("game")
				.exec()
				.then((leagueStats) => {
					var seasonStats = [];
					const perGame = 10;

					// Get all player ids for players in this league
					var leaguePlayers = leagueStats.map((a) => a.player._id).unique();

					for (var j = 0; j < leaguePlayers.length; j++) {
						// Only consider stats for this given player for the specified season
						var playerStats = leagueStats.filter((obj) => {
							return (
								obj.player._id == leaguePlayers[j] && obj.game.season == request.params.seasonId
							);
						});

						// If this player has no stats for the specfied season then we should skip over them
						if (playerStats.length === 0) {
							continue;
						}

						var playerTotalStats = {
							FGM: playerStats.sum("FGM"),
							FGA: playerStats.sum("FGA"),
							threePointersMade: playerStats.sum("threePointersMade"),
							threePointersAttempted: playerStats.sum("threePointersAttempted"),
							points: league.hasThreePoints
								? playerStats.sum("threePointersMade") * league.twoPointValue +
								  (playerStats.sum(FGM) - playerStats.sum("threePointersMade")) *
										league.twoPointValue
								: playerStats.sum(FGM) * league.twoPointValue,
							rebounds: playerStats.sum("rebounds"),
							assists: playerStats.sum("assists"),
							steals: playerStats.sum("steals"),
							blocks: playerStats.sum("blocks"),
							turnovers: playerStats.sum("turnovers"),
							gamesPlayed: playerStats.length,
							gamesWon: playerStats.filter((obj) => {
								return obj.isWin == true;
							}).length,
						};

						var playerAverageStats = {
							FGM: ((perGame * playerStats.sum("FGM")) / playerStats.length).toFixed(2),
							FGA: ((perGame * playerStats.sum("FGA")) / playerStats.length).toFixed(2),
							threePointersMade: (
								(perGame * playerStats.sum("threePointersMade")) /
								playerStats.length
							).toFixed(2),
							threePointersAttempted: (
								(perGame * playerStats.sum("threePointersAttempted")) /
								playerStats.length
							).toFixed(2),
							rebounds: ((perGame * playerStats.sum("rebounds")) / playerStats.length).toFixed(2),
							assists: ((perGame * playerStats.sum("assists")) / playerStats.length).toFixed(2),
							steals: ((perGame * playerStats.sum("steals")) / playerStats.length).toFixed(2),
							blocks: ((perGame * playerStats.sum("blocks")) / playerStats.length).toFixed(2),
							turnovers: ((perGame * playerStats.sum("turnovers")) / playerStats.length).toFixed(2),
							gamesPlayed: playerStats.length,
							gamesWon: playerStats.filter((obj) => {
								return obj.isWin == true;
							}).length,
						};

						var playerStats = {
							player: playerStats[0].player,
							playerTotalStats: playerTotalStats,
							playerAverageStats: playerAverageStats,
						};

						seasonStats.push(playerStats);
					}
					var seasonStatsObj = {
						seasonStats,
					};
					return seasonStatsObj;
				})
				.catch((err) => {
					throw Boom.badRequest(err);
				});
		})
		.catch((err) => {
			throw Boom.badRequest(err);
		});
};
