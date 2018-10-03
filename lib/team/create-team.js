const Joi = require('joi');
const TeamController = require('./team');

module.exports = [
        {
        method: 'POST',
        path: '/team',
        options: {
            handler: TeamController.create,
            description: 'Create Team',
            notes: 'Returns Team ID',
            tags: ['api', 'team'],
            validate: {
                payload: Joi.object({
                    name: Joi.string().required().description('the name of the team'),
                        players: Joi.array().items(Joi.string().description('player id')).required().description('The players of the team'),
                    leagueId: Joi.string().required().description('the league ID')

                })
            }
        }
    }
];