const Joi = require('joi');
const LeagueController = require('./league');

module.exports = [
    {
        method: 'PUT',
        path: '/league/{id}',
        options: {
            handler: LeagueController.update,
            description: 'Update League',
            notes: 'Updates League',
            tags: ['api', 'league'],
            validate: {
                params: Joi.object({
                    id: Joi.string().required().description('the id of the league')
                }),
                payload: Joi.object({
                    name: Joi.string().required().description('the name of the league')
                })
            }
        }
    }
];