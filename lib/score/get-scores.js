const Joi = require('joi');
const ScoreController = require('./score');

module.exports = [
    {
        method: 'GET',
        path: '/stat/score/{leagueId}/{seasonId}',
        options: {
            handler: ScoreController.get,
            description: 'Get game days and scores',
            notes: 'Returns game days and scores',
            tags: ['api', 'score'],
            auth:{
                strategy: 'jwt',
                scope: ['player', 'admin']
            },
            validate: {
                params: Joi.object({
                    leagueId: Joi.string().required().description('the league ID'),
                    seasonId: Joi.string().required().description('the season ID')
                })
            }
        }
    }
];