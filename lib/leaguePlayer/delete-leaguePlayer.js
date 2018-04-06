const Joi = require('joi');
const LeaguePlayerController = require('./leaguePlayer');

module.exports = [
    {
        method: 'DELETE',
        path: '/league/player',
        options: {
            handler: LeaguePlayerController.delete,
            description: 'Delete League Player relationship',
            notes: 'Remove league from player and player from league',
            tags: ['api', 'leaguePlayer'],
            validate: {
                payload: Joi.object({
                    leaguePlayerId: Joi.string().required().description('The id of the relationship between the league and the player')
                })
            }
        }
    }
];