const Joi = require('joi');
const RegisterController = require('./register');

module.exports = [
        {
        method: 'POST',
        path: '/register/local',
        options: {
            handler: RegisterController.createLocal,
            description: 'Creates new user',
            notes: 'Creates a new user',
            tags: ['api', 'register'],
            validate: {
                payload: Joi.object({
                    firstName: Joi.string().required().description('user\'s first name'),
                    lastName: Joi.string().required().description('user\'s last name '),
                    email: Joi.string().required().description('user\'s email'),
                    password: Joi.string().required().description('user\'s password')
                })
            }
        }
    }
];