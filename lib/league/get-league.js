const Joi = require('joi');
const LeagueController = require('./league');

module.exports = [
    {
        method: 'GET',
        path: '/league/{id}',
        options: {
            handler: LeagueController.get,
            description: 'Get League by ID',
            notes: 'Returns League',
            tags: ['api', 'league'],
            validate: {
                params: Joi.object({
                    id: Joi.string().required().description('the league ID')
                })
            }
        }
    }
];