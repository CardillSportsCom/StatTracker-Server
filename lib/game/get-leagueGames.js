const Joi = require('joi');
const GameController = require('./game');

module.exports = [
        {
        method: 'GET',
        path: '/league/games/{leagueId}',
        options: {
            handler: GameController.list,
            description: 'Gets league games',
            notes: 'Returns the games',
            tags: ['api', 'game'],
            auth:{
                strategy: 'jwt',
                scope: ['player', 'admin']
            },
            validate: {
                params: Joi.object({
                    leagueId: Joi.string().required().description('the league\'s id')
                })
            }
        }
    }
];