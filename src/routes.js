const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/players',
        config:{
            handler: function( request, reply ){
                return 'hello world';
            },
            description: 'Get Hello world',
            notes: 'Returns hello world',
            tags:['api']
        }
    }
];