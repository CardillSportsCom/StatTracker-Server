const League = require('../../models/league')
const Player = require('../../models/player')
const mongoose = require('mongoose');

exports.create = (request, h) => {
  const leagueObj = new League({
    name: request.payload.name,
    dateCreated: Date.now()
  });

  return League.create(leagueObj).then((newLeague) => {
    return { message: "League created successfully", newLeague: newLeague };

  }).catch((err) => {

    return { err: err };

  });
}

exports.get = (request, h) => {
  if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
    return { message: "League not found", league: null };
  }
  return League.findById(request.params.id).populate('players').exec().then((leagueObj) => {
    return { message: "Got League", league: leagueObj };
  }).catch((err) => {

    return { err: err };

  });
}

exports.list = (request,h) => {
  return League.find().exec().then((leagues)=>{
    return {message: "Got Leagues", leagues: leagues};

  }).catch((err)=>{
    return {err:err};
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

    return { err: err };

  });
}

exports.delete = (request, h) => {
  if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
    return { message: "League not found", league: null };
  }
  return League.findById(request.params.id).remove().exec().then(data => {
    return { message: "Deleted League" };
  }).catch((err) => {

    return { err: err };

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

    return { err: err };

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

    return { err: err };

  });
}