const Joi = require('joi');
const PlayerCumulativeStatController = require('./playerCumulativeStat');

module.exports = [
        {
        method: 'GET',
        path: '/stat/cumulative/player/{id}',
        options: {
            handler: PlayerCumulativeStatController.get,
            description: 'Gets players cumulative stats',
            notes: 'Returns the player cumulative stats',
            tags: ['api', 'playerCumulativeStat'],
            auth:{
                strategy: 'jwt',
                scope: ['player']
            },
            validate: {
                params: Joi.object({
                    id: Joi.string().required().description('the player\'s id')
                })
            }
        }
    }
];