const Joi = require('joi');
const LoginController = require('./login');

module.exports = [
        {
        method: 'POST',
        path: '/auth/next-auth',
        options: {
            handler: LoginController.loginNextAuth,
            description: 'Authenticates user with next auth',
            notes: 'Authenticates user with next auth',
            tags: ['api', 'auth'],
            validate: {
                payload: Joi.object({
                    token: Joi.string().required().description('login token')
                })
            }
        }
    }
];