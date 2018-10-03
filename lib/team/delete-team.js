const Joi = require('joi');
const TeamController = require('./team');
module.exports = [
 {
        method: 'DELETE',
        path: '/team/{leagueId}/{teamId}',
        options: {
            handler: TeamController.delete,
            description: 'Delete team',
            notes: 'Deletes team',
            tags: ['api', 'team'],
            validate: {
                params: Joi.object({
                    teamId: Joi.string().required().description('the id of the team'),
                    leagueId: Joi.string().required().description('the id of the league')                    
                })
            }
        }
    }
];