const BasketballStat = require("../../models/basketballStat");
const Team = require("../../models/team");
const TeamType = require("../../models/teamType");
const Game = require("../../models/game");
const League = require("../../models/league");
const Season = require("../../models/season");
const Player = require("../../models/player");
const Log = require("../../models/log");
const Boom = require("@hapi/boom");

const mongoose = require("mongoose");
const moment = require("moment");

exports.create = async (request, h) => {
	try {
		const DataLog = new Log({
			dateCreated: Date.now(),
			type: "Data Trace",
			data: request.payload,
		});
		const logResponse = await Log.create(DataLog);

		if (!mongoose.Types.ObjectId.isValid(request.payload.leagueId)) {
			throw Boom.notFound("problem creating game due to invalid leagueId");
		}
		if (!mongoose.Types.ObjectId.isValid(request.payload.seasonId)) {
			throw Boom.notFound("problem creating game due to invalid seasonId");
		}
		const league = await League.findById(request.payload.leagueId);
		if (league == null) {
			throw Boom.notFound("problem creating game due to league not found");
		}
		const season = await Season.findById(request.payload.seasonId);
		if (season == null) {
			throw Boom.notFound("problem creating game due to season not found");
		}
		const teamType = await TeamType.findById(request.payload.teamTypeId);
		var teamAPlayers = request.payload.teamA.players.map((y) => y.playerId);
		var teamBPlayers = request.payload.teamB.players.map((y) => y.playerId);
		var teamASubstitutes = [];
		var teamBSubstitutes = [];
		var teamAInjuries = [];
		var teamBInjuries = [];

		if (request.payload.teamASubstitutes != null) {
			teamASubstitutes = request.payload.teamA.substitutes.map((y) => y.playerId);
		}
		if (request.payload.teamBSubstitutes != null) {
			teamBSubstitutes = request.payload.teamB.substitutes.map((y) => y.playerId);
		}
		if (request.payload.teamAInjuries != null) {
			teamAInjuries = request.payload.teamA.substitutes.map((y) => y.playerId);
		}
		if (request.payload.teamBInjuries != null) {
			teamBInjuries = request.payload.teamB.substitutes.map((y) => y.playerId);
		}

		var teamAWin = false;
		var teamBWin = false;
		if (parseFloat(request.payload.teamAScore) > parseFloat(request.payload.teamBScore)) {
			teamAWin = true;
		} else {
			teamBWin = true;
		}

		let teamAObj = {};
		let teamBObj = {};

		const existingTeamA = await Team.findOne({
			name: request.payload.teamA.name,
			players: teamAPlayers,
			substitutes: teamASubstitutes,
		});
		const existingTeamB = await Team.findOne({
			name: request.payload.teamB.name,
			players: teamBPlayers,
			substitutes: teamBSubstitutes,
		});

		if (existingTeamA != null) {
			teamAObj = existingTeamA;
		} else {
			const teamA = new Team({
				name: request.payload.teamA.name,
				league: league,
				players: teamAPlayers,
				substitutes: teamASubstitutes,
				injuries: teamAInjuries,
				dateCreated: Date.now(),
			});
			teamAObj = await Team.create(teamA);
		}
		if (existingTeamB != null) {
			teamBObj = existingTeamB;
		} else {
			const teamB = new Team({
				name: request.payload.teamB.name,
				league: league,
				substitutes: teamBSubstitutes,
				injuries: teamBInjuries,
				players: teamBPlayers,
				dateCreated: Date.now(),
			});
			teamBObj = await Team.create(teamB);
		}

		const newGame = new Game({
			teamA: teamAObj,
			teamB: teamBObj,
			type: teamType,
			league: league,
			season: season,
			teamAScore: request.payload.teamAScore,
			teamBScore: request.payload.teamBScore,
			dateCreated: Date.now(),
		});
		const newGameObj = await Game.create(newGame);

		for (var i = 0, len = teamAObj.players.length; i < len; i++) {
			var currentPlayerId = teamAObj.players[i];
			var currentPlayer = request.payload.teamA.players.filter(
				(item) => item.playerId == currentPlayerId
			)[0];
			const newBBallStat = new BasketballStat({
				player: currentPlayerId,
				team: teamAObj,
				game: newGameObj,
				league: league,
				FGM: currentPlayer.fgm,
				FGA: currentPlayer.fga,
				threePointersMade: currentPlayer.threePointersMade,
				threePointersAttempted: currentPlayer.threePointersAttempted,
				rebounds: currentPlayer.rebounds,
				assists: currentPlayer.assists,
				steals: currentPlayer.steals,
				blocks: currentPlayer.blocks,
				stealsAgainst: currentPlayer.stealsAgainst,
				blocksAgainst: currentPlayer.blocksAgainst,
				turnovers: currentPlayer.turnovers,
				isWin: teamAWin,
				pointsScored: currentPlayer.pointsScored,
				FTM: currentPlayer.ftm,
				FTA: currentPlayer.fta,
				fouls: currentPlayer.fouls,
				dateCreated: Date.now(),
			});

			BasketballStat.create(newBBallStat);
		}
		for (var i = 0, len = teamBObj.players.length; i < len; i++) {
			var currentPlayerId = teamBObj.players[i];
			var currentPlayer = request.payload.teamB.players.filter(
				(item) => item.playerId == currentPlayerId
			)[0];
			const newBBallStat = new BasketballStat({
				player: currentPlayerId,
				team: teamBObj,
				game: newGameObj,
				league: league,
				FGM: currentPlayer.fgm,
				FGA: currentPlayer.fga,
				threePointersMade: currentPlayer.threePointersMade,
				threePointersAttempted: currentPlayer.threePointersAttempted,
				rebounds: currentPlayer.rebounds,
				assists: currentPlayer.assists,
				steals: currentPlayer.steals,
				blocks: currentPlayer.blocks,
				stealsAgainst: currentPlayer.stealsAgainst,
				blocksAgainst: currentPlayer.blocksAgainst,
				turnovers: currentPlayer.turnovers,
				isWin: teamBWin,
				pointsScored: currentPlayer.pointsScored,
				FTM: currentPlayer.ftm,
				FTA: currentPlayer.fta,
				fouls: currentPlayer.fouls,
				dateCreated: Date.now(),
			});

			BasketballStat.create(newBBallStat);
		}
		return { message: "POST Stat endpoint reached" };
	} catch (err) {
		console.error("Error creating game: ", err);
		throw Boom.badRequest(err);
	}
};
