const League = require('../../models/league')
const Season = require('../../models/season')
const Player = require('../../models/player')
const LeagueType = require('../../models/leagueType')
const mongoose = require('mongoose');
const Boom = require('@hapi/boom');

exports.create = (request, h) => {

  return League.findById(request.payload.leagueId).exec().then((leagueObj)=>{
    if(leagueObj == null){
      return { message: "League not found", newSeason: null };
    }
      var name = "Season";
      const fromYear = new Date(request.payload.fromDate).getFullYear();
      const toYear = new Date(request.payload.toDate).getFullYear();
      if(fromYear == toYear){
        name = fromYear + " Season";
      }
      else{
        name = fromYear + "-" + toYear + " Season";
      }
      const seasonObj = new Season({
        name: name,
        fromDate: request.payload.fromDate,
        toDate: request.payload.toDate,
        league:leagueObj
      });
    return Season.create(seasonObj).then((newSeason) => {
      return { message: "Season created successfully", newSeason: newSeason };

    }).catch((err) => {

        throw Boom.badRequest(err);

    });
  }).catch((err) => {

        throw Boom.badRequest(err);

  });


}

exports.get = (request, h) => {
  if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
    return { message: "Season not found", season: null };
  }
  return Season.findById(request.params.id).exec().then((seasonObj) => {
    return { message: "Got Season", season: seasonObj };
  }).catch((err) => {

        throw Boom.badRequest(err);

  });
}

exports.list = (request,h) => {
  if (!mongoose.Types.ObjectId.isValid(request.params.leagueId)) {
    return { message: "League not found", season: null };
  }
  return Season.find({league: request.params.leagueId}).sort('-fromDate').exec().then((seasons)=>{
    return {message: "Got Seasons", seasons: seasons};

  }).catch((err)=>{
        throw Boom.badRequest(err);
  });
}

exports.update = (request, h) => {
  if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
    return { message: "Season not found", season: null };
  }
  return Season.findById(request.params.id).exec().then((seasonObj) => {
    if (seasonObj == null) {
      return { message: "Season not found", season: null };
    }
    var name = "Season";
    const fromYear = new Date(request.payload.fromDate).getFullYear();
    const toYear = new Date(request.payload.toDate).getFullYear();
    if(fromYear == toYear){
      name = fromYear + " Season";
    }
    else{
      name = fromYear + "-" + toYear + " Season";
    }

    seasonObj.name = name;
    seasonObj.fromDate = request.payload.fromDate;
    seasonObj.toDate = request.payload.toDate;
    seasonObj.save();

    return { message: "Updated Season", season: seasonObj };
  }).catch((err) => {

        throw Boom.badRequest(err);

  });
}

exports.delete = (request, h) => {
  if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
    return { message: "Season not found", season: null };
  }
  return Season.findById(request.params.id).deleteOne().exec().then(data => {
    return { message: "Deleted Season" };
  }).catch((err) => {

        throw Boom.badRequest(err);

  });
}
