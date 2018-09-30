const Joi = require('joi');
const TeamController = require('./team');

module.exports = [
    {
        method: 'GET',
        path: '/team/{id}',
        options: {
            handler: TeamController.get,
            description: 'Get Team by ID',
            notes: 'Returns Team',
            tags: ['api', 'Team'],
            validate: {
                params: Joi.object({
                    id: Joi.string().required().description('the team ID')
                })
            }
        }
    }
];