const Joi = require('joi');
const SeasonController = require('./season');
module.exports = [
 {
        method: 'DELETE',
        path: '/league/season/{id}',
        options: {
            handler: SeasonController.delete,
            description: 'Delete Season',
            notes: 'Deletes Season',
            tags: ['api', 'season'],
            auth:{
                strategy: 'jwt',
                scope: ['admin']
            },
            validate: {
                params: Joi.object({
                    id: Joi.string().required().description('the id of the season')
                })
            }
        }
    }
];