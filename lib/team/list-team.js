const Joi = require('joi');
const TeamController = require('./team');

module.exports = [
    {
        method: 'GET',
        path: '/team/{leagueId}',
        options: {
            handler: TeamController.list,
            description: 'Get all teams',
            notes: 'Returns Teams',
            tags: ['api', 'team'],
            auth:{
                strategy: 'jwt',
                scope: ['player']
            },
            validate: {
                params: Joi.object({
                    leagueId: Joi.string().required().description('the league ID')
                }),
                query: {
                    count: Joi.number().description('limit the outputted list')
                }
            }
        }
    }
];