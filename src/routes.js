import Hapi from 'hapi';
var LeagueRoutes = require('../lib/league/routes.js');
var PlayerRoutes = require('../lib/player/routes.js');
var LeaguePlayerRoutes = require('../lib/leaguePlayer/routes.js');


module.exports =[].concat(LeagueRoutes, PlayerRoutes, LeaguePlayerRoutes);

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