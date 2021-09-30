const Joi = require('joi');
const TeamTypeController = require('./teamType');

module.exports = [
        {
        method: 'GET',
        path: '/teamTypes',
        options: {
            handler: TeamTypeController.list,
            description: 'Gets team types',
            notes: 'Returns team types',
            tags: ['api', 'teamTypes'],
            auth:{
                strategy: 'jwt',
                scope: ['admin']
            },
        }
    }
];