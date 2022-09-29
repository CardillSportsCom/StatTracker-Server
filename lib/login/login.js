const Player = require('../../models/player')
const LeaguePlayer = require('../../models/leaguePlayer')
const League = require('../../models/league')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const secret = require('../../src/config');
const Boom = require('boom');
const createToken = require('../util/userFunctions').createToken;
const admin = require('firebase-admin');
const leaguePlayer = require('../../models/leaguePlayer');

exports.loginLocal = (request, h) => { 
    return LeaguePlayer.findOne({player: request.pre.player}).populate('playerType').populate('player').populate('league').then((leaguePlayerObj)=>{
        if(leaguePlayerObj == null){
            return createToken(request.pre.player, null).then((token)=>{
                return { id_token: token, player: request.pre.player };
            }).catch((err) => {
                throw Boom.badRequest(err);
            });
        }
        else{
            return createToken(request.pre.player, leaguePlayerObj).then((token)=>{
                return { id_token: token, player: request.pre.player };
            }).catch((err) => {
                throw Boom.badRequest(err);
            });
        }
    }).catch((err) => {
        throw Boom.badRequest(err);
    });
}

exports.loginFirebase = (request, h) => {
    return admin.auth().verifyIdToken(request.payload.token).then((decodedToken)=>{
        return Player.findOne({email: decodedToken.email}).exec().then((playerObj)=>{
            return LeaguePlayer.findOne({player: playerObj}).populate('playerType').populate('player').populate('league').then((leaguePlayerObj)=>{
                if(leaguePlayerObj == null){
                    return createToken(playerObj, null).then((token)=>{
                        return { id_token: token, player: playerObj };
                    }).catch((err) => {
                        throw Boom.badRequest(err);
                    });
                }
                else{
                    return createToken(playerObj, leaguePlayerObj).then((token)=>{
                        return { id_token: token, player: playerObj };
                    }).catch((err) => {
                        throw Boom.badRequest(err);
                    });
                }
            }).catch((err) => {
                throw Boom.badRequest(err);
            });
        }).catch((err)=>{
            throw Boom.badRequest('User does not exist ' + err); 
        });
    }).catch((err) => {
        throw Boom.badRequest(err);
    });
}