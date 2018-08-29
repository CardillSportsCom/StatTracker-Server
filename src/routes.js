import Hapi from 'hapi';
var LeagueRoutes = require('../lib/league/routes.js');
var PlayerRoutes = require('../lib/player/routes.js');
var LeaguePlayerRoutes = require('../lib/leaguePlayer/routes.js');
var LeagueTypeRoutes = require('../lib/leagueType/routes.js');
var TeamTypeRoutes = require('../lib/teamType/routes.js');
var StatRoutes = require('../lib/stat/routes.js');
var PlayerStatRoutes = require('../lib/playerStat/routes.js');


module.exports =[].concat(LeagueRoutes, PlayerRoutes, LeaguePlayerRoutes, LeagueTypeRoutes, TeamTypeRoutes, StatRoutes, PlayerStatRoutes);

// module.exports = [
   
//     // {
//     //     method: 'PUT',
//     //     path: '/addPlayer/{leagueId}',
//     //     options: {
//     //         handler: LeagueController.addplayer,
//     //         description: 'Add Player to league',
//     //         notes: 'Adds player to league',
//     //         tags: ['api', 'league'],
//     //         validate: {
//     //             params: Joi.object({
//     //                 leagueId: Joi.string().required().description('id of the league')
//     //             }),
//     //             payload: Joi.object({
//     //                 playerId: Joi.string().required().description('player id')
//     //             })
//     //         }
//     //     }
//     // },
//     // {
//     //     method: 'DELETE',
//     //     path: '/removePlayer/{leagueId}',
//     //     options: {
//     //         handler: LeagueController.removePlayer,
//     //         description: 'Remove player from league',
//     //         notes: 'Removes players from league',
//     //         tags: ['api', 'league'],
//     //         validate: {
//     //             params: Joi.object({
//     //                 leagueId: Joi.string().required().description('id of the league')
//     //             }),
//     //             payload: Joi.object({
//     //                 playerId: Joi.string().required().description('player id')
//     //             })
//     //         }
//     //     }
//     // }

// ];