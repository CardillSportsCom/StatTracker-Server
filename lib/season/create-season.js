const Joi = require('joi');
const SeasonController = require('./season');

module.exports = [
        {
        method: 'POST',
        path: '/league/season',
        options: {
            handler: SeasonController.create,
            description: 'Create Season',
            notes: 'Creates Season given a League ID',
            tags: ['api', 'season'],
            auth:{
                strategy: 'jwt',
                scope: ['admin']
            },
            validate: {
                payload: Joi.object({
                    leagueId: Joi.string().required().description('the league ID'),
                    fromDate: Joi.string().description('the from date'),
                    toDate: Joi.string().description('the to date')
                })
            }
        }
    }
];