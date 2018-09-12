import Hapi from 'hapi';
var LeagueRoutes = require('../lib/league/routes.js');
var PlayerRoutes = require('../lib/player/routes.js');
var LeaguePlayerRoutes = require('../lib/leaguePlayer/routes.js');
var LeagueTypeRoutes = require('../lib/leagueType/routes.js');
var TeamTypeRoutes = require('../lib/teamType/routes.js');
var StatRoutes = require('../lib/stat/routes.js');
var PlayerStatRoutes = require('../lib/playerStat/routes.js');
var GameStatRoutes = require('../lib/gameStat/routes.js');
var GameRoutes = require('../lib/game/routes.js');
var ScoreRoutes = require('../lib/score/routes.js');


module.exports =[].concat(LeagueRoutes, PlayerRoutes, GameRoutes, LeaguePlayerRoutes, LeagueTypeRoutes, TeamTypeRoutes, StatRoutes, PlayerStatRoutes, GameStatRoutes, ScoreRoutes);
