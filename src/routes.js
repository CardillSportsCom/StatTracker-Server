const Hapi = require('@hapi/hapi');
var LeagueRoutes = require("../lib/league/routes.js");
var PlayerRoutes = require("../lib/player/routes.js");
var LeaguePlayerRoutes = require("../lib/leaguePlayer/routes.js");
var LeagueTypeRoutes = require("../lib/leagueType/routes.js");
var TeamTypeRoutes = require("../lib/teamType/routes.js");
var StatRoutes = require("../lib/stat/routes.js");
var PlayerStatRoutes = require("../lib/playerStat/routes.js");
var PlayerCumulativeStatRoutes = require("../lib/playerCumulativeStat/routes.js");
var GameStatRoutes = require("../lib/gameStat/routes.js");
var GameRoutes = require("../lib/game/routes.js");
var ScoreRoutes = require("../lib/score/routes.js");
var LeagueStatRoutes = require("../lib/leagueStat/routes.js");
var SeasonStatRoutes = require("../lib/seasonStat/routes.js");
var TeamRoutes = require("../lib/team/routes.js");
var RegisterRoutes = require("../lib/register/routes.js");
var LoginRoutes = require("../lib/login/routes.js");
var LogRoutes = require("../lib/log/routes.js");
var LeagueLeaders = require("../lib/leagueLeaders/routes.js");
var SeasonRoutes = require("../lib/season/routes.js");


module.exports = [].concat(
  LogRoutes,
  LoginRoutes,
  RegisterRoutes,
  LeagueRoutes,
  PlayerRoutes,
  TeamRoutes,
  GameRoutes,
  LeaguePlayerRoutes,
  LeagueTypeRoutes,
  TeamTypeRoutes,
  StatRoutes,
  PlayerStatRoutes,
  PlayerCumulativeStatRoutes,
  GameStatRoutes,
  ScoreRoutes,
  LeagueStatRoutes,
<<<<<<< HEAD
  LeagueLeaders,
  SeasonRoutes
=======
  SeasonStatRoutes,
  LeagueLeaders
>>>>>>> bb75217dafda8e031083d2ca8b8be22b1977700f
);
