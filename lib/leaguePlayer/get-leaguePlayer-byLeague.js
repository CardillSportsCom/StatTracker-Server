const Joi = require('joi');
const LeaguePlayerController = require('./leaguePlayer');

module.exports = [
    {
        method: 'GET',
        path: '/league/players/{leagueId}',
        options: {
            handler: LeaguePlayerController.getPlayers,
            description: 'Get players of league',
            notes: 'Returns players in league',
            tags: ['api', 'leaguePlayer'],
            auth:{
                strategy: 'jwt',
                scope: ['player', 'admin']
            },
            validate: {
                params: Joi.object({
                    leagueId: Joi.string().required().description('the league ID')
                })
            }
        }
    }
];