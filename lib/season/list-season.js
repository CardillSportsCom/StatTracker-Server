const Joi = require('joi');
const SeasonController = require('./season');

module.exports = [
    {
        method: 'GET',
        path: '/league/seasons/{leagueId}',
        options: {
            handler: SeasonController.list,
            description: 'Get all Season',
            notes: 'Returns Season',
            tags: ['api', 'season'],
            auth:{
                strategy: 'jwt',
                scope: ['admin']
            },
            validate: {
                params: Joi.object({
                    leagueId: Joi.string().required().description('the league ID')
                })
            }
        }
    }
];