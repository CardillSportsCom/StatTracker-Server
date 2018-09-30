const Joi = require('joi');
const TeamController = require('./team');
module.exports = [
 {
        method: 'DELETE',
        path: '/team/{id}',
        options: {
            handler: TeamController.delete,
            description: 'Delete team',
            notes: 'Deletes team',
            tags: ['api', 'team'],
            validate: {
                params: Joi.object({
                    id: Joi.string().required().description('the id of the team')
                })
            }
        }
    }
];