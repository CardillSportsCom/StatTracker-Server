const Joi = require('joi');
const LeagueController = require('./league');

module.exports = [
        {
        method: 'POST',
        path: '/league',
        options: {
            handler: LeagueController.create,
            description: 'Create League',
            notes: 'Returns League ID',
            tags: ['api', 'league'],
            validate: {
                payload: Joi.object({
                    name: Joi.string().required().description('the name of the league'),
                    type: Joi.string().required().description('the id of the league type')
                })
            }
        }
    }
];