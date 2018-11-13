const Joi = require('joi');
const TeamController = require('./team');

module.exports = [
    {
        method: 'GET',
        path: '/team/{leagueId}/{teamId}',
        options: {
            handler: TeamController.get,
            description: 'Get Team by ID',
            notes: 'Returns Team',
            tags: ['api', 'Team'],
            auth:{
                strategy: 'jwt',
                scope: ['player']
            },
            validate: {
                params: Joi.object({
                    teamId: Joi.string().required().description('the team ID'),
                    leagueId: Joi.string().required().description('the league ID')
                    

                })
            }
        }
    }
];