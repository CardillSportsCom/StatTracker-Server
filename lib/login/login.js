const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');
const Player = require('../../models/player')
const LeaguePlayer = require('../../models/leaguePlayer')
const League = require('../../models/league')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const secret = require('../../src/config');
const Boom = require('@hapi/boom');
const createToken = require('../util/userFunctions').createToken;
const admin = require('firebase-admin');
const leaguePlayer = require('../../models/leaguePlayer');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require("google-auth-library");

exports.loginLocal = (request, h) => {
  return LeaguePlayer.findOne({ player: request.pre.player })
    .populate("playerType")
    .populate("player")
    .populate("league")
    .then((leaguePlayerObj) => {
      if (leaguePlayerObj == null) {
        return createToken(request.pre.player, null)
          .then((token) => {
            return { id_token: token, player: request.pre.player };
          })
          .catch((err) => {
            throw Boom.badRequest(err);
          });
      } else {
        return createToken(request.pre.player, leaguePlayerObj)
          .then((token) => {
            return { id_token: token, player: request.pre.player };
          })
          .catch((err) => {
            throw Boom.badRequest(err);
          });
      }
    })
    .catch((err) => {
      throw Boom.badRequest(err);
    });
};

exports.loginFirebase = (request, h) => {
    return admin.auth().verifyIdToken(request.payload.token).then((decodedToken)=>{
        return Player.findOne({email: decodedToken.email}).exec().then((playerObj)=>{
            if(playerObj == null){                
                const newPlayerObj = new Player({
                    firstName: decodedToken.name.split(" ")[0],
                    lastName: decodedToken.name.split(" ").pop(),
                    email: decodedToken.email,
                    password: uuidv4(),
                    dateCreated: Date.now()
                });
                return bcrypt.hash(newPlayerObj.password, 10).then(function(hash){
                    newPlayerObj.password = hash;
                    return Player.create(newPlayerObj).then((newPlayer) => {
                        return createToken(newPlayer, null).then((token)=>{
                            return { id_token: token, player: newPlayer };
                            }).catch((err) => {
                                throw Boom.badRequest(err);
                            });           
                        }).catch((err) => {           
                            throw Boom.badRequest(err);           
                    });
               });                
            }
            else{
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
            }            
        }).catch((err)=>{
            throw Boom.badRequest('User does not exist ' + err); 
        });
    }).catch((err) => {
        throw Boom.badRequest(err);
    });
};

const createTokenForPlayer = (email) => {
  return Player.findOne({ email: email })
    .exec()
    .then((playerObj) => {
      return LeaguePlayer.findOne({ player: playerObj })
        .populate("playerType")
        .populate("player")
        .populate("league")
        .then((leaguePlayerObj) => {
          if (leaguePlayerObj == null) {
            return createToken(playerObj, null)
              .then((token) => {
                return { id_token: token, player: playerObj };
              })
              .catch((err) => {
                throw Boom.badRequest(err);
              });
          } else {
            return createToken(playerObj, leaguePlayerObj)
              .then((token) => {
                return { id_token: token, player: playerObj };
              })
              .catch((err) => {
                throw Boom.badRequest(err);
              });
          }
        })
        .catch((err) => {
          throw Boom.badRequest(err);
        });
    });
};

// Return a ping response to show the user is logged in
exports.loginNextAuth = async (request, h) => {
  const token = request.payload.token;

  return verifyGoogleToken(token)
    .then((result) => {
      if (result.verified) {
        return createTokenForPlayer(result.userEmail)
      } else {
        throw Boom.unauthorized("Invalid token", result.error);
      }
    })
    .catch((err) => {
      throw Boom.unauthorized("Error verifying token " + err);
    });
};

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;; // You can find this in your Google Developer Console
const client = new OAuth2Client(CLIENT_ID);

async function verifyGoogleToken(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload();
    const userId = payload["sub"];

    // You can also access other information from payload, such as the user's email:
    const userEmail = payload["email"];

    return { verified: true, userId, userEmail };
  } catch (error) {
    return { verified: false, error };
  }
}
