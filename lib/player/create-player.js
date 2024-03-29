const Joi = require('joi');
const PlayerController = require('./player');

module.exports = [
        {
        method: 'POST',
        path: '/player',
        options: {
            handler: PlayerController.create,
            description: 'Creates new player',
            notes: 'Creates a new player',
            tags: ['api', 'player'],
            auth:{
                strategy: 'jwt',
                scope: ['player', 'admin']
            },
            validate: {
                payload: Joi.object({
                    firstName: Joi.string().required().description('player\'s first name'),
                    lastName: Joi.string().required().description('player\'s last name '),
                    email: Joi.string().required().description('player\'s email'),
                    password: Joi.string().required().description('player\'s password')
                })
            }
        }
    }
];