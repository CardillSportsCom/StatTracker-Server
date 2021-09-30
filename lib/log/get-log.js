const Joi = require('joi');
const LogController = require('./log');

module.exports = [
        {
        method: 'POST',
        path: '/log',
        options: {
            handler: LogController.create,
            description: 'Converts android log',
            notes: 'Converts android log',
            tags: ['api', 'log'],
            auth:{
                strategy: 'jwt',
                scope: ['player', 'admin']
            },
            validate: {
                payload: Joi.array().items(Joi.object({
                    id: Joi.number().required().description('the log id'),
                    syncPending: Joi.boolean().required().description('sync status'),
                    teamOnePlayers: Joi.array().items(Joi.object({
                        assists: Joi.number().required(),
                        blocks:Joi.number().required(),
                        fieldGoalMade: Joi.number().required(),
                        fieldGoalMissed: Joi.number().required(),
                        firstName: Joi.string().required(),
                        gamesPlayed: Joi.number().required(),
                        id: Joi.string().required(),
                        isActive: Joi.boolean().required(),
                        lastName: Joi.string().required(),
                        rebounds: Joi.number().required(),
                        shouldIgnoreStats: Joi.boolean().required(),
                        steals: Joi.number().required(),
                        turnovers: Joi.number().required(),
                        wins: Joi.number().required()
                    })).required(),
                    teamTwoPlayers: Joi.array().items(Joi.object({
                        assists: Joi.number().required(),
                        blocks:Joi.number().required(),
                        fieldGoalMade: Joi.number().required(),
                        fieldGoalMissed: Joi.number().required(),
                        firstName: Joi.string().required(),
                        gamesPlayed: Joi.number().required(),
                        id: Joi.string().required(),
                        isActive: Joi.boolean().required(),
                        lastName: Joi.string().required(),
                        rebounds: Joi.number().required(),
                        shouldIgnoreStats: Joi.boolean().required(),
                        steals: Joi.number().required(),
                        turnovers: Joi.number().required(),
                        wins: Joi.number().required()
                    })).required()
                })).required()
            }
        }
    }
];