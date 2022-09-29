const Joi = require('joi');
const GameStatController = require('./gameStat');

module.exports = [
        {
        method: 'GET',
        path: '/stat/game/{id}',
        options: {
            handler: GameStatController.get,
            description: 'Gets games stats',
            notes: 'Returns the games stats',
            tags: ['api', 'gamestat'],
            auth:{
                strategy: 'jwt',
                scope: ['player', 'admin']
            },
            validate: {
                params: Joi.object({
                    id: Joi.string().required().description('the game\'s id')
                })
            }
        }
    }
];