const Joi = require('joi');
const PlayerController = require('./player');

module.exports = [
        {
        method: 'GET',
        path: '/player/{id}',
        options: {
            handler: PlayerController.get,
            description: 'Gets player',
            notes: 'Returns the player',
            tags: ['api', 'player'],
            validate: {
                params: Joi.object({
                    id: Joi.string().required().description('the player\'s id')
                })
            }
        }
    }
];