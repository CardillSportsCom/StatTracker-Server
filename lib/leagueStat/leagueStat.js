"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BasketballStat = require("../../models/basketballStat");
var Boom = require("boom");
var mongoose = require("mongoose");
exports.get = function (request, h) {
    var fromDate = new Date();
    var toDate = new Date();
    var perGame = 10;
    if (!mongoose.Types.ObjectId.isValid(request.params.leagueId)) {
        return { message: "League not found", league: null };
    }
    if (request.params.fromDate != null) {
        fromDate = request.params.fromDate;
    }
    if (request.params.toDate != null) {
        toDate = request.params.toDate;
    }
    if (request.params.perGame) {
        perGame = request.params.perGame;
    }
    var season = request.query.season;
    return BasketballStat.find({ league: request.params.leagueId })
        .populate("game")
        .populate("player")
        .exec()
        .then(function (gameStats) {
        var playerStats = [];
        var leaguePlayers = uniqueArray(gameStats.map(function (a) { return a.player._id; }));
        for (var j = 0; j < leaguePlayers.length; j++) {
            var playerGameStats = gameStats.filter(function (obj) {
                return obj.player._id == leaguePlayers[j];
            });
            var playerTotalStats = calculateTotalStats(playerGameStats);
            var playerAverageStats = calculateAverageStats(playerGameStats);
            var playerStatsData = {
                player: playerGameStats[0].player,
                playerTotalStats: playerTotalStats, // career total stats
                playerAverageStats: playerAverageStats, // career average stats
            };
            if (season) {
                var playerTotalStatsSeason = calculateTotalStats(playerGameStats.filter(function (obj) {
                    return obj.game.season == season;
                }));
                var playerAverageStatsSeason = calculateAverageStats(playerGameStats.filter(function (obj) {
                    return obj.game.season == season;
                }));
                playerStatsData.playerTotalStatsSeason = playerTotalStatsSeason;
                playerStatsData.playerAverageStatsSeason = playerAverageStatsSeason;
            }
            playerStats.push(playerStatsData);
        }
        return {
            leagueStats: playerStats,
        };
    })
        .catch(function (err) {
        throw Boom.badRequest(err);
    });
};
function calculateAvgStat(dailyStats, stat) {
    var totalStat = 0;
    var numDays = 0;
    for (var date in dailyStats) {
        totalStat += dailyStats[date][stat];
        numDays++;
    }
    var avgStat = 0;
    if (numDays > 0) {
        avgStat = totalStat / numDays;
    }
    return avgStat;
}
function calculateDailyStats(statsByDate) {
    var dailyStats = {};
    for (var _i = 0, _a = Object.entries(statsByDate); _i < _a.length; _i++) {
        var _b = _a[_i], date = _b[0], gameStats = _b[1];
        var totals = {
            FGM: 0,
            FGA: 0,
            rebounds: 0,
            blocks: 0,
            threePointersMade: 0,
            threePointersAttempted: 0,
            assists: 0,
            steals: 0,
            turnovers: 0,
        };
        for (var _c = 0, gameStats_1 = gameStats; _c < gameStats_1.length; _c++) {
            var stat = gameStats_1[_c];
            totals.FGM += stat.FGM;
            totals.FGA += stat.FGA;
            totals.rebounds += stat.rebounds;
            totals.blocks += stat.blocks;
            totals.threePointersMade += stat.threePointersMade;
            totals.threePointersAttempted += stat.threePointersAttempted;
            totals.assists += stat.assists;
            totals.steals += stat.steals;
            totals.turnovers += stat.turnovers;
        }
        dailyStats[date] = totals;
    }
    return dailyStats;
}
function calculateAverageStats(playerGameStats) {
    var playerGameStatsGroupByDate = playerGameStats.reduce(function (acc, doc) {
        var date = doc.dateCreated.toISOString().split("T")[0];
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(doc);
        return acc;
    }, {});
    var dailyStats = calculateDailyStats(playerGameStatsGroupByDate);
    return {
        FGM: calculateAvgStat(dailyStats, "FGM"),
        FGA: calculateAvgStat(dailyStats, "FGA"),
        threePointersMade: calculateAvgStat(dailyStats, "threePointersMade"),
        threePointersAttempted: calculateAvgStat(dailyStats, "threePointersAttempted"),
        rebounds: calculateAvgStat(dailyStats, "rebounds"),
        assists: calculateAvgStat(dailyStats, "assists"),
        steals: calculateAvgStat(dailyStats, "steals"),
        blocks: calculateAvgStat(dailyStats, "blocks"),
        turnovers: calculateAvgStat(dailyStats, "turnovers"),
    };
}
function calculateTotalStats(playerGameStats) {
    return {
        FGM: sum(playerGameStats.map(function (obj) { return obj.FGM; })),
        FGA: sum(playerGameStats.map(function (obj) { return obj.FGA; })),
        threePointersMade: sum(playerGameStats.map(function (obj) { return obj.threePointersMade; })),
        threePointersAttempted: sum(playerGameStats.map(function (obj) { return obj.threePointersAttempted; })),
        rebounds: sum(playerGameStats.map(function (obj) { return obj.rebounds; })),
        assists: sum(playerGameStats.map(function (obj) { return obj.assists; })),
        steals: sum(playerGameStats.map(function (obj) { return obj.steals; })),
        blocks: sum(playerGameStats.map(function (obj) { return obj.blocks; })),
        turnovers: sum(playerGameStats.map(function (obj) { return obj.turnovers; })),
        gamesPlayed: playerGameStats.length,
        gamesWon: playerGameStats.filter(function (obj) {
            return obj.isWin == true;
        }).length,
    };
}
function uniqueArray(a) {
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
    var unique = a.filter(onlyUnique);
    return unique;
}
function sum(arr) {
    return arr.reduce(function (a, b) { return a + b; }, 0);
}
