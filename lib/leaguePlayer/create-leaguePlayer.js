const Joi = require('joi');
const LeaguePlayerController = require('./leaguePlayer');

module.exports = [
    {
        method: 'POST',
        path: '/league/player',
        options: {
            handler: LeaguePlayerController.create,
            description: 'Add League to a Player',
            notes: 'Add League to a player or vice versa',
            tags: ['api', 'leaguePlayer'],
            auth:{
                strategy: 'jwt',
                scope: ['admin']
            },
            validate: {
                payload: Joi.object({
                    playerId: Joi.string().required().description('the player\'s ID'),
                    leagueId: Joi.string().required().description('the league\'s ID')
                })
            }
        }
    }
];