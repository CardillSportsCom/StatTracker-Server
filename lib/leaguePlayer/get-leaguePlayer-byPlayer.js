const Joi = require('joi');
const LeaguePlayerController = require('./leaguePlayer');

module.exports = [
    {
        method: 'GET',
        path: '/player/leagues/{playerId}',
        options: {
            handler: LeaguePlayerController.getLeagues,
            description: 'Get leagues of player',
            notes: 'Returns leagues in player',
            tags: ['api', 'leaguePlayer'],
            auth:{
                strategy: 'jwt',
                scope: ['player']
            },
            validate: {
                params: Joi.object({
                    playerId: Joi.string().required().description('the player ID')
                })
            }
        }
    }
];