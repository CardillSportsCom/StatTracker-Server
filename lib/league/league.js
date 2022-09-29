const League = require('../../models/league')
const Player = require('../../models/player')
const LeagueType = require('../../models/leagueType')
const mongoose = require('mongoose');
const Boom = require('boom');

exports.create = (request, h) => {

  return LeagueType.findById(request.payload.type).exec().then((type)=>{
      const leagueObj = new League({
      name: request.payload.name,
      dateCreated: Date.now(),
      type: type
    });
    return League.create(leagueObj).then((newLeague) => {
      return { message: "League created successfully", newLeague: newLeague };

    }).catch((err) => {

        throw Boom.badRequest(err);

    });
  }).catch((err) => {

        throw Boom.badRequest(err);

  });


}

exports.get = (request, h) => {
  if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
    return { message: "League not found", league: null };
  }
  return League.findById(request.params.id).exec().then((leagueObj) => {
    return { message: "Got League", league: leagueObj };
  }).catch((err) => {

        throw Boom.badRequest(err);

  });
}

exports.list = (request,h) => {
  return League.find().exec().then((leagues)=>{
    return {message: "Got Leagues", leagues: leagues};

  }).catch((err)=>{
        throw Boom.badRequest(err);
  });
}

exports.update = (request, h) => {
  if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
    return { message: "League not found", league: null };
  }
  return League.findById(request.params.id).exec().then((leagueObj) => {
    if (leagueObj == null) {
      return { message: "League not found", league: null };
    }
    leagueObj.name = request.payload.name;
    leagueObj.save();
    return { message: "Updated League" };
  }).catch((err) => {

        throw Boom.badRequest(err);

  });
}

exports.delete = (request, h) => {
  if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
    return { message: "League not found", league: null };
  }
  return League.findById(request.params.id).deleteOne().exec().then(data => {
    return { message: "Deleted League" };
  }).catch((err) => {

        throw Boom.badRequest(err);

  });
}
exports.addplayer = (request, h) => {
  if (!mongoose.Types.ObjectId.isValid(request.params.leagueId)) {
    return { message: "League not found" };
  }
  if (!mongoose.Types.ObjectId.isValid(request.payload.playerId)) {
    return { message: "Player not found" };
  }
  return League.findById(request.params.leagueId).then((league) => {
    league.players.push(request.payload.playerId);
    league.save();
    return { message: "added player to league" }

  }).catch((err) => {

        throw Boom.badRequest(err);

  });
}

exports.removePlayer = (request, h) => {
  if (!mongoose.Types.ObjectId.isValid(request.params.leagueId)) {
    return { message: "League not found" };
  }
  if (!mongoose.Types.ObjectId.isValid(request.payload.playerId)) {
    return { message: "Player not found" };
  }
  return League.findById(request.params.leagueId).then((league) => {
    for (var i = league.players.length - 1; i >= 0; i--) {
      if (league.players[i] == request.payload.playerId) {
        league.players.splice(i, 1);
      }
    }
    league.save();
    return { message: "delete player to league" }

  }).catch((err) => {

        throw Boom.badRequest(err);

  });
}