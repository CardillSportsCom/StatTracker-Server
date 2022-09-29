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
            auth:{
                strategy: 'jwt',
                scope: ['player', 'admin']
            },
            validate: {
                params: Joi.object({
                    leagueId: Joi.string().required().description('the league ID'),
                    fromDate: Joi.string().description('the from date'),
                    toDate: Joi.string().description('the to date'),
                    perGame: Joi.string().description('the per game value')
                })
            }
        }
    }
];