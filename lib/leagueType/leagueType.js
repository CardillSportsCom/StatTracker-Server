const LeagueType = require('../../models/leagueType')
const mongoose = require('mongoose');

exports.list = (request, h) => {
    return LeagueType.find({'isDisplay': true}).exec().then((leagueTypes)=>{
        return {message: "Got League Types", leagueTypes: leagueTypes};
    }).catch((err)=>{
        return {err:err};
    });
}