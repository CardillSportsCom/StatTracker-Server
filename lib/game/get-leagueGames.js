const Joi = require('joi');
const GameController = require('./game');

module.exports = [
        {
        method: 'GET',
        path: '/league/game/{id}',
        options: {
            handler: GameController.get,
            description: 'Gets league games',
            notes: 'Returns the games',
            tags: ['api', 'game'],
            validate: {
                params: Joi.object({
                    id: Joi.string().required().description('the league\'s id')
                })
            }
        }
    }
];