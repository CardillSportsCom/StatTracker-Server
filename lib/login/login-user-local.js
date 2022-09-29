const Joi = require('joi');
const LoginController = require('./login');
const verifyCredentials = require('../util/userFunctions').verifyCredentials;

module.exports = [
        {
        method: 'POST',
        path: '/auth/local',
        options: {
            handler: LoginController.loginLocal,
            pre: [
                { method: verifyCredentials, assign: 'player'}
            ],
            description: 'Authenticates user',
            notes: 'Authenticates user',
            tags: ['api', 'auth'],
            validate: {
                payload: Joi.object({
                    email: Joi.string().required().description('user\'s email'),
                    password: Joi.string().required().description('user\'s password')
                })
            }
        }
    }
];