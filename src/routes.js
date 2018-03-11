import Hapi from 'hapi';

const Joi = require('joi');
const League = require('../models/league')
const LeagueController = require('../controllers/league')
const PlayerController = require('../controllers/player')


module.exports = [
    {
        method: 'GET',
        path: '/player/{id}',
        options:{
            handler: PlayerController.get,
            description: 'Gets player',
            notes: 'Returns the player',
            tags:['api', 'player'],
            validate:{
                params: Joi.object({
                    id: Joi.string().required().description('the player\'s id')
                })
            }
        }
    },
    {
        method: 'POST',
        path: '/player',
        options:{
            handler: PlayerController.create,
            description: 'Creates new player',
            notes: 'Creates a new player. If leagueId is passed it adds the player to the league',
            tags: ['api', 'player'],
            validate:{
                payload: Joi.object({
                    firstName: Joi.string().required().description('player\'s first name'),
                    lastName: Joi.string().required().description('player\'s last name '),
                    email: Joi.string().required().description('player\'s email'),
                    password: Joi.string().required().description('player\'s password')
                })
            }
        }
    },
    {
        method: 'PUT',
        path: '/player/{id}',
        options:{
            handler : PlayerController.update,
            description: 'Update player information',
            notes: 'Updates email, first name and last name',
            tags:['api', 'player'],
            validate:{
                payload: Joi.object({
                    firstName: Joi.string().required().description('player\'s first name'),
                    lastName: Joi.string().required().description('player\'s last name '),
                    email: Joi.string().required().description('player\'s email')
                }),
                params: Joi.object({
                    id: Joi.string().required().description('player\'s id')
                })
            }
        }
    },
    {
        method: 'DELETE',
        path: '/player/{id}',
        options: {
            handler: PlayerController.delete,
            description: 'Delete Player',
            notes: 'Deletes Player',
            tags: ['api', 'Player'],
            validate: {
                params: Joi.object({
                    id: Joi.string().required().description('the id of the player')
                })
            }
        }
    },
    {
        method: 'GET',
        path: '/league/{id}',
        options: {
            handler: LeagueController.get,
            description: 'Get League by ID',
            notes: 'Returns League',
            tags: ['api', 'league'],
            validate: {
                params: Joi.object({
                    id: Joi.string().required().description('the league ID')
                })
            }
        }
    },
    {
        method: 'POST',
        path: '/league',
        options: {
            handler: LeagueController.create,
            description: 'Create League',
            notes: 'Returns League ID',
            tags: ['api', 'league'],
            validate: {
                payload: Joi.object({
                    name: Joi.string().required().description('the name of the league')
                })
            }
        }
    },
    {
        method: 'PUT',
        path: '/league/{id}',
        options: {
            handler: LeagueController.update,
            description: 'Update League',
            notes: 'Updates League',
            tags: ['api', 'league'],
            validate: {
                params: Joi.object({
                    id: Joi.string().required().description('the id of the league')
                }),
                payload: Joi.object({
                    name: Joi.string().required().description('the name of the league')
                })
            }
        }
    },
    {
        method: 'DELETE',
        path: '/league/{id}',
        options: {
            handler: LeagueController.delete,
            description: 'Delete League',
            notes: 'Deletes league',
            tags: ['api', 'league'],
            validate: {
                params: Joi.object({
                    id: Joi.string().required().description('the id of the league')
                })
            }
        }
    }

];