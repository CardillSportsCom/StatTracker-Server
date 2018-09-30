const Joi = require('joi');
const TeamController = require('./team');

module.exports = [
    {
        method: 'PUT',
        path: '/team/{id}',
        options: {
            handler: TeamController.update,
            description: 'Update Team',
            notes: 'Updates Team',
            tags: ['api', 'team'],
            validate: {
                params: Joi.object({
                    id: Joi.string().required().description('the id of the team')
                }),
                payload: Joi.object({
                     team: Joi.object({
                        name: Joi.string().description(' team\'s name'),
                        players: Joi.array().items(Joi.string().description('player id')).required().description('The players of the team'),
                        
                    }).required(),
                })
            }
        }
    }
];