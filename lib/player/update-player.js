const Joi = require('joi');
const PlayerController = require('./player');

module.exports = [
        {
        method: 'PUT',
        path: '/player/{id}',
        options: {
            handler: PlayerController.update,
            description: 'Update player information',
            notes: 'Updates image, email, first name and last name',
            tags: ['api', 'player'],
            auth:{
                strategy: 'jwt',
                scope: ['player']
            },
            validate: {
                payload: Joi.object({
                    firstName: Joi.string().required().description('player\'s first name'),
                    lastName: Joi.string().required().description('player\'s last name '),
                    email: Joi.string().required().description('player\'s email'),
                    imageUri: Joi.string().description('player\'s imageUri')
                }),
                params: Joi.object({
                    id: Joi.string().required().description('player\'s id')
                })
            }
        }
    }
];
