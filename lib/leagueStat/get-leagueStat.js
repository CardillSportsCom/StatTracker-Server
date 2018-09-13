const Joi = require('joi');
const LeagueStatController = require('./leagueStat');

module.exports = [
    {
        method: 'GET',
        path: '/stat/league/{leagueId}',
        options: {
            handler: LeagueStatController.get,
            description: 'Get total stats for league',
            notes: 'Returns total stats per player in league',
            tags: ['api', 'leagueStats'],
            validate: {
                params: Joi.object({
                    leagueId: Joi.string().required().description('the league ID')
                })
            }
        }
    }
];