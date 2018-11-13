const Player = require("../../models/player");
const League = require("../../models/league");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../../src/config");
const Boom = require("boom");

function validate(user, request) {
  return Player.findById(user.id)
    .exec()
    .then(playerObj => {
      var isValid = false;
      // if(request.params.leagueId != null){

      // }

      // if(request.payload.leagueId != null){

      // }

      // if(request.params.playerId != null){

      // }

      // if(request.payload.playerId != null){

      // }
      isValid = true;
      return { isValid: isValid };
    })
    .catch(err => {
      throw Boom.badRequest(err);
    });
}

function validateError(err) {
  throw Boom.badRequest(err);
}

function verifyCredentials(req, res) {
  return Player.findOne({ email: req.payload.email })
    .exec()
    .then(playerObj => {
      return bcrypt
        .compare(req.payload.password, playerObj.password)
        .then(isValid => {
          if (isValid) {
            return playerObj;
          } else {
            throw Boom.badRequest("Incorrect credentials");
          }
        })
        .catch(err => {
          throw Boom.badRequest("Incorrect credentials");
        });
    })
    .catch(err => {
      throw Boom.badRequest("Incorrect credentials");
    });
}

function createToken(user) {
  var scopes;
  // Check if the user object passed in
  // has admin set to true, and if so, set
  // scopes to admin
  if (user.admin) {
    scopes = "admin";
  } else {
    scopes = "player";
  }
  // Sign the JWT
  const jwtPromise = new Promise(function(resolve, reject) {
    resolve(
      jwt.sign({ id: user._id, email: user.email, scope: scopes }, secret, {
        algorithm: "HS256",
        expiresIn: "1h"
      })
    );
  });
  return jwtPromise
    .then(token => {
      return token;
    })
    .catch(err => {
      throw Boom.badRequest(err);
    });
}

function hashPassword(password) {
  // Generate a salt at level 10 strength
  return bcrypt
    .genSalt(10)
    .then(salt => {
      return bcrypt
        .hash(password, salt)
        .then(hash => {
          return hash;
        })
        .catch(err => {
          throw Boom.badRequest(err);
        });
    })
    .catch(err => {
      throw Boom.badRequest(err);
    });
}

module.exports = {
  verifyCredentials: verifyCredentials,
  createToken: createToken,
  hashPassword: hashPassword,
  validate: validate,
  validateError: validateError
};
