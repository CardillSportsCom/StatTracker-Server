export {};

const BasketballStat = require("../../models/basketballStat");
const Boom = require('@hapi/boom');
const mongoose = require("mongoose");

exports.get = (request, h) => {
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

  const season: string | null = request.query.season;

  return BasketballStat.find({ league: request.params.leagueId })
    .populate("game")
    .populate("player")
    .exec()
    .then((gameStats: GameStat[]) => {
      var playerStats = [];

      var leaguePlayers = uniqueArray(gameStats.map((a) => a.player._id));

      for (var j = 0; j < leaguePlayers.length; j++) {
        const playerGameStats = gameStats.filter((obj) => {
          return obj.player._id == leaguePlayers[j];
        });

        const playerTotalStats: PlayerTotalStats =
          calculateTotalStats(playerGameStats);

        const playerAverageStats = calculateAverageStats(playerGameStats);

        const playerStatsData: PlayerStatsData = {
          player: playerGameStats[0].player,
          playerTotalStats: playerTotalStats, // career total stats
          playerAverageStats: playerAverageStats, // career average stats
        };

        if (season) {
          const playerTotalStatsSeason: PlayerTotalStats = calculateTotalStats(
            playerGameStats.filter((obj) => {
              return obj.game.season == season;
            })
          );

          const playerAverageStatsSeason = calculateAverageStats(
            playerGameStats.filter((obj) => {
              return obj.game.season == season;
            })
          );

          playerStatsData.playerTotalStatsSeason = playerTotalStatsSeason;
          playerStatsData.playerAverageStatsSeason = playerAverageStatsSeason;
        }
        playerStats.push(playerStatsData);
      }

      return {
        leagueStats: playerStats,
      };
    })
    .catch((err) => {
      throw Boom.badRequest(err);
    });
};

function calculateAvgStat(
  dailyStats: Record<string, StatTotals>,
  stat: string
) {
  let totalStat = 0;
  let numDays = 0;

  for (const date in dailyStats) {
    totalStat += dailyStats[date][stat];
    numDays++;
  }

  let avgStat = 0;
  if (numDays > 0) {
    avgStat = totalStat / numDays;
  }

  return avgStat;
}

function calculateDailyStats(
  statsByDate: Record<string, GameStat[]>
): Record<string, StatTotals> {
  const dailyStats: Record<string, StatTotals> = {};

  for (const [date, gameStats] of Object.entries(statsByDate)) {
    const totals: StatTotals = {
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

    for (const stat of gameStats) {
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

function calculateAverageStats(
  playerGameStats: GameStat[]
): PlayerAverageStats {
  const playerGameStatsGroupByDate: Record<string, GameStat[]> =
    playerGameStats.reduce((acc, doc) => {
      const date = doc.dateCreated.toISOString().split("T")[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(doc);
      return acc;
    }, {});

  const dailyStats = calculateDailyStats(playerGameStatsGroupByDate);

  return {
    FGM: calculateAvgStat(dailyStats, "FGM"),
    FGA: calculateAvgStat(dailyStats, "FGA"),
    threePointersMade: calculateAvgStat(dailyStats, "threePointersMade"),
    threePointersAttempted: calculateAvgStat(
      dailyStats,
      "threePointersAttempted"
    ),
    rebounds: calculateAvgStat(dailyStats, "rebounds"),
    assists: calculateAvgStat(dailyStats, "assists"),
    steals: calculateAvgStat(dailyStats, "steals"),
    blocks: calculateAvgStat(dailyStats, "blocks"),
    turnovers: calculateAvgStat(dailyStats, "turnovers"),
  };
}

function calculateTotalStats(playerGameStats: GameStat[]): PlayerTotalStats {
  return {
    FGM: sum(playerGameStats.map((obj) => obj.FGM)),
    FGA: sum(playerGameStats.map((obj) => obj.FGA)),
    threePointersMade: sum(playerGameStats.map((obj) => obj.threePointersMade)),
    threePointersAttempted: sum(
      playerGameStats.map((obj) => obj.threePointersAttempted)
    ),
    rebounds: sum(playerGameStats.map((obj) => obj.rebounds)),
    assists: sum(playerGameStats.map((obj) => obj.assists)),
    steals: sum(playerGameStats.map((obj) => obj.steals)),
    blocks: sum(playerGameStats.map((obj) => obj.blocks)),
    turnovers: sum(playerGameStats.map((obj) => obj.turnovers)),
    gamesPlayed: playerGameStats.length,
    gamesWon: playerGameStats.filter((obj) => {
      return obj.isWin == true;
    }).length,
  };
}

function uniqueArray<T>(a: T[]): T[] {
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  var unique = a.filter(onlyUnique);

  return unique;
}

function sum(arr: number[]) {
  return arr.reduce((a, b) => a + b, 0);
}

type StatTotals = {
  FGM: number;
  FGA: number;
  rebounds: number;
  blocks: number;
  threePointersMade: number;
  threePointersAttempted: number;
  assists: number;
  steals: number;
  turnovers: number;
};

type GameStat = {
  player: Player;
  game: Game;
  FGM: number;
  FGA: number;
  threePointersMade: number;
  threePointersAttempted: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  isWin: boolean;
  dateCreated: Date;
};

type Player = {
  _id: string;
  name: string;
  team: string;
};

type Game = {
  _id: string;
  dateCreated: Date;
  season: string;
};

type PlayerStatsData = {
  player: Player;
  playerTotalStats: PlayerTotalStats; // career total stats
  playerAverageStats: PlayerAverageStats; // career average stats
  playerTotalStatsSeason?: PlayerTotalStats; // season total stats
  playerAverageStatsSeason?: PlayerAverageStats; // season average stats
};

type PlayerTotalStats = BaseStats & {
  gamesPlayed: number;
  gamesWon: number;
};

type PlayerAverageStats = BaseStats;

type BaseStats = {
  FGM: number;
  FGA: number;
  threePointersMade: number;
  threePointersAttempted: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
};
