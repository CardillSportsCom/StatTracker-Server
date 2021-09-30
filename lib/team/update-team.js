const Joi = require('joi');
const TeamController = require('./team');

module.exports = [
    {
        method: 'PUT',
        path: '/team/{leagueId}/{teamId}',
        options: {
            handler: TeamController.update,
            description: 'Update Team',
            notes: 'Updates Team',
            tags: ['api', 'team'],
            auth:{
                strategy: 'jwt',
                scope: ['admin']
            },
            validate: {
                params: Joi.object({
                    teamId: Joi.string().required().description('the id of the team'),
                    leagueId: Joi.string().required().description('the id of the league')                    
                }),
                payload: Joi.object({
                     team: Joi.object({
                        name: Joi.string().description(' team\'s name'),
                        players: Joi.array().items(Joi.string().description('player id')).required().description('The players of the team'),
                        
                    }).required(),
                })
            }
        }
    }
];