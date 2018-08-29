const Joi = require('joi');
const PlayerStatController = require('./playerStat');

module.exports = [
        {
        method: 'GET',
        path: '/stat/player/{id}',
        options: {
            handler: PlayerStatController.get,
            description: 'Gets players stats',
            notes: 'Returns the player stats',
            tags: ['api', 'playerStat'],
            validate: {
                params: Joi.object({
                    id: Joi.string().required().description('the player\'s id')
                })
            }
        }
    }
];