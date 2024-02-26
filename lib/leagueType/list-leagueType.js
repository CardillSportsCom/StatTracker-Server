const Joi = require('joi');
const LeagueTypeController = require('./leagueType');

module.exports = [
        {
        method: 'GET',
        path: '/leagueTypes',
        options: {
            handler: LeagueTypeController.list,
            description: 'Gets league types',
            notes: 'Returns league types',
            tags: ['api', 'leagueTypes'],
            auth:{
                strategy: 'jwt',
                scope: ['player','admin']
            },
        }
    }
];