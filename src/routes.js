import Hapi from 'hapi';

const Joi = require('joi');
const League = require('../models/league')
const LeagueController = require('../controllers/league')

module.exports = [
    {
        method:'GET',
        path: '/league/{id}',
        options:{
            handler: LeagueController.get,
            description: 'Get League by ID',
            notes: 'Returns League',
            tags:['api', 'league'],
            validate:{
                params: Joi.object({
                    id: Joi.string().required().description('the league ID')
                })
            }
        }
    },
    {
        method: 'POST',
        path: '/league',
        options:{
            handler: LeagueController.create,
            description: 'Create League',
            notes: 'Returns League ID',
            tags:['api', 'league'],
            validate: {
                payload: Joi.object({
                        name: Joi.string().required().description('the name of the league')
                })                             
            }
        }
    }

];