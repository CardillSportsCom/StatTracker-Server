const Joi = require('joi');
const TeamController = require('./team');

module.exports = [
    {
        method: 'GET',
        path: '/team',
        options: {
            handler: TeamController.list,
            description: 'Get all teams',
            notes: 'Returns Teams',
            tags: ['api', 'team'],
        }
    }
];