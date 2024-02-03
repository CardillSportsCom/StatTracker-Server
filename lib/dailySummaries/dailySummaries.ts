require("dotenv").config({ path: "../../.env" });

const BasketballStat = require("../../models/basketballStat");
const GameDaySummaries = require("../../models/gameDaySummaries");
const Game = require("../../models/game");
const Team = require("../../models/team");
const Player = require("../../models/player");

const Boom = require("boom");
const db = require("../../src/database").db;
const mongoose = require("mongoose");
const Anthropic = require("@anthropic-ai/sdk");

type PlayerTotalStats = {
  player: any;
  playerTotalStats: {
    FGM: number;
    FGA: number;
    threePointersMade: number;
    threePointersAttempted: number;
    rebounds: number;
    assists: number;
    steals: number;
    blocks: number;
    turnovers: number;
    gamesPlayed: number;
    gamesWon: number;
  };
};

type GameDay = {
  gameDate: string;
  games: any[];
  gameDayStatTotals: PlayerTotalStats[];
  gameDaySummary?: string;
};

(async () => {
  const league = "5ac6aaefe8da8276a88ffc07";
  const seasonId = "6508ef50061812df5aaf0b76";

  const dateString = "1/23/2024";

  const stats = await BasketballStat.find({ league })
    .sort("-dateCreated")
    .populate("player")
    .populate("team")
    .populate("game")
    .exec()
    .then(async (basketballStats: any) => {
      var seasonStats = basketballStats.filter(
        (obj: any) => obj.game.season == seasonId
      );

      var games: any[] = [...new Set(seasonStats.map((a: any) => a.game))];

      var leagueGamesPlayedThisGameDay = games.filter((obj: any) => {
        return obj.dateCreated.toLocaleDateString() == dateString;
      });
      var gameDateLeagueStats = seasonStats.filter((obj: any) => {
        return obj.dateCreated.toLocaleDateString() == dateString;
      });
      var GameDayTotalStats: PlayerTotalStats[] = [];
      var leaguePlayers = [
        ...new Set<string>(gameDateLeagueStats.map((a: any) => a.player._id)),
      ];

      for (var m = 0; m < leaguePlayers.length; m++) {
        var playerStats = gameDateLeagueStats.filter((obj: any) => {
          return obj.player._id == leaguePlayers[m];
        });

        var playerTotalStats: PlayerTotalStats = {
          player: playerStats[0].player,
          playerTotalStats: {
            FGM: playerStats.reduce(
              (accumulator: number, currentPlayerStat: any) => {
                return accumulator + currentPlayerStat.FGM;
              },
              0
            ),
            FGA: playerStats.reduce(
              (accumulator: number, currentPlayerStat: any) => {
                return accumulator + currentPlayerStat.FGA;
              },
              0
            ),
            threePointersMade: playerStats.reduce(
              (accumulator: number, currentPlayerStat: any) => {
                return accumulator + currentPlayerStat.threePointersMade;
              },
              0
            ),
            threePointersAttempted: playerStats.reduce(
              (accumulator: number, currentPlayerStat: any) => {
                return accumulator + currentPlayerStat.threePointersAttempted;
              },
              0
            ),
            rebounds: playerStats.reduce(
              (accumulator: number, currentPlayerStat: any) => {
                return accumulator + currentPlayerStat.rebounds;
              },
              0
            ),
            assists: playerStats.reduce(
              (accumulator: number, currentPlayerStat: any) => {
                return accumulator + currentPlayerStat.assists;
              },
              0
            ),
            steals: playerStats.reduce(
              (accumulator: number, currentPlayerStat: any) => {
                return accumulator + currentPlayerStat.steals;
              },
              0
            ),
            blocks: playerStats.reduce(
              (accumulator: number, currentPlayerStat: any) => {
                return accumulator + currentPlayerStat.blocks;
              },
              0
            ),
            turnovers: playerStats.reduce(
              (accumulator: number, currentPlayerStat: any) => {
                return accumulator + currentPlayerStat.turnovers;
              },
              0
            ),
            gamesPlayed: playerStats.length,
            gamesWon: playerStats.filter((obj: any) => {
              return obj.isWin == true;
            }).length,
          },
        };
        GameDayTotalStats.push(playerTotalStats);
      }
      var gameDay: GameDay = {
        gameDate: dateString,
        games: leagueGamesPlayedThisGameDay,
        gameDayStatTotals: GameDayTotalStats,
      };

      const parts = dateString.split("/");
      var start = new Date(
        Number.parseInt(parts[2]),
        Number.parseInt(parts[0]) - 1,
        Number.parseInt(parts[1])
      );
      start.setUTCHours(0, 0, 0);
      var end = new Date(
        Number.parseInt(parts[2]),
        Number.parseInt(parts[0]) - 1,
        Number.parseInt(parts[1])
      );
      end.setUTCHours(23, 59, 59);

      const generatedSummary = await generateSummary(gameDay);

      const summary = await GameDaySummaries.findOneAndUpdate(
        {
          dateCreated: {
            $gte: start,
            $lt: end,
          },
        },
        {
          dateCreated: start,
          text: generatedSummary,
        },
        {
          upsert: true,
          new: true,
        }
      ).exec();
      console.log(summary.text);

      return {
        summary: summary.text,
      };
    })
    .catch((err: any) => {
      console.log(err);
      throw Boom.badRequest(err);
    });
  await mongoose.disconnect();
  console.log("Database connection closed.");
  return stats;
})();

async function generateSummary(gameDay: GameDay) {
  const anthropic = new Anthropic({
    apiKey: process.env["ANTHROPIC_API_KEY"],
  });

  const response = await anthropic.completions.create({
    model: "claude-2.1",
    max_tokens_to_sample: 300,
    prompt: `${createPrompt(gameDay)}`,
  });

  // replace everything between the <scratchpad> tags with the response
  const resultWithScratchpad = response.completion
    .replace(/<summary>/g, "")
    .replace(/<\/summary>/g, "");
  // index of <scratchpad> tag
  const scratchpadStart = resultWithScratchpad.indexOf("<scratchpad>");
  const scratchpadEnd = resultWithScratchpad.indexOf("</scratchpad>");

  const summary =
    resultWithScratchpad.substring(0, scratchpadStart) +
    resultWithScratchpad.substring(scratchpadEnd + 13);

  return summary.trim();
}

function createPrompt(gameDay: GameDay): string {
  const systemPrompt = `You are sports copywriter that writes articles and summaries about basketball players. 
    You will be given a JSON object representing stats about players from a basketball league. 
    Understand the stats and write content about the players in a fun and engaging tone.
    
    When referencing players always refer to them by name and never by their player id.
    Do not discuss averages, focus on the playerTotalStats object for that player.
    Do not mention anything about a bench, free throws or shooting three pointers. 

    You can consider FGM to mean a player scored a point.
    You can consider FGA to mean a player attempted a shot.

    Do not mention the league, season, or date in the summary.

    Always check the stats to make sure you are accurately representing the players.

    Take extra care before claiming a player led in a certain category. Always double check that against the other players by looking at the stats data in the <stats> XML tag.
    
    <stats>
    ${JSON.stringify(gameDay)}
    </stats>

    Here is an example of a summary:
    <example>
        It was an exciting day of basketball with some great performances across the board. Lucksson Nama led the way in rebounds, ripping down 24 boards and also dishing out 7 assists. However, he did have 5 turnovers. Hardip Singh scored a game-high 14 points while also tallying 7 assists, though turnovers were an issue for him as well with 5. 

        On the defensive side, Jasinthar Amirthalingam set the tone with a league-leading 5 steals while Bhavan Sri and Lucksson Nama each had a block.

        When it came to winning, Bhavan Sri, Kobi g, Hardip Singh, and Jasinthar Amirthalingam led their teams to 6 victories
    </example>
    `;

  const humanPrompt = `\n\nHuman: Write a game summary about the players. Highlight players who did notably well. Remain positive but identify areas for improvement. Think step by step before you answer. 
  
  Put the following information in the <scratchpad> XML tags before answering the question:
    1. Identify the players who had the most FGM (points).
    2. Identify the players who had the most assists.
    3. Identify the players who had the most rebounds.
    4. Identify the players who had the most steals.
    5. Identify the players who had the most blocks.
    6. Identify the players who had the most turnovers.
    7. Identify the players who won the most games.

  Put that information in <scratchpad> XML tags. 
  
  If you claim that a player led in a certain category, double check that against the other players by looking at the <scratchpad> Only output the summary in <summary> XML tags.`;

  return `
    ${systemPrompt}
    
    ${humanPrompt}
  
    \n\nAssistant:
  `;
}
