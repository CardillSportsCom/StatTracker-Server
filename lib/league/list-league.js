const Joi = require('joi');
const LeagueController = require('./league');

module.exports = [
    {
        method: 'GET',
        path: '/league',
        options: {
            handler: LeagueController.list,
            description: 'Get all leagues',
            notes: 'Returns Leagues',
            tags: ['api', 'league'],
        }
    }
];