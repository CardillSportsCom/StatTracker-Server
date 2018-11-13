const Player = require('../../models/player')
const League = require('../../models/league')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const secret = require('../../src/config');
const Boom = require('boom');
const createToken = require('../util/userFunctions').createToken;
const hashPassword = require('../util/userFunctions').hashPassword;



exports.createLocal = (request, h) => {    
    return hashPassword(request.payload.password).then((hash)=>{
        const newPlayer = new Player();
        newPlayer.firstName = request.payload.firstName;
        newPlayer.lastName = request.payload.lastName;
        newPlayer.email = request.payload.email;
        newPlayer.isAdmin = false;
        newPlayer.dateCreated = new Date();
        newPlayer.password = hash;
        return Player.create(newPlayer).then((newPlayerObj)=>{
            return createToken(newPlayerObj).then((token)=>{
                return { id_token: token };

            }).catch((err) => {

                throw Boom.badRequest(err);

            });

        }).catch((err) => {

            throw Boom.badRequest(err);

        });
    }).catch((err) => {

        throw Boom.badRequest(err);

    });
}

