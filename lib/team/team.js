const League = require('../../models/league')
const Player = require('../../models/player')
const Team = require("../../models/team")
const LeagueType = require('../../models/leagueType')
const mongoose = require('mongoose');

exports.create = (request, h) => {

      const teamObj = new Team({
      name: request.payload.name,
      dateCreated: Date.now(),
      players: request.payload.players
    });
    return Team.create(teamObj).then((newTeam) => {
      return { message: "Team created successfully", newTeam: newTeam };

  }).catch((err) => {

      return { err: err };

  });


}

exports.get = (request, h) => {
  if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
    return { message: "Team not found", team: null };
  }
  return Team.findById(request.params.id).populate('players').exec().then((teamObj) => {
    return { message: "Got Team", team: teamObj };
  }).catch((err) => {

    return { err: err };

  });
}

exports.list = (request,h) => {
  return Team.find().populate('players').exec().then((teams)=>{
    return {message: "Got Teams", teams: teams};

  }).catch((err)=>{
    return {err:err};
  });
}

exports.update = (request, h) => {
  if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
    return { message: "Team not found", league: null };
  }
  return Team.findById(request.params.id).exec().then((teamObj) => {
    if (teamObj == null) {
      return { message: "Team not found", team: null };
    }
    teamObj.name = request.payload.team.name;
    teamObj.players = request.payload.team.players;
    teamObj.save();
    return { message: "Updated Team" };
  }).catch((err) => {

    return { err: err };

  });
}

exports.delete = (request, h) => {
  if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
    return { message: "Team not found", team: null };
  }
  return Team.findById(request.params.id).remove().exec().then(data => {
    return { message: "Deleted team" };
  }).catch((err) => {

    return { err: err };

  });
}
