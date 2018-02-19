const League = require('../models/league')

exports.create = (request, h) => {
     const leagueObj = new League({
        name: request.payload.name,
        dateCreated: Date.now()
    });

    return League.create(leagueObj).then((newLeague)=>{
             return { message: "League created successfully", newLeague: newLeague };

    }).catch((err) => {

    return { err: err };

  });
}

exports.get = (request, h) => {

    return League.findById(request.params.id).exec().then((league)=>{
             return { message: "Got League", league: league };
    }).catch((err) => {

    return { err: err };

  });
}