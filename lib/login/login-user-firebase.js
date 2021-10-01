const Joi = require('joi');
const LoginController = require('./login');
const verifyCredentials = require('../util/userFunctions').verifyCredentials;

module.exports = [
        {
        method: 'POST',
        path: '/auth',
        options: {
            handler: LoginController.loginFirebase,
            description: 'Authenticates user',
            notes: 'Authenticates user',
            tags: ['api', 'auth'],
            validate: {
                payload: Joi.object({
                    token: Joi.string().required().description('login token')
                })
            }
        }
    }
];