const League = require('../models/league')
const Player = require('../models/player')
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
  return League.findById(request.params.id).exec().then((leagueObj) => {
    return { message: "Got League", league: leagueObj };
  }).catch((err) => {

    return { err: err };

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
  return League.findById(request.params.id).remove().exec().then(data=>{
    return {message: "Deleted League"};
  }).catch((err) => {

    return { err: err };

  });
}