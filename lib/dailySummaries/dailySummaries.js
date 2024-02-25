"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config({ path: "../../.env" });
var BasketballStat = require("../../models/basketballStat");
var GameDaySummaries = require("../../models/gameDaySummaries");
var Game = require("../../models/game");
var Team = require("../../models/team");
var Player = require("../../models/player");
var Boom = require("boom");
var db = require("../../src/database").db;
var mongoose = require("mongoose");
var Anthropic = require("@anthropic-ai/sdk");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var league, seasonId, dateString, stats;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                league = "5ac6aaefe8da8276a88ffc07";
                seasonId = "6508ef50061812df5aaf0b76";
                dateString = "2/20/2024";
                return [4 /*yield*/, BasketballStat.find({ league: league })
                        .sort("-dateCreated")
                        .populate("player")
                        .populate("team")
                        .populate("game")
                        .exec()
                        .then(function (basketballStats) { return __awaiter(void 0, void 0, void 0, function () {
                        var seasonStats, games, leagueGamesPlayedThisGameDay, gameDateLeagueStats, GameDayTotalStats, leaguePlayers, m, playerStats, playerTotalStats, gameDay, parts, start, end, generatedSummary, summary;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    seasonStats = basketballStats.filter(function (obj) { return obj.game.season == seasonId; });
                                    games = Array.from(new Set(seasonStats.map(function (a) { return a.game; })));
                                    leagueGamesPlayedThisGameDay = games.filter(function (obj) {
                                        return obj.dateCreated.toLocaleDateString() == dateString;
                                    });
                                    gameDateLeagueStats = seasonStats.filter(function (obj) {
                                        return obj.dateCreated.toLocaleDateString() == dateString;
                                    });
                                    GameDayTotalStats = [];
                                    leaguePlayers = Array.from(new Set(gameDateLeagueStats.map(function (a) { return a.player._id; })));
                                    for (m = 0; m < leaguePlayers.length; m++) {
                                        playerStats = gameDateLeagueStats.filter(function (obj) {
                                            return obj.player._id == leaguePlayers[m];
                                        });
                                        playerTotalStats = {
                                            player: playerStats[0].player,
                                            playerTotalStats: {
                                                FGM: playerStats.reduce(function (accumulator, currentPlayerStat) {
                                                    return accumulator + currentPlayerStat.FGM;
                                                }, 0),
                                                FGA: playerStats.reduce(function (accumulator, currentPlayerStat) {
                                                    return accumulator + currentPlayerStat.FGA;
                                                }, 0),
                                                threePointersMade: playerStats.reduce(function (accumulator, currentPlayerStat) {
                                                    return accumulator + currentPlayerStat.threePointersMade;
                                                }, 0),
                                                threePointersAttempted: playerStats.reduce(function (accumulator, currentPlayerStat) {
                                                    return accumulator + currentPlayerStat.threePointersAttempted;
                                                }, 0),
                                                rebounds: playerStats.reduce(function (accumulator, currentPlayerStat) {
                                                    return accumulator + currentPlayerStat.rebounds;
                                                }, 0),
                                                assists: playerStats.reduce(function (accumulator, currentPlayerStat) {
                                                    return accumulator + currentPlayerStat.assists;
                                                }, 0),
                                                steals: playerStats.reduce(function (accumulator, currentPlayerStat) {
                                                    return accumulator + currentPlayerStat.steals;
                                                }, 0),
                                                blocks: playerStats.reduce(function (accumulator, currentPlayerStat) {
                                                    return accumulator + currentPlayerStat.blocks;
                                                }, 0),
                                                turnovers: playerStats.reduce(function (accumulator, currentPlayerStat) {
                                                    return accumulator + currentPlayerStat.turnovers;
                                                }, 0),
                                                gamesPlayed: playerStats.length,
                                                gamesWon: playerStats.filter(function (obj) {
                                                    return obj.isWin == true;
                                                }).length,
                                            },
                                        };
                                        GameDayTotalStats.push(playerTotalStats);
                                    }
                                    gameDay = {
                                        gameDate: dateString,
                                        games: leagueGamesPlayedThisGameDay,
                                        gameDayStatTotals: GameDayTotalStats,
                                    };
                                    parts = dateString.split("/");
                                    start = new Date(Number.parseInt(parts[2]), Number.parseInt(parts[0]) - 1, Number.parseInt(parts[1]));
                                    start.setUTCHours(0, 0, 0);
                                    end = new Date(Number.parseInt(parts[2]), Number.parseInt(parts[0]) - 1, Number.parseInt(parts[1]));
                                    end.setUTCHours(23, 59, 59);
                                    return [4 /*yield*/, generateSummary(gameDay)];
                                case 1:
                                    generatedSummary = _a.sent();
                                    return [4 /*yield*/, GameDaySummaries.findOneAndUpdate({
                                            dateCreated: {
                                                $gte: start,
                                                $lt: end,
                                            },
                                        }, {
                                            dateCreated: start,
                                            text: generatedSummary,
                                        }, {
                                            upsert: true,
                                            new: true,
                                        }).exec()];
                                case 2:
                                    summary = _a.sent();
                                    return [2 /*return*/, {
                                            summary: summary.text,
                                        }];
                            }
                        });
                    }); })
                        .catch(function (err) {
                        console.log(err);
                        throw Boom.badRequest(err);
                    })];
            case 1:
                stats = _a.sent();
                return [4 /*yield*/, mongoose.disconnect()];
            case 2:
                _a.sent();
                console.log("Database connection closed.");
                return [2 /*return*/, stats];
        }
    });
}); })();
function generateSummary(gameDay) {
    return __awaiter(this, void 0, void 0, function () {
        var anthropic, response, resultWithScratchpad, scratchpadStart, scratchpadEnd, summary;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    anthropic = new Anthropic({
                        apiKey: process.env["ANTHROPIC_API_KEY"],
                    });
                    return [4 /*yield*/, anthropic.completions.create({
                            model: "claude-2.1",
                            max_tokens_to_sample: 2000,
                            prompt: "".concat(createPrompt(gameDay)),
                        })];
                case 1:
                    response = _a.sent();
                    resultWithScratchpad = response.completion
                        .replace(/<summary>/g, "")
                        .replace(/<\/summary>/g, "");
                    scratchpadStart = resultWithScratchpad.indexOf("<scratchpad>");
                    scratchpadEnd = resultWithScratchpad.indexOf("</scratchpad>");
                    summary = resultWithScratchpad.substring(0, scratchpadStart) +
                        resultWithScratchpad.substring(scratchpadEnd + 13);
                    return [2 /*return*/, summary.trim()];
            }
        });
    });
}
function createPrompt(gameDay) {
    var systemPrompt = "You are sports copywriter that writes articles and summaries about basketball players. \n    You will be given a JSON object representing stats about players from a basketball league. \n    Understand the stats and write content about the players in a fun and engaging tone.\n    \n    When referencing players always refer to them by name and never by their player id.\n    Do not discuss averages, focus on the playerTotalStats object for that player.\n    Do not mention anything about a bench, free throws or shooting three pointers. \n\n    You can consider FGM to mean a player scored a point.\n    You can consider FGA to mean a player attempted a shot.\n\n    Do not mention the league, season, or date in the summary.\n\n    Always check the stats to make sure you are accurately representing the players.\n\n    Take extra care before claiming a player led in a certain category. Always double check that against the other players by looking at the stats data in the <stats> XML tag.\n    \n    If you claim that a player led in a certain category, double check that against the other players by looking at the <scratchpad> Only output the summary in <summary> XML tags.\n    ";
    var humanPrompt = "\n\nHuman: Write a game summary about the players. Highlight players who did notably well. Remain positive but identify areas for improvement. Think step by step before you answer. \n  You can use the following information to write the summary:\n\n    <stats>\n    ".concat(JSON.stringify(gameDay), "\n    </stats>\n  \n  Put the following information in the <scratchpad> XML tags before answering the question:\n    1. Identify the players who had the most FGM (points).\n    2. Identify the players who had the most assists.\n    3. Identify the players who had the most rebounds.\n    4. Identify the players who had the most steals.\n    5. Identify the players who had the most blocks.\n    6. Identify the players who had the most turnovers.\n    7. Identify the players who had the most wins.\n\n  Put that information in <scratchpad> XML tags. \n  All this information is guaranteed to be found in the stats object.\n  I will give you a $200 tip if each time you correctly and accurately identify a player is leading the league in a certain category. You can determine this by looking at the game stats data in the <stats> XML tag.\n\n  Here is an example of a summary:\n    <example>\n        It was an exciting day of basketball with some great performances across the board. Lucksson Nama led the way in rebounds, ripping down 24 boards and also dishing out 7 assists. However, he did have 5 turnovers. Hardip Singh scored a game-high 14 points while also tallying 7 assists, though turnovers were an issue for him as well with 5. \n\n        On the defensive side, Jasinthar Amirthalingam set the tone with a league-leading 5 steals while Bhavan Sri and Lucksson Nama each had a block.\n\n        When it came to winning, Bhavan Sri, Kobi g, Hardip Singh, and Jasinthar Amirthalingam led their teams to 6 victories\n    </example>\n    \n    <example>\n      It was raining swishes and monster layups on the court during an electrifying day of hoops action. Vithusan Vijayapavan led in scoring and rebounding with 22 field goals made and 31 boards. \n    \n      Lucksson Nama was also a force on the boards, ripping down a team-leading 29 rebounds while also dishing out 9 assists. However, he did have 3 turnovers. \n      \n      On the defensive side, Kobi g set the tone with 4 steals. When it came to blocks, Vithusan Vijayapavan, Jason Rajasegaram, and Kobi g each had 1. \n      \n      In terms of areas for improvement, cutting down on turnovers could help several players. Danny Wang led the league with 5 turnovers. \n      \n      When it came to winning, Danny Wang, Joel Anthony, Jonathan Kuminga, and Kizaan Alkins led their teams to 6 victories.\n    </example>\n  \n  ");
    return "\n    ".concat(systemPrompt, "\n    \n    ").concat(humanPrompt, "\n  \n    \n\nAssistant:\n  ");
}
