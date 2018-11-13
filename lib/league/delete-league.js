const Joi = require('joi');
const LeagueController = require('./league');
module.exports = [
 {
        method: 'DELETE',
        path: '/league/{id}',
        options: {
            handler: LeagueController.delete,
            description: 'Delete League',
            notes: 'Deletes league',
            tags: ['api', 'league'],
            auth:{
                strategy: 'jwt',
                scope: ['player']
            },
            validate: {
                params: Joi.object({
                    id: Joi.string().required().description('the id of the league')
                })
            }
        }
    }
];