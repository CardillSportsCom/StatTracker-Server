const Joi = require('joi');
const LeagueLeadersController = require('./leagueLeaders');

module.exports = [
        {
        method: 'GET',
        path: '/view/leagueLeaders/{id}',
        options: {
            handler: LeagueLeadersController.get,
            description: 'Gets league leaders',
            notes: 'Returns the league leaders',
            tags: ['api', 'leagueLeaders'],
            auth:{
                strategy: 'jwt',
                scope: ['player']
            },
            validate: {
                params: Joi.object({
                    id: Joi.string().required().description('the league\'s id')
                })
            }
        }
    }
];