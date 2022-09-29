const Joi = require('joi');
const SeasonController = require('./season');

module.exports = [
    {
        method: 'PUT',
        path: '/league/season/{id}',
        options: {
            handler: SeasonController.update,
            description: 'Update Season',
            notes: 'Updates Season',
            tags: ['api', 'season'],
            auth:{
                strategy: 'jwt',
                scope: ['admin']
            },
            validate: {
                params: Joi.object({
                    id: Joi.string().required().description('the id of the season')
                }),
                payload: Joi.object({
                    fromDate: Joi.string().description('the from date'),
                    toDate: Joi.string().description('the to date')
                })
            }
        }
    }
];