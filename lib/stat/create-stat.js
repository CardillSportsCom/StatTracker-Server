const Joi = require('joi');
const StatController = require('./stat');

module.exports = [
        {
        method: 'POST',
        path: '/stat',
        options: {
            handler: StatController.create,
            description: 'Creates new stat, game and teams',
            notes: 'Creates the teams, games and stats',
            tags: ['api', 'stat'],
            auth:{
                strategy: 'jwt',
                scope: ['admin']
            },
            validate: {
                payload: Joi.object({
                    leagueId: Joi.string().required().description('The league Id'),
                    seasonId: Joi.string().required().description('The season Id'),
                    teamTypeId: Joi.string().required().description('The type of teams id'),
                    teamAScore: Joi.string().required().description("First team score"),
                    teamBScore: Joi.string().required().description('Second team score'),
                    teamA: Joi.object({
                        name: Joi.string().description('First team\'s name'),
                        players: Joi.array().items(Joi.object({
                            playerId: Joi.string().required().description('The player\'s id'),
                            fgm: Joi.number().required().description('The field goals made'),
                            fga: Joi.number().required().description('The field goals attempted'),
                            threePointersMade: Joi.number().description('The 3PT field goals made'),
                            threePointersAttempted: Joi.number().description('The 3PT field goals attempted'),
                            rebounds: Joi.number().required().description('The field goals attempted'),
                            assists: Joi.number().required().description('The field goals attempted'),
                            steals: Joi.number().required().description('The field goals attempted'),
                            blocks: Joi.number().required().description('The field goals attempted'),
                            blocksAgainst : Joi.number().description('The blocks against'),
                            stealsAgainst : Joi.number().description('The steals against'),
                            turnovers: Joi.number().required().description('The field goals attempted'),
                            pointsScored: Joi.number().description('Total points scored')
                        })).required().description('The players of first team'),
                        substitutes: Joi.array().items(Joi.object({
                            playerId: Joi.string().required().description('The player\'s id'),
                            fgm: Joi.number().required().description('The field goals made'),
                            fga: Joi.number().required().description('The field goals attempted'),
                            threePointersMade: Joi.number().description('The 3PT field goals made'),
                            threePointersAttempted: Joi.number().description('The 3PT field goals attempted'),
                            rebounds: Joi.number().required().description('The field goals attempted'),
                            assists: Joi.number().required().description('The field goals attempted'),
                            steals: Joi.number().required().description('The field goals attempted'),
                            blocks: Joi.number().required().description('The field goals attempted'),
                            blocksAgainst : Joi.number().description('The blocks against'),
                            stealsAgainst : Joi.number().description('The steals against'),
                            turnovers: Joi.number().required().description('The field goals attempted'),
                            pointsScored: Joi.number().description('Total points scored')
                        })).description('The substitutes of first team'),
                        injuries : Joi.array().items(
                            Joi.string().required().description('The playerID of injured player')
                            ).description('The injured players')
                    }).required(),
                    teamB: Joi.object({
                        name: Joi.string().description('Second team\'s name'),
                        players: Joi.array().items(Joi.object({
                            playerId: Joi.string().required().description('The player\'s id'),
                            fgm: Joi.number().required().description('The field goals made'),
                            fga: Joi.number().required().description('The field goals attempted'),
                            threePointersMade: Joi.number().description('The 3PT field goals made'),
                            threePointersAttempted: Joi.number().description('The 3PT field goals attempted'),
                            rebounds: Joi.number().required().description('The field goals attempted'),
                            assists: Joi.number().required().description('The field goals attempted'),
                            steals: Joi.number().required().description('The field goals attempted'),
                            blocks: Joi.number().required().description('The field goals attempted'),
                            blocksAgainst : Joi.number().description('The blocks against'),
                            stealsAgainst : Joi.number().description('The steals against'),
                            turnovers: Joi.number().required().description('The field goals attempted'),
                            pointsScored: Joi.number().description('Total points scored')
                        })).required().description('The players of second team'),
                        substitutes: Joi.array().items(Joi.object({
                            playerId: Joi.string().required().description('The player\'s id'),
                            fgm: Joi.number().required().description('The field goals made'),
                            fga: Joi.number().required().description('The field goals attempted'),
                            threePointersMade: Joi.number().description('The 3PT field goals made'),
                            threePointersAttempted: Joi.number().description('The 3PT field goals attempted'),
                            rebounds: Joi.number().required().description('The field goals attempted'),
                            assists: Joi.number().required().description('The field goals attempted'),
                            steals: Joi.number().required().description('The field goals attempted'),
                            blocks: Joi.number().required().description('The field goals attempted'),
                            blocksAgainst : Joi.number().description('The blocks against'),
                            stealsAgainst : Joi.number().description('The steals against'),
                            turnovers: Joi.number().required().description('The field goals attempted'),
                            pointsScored: Joi.number().description('Total points scored')
                        })).description('The substitutes of first team'),
                        injuries: Joi.array().items(
                            Joi.string().required().description('The playerID of injured player')
                            ).description('The injured players')
                    }).required(),
                })
            }
        }
    }
];
