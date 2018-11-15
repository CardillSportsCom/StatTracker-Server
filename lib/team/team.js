const League = require('../../models/league')
const Player = require('../../models/player')
const Team = require("../../models/team")
const LeagueType = require('../../models/leagueType')
const mongoose = require('mongoose');
const Boom = require('boom');

exports.create = (request, h) => {
  if (!mongoose.Types.ObjectId.isValid(request.payload.leagueId)) {
    return { message: "League not found", league: null };
  }
      const teamObj = new Team({  
      name: request.payload.name,
      dateCreated: Date.now(),
      players: request.payload.players,
      league: request.payload.leagueId
    });
    return Team.create(teamObj).then((newTeam) => {
      return { message: "Team created successfully", newTeam: newTeam };

  }).catch((err) => {
        throw Boom.badRequest(err);
  });
}

exports.get = (request, h) => {
  if (!mongoose.Types.ObjectId.isValid(request.params.leagueId)) {
    return { message: "League not found", team: null };
  }
  if (!mongoose.Types.ObjectId.isValid(request.params.teamId)) {
    return { message: "Team not found", team: null };
  }
  return Team.findById(request.params.teamId).populate('players').populate('league').exec().then((teamObj) => {
    if(teamObj.league._id == request.params.leagueId){
      return { message: "Got Team", team: teamObj };

    }
    else {
      return { message: "Team not found", team: null };

    }
  }).catch((err) => {

        throw Boom.badRequest(err);

  });
}

exports.list = (request,h) => {
  if (!mongoose.Types.ObjectId.isValid(request.params.leagueId)) {
    return { message: "League not found", team: null };
  }
  return Team.find({league: request.params.leagueId}).sort('-dateCreated').populate('players').exec().then((teams)=>{
    if(request.query.count != null){
      teams = teams.slice(0, request.query.count);
    }
    return {message: "Got Teams", teams: teams};

  }).catch((err)=>{
        throw Boom.badRequest(err);
  });
}

exports.update = (request, h) => {
  if (!mongoose.Types.ObjectId.isValid(request.params.leagueId)) {
    return { message: "League not found", league: null };
  }
  if (!mongoose.Types.ObjectId.isValid(request.params.teamId)) {
    return { message: "Team not found", team: null };
  }
  return Team.findById(request.params.teamId).populate('league').exec().then((teamObj) => {
    if (teamObj == null) {
      return { message: "Team not found", team: null };
    }
    else if(teamObj.league._id != request.params.leagueId){
      return { message: "Team not found", team: null };      
    }
    teamObj.name = request.payload.team.name;
    teamObj.players = request.payload.team.players;
    teamObj.save();
    return { message: "Updated Team", team: teamObj };
  }).catch((err) => {

        throw Boom.badRequest(err);

  });
}

exports.delete = (request, h) => {
  if (!mongoose.Types.ObjectId.isValid(request.params.teamId)) {
    return { message: "Team not found", team: null };
  }
    if (!mongoose.Types.ObjectId.isValid(request.params.leagueId)) {
    return { message: "League not found", team: null };
  }
  return Team.find({_id:request.params.teamId, league:request.params.leagueId}).remove().exec().then(data => {
    return { message: "Deleted team" };
  }).catch((err) => {

        throw Boom.badRequest(err);

  });
}
