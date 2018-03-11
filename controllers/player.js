const Player = require('../models/player')
const League = require('../models/league')
const mongoose = require('mongoose');

exports.create = (request, h) => {
    const playerObj = new Player({
        firstName: request.payload.firstName,
        lastName: request.payload.lastName,
        email: request.payload.email,
        password: request.payload.password,
        dateCreated: Date.now()

    });
    return Player.create(playerObj).then((newPlayer) => {

        return { message: "Player created successfully", newPlayer: newPlayer };

    }).catch((err) => {

        return { err: err };

    });
}

exports.get = (request, h) => {
    if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
        return { message: "Player not found", player: null };
    }
    return Player.findById(request.params.id).exec().then((playerObj) => {
        return { message: "Got Player", player: playerObj };
    }).catch((err) => {
        return { err: err };
    });
}

exports.update = (request, h) => {
    if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
        return { message: "Player not found", player: null };
    }
    return Player.findById(request.params.id).exec().then((playerObj) => {
        playerObj.firstName = request.payload.firstName;
        playerObj.lastName = request.payload.lastName;
        playerObj.email = request.payload.email;
        playerObj.save();
        return {message: 'Updated Player'};

    }).catch((err) => {
        return { err: err };
    });
}

exports.delete = (request, h) => {
  if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
    return { message: "Player not found", league: null };
  }
  return Player.findById(request.params.id).remove().exec().then(data=>{
    return {message: "Deleted Player"};
  }).catch((err) => {

    return { err: err };

  });
}