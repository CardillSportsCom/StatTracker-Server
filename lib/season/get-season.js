const Joi = require('joi');
const SeasonController = require('./season');

module.exports = [
    {
        method: 'GET',
        path: '/league/season/{id}',
        options: {
            handler: SeasonController.get,
            description: 'Get Season by ID',
            notes: 'Returns Season',
            tags: ['api', 'season'],
            auth:{
                strategy: 'jwt',
                scope: ['player', 'admin']
            },
            validate: {
                params: Joi.object({
                    id: Joi.string().required().description('the season ID')
                })
            }
        }
    }
];