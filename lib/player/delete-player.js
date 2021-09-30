const Joi = require('joi');
const PlayerController = require('./player');

module.exports = [
       {
        method: 'DELETE',
        path: '/player/{id}',
        options: {
            handler: PlayerController.delete,
            description: 'Delete Player',
            notes: 'Deletes Player',
            tags: ['api', 'Player'],
            auth:{
                strategy: 'jwt',
                scope: ['player', 'admin']
            },
            validate: {
                params: Joi.object({
                    id: Joi.string().required().description('the id of the player')
                })
            }
        }
    }
];