var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var BasketballStat = require("../../models/basketballStat");
var GameDaySummaries = require("../../models/gameDaySummaries");
var Boom = require("boom");
var mongoose = require("mongoose");
function food() {
    var _this = this;
    var league = "5ac6aaefe8da8276a88ffc07";
    var seasonId = "6508ef50061812df5aaf0b76";
    return BasketballStat.find({ league: league })
        .sort("-dateCreated")
        .populate("game")
        .exec()
        .then(function (basketballStats) { return __awaiter(_this, void 0, void 0, function () {
        var gameDays, seasonStats, gameDates, games, maxlength, j, leagueGamesPlayedThisGameDay, gameDateLeagueStats, GameDayTotalStats, leaguePlayers, m, playerStats, playerTotalStats, gameDay, parts, start, end, gameDaySummary;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    gameDays = [];
                    seasonStats = basketballStats.filter(function (obj) { return obj.game.season == seasonId; });
                    gameDates = seasonStats
                        .map(function (a) { return a.game.dateCreated.toLocaleDateString(); })
                        .unique();
                    games = seasonStats.map(function (a) { return a.game; }).unique();
                    maxlength = gameDates.length;
                    if (maxlength > 15) {
                        maxlength = 15;
                    }
                    j = 0;
                    _a.label = 1;
                case 1:
                    if (!(j < maxlength)) return [3 /*break*/, 4];
                    leagueGamesPlayedThisGameDay = games.filter(function (obj) {
                        return obj.dateCreated.toLocaleDateString() == gameDates[j];
                    });
                    gameDateLeagueStats = seasonStats.filter(function (obj) {
                        return obj.dateCreated.toLocaleDateString() == gameDates[j];
                    });
                    GameDayTotalStats = [];
                    leaguePlayers = gameDateLeagueStats
                        .map(function (a) { return a.player._id; })
                        .unique();
                    for (m = 0; m < leaguePlayers.length; m++) {
                        playerStats = gameDateLeagueStats.filter(function (obj) {
                            return obj.player._id == leaguePlayers[m];
                        });
                        playerTotalStats = {
                            player: playerStats[0].player,
                            playerTotalStats: {
                                FGM: playerStats.sum("FGM"),
                                FGA: playerStats.sum("FGA"),
                                threePointersMade: playerStats.sum("threePointersMade"),
                                threePointersAttempted: playerStats.sum("threePointersAttempted"),
                                rebounds: playerStats.sum("rebounds"),
                                assists: playerStats.sum("assists"),
                                steals: playerStats.sum("steals"),
                                blocks: playerStats.sum("blocks"),
                                turnovers: playerStats.sum("turnovers"),
                                gamesPlayed: playerStats.length,
                                gamesWon: playerStats.filter(function (obj) {
                                    return obj.isWin == true;
                                }).length,
                            },
                        };
                        GameDayTotalStats.push(playerTotalStats);
                    }
                    gameDay = {
                        gameDate: gameDates[j],
                        games: leagueGamesPlayedThisGameDay,
                        gameDayStatTotals: GameDayTotalStats,
                    };
                    parts = gameDates[j].split("/");
                    start = new Date(parts[2], parts[0] - 1, parts[1]);
                    start.setUTCHours(0, 0, 0);
                    end = new Date(parts[2], parts[0] - 1, parts[1]);
                    end.setUTCHours(23, 59, 59);
                    return [4 /*yield*/, GameDaySummaries.findOne({
                            dateCreated: {
                                $gte: start,
                                $lt: end,
                            },
                        })];
                case 2:
                    gameDaySummary = _a.sent();
                    if (gameDaySummary) {
                        gameDay.gameDaySummary = gameDaySummary.text;
                    }
                    gameDays.push(gameDay);
                    _a.label = 3;
                case 3:
                    j++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, {
                        gameDays: gameDays,
                    }];
            }
        });
    }); })
        .catch(function (err) {
        throw Boom.badRequest(err);
    });
}
console.log(food());
