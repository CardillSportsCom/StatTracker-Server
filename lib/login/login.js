const Player = require('../../models/player')
const League = require('../../models/league')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('../../src/config');
const Boom = require('boom');
const createToken = require('../util/userFunctions').createToken;
const admin = require('firebase-admin');

exports.loginLocal = (request, h) => { 
     return createToken(request.pre.player).then((token)=>{
        return { id_token: token };
    }).catch((err) => {
        throw Boom.badRequest(err);
    });
}

exports.loginFirebase = (request, h) => { 

    return admin.auth().verifyIdToken(request.payload.token).then((decodedToken)=>{
        return Player.findOne({email: decodedToken.email}).exec().then((playerObj)=>{
            return createToken(playerObj).then((token)=>{
                return { id_token: token, player: playerObj };
            }).catch((err) => {
                throw Boom.badRequest(err);
            });
        }).catch((err)=>{
            throw Boom.badRequest('User does not exist'); 
        });
    }).catch((err) => {

        throw Boom.badRequest(err);

    });
}