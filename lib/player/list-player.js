const Joi = require('joi');
const PlayerController = require('./player');

module.exports = [
        {
        method: 'GET',
        path: '/player',
        options: {
            handler: PlayerController.list,
            description: 'Gets players',
            notes: 'Returns players',
            tags: ['api', 'player']
        }
    }
];